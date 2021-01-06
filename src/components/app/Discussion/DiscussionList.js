import React, { Fragment } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Button } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import "./discussion.css";

const discussionListRequest = () => {
  return (dispatch) => {
    return axios.get(`/api/discussions`, {
      headers: {
        "timezone-offset": new Date().getTimezoneOffset(),
      },
    });
  };
};

class DiscussionList extends React.Component {
  constructor(props) {
    super(props);
    document.title = "Discuss";
    this.state = {
      filterIdx: 0,
      discussionListLoading: false,
      discussionData: {},
    };
  }

  componentDidMount() {
    this.fetchDiscussionList();
  }

  fetchDiscussionList() {
    let self = this;
    this.setState({
      discussionListLoading: true,
    });
    this.props
      .discussionListRequest()
      .then(({ data }) => {
        console.log(data);
        self.setState({
          discussionData: data,
        });
      })
      .catch((e) => {
        console.error("An error occurred fetching discussions");
      })
      .finally(() => {
        self.setState({
          discussionListLoading: false,
        });
      });
  }

  render() {
    let self = this;
    let filters = [
      { title: "Latest", enabled: true },
      { title: "Top", enabled: true },
    ];
    let setFilterIdx = (idx) => {
      self.setState({
        filterIdx: idx,
      });
    };
    let discussionListLoading = this.state.discussionListLoading;
    let discussionData = this.state.discussionData;
    return (
      <>
        <Container className="height-100">
          <div className="wrapper">
            <Header />
            {discussionListLoading ? (
              <div className="mt-3 mb-5">
                <ActivityIndicator className="element-center feed-activity-indicator" />
              </div>
            ) : (
              <Fragment>
                <Filter
                  filterIdx={this.state.filterIdx}
                  filters={filters}
                  onChange={(idx) => setFilterIdx(idx)}
                >
                  <div className="filter-btn">
                    <Button
                      className="btn-white"
                      variant="outline-primary"
                      onClick={() => console.log("click")}
                    >
                      <span style={{ fontSize: "20px", display: "contents" }}>
                        +
                      </span>{" "}
                      New Topic
                    </Button>
                  </div>
                </Filter>
                <div className="discussion-list-wrapper">
                  <table className="discussion-topic-list-table">
                    <thead>
                      <tr>
                        <th className="discussion-topic-header">Topic</th>
                        <th></th>
                        <th className="discussion-topic-header-sec">Replies</th>
                        <th
                          className="discussion-topic-header-sec"
                          style={{ paddingInlineStart: "10px" }}
                        >
                          Views
                        </th>
                        <th className="discussion-topic-header-sec">
                          Activity
                        </th>
                      </tr>
                    </thead>

                    <tbody className="discussion-list-body">
                      {discussionData.topic_list &&
                        discussionData.topic_list.topics &&
                        discussionData.topic_list.topics.map(
                          (discussion_topic) => {
                            let topicLink = `https://forum.thecmolist.com/t/${
                              discussion_topic.slug
                            }/${discussion_topic.id}/${
                              discussion_topic.highest_post_number + 1
                            }`;
                            let categoryLink = `https://forum.thecmolist.com/c/${discussion_topic.category_id}`;
                            return (
                              <tr className="discussion-list-row">
                                <td
                                  colspan="1"
                                  className="discussion-main-cell"
                                >
                                  <span>
                                    <a
                                      href={topicLink}
                                      className={
                                        discussion_topic.unseen ||
                                        !discussion_topic.last_read_post_number
                                          ? "discussion-topic-unseen-link"
                                          : "discussion-topic-main-link"
                                      }
                                    >
                                      {discussion_topic.title}
                                    </a>
                                  </span>
                                  <div>
                                    <a
                                      href={categoryLink}
                                      className="discussion-category-link"
                                    >
                                      <span className="discussion-category-box"></span>
                                      <span>
                                        <span className="discussion-category-label">
                                          Agencies
                                        </span>
                                      </span>
                                    </a>
                                  </div>
                                </td>
                                <td className="discussion-avatar-cell">
                                  <a href="https://forum.thecmolist.com/u/julie">
                                    <img
                                      alt=""
                                      width="25"
                                      height="25"
                                      src="https://forum.thecmolist.com/user_avatar/forum.thecmolist.com/julie/25/14_2.png"
                                      className="discussion-avatar-image"
                                    />
                                  </a>
                                </td>
                                <td className="discussion-info-cell">
                                  <a
                                    href="https://forum.thecmolist.com/"
                                    className="discussion-forum-link"
                                  >
                                    {" "}
                                    <span>{discussion_topic.reply_count}</span>
                                  </a>
                                </td>
                                <td className="discussion-info-cell">
                                  <span>{discussion_topic.views}</span>
                                </td>
                                <td
                                  className="discussion-info-cell"
                                  style={{ padding: "0px" }}
                                >
                                  <a
                                    href={topicLink}
                                    className="discussion-forum-link"
                                  >
                                    <span>
                                      {discussion_topic.last_posted_at}
                                    </span>
                                  </a>
                                </td>
                              </tr>
                            );
                          }
                        )}

                      {/* <tr className="discussion-list-row">
                            <td colspan="1" className="discussion-main-cell">
                                <span><a href="https://forum.thecmolist.com/t/brand-awareness-brand-preference-survey/129/2" className="discussion-topic-main-link">Brand Awareness/Brand Preference Survey</a></span>
                                <div>
                                    <a href="https://forum.thecmolist.com/c/marketing/93" className="discussion-category-link">
                                        <span className="discussion-category-box"></span>
                                        <span>
                                            <span className="discussion-category-label">Agencies</span>
                                        </span>
                                    </a>
                                </div>
                            </td>
                            <td className="discussion-avatar-cell">
                                <a href="https://forum.thecmolist.com/u/julie"><img alt="" width="25" height="25" src="https://forum.thecmolist.com/user_avatar/forum.thecmolist.com/julie/25/14_2.png" className="discussion-avatar-image" /></a>
                            </td>
                            <td className="discussion-info-cell">
                                <a href="https://forum.thecmolist.com/" className="discussion-forum-link"> <span>0</span></a>
                            </td>
                            <td className="discussion-info-cell">
                                <span>4</span>
                            </td>
                            <td className="discussion-info-cell" style={{padding: "0px"}}>
                                <a href="https://forum.thecmolist.com/t/brand-awareness-brand-preference-survey/129/1" className="discussion-forum-link"><span>Aug 13</span></a>
                            </td>
                        </tr>

                        <tr className="discussion-list-row">
                            <td colspan="1" className="discussion-main-cell">
                                <span><a href="https://forum.thecmolist.com/t/brand-awareness-brand-preference-survey/129/2" className="discussion-topic-main-link">SE to AE Ratio for technical SaaS product</a></span>
                                <div>
                                    <a href="https://forum.thecmolist.com/c/marketing/93" className="discussion-category-link"><span className="discussion-category-box"></span><span><span className="discussion-category-label">Management &amp; Mentorship</span></span></a>
                                </div>
                            </td>
                            <td className="discussion-avatar-cell">
                                <a href="https://forum.thecmolist.com/u/mads"><img alt="" width="25" height="25" src="https://forum.thecmolist.com/user_avatar/forum.thecmolist.com/mads/25/17_2.png" className="discussion-avatar-image" /></a>
                                <a href="https://forum.thecmolist.com/u/julie"><img alt="" width="25" height="25" src="https://forum.thecmolist.com/user_avatar/forum.thecmolist.com/julie/25/14_2.png" className="discussion-avatar-image" /></a>
                            </td>
                            <td className="discussion-info-cell">
                                <a href="https://forum.thecmolist.com/" className="discussion-forum-link"> <span>0</span></a>
                            </td>
                            <td className="discussion-info-cell">
                                <span>4</span>
                            </td>
                            <td className="discussion-info-cell" style={{padding: "0px"}}>
                                <a href="https://forum.thecmolist.com/t/brand-awareness-brand-preference-survey/129/1" className="discussion-forum-link"><span>Aug 13</span></a>
                            </td>
                        </tr> */}
                    </tbody>
                    <tfoot>
                      <tr className="discussion-table-footer" />
                    </tfoot>
                  </table>
                </div>
              </Fragment>
            )}
          </div>

          <Footer />
        </Container>
      </>
    );
  }
}

export default connect(null, { discussionListRequest })(DiscussionList);
