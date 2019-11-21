/**
 * @desc Append the current version of the UI library to a version.json file
 * located within the current directory.
 */
const fs = require("fs");
const path = require("path");

const packageString = fs.readFileSync(path.resolve(process.cwd(), "package.json"), "UTF-8");
const packageJson = JSON.parse(packageString);
const version = packageJson.version;

const versionString = fs.readFileSync(path.resolve(process.cwd(), "versions.json"), "UTF-8");
const versionJson = JSON.parse(versionString);
if (versionJson.indexOf(version) === -1) {
    versionJson.push(version);
    const newVersionsString = JSON.stringify(versionJson);
    fs.writeFileSync(path.resolve(process.cwd(), "versions.json"), newVersionsString, "UTF-8");
}
