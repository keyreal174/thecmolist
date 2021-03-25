import React, { useState, useEffect, Suspense } from "react";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";
import { cdn } from "../../../util/constants";
import Util from "../../../util/Util";
import "./AddPersonModal.scss";
import clsx from "clsx";

const VendorType = ["Company", "Product", "Contractor"];

function AddPersonModal({ show, handleClose, setMention, defaultName }) {
  const [name, setName] = useState(defaultName);
  const [link, setLink] = useState("");
  const [error, setError] = useState({});
  const [vendorType, setVendorType] = useState(VendorType[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      error["name"] = "Name is required";
    } else {
      delete error["name"];
    }

    if (!link) {
      error["link"] = "URL is required";
    } else if (!Util.validURL(link)) {
      error["link"] = "URL is not valid";
    } else {
      delete error["link"];
    }
    setError({ ...error });

    if (Object.keys(error).length === 0) {
      const person = {
        name,
        link,
        type: vendorType.toLocaleLowerCase(),
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

  const isPerson = show === "Person";

  useEffect(() => {
    setName(defaultName);
  }, [defaultName]);

  return (
    <>
      <div className={clsx("add-person-modal", show && "visible")}>
        <div>
          <div className="modal-header">
            <h4 className="modal-title">
              {isPerson ? "New Person" : "New Vendor"}
            </h4>
          </div>
          <div className="modal-body">
            <div>
              <form id="form-add-person-modal">
                <Row>
                  <Col md="12">
                    <div>
                      {!isPerson && (
                        <div className="vendor-type-list">
                          <label>Vendor</label>
                          <div>
                            {VendorType.map((vendor, index) => {
                              return (
                                <Form.Check
                                  key={index}
                                  label={vendor}
                                  name="vendortype"
                                  value={vendor}
                                  id={vendor}
                                  defaultChecked={index === 0}
                                  onChange={(e) => {
                                    setVendorType(e.target.value);
                                  }}
                                  type="radio"
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <div className="person-section">
                        <label>
                          {isPerson
                            ? "Please enter the person's full name"
                            : vendorType + " name"}
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
                          {isPerson
                            ? "Person's Linkedin URL"
                            : vendorType === "Contractor"
                            ? "Linkedin URL"
                            : vendorType + " URL"}
                        </label>
                        <Form.Control
                          as="input"
                          type="url"
                          className="modal-person-section-input"
                          onChange={(e) => setLink(e.target.value)}
                          placeholder={
                            isPerson
                              ? "https://linkedin.com/in/linkedinID"
                              : "URL"
                          }
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
