import React, { Fragment } from "react";
import { connect } from "react-redux";
import MyTopics from "./MyTopics";
import Profile from "./Profile";
import "./profileStats.scss";

const ProfileStats = ({ profileStats }) => {
  return (
    <Fragment>
      <Profile profileStats={profileStats} />
      <MyTopics profileStats={profileStats} />
    </Fragment>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ProfileStats);
