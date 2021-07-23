import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal, Alert } from "react-bootstrap";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./profile.scss";

function FollowUserModal(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([
    { name: "#martech", type: "topic", slug: "martech" },
    { name: "#social", type: "topic", slug: "social" },
    { name: "#brand", type: "topic", slug: "brand" },
    { name: "#advertising", type: "topic", slug: "advertising" },
    {
      name: "#performancemarketing",
      type: "topic",
      slug: "performancemarketing",
    },
  ]);
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
            Add{" "}
            <span className="text-capitalize">
              {props.firstname || props.username}
            </span>{" "}
            to your list of trusted <b>experts</b>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <Form.Label className="mt-2">
              See <b>new vendors</b>, <b>playbooks</b> and <b>news</b> from{" "}
              {props.firstname || props.username} in your feed.
            </Form.Label>
            <br />
            <Form.Label className="mt-3">
              Select topics, or leave blank to view all posts
            </Form.Label>
            <AsyncTypeahead
              id="async-global-search"
              isLoading={isLoading}
              labelKey="name"
              multiple
              minLength={0}
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
              placeholder=""
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
