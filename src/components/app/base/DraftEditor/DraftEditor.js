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
import "./DraftEditor.scss";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const MentionLast = {
  "@": "+ Add People",
  "#": "+ Add Vendor",
};

const DraftEditor = ({
  getSuggestions,
  getTopicSuggestions,
  setBody,
  setShowPersonModal,
  showPersonModal,
  mention,
}) => {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [lastTrigger, setLastTrigger] = useState("@");

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
    setLastTrigger(trigger);
    if (trigger === "@") {
      getSuggestions(value).then((response) => {
        setSuggestions([...response, { name: MentionLast[trigger] }]);
      });
    } else {
      getTopicSuggestions(value).then((response) => {
        setSuggestions([...response, { name: MentionLast[trigger] }]);
      });
    }
  }, []);

  const onChange = (editor_state) => {
    setEditorState(editor_state);
    const content = convertToRaw(editor_state.getCurrentContent());
    setBody(content);
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
        mention: { name: "+ Add People", link: mention ? mention.link : null },
      });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

    const currentSelectionState = editorState.getSelection();
    const { end } = getSearchText(editorState, currentSelectionState, [
      lastTrigger,
    ]);

    if (end) {
      const mentionTextSelection = currentSelectionState.merge({
        anchorOffset: end - 13,
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

  const handleClose = () => {
    const contentState = editorState.getCurrentContent();
  };

  useEffect(() => {
    if (!showPersonModal) {
      handleAddPeople(mention);
    }
  }, [showPersonModal]);

  return (
    <div
      className="editor"
      onClick={() => {
        if (ref.current) {
          ref.current.focus();
        }
      }}
    >
      <div className="editor-wrapper">
        <Editor
          editorKey={"editor"}
          editorState={editorState}
          onChange={onChange}
          plugins={plugins}
          ref={ref}
        />
        <div className="editor-toolbar">
          <Toolbar>
            {
              // may be use React.Fragment instead of div to improve perfomance after React 16
              (externalProps) => (
                <div>
                  <BoldButton {...externalProps} />
                  <ItalicButton {...externalProps} />
                  <UnderlineButton {...externalProps} />
                  <UnorderedListButton {...externalProps} />
                  <OrderedListButton {...externalProps} />
                </div>
              )
            }
          </Toolbar>
        </div>
        <MentionSuggestions
          open={open}
          onOpenChange={onOpenChange}
          suggestions={suggestions}
          onSearchChange={onSearchChange}
          onAddMention={(mention) => {
            if (mention.name === MentionLast[lastTrigger]) {
              setShowPersonModal(lastTrigger === "@" ? "People" : "Vendor");
            }
          }}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
