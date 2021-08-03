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
  return axios.post("/api/adminpost", postBody);
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
    })
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

  useEffect(() => {
    adminFormRequest().then((response) =>
      response.data && response.data.fields
        ? setFields(response.data.fields)
        : alert("Unauthorized")
    );
  }, []);

  return (
    <Container className="home height-100">
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
            {fields.map((f, idx) => (
              <Col md="12" idx={idx}>
                <Form
                  className="home--form-right"
                  style={{ height: "unset" }}
                  onSubmit={handleFormSubmit}
                >
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
