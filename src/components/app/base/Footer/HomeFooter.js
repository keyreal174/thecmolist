import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.scss";
import { userPolicy, privacyPolicy } from "../../../util/constants";
import Facebook from "../icons/facebook.svg";
import Instagram from "../icons/instagram.svg";
import Twitter from "../icons/twitter.svg";
import Location from "../icons/location.svg";
import Message from "../icons/message.svg";

const icons = [
  {
    img: Facebook,
    url: "https://twitter.com/CMOlistHQ",
  },
  {
    img: Instagram,
    url: "https://www.linkedin.com/company/cmolist",
  },
  {
    img: Message,
    url: "mailto:hello@theCMOlist.com",
  },
];

function HomeFooter({ className }) {
  return (
    <div className="home-footer">
      <Container className="footer">
        <Row className="align-items-center footer">
          <Col md="3">
            <div className="footer__left">
              <span className="footer__copyright">
                © {new Date().getFullYear()} CMOlist, Inc.
              </span>
              <div className="footer__social_icons">
                {icons.map((icon, i) => (
                  <a key={i} href={icon.url}>
                    <img src={icon.img} alt="icons" />
                  </a>
                ))}
              </div>
            </div>
          </Col>
          <Col md="9">
            <ul className="footer__menu">
              <li>
                <Link to="/">About</Link>
              </li>
              <li>
                <a href={userPolicy}>User Agreement</a>
              </li>
              <li>
                <a href={privacyPolicy}>Privacy Policy</a>
              </li>
              <li>
                <Link to="/">Copyright Policy</Link>
              </li>
              <li>
                <Link to="/">Help</Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HomeFooter;
