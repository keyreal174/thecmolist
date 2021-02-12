import React, { useState } from "react";
import { Form } from "react-bootstrap";
import Article from "../Article/Article";
import EditSquareIcon from "../icons/edit_square.svg";
import "./AskQuestion.scss";

const AskQuestion = () => {
  const [question, setQuestion] = useState("");
  const handleInput = (e) => {
    setQuestion(e.target.value);
  };

  return (
    <div className="ask-a-question-form">
      <img src={EditSquareIcon} alt="Edit Sqaure" width="24" height="24" />
      <Form.Control
        className="ask-question-input"
        type="text"
        placeholder="Ask a question"
        value={question}
        name="question"
        onChange={handleInput}
      />
    </div>
  );
};

export default AskQuestion;
