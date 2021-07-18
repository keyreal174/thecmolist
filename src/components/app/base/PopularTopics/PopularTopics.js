import React, { useEffect, useState } from "react";
import CustomCard from "../CustomCard/CustomCard";
import { Button } from "react-bootstrap";
import "./popularTopics.scss";

const PopularTopics = ({
  heading,
  topicList,
  onSubfilterChange,
  customHeading,
}) => {
  const [cachedList, setCachedList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [activeTopicIdx, setActiveTopicIdx] = useState(-1);
  useEffect(() => {
    let match = true;
    for (let i = 0; i < Math.min(cachedList.length, topicList.length); i++) {
      if (
        topicList[i].title !== cachedList[i].title ||
        topicList[i].count !== cachedList[i].count
      ) {
        match = false;
        break;
      }
    }
    match = match && cachedList.length === topicList.length;
    if (!match) {
      setActiveTopicIdx(-1);
      setCachedList(topicList);
    }
  }, [topicList]);
  const handleClick = (topic, idx) => {
    if (activeTopicIdx === idx) {
      setActiveTopicIdx(-1);
    } else {
      setActiveTopicIdx(idx);
    }
    onSubfilterChange(topic);
  };
  const minTopics = 10;
  return (
    <CustomCard
      className="popular-topics"
      heading={heading}
      customHeading={customHeading}
    >
      <div className="popular-topics--content">
        <div className="popular-topics--wrapper">
          {topicList &&
            topicList.map((topic, idx) => {
              if (idx < minTopics || showMore) {
                return (
                  <div key={idx} className="popular-topics--content-item">
                    <span
                      className={`popular-topics--content-item-link ${
                        idx === activeTopicIdx
                          ? "profile-subfilter active"
                          : "profile-subfilter"
                      }`}
                      onClick={() => handleClick(topic, idx)}
                    >
                      {idx !== 0 ? " " : ""}
                      {topic.title} ({topic.count})
                    </span>
                  </div>
                );
              }
            })}
        </div>
        <div>
          {topicList && topicList.length > minTopics && (
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

export default PopularTopics;
