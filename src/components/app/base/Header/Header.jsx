import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import { NavLink } from "react-router-dom";
import "./header.scss";
import { connect } from "react-redux";

import HomeIcon from "../icons/home.svg";
import Group from "../icons/group.svg";
import Notification from "../icons/notification.svg";
import Apps from "../icons/apps.svg";
import Person from "../icons/person.svg";
import Search from "../icons/search.svg";
import Rectangle2 from "../icons/rectangle2.svg";
import Logo from "./svgs/logo.svg";

function Header({ getProfileStats, profileStats }) {
  const history = useHistory();
  useEffect(() => {
    const fetch = async () => await getProfileStats();

    fetch();
  }, []);
  let PersonHeader = (props) => {
    const profile = profileStats && profileStats.profile;
    const image = profile && profile.image;
    const name = profile && profile.name;

    return (
      <Fragment>
        <img alt="" src={image} />
        <br />
        <span>{name && name.split(" ")[0]}</span>
      </Fragment>
    );
  };
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const SEARCH_URI = "/api/globalsearch";
  const isSmall = window.innerWidth < 767;
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

  return (
    <div>
      <div className="container-fullwidth"></div>
      <Navbar expand="md" variant="white">
        <Navbar.Brand href="/feed">
          <img src={Logo} alt="CMOList brand logo" />
          <span className="header--tag">beta</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="nav-app" id="basic-navbar-nav">
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
                <TypeaheadMenu
                  options={results}
                  labelKey="name"
                  {...menuProps}
                />
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
          <Nav>
            <Nav.Link as={NavLink} to="/feed">
              <img src={HomeIcon} alt="" />
              {isSmall ? "" : "Home"}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/network">
              <img src={Group} alt="" />
              {isSmall ? "" : "My Networks"}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/topics">
              <img src={Apps} alt="" />
              {isSmall ? "" : "Topics"}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/notifications">
              <img src={Notification} alt="" />
              {isSmall ? "" : "Notifications"}
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
              title={<PersonHeader icon={Person} />}
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
