import React from "react";
import "./rating.css";

export default function (props) {
  let ratingsClassName = "tag-rainbow-9";
  if (props.averageRating < 4) {
    ratingsClassName = "tag-rainbow-1";
  } else if (props.averageRating < 7) {
    ratingsClassName = "tag-rainbow-5";
  }
  return (
    <div>
      <div class="company-scores">
        <div class="row text-xs-left">
          <div class="cell col-xs-4 col-sm-3">
            <h2 class="display-5 text-grey2 font-weight-bold mb5">
              <span className={`tag ${ratingsClassName}`}>
                {props.averageRating}
              </span>
            </h2>
          </div>
          <div class="cell col-xs-4 col-sm-3">
            <h2 class="display-5 text-grey2 font-weight-bold mb5">
              {props.numReviews}
            </h2>
          </div>
          <div class="cell col-xs-4 col-sm-3">
            <h2 class="display-5 text-grey2 font-weight-bold mb5">
              {props.npsScore}%
            </h2>
            <progress
              class="mt5 mb0 progress small"
              value={props.npsScore}
              max="100"
            ></progress>
          </div>
        </div>
        <div class="row text-xs-left">
          <div class="cell col-xs-4 col-sm-3">
            <p class="font-weight-bold text-uppercase text-grey3">
              <span class="hidden-xs-down">Rated Overall</span>
              <span class="hidden-sm-up">Score</span>
            </p>
          </div>
          <div class="cell col-xs-4 col-sm-3">
            <p class="font-weight-bold text-uppercase text-grey3">
              <span class="hidden-xs-down">Total Ratings</span>
              <span class="hidden-sm-up">Ratings</span>
            </p>
          </div>
          <div class="cell col-xs-4 col-sm-3">
            <p class="font-weight-bold text-uppercase text-grey3">
              <span class="hidden-xs-down">Recommended</span>
              <span class="hidden-sm-up">Recommend</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
