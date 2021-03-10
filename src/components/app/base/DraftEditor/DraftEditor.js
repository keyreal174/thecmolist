import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
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

const DraftEditor = ({
  getSuggestions,
  getTopicSuggestions,
  setBody,
  setShowPersonModal,
}) => {
  const ref = useRef(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [open, setOpen] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

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
      getSuggestions(value).then((response) => {
        setSuggestions([...response, { name: "+ Add People" }]);
      });
    } else {
      getTopicSuggestions(value).then((response) => {
        setSuggestions(response);
      });
    }
  }, []);

  const onChange = (editor_state) => {
    setEditorState(editor_state);
    const content = convertToRaw(editor_state.getCurrentContent());
    setBody(content);
  };

  const handleAddPeople = () => {
    const blocks = editorState.getCurrentContent().getBlockMap().toList();

    const updates = {
      anchorKey: blocks.last().get("key"),
      anchorOffset: blocks.last().getLength(),
      focusKey: blocks.last().get("key"),
      focusOffset: blocks.last().getLength(),
    };

    const updatedSelection = editorState.getSelection().merge(updates);

    const newContentState = Modifier.removeRange(
      editorState.getCurrentContent(),
      updatedSelection,
      "backward"
    );

    const newState = EditorState.push(
      editorState,
      newContentState,
      "remove-range"
    );
  };

  const removeSelectedBlocksStyle = (editorState) => {
    const newContentState = RichUtils.tryToRemoveBlockStyle(editorState);
    if (newContentState) {
      return EditorState.push(
        editorState,
        newContentState,
        "change-block-type"
      );
    }
    setEditorState(editorState);
    return editorState;
  };

  const handleClose = () => {
    const contentState = editorState.getCurrentContent();
  };

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
            if (mention.name === "+ Add People") {
              // setShowPersonModal(true);
              handleAddPeople();
            }
          }}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
