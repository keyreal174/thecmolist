import React, { useState, useRef, Fragment } from "react";
import { Button, Form, Modal, Row, Col } from "react-bootstrap";
import "./profile.css";

function EditAgency(props) {
  const [agencyName, setAgencyName] = useState(props.agencyName);
  const [agencySlug, setAgencySlug] = useState(props.agencySlug); // eslint-disable-line no-unused-vars
  const [agencyLocation, setAgencyLocation] = useState(props.agencyLocation);
  const [agencyDescription, setAgencyDescription] = useState(
    props.agencyDescription
  );
  const [agencyWebsite, setAgencyWebsite] = useState(props.agencyWebsite);
  const [agencyWork, setAgencyWork] = useState(props.agencyWork);

  const [image, setImage] = useState(props.agencyImage);
  const [imageUploading, setImageUploading] = useState(false);

  const { onHide, onSuccess, onImageChange } = props;

  // props to control agency image
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
      <Modal show={props.show} backdrop="static" keyboard={false} size="lg">
        <Modal.Header>
          <Modal.Title>Edit Agency</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col sm="6" md="3" lg="3">
                <img src={image} style={{ maxWidth: "150px" }} alt="" />
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
                <Form.Label>Agency name</Form.Label>
                <Form.Control
                  placeholder=""
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Agency user name (slug)</Form.Label>
                <Form.Control
                  placeholder=""
                  value={agencySlug}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows="2"
                  value={agencyDescription}
                  onChange={(e) => setAgencyDescription(e.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  placeholder=""
                  value={agencyLocation}
                  onChange={(e) => setAgencyLocation(e.target.value)}
                />
              </Col>
              <Col>
                <Form.Label>Website URL</Form.Label>
                <Form.Control
                  placeholder=""
                  value={agencyWebsite}
                  onChange={(e) => setAgencyWebsite(e.target.value)}
                />
              </Col>
            </Row>
            {agencyWork.length > 0 && (
              <Row>
                <Col>
                  <Form.Label>
                    <bold>Agency Work</bold>
                  </Form.Label>
                </Col>
              </Row>
            )}
            {agencyWork.map((work, idx) => {
              return (
                <Fragment>
                  {idx > 0 && (
                    <Row>
                      <hr className="profile-modal-hr" />
                    </Row>
                  )}
                  <Row>
                    <Col>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder=""
                        value={work.title}
                        onChange={(e) => {
                          work.title = e.target.value;
                          setAgencyWork(agencyWork.slice());
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Caption</Form.Label>
                      <Form.Control
                        placeholder=""
                        value={work.caption}
                        onChange={(e) => {
                          work.caption = e.target.value;
                          setAgencyWork(agencyWork.slice());
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Label>Image url</Form.Label>
                      <Form.Control
                        placeholder=""
                        value={work.image}
                        onChange={(e) => {
                          work.image = e.target.value;
                          setAgencyWork(agencyWork.slice());
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label>Link url</Form.Label>
                      <Form.Control
                        placeholder=""
                        value={work.link}
                        onChange={(e) => {
                          work.link = e.target.value;
                          setAgencyWork(agencyWork.slice());
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <hr />
                  </Row>
                </Fragment>
              );
            })}
            <Row style={{ marginTop: "15px", marginLeft: "-10px" }}>
              <Button
                className="btn-white"
                variant="outline-primary"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  agencyWork.push({
                    title: "",
                    caption: "",
                    image: "",
                    link: "",
                  });
                  setAgencyWork(agencyWork.slice());
                }}
              >
                Add work
              </Button>
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
                slug: agencySlug,
                name: agencyName,
                location: agencyLocation,
                description: agencyDescription,
                website: agencyWebsite,
                work: agencyWork,
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

export default EditAgency;
