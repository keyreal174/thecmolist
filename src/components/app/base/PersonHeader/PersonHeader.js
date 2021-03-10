import React from "react";

const PersonHeader = ({ className, profile, onlyImage }) => {
  const image = profile && profile.image;
  const name = profile && profile.name;

  return (
    <div className={className}>
      <img alt="" src={image} />
      <br />
      {!onlyImage && <span>{name && name.split(" ")[0]}</span>}
    </div>
  );
};

export default PersonHeader;
