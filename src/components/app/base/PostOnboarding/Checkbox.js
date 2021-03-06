import clsx from "clsx";
import React, { useState } from "react";
import IconCheck from "./IconCheck";
import IconUnchecked from "./IconUnchecked";

const Styles = {
  button: {
    display: "flex",
    alignItems: "flex-start",
    background: "transparent",
    cursor: "pointer",
    border: 0,
    outline: 0,
    padding: 0,
    marginBottom: 20,
  },

  check: {
    marginRight: 23,
    marginTop: 2,
  },
};

const Checkbox = ({ itemChecked, onChange, children }) => {
  const [checked, setChecked] = useState(itemChecked);

  const toggle = (event) => {
    event.preventDefault();
    onChange && onChange(!checked);
  };

  return (
    <button style={Styles.button} onClick={toggle}>
      <div style={Styles.check}>
        {itemChecked ? <IconCheck /> : <IconUnchecked />}
      </div>

      <div
        style={{
          textDecoration: itemChecked ? "line-through" : "none",
          marginTop: "-3px",
        }}
      >
        {children}
      </div>
    </button>
  );
};

export default Checkbox;
