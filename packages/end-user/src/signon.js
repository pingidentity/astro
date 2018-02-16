import React from "react";
import ReactDOM from "react-dom";
import SignOnPage from "./components/SignOnPage";

import "./css/styles.scss";

import pinglogo from "./demo/assets/ping-logo.svg";
import backgroundImage from "./demo/assets/background.jpg";

const branding = {
    logo: pinglogo,
    backgroundImage
}

ReactDOM.render(<SignOnPage branding={branding}/>, document.getElementById("app"));
