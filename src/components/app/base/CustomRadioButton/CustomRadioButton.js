import React from "react";
import clsx from "clsx";
import RadioButton from "../icons/radiobutton.svg";
import RadioButtonChecked from "../icons/radiobutton_checked.svg";
import "./CustomRadioButton.scss";

const CustomRadioButton = ({ className, label, id, value, name }) => {
  return (
    <div className={className}>
      <label className="radio-container">
        {label}
        <input type="radio" name={name} value={value} id={id} />
        <span className="radio-checkmark"></span>
      </label>
    </div>
  );
};

export default CustomRadioButton;
