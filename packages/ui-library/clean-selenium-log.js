/*
 * Remove the selenium-standalone.log and http-server.log.
 */
var rimraf = require("rimraf");

rimraf("selenium-standalone.log", function (err) {
    if (err) {
        console.log("Error while deleting selenium-standalone.log:", err);
    } else {
        console.log("INFO: removed selenium-standalone.log successfully");
    }
});

rimraf("http-server.log", function (err) {
    if (err) {
        console.log("Error while deleting http-server.log:", err);
    } else {
        console.log("INFO: removed http-server.log successfully");
    }
});