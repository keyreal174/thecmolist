import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Footer from "../app/base/Footer/Footer";
import LinkedIn from "../login/icons/linkedin.svg";
import axios from "axios";
import Spinner from "react-spinner-material";
import Util from "../util/Util";
import querySearch from "stringquery";
import { scriptURL, privacyPolicy } from "../util/constants";

import "./homepage.scss";

const loginRequest = (user, password) => {
  var postBody = {
    user: user,
    pass: password,
  };
  return axios.post("/api/login", postBody);
};

const linkedinAuthUrl = () => {
  return axios.get("/api/lnkd_auth_url");
};

function Homepage() {
  const [loading, setLoading] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const query = querySearch(window.location.search);
  const redirectUrl = query.redirect ? decodeURIComponent(query.redirect) : "/";

  const showUsernameField = !window.location.hostname.includes("thecmolist");

  const handleFormLeftSubmit = (e) => {
    e.preventDefault();
    const form = document.forms["left-form"];

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        console.log("Success!", response);
        window.location.href = "/signedup";
      })
      .catch((error) => {
        console.error("Error!", error.message);
        window.alert("An error occurred!");
      });
  };

  const handleLoginClick = (e) => {
    const {
      target: { elements },
    } = e;
    const { email, password } = elements;

    e.preventDefault();
    setLoading(true);

    loginRequest(email.value, password.value)
      .then(({ data }) => {
        if (data.success) {
          if (Util.inLocalDevelopment()) {
            document.cookie = "ipipeauth: foo";
          }
          window.location.href = redirectUrl;
        } else {
          let errorMessage = data.error || "Unknown";
          alert("An error occurred: " + errorMessage);
          setLoading(false);
        }
      })
      .catch(function (error) {
        alert("An error occurred: " + error);
        setLoading(false);
      });
  };

  const handleLinkedInClick = (e) => {
    e.preventDefault();
    window.location.href = linkedInUrl;
  };

  useEffect(() => {
    const fetchLinkedInUrl = async () => {
      const { data } = await linkedinAuthUrl();
      setLinkedInUrl(data.url);
    };
    fetchLinkedInUrl();
  }, []);

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
        <Col md="1"></Col>
        <Col md="10">
          <div className="home--title">
            Connecting marketing leaders with the advice and resources they need
            to succeed
          </div>
        </Col>
        <Col md="1"></Col>
      </Row>
      <Row>
        <Col md="2"></Col>
        <Col md="8">
          <div className="home--subtitle">
            CMOlist enables marketing leaders to learn from each other by
            sharing critical insights, best practices, and proven vendors.
          </div>
        </Col>
        <Col md="2"></Col>
      </Row>
      <Row className="home--form">
        <Col className="px-0" md="6">
          <Form
            className="home--form-left"
            id="left-form"
            onSubmit={handleFormLeftSubmit}
          >
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
                <Form.Group>
                  <Form.Label className="home--label">Email</Form.Label>
                  <Form.Control
                    className="home--input"
                    placeHolder="name@company.com"
                    required={true}
                    id="email"
                    type="email"
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
                    placeHolder="https://linkedin.com/in/linkedinID"
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
          <Form className="home--form-right" onSubmit={handleLoginClick}>
            <div className="home--form-title">Sign in</div>
            <div className="home--form-green-text" />
            <div className="home--form-subtitle">
              Already have an account or received a invitation? Sign in here:
            </div>
            <Row>
              {showUsernameField && (
                <Col md="12">
                  <Form.Group>
                    <Form.Label className="home--label">Email</Form.Label>
                    <Form.Control
                      className="home--input"
                      name="email"
                      type="email"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="home--label">Password</Form.Label>
                    <Form.Control
                      className="home--input"
                      name="password"
                      type="password"
                      required={true}
                    />
                  </Form.Group>
                  <Button
                    className="home--form-linkedin btn__homepage btn__homepage-blue signup--form-apply"
                    type="submit"
                  >
                    <span>Login</span>
                    <div
                      style={{
                        "margin-top": "5px",
                        "margin-right": "4px",
                        float: "right",
                      }}
                    >
                      <Spinner
                        radius={10}
                        color={"#eee"}
                        stroke={2}
                        visible={loading}
                      />
                    </div>
                  </Button>
                </Col>
              )}
              <Col md="12">
                <Button
                  className="home--form-linkedin btn__homepage btn__homepage-blue signup--form-apply"
                  onClick={handleLinkedInClick}
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
                  and <a href={privacyPolicy}>Privacy Policy</a>.
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
