import React from "react";
import "./banner.css";

function Banner(props) {
  return (
    <div className={props.className || "banner-app"}>{props.children}</div>
  );
}

export default Banner;
