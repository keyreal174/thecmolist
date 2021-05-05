import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import CustomCard from "../CustomCard/CustomCard";
import EditSquareIcon from "../icons/edit_square.svg";
import AddPostModal from "../AddPostModal/AddPostModal";
import "./AskQuestion.scss";

const AskQuestion = ({ className, saveContent, activeGroup }) => {
  const [question, setQuestion] = useState("");
  const [showPostModal, setShowPostModal] = useState(false);
  const history = useHistory();
  const handleInput = (e) => {
    setQuestion("");
  };
  const handleClick = (_) => {
    setShowPostModal(!showPostModal);
  };
  const handleClose = (_) => {
    setShowPostModal(false);
  };
  const handlePostModalSubmit = async (content) => {
    const id = await saveContent(content);
    history.push(`/content/${id}`);
  };
  return (
    <CustomCard className={className}>
      <div className="ask-a-question-form">
        <img src={EditSquareIcon} alt="Question" width="24" height="24" />
        <Form.Control
          className="ask-question-input"
          type="text"
          placeholder="Ask a question"
          name="question"
          onChange={handleInput}
          onClick={handleClick}
          value={question}
        />
        <AddPostModal
          contentType="question"
          activeGroup={activeGroup}
          firstButtonText={"Cancel"}
          handleClose={handleClose}
          modalTitle="Ask a question"
          onSubmit={handlePostModalSubmit}
          secondButtonText={"Ask a question"}
          show={showPostModal}
        />
      </div>
    </CustomCard>
  );
};

export default AskQuestion;
