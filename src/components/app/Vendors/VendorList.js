import React from "react";
import VendorListFeed from "./VendorListFeed";

const VendorList = ({ vendorList, filterIdx }) => {
  return (
    <>
      {vendorList &&
        vendorList.map((vendor, i) => (
          <VendorListFeed key={i} vendor={vendor} filterIdx={filterIdx} />
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
