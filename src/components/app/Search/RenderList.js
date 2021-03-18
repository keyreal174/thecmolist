import React from "react";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import {
  getCheckedForEngagementType,
  getEngagementForId,
} from "../base/EngagementButtons/EngagementButtons";
import Article from "../base/Article/Article";
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
  const handleEngagementButtonClick = async (caller, engagementType) => {
    const id = caller.contentId;
    const engagement = engagementType.toLowerCase();

    if (engagementType === "Answer") {
      history.push(`/content/${id}`);
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
      <CustomCard key={i} heading={heading}>
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
                    text: "Answer",
                    icon: `${cdn}/Answer.png`,
                    number: getEngagementForId(contentId, "answer", reactions),
                  },
                  {
                    checked: getCheckedForEngagementType(
                      contentId,
                      "thanks",
                      reactions
                    ),
                    text: "Thanks",
                    icon: `${cdn}/Thanks.png`,
                    number: getEngagementForId(contentId, "thanks", reactions),
                  },
                  {
                    checked: getCheckedForEngagementType(
                      contentId,
                      "insightful",
                      reactions
                    ),
                    text: "Insightful",
                    icon: `${cdn}/Insightful.png`,
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
            />
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
