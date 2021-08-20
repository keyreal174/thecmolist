import React from "react";
import Entities from "../base/Entities/Entities";

const VendorConnections = ({ connections, num_connections }) => {
  return (
    <div>
      <Entities
        entities={connections}
        num_connections={num_connections}
        isConnection={true}
      />
    </div>
  );
};

export default VendorConnections;
