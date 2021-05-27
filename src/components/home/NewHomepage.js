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
    console.log("click");
    history.push("/login");
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
        <Container className="home height-100">
          <Row>
            <Col sm="12">
              <Row>
                <Col md="6">
                  <div className="home--title text-left">
                    <div className="">
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
                        />
                      </span>
                    </div>
                    <div>you need to succeed</div>
                  </div>
                  <div className="home--description">
                    CMOlist enables marketing leaders to learn from each others
                    by sharing critical insights, best practices, and proven
                    vendors.
                  </div>
                  <div className="home--apply-button">
                    <Button
                      className="btn-blue"
                      variant="primary"
                      onClick="window.location.href='/signup"
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
                <Row
                  sm="12"
                  md="12"
                  className="home--leaders-section-items-wrapper"
                >
                  {marketingLeaders.map(({ img }, index) => (
                    <Col
                      md="2"
                      sm="6"
                      className="home--leaders-section-item text-center"
                    >
                      <img alt={`item ${index}`} src={img} />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home--share">
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
                      src={trustedIcon}
                      alt="trusted icon"
                    />
                    <div className="home--share-item-title">
                      Get trusted advice from your marketing peers
                    </div>
                    <div className="home--share-item-subtitle">
                      Exchange frank, private advice with your peers, trusted
                      communities, and industry experts
                    </div>
                  </div>
                </Col>
                <Col className="home--share-item" md="3" sm="12">
                  <div className="home--share-item-wrapper">
                    <img
                      className="home--share-item-image"
                      src={knowledgeIcon}
                      alt="knowledge icon"
                    />
                    <div className="home--share-item-title">
                      View marketing stacks and playbooks
                    </div>
                    <div className="home--share-item-subtitle">
                      Browse proven marketing stacks and playbooks shared by
                      your peers and industry experts
                    </div>
                  </div>
                </Col>
                <Col className="home--share-item" md="3" sm="12">
                  <div className="home--share-item-wrapper">
                    <img
                      className="home--share-item-image"
                      src={informedIcon}
                      alt="informed icon"
                    />
                    <div className="home--share-item-title">
                      Stay informed & learn from leading marketers
                    </div>
                    <div className="home--share-item-subtitle">
                      Network with your peers and follow marketing insights from
                      industry experts
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