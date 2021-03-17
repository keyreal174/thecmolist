import React from "react";
import "./badge.scss";

const Badge = ({ localConnectedUsers, feed, connectUser, disconnectUser }) => {
  const isLocallyConnected = localConnectedUsers.includes(feed.username);
  const isConnected = feed.isConnected || isLocallyConnected;

  const handleConnectedButtonClick = () => {
    disconnectUser(feed);
  };
  const handleConnectButtonClick = () => {
    connectUser(feed);
  };

  const connect = !feed.disableConnect ? (
    isConnected ? (
      <button
        className="btn badge--connect-button"
        onClick={handleConnectedButtonClick}
        type="button"
      >
        Connected
      </button>
    ) : (
      <button
        className="btn badge--connect-button"
        type="button"
        onClick={handleConnectButtonClick}
      >
        Connect
      </button>
    )
  ) : null;

  return (
    <div className="badge">
      {/* Disable following for now... */}
      {/* <Button className="btn-blue mb-2">+ Follow</Button> */}
      {connect}
    </div>
  );
};

export default Badge;
