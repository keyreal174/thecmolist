import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import Column from "./Column";
import "./topics.scss";

const Topics = (props) => {
  useEffect(() => {
    props.fetchTopics();
  }, []);

  return (
    <>
      <Container className="height-100">
        <Header />
        <div className="wrapper">
          <SimpleTopBanner
            title="Topics"
            image="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
          />
          <Row className="mt-3">
            {props.topics.map((topic) => {
              return (
                <Col key={topic.id} lg={3} md={4} sm={6} className="mb-4">
                  <Column topic={topic} followTopic={props.followTopic} />
                </Col>
              );
            })}
          </Row>
          <Footer />
        </div>
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    topics: state.topicsModel.topics,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchTopics: dispatch.topicsModel.fetchTopics,
    followTopic: dispatch.topicsModel.followTopic,
  };
};

export default connect(mapState, mapDispatch)(Topics);
