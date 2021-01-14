import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import Homepage from "./components/home/Homepage";
import Signup from "./components/home/Signup";
import Signedup from "./components/home/Signedup";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Feed from "./components/app/Feed/Feed";
import Profile from "./components/app/Profile/Profile";
import Settings from "./components/app/Settings/Settings";
import AgencyProfile from "./components/app/Profile/AgencyProfile";
import TechnologyProfile from "./components/app/Profile/TechnologyProfile";
import Directory from "./components/app/Directory/Directory";
import Category from "./components/app/Directory/Category";
import Network from "./components/app/Network/Network";
import Util from "./components/util/Util";
import ReactGA from "react-ga";
import Cookies from "js-cookie";
import SetupMocks from "./mocks/mocks";

if (Util.inLocalDevelopment() || Util.inTestContainer()) {
  SetupMocks();
}

function BrowserHistoryHook(Component) {
  if (Util.inTestContainer()) {
    return function WrappedComponent(props) {
      return <Component {...props} />;
    };
  } else {
    return function WrappedComponent(props) {
      let location = useLocation();
      useEffect(() => {
        if (!Util.inLocalDevelopment()) {
          ReactGA.set({
            page: location.pathname,
            userId: Cookies.get("ipipeauth"),
          });
          ReactGA.pageview(location.pathname);
        }
      }, [location]);
      return <Component {...props} />;
    };
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    let authTokenExists =
      document.cookie && document.cookie.includes("ipipeauth");
    this.state = {
      authed:
        Util.inLocalDevelopment() || Util.inTestContainer() || authTokenExists,
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={(props) =>
              !this.state.authed ? (
                <Redirect to="/home" />
              ) : (
                <Redirect to="/feed" />
              )
            }
          />
          <Route exact path="/home">
            <Homepage />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signedup">
            <Signedup />
          </Route>
          <Route
            exact
            path="/feed"
            render={(props) =>
              this.state.authed ? <Feed /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/profile"
            render={(props) =>
              this.state.authed ? <Profile /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/settings"
            render={(props) =>
              this.state.authed ? <Settings /> : <Redirect to="/login" />
            }
          />
          <Route
            path="/agency/:agencyName"
            render={(props) =>
              this.state.authed ? (
                <AgencyProfile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            path="/technology/:technologyName"
            render={(props) =>
              this.state.authed ? (
                <TechnologyProfile {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/directory"
            render={(props) =>
              this.state.authed ? <Directory /> : <Redirect to="/login" />
            }
          />
          <Route
            exact
            path="/directory/:category"
            render={(props) =>
              this.state.authed ? (
                <Category {...props} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
          <Route
            exact
            path="/network"
            render={(props) =>
              this.state.authed ? <Network /> : <Redirect to="/login" />
            }
          />
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default BrowserHistoryHook(App);
