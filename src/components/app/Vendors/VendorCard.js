import React from "react";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import Markdown from "markdown-to-jsx";
import CustomCard from "../base/CustomCard/CustomCard";

const VendorCard = ({ item }) => {
  return (
    <CustomCard>
      <div className="avatar-thumb text-center mr-0 mb-2">
        <img
          className="rounded-circle"
          src={item.image}
          width="39"
          height="39"
          alt="avatar"
        />
      </div>
      <h2 className="article-title text-center">
        {item.headline.markdown ? (
          <Markdown>{item.headline.markdown}</Markdown>
        ) : (
          item.headline
        )}
      </h2>
      <div className="text-center">
        {item.subheadlines && (
          <div
            className="article-subheadlines mr-0"
            style={{ maxWidth: "100%" }}
          >
            {item.subheadlines.map((subheadline, idx) => {
              if (subheadline.markdown) {
                return (
                  <div key={idx} className="article-subheadline">
                    <Markdown>{subheadline.markdown}</Markdown>
                  </div>
                );
              } else {
                return (
                  <div key={idx} className="article-subheadline">
                    {subheadline.link ? (
                      <Link to={subheadline.link}>{subheadline.text}</Link>
                    ) : (
                      <ShowMoreText lines={1} more="See more" less="" width={0}>
                        {subheadline.text}
                      </ShowMoreText>
                    )}
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>
      <div className="vendor-article-text">
        <ShowMoreText
          keepNewLines={true}
          lines={2}
          more="See more"
          less="See less"
          width={0}
        >
          {item.articletext}
        </ShowMoreText>
      </div>
      <div className="text-center vendor-card-connections">
        {item.connections && (
          <>
            <div className="vendor-card-divider"></div>
            <p>{item.connections.num_connections} connections including</p>
            <div
              className="article-subheadlines mr-0"
              style={{ maxWidth: "100%" }}
            >
              <div className="article-subheadline">
                <Markdown>{item.connections.markdown}</Markdown>
              </div>
            </div>
          </>
        )}
      </div>
    </CustomCard>
  );
};

export default VendorCard;
