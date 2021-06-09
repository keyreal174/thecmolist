import clsx from "clsx";
import React, { useState } from "react";
import CustomRadioButton from "../app/base/CustomRadioButton/CustomRadioButton";
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

const FormGroup = ({ name, type, placeholder }) => {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="form-group position-relative">
      <input
        name={name}
        type={type}
        placeholder={!isFocus ? placeholder : ""}
        className={clsx(
          "input-field max-input-width signup--form-input",
          (isFocus || value) && "none-border"
        )}
        required
        onFocus={() => setIsFocus((value) => !value)}
        onBlur={() => setIsFocus((value) => !value)}
        onChange={(e) => setValue(e.target.value)}
      />
      <fieldset
        className={clsx(
          "form-group-fieldset",
          isFocus && "is-focus",
          value && "has-text"
        )}
      >
        <legend>
          <span>{placeholder}</span>
        </legend>
      </fieldset>
    </div>
  );
};

function Signup() {
  return (
    <div className="signup--wrapper container wrapper">
      <div>
        <div className="signup--container">
          <a className="signup--logo nav__logo" href="/">
            <img src={Logo} alt="CMOList brand logo" width="170" />
          </a>
          <form
            className="signup--form"
            name="submit-to-google-sheet"
            style={{ background: "white", "margin-top": "10px" }}
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <h2 className="signup--header">Apply to join CMOlist as a </h2>
              <CustomRadioButton
                label="Marketing leader"
                name="role"
                value="marketing_leader"
                id="marketing_leader"
              />
              <CustomRadioButton
                label="Agency or marketing technology firm"
                name="role"
                value="agency_or_technology_firm"
                id="agency_or_technology_firm"
              />
            </div>
            <hr style={{ "margin-top": "30px" }} />
            <div className="form-group">
              <h2 className="signup--header signup--header-beta">
                Apply for Membership
              </h2>
              <span className="signup-attn">
                Please fill out the information below <br></br>
                to apply for a free membership
              </span>
            </div>
            <div className="form-inputs-group">
              <FormGroup name="name" type="text" placeholder="Name" />
              <FormGroup name="email" type="email" placeholder="Email" />
              <FormGroup
                name="linkedIn"
                type="linkedIn"
                placeholder="LinkedIn URL"
              />
              <div className="form-group">
                <button
                  type="submit"
                  className="btn__homepage btn__homepage-blue signup--form-apply"
                >
                  Apply
                </button>
              </div>
            </div>
            <hr style={{ "margin-top": "30px" }} />
            <div className="form-group">
              <span className="signup-attn signup--form-link">
                Already on CMOlist? <a href="/login">Sign in</a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer className="signup--footer" />
    </div>
  );
}

export default Signup;
