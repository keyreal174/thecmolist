import React, { useState, useEffect } from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import clsx from "clsx";

const FilterMobile = (props) => {
  const [filterIdx, setFilterIdx] = useState(props.filterIdx || 0);
  useEffect(() => {
    if ("filterIdx" in props) {
      setFilterIdx(props.filterIdx);
    }
  }, [props]);

  return (
    <div className="filter-dropdown--wrapper">
      <NavDropdown
        className="navbar-dropdown filter-dropdown"
        key={filterIdx}
        title={props.filters[filterIdx]?.title}
      >
        {props.filters.map((filter, idx) => (
          <NavDropdown.Item
            key={idx}
            onClick={() => {
              setFilterIdx(idx);
              props.onChange && props.onChange(idx);
            }}
            className={clsx(
              idx === filterIdx && "filter-dropdown-item-enabled"
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
    </div>
  );
};

export default FilterMobile;
