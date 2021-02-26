import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import CustomCard from "../base/CustomCard/CustomCard";

const AboutSpace = ({ about }) => {
  return about && about.title && about.text ? (
    <CustomCard heading={about.title}>
      <div className="about-this-space">
        <ShowMoreText
          lines={8}
          more="See more"
          less="less"
          width={0}
          anchorClass="see-all-button"
        >
          {about.text}
        </ShowMoreText>
      </div>
    </CustomCard>
  ) : (
    <div />
  );
};

export default AboutSpace;
