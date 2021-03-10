import React, {
  ReactElement,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { EditorState } from "draft-js";
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
import "./DraftEditor.scss";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;

const DraftEditor = ({ getSuggestions, getTopicSuggestions, setBody }) => {
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
        setSuggestions(response);
      });
    } else {
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
              entityUrl = "/topic/";
              break;
            case "topic":
              entityUrl = "/group/";
              break;
            case "person":
              entityUrl = "/profile/";
              break;
            case "object":
              entityUrl = "/o/";
              break;
            default:
              entity = "";
          }
        }
        return {
          getType: () => "LINK",
          getData: () => ({
            url:
              entityUrl +
              (entityData.mention.slug
                ? entityData.mention.slug
                : entityData.mention.name),
          }),
        };
      }
      return entity;
    };
    const content = stateToMarkdown(contentStateDerived);
    setBody({
      markdown: content,
      entityMap: entityMap,
    });
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
          onAddMention={() => {
            // get the mention object selected
          }}
        />
      </div>
    </div>
  );
};

export default DraftEditor;
