import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Footer from "../base/Footer/Footer";
import Separator from "../base/Separator/Separator";
import { AsyncTypeahead, TypeaheadMenu } from "react-bootstrap-typeahead";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { vendorProfileHeader } from "../../util/constants";
import Util from "../../util/Util";

const VendorType = ["Company", "Product", "Contractor"];

const VendorProfileEdit = (props) => {
  const history = useHistory();

  const [companyName, setCompanyName] = useState("");
  const [companyLinkedin, setCompanyLinkedin] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [twitter, setTwitter] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [now, setNow] = useState(50);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [vendorType, setVendorType] = useState(VendorType[0]);
  // props to control profile image
  const inputFile = useRef(null);
  const coverInputFile = useRef(null);
  // props to cover typeahead
  const [isTypeaheadLoading, setIsTypeaheadLoading] = useState(false);
  const [typeaheadOptions, setTypeaheadOptions] = useState([
    { name: "#martech", type: "topic", slug: "martech" },
    { name: "#social", type: "topic", slug: "social" },
    { name: "#brand", type: "topic", slug: "brand" },
    { name: "#advertising", type: "topic", slug: "advertising" },
    {
      name: "#performancemarketing",
      type: "topic",
      slug: "performancemarketing",
    },
  ]);
  const [selectedAreasOfExpertise, setSelectedAreasOfExpertise] = useState([]);

  const onInputFileChange = async (event) => {
    if (event && event.target && event.target.files.length > 0) {
      setImageUploading(true);
      const url = await props.uploadImageFile(event.target.files[0]);
      setImage(url);
      setImageUploading(false);
    }
  };

  const onCoverInputFileChange = async (event) => {
    if (event && event.target && event.target.files.length > 0) {
      setCoverImageUploading(true);
      const url = await props.uploadImageFile(event.target.files[0]);
      setCoverImage(url);
      setCoverImageUploading(false);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      await props.fetchVendor(
        Util.parsePath(window.location.href).trailingPath
      );
    };

    fetch();
  }, []);

  const setProfileInfo = (profile) => {
    setCity(profile.city);
    setProvince(profile.state);
    setCountry(profile.country);
    setCompanyName(profile.name);
    setCompanyLinkedin(profile.linkedin);
    setTwitter(profile.twitter);
    setCompanyWebsite(profile.website);
    setCompanyIndustry(profile.industry);
    setDescription(profile.description);
    setImage(profile.image);
    setCoverImage(profile.coverImage || vendorProfileHeader);
    if (profile.type) {
      let idx = VendorType.indexOf(profile.type);
      if (idx >= 0) {
        setVendorType(VendorType[idx]);
      }
    }
    if (profile.areasOfExpertise && profile.areasOfExpertise.length > 0) {
      setSelectedAreasOfExpertise(
        profile.areasOfExpertise.map((a) => ({
          name: a.name,
          slug: a.slug,
        }))
      );
    }
  };

  useEffect(() => {
    if (Object.keys(props.profile).length > 0) {
      setProfileInfo(props.profile);
    }
  }, [props.profile]);

  const handleCancel = (e) => {
    setProfileInfo(props.profile);
    setImageUploading(false);
    setCoverImageUploading(false);
    window.history.back();
  };

  const handleSubmit = async (e) => {
    const updated_profile = {
      ...props.profile,
      city,
      state: province,
      country,
      description,
      company: companyName,
      companyWebsite,
      coverImage,
      image,
      companyLinkedin,
      twitter,
      companyIndustry,
      areasOfExpertise: selectedAreasOfExpertise,
      vendorType: vendorType,
    };
    try {
      let vendorSlug = Util.parsePath(window.location.href).trailingPath;
      await props.saveVendor({
        vendorSlug: vendorSlug,
        profile: updated_profile,
      });
      window.location.href = `/vendor/${vendorSlug}`;
    } catch (err) {
      throw new Error("Could not save vendor profile");
    }
  };

  const handleSearch = async (query) => {
    setIsTypeaheadLoading(true);
    const data = await props.getTopicSuggestions(query);
    const options = data
      .map((i, index) => ({
        id: index,
        slug: i.slug,
        name: i.name,
      }))
      .filter(
        (o) => !selectedAreasOfExpertise.some((so) => o.name === so.name)
      );

    setTypeaheadOptions(options);
    setIsTypeaheadLoading(false);
  };

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container className="profile height-100">
        <Form
          className={clsx(
            "mb-5",
            "vendor-profile--form",
            mobileMenuOpen && "open"
          )}
        >
          <div className="card-box mt-2">
            <div className="profile--cover-wrapper">
              <img
                className="profile--cover"
                alt="profile"
                src={coverImage}
              ></img>
              <input
                type="file"
                id="file"
                ref={coverInputFile}
                onChange={onCoverInputFileChange}
                style={{ display: "none" }}
              />
              <div className="profile--edit-cover">
                {coverImageUploading ? (
                  <Button
                    className="btn-white"
                    variant="outline-primary"
                    disabled
                  >
                    Uploading...
                  </Button>
                ) : (
                  <Button
                    disabled
                    className="btn-white mt-3"
                    variant="outline-primary"
                    onClick={() => {
                      coverInputFile &&
                        coverInputFile.current &&
                        coverInputFile.current.click();
                    }}
                  >
                    Edit Cover Image
                  </Button>
                )}
              </div>
            </div>
            <div className="d-flex flex-column px-3">
              <img
                className="profile--image rounded-circle"
                src={image}
                style={{ width: 150, height: 150 }}
                alt=""
              />
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={onInputFileChange}
                style={{ display: "none" }}
              />
              <div className="profile--edit-image">
                {imageUploading ? (
                  <Button
                    className="btn-white"
                    variant="outline-primary"
                    disabled
                  >
                    Uploading...
                  </Button>
                ) : (
                  <Button
                    className="btn-white mt-3"
                    variant="outline-primary"
                    onClick={() => {
                      inputFile &&
                        inputFile.current &&
                        inputFile.current.click();
                    }}
                  >
                    Edit Profile Image
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="card-box py-3 px-3">
            <div className="profile--row-title">
              <div>
                <h2 className="profile-edit-section-title mb-3 px-4">
                  Overview
                </h2>
                <Separator className="card-separator" />
              </div>
              <Row className="profile--row mt-5">
                <Col md="12" sm="12">
                  <Form.Label>Vendor</Form.Label>
                  <div className="vendor-profile-type-list">
                    {VendorType.map((vendor, index) => {
                      return (
                        <Form.Check
                          key={index}
                          label={vendor}
                          name="vendortype"
                          value={vendor}
                          id={vendor}
                          checked={vendor === vendorType}
                          onChange={(e) => {
                            setVendorType(e.target.value);
                          }}
                          type="radio"
                        />
                      );
                    })}
                  </div>
                </Col>
              </Row>
              <Row className="profile--row">
                {vendorType === "Company" ? (
                  <>
                    <Col md="6" sm="12">
                      <Form.Label>Company name</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </Col>
                    <Col md="6" sm="12">
                      <Form.Label>Company LinkedIn URL</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyLinkedin}
                        onChange={(e) => setCompanyLinkedin(e.target.value)}
                      />
                    </Col>
                  </>
                ) : vendorType === "Product" ? (
                  <>
                    <Col md="6" sm="12">
                      <Form.Label>Product name</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </Col>
                    <Col md="6" sm="12">
                      <Form.Label>Company LinkedIn URL</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyLinkedin}
                        onChange={(e) => setCompanyLinkedin(e.target.value)}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col md="6" sm="12">
                      <Form.Label>Contractor name</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </Col>
                    <Col md="6" sm="12">
                      <Form.Label>Contractor LinkedIn URL</Form.Label>
                      <Form.Control
                        className="profile--input"
                        placeholder=""
                        value={companyLinkedin}
                        onChange={(e) => setCompanyLinkedin(e.target.value)}
                      />
                    </Col>
                  </>
                )}
              </Row>
              <Row className="profile--row">
                {vendorType === "Company" ? (
                  <Col md="6" sm="12">
                    <Form.Label>Company Website</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </Col>
                ) : vendorType === "Product" ? (
                  <Col md="6" sm="12">
                    <Form.Label>Product Website</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </Col>
                ) : (
                  <Col md="6" sm="12">
                    <Form.Label>Contractor Website</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={companyWebsite}
                      onChange={(e) => setCompanyWebsite(e.target.value)}
                    />
                  </Col>
                )}
                <Col md="6" sm="12">
                  <Form.Label>Twitter</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder="@handle"
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="profile--row mb-5">
                <Col md="4" sm="12">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Col>
                <Col md="4" sm="12">
                  <Form.Label>State/Province</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  />
                </Col>
                <Col md="4" sm="12">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="profile--row-title about mt-4">
              <div>
                <h2 className="profile-edit-section-title mb-3 px-4">About</h2>
                <Separator className="card-separator" />
              </div>
              <Row className="profile--row mt-5">
                <Col md="12" sm="12">
                  <Form.Label>Description (optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    className="profile--textarea"
                    rows="3"
                    placeholder=""
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <Row className="profile--row">
                <Col md="6" sm="12">
                  <Form.Label>Areas of marketing expertise</Form.Label>
                  <AsyncTypeahead
                    id="async-global-search"
                    className="expertise--input"
                    isLoading={isTypeaheadLoading}
                    labelKey="name"
                    multiple
                    minLength={0}
                    onSearch={handleSearch}
                    options={typeaheadOptions}
                    emptyLabel=""
                    renderMenu={(results, menuProps) => {
                      if (!results.length) {
                        return null;
                      }
                      return (
                        <TypeaheadMenu
                          options={results}
                          labelKey="name"
                          {...menuProps}
                        />
                      );
                    }}
                    selected={selectedAreasOfExpertise}
                    onChange={(selectedOption) => {
                      setSelectedAreasOfExpertise(selectedOption);
                    }}
                    placeholder=""
                    renderMenuItemChildren={(option) => (
                      <React.Fragment>
                        <span>{option.name}</span>
                      </React.Fragment>
                    )}
                  />
                </Col>
                <Col md="6" sm="12">
                  <Form.Label>Company Industry</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder="Choose vendor Industry"
                    value={companyIndustry}
                    onChange={(e) => setCompanyIndustry(e.target.value)}
                  />
                </Col>
              </Row>
            </div>
            <div className="mt-4">
              <div>
                <Separator className="card-separator" />
              </div>
              <div className="d-flex justify-content-end">
                <div className="pt-3">
                  <Button
                    className="btn-white mr-2"
                    variant="outline-primary"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="btn-white modal-primary-button"
                    variant="outline-primary"
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
        <Footer
          className={clsx("vendor-profile--footer", mobileMenuOpen && "open")}
        />
      </Container>
    </Layout>
  );
};

const mapState = (state) => {
  return {
    profile: state.vendorModel.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchVendor: dispatch.vendorModel.fetchVendor,
    saveVendor: dispatch.vendorModel.saveVendor,
    uploadImageFile: dispatch.fileModel.uploadImageFile,
    getTopicSuggestions: dispatch.suggestionsModel.getTopicSuggestions,
  };
};

export default connect(mapState, mapDispatch)(VendorProfileEdit);
