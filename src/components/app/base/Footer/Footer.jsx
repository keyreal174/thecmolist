import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./footer.css";

function Footer() {
  return (
    <Container>
      <Row className="align-items-center footer">
        <Col md={{ span: 9, order: "last" }}>
          <ul className="footer__menu">
            <li>
              <Link to="/">About</Link>
            </li>
            <li>
              <Link to="/">User Agreement</Link>
            </li>
            <li>
              <Link to="/">Privacy Policy</Link>
            </li>
            <li>
              <Link to="/">Copyright Policy</Link>
            </li>
            <li>
              <Link to="/">Help</Link>
            </li>
          </ul>
        </Col>
        <Col md={{ span: 3, order: "first" }}>
          <div className="footer__left">
            <a className="footer__logo" href="/feed">
              CMO<span>list</span>
            </a>
            <span className="footer__copyright">&copy; 2020</span>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
