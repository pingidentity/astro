/*
 * Remove the Jest preprocess cache directory.
 */
var path = require("path");
var os = require("os");
var rimraf = require("rimraf");

var jestPreprocessCacheDir = path.join(os.tmpdir(), "jest_preprocess_cache");
rimraf(jestPreprocessCacheDir, function (err) {
    if (err) {
        console.log("Error while deleting the Jest preprocess cache dir:", err);
    }
});
