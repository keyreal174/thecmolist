import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Container, Form, Modal } from "react-bootstrap";
import Markdown from "markdown-to-jsx";
import clsx from "clsx";
import "./EditPostModal.scss";

const EditPostModal = ({
  content,
  contentId,
  getContent,
  saveContent,
  handleClose,
  show,
}) => {
  const [contentDefault, setContentDefault] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (content && content.content) {
      if (content.content.articletext && content.content.articletext.markdown) {
        setContentDefault(content.content.articletext.markdown);
      } else if (content.content.articletext) {
        setContentDefault(content.content.articletext);
      }
    }
  }, [content]);

  const toggleShowPreview = () => {
    setShowPreview((value) => !value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const newContent = content.content.articletext.markdown
      ? {
          ...content,
          content: {
            ...content.content,
            articletext: {
              markdown: contentDefault,
            },
          },
        }
      : {
          ...content,
          content: {
            ...content.content,
            articletext: contentDefault,
          },
        };

    await saveContent(newContent);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} size="md">
      <Form
        id="edit-content-form"
        onSubmit={onSubmit}
        className={clsx(!showPreview && "show")}
      >
        <Modal.Header as="h4" closeButton>
          <Modal.Title className="edit-content-header">
            Edit Content
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form.Control
              as="textarea"
              rows={5}
              value={contentDefault}
              onChange={(e) => setContentDefault(e.target.value)}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={toggleShowPreview}
          >
            Preview
          </Button>
          <Button
            className="btn__homepage-blue modal-ok-button"
            variant="primary"
            form="edit-content-form"
            type="submit"
          >
            Save
          </Button>
        </Modal.Footer>
      </Form>
      <div className={clsx("markdown-preview", showPreview && "show")}>
        <div className="markdown-preview--content">
          <Markdown>{contentDefault}</Markdown>
        </div>
        <div className="markdown-preview--footer">
          <Button
            className="btn-white modal-cancel-button"
            variant="outline-primary"
            onClick={toggleShowPreview}
          >
            Back
          </Button>
        </div>
      </div>
    </Modal>
  );
};

const mapState = (state) => {
  return {
    // content: state.contentModel.content,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getContent: dispatch.contentModel.fetchContent,
    saveContent: dispatch.contentModel.saveContent,
  };
};

export default connect(mapState, mapDispatch)(EditPostModal);
