import React from "react";
import Footer from "../app/base/Footer/Footer";
import Logo from "../app/base/Header/svgs/logo.svg";
import "./Signup.scss";

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
    <div className="signup--wrapper container wrapper">
      <div className="row no-gutters">
        <div className="col-md-3" />
        <div className="col-md-6">
          <div className="signup--logo nav__logo">
            <img src={Logo} alt="CMOList brand logo" />
          </div>
          <form
            className="signup--form"
            name="submit-to-google-sheet"
            style={{ background: "white", "margin-top": "10px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <h2 className="signup--header">Apply to join CMOlist as a </h2>
              <input
                className="signup--radio input-field signup-radio"
                type="radio"
                id="marketing_leader"
                name="role"
                value="marketing_leader"
              />
              <label for="marketing_leader">Marketing leader</label>
              <br />
              <input
                className="signup--radio input-field signup-radio"
                type="radio"
                id="agency_or_technology_firm"
                name="role"
                value="agency_or_technology_firm"
              />
              <label for="agency_or_technology_firm">
                Agency or marketign technology firm
              </label>
            </div>
            <hr
              style={{ "margin-top": "30px", border: "1px solid lightgray" }}
            />
            <div className="form-group">
              <h2 className="signup--header signup--header-beta">
                Sign Up for beta access
              </h2>
              <span className="signup-attn">
                Apply below to be notified when CMOlist is available for early
                access.
              </span>
            </div>
            <div className="form-group">
              <label className="label-field signup--form-label" for="name">
                Name
              </label>
              <br />
              <input
                name="name"
                type="text"
                placeholder="First name, Last name"
                className="input-field max-input-width signup--form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="label-field signup--form-label" for="email">
                Email
              </label>
              <br />
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                className="input-field max-input-width signup--form-input"
                required
              />
            </div>
            <div className="form-group">
              <label className="label-field signup--form-label" for="linkedIn">
                Linkedin URL
              </label>
              <br />
              <input
                name="linkedIn"
                type="linkedIn"
                placeholder="https://linkedin.com/in/linkedIn"
                className="input-field max-input-width signup--form-input"
                required
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn__homepage btn__homepage-blue signup--form-apply"
              >
                Apply
              </button>
            </div>
            <div className="form-group">
              <span className="signup-attn signup--form-link">
                Already on CMOlist? <a href="/login">Sign in</a>
              </span>
            </div>
          </form>
        </div>
        <div className="col-md-3"></div>
      </div>
      <Footer className="signup--footer" />
    </div>
  );
}

export default Signup;
