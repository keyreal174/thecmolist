import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import CustomCheckBox from "../base/CustomCheckBox/CustomCheckBox";
import AddVendorsModal from "../base/AddVendors/AddVendorsModal";
import AddSkillsModal from "../base/AddSkills/AddSkillsModal";
import InviteModal from "../base/Invite/InviteModal";
import { Button } from "react-bootstrap";

const AddVendorButton = ({
  isVendor,
  toggleAddVendorModal,
  toggleAddSkillModal,
}) => (
  <Button
    className="btn-white btn btn-primary post-onboarding-btn"
    onClick={() => (!isVendor ? toggleAddSkillModal() : toggleAddVendorModal())}
  >
    {!isVendor ? "+ Add Expertise" : "+ Add Vendor"}
  </Button>
);

const AddInviteButton = ({ setShowInviteModal }) => (
  <Button
    className="btn-white btn btn-primary post-onboarding-btn"
    onClick={() => setShowInviteModal(true)}
  >
    + Invite
  </Button>
);

const BuildYourNetwork = ({
  buildYourNetworkItems,
  saveUserInvite,
  isAdminUser,
}) => {
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddSkills, setShowAddSkill] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  const toggleAddVendorModal = (contentAdded) => {
    if (showAddVendor && contentAdded) {
      // i.e. we're closing the dialog, trigger a refresh in case
      // some content was added
      window.location.reload();
    }
    setShowAddVendor((value) => !value);
  };

  const toggleAddSkillModal = () => {
    if (showAddSkills) {
      // i.e. we're closing the dialog, trigger a refresh in case
      // some content was added
      window.location.reload();
    }
    setShowAddSkill((value) => !value);
  };

  return (
    <CustomCard heading="Get the most out of using CMOlist">
      <div className="build-your-network">
        {buildYourNetworkItems &&
          buildYourNetworkItems.map((item, index) => {
            return (
              <div key={index}>
                <CustomCheckBox
                  checked={item.checked}
                  label={item.content}
                  useCheckedStyling
                  onChange={() => {
                    if (item.link) window.location.href = item.link;
                  }}
                />
                {(item.showAddVendorButton || item.showAddSkillsButton) && (
                  <AddVendorButton
                    isVendor={item.showAddVendorButton}
                    toggleAddVendorModal={toggleAddVendorModal}
                    toggleAddSkillModal={toggleAddSkillModal}
                  />
                )}
                {item.showInviteButton && (
                  <AddInviteButton setShowInviteModal={setShowInviteModal} />
                )}
              </div>
            );
          })}
      </div>
      <AddVendorsModal
        show={showAddVendor}
        handleClose={toggleAddVendorModal}
      />
      <AddSkillsModal show={showAddSkills} handleClose={toggleAddSkillModal} />
      <InviteModal
        show={showInviteModal}
        isAdminUser={isAdminUser}
        onHide={() => setShowInviteModal(false)}
        onSuccess={(data) => {
          saveUserInvite(data);
          setShowInviteModal(false);
        }}
      />
    </CustomCard>
  );
};

export default BuildYourNetwork;
