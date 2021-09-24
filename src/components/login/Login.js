import React from "react";
import { withRouter } from "react-router";
import axios from "axios";
import Spinner from "react-spinner-material";
import querySearch from "stringquery";
import Slider from "./Slider";
import Util from "../util/Util";
import Footer from "../app/base/Footer/Footer";
import "./login.scss";
import { userPolicy, privacyPolicy } from "../util/constants";
import Logo from "./icons/logo.svg";
import LinkedInIcon from "./icons/linkedin.svg";
import Cross from "./icons/cross-group.svg";

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

    const isProd =
      window.location.hostname === "thecmolist.com" ||
      window.location.hostname.endsWith("thecmolist.com");
    let showUsernamePw = !isProd;
    let redirectUrl = "/";
    let query = querySearch(window.location.search);
    if (this.props.location) {
      let location = this.props.location;
      let locationFrom =
        location && location.state && location.state.from
          ? location.state.from.pathname
          : null;
      redirectUrl = locationFrom ? locationFrom : "/";
    } else {
      redirectUrl = query.redirect ? decodeURIComponent(query.redirect) : "/";
    }

    if (!showUsernamePw && query.showUsername) {
      showUsernamePw = true;
    }

    this.state = {
      busy: false,
      redirectUrl: redirectUrl,
      linkedInUrl: "",
      showUsernamePw: showUsernamePw,
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
      <div className="login">
        <div className="login--container w-100">
          <div className="login--left-wrapper">
            <form
              name="Login_Form"
              className="login--form form-signin form-group position-relative"
              onSubmit={this.handleSubmit.bind(this)}
            >
              <h2 className="login--title">Sign into CMOlist</h2>
              <a
                className="login--linkedIn btn btn-block btn-linkedin button-login"
                href={this.state.linkedInUrl}
                onClick={() => console.log("login with linkedin")}
              >
                <img alt="LinkedIn Icon" src={LinkedInIcon} />
                <span>Sign in with Linkedin</span>
              </a>

              <p className="login--email">
                If you have received an invitation, please log in using your
                LinkedIn credentials. We will neven share your information or
                post on your behalf.
                <br></br>
              </p>

              <p className="login--disclaimer">
                By signing in, you agree to our{" "}
                <a href={userPolicy}>User Agreement</a> and{" "}
                <a href={privacyPolicy}>Privacy Policy</a>.
              </p>
              {this.state.showUsernamePw && (
                <div>
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
                </div>
              )}
              <p className="login--question">
                Any questions or problems signing in? Please contact us at{" "}
                <strong className="login--contact-email">
                  <a href="mailto:hello@theCMOlist.com">hello@theCMOlist.com</a>
                </strong>
                .
              </p>
            </form>
            <div className="login--separator"></div>
            <p className="login--signup">
              New to CMOlist ?{" "}
              <strong>
                <a href="/signup" onClick={() => console.log("apply now")}>
                  Apply now
                </a>
              </strong>
            </p>
          </div>
          <div className="login--right-wrapper">
            <div className="login--right-wrapper-cross">
              <img src={Cross} alt="Cross" />
            </div>
            <a
              className="login--logo nav__logo"
              href={"/home" + (window.location.search || "")}
            >
              <img src={Logo} alt="CMOlist logo" width="163" height="33" />
            </a>
            <div className="login--slider">
              <Slider />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
