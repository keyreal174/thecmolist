import React, { useState, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Button, Container, Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

import Header from "../base/Header/Header";
import Footer from "../base/Footer/Footer";
import Separator from "../base/Separator/Separator";

import "./settings.css";

const validationSchema = Yup.object({
  new_password: Yup.string()
    .required("New password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("new_password"), null],
    "Passwords must match"
  ),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Settings = () => {
  const [account, setAccount] = useState({
    new_password: "",
    confirm_password: "",
    email: "",
    discussion: false,
    activity: false,
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Container className="height-100">
      <Header />
      <div className="wrapper">
        <h2 className="section-title pt-4 py-3">Settings</h2>
        <div className="account-settings mt-2">
          <h2 className="section-title mb-2">Account Settings</h2>
          <Separator />
          <Formik
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={{
              new_password: "",
              confirm_password: "",
              email: "",
              discussion: false,
              activity: false,
            }}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <div className="account-settings-info">
                  <div className="account-settings-sub-info">
                    <h3 className="section-sub-title mb-2">Change Password</h3>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="ValidationFormik101"
                      >
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                          className="password"
                          type="password"
                          placeholder="New Password"
                          value={account.password}
                          onChange={(e) => console.log("====")}
                        />
                      </Form.Group>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik102"
                      >
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                          className="password"
                          type="password"
                          placeholder="Confirm Password"
                          value={account.confirm_password}
                          onChange={(e) => console.log("====")}
                        />
                      </Form.Group>
                    </Form.Row>
                  </div>
                  <Separator />
                  <div className="account-settings-sub-info">
                    <h3 className="section-sub-title mb-2">Change Email</h3>
                    <Form.Row>
                      <Form.Group
                        as={Col}
                        md="6"
                        controlId="validationFormik103"
                      >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                          className="email"
                          type="email"
                          placeholder="admin@test.com"
                          value={account.email}
                          onChange={(e) => console.log("====")}
                        />
                      </Form.Group>
                    </Form.Row>
                  </div>
                  <Separator />
                  <div className="account-settings-sub-info">
                    <h3 className="section-sub-title mb-2">
                      Update email notifications
                    </h3>
                    <Form.Group>
                      <Form.Check
                        custom
                        type="checkbox"
                        id="discussion-checkbox"
                        label="Discussions"
                      />
                      <Form.Check
                        custom
                        type="checkbox"
                        id="activity-checkbox"
                        label="Activity digest"
                      />
                    </Form.Group>
                  </div>
                </div>
                <Separator />
                <div className="account-settings-submit-info mt-3 text-center">
                  <Button type="" variant="outline-primary mr-3">
                    Cancel
                  </Button>
                  <Button type="submit">Update</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer />
    </Container>
  );
};

export default Settings;
