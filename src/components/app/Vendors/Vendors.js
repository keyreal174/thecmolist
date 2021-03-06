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
import InviteModal from "../base/Invite/InviteModal";
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
  const [isAffiliated, setIsAffiliated] = useState(true);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const changeDashboardHeader = (idx) => {
    if (idx < filters.length) {
      setBannerTitle(filters[idx].title);
      setBannerImage(filters[idx].image);
    }
  };
  useEffect(() => {
    const { type } = props;
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
          setIsAffiliated(false);
          setShowFilters(false);
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
          type,
        });
      } else {
        props.fetchVendorList({
          filterKey: newFilters[idx].slug,
          type,
        });
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
        type: props.type,
      });
    } else {
      props.changeFilter({
        filterKey: filters[idx].slug,
        type: props.type,
      });
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
      <Container>
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
          <div>
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
              </div>
            )}
            {!isAffiliated && (
              <div className="follow-members">
                <Alert variant="info">
                  <span role="img" aria-label="Light bulb">
                    ????
                  </span>
                  {"   "}Browse <b>trusted</b> marketing tools, agencies, and
                  consultants shared by your peers (and return the favor by
                  <a
                    className="cursor-pointer"
                    onClick={(e) => {
                      e && e.preventDefault();
                      toggleAddVendorModal();
                    }}
                    style={{ color: "#2962ff", marginLeft: "5px" }}
                  >
                    <b>sharing your vendors</b>
                  </a>
                  )
                </Alert>
              </div>
            )}
          </div>
          {isDetail ? (
            <VendorsDetail
              vendorsDetail={props.vendorsDetail}
              loadingVendors={props.loadingVendors}
              mobileMenuOpen={mobileMenuOpen}
              toggleAddVendorModal={toggleAddVendorModal}
              getCategoryTitle={getCategoryTitle}
              filterIdx={filterIdx}
              showVendorBtn={true}
              isAdminUser={isAdminUser}
              vendorType={props.type}
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
                    filterIdx={filterIdx}
                    isAdminUser={isAdminUser}
                    type={props.type}
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
        limit={0}
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
    fetchVendorList: dispatch.vendorsModel.fetchVendorList,
    changeFilter: dispatch.vendorsModel.changeFilter,
    changeSubFilter: dispatch.vendorsModel.changeSubFilter,
    inviteNewMember: dispatch.vendorsModel.inviteNewMember,
    getProfileStats: dispatch.profileModel.getProfileStats,
    saveUserInvite: dispatch.userModel.saveInvite,
  };
};

export default connect(mapState, mapDispatch)(Vendors);
