import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";

const BuildYourNetwork = ({ buildYourNetworkItems }) => {
  return (
    <CustomCard heading="Build your marketing knowledge Networks">
      <div className="feed-box">
        <div className="feed-box-title">Build your network</div>
        <div className="feed-box-content">
          {buildYourNetworkItems &&
            buildYourNetworkItems.map((item, index) => {
              return (
                <div className="feed-box-content-item" key={index}>
                  {item.checked ? (
                    <span className="feed-box-content-icon">✓</span>
                  ) : (
                    <input type="checkbox" defaultChecked={item.checked} />
                  )}
                  <span
                    className={`feed-box-content-text ${
                      item.checked ? "feed-box-content-text-checked" : ""
                    }`}
                  >
                    {item.content}
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </CustomCard>
  );
};

export default BuildYourNetwork;
