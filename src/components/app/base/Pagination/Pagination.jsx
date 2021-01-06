import React from "react";
import { Pagination } from "react-bootstrap";
import "./pagination.css";

export default function () {
  return (
    <Pagination className="mt-5">
      <Pagination.Prev disabled>{"< Previous"}</Pagination.Prev>
      <div className="pagination-pages">
        <Pagination.Item active>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item className="hide">{3}</Pagination.Item>
        <Pagination.Item className="hide">{4}</Pagination.Item>
        <Pagination.Item className="hide">{5}</Pagination.Item>
        <Pagination.Item className="hide">{6}</Pagination.Item>
        <Pagination.Item className="hide">{7}</Pagination.Item>
        <Pagination.Item className="hide">{8}</Pagination.Item>
        <Pagination.Ellipsis />
        <Pagination.Item>{100}</Pagination.Item>
      </div>
      <Pagination.Next>Next ></Pagination.Next>
    </Pagination>
  );
}
