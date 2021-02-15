import { check } from "prettier";
import React from "react";
import Checkbox from "react-custom-checkbox";
import * as Icon from "react-icons/fi";
import clsx from "clsx";
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
            borderRadius: "4px",
            border: "1px solid #27AC5D",
          }}
        >
          <Icon.FiCheck color="white" size={16} />
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
