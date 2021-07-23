import React from "react";

const AddVendorButton = ({ getCategoryTitle }) => {
  return (
    <a className="m-0 add-vendor-btn" onClick={getCategoryTitle}>
      + Add Vendor
    </a>
  );
};

export default AddVendorButton;
