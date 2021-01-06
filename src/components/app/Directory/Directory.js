import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Banner from "../base/Banner/Banner";

import "./directory.css";

const directoryRequest = () => {
  return (dispatch) => {
    return axios.get("/api/directory");
  };
};

class Directory extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Directory";
    this.state = {
      directoryData: [],
    };
  }

  componentDidMount() {
    this.fetchDirectory();
  }

  fetchDirectory() {
    this.props.directoryRequest().then(({ data }) => {
      this.setState({
        directoryData: data.directoryData,
      });
    });
  }

  render() {
    let directoryData = this.state ? this.state.directoryData : [];
    let renderColumn = (data) => {
      return (
        <Col md="4" className="mb-2">
          <Link
            style={{
              color: "#0175B0",
              "font-weight": 500,
            }}
            to={data.link}
          >
            {data.title}
            {data.suffix && <span>&nbsp;{data.suffix}</span>}
          </Link>
        </Col>
      );
    };
    let renderRowLevel = (rowLevel) => {
      return (
        <Fragment>
          {rowLevel.title && (
            <Row>
              <Col md="10">
                <Link
                  style={{
                    color: "#0175B0",
                    "font-weight": 500,
                  }}
                  to={rowLevel.link}
                >
                  {rowLevel.title}
                  {rowLevel.suffix && <span>&nbsp;{rowLevel.suffix}</span>}
                </Link>
              </Col>
            </Row>
          )}
          <Row>{rowLevel.data.map((c, idx) => renderColumn(c))}</Row>
        </Fragment>
      );
    };
    let renderTopLevel = (topLevel) => {
      return (
        <Fragment>
          <Row>
            <Col md="10">
              <h4
                className="mb-2"
                style={{
                  "font-size": "20px",
                  color: "#222222",
                  "font-weight": "normal",
                  "margin-top": "15px",
                }}
              >
                <Link
                  style={{
                    color: "#0175B0",
                    "font-weight": 600,
                  }}
                  to={topLevel.link}
                >
                  {topLevel.title}
                  {topLevel.suffix && <span>&nbsp;{topLevel.suffix}</span>}
                </Link>
              </h4>
            </Col>
          </Row>
          {renderRowLevel(topLevel.data)}
        </Fragment>
      );
    };
    return (
      <>
        <Container className="height-100">
          <Header />
          <div className="wrapper">
            <Banner>
              <div className="square-logo">
                <img
                  src="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
                  alt=""
                />
              </div>
            </Banner>
            <div className="overview">
              <Row className="border">
                <Col md="10" className="mb-2">
                  <h2 className="overview-header mb-1">Directory</h2>
                  <p>
                    Trusted directory of CMO-approved, world-class marketing,
                    design, and technology service providers
                  </p>
                </Col>
              </Row>
            </div>
            {directoryData.map((d) => {
              return (
                <div
                  className="article-wrapper"
                  style={{ "margin-top": "10px", "padding-bottom": "10px" }}
                >
                  <div style={{ "padding-left": "30px" }}>
                    {renderTopLevel(d)}
                  </div>
                </div>
              );
            })}
            <Footer />
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, { directoryRequest })(Directory);
