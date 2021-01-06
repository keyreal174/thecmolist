import React from "react";

function Signedup() {
  return (
    <div className="container wrapper">
      <div className="row no-gutters">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <a
            className="nav__logo"
            href="/"
            style={{ textAlign: "center", display: "block" }}
          >
            CMO<span>list</span>
          </a>
          <div
            className="form-group"
            style={{
              background: "white",
              "padding-top": "40px",
              "padding-bottom": "40px",
              textAlign: "center",
            }}
          >
            <h2>Thank you for signing up</h2>
            <p>
              Any questions? Please contact us at{" "}
              <a href="mailto:hello@thecmolist.com">hello@thecmolist.com</a>
            </p>
          </div>
        </div>
        <div className="col-md-3"></div>
      </div>

      <footer className="footer">
        <div className="footer__wrapper">
          <div className="row" />
        </div>
      </footer>
    </div>
  );
}

export default Signedup;
