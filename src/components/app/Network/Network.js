import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import ShareModule from "../base/ShareModule/ShareModule";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import Analytics from "../../util/Analytics";
import "./network.css";

const Network = (props) => {
  const [sortOrder, setSortOrder] = useState("Top");
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const OnComponentDidMount = (func) => useEffect(func, []);
  const fetchData = () => props.fetchNetwork(sortOrder);
  const formFilterChange = (event) => {
    setSortOrder(event.target.value);
    props.fetchNetwork(event.target.value);
  };
  OnComponentDidMount(() => fetchData());

  let feedData = props.feedData;
  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <ShareModule
            onInvite={() => {
              Analytics.sendClickEvent("Clicked Invite from network page");
              setInviteModalShow(true);
            }}
          />
          <div className="sort">
            <div className="section-break" />
            <span>Sort by:</span>
            <div className="select-wrapper">
              <Form.Control
                as="select"
                defaultValue={sortOrder}
                onChange={formFilterChange}
                custom
              >
                <option>Top</option>
                <option>Recent</option>
                <option>Name</option>
              </Form.Control>
            </div>
          </div>

          {feedData &&
            feedData.map((feed, idx) => {
              let badge = null;
              const isLocallyConnected = props.localConnectedUsers.includes(
                feed.username
              );
              const isConnected = feed.isConnected || isLocallyConnected;
              if (!feed.disableConnect) {
                badge = !isConnected ? (
                  <button
                    className="btn connect-button"
                    type="button"
                    onClick={() => {
                      props.connectUser(feed);
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

          {props.moreData && (
            <div className="row">
              <div className="col-md-2 mt-2 mx-auto">
                <button
                  className="btn btn__load-more"
                  type="button"
                  onClick={fetchData}
                >
                  Show more
                </button>
              </div>
            </div>
          )}

          <InviteModal
            show={inviteModalShow}
            onHide={() => setInviteModalShow(false)}
            onSuccess={(data) => {
              props.saveUserInvite(data);
              setInviteModalShow(false);
            }}
          />

          <Footer />
        </div>
      </Container>
    </>
  );
};

const mapState = (state) => {
  return {
    feedData: state.networkModel.feedData,
    moreData: state.networkModel.moreData,
    localConnectedUsers: state.userModel.localConnectedUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchNetwork: dispatch.networkModel.fetchNetwork,
    saveUserInvite: dispatch.userModel.saveInvite,
    connectUser: dispatch.userModel.connectUser,
  };
};

export default connect(mapState, mapDispatch)(Network);
