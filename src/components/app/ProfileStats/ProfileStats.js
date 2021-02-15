import React, { Fragment } from "react";
import { connect } from "react-redux";
import MySpaces from "./MySpaces";
import CustomCard from "../base/CustomCard/CustomCard";
import "./profileStats.scss";

const ProfileStats = ({ profileStats }) => {
  return (
    <Fragment>
      <CustomCard>
        <div className="profile-stats__user">
          {profileStats.profile && (
            <Fragment>
              <div className="article-img">
                <img
                  className="element-center"
                  src={profileStats.profile.image}
                  alt=""
                />
              </div>
              <div className="profile-stats__user-name">
                <span>{profileStats.profile.name}</span>
              </div>
              <div className="profile-stats__user-company text-center">
                <span>{profileStats.profile.headline}</span>
              </div>
              <div className="profile-stats__edit-button text-center">
                <a href="/profile_edit">Edit Profile</a>
              </div>
              <div className="feed-profile-card-divider" />
              <div className="profile-stats__community">
                <span>Community Contribution</span>
              </div>
              <div className="profile-stats__community-table">
                {profileStats.profile.stats.map((stat, idx) => (
                  <div className="d-flex justify-content-between" key={idx}>
                    <span>{stat.name}:</span>
                    <span>{stat.count}</span>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </div>
      </CustomCard>
      <MySpaces profileStats={profileStats} />
    </Fragment>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ProfileStats);
