import React, { useState } from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import ConnectBadge from "../base/ConnectBadge/ConntectBadge";
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
  localConnectedUsers,
  invalidateFeed,
  connectUser,
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
    const f = filters.filter((item) => item.slug === key)[0];
    const heading = f ? f["title"] : "";
    return (
      <CustomCard key={i} heading={heading}>
        {value.map((item, j) => {
          return (
            <Article
              key={j}
              className="feed-dashboard-cell noBorder"
              articletextlines={1}
              {...item}
              engagementButtons={
                heading !== "People" &&
                heading !== "Vendors" && [
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
                ]
              }
              onEngagementButtonClick={handleEngagementButtonClick.bind(
                this,
                value
              )}
              style={{ paddingBottom: "10px" }}
              badge={
                (heading === "People" || heading === "Vendors") && (
                  <ConnectBadge
                    localConnectedUsers={localConnectedUsers}
                    feed={item}
                    invalidateFeed={invalidateFeed}
                    connectUser={connectUser}
                  />
                )
              }
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
                className="see-more-button"
                onClick={() => moduleShowMore(key)}
              >
                Show more
              </Button>
            )}
          </div>
        </div>
      </CustomCard>
    );
  });

  return <div className="search-page-article">{List}</div>;
};

export default RenderList;
