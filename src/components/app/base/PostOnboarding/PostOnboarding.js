import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router";
import Markdown from "markdown-to-jsx";
import CustomCard from "../CustomCard/CustomCard";
import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import InviteButton from "../InviteButton/InviteButton";
import Checkbox from "./Checkbox";
import clsx from "clsx";
import "./style.scss";

const PostOnboarding = ({ postOnboarding, isAdminUser }) => {
  const location = useLocation();
  let showAnimation = false;
  if (location && location.state && location.state.onboarded) {
    showAnimation = true;
  }
  return (
    <CustomCard
      heading="Welcome 🎉 to CMOlist! Get started 🚀 in 4 quick steps:"
      className={clsx(
        "post-onboarding",
        showAnimation && "fadeAndSlideElementIn"
      )}
    >
      <div className="build-your-network">
        {postOnboarding &&
          postOnboarding.map((item, index) => {
            return (
              <div key={index}>
                <Checkbox itemChecked={item.checked}>
                  <h2 className="post-onboarding__headline text-left">
                    {item.headline.markdown ? (
                      <Markdown>{item.headline.markdown}</Markdown>
                    ) : (
                      item.headline
                    )}
                  </h2>
                  <p className="post-onboarding__subheadline text-left">
                    {item.subheadline.markdown ? (
                      <Markdown>{item.subheadline.markdown}</Markdown>
                    ) : (
                      item.subheadline
                    )}
                  </p>
                </Checkbox>
                <div>
                  {item.showInviteButton && (
                    <InviteButton
                      isAdminUser={isAdminUser}
                      lightMode={true}
                      text="+ Invite Peers"
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </CustomCard>
  );
};

export default PostOnboarding;
