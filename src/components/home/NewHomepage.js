import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import AnimationText from "../app/base/AnimationText/AnimationText";
import Footer from "../app/base/Footer/Footer";
import Spinner from "react-spinner-material";
import Logo from "../app/base/Header/svgs/logo.svg";

function Homepage() {
  const history = useHistory();
  const handleHeaderLoginButtonClick = () => {
    console.log("click");
    history.push("/login");
  };

  return (
    <Container className="home height-100">
      <Row className="home--header">
        <div className="home--header-logo">
          <a className="nav__logo" href="/">
            <img src={Logo} alt="CMOList logo"></img>
          </a>
        </div>
        <div className="home--header-button">
          <Button onClick={handleHeaderLoginButtonClick}>Sign in</Button>
        </div>
      </Row>
      <Row style={{ minHeight: "calc(100vh - 60px)" }}>
        <Col md="1" sm="0"></Col>
        <Col md="10" sm="12">
          <div className="home--title text-left">
            <div>Connect with your marketing</div>
            <div className="d-flex">
              <span className="mr-2">peers to get the</span>
              <AnimationText
                strings={[
                  "advice",
                  "tools",
                  "agencies",
                  "contractors",
                  "insights",
                ]}
              />
            </div>
            <div>you need to succeed</div>
          </div>
        </Col>
        <Col md="1" sm="0"></Col>
      </Row>
      <Footer className="home--footer" />
    </Container>
  );
}

export default Homepage;
