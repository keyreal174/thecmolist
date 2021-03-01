import React from "react";
import Footer from "../app/base/Footer/Footer";
import "./signedup.scss";

function Signedup() {
  return (
    <div className="container wrapper">
      <div className="row no-gutters">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <a className="nav__logo signedup--logo" href="/">
            CMO<span>list</span>
          </a>
          <div className="form-group signedup--form">
            <h2 className="signedup--thanks">Thank you for signing up</h2>
            <p className="signedup--contact">
              Any questions? Please contact us at{" "}
              <a href="mailto:hello@thecmolist.com">hello@thecmolist.com</a>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>
      <Footer className="signedup--footer" />
    </div>
  );
}

export default Signedup;
