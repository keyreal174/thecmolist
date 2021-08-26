import React from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import EditIcon from "./icons/edit_square.svg";

const SpaceItem = ({ space }) => {
  return (
    <div className="d-flex align-items-center py-1">
      <Link to={"/topic/" + space.slug} className="profile-stats__space-title">
        {space.name}
      </Link>
      {space.count && (
        <Badge pill className="profile-stats__spaces-badge">
          {space.count}
        </Badge>
      )}
    </div>
  );
};

const MyTopics = ({ profileStats }) => {
  return (
    <CustomCard heading="My Topics">
      <div className="profile-stats--edit">
        <Link to={"/topics"}>
          <img alt="edit icon" src={EditIcon} />
        </Link>
      </div>
      {profileStats.profile &&
      profileStats.profile.spaces &&
      profileStats.profile.spaces.length > 0 ? (
        <div className="profile-stats__spaces-section">
          {profileStats.profile.spaces.map((space, i) => (
            <SpaceItem space={space} key={i} />
          ))}
        </div>
      ) : (
        <span className="profile-stats--empty-message">
          Follow <a href="/topics">#topics</a> to see questions, playbooks, and
          news about those marketing topics in your feed
        </span>
      )}
    </CustomCard>
  );
};

export default MyTopics;
