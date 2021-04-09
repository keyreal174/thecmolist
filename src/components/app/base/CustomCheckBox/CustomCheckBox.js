import React from "react";
import Checkbox from "react-custom-checkbox";
import clsx from "clsx";
import Tick from "../icons/tick.svg";
import "./CustomCheckBox.scss";

const CustomCheckBox = ({
  onChange,
  checked,
  label,
  useCheckedStyling,
  disabled,
}) => {
  return (
    <Checkbox
      icon={
        <div className={clsx("custom-checkbox-icon", disabled && "disabled")}>
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
        checked && useCheckedStyling && "checked",
        disabled && "disabled"
      )}
      label={label}
      disabled={disabled}
    />
  );
};

export default CustomCheckBox;
