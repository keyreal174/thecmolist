import React from "react";
import { Link } from "react-router-dom";
import ShowMoreText from "react-show-more-text";
import { Button } from "react-bootstrap";

const TopicColumn = ({ topic, followTopic }) => {
  return (
    <div className="topic-wrapper text-center p-3 h-100 d-flex flex-column">
      <div style={{ flex: 1 }}>
        <h2 className="sharp-symbol">#</h2>
        <Link
          className="topic-link mb-3"
          to={`/topic/${topic.name.replace("#", "")}`}
        >
          {topic.name}
        </Link>
        <div className="topic-description mb-4">
          <ShowMoreText
            keepNewLines={true}
            lines={2}
            more="See more"
            less="See less"
            width={0}
          >
            {topic.description}
          </ShowMoreText>
        </div>
      </div>
      <div>
        {topic.followed ? (
          <Button
            className="btn-blue modal-primary-button btn_followed"
            variant="outline-primary"
            onClick={() => followTopic(topic.id)}
          >
            Following
          </Button>
        ) : (
          <Button
            className="btn-white mr-2 btn_following"
            variant="outline-primary"
            onClick={() => followTopic(topic.id)}
          >
            + Follow
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopicColumn;
