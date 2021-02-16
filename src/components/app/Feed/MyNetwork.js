import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import AddPostModal from "../base/AddPostModal/AddPostModal";

import Logo from "../base/icons/logo.svg";

const MyNetwork = (props) => {
  const history = useHistory();
  const [showContentModal, setShowContentModal] = useState(false);
  const handleShow = () => setShowContentModal(true);
  const handleClose = () => setShowContentModal(false);

  const handleSubmit = async (content) => {
    const id = await props.saveContent(content);
    history.push(`content/${id}`);
  };

  return (
    <CustomCard heading="My Network">
      <div className="text-center">
        <div className="my-network-img">
          <img src={Logo} alt="Logo" width="29" height="29" />
        </div>
        <p className="my-network-text">Modern Media Marketing</p>
        <div className="d-flex flex-column">
          <Button
            className="btn-white edit-profile mb-2"
            variant="outline-primary"
            onClick={handleShow}
          >
            Share Article
          </Button>
          <Button className="btn-white edit-profile mb-2" onClick={handleShow}>
            Share Experience
          </Button>
          <a role="button" tabIndex="0" onClick={handleShow}>
            Ask Question
          </a>
          <AddPostModal
            firstButtonText={"Cancel"}
            handleClose={handleClose}
            modalTitle="Ask a marketing question"
            onSubmit={handleSubmit}
            secondButtonText={"Ask a question"}
            show={showContentModal}
          />
        </div>
      </div>
    </CustomCard>
  );
};

export default MyNetwork;
