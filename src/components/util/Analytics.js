import ReactGA from "react-ga";
import Util from "./Util";
import Cookies from "js-cookie";

export default class Analytics {
  static sendClickEvent(action) {
    if (!Util.inLocalDevelopment()) {
      ReactGA.event({
        category: "User",
        action: action,
        label: Cookies.get("ipipeauth"),
      });
    }
  }
}
