import React from "react";
import { Button } from "react-bootstrap";

const Badge = ({
  localConnectedUsers,
  feed,
  invalidateFeed,
  connectUser,
  disconnectUser,
}) => {
  const isLocallyConnected = localConnectedUsers.includes(feed.username);
  const isConnected = feed.isConnected || isLocallyConnected;

  const handleConnectedButtonClick = () => {
    invalidateFeed();
    disconnectUser(feed);
  };
  const handleConnectButtonClick = () => {
    invalidateFeed();
    connectUser(feed);
  };

  const connect = !feed.disableConnect ? (
    isConnected ? (
      <button
        className="btn connect-button"
        onClick={handleConnectedButtonClick}
      >
        Connected
      </button>
    ) : (
      <button
        className="btn connect-button"
        type="button"
        onClick={handleConnectButtonClick}
      >
        Connect
      </button>
    )
  ) : null;

  return (
    <div className="network--badge">
      <Button className="btn-blue mb-2">+ Follow</Button>
      {connect}
    </div>
  );
};

export default Badge;
