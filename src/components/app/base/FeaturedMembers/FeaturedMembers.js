import React from "react";
import clsx from "clsx";
import CustomCard from "../CustomCard/CustomCard";
import "./FeaturedMember.scss";

const MEMBERS = [
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1636584687523carly-brantz.jpg",
    name: "Carly Brantz",
    role: "CMO at DigitalOcean",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTU5NjIxNDg1NDYzNmp1bGllLmpwZWciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjIwMCwiaGVpZ2h0IjoyMDAsImZpdCI6ImNvdmVyIn19fQ==",
    name: "Julie Herendeen",
    role: "Former CMO at Pagerduty",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1619825893628atri-chatterjee.jpg",
    name: "Atri Chatterjee",
    role: "CMO at ForgeRock",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1634662920561maryam-banikarim.jpg",
    name: "Maryam Banikarim",
    role: "Head of Marketing at Nextdoor",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1632750850829michael-marcellin.jpg",
    name: "Michael Marcellin",
    role: "CMO at Juniper Networks",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1617649682876ashley-stirrup.jpg",
    name: "Ashley Stirrup",
    role: "Former CMO Algolia",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/eyJidWNrZXQiOiJjbW9saXN0aW1hZ2VzIiwia2V5IjoiMTY0MjA0MzU0NDQ2OWEuanBlZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MjAwLCJoZWlnaHQiOjIwMCwiZml0IjoiY292ZXIifX19",
    name: "Christy Huggins",
    role: "Head of Marketing at OneSignal",
    link: "vendor/oracle",
  },
  {
    image: "https://d3k6hg21rt7gsh.cloudfront.net/1633386860591helen-min.jpg",
    name: "Helen Min",
    role: "Head of Marketing at AngelList",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1629773188024robin-zucker.jpg",
    name: "Robin Zucker",
    role: "CMO at Codecademy",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1634084347866stacey-politi.jpg",
    name: "Stacey Politi",
    role: "CMO at MainStreet",
    link: "vendor/oracle",
  },
  {
    image:
      "https://d3k6hg21rt7gsh.cloudfront.net/1619825894001darren-goode.jpg",
    name: "Darren Goode",
    role: "CMO at Zumper",
    link: "vendor/oracle",
  },
  {
    image: "https://d3k6hg21rt7gsh.cloudfront.net/1632796872473jason-lyman.jpg",
    name: "Jason Lyman",
    role: "SVP Marketing at BetterCloud",
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
