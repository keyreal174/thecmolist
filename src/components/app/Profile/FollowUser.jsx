import React, { Fragment, useState, useEffect } from "react";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import {
  AsyncTypeahead,
  Typeahead,
  TypeaheadMenu,
} from "react-bootstrap-typeahead";
import Rating from "../base/Rating/Rating";
import PostVisibility from "../base/PostVisibility/PostVisibility";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./profile.css";

let agencyName = "";
function FollowUserModal(props) {
  // agency search
  const OnComponentDidMount = (func) => useEffect(func, []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([
    { name: "advertising", value: "advertising" },
    { name: "seo", value: "seo" },
    { name: "digital", value: "digital" },
    { name: "corporate", value: "corporate" },
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const follow = () => {
    props.followUser({
      user: props.username,
      data: selectedOptions,
    });
    props.toggle();
  };

  return (
    <>
      <Modal
        show={props.show}
        backdrop="static"
        keyboard={false}
        dialogClassName="add-vendor-modal"
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>
            Add <span className="text-capitalize">{props.username}</span> to
            your list of <b>Experts</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <Form.Label className="mt-2">
              Follow and search posts from this member{" "}
              <b>
                only for the topics for which you consider them to be an expert.
              </b>
            </Form.Label>
            <Form.Label className="mt-3">
              Choose one or more <b>topics</b> for which you consider{" "}
              <span className="text-capitalize">{props.username}</span> to be an
              expert
            </Form.Label>
            <Typeahead
              clearButton
              id="agency-categories"
              labelKey="name"
              multiple
              options={options}
              onChange={(selectedOption) => {
                setSelectedOptions(selectedOption);
              }}
              placeholder="Choose one or more topcis"
            />
          </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white"
            variant="outline-primary"
            onClick={() => props.toggle()}
          >
            Cancel
          </Button>
          <Button
            className="btn-white modal-primary-button"
            variant="outline-primary"
            onClick={follow}
          >
            Follow
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default FollowUserModal;
