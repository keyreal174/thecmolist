import React from "react";
import axios from "axios";
import Util from "../util/Util";

export const logoutRequest = (dispatch) => {
  return axios.get("/api/logout");
};

class Logout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    document.title = "Logging out...";

    logoutRequest()
      .then(({ data }) => {
        if (Util.inLocalDevelopment()) {
          document.cookie = "";
        }
        console.log("Log out success");
      })
      .catch(function (error) {
        console.log("Log out error: " + error);
      })
      .finally(() => {
        window.location.href = "/";
      });
  }

  render() {
    return (
      <div className="content-page">
        <div className="content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9 center-page mw750">
                <div className="row m-t-20">
                  <div className="card-box inner-box">
                    <div className="row page-header text-center">
                      <span className="page-title">Logging out...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Logout;
