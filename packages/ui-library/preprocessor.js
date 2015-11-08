/*
 * This file defines a list of file extensions not to be mocked by Jest.
 * These are the non-JS files (e.g. CSS, PNG, etc) which can be required in JS.
 */

var babelJest = require("babel-jest");

module.exports = {
    process: function (src, filename) {
        return babelJest.process(src, filename)
                .replace(/require\(\"[^\"]+\.less\"\);/gm, "")
                .replace(/require\(\"[^\"]+\.css\"\);/gm, "")
                .replace(/require\(\"[^\"]+\.png\"\);?/gm, "\"\"")
            ;
    }
};
