// This file is included in every other javascript files when the library is packaged
import React from "react";
import { isProduction } from "./Utils";

export const checkReactVersion = reactModule => {
    if (!isProduction() && console && console.warn && reactModule && reactModule.version) {
        const major = parseInt(reactModule.version.split(".")[0]);
        const minor = parseInt(reactModule.version.split(".")[1]);
        if ((major === 16 && minor < 8) || major < 16) {
            console.warn(
                `Warning: You are using React version ${reactModule.version}. ` +
                `As of March 2020, new releases of the UI Library will require at least React 16.8. ` +
                `If you have questions or concerns, contact us on the #ui-coalition Slack channel.`
            );
        }
    }
};

checkReactVersion(React);