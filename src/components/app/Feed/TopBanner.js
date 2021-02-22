import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import AddPostModal from "../base/AddPostModal/AddPostModal";

import Logo from "../base/icons/logo.svg";
import Search from "../base/icons/search_blue.svg";

const SearchBox = (props) => {
  const [search, setSearch] = useState("");
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="position-relative feed-page-search-box">
      <img src={Search} alt="search" width="16" height="16" />
      <Form.Control
        className="ask-question-input"
        type="text"
        placeholder={"Search " + props.placeholder}
        value={search}
        name="search"
        onChange={handleInput}
      />
    </div>
  );
};

const TopBanner = (props) => {
  const history = useHistory();
  const [showContentModal, setShowContentModal] = useState(false);
  const handleShow = () => setShowContentModal(true);
  const handleClose = () => setShowContentModal(false);

  const handleSubmit = async (content) => {
    const id = await props.saveContent(content);
    history.push(`content/${id}`);
  };

  return (
    <div className="feed-page-top-banner top-banner-container">
      <div className="d-flex">
        <CustomCard>
          <div className="d-flex align-items-center py-3 px-1">
            {props.image ? (
              <div className="feed-page-top-banner-img">
                <img src={props.image} alt="Logo" width="100" height="100" />
              </div>
            ) : (
              <div className="feed-page-top-banner-placeholder-img">
                {props.title && (
                  <img src={Logo} alt="Logo" width="58" height="58" />
                )}
              </div>
            )}
            <div className="feed-page-top-banner-content">
              <h3>{props.title}</h3>
              <p>Marketing</p>
              <div className="d-flex align-items-center">
                <span>1.4k Followers</span>
                <Button className="btn-blue mb-2" onClick={handleShow}>
                  + Follow Space
                </Button>
              </div>
            </div>
          </div>
        </CustomCard>
        <CustomCard>
          <div className="d-flex flex-column text-center py-3 px-1">
            <Button
              className="btn-white mb-2"
              variant="outline-primary"
              onClick={handleShow}
            >
              Share Article
            </Button>
            <Button className="btn-blue mb-2" onClick={handleShow}>
              Share Experience
            </Button>
            <a
              role="button"
              tabIndex="0"
              onClick={handleShow}
              className="a-blue"
            >
              Ask Question ?
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
        </CustomCard>
      </div>
      <SearchBox placeholder={props.title} />
    </div>
  );
};

export default TopBanner;
