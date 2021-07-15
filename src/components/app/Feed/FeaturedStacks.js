import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";

const Feature = ({ image, name, role, link }) => {
  const goViewStack = () => {
    window.location.href = link;
  };

  return (
    <div className=" featured-stacks-item ml-2 mr-2">
      <CustomCard className="mb-2">
        <div className="user-img">
          <img className="element-center" src={image} alt="avatar" />
        </div>
        <div className="user-name text-center">
          <span>{name}</span>
        </div>
        <div className="user-role text-center">
          <span>{role}</span>
        </div>
        <div className="text-center mb-2">
          <Button
            className="btn btn-success view-stack-btn"
            onClick={goViewStack}
          >
            View Stack
          </Button>
        </div>
      </CustomCard>
    </div>
  );
};

const FeaturedStacks = ({ featuredStacks }) => {
  return (
    <CustomCard heading="Featured marketing stacks">
      <div className="d-flex featured-stacks">
        {featuredStacks.map((feature, i) => (
          <Feature
            key={i}
            image={feature.image}
            name={feature.name}
            role={feature.role}
            link={feature.link}
          />
        ))}
      </div>
    </CustomCard>
  );
};

export default FeaturedStacks;
