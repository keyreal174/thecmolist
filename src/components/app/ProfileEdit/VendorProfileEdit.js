import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Separator from "../base/Separator/Separator";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { profileImage } from "../../util/constants";
import Util from "../../util/Util";

const VendorType = ["Company", "Product", "Contractor"];

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const VendorProfileEdit = (props) => {
  const history = useHistory();
  const [companyName, setCompanyName] = useState("");
  const [companyLinkedin, setCompanyLinkedin] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [productName, setProductName] = useState("");
  const [productLinkedin, setProductLinkedin] = useState("");
  const [productWebsite, setProductWebsite] = useState("");
  const [contractorName, setContractorName] = useState("");
  const [contractorLinkedin, setContractorLinkedin] = useState("");
  const [contractorWebsite, setContractorWebsite] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [twitter, setTwitter] = useState("");
  const [headline, setHeadline] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const [areasOfExpertise, setAreasOfExpertise] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [now, setNow] = useState(50);
  const [vendor_type, setVendorType] = useState(VendorType[0]);
  // props to control profile image
  const inputFile = useRef(null);
  const coverInputFile = useRef(null);

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
      const url = await getBase64(event.target.files[0]);
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
    setCompanyName(profile.company);
    setCompanyLinkedin(profile.companyLinkedin);
    setCompanyWebsite(profile.companyWebsite);
    setProductName(profile.product);
    setProductLinkedin(profile.productLinkedin);
    setProductWebsite(profile.productWebsite);
    setContractorName(profile.contractor);
    setContractorLinkedin(profile.contractorLinkedin);
    setContractorWebsite(profile.contractorWebsite);
    setHeadline(profile.headline);
    setImage(profile.image);
    setCoverImage(profile.coverImage || profileImage);

    if (profile.about) {
      let pfa = profile.about;
      pfa.areasOfExpertise &&
        setAreasOfExpertise(pfa.areasOfExpertise.join(", "));
    }

    setCompanyIndustry(profile.companyIndustry);
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
      company: companyName,
      companyLinkedin,
      companyWebsite,
      product: productName,
      productLinkedin,
      productWebsite,
      contractor: contractorName,
      contractorLinkedin,
      contractorWebsite,
      headline,
      coverImage,
      image,
      companyIndustry,
      about: {
        ...props?.profile?.about,
        areasOfExpertise: areasOfExpertise.split(", "),
      },
    };
    console.log(areasOfExpertise);
    setNow(100);
    try {
      await props.saveProfile(updated_profile);
      history.push("/vendor");
    } catch (err) {
      throw new Error("Could not save vendor profile");
    }
  };

  return (
    <Container className="profile height-100">
      <Header />
      <Form className="mb-5">
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
                    inputFile && inputFile.current && inputFile.current.click();
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
              <h2 className="profile-edit-section-title mb-3 px-4">Overview</h2>
              <Separator className="card-separator" />
            </div>
            <Row className="profile--row mt-5">
              <Col>
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
                        checked={vendor === vendor_type}
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
              {vendor_type === "Company" ? (
                <>
                  <Col>
                    <Form.Label>Company name</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Company LinkedIn URL</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={companyLinkedin}
                      onChange={(e) => setCompanyLinkedin(e.target.value)}
                    />
                  </Col>
                </>
              ) : vendor_type === "Product" ? (
                <>
                  <Col>
                    <Form.Label>Product name</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Company LinkedIn URL</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={productLinkedin}
                      onChange={(e) => setProductLinkedin(e.target.value)}
                    />
                  </Col>
                </>
              ) : (
                <>
                  <Col>
                    <Form.Label>Contractor name</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={contractorName}
                      onChange={(e) => setContractorName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Contractor LinkedIn URL</Form.Label>
                    <Form.Control
                      className="profile--input"
                      placeholder=""
                      value={contractorLinkedin}
                      onChange={(e) => setContractorLinkedin(e.target.value)}
                    />
                  </Col>
                </>
              )}
            </Row>
            <Row className="profile--row">
              {vendor_type === "Company" ? (
                <Col>
                  <Form.Label>Company Website</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={companyWebsite}
                    onChange={(e) => setCompanyWebsite(e.target.value)}
                  />
                </Col>
              ) : vendor_type === "Product" ? (
                <Col>
                  <Form.Label>Product Website</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={productWebsite}
                    onChange={(e) => setProductWebsite(e.target.value)}
                  />
                </Col>
              ) : (
                <Col>
                  <Form.Label>Contractor Website</Form.Label>
                  <Form.Control
                    className="profile--input"
                    placeholder=""
                    value={contractorWebsite}
                    onChange={(e) => setContractorWebsite(e.target.value)}
                  />
                </Col>
              )}
              <Col>
                <Form.Label>Twitter</Form.Label>
                <Form.Control
                  className="profile--input"
                  placeholder=""
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="profile--row mb-5">
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="profile--input"
                  placeholder="San Francisco"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>State/Province</Form.Label>
                <Form.Control
                  className="profile--input"
                  placeholder="CA"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="profile--input"
                  placeholder="USA"
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
              <Col>
                <Form.Label>Headline (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  className="profile--textarea"
                  rows="3"
                  placeholder="High-tech professional marketer passionate about consumer internet, SaaS and disruptive marketplaces. Industry expertise: mobile, consumer internet, social media, enterprise software, SaaS, advertising."
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="profile--row">
              <Col>
                <Form.Label>Areas of marketing expertise</Form.Label>
                <Form.Control
                  className="profile--input"
                  placeholder="Choose one or more #topics"
                  value={areasOfExpertise}
                  onChange={(e) => setAreasOfExpertise(e.target.value)}
                />
              </Col>
              <Col>
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
      <Footer />
    </Container>
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
  };
};

export default connect(mapState, mapDispatch)(VendorProfileEdit);
