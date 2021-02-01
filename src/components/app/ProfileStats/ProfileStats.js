import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Badge } from "react-bootstrap";

import "./profileStats.css";

const SpaceItem = ({ space }) => {
  return (
    <div className="d-flex justify-content-between align-items-center py-1">
      <a href="#" className="profile-stats__space-title">
        {space.title}
      </a>
      {space.count && (
        <Badge pill variant="danger" className="profile-stats__spaces-badge">
          {space.count}
        </Badge>
      )}
    </div>
  );
};

const ProfileStats = ({ profileStats }) => {
  return (
    <Fragment>
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
              <a href="/profile/edit">Edit Profile</a>
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
      <div className="profile-stats__spaces">
        <div className="profile-stats__spaces-title">
          My Spaces{" "}
          <span>
            (<a href="/topics">edit</a>)
          </span>
        </div>
        {profileStats.spaces && profileStats.spaces.length > 0 ? (
          <div className="profile-stats__spaces-section">
            {profileStats.spaces.map((space, i) => (
              <SpaceItem space={space} key={i} />
            ))}
          </div>
        ) : (
          <span
            style={{
              paddingLeft: "25px",
              paddingRight: "20px",
              display: "block",
            }}
          >
            You are not yet subscribed to any topics.{" "}
            <a href="/topics">Follow topics</a> to learn about new marketing
            insights and connect with your peers.
          </span>
        )}
      </div>
    </Fragment>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ProfileStats);
