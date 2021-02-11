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
import "./profile.scss";

let agencyName = "";
function AddAgency(props) {
  // agency search
  const OnComponentDidMount = (func) => useEffect(func, []);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [agencySlug, setAgencySlug] = useState("");
  const SEARCH_URI = "/api/agencysearch";
  const handleSearch = (query) => {
    setIsLoading(true);
    fetch(`${SEARCH_URI}?q=${query}&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          slug: i.slug,
          name: i.name,
        }));

        setOptions(options);
        setIsLoading(false);
      });
  };

  // category display
  const [flatCategories, setFlatCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [service, setService] = useState(""); // eslint-disable-line no-unused-vars
  const fetchFlatCategories = () => {
    fetch("/api/flatcategories")
      .then((resp) => resp.json())
      .then(({ categories }) => {
        setFlatCategories(categories);
      });
  };
  OnComponentDidMount(() => {
    if (flatCategories.length === 0) {
      fetchFlatCategories();
    }
  });

  const initialState = {
    region: "North America",
    text: "",
    postVisibility: "public",
    contactMe: true,
    npsScore: 0,
  };
  const [postVisibility, setPostVisibility] = useState(
    initialState.postVisibility
  ); // can be: public, network, anon
  const [contactMe, setContactMe] = useState(initialState.contactMe);
  const [region, setRegion] = useState(initialState.region);
  const [reviewtext, setReviewtext] = useState(initialState.text);
  const [npsScore, setNpsScore] = useState(initialState.npsScore);
  const [missingFields, setMissingFields] = useState([]);
  const clearState = () => {
    agencyName = "";
    setAgencySlug("");
    setMissingFields([]);
    setRegion(initialState.region);
    setService(initialState.service);
    setReviewtext(initialState.text);
    setNpsScore(initialState.npsScore);
    setPostVisibility(initialState.postVisibility);
    setContactMe(initialState.contactMe);
  };
  useEffect(() => {
    clearState();
  }, [props.show]); // eslint-disable-line react-hooks/exhaustive-deps
  const { onHide, onSuccess } = props;

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
          <Modal.Title>Add agency engagement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Fragment>
            <Alert
              variant="danger"
              dismissible
              style={{ marginBottom: "0px" }}
              show={missingFields.length > 0}
              onClose={() => {
                setMissingFields([]);
              }}
            >
              Please add the following fields: {missingFields.join(", ")}
            </Alert>
            <PostVisibility
              postVisibility={postVisibility}
              contactMe={contactMe}
              onPostVisibilityChanged={(pv) => setPostVisibility(pv)}
              onContactMeChanged={(pv) => setContactMe(pv)}
            />

            <div className="add-vendor-modal-horizontal-rule" />

            <Form.Label>Agency name</Form.Label>
            <AsyncTypeahead
              id="async-agency-search"
              isLoading={isLoading}
              labelKey="name"
              minLength={3}
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
                if (selectedOption && selectedOption.length > 0) {
                  setAgencySlug(selectedOption[0].slug);
                } else {
                  setAgencySlug("");
                }
              }}
              onInputChange={(inputText) => {
                // NOTE: there is some kind of bug/quirk in AsyncTypeahead where triggering a
                // render within onInputChange clears a request in flight. So we have to use a
                // workaround here and just set a global variable which will not trigger a re-render
                agencyName = inputText;
              }}
              placeholder="Search for an Agency..."
              renderMenuItemChildren={(option) => (
                <Fragment>
                  <img
                    alt="avatar"
                    src={option.avatar_url}
                    style={{
                      height: "24px",
                      marginRight: "10px",
                      width: "24px",
                    }}
                  />
                  <span>{option.name}</span>
                </Fragment>
              )}
            />

            {/* Disable engagement region for now (to be re-worked) */}
            {/* <Form.Label>Engagement region</Form.Label>
                <div className="select-wrapper">
                    <Form.Control as="select"
                                  value={region}
                                  onChange={e => setRegion(e.target.value)}
                                  custom>
                        <option>North America</option>
                        <option>EMEA</option>
                        <option>APAC</option>
                        <option>Other</option>
                    </Form.Control>
                </div> */}
            <Form.Label>Engagement categories</Form.Label>
            <Typeahead
              clearButton
              id="agency-categories"
              labelKey="name"
              multiple
              options={flatCategories}
              onChange={(selectedOption) => {
                setMissingFields([]);
                setSelectedCategories(selectedOption);
              }}
              placeholder="Choose one or more categories for this engagement"
            />
            <Form.Label>Engagement summary</Form.Label>
            <Form.Control
              as="textarea"
              rows="2"
              value={reviewtext}
              onChange={(e) => {
                setMissingFields([]);
                setReviewtext(e.target.value);
              }}
            />
            <Form.Label style={{ fontWeight: 700, fontSize: "16px" }}>
              How likely are you to recommend this agency to another marketing
              leader?
            </Form.Label>
            <Rating
              rating={npsScore}
              onRatingChanged={(sc) => setNpsScore(sc)}
            />
          </Fragment>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white"
            variant="outline-primary"
            onClick={() => onHide()}
          >
            Cancel
          </Button>
          <Button
            className="btn-white modal-primary-button"
            variant="outline-primary"
            onClick={() => {
              if (
                (agencySlug.length > 0 || agencyName.length > 0) &&
                selectedCategories.length > 0 &&
                reviewtext.length > 0
              ) {
                onSuccess({
                  agency: {
                    slug: agencySlug,
                    name: agencyName,
                  },
                  review: {
                    region: region,
                    category: selectedCategories.map((sc) => sc.id).join("\n"),
                    reviewtext: reviewtext,
                    postVisibility: postVisibility,
                    contactMe: contactMe,
                    npsScore: npsScore,
                  },
                });
              } else {
                let missingFields = [];
                if (!(agencySlug.length > 0 || agencyName.length > 0)) {
                  missingFields.push("Agency Name");
                }
                if (selectedCategories.length === 0) {
                  missingFields.push("Engagement category");
                }
                if (reviewtext.length === 0) {
                  missingFields.push("Engagement summary");
                }
                setMissingFields(missingFields);
              }
            }}
          >
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddAgency;
