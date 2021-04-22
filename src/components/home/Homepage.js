import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Footer from "../app/base/Footer/Footer";
import LinkedIn from "../login/icons/linkedin.svg";
import axios from "axios";
import Spinner from "react-spinner-material";
import Util from "../util/Util";
import querySearch from "stringquery";
import { scriptURL, privacyPolicy } from "../util/constants";

import Logo from "../app/base/Header/svgs/logo.svg";
import trustedIcon from "./svg/trusted.svg";
import knowledgeIcon from "./svg/knowledge.svg";
import informedIcon from "./svg/informed.svg";
import googleIcon from "./svg/google.svg";
import dropboxIcon from "./svg/dropbox.svg";
import walmartIcon from "./svg/walmart.svg";
import microsoftIcon from "./svg/microsoft.svg";
import intuitIcon from "./svg/intuit.svg";
import amazonIcon from "./svg/amazon.svg";

import "./homepage.scss";

const loginRequest = (user, password) => {
  var postBody = {
    user: user,
    pass: password,
  };
  return axios.post("/api/login", postBody);
};

const linkedinAuthUrl = (from) => {
  return axios.get("/api/lnkd_auth_url?redirect=" + from);
};

const marketingLeaders = [
  { img: googleIcon },
  { img: dropboxIcon },
  { img: walmartIcon },
  { img: microsoftIcon },
  { img: intuitIcon },
  { img: amazonIcon },
];

function Homepage() {
  let location = useLocation();
  let locationFrom =
    location && location.state && location.state.from
      ? location.state.from.pathname
      : null;
  let from = locationFrom ? locationFrom : "/";
  const [loading, setLoading] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState("");

  const query = querySearch(window.location.search);
  const redirectUrl = query.redirect ? decodeURIComponent(query.redirect) : "/";
  const hostName = window.location.hostname;
  const showUsernameField =
    !hostName.includes("thecmolist") && !hostName.includes("localhost");

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

  const history = useHistory();
  const handleHeaderLoginButtonClick = () => {
    console.log("click");
    history.push("/login");
  };

  const handleLinkedInClick = (e) => {
    e.preventDefault();
    window.location.href = linkedInUrl;
  };

  useEffect(() => {
    const fetchLinkedInUrl = async () => {
      const { data } = await linkedinAuthUrl(from);
      setLinkedInUrl(data.url);
    };
    fetchLinkedInUrl();
  }, []);

  return (
    <Container className="home height-100">
      <Row className="home--header">
        <div>
          <a className="nav__logo" href="/">
            <img src={Logo} alt="CMOList logo"></img>
          </a>
        </div>
        <div className="home--header-button">
          <Button onClick={handleHeaderLoginButtonClick}>Sign in</Button>
        </div>
      </Row>
      <Row>
        <Col md="1" sm="0"></Col>
        <Col md="10" sm="12">
          <div className="home--title">
            Connect with your marketing peers to get the advice and resources
            you need to succeed
          </div>
        </Col>
        <Col md="1" sm="0"></Col>
      </Row>
      <Row>
        <Col md="2" sm="0"></Col>
        <Col md="8" sm="12">
          <div className="home--subtitle">
            CMOlist is a private knowledge network that helps marketing leaders
            learn from each other by sharing critical insights, best practices,
            and proven vendors.
          </div>
        </Col>
        <Col md="2" sm="0"></Col>
      </Row>
      <Row className="home--form">
        <Col className="px-0" md="6" sm="12">
          <Form
            className="home--form-left"
            id="left-form"
            onSubmit={handleFormLeftSubmit}
          >
            <div className="home--form-title">Apply for Membership</div>
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
        <Col className="px-0" md="6" sm="12">
          <Form className="home--form-right" onSubmit={handleLoginClick}>
            <div className="home--form-title">Member Sign in</div>
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
      <Row className="home--leaders">
        <Col className="px-0" md="12" sm="12">
          <div className="home--leaders-section">
            <div className="home--leaders-section-title">
              Developed in close collaboration with marketing executives from
              leading companies including
            </div>
            <Row
              sm="12"
              md="12"
              className="home--leaders-section-items-wrapper"
            >
              {marketingLeaders.map(({ img }, index) => (
                <Col md="2" sm="6" className="home--leaders-section-item">
                  <img alt={`item ${index}`} src={img} />
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <div className="home--share">
            <div className="home--share-title">
              Manage and share marketing knowledge with your trusted peers
            </div>
            <Row className="home--share-items-wrapper">
              <Col className="home--share-item" md="3" sm="12">
                <img
                  className="home--share-item-image"
                  src={trustedIcon}
                  alt="trusted icon"
                />
                <div className="home--share-item-title">Get trusted advice</div>
                <div className="home--share-item-subtitle">
                  Exchange frank, private advice with trusted peers and industry
                  experts
                </div>
              </Col>
              <Col className="home--share-item" md="3" sm="12">
                <img
                  className="home--share-item-image"
                  src={knowledgeIcon}
                  alt="knowledge icon"
                />
                <div className="home--share-item-title">Unlock knowledge</div>
                <div className="home--share-item-subtitle">
                  Turn emails, slacks, and wikis into structured and searchable
                  marketing knowledge
                </div>
              </Col>
              <Col className="home--share-item" md="3" sm="12">
                <img
                  className="home--share-item-image"
                  src={informedIcon}
                  alt="informed icon"
                />
                <div className="home--share-item-title">Stay informed</div>
                <div className="home--share-item-subtitle">
                  Network with your peers and get updates on new marketing
                  trends and insights
                </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Footer className="home--footer" />
    </Container>
  );
}

export default Homepage;
