import { check } from "prettier";
import React from "react";
import Checkbox from "react-custom-checkbox";
import clsx from "clsx";
import Tick from "../icons/tick.svg";
import "./CustomCheckBox.scss";

const CustomCheckBox = ({ checked, label }) => {
  return (
    <Checkbox
      icon={
        <div
          style={{
            display: "flex",
            flex: 1,
            backgroundColor: "#27AC5D",
            borderRadius: "5px",
            border: "2px solid #27AC5D",
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
      onChange={(value) => {
        console.log(value);
      }}
      borderColor="#9597AE"
      containerClassName="custom-checkbox"
      labelClassName={clsx("custom-checkbox-label", checked && "checked")}
      label={label}
    />
  );
};

export default CustomCheckBox;
