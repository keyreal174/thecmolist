import React from "react";
import { Link } from "react-router-dom";
import "./addpost.css";

import AddPostIcon from "./icons/add-post-pencil.png";

function AddPost() {
  return (
    <div className={"add-post-wrapper mt-3"}>
      <div className="add-post-wrapper-header">
        <div
          className="add-post-wrapper-title"
          onClick={() => (window.location.href = "/profile")}
        >
          <img className="add-post-img" src={AddPostIcon} alt="" />
          <div className="add-post-subheadline">
            Ask a question or post an update to your CMO network
          </div>
        </div>
        <div className="add-post-sub-1">
          <span className="add-post-sub-2">
            <Link className="add-post-bold" to="/profile#addagency">
              Add a new agency or technology vendor
            </Link>
            &nbsp;to your&nbsp;
            <Link to="/profile">profile</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
