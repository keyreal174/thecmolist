import React from "react";
import { Badge } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import EditIcon from "../base/icons/edit_square.svg";

const SpaceItem = ({ space }) => {
  return (
    <div className="d-flex align-items-center py-1">
      <a href={"/topic/" + space.slug} className="profile-stats__space-title">
        {space.name}
      </a>
      {space.count && (
        <Badge pill className="profile-stats__spaces-badge">
          {space.count}
        </Badge>
      )}
    </div>
  );
};

const MySpaces = ({ profileStats }) => {
  return (
    <CustomCard heading="My Topics">
      <div className="profile-stats--edit">
        <a href={"/topics"}>
          <img alt="edit icon" src={EditIcon} />
        </a>
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
    </CustomCard>
  );
};

export default MySpaces;
