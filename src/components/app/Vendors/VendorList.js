import React from "react";
import VendorListFeed from "./VendorListFeed";

const VendorList = ({ vendorList, getVendorsDetail }) => {
  return (
    <>
      {vendorList &&
        vendorList.map((vendor, i) => (
          <VendorListFeed
            key={i}
            vendor={vendor}
            getVendorsDetail={getVendorsDetail}
          />
        ))}
      {vendorList && vendorList.length === 0 && (
        <div className="wrapper article-wrapper no-feed-data-header">
          <div>No vendors here yet.</div>
        </div>
      )}
    </>
  );
};

export default VendorList;
