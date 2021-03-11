import React, { useState, useEffect } from "react";
import { Badge, Container, Row, Col, Button, Form } from "react-bootstrap";
import "./filter.scss";

function Filter(props) {
  const [filterIdx, setFilterIdx] = useState(props.filterIdx || 0);
  useEffect(() => {
    if ("filterIdx" in props) {
      setFilterIdx(props.filterIdx);
    }
  }, [props]);

  return (
    <Container className={props.className ? props.className : "pt-3 pb-2"}>
      <Row className="align-items-center mb-2">
        <Col md={props.sortable || props.children ? "9" : "12"}>
          <div className="filter-wrapper">
            {props.title && <h2 className="section-title">{props.title}</h2>}
            <div className="filter-btn-group" data-toggle="buttons">
              {props.filters &&
                props.filters.map((filter, idx) => {
                  const active = idx === filterIdx;
                  let className = "filter--button";

                  if (active) {
                    className += " filter--button-active";
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
                })}
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
    </Container>
  );
}

export default Filter;
