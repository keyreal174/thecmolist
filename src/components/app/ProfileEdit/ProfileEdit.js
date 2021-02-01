import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Separator from "../base/Separator/Separator";
import {
  Alert,
  Container,
  Button,
  Form,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import "./profileEdit.css";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ProfileEdit = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [country, setCountry] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [website, setWebsite] = useState("");
  const [headline, setHeadline] = useState("");
  const [image, setImage] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [areasOfExpertise, setAreasOfExpertise] = useState("");
  const [areasOfInterest, setAreasOfInterest] = useState("");
  const [networking, setNetworking] = useState(false);
  const [networkingOpportunities, setNetworkingOpportunities] = useState("");
  const [advising, setAdvising] = useState(false);
  const [advisingOpportunities, setAdvisingOpportunities] = useState("");
  const [companyLinkedin, setCompanyLinkedin] = useState("");
  const [companyIndustry, setCompanyIndustry] = useState("");
  const [companyStage, setCompanyStage] = useState("");
  const [revenue, setRevenue] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [now, setNow] = useState(50);
  const [firstTime, setFirstTime] = useState(false);
  // props to control profile image
  const inputFile = useRef(null);

  let onInputFileChange = async (event) => {
    if (event && event.target && event.target.files.length > 0) {
      setImageUploading(true);
      const url = await getBase64(event.target.files[0]);
      setImage(url);
      setImageUploading(false);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      await props.fetchProfile();
    };

    fetch();
  }, []);

  const setProfileInfo = (profile) => {
    setFirstName(profile.firstName);
    setLastName(profile.lastName);
    setTitle(profile.title);
    setCompany(profile.company);
    setCity(profile.city);
    setProvince(profile.state);
    setCountry(profile.country);
    setLinkedin(profile.linkedin);
    setWebsite(profile.website);
    setHeadline(profile.headline);
    setImage(profile.image);
    if (profile.about) {
      let pfa = profile.about;
      pfa.areasOfExpertise &&
        setAreasOfExpertise(pfa.areasOfExpertise.join(", "));
      pfa.areasOfInterest && setAreasOfInterest(pfa.areasOfInterest.join(", "));
      pfa.networking && setNetworking(pfa.networking);
      pfa.networkingOpportunities &&
        setNetworkingOpportunities(pfa.networkingOpportunities);
      pfa.advising && setAdvising(pfa.advising);
      pfa.advisingOpportunities &&
        setAdvisingOpportunities(pfa.advisingOpportunities);
    }

    setCompanyLinkedin(profile.companyLinkedin);
    setCompanyIndustry(profile.companyIndustry);
    setCompanyStage(profile.companyStage);
    setRevenue(profile.revenue);
    setIsNewUser(profile.isNewUser);
  };

  useEffect(() => {
    if (Object.keys(props.profile).length > 0) {
      setProfileInfo(props.profile);

      if (props.profile.isNewUser) {
        setFirstTime(props.profile.isNewUser);
      }
    }
  }, [props.profile]);

  const handleCancel = (e) => {
    setProfileInfo(props.profile);
    setImageUploading(false);
  };

  const handleSubmit = async (e) => {
    const updated_profile = {
      ...props.profile,
      firstName,
      lastName,
      title,
      company,
      city,
      state: province,
      country,
      linkedin,
      website,
      headline,
      image,
      about: {
        areasOfExpertise: areasOfExpertise.split(", "),
        areasOfInterest: areasOfInterest.split(", "),
        networking,
        networkingOpportunities,
        advising,
        advisingOpportunities,
      },
      companyLinkedin,
      companyIndustry,
      companyStage,
      revenue,
      isNewUser: false,
    };
    setNow(100);
    await props.saveProfile(updated_profile);
  };

  return (
    <Container className="height-100">
      <Header />
      <Form>
        {firstTime && (
          <div className="card-box mt-2">
            <div className="profile-edit-progress d-flex align-items-center">
              <span className="mr-3">Start</span>
              <ProgressBar
                now={now}
                className="w-100 mt-1"
                style={{ height: 15 }}
              />
              <span className="ml-3">Finish</span>
            </div>
          </div>
        )}
        {isNewUser && (
          <Alert variant="success" className="mt-2 mb-0 welcome-message">
            <Alert.Heading className="mb-1 px-3">One Last Step</Alert.Heading>
          </Alert>
        )}
        <div className="card-box mt-2">
          <div className="d-flex align-items-center px-3">
            <img
              className="rounded-circle"
              src={image}
              style={{ width: 120, height: 120 }}
              alt=""
            />
            <input
              type="file"
              id="file"
              ref={inputFile}
              onChange={onInputFileChange}
              style={{ display: "none" }}
            />
            <div className="ml-5">
              <h2 className="profile-edit-header mb-3 text-black">
                Edit Profile
              </h2>
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
                  className="btn-white"
                  variant="outline-primary"
                  onClick={() => {
                    inputFile && inputFile.current && inputFile.current.click();
                  }}
                >
                  Update Image
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="card-box mt-2">
          <div className="identity">
            <div style={{ marginLeft: -20, marginRight: -20 }}>
              <h2 className="profile-edit-section-title mb-3 px-4">Identity</h2>
              <Separator />
            </div>
            <Row>
              <Col>
                <Form.Label>First name</Form.Label>
                <Form.Control
                  placeholder=""
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  placeholder=""
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  placeholder=""
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>State/Province</Form.Label>
                <Form.Control
                  placeholder=""
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Country</Form.Label>
                <Form.Control
                  placeholder=""
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>LinkedIn profile URL</Form.Label>
                <Form.Control
                  placeholder=""
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Website URL (optional)</Form.Label>
                <Form.Control
                  placeholder=""
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Headline (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="3"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                />
              </Col>
            </Row>
          </div>
          <div className="role mt-4">
            <div style={{ marginLeft: -20, marginRight: -20 }}>
              <h2 className="profile-edit-section-title mb-3 px-4">Role</h2>
              <Separator />
            </div>
            <Row>
              <Col>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Revenue accountability / impact ($M)</Form.Label>
                <Form.Control
                  placeholder=""
                  value={revenue}
                  onChange={(e) => setRevenue(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Company name</Form.Label>
                <Form.Control
                  placeholder=""
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Company LinkedIn URL</Form.Label>
                <Form.Control
                  placeholder=""
                  value={companyLinkedin}
                  onChange={(e) => setCompanyLinkedin(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Company Industry</Form.Label>
                <Form.Control
                  placeholder=""
                  value={companyIndustry}
                  onChange={(e) => setCompanyIndustry(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Company Stage (e.g., Series A)</Form.Label>
                <Form.Control
                  placeholder=""
                  value={companyStage}
                  onChange={(e) => setCompanyStage(e.target.value)}
                />
              </Col>
            </Row>
          </div>
          <div className="about mt-4">
            <div style={{ marginLeft: -20, marginRight: -20 }}>
              <h2 className="profile-edit-section-title mb-3 px-4">About</h2>
              <Separator />
            </div>
            <Row>
              <Col>
                <Form.Label>Areas of expertise</Form.Label>
                <Form.Control
                  placeholder="Choose one or more #topics"
                  value={areasOfExpertise}
                  onChange={(e) => setAreasOfExpertise(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Areas of interest</Form.Label>
                <Form.Control
                  placeholder="Choose one or more #topics"
                  value={areasOfInterest}
                  onChange={(e) => setAreasOfInterest(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Open to networking</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Yes"
                    type="radio"
                    name="networking"
                    id="networking-radio-1"
                    checked={networking}
                    onChange={() => setNetworking(true)}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type="radio"
                    name="networking"
                    id="networking-radio-2"
                    checked={!networking}
                    onChange={() => setNetworking(false)}
                  />
                </div>
              </Col>
              <Col>
                <Form.Label>Networking opportunities</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="1"
                  placeholder="What types of people would you like to meet?"
                  value={networkingOpportunities}
                  onChange={(e) => setNetworkingOpportunities(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Open to advising</Form.Label>
                <div>
                  <Form.Check
                    inline
                    label="Yes"
                    type="radio"
                    name="advising"
                    id="advising-radio-1"
                    checked={advising}
                    onChange={() => setAdvising(true)}
                  />
                  <Form.Check
                    inline
                    label="No"
                    type="radio"
                    name="advising"
                    id="advising-radio-2"
                    checked={!advising}
                    onChange={() => setAdvising(false)}
                  />
                </div>
              </Col>
              <Col>
                <Form.Label>Advising opportunities</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="1"
                  placeholder="What type companies would you like to advise?"
                  value={advisingOpportunities}
                  onChange={(e) => setAdvisingOpportunities(e.target.value)}
                />
              </Col>
            </Row>
          </div>
          <div className="mt-4">
            <div style={{ marginLeft: -20, marginRight: -20 }} className="mb-3">
              <Separator />
            </div>
            <div className="d-flex justify-content-end">
              {isNewUser ? (
                <Button
                  className="btn-white modal-primary-button"
                  variant="outline-primary"
                  onClick={handleSubmit}
                >
                  Done
                </Button>
              ) : (
                <>
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
                </>
              )}
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
    profile: state.profileModel.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchProfile: dispatch.profileModel.fetchProfile,
    saveProfile: dispatch.profileModel.saveProfile,
  };
};

export default connect(mapState, mapDispatch)(ProfileEdit);
