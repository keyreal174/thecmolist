import React from "react";
import "./banner.css";

function Banner(props) {
  return (
    <div className={props.className || "banner-app"}>
      {props.img && (
        <div className="banner-logo-wrapper">
          <img src={props.img} alt="" />
        </div>
      )}
      {props.title && (
        <div className="banner-summary">
          <h2 className="banner-header mb-1">{props.title}</h2>
        </div>
      )}
      {props.children}
    </div>
  );
}

export default Banner;
