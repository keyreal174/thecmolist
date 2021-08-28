import React, { useState, useRef } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./profile.scss";

function EditProfile(props) {
  const [firstName, setFirstName] = useState(props.profileFirstName);
  const [lastName, setLastName] = useState(props.profileLastName);
  const [title, setTitle] = useState(props.profileTitle);
  const [company, setCompany] = useState(props.profileCompany);
  const [city, setCity] = useState(props.profileCity);
  const [province, setProvince] = useState(props.profileState);
  const [country, setCountry] = useState(props.profileCountry);
  const [linkedin, setLinkedin] = useState(props.profileLinkedin);
  const [website, setWebsite] = useState(props.profileWebsite);
  const [headline, setHeadline] = useState(props.profileHeadline);
  const [imageUploading, setImageUploading] = useState(false);
  const [image, setImage] = useState(props.profileImage);
  const { onHide, onSuccess, onImageChange } = props;

  // props to control profile image
  const inputFile = useRef(null);
  let onInputFileChange = (event) => {
    if (event && event.target && event.target.files.length > 0) {
      console.log(event.target.files[0]);
      setImageUploading(true);
      onImageChange(event.target.files[0], (img) => {
        setImageUploading(false);
        if (img) {
          setImage(img);
        }
      });
    }
  };
  return (
    <>
      <Modal show={props.show} backdrop="static" keyboard={false} size="xl">
        <Modal.Header>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm="6" md="3" lg="3">
                <img src={image} style={{ maxWidth: "200px" }} alt="" />
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  onChange={onInputFileChange}
                  style={{ display: "none" }}
                />
              </Col>
              <Col>
                {imageUploading ? (
                  <Button
                    className="btn-white"
                    variant="outline-primary"
                    style={{ marginLeft: "10px" }}
                    disabled
                  >
                    Uploading...
                  </Button>
                ) : (
                  <Button
                    className="btn-white"
                    variant="outline-primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                      inputFile &&
                        inputFile.current &&
                        inputFile.current.click();
                    }}
                  >
                    Edit Image
                  </Button>
                )}
              </Col>
            </Row>
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
                <Form.Label>Title</Form.Label>
                <Form.Control
                  placeholder=""
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Company</Form.Label>
                <Form.Control
                  placeholder=""
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-white"
            variant="outline-primary"
            onClick={() => {
              onHide();
              setImageUploading(false);
            }}
          >
            Cancel
          </Button>
          <Button
            className="btn-white modal-primary-button"
            variant="outline-primary"
            onClick={() => {
              onSuccess({
                firstName: firstName,
                lastName: lastName,
                title: title,
                company: company,
                city: city,
                state: province,
                country: country,
                linkedin: linkedin,
                website: website,
                headline: headline,
                image: image,
              });
              setImageUploading(false);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfile;
