import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import {
  AsyncTypeahead,
  Typeahead,
  TypeaheadMenu,
} from "react-bootstrap-typeahead";
import Rating from "../base/Rating/Rating";
import PostVisibility from "../base/PostVisibility/PostVisibility";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./profile.scss";

let agencyName = "";
function FollowUserModal(props) {
  // agency search
  const OnComponentDidMount = (func) => useEffect(func, []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSearch = async (query) => {
    setIsLoading(true);
    const data = await props.getTopicSuggestions(query);
    const options = data.map((i, index) => ({
      id: index,
      slug: i.slug,
      name: i.name,
    }));

    setOptions(options);
    setIsLoading(false);
  };

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
            Add <span className="text-capitalize">{props.firstname}</span> to
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
              <span className="text-capitalize">{props.firstname}</span> to be
              an expert
            </Form.Label>
            <AsyncTypeahead
              id="async-global-search"
              isLoading={isLoading}
              labelKey="name"
              multiple
              minLength={1}
              onSearch={handleSearch}
              options={options}
              emptyLabel=""
              renderMenu={(results, menuProps) => {
                if (!results.length) {
                  return null;
                }
                return (
                  <TypeaheadMenu
                    options={results}
                    labelKey="name"
                    {...menuProps}
                  />
                );
              }}
              onChange={(selectedOption) => {
                setSelectedOptions(selectedOption);
              }}
              placeholder="Choose one or more #topics or #locations that describe what your question is about"
              renderMenuItemChildren={(option) => (
                <React.Fragment>
                  <span>{option.name}</span>
                </React.Fragment>
              )}
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

const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    getTopicSuggestions: dispatch.suggestionsModel.getTopicSuggestions,
  };
};

export default connect(mapState, mapDispatch)(FollowUserModal);
