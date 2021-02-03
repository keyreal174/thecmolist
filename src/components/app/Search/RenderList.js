import React, { useState } from "react";
import Article from "../base/Article/Article";
const cdn = "https://d3k6hg21rt7gsh.cloudfront.net/icons";

const RenderList = ({ modules }) => {
  const handleEngagementButtonClick = async (caller, engagementType) => {
    const id = caller["content_id"];
    const engagement = engagementType.toLowerCase();
  };

  const List = Object.entries(modules).map(([key, value], i) => {
    return (
      <div key={i}>
        {value.map((item, j) => {
          return (
            <Article
              key={j}
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
      </div>
    );
  });
  return <div>{List}</div>;
};

export default RenderList;
