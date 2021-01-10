import React from "react";
import axios from "axios";
import Spinner from "react-spinner-material";
import querySearch from "stringquery";
import Util from "../util/Util";

const loginRequest = (user, password) => {
  var postBody = {
    user: user,
    pass: password,
  };
  return axios.post("/api/login", postBody);
};

const linkedinAuthUrl = () => {
  return axios.get("/api/lnkd_auth_url");
};

class Login extends React.Component {
  constructor(props) {
    super(props);

    let query = querySearch(window.location.search);
    let redirectUrl = query.redirect ? decodeURIComponent(query.redirect) : "/";

    this.state = {
      busy: false,
      redirectUrl: redirectUrl,
      linkedInUrl: "",
    };

    document.title = "Login";
  }

  componentDidMount() {
    linkedinAuthUrl().then(({ data }) => {
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
    let isMobile = Util.isMobile();
    if (isMobile) {
      return (
        <div className="container">
          <div className="mt100">
            <form name="Login_Form" className="form-signin form-group">
              <p className="form-signin-heading">
                CMOlist is currently only available through desktop browsers
              </p>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="mt100">
          <form
            name="Login_Form"
            className="form-signin form-group"
            onSubmit={this.handleSubmit.bind(this)}
          >
            <h2 className="form-signin-heading">CMOlist Login</h2>
            <hr className="colorgraph" />
            <br />
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
              className="btn btn-block btn-linkedin button-login"
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
              class="btn btn-block btn-social btn-linkedin button-login"
              href={this.state.linkedInUrl}
              style={{ color: "white" }}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginTop: "-2px", marginLeft: "1px" }}
                  viewBox="0 0 21 21"
                  data-supported-dps="21x21"
                  width="21"
                  height="21"
                  focusable="false"
                >
                  <g transform="scale(.4375)" fill="none" fill-rule="evenodd">
                    <rect
                      class="bug-text-color"
                      fill="#FFF"
                      x="1"
                      y="1"
                      width="46"
                      height="46"
                      rx="4"
                    ></rect>
                    <path
                      d="M0 4.01A4.01 4.01 0 014.01 0h39.98A4.01 4.01 0 0148 4.01v39.98A4.01 4.01 0 0143.99 48H4.01A4.01 4.01 0 010 43.99V4.01zM19 18.3h6.5v3.266C26.437 19.688 28.838 18 32.445 18 39.359 18 41 21.738 41 28.597V41.3h-7V30.159c0-3.906-.937-6.109-3.32-6.109-3.305 0-4.68 2.375-4.68 6.109V41.3h-7v-23zM7 41h7V18H7v23zm8-30.5a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z"
                      class="background"
                      fill="#0077B5"
                    ></path>
                  </g>
                </svg>
              </span>{" "}
              Sign in with Linkedin
            </a>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
