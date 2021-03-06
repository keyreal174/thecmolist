import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import InsightfulIcon from "../base/icons/insightful.svg";
import InsightfulCheckedIcon from "../base/icons/insightful_checked.svg";
import ThanksIcon from "../base/icons/thanks.svg";
import ThanksCheckedIcon from "../base/icons/thanks_checked.svg";
import Article from "../base/Article/Article";
import Entities from "../base/Entities/Entities";
import { useHistory } from "react-router";
import { cdn } from "../../util/constants";
import Badge from "../base/Badge/Badge";

const RenderList = ({
  changeReaction,
  connectUser,
  disconnectUser,
  fetchMoreRefinedData,
  filters,
  isFull,
  localConnectedUsers,
  modules,
  moreData,
  reactions,
  showMore,
}) => {
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
      if (parentId) {
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

  const moduleShowMore = (filter) => {
    if (isFull) {
      showMore(filter);
    } else {
      fetchMoreRefinedData(filter);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const List = Object.entries(modules).map(([key, value], i) => {
    const f = filters.filter((item) => item.slug === key)[0];
    const heading = f && f["title"] ? f["title"] : "";
    const isContent = heading !== "People" && heading !== "Vendors";
    return (
      <CustomCard className="search--article-item" key={i} heading={heading}>
        {value.map((item, j) => {
          let contentId = item.contentId;
          return (
            <Article
              key={j}
              className="feed-dashboard-cell noBorder"
              articletextlines={1}
              {...item}
              engagementButtons={
                isContent && [
                  {
                    checked: true,
                    text: item.replyText || "Reply",
                    type: "Answer",
                    icon: `${cdn}/Answer.png`,
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
                ]
              }
              onEngagementButtonClick={handleEngagementButtonClick.bind(
                this,
                item
              )}
              style={{ paddingBottom: "10px" }}
              badge={
                !isContent && (
                  <Badge
                    connectUser={connectUser}
                    disconnectUser={disconnectUser}
                    feed={item}
                    localConnectedUsers={localConnectedUsers}
                  />
                )
              }
            >
              {item.parent_content && <Article {...item.parent_content} />}
              {item.entities?.length > 0 && (
                <Entities entities={item.entities} />
              )}
            </Article>
          );
        })}
        <div className="feed-dashboard-show-more">
          <div
            style={{
              textAlign: "center",
              width: "100%",
              paddingTop: "10px",
            }}
          >
            {(moreData || isFull) && (
              <Button
                style={{
                  color: "#0175b0",
                  textDecoration: "none",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                className="see-more-button"
                onClick={() => moduleShowMore(key)}
              >
                Show more
              </Button>
            )}
          </div>
        </div>
      </CustomCard>
    );
  });

  return <div className="search-page-article">{List}</div>;
};
export default RenderList;
