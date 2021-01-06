import React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./rating.css";

const renderTooltip = (props) =>
  props.tooltipText ? (
    <Tooltip id="rating-profile-tooltip" {...props}>
      {props.tooltipText}
    </Tooltip>
  ) : (
    <div />
  );

export default function (props) {
  return (
    <OverlayTrigger
      placement="top"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip({ tooltipText: props.tooltipText })}
    >
      <div
        className={props.className ? props.className : "rating-profile-badge"}
      >
        <span>{props.npsScore}</span>
        {props.children && props.children}
      </div>
    </OverlayTrigger>
  );
}
