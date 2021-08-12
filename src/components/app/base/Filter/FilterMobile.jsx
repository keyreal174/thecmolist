import React, { useState, useEffect } from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import clsx from "clsx";

const FilterMobile = (props) => {
  let hasFilters = props.filters && props.filters.length > 0;
  let hasMoreThanOneFilter = hasFilters && props.filters.length > 1;
  return (
    <div
      className={hasMoreThanOneFilter ? "filter-dropdown--wrapper" : "hidden"}
    >
      {hasMoreThanOneFilter && (
        <NavDropdown
          className={clsx("navbar-dropdown filter-dropdown")}
          key={props.filterIdx}
          title={props.filters[props.filterIdx]?.title}
        >
          {props.filters.map((filter, idx) => (
            <NavDropdown.Item
              key={idx}
              onClick={() => {
                props.setFilterIdx(idx);
                props.onChange && props.onChange(idx);
              }}
              className={clsx(
                idx === props.filterIdx && "filter-dropdown-item-enabled"
              )}
            >
              {filter.title}
              {filter.count && (
                <Badge pill variant="danger" className="filter-badge">
                  {filter.count}
                </Badge>
              )}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      )}
    </div>
  );
};

export default FilterMobile;
