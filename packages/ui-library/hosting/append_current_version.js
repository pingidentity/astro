/**
 * @desc Append the current version of the UI library to a version.json file
 * located within the current directory.
 */
var fs = require("fs");
var path = require("path");

var packageString = fs.readFileSync(path.resolve(__dirname, "../package.json"), "UTF-8");
var packageJson = JSON.parse(packageString);
var version = packageJson.version;

var versionString = fs.readFileSync(path.resolve(__dirname, "../versions.json"), "UTF-8");
var versionJson = JSON.parse(versionString);
if (versionJson.indexOf(version) === -1) {
    versionJson.push(version);
    var newVersionsString = JSON.stringify(versionJson);
    fs.writeFileSync(path.resolve(__dirname, "../versions.json"), newVersionsString, "UTF-8");
}
