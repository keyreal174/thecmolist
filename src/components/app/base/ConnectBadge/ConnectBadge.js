import React from "react";
import { Button } from "react-bootstrap";

const ConnectBadge = ({
  localConnectedUsers,
  feed,
  invalidateFeed,
  connectUser,
}) => {
  const isLocallyConnected = localConnectedUsers.includes(feed.username);
  const isConnected = feed.isConnected || isLocallyConnected;
  let connect = !feed.disableConnect ? (
    isConnected ? (
      <span className="connected-label">Connected</span>
    ) : (
      <button
        className="btn connect-button"
        type="button"
        onClick={() => {
          invalidateFeed();
          connectUser(feed);
        }}
      >
        Connect
      </button>
    )
  ) : null;

  return (
    <div className="network--badge">
      {/* Disable following for now... */}
      {/* <Button className="btn-blue mb-2">+ Follow</Button> */}
      {connect}
    </div>
  );
};

export default ConnectBadge;
