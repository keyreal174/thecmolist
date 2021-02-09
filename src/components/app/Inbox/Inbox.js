import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";

const Inbox = () => {
  return (
    <>
      <Container className="height-100">
        <div className="wrapper">
          <Row>
            <Col md="12">
              <Header />
            </Col>
          </Row>
          <Row className="inbox--wrapper" style={{ marginTop: "98px" }}>
            Work in progress
          </Row>
          <Row>
            <Col md="12">
              <Footer />
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Inbox;
