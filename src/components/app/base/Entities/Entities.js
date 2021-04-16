import React, { useState } from "react";
import Avatar from "../Avatar/Avatar";
import { Button } from "react-bootstrap";
import "./Entities.scss";

const Entities = ({ entities }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div className="feed-box-content mt-3">
        {entities
          .filter((item, i) => i < 3 || showMore)
          .map(({ image, name, role, link }, index) => (
            <a href={link} key={index}>
              <Avatar
                key={index}
                image={image}
                heading={name}
                subHeading={role}
              />
            </a>
          ))}
      </div>
      <div>
        {entities.length > 3 && (
          <>
            <div className="entities--divider" />
            <div className="entities-showmore--button">
              <Button variant="link" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show less" : "Show more"}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Entities;
