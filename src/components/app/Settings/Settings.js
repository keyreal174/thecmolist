import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Form, Col, Alert } from "react-bootstrap";
import clsx from "clsx";
import Layout from "../base/Layout/Layout";
import Footer from "../base/Footer/Footer";
import Separator from "../base/Separator/Separator";

import "./settings.scss";

const Settings = ({ settings, saveSetting, getSetting }) => {
  const history = useHistory();
  const [account, setAccount] = useState({
    new_password: "",
    confirm_password: "",
    email: "",
    allowDiscussions: false,
    allowActivity: false,
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();

    if (account.new_password === account.confirm_password) {
      try {
        await saveSetting({
          email: account.email,
          allowDiscussions: account.allowDiscussions,
          allowActivity: account.allowActivity,
        });
      } catch (err) {
        setError(err);
      }
    } else {
      setError("Passwords must be matched");
    }
  };

  const handleCancel = (e) => {
    setError(null);
    setAccount({
      new_password: "",
      confirm_password: "",
      email: settings.email,
      allowDiscussions: settings.allowDiscussions,
      allowActivity: settings.allowActivity,
    });
    history.goBack();
  };

  const handleInput = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const handleDiscussion = (e) => {
    setAccount({
      ...account,
      allowDiscussions: e.target.checked,
    });
  };

  const handleActivity = (e) => {
    setAccount({
      ...account,
      allowActivity: e.target.checked,
    });
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        await getSetting();
      } catch (err) {
        setError(err);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setAccount({
        new_password: "",
        confirm_password: "",
        email: settings.email,
        allowDiscussions: settings.allowDiscussions,
        allowActivity: settings.allowActivity,
      });
    }
  }, [settings]);

  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <Layout onToggle={handleToggle}>
      <Container>
        <div className={clsx("wrapper settings", mobileMenuOpen && "open")}>
          <h2 className="section-title pt-4 py-3">Settings</h2>
          <div className="account-settings mt-2">
            <h2 className="section-title">Account Settings</h2>
            <Separator className="settings-separator" />
            <Form onSubmit={handleSubmit}>
              <div className="account-settings-info">
                {error && (
                  <Alert variant="danger" className="mb-0 mt-2">
                    {error}
                  </Alert>
                )}
                <Separator className="settings-separator" />
                <div className="account-settings-sub-info">
                  <h3 className="section-sub-title mb-4">
                    Update email notifications
                  </h3>
                  <Form.Group>
                    <Form.Check
                      custom
                      type="checkbox"
                      id="discussion-checkbox"
                      label="Discussions"
                      checked={account.allowDiscussions}
                      onChange={handleDiscussion}
                    />
                    <Form.Check
                      custom
                      type="checkbox"
                      id="activity-checkbox"
                      label="Activity digest"
                      checked={account.allowActivity}
                      onChange={handleActivity}
                    />
                  </Form.Group>
                </div>
              </div>
              <Separator className="settings-separator" />
              <div className="account-settings-submit-info mt-3 text-center d-flex justify-content-end">
                <button
                  className="btn__homepage btn__homepage-white btn__share-module-share mr-3 account-settings-button"
                  style={{ margin: "initial" }}
                  onClick={handleCancel}
                  type="button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn__homepage btn__homepage-blue btn__share-module-share account-settings-button"
                  style={{ margin: "initial" }}
                >
                  Update
                </button>
              </div>
            </Form>
          </div>
        </div>

        <Footer
          className={clsx("settings--footer", mobileMenuOpen && "open")}
        />
      </Container>
    </Layout>
  );
};

const mapState = (state) => {
  return {
    settings: state.settingsModel.settings,
  };
};

const mapDispatch = (dispatch) => {
  return {
    saveSetting: dispatch.settingsModel.saveSetting,
    getSetting: dispatch.settingsModel.getSetting,
  };
};

export default connect(mapState, mapDispatch)(Settings);
