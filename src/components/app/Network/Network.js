import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Container, Form } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import ShareModule from "../base/ShareModule/ShareModule";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import Analytics from "../../util/Analytics";
import "./network.css";

const networkRequest = (sort, token) => {
  return (dispatch) => {
    return axios.get(`/api/network?sort=${sort.toLowerCase()}`, {
      headers: {
        token: token,
        "timezone-offset": new Date().getTimezoneOffset(),
      },
    });
  };
};

const saveUserInviteRequest = (data) => {
  return (dispatch) => {
    return axios.post("/api/userinvite", data);
  };
};

const connectUserRequest = (user) => {
  return (dispatch) => {
    return axios.post("/api/connect_user", user);
  };
};

class Network extends React.Component {
  constructor(props) {
    super(props);
    document.title = "My Network";
    this.state = {
      token: "",
      feedData: [],
      moreData: false,
      sortOrder: "Top",
      inviteModalShow: false,
    };
  }

  componentDidMount() {
    this.fetchNetwork();
  }

  onLoadMoreClick(e) {
    e.preventDefault();
    e.target && e.target.blur && e.target.blur();
    this.fetchNetwork();
  }

  fetchNetwork(sortOrder, token) {
    this.props
      .networkRequest(
        sortOrder || this.state.sortOrder,
        token || this.state.token
      )
      .then(({ data }) => {
        let feedData = null;
        let token = null;
        if (data.feedData && data.feedData.length > 0) {
          feedData = data.feedData;
          token = data.token;
        }

        if (feedData != null && feedData.length > 0) {
          this.setState({
            moreData: true,
            token: token,
            feedData: this.state.feedData.concat(feedData),
          });
        } else {
          this.setState({
            moreData: false,
          });
        }
      });
  }

  connectUser(user) {
    if (user.username && user.username.length > 0) {
      let self = this;
      Analytics.sendClickEvent(
        `Connected with user ${user.username} from network page`
      );
      this.props
        .connectUserRequest({ user: user.username })
        .then(({ data }) => {
          let feedData = self.state.feedData;
          feedData.forEach((feed) => {
            if (feed.username === user.username) {
              feed.isConnected = true;
            }
          });
          self.setState({
            feedData: feedData.slice(),
          });
        })
        .catch((e) => {
          console.log(
            `An error occurred connecting with user: ${user.username}`
          );
          console.log(e);
        });
    }
  }

  sendUserInvite(inviteList) {
    this.props.saveUserInviteRequest(inviteList).then(({ data }) => {
      console.log(data);
    });
  }

  render() {
    let feedData = this.state ? this.state.feedData : [];
    let self = this;
    let formFilterChange = (event) => {
      self.setState(
        {
          feedData: [],
          token: "",
          moreData: false,
          sortOrder: event.target.value,
        },
        () => {
          self.fetchNetwork();
        }
      );
    };
    return (
      <>
        <Container className="height-100">
          <div className="wrapper">
            <Header />
            <ShareModule
              onInvite={() => {
                Analytics.sendClickEvent("Clicked Invite from network page");
                this.setState({ inviteModalShow: true });
              }}
            />

            <div className="sort">
              <div className="section-break" />
              <span>Sort by:</span>
              <div className="select-wrapper">
                <Form.Control
                  as="select"
                  defaultValue={this.state.sortOrder}
                  onChange={formFilterChange}
                  custom
                >
                  <option>Top</option>
                  <option>Recent</option>
                  <option>Name</option>
                </Form.Control>
              </div>
            </div>

            {feedData.map((feed, idx) => {
              let badge = null;
              if (!feed.disableConnect) {
                badge = !feed.isConnected ? (
                  <button
                    className="btn connect-button"
                    type="button"
                    onClick={() => {
                      self.connectUser(feed);
                    }}
                  >
                    Connect
                  </button>
                ) : (
                  <span className="connected-label">Connected</span>
                );
              }
              return (
                <Article
                  key={idx}
                  className={idx !== 0 ? "mt-1" : ""}
                  {...feed}
                  badge={badge}
                />
              );
            })}

            {this.state.moreData && (
              <div className="row">
                <div className="col-md-2 mt-2 mx-auto">
                  <button
                    className="btn btn__load-more"
                    type="button"
                    onClick={this.onLoadMoreClick.bind(this)}
                  >
                    Show more
                  </button>
                </div>
              </div>
            )}

            <InviteModal
              show={this.state.inviteModalShow}
              onHide={() => this.setState({ inviteModalShow: false })}
              onSuccess={(data) => {
                this.sendUserInvite(data);
                this.setState({ inviteModalShow: false });
              }}
            />

            <Footer />
          </div>
        </Container>
      </>
    );
  }
}

export default connect(null, {
  networkRequest,
  saveUserInviteRequest,
  connectUserRequest,
})(Network);
