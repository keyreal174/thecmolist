import React from "react";
import { Pagination } from "react-bootstrap";
import "./rating.css";

export default function ({ rating, onRatingChanged }) {
  let RatingItem = (props) => (
    <Pagination.Item
      {...props}
      onClick={() => {
        onRatingChanged && onRatingChanged(props.children);
      }}
    >
      {props.children}
    </Pagination.Item>
  );
  return (
    <Pagination>
      <Pagination.Prev disabled>{"Not likely"}</Pagination.Prev>
      <div className="rating-pages">
        <RatingItem className={"low-rating" + (rating === 1 ? " active" : "")}>
          {1}
        </RatingItem>
        <RatingItem className={"low-rating" + (rating === 2 ? " active" : "")}>
          {2}
        </RatingItem>
        <RatingItem className={"low-rating" + (rating === 3 ? " active" : "")}>
          {3}
        </RatingItem>
        <RatingItem
          className={"low-mid-rating" + (rating === 4 ? " active" : "")}
        >
          {4}
        </RatingItem>
        <RatingItem
          className={"low-mid-rating" + (rating === 5 ? " active" : "")}
        >
          {5}
        </RatingItem>
        <RatingItem
          className={"low-mid-rating" + (rating === 6 ? " active" : "")}
        >
          {6}
        </RatingItem>
        <RatingItem className={"mid-rating" + (rating === 7 ? " active" : "")}>
          {7}
        </RatingItem>
        <RatingItem className={"mid-rating" + (rating === 8 ? " active" : "")}>
          {8}
        </RatingItem>
        <RatingItem className={"high-rating" + (rating === 9 ? " active" : "")}>
          {9}
        </RatingItem>
        <RatingItem
          className={"high-rating" + (rating === 10 ? " active" : "")}
        >
          {10}
        </RatingItem>
      </div>
      <Pagination.Next disabled>Very likely</Pagination.Next>
    </Pagination>
  );
}
