import React, { useState } from "react";
import { useHistory } from "react-router";
import { Button, Form } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import AddPostModal from "../base/AddPostModal/AddPostModal";
import AddVendorButton from "../base/AddVendors/AddVendorButton";
import InviteButton from "../base/Invite/InviteButton";
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

const TopBanner = ({
  title,
  subtitle,
  image,
  activeGroup,
  saveContent,
  followTopic,
  topic,
  isAdminUser,
}) => {
  const history = useHistory();
  const [showContentModal, setShowContentModal] = useState(false);
  const [contentType, setContentType] = useState("question");
  const handleShow = (type) => {
    setContentType(type);
    setShowContentModal(true);
  };
  const handleClose = () => setShowContentModal(false);

  const handleSubmit = async (content) => {
    const id = await saveContent(content);
    history.push(`/content/${id}`);
  };

  const handleTopicButtonClick = () => {
    followTopic(topic.slug);
  };

  return (
    <div className="feed-page-top-banner top-banner-container">
      <div className="d-flex">
        <CustomCard className="w-100">
          <div className="feed-page-top-banner-social d-flex align-items-center py-3 px-1">
            {image ? (
              <div className="feed-page-top-banner-img">
                <img src={image} alt="Logo" width="100" height="100" />
              </div>
            ) : (
              <div className="feed-page-top-banner-placeholder-img">
                {title && <img src={Logo} alt="Logo" width="58" height="58" />}
              </div>
            )}
            <div className="feed-page-top-banner-content">
              <h3>{title}</h3>
              {subtitle && <p>{subtitle}</p>}
              <div className="d-flex align-items-center mt-2">
                {topic &&
                  (topic.followed ? (
                    <Button
                      className="btn-blue modal-primary-button btn_followed"
                      variant="outline-primary"
                      onClick={handleTopicButtonClick}
                    >
                      Following
                    </Button>
                  ) : (
                    <Button
                      className="btn-white btn_following"
                      variant="outline-primary"
                      onClick={handleTopicButtonClick}
                    >
                      Follow
                    </Button>
                  ))}
              </div>
            </div>
          </div>
        </CustomCard>
        <CustomCard className="top-banner--right-column">
          <div className="d-flex flex-column text-center py-3 px-1">
            <Button
              className="btn-blue mb-2 top-banner-button"
              onClick={() => handleShow("question")}
            >
              Ask Question
            </Button>
            <AddVendorButton
              lightMode
              text="Share Vendors"
              className="w-100 mb-2 top-banner-button"
            />
            <InviteButton
              lightMode
              text="Nominate CMO"
              isAdminUser={isAdminUser}
              className="w-100 top-banner-button"
            />
            <AddPostModal
              contentType={contentType}
              activeGroup={activeGroup}
              show={showContentModal}
              onSubmit={handleSubmit}
              handleClose={handleClose}
            />
          </div>
        </CustomCard>
      </div>
      {/* Disable for now as in topic search isn't supported yet */}
      {/* <SearchBox placeholder={title} /> */}
    </div>
  );
};

export default TopBanner;
