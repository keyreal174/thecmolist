import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import AddPostModal from "../base/AddPostModal/AddPostModal";

import Logo from "../base/icons/logo.svg";

const MyNetwork = (props) => {
  const history = useHistory();
  const [showContentModal, setShowContentModal] = useState(false);
  const [contentType, setContentType] = useState("question");
  const handleShow = (type) => {
    setContentType(type);
    setShowContentModal(true);
  };
  const handleClose = () => setShowContentModal(false);

  const handleSubmit = async (content) => {
    const id = await props.saveContent(content);
    history.push(`/content/${id}`);
  };

  return (
    <CustomCard heading={props.title}>
      <div className="text-center">
        <div className="d-flex flex-column">
          <Button
            className="btn-blue mb-2"
            onClick={() => handleShow("question")}
          >
            Ask a Question
          </Button>
          <Button
            className="btn-white mb-2"
            onClick={() => handleShow("project")}
          >
            Share an Update
          </Button>
          <Button
            className="btn-white mb-2"
            onClick={() => handleShow("article")}
          >
            Share an Article
          </Button>
          <AddPostModal
            contentType={contentType}
            show={showContentModal}
            onSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </div>
      </div>
    </CustomCard>
  );
};

export default MyNetwork;
