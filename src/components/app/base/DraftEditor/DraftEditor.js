import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  EditorState,
  convertToRaw,
  Modifier,
  SelectionState,
  RichUtils,
} from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createMentionPlugin, {
  defaultSuggestionsFilter,
} from "@draft-js-plugins/mention";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
} from "@draft-js-plugins/buttons";
import "@draft-js-plugins/mention/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import { stateToMarkdown } from "draft-js-export-markdown";
import clsx from "clsx";
import "./DraftEditor.scss";
import AddPersonModal from "../AddPersonModal/AddPersonModal";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const MentionLast = [{ name: "+ Add Person" }, { name: "+ Add Vendor" }];

const ensureLink = (link) => {
  if (!link) {
    return "";
  }
  if (link.startsWith("http")) {
    return link;
  } else {
    return `https://${link}`;
  }
};

const DraftEditor = ({
  getSuggestions,
  getTopicSuggestions,
  setBody,
  isPersonVendor,
  setIsPersonVendor,
  toolbar,
  handleChange,
  stateToggle,
  ...rest
}) => {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMention, setSelectedMention] = useState("");
  const [mention, setMention] = useState(null);
  const [isSharp, setIsSharp] = useState(false);

  useEffect(() => {
    if (editorState.getCurrentContent().hasText()) {
      setEditorState(EditorState.createEmpty());
    }
  }, [stateToggle]);

  const { MentionSuggestions, plugins } = useMemo(() => {
    const mentionPlugin = createMentionPlugin({ mentionTrigger: ["@", "#"] });
    // eslint-disable-next-line no-shadow
    const { MentionSuggestions } = mentionPlugin;
    // eslint-disable-next-line no-shadow
    const plugins = [mentionPlugin, staticToolbarPlugin];
    return { plugins, MentionSuggestions };
  }, []);

  const onOpenChange = useCallback((_open) => {
    setOpen(_open);
  }, []);
  const onSearchChange = useCallback(({ trigger, value }) => {
    if (trigger === "@") {
      setIsSharp(true);
      getSuggestions(value).then((response) => {
        setSuggestions([...response, ...MentionLast]);
      });
    } else {
      setIsSharp(false);
      getTopicSuggestions(value).then((response) => {
        setSuggestions(response);
      });
    }
  }, []);

  const onChange = (editor_state) => {
    setEditorState(editor_state);
    let contentState = editor_state.getCurrentContent();
    // shim mentions to show up as links in the markdown
    let entityMap = {};
    let contentStateDerived = Object.create(contentState);
    contentStateDerived.getEntity = function (key) {
      let entity = contentState.getEntity(key);
      if (
        (entity && entity.getType() === "mention") ||
        (entity && entity.getType() === "#mention")
      ) {
        let entityData = entity.getData();
        if (!entityMap[key]) {
          entityMap[key] = entityData;
        }
        let entityUrl = "";
        if (entityData.mention && entityData.mention.type) {
          switch (entityData.mention.type) {
            case "topic":
              entityUrl = `/topic/${
                entityData.mention.slug
                  ? entityData.mention.slug
                  : entityData.mention.name
              }`;
              break;
            case "group":
              entityUrl = `/group/${
                entityData.mention.slug
                  ? entityData.mention.slug
                  : entityData.mention.name
              }`;
              break;
            case "person":
              entityUrl = `/profile/${
                entityData.mention.slug
                  ? entityData.mention.slug
                  : entityData.mention.name
              }`;
              break;
            case "vendor":
              entityUrl = `/vendor/${
                entityData.mention.slug
                  ? entityData.mention.slug
                  : entityData.mention.name
              }`;
              break;
            case "newperson":
            case "newcompany":
            case "newproduct":
            case "newcontractor":
              entityUrl = ensureLink(entityData.mention.link);
              break;
            default:
              entityUrl = "";
          }
        }

        return {
          getType: () => "LINK",
          getData: () => ({
            url: entityUrl,
          }),
        };
      }
      return entity;
    };
    const content = stateToMarkdown(contentStateDerived);

    if (handleChange) {
      handleChange(content);
    }

    setBody({
      markdown: content,
      entityMap: entityMap,
    });
  };

  const getSearchTextAt = (blockText, position, triggers) => {
    const str = blockText.substr(0, position);
    const { begin, index } = triggers
      .map((trigger, triggerIndex) => ({
        begin: trigger.length === 0 ? 0 : str.lastIndexOf(trigger),
        index: triggerIndex,
      }))
      .reduce((left, right) => (left.begin >= right.begin ? left : right));
    const matchingString =
      triggers[index].length === 0
        ? str
        : str.slice(begin + triggers[index].length);
    const end = str.length;

    return {
      begin,
      end,
      matchingString,
    };
  };

  const getSearchText = (editorState, selection, triggers) => {
    const anchorKey = selection.getAnchorKey();
    const anchorOffset = selection.getAnchorOffset();
    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(anchorKey);
    const blockText = currentBlock.getText();
    return getSearchTextAt(blockText, anchorOffset, triggers);
  };

  const handleAddPeople = (mention = null) => {
    const contentStateWithEntity = editorState
      .getCurrentContent()
      .createEntity("mention", "SEGMENTED", {
        mention: {
          name: mention ? mention.name : null,
          link: mention ? ensureLink(mention.link) : null,
          type: `new${mention && mention.type ? mention.type : ""}`,
        },
      });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const currentSelectionState = editorState.getSelection();
    const { end } = getSearchText(editorState, currentSelectionState, ["@"]);

    if (end) {
      const mentionTextSelection = currentSelectionState.merge({
        anchorOffset: !isPersonVendor ? end - selectedMention.length - 1 : end,
        focusOffset: end,
      });

      let mentionReplacedContent = Modifier.replaceText(
        editorState.getCurrentContent(),
        mentionTextSelection,
        mention ? mention.name : "",
        undefined, // no inline style needed
        entityKey
      );

      // If the mention is inserted at the end, a space is appended right after for
      // a smooth writing experience.
      const blockKey = mentionTextSelection.getAnchorKey();
      const blockSize = editorState
        .getCurrentContent()
        .getBlockForKey(blockKey)
        .getLength();
      if (blockSize === end) {
        mentionReplacedContent = Modifier.insertText(
          mentionReplacedContent,
          mentionReplacedContent.getSelectionAfter(),
          mention ? " " : ""
        );
      }

      const newEditorState = EditorState.push(
        editorState,
        mentionReplacedContent,
        "insert-fragment"
      );
      const newState = EditorState.forceSelection(
        newEditorState,
        mentionReplacedContent.getSelectionAfter()
      );

      setEditorState(newState);
    }
  };

  const handlePeopleVendor = () => {
    ref.current.focus();

    const contentStateWithEntity = editorState.getCurrentContent();
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const currentSelectionState = editorState.getSelection();
    const end = currentSelectionState.getEndOffset();
    const mentionTextSelection = currentSelectionState.merge({
      anchorOffset: end,
      focusOffset: end,
    });

    let mentionReplacedContent = Modifier.replaceText(
      editorState.getCurrentContent(),
      mentionTextSelection,
      "@",
      undefined, // no inline style needed
      undefined
    );

    const newEditorState = EditorState.push(
      editorState,
      mentionReplacedContent,
      "insert-fragment"
    );
    const newState = EditorState.forceSelection(
      newEditorState,
      mentionReplacedContent.getSelectionAfter()
    );

    setEditorState(newState);
    setIsPersonVendor();
  };

  useEffect(() => {
    if (!show) {
      handleAddPeople(mention);
    }
  }, [show]);

  useEffect(() => {
    if (isPersonVendor) {
      handlePeopleVendor();
    }
  }, [isPersonVendor]);

  return (
    <div {...rest}>
      <div
        className="editor"
        onClick={() => {
          if (ref.current) {
            ref.current.focus();
          }
        }}
      >
        <div
          className={clsx(
            "editor-wrapper",
            isSharp && "editor-wrapper-add-mention"
          )}
        >
          <Editor
            editorKey={"editor"}
            editorState={editorState}
            onChange={onChange}
            plugins={plugins}
            ref={ref}
          />
          {toolbar && (
            <div className="editor-toolbar">
              <Toolbar>
                {
                  // may be use React.Fragment instead of div to improve perfomance after React 16
                  (externalProps) => (
                    <div>
                      <BoldButton {...externalProps} />
                      <ItalicButton {...externalProps} />
                      {/* <UnderlineButton {...externalProps} /> */}
                      <UnorderedListButton {...externalProps} />
                      <OrderedListButton {...externalProps} />
                    </div>
                  )
                }
              </Toolbar>
            </div>
          )}
          <MentionSuggestions
            open={open}
            onOpenChange={onOpenChange}
            suggestions={suggestions}
            onSearchChange={onSearchChange}
            onAddMention={(mention) => {
              if (MentionLast.find((item) => item.name === mention.name)) {
                setSelectedMention(mention.name);
                setShow(
                  mention.name === MentionLast[0].name ? "Person" : "Vendor"
                );
              }
            }}
          />
        </div>
      </div>
      <AddPersonModal
        show={show}
        handleClose={() => setShow(false)}
        setMention={(mention) => setMention(mention)}
      />
      <div className={clsx(show && "person-modal-backdrop")}></div>
    </div>
  );
};

export default DraftEditor;
