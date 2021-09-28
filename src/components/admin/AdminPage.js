import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import Footer from "../app/base/Footer/Footer";
import axios from "axios";

const adminFormRequest = () => {
  return axios.get("/api/adminform");
};

const adminPostRequest = (data) => {
  var postBody = {
    data: data,
  };
  return axios
    .post("/api/adminpost", postBody)
    .then(({ data }) => {
      if (data.success) {
        alert("success" + data.newId ? ` New ID: ${data.newId}` : "");
      } else {
        let errorMessage = data.error || "Unknown";
        alert("An error occurred: " + errorMessage);
      }
    })
    .catch(function (error) {
      alert("An error occurred: " + error);
    });
};

function AdminPage() {
  const [fields, setFields] = useState([]);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const {
      target: { elements },
    } = e;
    const { method, id, json } = elements;
    console.log(method.value);
    console.log(id.value);
    console.log(json.value);
    adminPostRequest({
      method: method.value,
      id: id.value,
      json: json.value,
    });
  };

  const handlePromotePost = (e) => {
    e.preventDefault();
    const {
      target: { elements },
    } = e;
    const { id, sendemail } = elements;
    console.log(id.value);
    console.log(sendemail.checked);
    adminPostRequest({
      method: "promotepost",
      id: id.value,
      json: { sendemail: sendemail.checked },
    });
  };

  useEffect(() => {
    adminFormRequest().then((response) =>
      response.data && response.data.fields
        ? setFields(response.data.fields)
        : alert("Unauthorized")
    );
  }, []);

  return (
    <Container className="home">
      <Row className="home--header">
        <div className="ml-5">
          <a className="nav__logo" href="/">
            CMO<span>list</span>
          </a>
        </div>
      </Row>
      <Row className="home--form">
        <Col className="px-0" md="12">
          <div className="home--form-title">CMOlist Admin</div>
          <Row>
            <Col md="12">
              <Form style={{ height: "unset" }} onSubmit={handlePromotePost}>
                <Form.Group>
                  <Form.Label className="home--label">Promote post</Form.Label>
                  <Form.Control
                    style={{ width: "100%" }}
                    className="home--input"
                    name="id"
                    type="number"
                    placeholder="Post id (found at the end of the post e.g. /content/<id>)"
                    required={true}
                  />
                  <Form.Check
                    className="home--input"
                    type="checkbox"
                    name="sendemail"
                    label="Send email for post"
                  />
                </Form.Group>
                <Button className="btn__homepage" type="submit">
                  Promote Post
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {fields.map((f, idx) => (
              <Col md="12" idx={idx}>
                <Form style={{ height: "unset" }} onSubmit={handleFormSubmit}>
                  <Form.Group>
                    <Form.Label className="home--label">{f}</Form.Label>
                    <Form.Control
                      style={{ width: "100px", display: "none" }}
                      className="home--input"
                      name="method"
                      type="input"
                      value={f}
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>id</Form.Label>
                    <Form.Control
                      style={{ width: "100px" }}
                      className="home--input"
                      name="id"
                      type="input"
                      defaultValue={0}
                      required={true}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>JSON</Form.Label>
                    <Form.Control
                      className="home--input"
                      name="json"
                      as="textarea"
                      rows="3"
                      required={false}
                    />
                  </Form.Group>
                  <Button className="btn__homepage" type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Footer className="home--footer" />
    </Container>
  );
}

export default AdminPage;
