import { check } from "prettier";
import React from "react";
import Checkbox from "react-custom-checkbox";
import clsx from "clsx";
import Tick from "../icons/tick.svg";
import "./CustomCheckBox.scss";

const CustomCheckBox = ({ onChange, checked, label, useCheckedStyling }) => {
  return (
    <Checkbox
      icon={
        <div
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "#2962ff",
            borderRadius: "5px",
            border: "2px solid #2962ff",
            height: 18,
            width: 18,
            padding: "2px",
          }}
        >
          <img src={Tick} alt="tick" style={{ userSelect: "none" }} />
        </div>
      }
      name="my-input"
      checked={checked}
      onChange={onChange}
      borderColor="#9597AE"
      containerClassName="custom-checkbox"
      labelClassName={clsx(
        "custom-checkbox-label",
        checked && useCheckedStyling && "checked"
      )}
      label={label}
    />
  );
};

export default CustomCheckBox;
