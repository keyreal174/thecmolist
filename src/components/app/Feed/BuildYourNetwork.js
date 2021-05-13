import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import CustomCheckBox from "../base/CustomCheckBox/CustomCheckBox";

const BuildYourNetwork = ({ buildYourNetworkItems }) => {
  return (
    <CustomCard heading="Build your marketing knowledge Networks">
      <div>
        {buildYourNetworkItems &&
          buildYourNetworkItems.map((item, index) => {
            return (
              <div key={index}>
                <CustomCheckBox
                  checked={item.checked}
                  label={item.content}
                  useCheckedStyling
                  onChange={() => {
                    if (item.link) window.location.href = item.link;
                  }}
                />
              </div>
            );
          })}
      </div>
    </CustomCard>
  );
};

export default BuildYourNetwork;
