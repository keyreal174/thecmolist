import React from "react";
import { Container, Col, Row } from "react-bootstrap";

const OnboardingLayout = ({ children, title }) => {
  return (
    <Container>
      <Row>
        <Col md="12">Logo</Col>
        <Col md="12">Progress bar</Col>
      </Row>
      <Row>
        <Col md="12">{title}</Col>
      </Row>
      <Row>
        <Col md="12">{children}</Col>
      </Row>
    </Container>
  );
};

export default OnboardingLayout;
