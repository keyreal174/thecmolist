import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Entities from "../base/Entities/Entities";
import Article from "../base/Article/Article";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";

import AnswerIcon from "../base/icons/answer.svg";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";

function RenderFeed({
  changeReaction,
  feedData,
  fetchActiveFeed,
  feedLoading,
  moreData,
  profileStats,
  reactions,
}) {
  const loadMoreRef = useRef(null);
  const loadMoreScroll = (entries) => {
    if (entries && entries.length > 0) {
      const target = entries[0];
      if (target.isIntersecting && !feedLoading) {
        console.log("Feed fetch data");
        fetchActiveFeed();
      }
    }
  };
  let onLoadMoreClick = (e) => {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    fetchActiveFeed();
  };
  let feedMoreData = feedData.length > 0 && moreData;
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.25,
    };
    const observer = new IntersectionObserver(loadMoreScroll, options);
    if (loadMoreRef && loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => loadMoreRef.current && observer.unobserve(loadMoreRef.current);
  }, [loadMoreRef]);

  const history = useHistory();

  const handleEngagementButtonClick = async (
    caller,
    engagementType,
    engagementText
  ) => {
    const parentId = caller["parent_content_id"];
    const id = caller["content_id"];
    const engagement = engagementText.toLowerCase();

    if (engagementType === "Answer") {
      if ("parent_content_id" in caller) {
        history.push(`/content/${parentId}`);
      } else {
        history.push(`/content/${id}`);
      }
    } else {
      try {
        await changeReaction({ id, engagement });
      } catch (error) {
        console.error(error.message);
      }
    }
  };
  return (
    <div className="feed--wrapper">
      {feedData &&
        feedData.map((feed, idx) => {
          const contentId = feed && "content_id" in feed ? feed.content_id : 0;

          return (
            <Article
              key={idx}
              className={
                idx !== 0 ? "mt-1 feed-dashboard-cell" : "feed-dashboard-cell"
              }
              {...feed.content}
              engagementButtons={[
                {
                  checked: true,
                  text: feed.replyText || "Reply",
                  type: "Answer",
                  icon: AnswerIcon,
                  number: getEngagementForId(contentId, "answer", reactions),
                },
                {
                  checked: getCheckedForEngagementType(
                    contentId,
                    "thanks",
                    reactions
                  ),
                  text: "Like",
                  type: "Reaction",
                  icon: ThanksIcon,
                  iconChecked: ThanksCheckedIcon,
                  number: getEngagementForId(contentId, "thanks", reactions),
                },
                {
                  checked: getCheckedForEngagementType(
                    contentId,
                    "insightful",
                    reactions
                  ),
                  text: "Insightful",
                  type: "Reaction",
                  icon: InsightfulIcon,
                  iconChecked: InsightfulCheckedIcon,
                  number: getEngagementForId(
                    contentId,
                    "insightful",
                    reactions
                  ),
                },
              ]}
              onEngagementButtonClick={handleEngagementButtonClick.bind(
                this,
                feed
              )}
              profile={profileStats.profile}
              showDiscussionComment={false}
            >
              {feed.parent_content && <Article {...feed.parent_content} />}
              {feed.entities?.length > 0 && (
                <Entities entities={feed.entities} />
              )}
            </Article>
          );
        })}

      {feedData.length === 0 && (
        <div className="wrapper article-wrapper no-feed-data-header">
          <div>No content yet</div>
        </div>
      )}
      {feedMoreData && (
        <div className="row mx-auto">
          <div className="col-md-2 mt-2 mx-auto">
            <button
              className="btn btn__load-more invisible"
              type="button"
              onClick={onLoadMoreClick}
              ref={loadMoreRef}
            >
              Show more
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RenderFeed;
