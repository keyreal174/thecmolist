import React, { useEffect } from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import AgencyProfile from "./components/app/Profile/AgencyProfile";
import Category from "./components/app/Directory/Category";
import Content from "./components/app/Content/Content";
import Directory from "./components/app/Directory/Directory";
import Feed from "./components/app/Feed/Feed";
import Homepage from "./components/home/Homepage";
import NewHomepage from "./components/home/NewHomepage";
import Login from "./components/login/Login";
import Logout from "./components/login/Logout";
import Network from "./components/app/Network/Network";
import Notifications from "./components/app/Notifications/Notifications";
import Guides from "./components/app/Guides/Guides";
import OnboardingStep1 from "./components/app/Onboarding/OnboardingStep1.js";
import OnboardingStep2 from "./components/app/Onboarding/OnboardingStep2.js";
import Profile from "./components/app/Profile/Profile";
import ProfileEdit from "./components/app/ProfileEdit/ProfileEdit";
import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import Settings from "./components/app/Settings/Settings";
import Signedup from "./components/home/Signedup";
import Signup from "./components/home/Signup";
import TechnologyProfile from "./components/app/Profile/TechnologyProfile";
import Topics from "./components/app/Topics/Topics";
import Search from "./components/app/Search/Search";
import Util from "./components/util/Util";
import VendorProfile from "./components/app/Profile/VendorProfile";
import VendorProfileEdit from "./components/app/ProfileEdit/VendorProfileEdit";
import Vendors from "./components/app/Vendors/Vendors";
import VendorsFlatList from "./components/app/Vendors/VendorsFlatList";
import AdminPage from "./components/admin/AdminPage";
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

    let hjid, hjsv;
    if (window.location.hostname === "cmo-list-staging.herokuapp.com") {
      hjid = 2527605;
      hjsv = 6;
    } else if (
      window.location.hostname === "thecmolist.com" ||
      window.location.hostname.endsWith("thecmolist.com")
    ) {
      hjid = 2527592;
      hjsv = 6;
    }
    if (hjid) {
      hotjar.initialize(hjid, hjsv);
      if (authTokenExists) {
        hotjar.identify("USER_ID", { userProperty: Cookies.get("ipipeauth") });
      }
    }
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
            <NewHomepage />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/signedup">
            <Signedup />
          </Route>
          <Route
            exact
            path="/search"
            render={(props) =>
              this.state.authed ? (
                <Search />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/feed"
            render={(props) =>
              this.state.authed ? (
                <Feed isTopic={false} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/group"
            render={(props) =>
              this.state.authed ? (
                <Feed isTopic={false} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/profile"
            render={(props) =>
              this.state.authed ? (
                <Profile key={new Date()} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/profile_edit"
            render={(props) =>
              this.state.authed ? (
                <ProfileEdit />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/settings"
            render={(props) =>
              this.state.authed ? (
                <Settings />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/topics"
            render={(props) =>
              this.state.authed ? (
                <Topics />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/topic"
            render={(props) =>
              this.state.authed ? (
                <Feed isTopic={true} key={new Date()} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/content/:id"
            render={(props) =>
              this.state.authed ? (
                <Content {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/agency/:agencyName"
            render={(props) =>
              this.state.authed ? (
                <AgencyProfile {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/technology/:technologyName"
            render={(props) =>
              this.state.authed ? (
                <TechnologyProfile {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/directory"
            render={(props) =>
              this.state.authed ? (
                <Directory />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/directory/:category"
            render={(props) =>
              this.state.authed ? (
                <Category {...props} />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/network"
            render={(props) =>
              this.state.authed ? (
                <Network />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/notifications"
            render={(props) =>
              this.state.authed ? (
                <Notifications />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/guides"
            render={(props) =>
              this.state.authed ? (
                <Guides />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendor"
            render={(props) =>
              this.state.authed ? (
                <VendorProfile />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendor_edit"
            render={(props) =>
              this.state.authed ? (
                <VendorProfileEdit />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendors/:id"
            render={(props) =>
              this.state.authed ? (
                <Vendors />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendors_martech"
            render={(props) =>
              this.state.authed ? (
                <Vendors type="martech" />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendors_agencies"
            render={(props) =>
              this.state.authed ? (
                <Vendors type="agencies" />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            path="/vendors_contractors"
            render={(props) =>
              this.state.authed ? (
                <Vendors type="contractors" />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />

          <Route
            path="/vendors_list"
            render={(props) =>
              this.state.authed ? (
                <VendorsFlatList />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />

          <Route
            exact
            path="/onboarding_step1"
            render={(props) =>
              this.state.authed ? (
                <OnboardingStep1 />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />
          <Route
            exact
            path="/onboarding_step2"
            render={(props) =>
              this.state.authed ? (
                <OnboardingStep2 />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
            }
          />

          <Route
            exact
            path="/admin"
            render={(props) =>
              this.state.authed ? (
                <AdminPage />
              ) : (
                <Redirect
                  to={{ pathname: "/login", state: { from: props.location } }}
                />
              )
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
