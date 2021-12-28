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
      className={clsx(
        "featured-content",
        featuredContent && featuredContent.length > 1 && "multi-content"
      )}
    >
      {featuredContent.map((content, i) => (
        <CustomCard heading={content.title} key={i}>
          {content.contentList &&
            content.contentList.map((item, index) => (
              <div className="featured-content-list" key={i + "-" + index}>
                <div className="featured-content-list__marker"></div>
                <div className="featured-content-list-item">
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
                  <Avatar
                    className="featured-content-list-item__link"
                    image={item.entity.image}
                    heading={item.entity.name}
                    subHeading={item.entity.role}
                    link={item.entity.link}
                  />
                </div>
              </div>
            ))}
        </CustomCard>
      ))}
    </div>
  );
};

export default FeaturedContent;
