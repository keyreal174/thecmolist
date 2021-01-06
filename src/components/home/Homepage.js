import React from "react";
import "./Homepage.css";

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
      alert("An error occurred please try again!");
    });
}

function Homepage() {
  return (
    <div className="container wrapper__homepage">
      <header>
        <nav className="nav__homepage">
          <a className="nav__logo" href="/">
            CMO<span>list</span>
          </a>
          <div className="btn__homepage-group">
            <a href="/login" className="btn__homepage btn__homepage-white">
              Sign In
            </a>
          </div>
        </nav>

        <div className="banner__homepage">
          <div className="row align-items-center">
            <div className="col-sm-8">
              <h1 className="banner__header">
                The private network for the world's leading marketers
              </h1>
              <form
                name="submit-to-google-sheet"
                style={{ "margin-top": "40px" }}
                onSubmit={handleSubmit}
              >
                <div
                  className="form-group"
                  style={{ marginLeft: "0px", marginRight: "0px" }}
                >
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter email for early access"
                    className="input-field max-input-width"
                    style={{ width: "625px", marginRight: "0px" }}
                    required
                  />
                  <button
                    type="submit"
                    className="btn__homepage btn__homepage-blue"
                    style={{
                      float: "right",
                      width: "40px",
                      height: "40px",
                      fontSize: "18px",
                      paddingTop: "4px",
                    }}
                  >
                    >
                  </button>
                </div>
              </form>
            </div>
            <div className="col-sm-4">
              <div className="banner__img">
                <img
                  className="img__homepage"
                  src="/images/banner.png"
                  alt=""
                ></img>
              </div>
            </div>
          </div>
        </div>
      </header>

      <footer
        className="footer__homepage"
        style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.2)" }}
      >
        <div className="footer__wrapper">
          <div className="row">
            <div className="col-md-2 order-md-first">
              <div className="footer__left">
                <a className="nav__logo" href="/">
                  CMO<span>list</span>
                </a>
                <span className="footer__copyright">&copy; 2020</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Homepage;
