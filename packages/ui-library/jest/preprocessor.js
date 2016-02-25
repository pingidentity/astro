/*
 * This is as a copy of https://github.com/babel/babel-jest/blob/master/index.js,
 * but with custom inclusion of the ui-library source files.
 */

var babel = require("babel-core");

module.exports = {
    process: function (src, filename) {
        // Ignore all files within node_modules
        // babel files can be .js, .es, .jsx or .es6
        var isSource = filename.indexOf("node_modules") === -1;
        if (isSource && babel.util.canCompile(filename)) {
            return babel.transform(src, {
                filename: filename,
                retainLines: true
            })
            .code
            .replace(/require\(\"[^\"]+\.less\"\);/gm, "")
            .replace(/require\(\"[^\"]+\.css\"\);/gm, "")
            .replace(/require\(\"[^\"]+\.png\"\);?/gm, "\"\"");
        }

        return src;
    }
};
