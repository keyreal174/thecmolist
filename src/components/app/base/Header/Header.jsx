import React, { Fragment, useState, useEffect } from "react";
import "./header.scss";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import { connect } from "react-redux";
import { isSmall } from "../../../util/constants";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
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

function RenderSearch({ isLoading, handleSearch, options, goSearchPage }) {
  return (
    <AsyncTypeahead
      className="header-search"
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
        if (e.key === "Enter") {
          goSearchPage();
        }
      }}
      placeholder="Search"
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
    >
      <Button className="search-btn" variant="submit">
        <img src={Search} alt="" />
      </Button>
    </AsyncTypeahead>
  );
}

function Header({ getProfileStats, profileStats, onToggle }) {
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => await getProfileStats();

    fetch();
  }, []);
  const [open, setOpen] = useState(false);
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
    history.push({
      pathname: "/search",
      state: {
        query: searchQuery,
      },
    });
  };

  const handleToggle = () => {
    setOpen(!open);
    onToggle && onToggle();
  };

  return (
    <div>
      <div className={`container-fullwidth ${open ? "open" : ""}`}></div>
      <Navbar expand="md" variant="white" onToggle={handleToggle}>
        <div className="d-flex">
          <Navbar.Toggle
            className={`navbar-toggler ${open ? "open" : ""}`}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Brand className="header--logo" href="/feed">
            <img src={Logo} alt="CMOList brand logo" />
            <span className="header--tag">Beta</span>
          </Navbar.Brand>
          {isSmall && !open && (
            <NavDropdown
              className="navbar-dropdown"
              title="Share experience"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item>Ask Question</NavDropdown.Item>
              <NavDropdown.Item>Share Article</NavDropdown.Item>
              <NavDropdown.Item>Share experience</NavDropdown.Item>
            </NavDropdown>
          )}
        </div>
        {isSmall && !open && (
          <RenderSearch
            isLoading={isLoading}
            handleSearch={handleSearch}
            options={options}
            goSearchPage={goSearchPage}
          />
        )}
        <Navbar.Collapse className="nav-app" id="basic-navbar-nav">
          {!isSmall && (
            <RenderSearch
              isLoading={isLoading}
              handleSearch={handleSearch}
              options={options}
              goSearchPage={goSearchPage}
            />
          )}
          <Nav>
            <Nav.Link as={NavLink} to="/feed">
              <img src={HomeIcon} alt="" />
              <div>Home</div>
              <div className="header--separator"></div>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/network">
              <img src={Group} alt="" />
              <div>My Networks</div>
              <div className="header--separator"></div>
            </Nav.Link>
            <Nav.Link as={NavLink} to="/topics">
              <img src={Apps} alt="" />
              <div>Topics</div>
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
  };
};

export default connect(mapState, mapDispatch)(Header);
