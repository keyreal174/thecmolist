import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import Layout from "../base/Layout/Layout";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import MyNetwork from "../Feed/MyNetwork";
import PopularTopics from "../base/PopularTopics/PopularTopics";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import RenderGuides from "./RenderGuides";

const Category = ({
  name,
  description,
  profileStats,
  followTopic,
  getProfileStats,
}) => {
  const history = useHistory();
  const [topicFollowed, setTopicFollowed] = useState(false);
  const [topic, setTopic] = useState({});

  useEffect(() => {
    let auxTopic =
      profileStats &&
      profileStats.profile &&
      profileStats.profile.spaces &&
      profileStats.profile.spaces.find((t) => t.slug === name);

    if (auxTopic) {
      auxTopic.followed = true;
      setTopicFollowed(true);
    } else {
      setTopicFollowed(false);
      auxTopic = {
        name: `#${name}`,
        slug: name,
      };
      auxTopic.followed = false;
    }
    setTopic(auxTopic);
  }, [profileStats]);

  const handleTopicFollowClick = async () => {
    const newFollowed = !topicFollowed;
    setTopicFollowed(newFollowed);
    setTopic({
      ...topic,
      followed: newFollowed,
    });
    await followTopic(name);
    await getProfileStats();
  };

  return (
    <div className="vendor-detail-category d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center vendor-detail-category-content">
        <span
          className="vendor-detail-category--name cursor-pointer"
          onClick={() => history.push(`/topic/${name}`)}
        >
          #{name}
        </span>
        <span className="vendor-detail-category--description text-capitalize">
          &nbsp;- {description}
        </span>
      </div>
      <p className="vendor-detail-category--description text-capitalize mobile">
        {description}
      </p>
      {topic &&
        (topic.followed ? (
          <Button
            className="btn-blue modal-primary-button btn_followed"
            variant="outline-primary"
            onClick={handleTopicFollowClick}
          >
            + Following
          </Button>
        ) : (
          <Button
            className="btn-white btn_following bg-transparent"
            variant="outline-primary"
            onClick={handleTopicFollowClick}
          >
            + Follow
          </Button>
        ))}
    </div>
  );
};

const Guides = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const initPage = (profileStats) => {
    if (profileStats && profileStats.profile) {
      if (profileStats.profile.isAdminUser) {
        setIsAdminUser(true);
      }
    }
  };

  const changeSubFilter = (title) => {
    document.getElementById(title).scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    props.fetchGuides();

    if (Object.keys(props.profileStats).length === 0) {
      const getProfileStats = async () => props.getProfileStats();
      getProfileStats().then((profileStats) => {
        initPage(profileStats);
      });
    } else {
      initPage(props.profileStats);
    }
  }, []);

  return (
    <Layout onToggle={handleToggle}>
      <Container>
        <Row
          className={clsx(
            "network--simple-top-banner-wrapper",
            mobileMenuOpen && "open"
          )}
        >
          <Col className="network--simple-top-banner" md="8" sm="12">
            <SimpleTopBanner
              // disable for now... buttonText="Invite"
              title="Guides"
              subtitle="Playbooks, Templates and Resources"
            />
          </Col>
          <Col className="network--share-content" md="4">
            <div className="mt-3">
              <MyNetwork
                saveContent={props.saveContent}
                isAdminUser={isAdminUser}
              />
            </div>
          </Col>
        </Row>
        <Row>
          {props.guideList && props.guideList.length > 0 && (
            <Col className="network--popular-topics" md="4">
              <PopularTopics
                heading={""}
                onSubfilterChange={(f) => {
                  // Need to check for this changeSubFilter module
                  const new_title = "#" + f.title.split("#")[1];
                  changeSubFilter(new_title);
                }}
                topicList={props.guideList.map((c) => ({
                  title: "#" + c.name,
                  count: c.content.length || 0,
                }))}
              />
            </Col>
          )}
          <Col
            className={clsx("network--feed", mobileMenuOpen && "open")}
            md={props.guideList && props.guideList.length > 0 ? "8" : "12"}
          >
            {props.loadingGuides ? (
              <div className="mt-3 mb-5">
                <ActivityIndicator className="element-center feed-activity-indicator" />
              </div>
            ) : (
              <div>
                {props.guideList &&
                  props.guideList.map((guide, i) => (
                    <div key={i} className="mb-4" id={"#" + guide.name}>
                      <Category
                        name={guide.name}
                        description={guide.description}
                        profileStats={props.profileStats}
                        getProfileStats={props.getProfileStats}
                        followTopic={props.followTopic}
                      />
                      <RenderGuides
                        feedData={guide.content}
                        profileStats={props.profileStats}
                        changeReaction={props.changeReaction}
                        reactions={props.reactions}
                      />
                    </div>
                  ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

const mapState = (state) => {
  return {
    guideList: state.guidesModel.guideList,
    loadingGuides: state.guidesModel.loadingGuides,
    profileStats: state.profileModel.profileStats,
    reactions: state.reactionModel.reactions,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchGuides: dispatch.guidesModel.fetchGuides,
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveContent: dispatch.contentModel.saveContent,
    changeReaction: dispatch.reactionModel.changeReaction,
    followTopic: dispatch.topicsModel.followTopic,
  };
};

export default connect(mapState, mapDispatch)(Guides);
