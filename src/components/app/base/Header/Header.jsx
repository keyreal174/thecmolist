import React, { Fragment, useState, useEffect } from "react";
import "./header.scss";
import AddPostModal from "../AddPostModal/AddPostModal";
import clsx from "clsx";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { Navbar, Nav, NavDropdown, Button, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";
import PersonHeader from "../PersonHeader/PersonHeader";

import Apps from "../icons/apps.svg";
import Group from "../icons/group.svg";
import HomeIcon from "../icons/home.svg";
import Logo from "./svgs/logo.svg";
import Notification from "../icons/notification.svg";
import Rectangle2 from "../icons/rectangle2.svg";
import Search from "../icons/search.svg";
import InviteButton from "../InviteButton/InviteButton";
import AddVendorButton from "../AddVendors/AddVendorButton";

function RenderSearch({
  className,
  isLoading,
  handleSearch,
  options,
  goSearchPage,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  return (
    <AsyncTypeahead
      className={clsx("header-search", className)}
      id="async-global-search"
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
          <TypeaheadMenu options={results} labelKey="name" {...menuProps} />
        );
      }}
      onChange={(selectedOption) => {
        window.location.href = selectedOption[0].link;
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && activeIndex === -1) {
          goSearchPage();
        }
      }}
      placeholder="Search"
      renderMenuItemChildren={(option) => (
        <Fragment>
          {option.avatar_url && (
            <img
              alt="avatar"
              src={option.avatar_url}
              style={{
                height: "24px",
                marginRight: "10px",
                width: "24px",
              }}
            />
          )}
          <span>{option.name}</span>
        </Fragment>
      )}
    >
      {(props) => {
        // From https://stackoverflow.com/questions/63275021/react-bootstrap-typeahead-handling-enter-key-if-no-menu-item-selected
        // We use this method to check whether an item is selected in the typeahead menu
        // The Typeahead component exposes partial internal state, including
        // the index of the highlighted menu item.
        setActiveIndex(props.activeIndex);
        return (
          <Button className="search-btn" variant="submit">
            <img src={Search} alt="" />
          </Button>
        );
      }}
    </AsyncTypeahead>
  );
}

function RenderMobileDropdown({ saveContent, history, mobileMenuOpen }) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [contentType, setContentType] = useState("");

  const handleClose = (_) => {
    setShowPostModal(false);
  };

  const handlePostModalSubmit = async (content) => {
    const id = await saveContent(content);
    history.push(`/content/${id}`);
  };

  const handleNavDropdownItemClick = (type) => {
    setContentType(type);
    setShowPostModal(true);
  };

  return (
    <div className={clsx("navbar-dropdown--wrapper", mobileMenuOpen && "open")}>
      <NavDropdown
        className="navbar-dropdown post-dropdown"
        title="Post"
        id="basic-nav-dropdown"
      >
        <div>
          <Button
            className="btn btn-white mb-2 w-100 mobile-navbar-button"
            onClick={() => handleNavDropdownItemClick("question")}
          >
            Ask Question
          </Button>
          <AddVendorButton
            lightMode
            text="Share Vendors"
            className="w-100 mb-2 mobile-navbar-button"
          />
          <InviteButton
            lightMode
            text="Invite Peers"
            className="w-100 mobile-navbar-button"
          />
        </div>
      </NavDropdown>
      <AddPostModal
        contentType={contentType}
        firstButtonText={"Cancel"}
        handleClose={handleClose}
        modalTitle="Ask a question"
        onSubmit={handlePostModalSubmit}
        secondButtonText={"Ask a question"}
        show={showPostModal}
      />
    </div>
  );
}

function Header({
  className,
  getProfileStats,
  profileStats,
  onToggle,
  saveContent,
}) {
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => await getProfileStats();

    fetch();
  }, []);
  useEffect(() => {
    const profile = profileStats && profileStats.profile;
    if (profile) {
      if ("onboarded" in profile && !profile.onboarded) {
        window.location.href =
          "/onboarding_step1?r=" + window.btoa(window.location.pathname);
      }
    }
  }, [profileStats]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const SEARCH_URI = "/api/globalsearch";
  const handleSearch = (query) => {
    setSearchQuery(query);
    setIsLoading(true);
    fetch(`${SEARCH_URI}?q=${query}&page=1&per_page=50`)
      .then((resp) => resp.json())
      .then(({ items }) => {
        const options = items.map((i) => ({
          avatar_url: i.avatar_url,
          id: i.id,
          slug: i.slug,
          name: i.name,
          link: i.link,
        }));
        setOptions(options);
        setIsLoading(false);
      });
  };
  const notificationCount = 0; // FUTURE: fetch this from a model

  const goSearchPage = () => {
    // disable this for now as the full search page isn't ready yet
    // history.push({
    //   pathname: "/search",
    //   state: {
    //     query: searchQuery,
    //   },
    // });
  };

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    onToggle && onToggle();
  };

  return (
    <div
      className={clsx(
        "header",
        className && className,
        mobileMenuOpen && "open"
      )}
    >
      <Container>
        <Navbar expand="md" variant="white" onToggle={handleToggle}>
          <div className="d-flex">
            <Navbar.Toggle
              className={clsx("navbar-toggler", mobileMenuOpen && "open")}
              aria-controls="basic-navbar-nav"
            />
            <Navbar.Brand
              className={clsx(
                "header--logo",
                mobileMenuOpen && "open",
                mobileMenuOpen && "fadeElementIn"
              )}
              href="/feed"
            >
              <img src={Logo} alt="CMOList brand logo" />
              <span className="header--tag">Beta</span>
            </Navbar.Brand>
            <RenderMobileDropdown
              saveContent={saveContent}
              history={history}
              mobileMenuOpen={mobileMenuOpen}
            />
          </div>
          <RenderSearch
            className={clsx("navbar--mobile-search", mobileMenuOpen && "open")}
            isLoading={isLoading}
            handleSearch={handleSearch}
            options={options}
            goSearchPage={goSearchPage}
          />
          <Navbar.Collapse className="nav-app" id="basic-navbar-nav">
            <RenderSearch
              className="navbar--search"
              isLoading={isLoading}
              handleSearch={handleSearch}
              options={options}
              goSearchPage={goSearchPage}
            />
            <Nav className={clsx(mobileMenuOpen && "fadeAndSlideElementIn")}>
              <Nav.Link as={NavLink} to="/feed">
                <img src={HomeIcon} alt="" />
                <div>Home</div>
                <div className="header--separator"></div>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/network">
                <img src={Group} alt="Members" />
                <div>Members</div>
                <div className="header--separator"></div>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/vendors">
                <img src={Apps} alt="Stacks" />
                <div>Stacks</div>
                <div className="header--separator"></div>
              </Nav.Link>
              <Nav.Link as={NavLink} to="/notifications">
                <img src={Notification} alt="" />
                <div>Notifications</div>
                <div className="header--separator"></div>
                {notificationCount > 0 && (
                  <div className="notifications--wrapper">
                    <img
                      className="notifications--rectangle"
                      src={Rectangle2}
                      alt="Amount rectangle"
                    />
                    <span className="notifications--number">
                      {notificationCount}
                    </span>
                  </div>
                )}
              </Nav.Link>

              <NavDropdown
                className={
                  window.location.href.includes("/profile/") ? "active" : ""
                }
                alignRight
                title={<PersonHeader profile={profileStats.profile} />}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item className="profile-dropdown" href="/profile">
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item className="profile-dropdown" href="/settings">
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Item className="profile-dropdown" href="/logout">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
}
const mapState = (state) => {
  return {
    profileStats: state.profileModel.profileStats,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveContent: dispatch.contentModel.saveContent,
  };
};

export default connect(mapState, mapDispatch)(Header);
