import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Container, Form } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import InviteModal from "../base/ShareModule/InviteModal";
import Article from "../base/Article/Article";
import Analytics from "../../util/Analytics";
import "./notifications.scss";

const Notifications = (props) => {
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const fetchData = async () => await props.fetchNotifications();
  useEffect(() => {
    fetchData();
  }, []);

  let feedData = props.feedData;

  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Header />
          <div className="notifications--feed">
            {feedData &&
              feedData.map((feed, idx) => {
                return (
                  <Article
                    key={idx}
                    className={idx !== 0 ? "mt-1" : ""}
                    {...feed}
                  />
                );
              })}
          </div>

          {feedData.length === 0 && (
            <div className="wrapper article-wrapper">
              <div className="no-feed-data-header">No notifications yet.</div>
            </div>
          )}
          {feedData.length > 0 && props.moreData && (
            <div className="row notifications--show-more">
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
    feedData: state.notificationsModel.feedData,
    moreData: state.notificationsModel.moreData,
    localConnectedUsers: state.userModel.localConnectedUsers,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchNotifications: dispatch.notificationsModel.fetchNotifications,
    saveUserInvite: dispatch.userModel.saveInvite,
    connectUser: dispatch.userModel.connectUser,
  };
};

export default connect(mapState, mapDispatch)(Notifications);
