import React from "react";
import ReactDOM from "react-dom";
import SignOnPage from "./components/SignOnPage";
import completeBranding from "./util/completeBranding";

import "./css/styles.scss";

import jjlogo from "./demo/assets/jj-logo.png";
import backgroundImage from "./demo/assets/background.jpg";

const branding = completeBranding({
    logo: jjlogo,
    backgroundColor: '#0000ff',
    primaryColor: '#ff0000'
});

ReactDOM.render(<SignOnPage branding={branding}/>, document.getElementById("app"));
