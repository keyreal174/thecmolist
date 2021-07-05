import React, { useState } from "react";
import clsx from "clsx";
import Avatar from "../Avatar/Avatar";
import { Button } from "react-bootstrap";
import "./Entities.scss";

const Entities = ({ entities, isConnection }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      <div
        className={clsx(
          "feed-box-content entities-wrapper",
          isConnection && "connections-wrapper"
        )}
      >
        <p>12 Connections including</p>
        {entities
          .filter((item, i) => i < 3 || showMore)
          .map(({ image, name, role, link, text }, index) => (
            <a href={link} key={index}>
              <Avatar
                key={index}
                image={image}
                heading={name}
                subHeading={role}
                text={text}
                isConnection={isConnection}
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
