import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import Column from "./TopicColumn";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Footer from "../base/Footer/Footer";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import "./topics.scss";

const Topics = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    props.fetchTopics();
  }, []);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container>
        <div className={clsx("wrapper", mobileMenuOpen && "open")}>
          <SimpleTopBanner
            className="topics--simple-top-banner"
            title="Topics"
          />
          <Row className="topics--wrapper mt-3">
            {props.topics.map((topic) => {
              return (
                <Col
                  key={topic.id}
                  lg={3}
                  md={4}
                  sm={6}
                  className="topics--item-wrapper mb-4"
                >
                  <Column topic={topic} followTopic={props.followTopic} />
                </Col>
              );
            })}
          </Row>
          <Footer />
        </div>
      </Container>
    </Layout>
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
