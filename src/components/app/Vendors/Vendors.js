import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { connect } from "react-redux";
import { Alert, Col, Row, Container, Button } from "react-bootstrap";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Footer from "../base/Footer/Footer";
import Filter from "../base/Filter/Filter";
import ActivityIndicator from "../base/ActivityIndicator/ActivityIndicator";
import SimpleTopBanner from "../base/SimpleTopBanner/SimpleTopBanner";
import AddMemberModal from "../base/AddMemberModal/AddMemberModal";
import AddVendorsModal from "../base/AddVendors/AddVendorsModal";
import InviteModal from "../base/ShareModule/InviteModal";
import VendorList from "./VendorList";
import VendorsDetail from "./VendorsDetail";
import Util from "../../util/Util";
import Analytics from "../../util/Analytics";
import { cdn } from "../../util/constants";
import "./vendors.scss";

const Vendors = (props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [filterIdx, setFilterIdx] = useState(0);
  const [filters, setFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [isDetail, setIsDetail] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  const [inviteModalShow, setInviteModalShow] = useState(false);
  const [isAffiliated, setIsAffiliated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(filters[idx].image);
    }
  };
  useEffect(() => {
    const getProfileStats = async () => props.getProfileStats();
    getProfileStats().then((profileStats) => {
      let newFilters = [
        { title: "All", slug: "my-network", enabled: true },
        { title: "My Experts", slug: "my-peers", enabled: true },
      ];
      if (profileStats && profileStats.profile) {
        if (profileStats.profile.isAdminUser) {
          setIsAdminUser(true);
        }
      }
      if (profileStats && profileStats.profile) {
        if (
          profileStats.profile.groups &&
          profileStats.profile.groups.length > 0
        ) {
          setIsAffiliated(true);
          newFilters = newFilters.concat(
            profileStats.profile.groups.map((group) => {
              return {
                title: group.name,
                slug: group.slug,
                image: group.image || null,
                enabled: true,
              };
            })
          );
        } else {
          newFilters = [
            { title: "My Network", slug: "my-network", enabled: true },
          ];
        }
      }
      let idx = 0;
      if (location && location.hash) {
        let networkSlug = location.hash;
        if (location.hash.indexOf("#") === 0) {
          networkSlug = location.hash.substring(1);
        }
        if (networkSlug.length > 0) {
          let existingFilterIndex = newFilters.findIndex(
            (nf) => nf.slug === networkSlug
          );
          if (existingFilterIndex >= 0) {
            idx = existingFilterIndex;
          } else {
            newFilters = newFilters.concat({
              title: networkSlug,
              slug: networkSlug,
              image: `${cdn}/directory.png` || null,
              enabled: true,
            });
            idx = newFilters.length - 1;
            setShowFilters(false);
          }
        }
      }

      if (location && location.state && location.state.filterIdx) {
        idx = location.state.filterIdx;
      }

      setFilters(newFilters);
      setBannerTitle(newFilters[idx].title);
      setBannerImage(newFilters[idx].image);
      setFilterIdx(idx);
      if (location && location.pathname.includes("/vendors/")) {
        setIsDetail(true);
        let path = Util.parsePath(window.location.href).trailingPath;
        props.fetchVendorsDetail({
          slug: path,
          filter: newFilters[idx].slug,
        });
      } else {
        props.fetchVendorList(newFilters[idx].slug);
        setIsDetail(false);
      }
      changeDashboardHeader(idx);
    });
  }, [location]);

  const changeFilter = (idx) => {
    setFilterIdx(idx);
    if (isDetail) {
      let path = Util.parsePath(window.location.href).trailingPath;
      props.fetchVendorsDetail({
        slug: path,
        filter: filters[idx].slug,
      });
    } else {
      props.changeFilter(filters[idx].slug);
    }
    changeDashboardHeader(idx);
  };

  const [showInviteModal, setShowInviteModal] = useState(false);
  const handleInviteModalClick = () => setShowInviteModal(true);
  const handleInviteModalClose = () => setShowInviteModal(false);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleAddVendorModal = (contentAdded) => {
    if (showAddVendor && contentAdded) {
      // i.e. we're closing the dialog, trigger a refresh in case
      // some content was added
      window.location.reload();
    }
    setShowAddVendor((value) => !value);
  };

  const toggleInviteModal = () => {
    setInviteModalShow((value) => !value);
  };

  const AddVendorButton = () => (
    <Button
      className="filter--button filter--button-active active m-0"
      onClick={toggleAddVendorModal}
    >
      + Add Vendor
    </Button>
  );

  const getCategoryTitle = (title) => {
    setCategoryTitle(title);
    toggleAddVendorModal();
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container className="height-100">
        <div className="wrapper position-relative">
          <SimpleTopBanner
            // disable for now... buttonText="Invite"
            className={clsx(
              "vendors--simple-top-banner",
              mobileMenuOpen && "open"
            )}
            onClick={handleInviteModalClick}
            title={bannerTitle}
            subtitle={"Vendors"}
            image={bannerImage}
          />
          <AddMemberModal
            firstButtonText="Cancel"
            secondButtonText="Send invitation"
            modalTitle="Invite a marketing leader to join you CMOlist peer network"
            modalSubtitle={
              <div>
                Build your <strong>trusted peer network</strong> by inviting and
                connecting only with marketing peers that{" "}
                <strong>you know</strong> and whose{" "}
                <strong>advice you trust</strong>
              </div>
            }
            onClose={handleInviteModalClose}
            onSubmit={props.inviteNewMember}
            show={showInviteModal}
          />
          <div className="mb-4">
            {showFilters && (
              <div
                className={clsx(
                  "vendors--filters d-flex",
                  mobileMenuOpen && "open"
                )}
              >
                <Filter
                  className="mt-1 network--filter"
                  filterIdx={filterIdx}
                  filters={filters}
                  onChange={(idx) => changeFilter(idx)}
                />
                <div
                  className={clsx(
                    "filter-btn-group flex-grow-1 text-right filter-add-vendor-btn desktop-add-vendor-button"
                  )}
                  style={{ minWidth: 150 }}
                >
                  <AddVendorButton />
                </div>
              </div>
            )}
            {!isAffiliated && (
              <div className="follow-members">
                <Alert variant="success">
                  <a
                    className="cursor-pointer"
                    onClick={() => (window.location.href = "/network")}
                    style={{ color: "#2962ff" }}
                  >
                    <b>Follow more marketing leaders</b>
                  </a>{" "}
                  to grow your network and view more trusted vendors
                </Alert>
              </div>
            )}
          </div>
          {isDetail ? (
            <VendorsDetail
              changeSubFilter={props.changeSubFilter}
              vendorsDetail={props.vendorsDetail}
              loadingVendors={props.loadingVendors}
              mobileMenuOpen={mobileMenuOpen}
              toggleAddVendorModal={toggleAddVendorModal}
              getCategoryTitle={getCategoryTitle}
              handleInviteModal={toggleInviteModal}
              filterIdx={filterIdx}
            />
          ) : (
            <Row className="vendors--feed--wrapper">
              <Col
                className={clsx("vendors--feed", mobileMenuOpen && "open")}
                md="12"
              >
                {props.loadingVendors ? (
                  <div className="mt-3 mb-5">
                    <ActivityIndicator className="element-center feed-activity-indicator" />
                  </div>
                ) : (
                  <VendorList
                    vendorList={props.vendorList}
                    vendorListBlockerText={props.vendorListBlockerText}
                    handleInviteModal={toggleInviteModal}
                    filterIdx={filterIdx}
                  />
                )}
              </Col>
            </Row>
          )}

          <Footer
            className={clsx("vendors--footer", mobileMenuOpen && "open")}
          />
        </div>
      </Container>
      <AddVendorsModal
        show={showAddVendor}
        handleClose={toggleAddVendorModal}
        categoryTitle={categoryTitle}
      />
      <InviteModal
        show={inviteModalShow}
        onHide={() => setInviteModalShow(false)}
        onSuccess={(data) => {
          props.saveUserInvite(data);
          setInviteModalShow(false);
        }}
        isAdminUser={isAdminUser}
      />
    </Layout>
  );
};

const mapState = (state) => {
  return {
    activeFeedSubFilters: state.vendorsModel.activeFeedSubFilters,
    feedData: state.vendorsModel.activeFeed,
    moreData: state.vendorsModel.activeFeedHasMoreData,
    loadingVendors: state.vendorsModel.loadingVendors,
    vendorList: state.vendorsModel.vendorList,
    vendorListBlockerText: state.vendorsModel.vendorListBlockerText,
    vendorsDetail: state.vendorsModel.vendorsDetail,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchVendorsDetail: dispatch.vendorsModel.fetchVendorsDetail,
    fetchActiveVendors: dispatch.vendorsModel.fetchActiveVendors,
    fetchVendorList: dispatch.vendorsModel.fetchVendorList,
    changeFilter: dispatch.vendorsModel.changeFilter,
    changeSubFilter: dispatch.vendorsModel.changeSubFilter,
    inviteNewMember: dispatch.vendorsModel.inviteNewMember,
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(Vendors);
