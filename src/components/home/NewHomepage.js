import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import AnimationText from "../app/base/AnimationText/AnimationText";
import HomeFooter from "../app/base/Footer/HomeFooter";
import Spinner from "react-spinner-material";
import Logo from "../app/base/Header/svgs/logo.svg";
import HomeSVG from "./svg/home.svg";
import Dropbox from "./svg/dropbox.svg";
import Google from "./svg/google.svg";
import Intuit from "./svg/intuit.svg";
import Microsoft from "./svg/microsoft.svg";
import Walmart from "./svg/walmart.svg";
import Amazon from "./svg/amazon.svg";
import trustedIcon from "./svg/trusted.svg";
import knowledgeIcon from "./svg/knowledge.svg";
import informedIcon from "./svg/informed.svg";

const marketingLeaders = [
  { img: Dropbox },
  { img: Google },
  { img: Intuit },
  { img: Microsoft },
  { img: Walmart },
  { img: Amazon },
];

function Homepage() {
  const history = useHistory();
  const handleHeaderLoginButtonClick = () => {
    history.push("/login" + (window.location.search || ""));
  };

  return (
    <div className="home--page">
      <div className="home--header">
        <Container>
          <div className="home--header-logo">
            <a className="nav__logo" href="/">
              <img src={Logo} alt="CMOList logo" width="170"></img>
            </a>
          </div>
          <div className="home--header-button">
            <Button
              className="btn-white"
              variant="primary"
              onClick={handleHeaderLoginButtonClick}
            >
              Sign in
            </Button>
          </div>
        </Container>
      </div>
      <div className="home--hero">
        <Container className="home">
          <Row>
            <Col sm="12">
              <Row>
                <Col md="6">
                  <div className="home--title text-left">
                    {/*
                      <span className="mr-2">
                        Connect with your peers <br></br>
                        to get the marketing
                      </span>
                      <span>
                        <AnimationText
                          strings={[
                            "advice",
                            "tools",
                            "agencies",
                            "contractors",
                            "playbooks",
                            "news",
                          ]}
                          id="animationText"
                        />
                      </span>
                    </div>
                    <div className="mobile">
                      <span className="mr-2">
                        Connect with your <br></br>
                        peers to get the <br></br>marketing
                      </span>
                      <span>
                        <AnimationText
                          strings={[
                            "advice",
                            "tools",
                            "agencies",
                            "contractors",
                            "playbooks",
                            "news",
                          ]}
                          id="animationText1"
                        />
                      </span>
                    </div>
                    <div>you need to succeed</div>
                  </div>
                  <div className="home--description">
                    CMOlist enables marketing leaders to learn from each other
                    by sharing proven marketing stacks, best practices, and new
                    insights
                  </div>
*/}
                    <div className="desktop">
                      <span className="mr-2">
                        The private knowledge network for the world’s top
                        marketers
                      </span>
                    </div>
                    <div className="mobile">
                      <span className="mr-2">
                        The private knowledge network for the world’s top
                        marketers
                      </span>
                    </div>
                  </div>
                  <div className="home--description">
                    CMOlist is where leading marketers come together to find
                    world-class marketing stacks, agencies and advice to
                    accelerate their impact and careers
                  </div>
                  <div className="home--apply-button">
                    <Button
                      className="btn-blue"
                      variant="primary"
                      onClick={() => (window.location.href = "/signup")}
                    >
                      Apply For Membership
                    </Button>
                  </div>
                </Col>
                <Col md="6" className="d-flex align-items-center">
                  <img
                    src={HomeSVG}
                    alt="CMOList home svg"
                    className="home--svg img-fluid"
                  ></img>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home--leaders">
        <Container>
          <Row>
            <Col className="px-0" md="12" sm="12">
              <div className="home--leaders-section">
                <div className="home--leaders-section-title">
                  Developed in collaboration with leading marketers from
                </div>
                <div className="home--leaders-section-items-wrapper">
                  {marketingLeaders.map(({ img }, index) => (
                    <div key={index} className="home--leaders-section-item">
                      <img alt={`item ${index}`} src={img} />
                    </div>
                  ))}
                </div>
                {/* <Row
                  sm="12"
                  md="12"
                  className="home--leaders-section-items-wrapper"
                >
                  {marketingLeaders.map(({ img }, index) => (
                    <Col
                      md="2"
                      sm="4"
                      xs="6"
                      className="home--leaders-section-item text-center"
                    >
                      <img alt={`item ${index}`} src={img} />
                    </Col>
                  ))}
                </Row> */}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home--share" id="aboutHome">
        <Container>
          <Row>
            <Col md="12">
              <div className="home--share-title">
                Manage and share marketing knowledge with your trusted peers
              </div>
              <Row className="home--share-items-wrapper">
                <Col className="home--share-item" md="3" sm="12">
                  <div className="home--share-item-wrapper">
                    <img
                      className="home--share-item-image"
                      src={knowledgeIcon}
                      alt="Stack icon"
                    />
                    <div className="home--share-item-title">
                      Find the best marketing tools and agencies
                    </div>
                    <div className="home--share-item-subtitle">
                      View proven & emerging marketing vendors shared by leading
                      startups and public companies
                    </div>
                  </div>
                </Col>
                <Col className="home--share-item" md="3" sm="12">
                  <div className="home--share-item-wrapper">
                    <img
                      className="home--share-item-image"
                      src={informedIcon}
                      alt="Knowledge icon"
                    />
                    <div className="home--share-item-title">
                      Ask for marketing advice and search answers
                    </div>
                    <div className="home--share-item-subtitle">
                      Post questions and search insights, playbooks, and best
                      practices shared by the world's best marketers
                    </div>
                  </div>
                </Col>
                <Col className="home--share-item" md="3" sm="12">
                  <div className="home--share-item-wrapper">
                    <img
                      className="home--share-item-image"
                      src={trustedIcon}
                      alt="Network icon"
                    />
                    <div className="home--share-item-title">
                      Accelerate your marketing career
                    </div>
                    <div className="home--share-item-subtitle">
                      Network with other top marketers and find career, advisor,
                      and board opportunities
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
      <HomeFooter className="home--footer" />
    </div>
  );
}

export default Homepage;
