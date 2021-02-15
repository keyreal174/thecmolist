import React from "react";

const CustomCheckBox = () => {
  return (
    <Checkbox
      icon={<Icon.FiCheck color="#174A41" size={14} />}
      name="my-input"
      checked={true}
      onChange={(value) => {
        let p = {
          isTrue: value,
        };
        return alert(value);
      }}
      borderColor="#D7C629"
      style={{ cursor: "pointer" }}
      labelStyle={{ marginLeft: 5, userSelect: "none" }}
      label="Have you started using it?"
    />
  );
};

export default CustomCheckBox;
