import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Button } from "react-bootstrap";
import CustomCard from "../base/CustomCard/CustomCard";
import AddPostModal from "../base/AddPostModal/AddPostModal";
import InviteButton from "../base/Invite/InviteButton";
import AddVendorButton from "../base/AddVendors/AddVendorButton";

const MyNetwork = (props) => {
  const history = useHistory();
  const [showContentModal, setShowContentModal] = useState(false);
  const [contentType, setContentType] = useState("question");
  const handleShow = (type) => {
    setContentType(type);
    setShowContentModal(true);
  };
  const handleClose = () => setShowContentModal(false);

  const handleSubmit = async (content) => {
    const id = await props.saveContent(content);
    history.push(`/content/${id}`);
  };

  useEffect(() => {
    if (
      !showContentModal &&
      props.activeGroup &&
      window.location.href.endsWith("#addpost")
    ) {
      setContentType("project");
      setShowContentModal(true);
    }
  }, [props.activeGroup]);

  return (
    <CustomCard heading={props.title}>
      <div className="text-center">
        <div className="d-flex flex-column">
          <Button
            className="btn-blue mb-2"
            onClick={() => handleShow("question")}
          >
            Ask Question
          </Button>
          <AddVendorButton
            lightMode
            text="Share Vendors"
            className="w-100 mb-2"
          />
          <InviteButton lightMode text="Invite Peers" className="w-100 mb-2" />
          <AddPostModal
            contentType={contentType}
            activeGroup={props.activeGroup}
            show={showContentModal}
            onSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </div>
      </div>
    </CustomCard>
  );
};

export default MyNetwork;
