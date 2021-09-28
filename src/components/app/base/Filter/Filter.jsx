import React, { useState, useEffect } from "react";
import { Badge, Row, Col, Button, Form } from "react-bootstrap";
import clsx from "clsx";
import FilterMobile from "./FilterMobile";
import "./filter.scss";

function Filter(props) {
  const [filterIdx, setFilterIdx] = useState(props.filterIdx || 0);
  useEffect(() => {
    if ("filterIdx" in props) {
      setFilterIdx(props.filterIdx);
    }
  }, [props]);

  let hasFilters = props.filters && props.filters.length > 0;
  let hasMoreThanOneFilter = hasFilters && props.filters.length > 1;
  return (
    <>
      <div
        className={clsx(
          "filter-desktop",
          (props.className ? props.className : "pt-3 pb-2",
          !hasMoreThanOneFilter && "hidden")
        )}
      >
        <Row className="align-items-center">
          <Col md={props.sortable || props.children ? "9" : "12"}>
            <div className="filter-wrapper">
              {props.title && <h2 className="section-title">{props.title}</h2>}
              <div className="filter-btn-group" data-toggle="buttons">
                {hasMoreThanOneFilter ? (
                  props.filters.map((filter, idx) => {
                    const active = idx === filterIdx;
                    let className = "filter--button";

                    if (active) {
                      if (filter.highlight) {
                        className += " filter--button-highlight";
                      } else {
                        className += " filter--button-active";
                      }
                    }
                    if (!filter.enabled) {
                      className += " filter--button-disable";
                    }
                    return (
                      <Button
                        key={idx}
                        active={active}
                        className={className}
                        disabled={!filter.enabled}
                        onClick={() => {
                          setFilterIdx(idx);
                          props.onChange && props.onChange(idx);
                        }}
                      >
                        {filter.title}
                        {filter.count && (
                          <Badge pill variant="danger" className="filter-badge">
                            {filter.count}
                          </Badge>
                        )}
                      </Button>
                    );
                  })
                ) : (
                  <div className="filter-placeholder" />
                )}
              </div>
            </div>
          </Col>
          {props.sortable && (
            <Col md="3">
              <div className="sort">
                <span>Sort by:</span>
                <div className="select-wrapper">
                  <Form.Control as="select" custom>
                    <option>Recent</option>
                    <option>Top</option>
                    <option>Name</option>
                  </Form.Control>
                </div>
              </div>
            </Col>
          )}
          <Col md="3">{props.children}</Col>
        </Row>
      </div>
      <FilterMobile
        onChange={props.onChange}
        filterIdx={filterIdx}
        filters={props.filters}
        setFilterIdx={setFilterIdx}
      />
    </>
  );
}

export default Filter;
