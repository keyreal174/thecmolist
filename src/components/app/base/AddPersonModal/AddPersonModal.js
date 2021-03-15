import React, { useState, useEffect, Suspense } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import { cdn } from "../../../util/constants";
import Util from "../../../util/Util";
import "./AddPeronModal.scss";
import clsx from "clsx";

function AddPersonModal({ show, handleClose, setMention }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) error["name"] = "Name is required";
    else delete error["name"];

    if (!link) error["link"] = "URL is required";
    else if (!Util.validURL(link)) error["link"] = "URL is not valid";
    else delete error["link"];
    setError({ ...error });

    if (Object.keys(error).length === 0) {
      const person = {
        name,
        link,
      };
      setMention(person);
      reset();
      handleClose();
    }
  };

  const reset = () => {
    setName("");
    setLink("");
  };

  const handleCancel = () => {
    reset();
    setMention(null);
    handleClose();
  };

  return (
    <>
      <div className={clsx("add-person-modal", show && "visible")}>
        <div>
          <div className="modal-header">
            <h4 className="modal-title">
              {show === "People" ? "New Person" : "New Vendor"}
            </h4>
          </div>
          <div className="modal-body">
            <div>
              <form id="form-add-person-modal">
                <Row>
                  <Col md="12">
                    <div>
                      <div className="person-section">
                        <label>
                          {show === "People"
                            ? "Please enter the person's full name:"
                            : "Please enter the vendor's full name:"}
                        </label>
                        <Form.Control
                          as="input"
                          className="modal-person-section-input"
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Full name"
                          value={name}
                          autoFocus
                        />
                        {error && error.name && (
                          <p className="error">{error.name}</p>
                        )}
                      </div>
                      <div className="person-section">
                        <label>
                          {show === "People"
                            ? "Person's Linked URL:"
                            : "Vendor's Linked URL:"}
                        </label>
                        <Form.Control
                          as="input"
                          className="modal-person-section-input"
                          onChange={(e) => setLink(e.target.value)}
                          placeholder="https://linkedin.com/in/linkedinID"
                          value={link}
                        />
                        {error && error.link && (
                          <p className="error">{error.link}</p>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
          <div className="modal-footer">
            <Button
              className="btn-white modal-cancel-button"
              variant="outline-primary"
              onClick={() => handleCancel()}
            >
              Cancel
            </Button>
            <Button
              className="btn__homepage-blue modal-ok-button"
              variant="primary"
              form="form-add-person-modal"
              onClick={handleSubmit}
            >
              Create
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddPersonModal;
