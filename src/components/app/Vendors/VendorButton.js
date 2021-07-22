import React from "react";

const AddVendorButton = ({ getCategoryTitle }) => {
  return (
    <a
      className="m-0"
      style={{
        whiteSpace: "nowrap",
        cursor: "pointer",
        color: "#2962ff",
        fontWeight: 500,
      }}
      onClick={getCategoryTitle}
    >
      + Add Vendor
    </a>
  );
};

export default AddVendorButton;
