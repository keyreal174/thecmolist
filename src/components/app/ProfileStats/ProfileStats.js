import React, { Fragment } from "react";
import { connect } from "react-redux";
import MySpaces from "./MySpaces";
import Profile from "./Profile";
import "./profileStats.scss";

const ProfileStats = ({ profileStats }) => {
  return (
    <Fragment>
      <Profile profileStats={profileStats} />
      <MySpaces profileStats={profileStats} />
    </Fragment>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ProfileStats);
