import React, { useState } from "react";
import ShowMoreText from "react-show-more-text";
import CustomCard from "../base/CustomCard/CustomCard";

const AboutSpace = () => {
  return (
    <CustomCard heading="About this space">
      <div className="about-this-space">
        <ShowMoreText
          lines={8}
          more="See more"
          less="less"
          width={0}
          anchorClass="see-all-button"
        >
          Community of marketing leaders form Modern Media. Please email:
          x@y.com or z@k.com if you have any questions or would like to invite
          other marketers to this space. Please treat all information. Community
          of marketing leaders form Modern Media.
        </ShowMoreText>
      </div>
    </CustomCard>
  );
};

export default AboutSpace;
