import React from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Footer from "../app/base/Footer/Footer";
import LinkedIn from "../login/icons/linkedin.svg";

import "./homepage.scss";

function Homepage() {
  const handleFormLeftSubmit = (e) => {
    e.preventDefault();
    const {
      target: { elements },
    } = e;
    const { name, mail, linkedIn } = elements;
    const content = {
      name: name.value,
      mail: mail.value,
      linkedIn: linkedIn.value,
    };
    console.log(content);
  };
  const handleFormRightSubmit = (e) => {
    e.preventDefault();
    console.log("sign in with linkedIn");
  };
  return (
    <Container className="home height-100">
      <Row className="home--header">
        <div className="ml-5">
          <a className="nav__logo" href="/">
            CMO<span>list</span>
          </a>
        </div>
      </Row>
      <Row>
        <Col md="2"></Col>
        <Col md="8">
          <div className="home--title">
            Manage and share marketing knowledge with your trusted peers
          </div>
        </Col>
        <Col md="2"></Col>
      </Row>
      <Row>
        <Col md="2"></Col>
        <Col md="8">
          <div className="home--subtitle">
            CMOlist is a private knowledge network that helps marketing leaders
            learn from each other by sharing critical insights, best practices,
            and proven vendors.
          </div>
        </Col>
        <Col md="2"></Col>
      </Row>
      <Row className="home--form">
        <Col className="px-0" md="6">
          <Form className="home--form-left" onSubmit={handleFormLeftSubmit}>
            <div className="home--form-title">Join CMOlist</div>
            <div className="home--form-green-text">Currently invite only</div>
            <div className="home--form-subtitle">
              Fill out the form below to apply:
            </div>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="home--label">Name</Form.Label>
                  <Form.Control
                    className="home--input"
                    placeHolder="First name, Last name"
                    required={true}
                    id="name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="home--label">Email</Form.Label>
                  <Form.Control
                    className="home--input"
                    placeHolder="name@company.com"
                    required={true}
                    id="mail"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label className="home--label">LinkedIn</Form.Label>
                  <Form.Control
                    className="home--input"
                    placeHolder="https://linkedin/.com/in/linkedinID"
                    required={true}
                    id="linkedIn"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="btn__homepage btn__homepage-blue signup--form-apply"
                >
                  Apply
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col className="px-0" md="6">
          <Form className="home--form-right" onSubmit={handleFormRightSubmit}>
            <div className="home--form-title">Sign in</div>
            <div className="home--form-green-text" />
            <div className="home--form-subtitle">
              Already have an account or received a invitation? Sign in here:
            </div>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="home--form-linkedin btn__homepage btn__homepage-blue signup--form-apply"
                >
                  <div>
                    <span className="mr-2">
                      <img src={LinkedIn} alt="linkeding" />
                    </span>
                    <span>Sign in with LinkedIn</span>
                  </div>
                </Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="home--form-eula">
                  By signing in, you agree to our <a href="#">User Agreement</a>{" "}
                  and <a href="#">Privacy Policy</a>.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p className="home--form-questions">
                  Any questions or problems signing in? Please contact us at{" "}
                  <a href="mailto:hello@theCMOlist.com">hello@theCMOlist.com</a>
                </p>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Footer className="home--footer" />
    </Container>
  );
}

export default Homepage;
