import React from "react";
import Footer from "../app/base/Footer/Footer";
import Logo from "../app/base/Header/svgs/logo.svg";
import "./signedup.scss";

function Signedup() {
  return (
    <div className="container wrapper">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <a className="nav__logo signedup--logo" href="/">
            <img src={Logo} alt="CMOList brand logo" />
          </a>
          <div className="form-group signedup--form">
            <h2 className="signedup--thanks">Thank you for your application</h2>
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
