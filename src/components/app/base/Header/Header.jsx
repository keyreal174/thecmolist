import React, { Fragment, useState } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import { NavLink } from "react-router-dom";
import "./header.css";

import HomeIcon from "./icons/home.svg";
import Group from "./icons/group.svg";
import Forum from "./icons/forum.svg";
import Apps from "./icons/apps.svg";
import Person from "./icons/person.svg";
import Search from "./icons/search.svg";

function Header() {
  let PersonHeader = (props) => (
    <Fragment>
      <img src={props.icon} alt="" />
      <br />
      <span>Me</span>
    </Fragment>
  );
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const SEARCH_URI = "/api/globalsearch";
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
          link: i.link,
        }));
        setOptions(options);
        setIsLoading(false);
      });
  };

  return (
    <Navbar expand="md" variant="dark">
      <Navbar.Brand href="/feed">
        CMO<span>list</span>
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
              <TypeaheadMenu options={results} labelKey="name" {...menuProps} />
            );
          }}
          onChange={(selectedOption) => {
            window.location.href = selectedOption[0].link;
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
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/network">
            <img src={Group} alt="" />
            My Network
          </Nav.Link>
          <Nav.Link as={NavLink} to="/directory">
            <img src={Apps} alt="" />
            Vendors
          </Nav.Link>
          <a className="nav-link" href="https://forum.thecmolist.com">
            <img className="forum-icon" src={Forum} alt="" />
            Forum
          </a>
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
            <NavDropdown.Item className="profile-dropdown" href="/logout">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
