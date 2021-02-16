import React from "react";
import { Badge } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";

const SpaceItem = ({ space }) => {
  return (
    <div className="d-flex align-items-center py-1">
      <a href="#" className="profile-stats__space-title">
        {space.title}
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
    <CustomCard heading="My Spaces">
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
    </CustomCard>
  );
};

export default MySpaces;
