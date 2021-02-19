import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Article from "../base/Article/Article";
import Arrow from "../base/icons/arrow.svg";
import { cdn } from "../../util/constants";

const RenderList = ({
  modules,
  filters,
  showMore,
  moreData,
  isFull,
  fetchMoreRefinedData,
}) => {
  const handleEngagementButtonClick = async (caller, engagementType) => {
    const id = caller["content_id"];
    const engagement = engagementType.toLowerCase();
  };

  const moduleShowMore = (filter) => {
    if (isFull) {
      showMore(filter);
    } else {
      fetchMoreRefinedData(filter);
    }
  };

  const List = Object.entries(modules).map(([key, value], i) => {
    return (
      <div key={i} className="search-filter-board">
        <h4 className="search-filter-title">
          {filters.filter((item) => item.slug === key)[0]["title"]}
        </h4>
        {value.map((item, j) => {
          return (
            <Article
              key={j}
              className="feed-dashboard-cell"
              articletextlines={1}
              {...item}
              engagementButtons={[
                {
                  checked: true,
                  text: "Answer",
                  icon: `${cdn}/Answer.png`,
                  number: 2,
                },
                {
                  checked: true,
                  text: "Thanks",
                  icon: `${cdn}/Thanks.png`,
                  number: 4,
                },
                {
                  checked: true,
                  text: "Insightful",
                  icon: `${cdn}/Insightful.png`,
                  number: 3,
                },
              ]}
              onEngagementButtonClick={handleEngagementButtonClick.bind(
                this,
                value
              )}
              style={{ paddingBottom: "10px" }}
            />
          );
        })}
        <div className="feed-dashboard-show-more">
          <div
            style={{
              textAlign: "center",
              width: "100%",
              paddingTop: "10px",
            }}
          >
            {(moreData || isFull) && (
              <Button
                style={{
                  color: "#0175b0",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                onClick={() => moduleShowMore(key)}
              >
                Show more
                <img alt="arrow" src={Arrow} />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  });

  return <div>{List}</div>;
};

export default RenderList;
