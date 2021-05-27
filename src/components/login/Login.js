import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Spinner from "react-spinner-material";
import querySearch from "stringquery";
import Util from "../util/Util";
import Logo from "../app/base/Header/svgs/logo.svg";
import Footer from "../app/base/Footer/Footer";
import "./login.scss";
import { userPolicy, privacyPolicy } from "../util/constants";
import LinkedInIcon from "./icons/linkedin.svg";

const loginRequest = (user, password) => {
  var postBody = {
    user: user,
    pass: password,
  };
  return axios.post("/api/login", postBody);
};

const linkedinAuthUrl = (from) => {
  let itkn = Util.getQueryVariable("itkn");
  return axios.get(
    "/api/lnkd_auth_url?redirect=" + from + (itkn ? `&itkn=${itkn}` : "")
  );
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    let redirectUrl = "/";
    if (this.props.location) {
      let location = this.props.location;
      let locationFrom =
        location && location.state && location.state.from
          ? location.state.from.pathname
          : null;
      redirectUrl = locationFrom ? locationFrom : "/";
    } else {
      let query = querySearch(window.location.search);
      redirectUrl = query.redirect ? decodeURIComponent(query.redirect) : "/";
    }

    this.state = {
      busy: false,
      redirectUrl: redirectUrl,
      linkedInUrl: "",
    };

    document.title = "Login";
  }

  componentDidMount() {
    linkedinAuthUrl(this.state.redirectUrl).then(({ data }) => {
      this.setState({
        linkedInUrl: data.url,
      });
    });
  }

  handleSubmit(e) {
    let self = this;
    let username = e.target.Username.value;
    let password = e.target.Password.value;
    if (username && username.length > 0 && password && password.length > 0) {
      self.setState({
        busy: true,
      });
    }
    e.preventDefault();
    loginRequest(username, password)
      .then(({ data }) => {
        if (data.success) {
          if (Util.inLocalDevelopment()) {
            document.cookie = "ipipeauth: foo";
          }
          window.location.href = this.state.redirectUrl;
        } else {
          let errorMessage = data.error || "Unknown";
          alert("An error occurred: " + errorMessage);
          self.setState({
            busy: false,
          });
        }
      })
      .catch(function (error) {
        alert("An error occurred: " + error);
        self.setState({
          busy: false,
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="mt100 row no-gutters">
          <div className="col-md-3" />
          <div className="col-md-6">
            <a className="login--logo nav__logo" href="/">
              <img src={Logo} alt="CMOList brand logo" width="170" />
            </a>
            <form
              name="Login_Form"
              className="login--form form-signin form-group position-relative"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h2 className="login--title">Sign into CMOlist</h2>
              <input
                type="email"
                className="form-control form-username input-field"
                name="Username"
                placeholder="Email"
                required=""
              />
              <input
                type="password"
                className="form-control form-password input-field"
                style={{ marginBottom: "15px" }}
                name="Password"
                placeholder="Password"
                required=""
              />
              <button
                className="btn btn-block btn-linkedin button-login login--login"
                name="Submit"
                value="Login"
                type="Submit"
                disabled={this.state.busy}
              >
                <span>Login</span>
                <div
                  style={{
                    "margin-top": "5px",
                    "margin-right": "4px",
                    float: "right",
                  }}
                >
                  <Spinner
                    radius={10}
                    color={"#eee"}
                    stroke={2}
                    visible={this.state.busy}
                  />
                </div>
              </button>
              <a
                className="login--linkedIn btn btn-block btn-social btn-linkedin button-login"
                href={this.state.linkedInUrl}
                onClick={() => console.log("login with linkedin")}
              >
                <img alt="LinkedIn Icon" src={LinkedInIcon} />
                Sign in with Linkedin
              </a>
              <p className="login--disclaimer">
                By signing in, you agree to our{" "}
                <a href={userPolicy}>User Agreement</a> and{" "}
                <a href={privacyPolicy}>Privacy Policy</a>.
              </p>
              <p className="login--question">
                Any questions or problems signing in? Please contact us at{" "}
                <strong className="login--contact-email">
                  <a href="mailto:hello@theCMOlist.com">hello@theCMOlist.com</a>
                </strong>
                .
              </p>
              <div className="login--separator"></div>
              <p className="login--signup">
                New to CMOlist ?{" "}
                <strong>
                  <a href="./signup" onClick={() => console.log("apply now")}>
                    Apply now
                  </a>
                </strong>
              </p>
            </form>
          </div>
          <div className="col-md-3"></div>
        </div>
        <Footer className="login--footer" />
      </div>
    );
  }
}

export default withRouter(Login);
