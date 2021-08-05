import React, { useState, useRef, Fragment } from "react";
import { Button, Modal } from "react-bootstrap";

function DeletePost(props) {
  const handleDeletePost = async () => {
    await props.deletePost(props.slug);
    props.closeModal();
    window.location.reload(false);
  };

  return (
    <>
      <Modal
        show={props.show}
        backdrop="static"
        keyboard={false}
        size="md"
        onHide={props.closeModal}
        className="delete-post-modal"
      >
        <Modal.Header>
          <Modal.Title>Delete post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you want to delete this post and any associated
          answers and comments.
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white"
            variant="outline-primary"
            onClick={props.closeModal}
          >
            Cancel
          </Button>
          <Button
            className="btn-white modal-primary-button"
            variant="outline-primary"
            onClick={handleDeletePost}
          >
            Delete Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeletePost;
