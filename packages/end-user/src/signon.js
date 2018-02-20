import React from "react";
import ReactDOM from "react-dom";
import SignOnPage from "./components/SignOnPage";

import "./css/styles.scss";

import pinglogo from "./demo/assets/ping-logo.svg";

const branding = {
    logo: pinglogo
};

ReactDOM.render(<SignOnPage branding={branding}/>, document.getElementById("app"));
