import React from "react";
import "./activityindicator.css";

function ActivityIndicator(props) {
  let squareCount = 3;
  let squares = [];
  for (let i = 1; i <= squareCount; i++) {
    squares.unshift(<div key={i} className="rai-square" />);
  }
  let className = "rai-squares";
  if (props && props.className) {
    className += ` ${props.className}`;
  }
  return <div className={className}>{squares}</div>;
}

export default ActivityIndicator;
