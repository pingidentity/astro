import { fetchVersions } from "../fetchVersions.js";

const libPath = window.location.origin;

const redirect = fetchVersions( (versions) => {
    const path = window.location.pathname.replace(/\//g, "");
    let redirectPath = libPath;
    switch (path) {
        case "latest":
        case "stable":
            redirectPath += `/${versions[1].value}/`;
            break;
        case "snapshot":
            redirectPath += `/${versions[0].value}/`;
            break;
        default:
            break;
    }
    window.location.href = redirectPath;
}, () => {
    window.location.href = libPath;
})("../");

redirect();
