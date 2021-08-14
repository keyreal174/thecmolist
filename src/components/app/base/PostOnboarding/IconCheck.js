import React from "react";
import Tick from "../icons/tick.svg";

const IconCheck = () => {
  const Styles = {
    check: {
      height: 18,
      width: 18,
      border: "2px solid #2962ff",
      borderRadius: 5,
      backgroundColor: "#2962ff",
      padding: 2,
    },
    tick: {
      left: 2,
    },
  };

  return (
    <div class="position-relative" style={Styles.check}>
      <img class="position-absolute" style={Styles.tick} src={Tick} />
    </div>
  );
};

export default IconCheck;
