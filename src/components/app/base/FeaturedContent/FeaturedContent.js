import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import CustomCard from "../CustomCard/CustomCard";
import Avatar from "../Avatar/Avatar";
import "./FeaturedContent.scss";

const FeaturedContent = (props) => {
  const { featuredContent } = props;

  return (
    <div
      class={clsx(
        "featured-content",
        featuredContent && featuredContent.length > 1 && "multi-content"
      )}
    >
      {featuredContent.map((content, i) => (
        <CustomCard heading={content.title} key={i}>
          {content.contentList &&
            content.contentList.map((item, index) => (
              <div className="featured-content-list">
                <div className="featured-content-list__marker"></div>
                <div className="featured-content-list-item" key="index">
                  <Link
                    to={item.link}
                    onClick={() => {
                      window.location.href = item.link;
                    }}
                  >
                    <p className="featured-content-list-item__title">
                      {item.title}
                    </p>
                  </Link>
                  <Link
                    className="featured-content-list-item__link"
                    to={item.entity.link}
                    onClick={() => {
                      window.location.href = item.entity.link;
                    }}
                  >
                    <Avatar
                      image={item.entity.image}
                      heading={item.entity.name}
                      subHeading={item.entity.role}
                    />
                  </Link>
                </div>
              </div>
            ))}
        </CustomCard>
      ))}
    </div>
  );
};

export default FeaturedContent;
