import React from "react";
import clsx from "clsx";
import CustomCard from "../CustomCard/CustomCard";
import "./FeaturedMember.scss";

const MEMBERS = [
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1632437432625marta-bulaich.jpg",
    name: "Dianne Russell",
    role: "Web Strategy at Pilot.com",
    link: "vendor/oracle",
  },
  {
    image:
      "https://thumbor.forbes.com/thumbor/fit-in/1200x0/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F6148b7eac3b40db800811729%2F0x0.jpg",
    name: "Eleanor Pena",
    role: "Web Strategy at Pilot.com",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1619825893628atri-chatterjee.jpg",
    name: "Devon Lane",
    role: "Web Strategy at Pilot.com",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NjIxNDg1NDYzNmp1bGllLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    name: "Guy Hawkins",
    role: "Web Strategy at Pilot.com",
    link: "vendor/oracle",
  },
];

const Feature = ({ image, name, role, link, color }) => {
  const goViewStack = () => {
    window.location.href = link;
  };

  return (
    <div className="featured-members-item">
      <CustomCard className={clsx("mb-2", `color-${color}`)}>
        <div className="user-img">
          <img className="element-center" src={image} alt="avatar" />
        </div>
        <div className="user-name text-center">
          <span>{name}</span>
        </div>
        <div className="user-role text-center">
          <span>{role}</span>
        </div>
      </CustomCard>
    </div>
  );
};

const FeaturedMembers = () => {
  return (
    <CustomCard heading="Featured Members">
      <div className="d-flex items-center featured-members">
        {MEMBERS.map((item, index) => (
          <Feature key={index} {...item} color={index} />
        ))}
      </div>
    </CustomCard>
  );
};

export default FeaturedMembers;
