import React from "react";
import ReactDOM from "react-dom";
import Catalog from "./demo/Catalog";

import "./css/styles.scss";
import "./demo/css/demo.scss";

const App = () => (
    <div className="page-content"><Catalog/></div>
);

ReactDOM.render(<App/>, document.getElementById("app"));
