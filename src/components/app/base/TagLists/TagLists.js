import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import CustomCard from "../CustomCard/CustomCard";

import "./TagLists.scss";

const TagLists = ({
  subfilterKeys,
  subfilters,
  feedFilter,
  onSubfilterChange,
}) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <CustomCard className="profile--popular-topics" heading="Popular #topics">
      <div className="popular-topics--content">
        <div>
          {subfilterKeys.map((subfilter, idx) => {
            if (idx < 5 || showMore) {
              return (
                <div className="popular-topics--content-item">
                  <Link
                    className={
                      subfilter === feedFilter
                        ? "profile-subfilter active"
                        : "profile-subfilter"
                    }
                    onClick={() => {
                      onSubfilterChange(subfilter);
                    }}
                  >
                    {idx !== 0 ? " " : ""}
                    {subfilter} ({subfilters[subfilter]})
                  </Link>
                </div>
              );
            }
          })}
        </div>
        <div>
          {subfilterKeys.length > 5 && (
            <>
              <div className="popular-topics--divider" />
              <div className="popular-topics--button">
                <Button variant="link" onClick={() => setShowMore(!showMore)}>
                  {showMore ? "Show less" : "Show more"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </CustomCard>
  );
};

export default TagLists;
