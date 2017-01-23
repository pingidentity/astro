var sass = require("node-sass");
var fs = require("fs");

var inputFile = "./src/css/ui-library.scss";
var outputFile = "./build-css/css/ui-library.css";
var outputMapFile = "./build-css/css/ui-library.css.map";

sass.render(
    {
        file: inputFile,
        outFile: outputFile,
        outputStyle: "compressed",
        sourceMap: true
    },
    function (error, result) {
        if (error) {
            console.log("Error compiling SCSS file '" + inputFile +
                        "' at line " + error.line + " and column " + error.column +
                        "; status code: " + error.status +
                        "; message: " + error.message);
            process.exit(1);
        }
        else {
            console.log("Compiled '" + inputFile + "' in " + result.stats.duration + "ms");
            // No errors during the compilation, write this result on the disk

            try {
                fs.writeFileSync(outputFile, result.css);
                console.log("Wrote CSS output to:", outputFile);
            }
            catch (e) {
                console.log("Error writing CSS file '" + outputFile + "'; error: " + e.message);
                process.exit(2);
            }

            try {
                fs.writeFileSync(outputMapFile, result.map);
                console.log("Wrote CSS map output to:", outputMapFile);
            }
            catch (e) {
                console.log("Error writing CSS map file '" + outputMapFile + "'; error: " + e.message);
                process.exit(3);
            }
        }
    }
);

