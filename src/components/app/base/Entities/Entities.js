import React, { useState } from "react";
import clsx from "clsx";
import Avatar from "../Avatar/Avatar";
import { Button } from "react-bootstrap";
import "./Entities.scss";

const Entities = ({ entities, num_connections, isConnection }) => {
  const [showMore, setShowMore] = useState(false);
  const numConnections = num_connections ? num_connections : entities.length;
  return (
    <>
      <div
        className={clsx(
          "feed-box-content entities-wrapper",
          isConnection && "connections-wrapper"
        )}
      >
        {isConnection && (
          <p className="connections-wrapper-header">
            {numConnections === 1
              ? "1 connection"
              : numConnections +
                (numConnections > 3
                  ? " connections including"
                  : " connections")}{" "}
          </p>
        )}
        {entities
          .filter((item, i) => i < 3 || showMore)
          .map(({ image, name, role, link, text }, index) => (
            <Avatar
              key={index}
              image={image}
              heading={name}
              subHeading={role}
              text={text}
              isConnection={isConnection}
              link={link}
            />
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
