import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import ShowMoreText from "react-show-more-text";
import { Link } from "react-router-dom";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Banner from "../base/Banner/Banner";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";

import "./topics.css";

const RenderColumn = ({ topic, followTopic }) => {
  return (
    <div className="topic-wrapper text-center border-radius-15 p-3 h-100 d-flex flex-column">
      <div style={{ flex: 1 }}>
        <h2 className="sharp-symbol">#</h2>
        <Link className="topic-link mb-3" to="#">
          {topic.name}
        </Link>
        <div className="topic-description mb-4">
          <ShowMoreText
            keepNewLines={true}
            lines={2}
            more="See more"
            less="See less"
            width={0}
          >
            {topic.description}
          </ShowMoreText>
        </div>
      </div>
      <div>
        {topic.followed ? (
          <Button
            className="btn-white modal-primary-button btn_following"
            variant="outline-primary"
            onClick={() => followTopic(topic.id)}
          >
            Following
          </Button>
        ) : (
          <Button
            className="btn-white mr-2 btn_following"
            variant="outline-primary"
            onClick={() => followTopic(topic.id)}
          >
            + Follow
          </Button>
        )}
      </div>
    </div>
  );
};

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
            img="https://d3k6hg21rt7gsh.cloudfront.net/directory.png"
          />
          <Row className="mt-3">
            {props.topics.map((topic) => {
              return (
                <Col key={topic.id} lg={3} md={4} sm={6} className="mb-4">
                  <RenderColumn topic={topic} followTopic={props.followTopic} />
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
