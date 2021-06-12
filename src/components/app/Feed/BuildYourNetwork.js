import React, { useState } from "react";
import CustomCard from "../base/CustomCard/CustomCard";
import CustomCheckBox from "../base/CustomCheckBox/CustomCheckBox";
import AddVendorsModal from "../base/AddVendors/AddVendorsModal";
import AddSkillsModal from "../base/AddSkills/AddSkillsModal";
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

const BuildYourNetwork = ({ buildYourNetworkItems }) => {
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [showAddSkills, setShowAddSkill] = useState(false);

  const toggleAddVendorModal = () => {
    setShowAddVendor((value) => !value);
  };

  const toggleAddSkillModal = () => {
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
                {(index === 1 || index === 2) && (
                  <AddVendorButton
                    isVendor={index === 1 ? true : false}
                    toggleAddVendorModal={toggleAddVendorModal}
                    toggleAddSkillModal={toggleAddSkillModal}
                  />
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
    </CustomCard>
  );
};

export default BuildYourNetwork;
