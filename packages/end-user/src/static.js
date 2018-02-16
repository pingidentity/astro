import React from "react";
import ReactDOM from "react-dom";
import SignOnPage from "./components/SignOnPage";
import Catalog from "./demo/Catalog";
import pinglogo from "./demo/assets/ping-logo.svg";
import htmlFromReact from "./demo/utils/htmlFromReact";

import "./css/styles.scss";
import "./demo/css/demo.scss";

import template from "./template.html";
import _ from "lodash";

module.exports = data => ({
    "index.html" : _.template(template)({
        htmlWebpackPlugin: {
            options: {
                title: "Ping End User Components"
            }
        },
        content: htmlFromReact(<div className="page-content"><Catalog/></div>, "        "),
        stylesheets: ["demo.css", "end-user.css"]
    }),
    "signon.html" : _.template(template)({
        htmlWebpackPlugin: {
            options: {
                title: "Sign On"
            }
        },
        content: htmlFromReact(<SignOnPage branding={{logo: pinglogo}}/>, "        "),
        stylesheets: ["end-user.css"]
    })
})
