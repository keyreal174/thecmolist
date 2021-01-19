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
  console.log(profileStats);
  return (
    <Fragment>
      <div className="profile-stats__user">
        {profileStats.profile && (
          <Fragment>
            <div className="article-img">
              <img
                className="element-center"
                src="https://i.kinja-img.com/gawker-media/image/upload/t_original/ijsi5fzb1nbkbhxa2gc1.png"
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
              <a href="#">Edit Profile</a>
            </div>
            <div className="feed-profile-card-divider" />
            <div className="profile-stats__community">
              <span>Community Contribution</span>
            </div>
            <div className="profile-stats__community-table">
              <div className="d-flex justify-content-between">
                <span>Posts:</span>
                <span>{profileStats.profile.stats.posts}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Views:</span>
                <span>{profileStats.profile.stats.views}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Thanks:</span>
                <span>{profileStats.profile.stats.thanks}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Insightful:</span>
                <span>{profileStats.profile.stats.insightful}</span>
              </div>
            </div>
          </Fragment>
        )}
      </div>
      <div className="profile-stats__spaces">
        <div className="profile-stats__spaces-title">
          My Spaces{" "}
          <span>
            (<a href="#">edit</a>)
          </span>
        </div>
        {profileStats.spaces && (
          <div className="profile-stats__spaces-section">
            {profileStats.spaces.map((space, i) => (
              <SpaceItem space={space} key={i} />
            ))}
          </div>
        )}
      </div>
    </Fragment>
  );
};

const mapState = (state) => ({});

const mapDispatch = (dispatch) => ({});

export default connect(mapState, mapDispatch)(ProfileStats);
