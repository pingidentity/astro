import React from "react";
import ReactDOM from "react-dom";
import Catalog from "./Catalog";
import SignOnPage from "../components/SignOnPage";
import completeBranding from "../util/completeBranding";

import "../css/styles.scss";
import "./css/demo.scss";
import pinglogo from "./assets/ping-logo.svg";
import jjlogo from "./assets/jj-logo.png";
import backgroundImage from "./assets/background.jpg";

const pingBranding = {
    logo: pinglogo
};

const jjBranding = completeBranding({
    logo: jjlogo,
    backgroundColor: '#0000ff',
    primaryColor: '#ff0000'
});

const App = () => (
    <div className="page-content"><Catalog/></div>
);

export default {
    main: <App/>,
    signon: <SignOnPage branding={pingBranding}/>,
    branded: <SignOnPage branding={jjBranding}/>
}
