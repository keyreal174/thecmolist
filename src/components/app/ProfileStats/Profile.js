import React, { Fragment } from "react";
import CustomCard from "../base/CustomCard/CustomCard";

const Profile = ({ profileStats }) => {
  return (
    <CustomCard>
      <div className="profile-stats__user">
        {profileStats.profile && (
          <Fragment>
            <div className="profile-stats__user-info">
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
            </div>
            <div className="profile-card-divider" />
            <div className="profile-stats__community">
              <div className="profile-stats__community-title mb-2">
                Community Contribution
              </div>
              <div className="profile-stats__community-table">
                {profileStats.profile.stats.map((stat, idx) => (
                  <div
                    className="d-flex justify-content-between mb-2"
                    key={idx}
                  >
                    <span>{stat.name}:</span>
                    <span className="count">{stat.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Fragment>
        )}
      </div>
    </CustomCard>
  );
};

export default Profile;
