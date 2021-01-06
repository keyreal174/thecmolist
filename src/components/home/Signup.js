import React from "react";
import "./Signup.css";

function handleSubmit(e) {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbw2T8seh57PBnyZWwS6adWbqRvSkxtUYrjUvscVjQGiqPU8xAvZ/exec";
  const form = document.forms["submit-to-google-sheet"];
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form) })
    .then((response) => {
      console.log("Success!", response);
      window.location.href = "/signedup";
    })
    .catch((error) => {
      console.error("Error!", error.message);
      window.alert("An error occurred!");
    });
}

function Signup() {
  return (
    <div className="container wrapper">
      <div className="row no-gutters">
        <div className="col-md-3"></div>
        <div className="col-md-6">
          <a
            className="nav__logo"
            href="/"
            style={{
              textAlign: "center",
              display: "block",
              "margin-top": "10px",
            }}
          >
            CMO<span>list</span>
          </a>
          <form
            name="submit-to-google-sheet"
            style={{ background: "white", "margin-top": "10px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <br />
              <h2 className="signup-header">Apply to join CMOlist as a </h2>
              <input
                className="input-field signup-radio"
                type="radio"
                id="cmo"
                name="role"
                value="cmo"
                required
              />
              <label for="cmo">CMO or senior marketing executive</label>
              <br />
              <input
                className="input-field signup-radio"
                type="radio"
                id="agency"
                name="role"
                value="agency"
              />
              <label for="agency">Agency or marketing technology firm</label>
              <br />
              <input
                className="input-field signup-radio"
                type="radio"
                id="marketing_professional"
                name="role"
                value="marketing_professional"
              />
              <label for="marketing_professional">Marketing professional</label>
            </div>
            <hr
              style={{ "margin-top": "30px", border: "1px solid lightgray" }}
            />
            <div className="form-group">
              <h2 className="signup-header">Apply for beta access</h2>
              <span className="signup-attn">
                Apply below to be notified when CMOlist is available for early
                access
              </span>
            </div>
            <div className="form-group">
              <label className="label-field" for="name">
                Name
              </label>
              <br />
              <input
                name="name"
                type="text"
                placeholder="First name, Last name"
                className="input-field max-input-width"
                required
              />
            </div>
            <div className="form-group">
              <label className="label-field" for="company">
                Company
              </label>
              <br />
              <input
                name="company"
                type="text"
                placeholder="Acme Inc."
                className="input-field max-input-width"
                required
              />
            </div>
            <div className="form-group">
              <label className="label-field" for="email">
                Email
              </label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input-field max-input-width"
                required
              />
            </div>
            <div className="form-group">
              <button
                type="submit"
                className="btn__homepage btn__homepage-blue"
              >
                Apply
              </button>
            </div>
            <div
              className="form-group"
              style={{ "text-align": "center", "padding-bottom": "30px" }}
            >
              <span className="signup-attn">
                Already on CMOlist? <a href="/login">Sign in</a>
              </span>
            </div>
          </form>
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

export default Signup;
