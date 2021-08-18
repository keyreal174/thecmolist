import React, { useState } from "react";
import clsx from "clsx";
import { Button } from "react-bootstrap";
import AddVendorsModal from "./AddVendorsModal";

const AddVendorButton = ({ lightMode, text, className }) => {
  const [vendorModalShow, setVendorModalShow] = useState(false);

  return (
    <div>
      <Button
        className={clsx(
          lightMode && "btn btn-white btn-primary",
          className && className
        )}
        onClick={() => setVendorModalShow(true)}
      >
        {text ? text : "Add Vendors"}
      </Button>
      <AddVendorsModal
        show={vendorModalShow}
        handleClose={() => setVendorModalShow(false)}
      />
    </div>
  );
};

export default AddVendorButton;
