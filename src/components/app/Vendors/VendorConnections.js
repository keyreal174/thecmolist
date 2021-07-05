import React from "react";
import Entities from "../base/Entities/Entities";

const VendorConnections = ({ connections }) => {
  return (
    <div>
      <Entities entities={connections} isConnection={true} />
    </div>
  );
};

export default VendorConnections;
