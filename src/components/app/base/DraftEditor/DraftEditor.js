import React, {
  ReactElement,
  forwardRef,
  useCallback,
  useImperativeHandle,
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
  getDefaultKeyBinding,
  KeyBindingUtil,
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

function Entry(props) {
  const { mention, theme, searchValue, isFocused, ...parentProps } = props;

  return (
    <div {...parentProps}>
      <div className={clsx(theme?.mentionSuggestionsEntryContainer, "d-flex")}>
        {mention.avatar && (
          <div
            className={clsx(
              theme?.mentionSuggestionsEntryContainerLeft,
              "d-flex align-items-center"
            )}
          >
            <img
              src={mention.avatar}
              className={theme?.mentionSuggestionsEntryAvatar}
              role="presentation"
            />
          </div>
        )}

        <div
          className={clsx(
            theme?.mentionSuggestionsEntryContainerRight,
            "d-flex align-items-center"
          )}
        >
          <div className={theme?.mentionSuggestionsEntryText}>
            {mention.name.startsWith("@")
              ? mention.name.slice(1)
              : mention.name}
          </div>
        </div>
      </div>
    </div>
  );
}

const DraftEditor = forwardRef(
  (
    {
      getSuggestions,
      getTopicSuggestions,
      setBody,
      isPersonVendor,
      setIsPersonVendor,
      toolbar,
      handleChange,
      stateToggle,
      placeholder,
      ...rest
    },
    ref
  ) => {
    const editorRef = useRef(null);
    const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
    );
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [selectedMention, setSelectedMention] = useState("");
    const [mention, setMention] = useState(null);
    const [isSharp, setIsSharp] = useState(false);
    const [defaultName, setDefaultName] = useState("");
    const [lastTrigger, setLastTrigger] = useState("");

    // use this to expose a focus method to parent components. see
    // https://reactjs.org/docs/hooks-reference.html#useimperativehandle
    useImperativeHandle(ref, () => ({
      focus: () => {
        editorRef.current && editorRef.current.focus();
      },
    }));

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
      _open ? removeBinding() : applyBinding();
      setOpen(_open);
    }, []);
    const onSearchChange = useCallback(({ trigger, value }) => {
      if (trigger === "@") {
        setIsSharp(true);
        getSuggestions({ query: value }).then((response) => {
          setSuggestions([...response, ...MentionLast]);
        });
      } else {
        setIsSharp(false);
        getTopicSuggestions(value).then((response) => {
          setSuggestions(response);
        });
      }
      setLastTrigger(trigger);
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
      const { begin, end } = getSearchText(editorState, currentSelectionState, [
        "@",
      ]);

      const content = editorState.getCurrentContent();
      const blockMap = content.getBlockMap();

      const length = blockMap.last().getLength();

      if (end) {
        const mentionTextSelection = currentSelectionState.merge({
          anchorOffset: !isPersonVendor
            ? end !== length
              ? end - selectedMention.length
              : end - selectedMention.length - 1
            : end,
          focusOffset: end,
        });

        let mentionReplacedContent = Modifier.replaceText(
          editorState.getCurrentContent(),
          mentionTextSelection,
          mention
            ? lastTrigger === "@"
              ? "@" + mention.name
              : mention.name
            : "",
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
            // mention ? " " : ""
            " "
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
      editorRef.current && editorRef.current.focus();

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

    const typedText = () => {
      let selection = editorState.getSelection();
      const anchorKey = selection.getAnchorKey();
      const currentContent = editorState.getCurrentContent();
      const currentBlock = currentContent.getBlockForKey(anchorKey);

      const { start, end } = getSearchText(editorState, selection, ["@"]);
      const selectedText = currentBlock.getText().slice(start, end);
      const resultText = selectedText.split("@").pop();
      setDefaultName(resultText);
    };

    const keyBindingFn = (event) => {
      if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 66) {
        return "bold";
      }
      if (KeyBindingUtil.hasCommandModifier(event) && event.keyCode === 73) {
        return "italic";
      }
      return getDefaultKeyBinding(event);
    };

    const handleKeyCommand = (command) => {
      let newState;
      if (command === "bold") {
        newState = RichUtils.toggleInlineStyle(editorState, "BOLD");
      } else if (command === "italic") {
        newState = RichUtils.toggleInlineStyle(editorState, "ITALIC");
      }

      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    };

    const [stateKeyBinding, setStateKeyBinding] = useState(() => (event) =>
      keyBindingFn(event)
    );

    const removeBinding = () => {
      setStateKeyBinding(undefined);
    };

    const applyBinding = () => {
      setStateKeyBinding(() => (event) => keyBindingFn(event));
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
            editorRef.current && editorRef.current.focus();
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
              ref={editorRef}
              placeholder={placeholder || ""}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={stateKeyBinding}
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
                  const isPerson = mention.name === MentionLast[0].name;
                  isPerson ? setDefaultName("") : typedText();
                  setSelectedMention(mention.name);
                  setShow(isPerson ? "Person" : "Vendor");
                }
              }}
              entryComponent={Entry}
            />
          </div>
        </div>
        <AddPersonModal
          show={show}
          handleClose={() => setShow(false)}
          setMention={(mention) => setMention(mention)}
          defaultName={defaultName}
        />
        <div className={clsx(show && "person-modal-backdrop")}></div>
      </div>
    );
  }
);

export default DraftEditor;
