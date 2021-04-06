import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Column from "./TopicColumn";
import Footer from "../base/Footer/Footer";
import Header from "../base/Header/Header";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import "./topics.scss";

const Topics = (props) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    props.fetchTopics();
  }, []);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <Container className="height-100">
        <Header
          className={`topics--header ${open ? "open" : ""}`}
          onToggle={handleToggle}
        />
        <div className="wrapper">
          <SimpleTopBanner title="Topics" />
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
