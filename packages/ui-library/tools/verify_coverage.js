/*
 * To run this file directly and not through make,
 * you need the "coverage" and "coverage-reference" directories.
 * "coverage" is generated by "npm run coverage", "coverage-reference"
 * can be created as a copy of "coverage" for start.
 */

var parse = require("lcov-parse");
var _ = require("underscore");
var chalk = require("chalk");
var table = require("tty-table");
var excludes = require("./exclude");

var COVERAGE_PROPERTIES = {
    LINES: "lines",
    FUNCTIONS: "functions",
    BRANCHES: "branches"
};

var DEFAULT_COVERAGE = {
    lines: 0.92,
    functions: 0.92,
    branches: 0.80
};

var errorOut = function (errorCode) {
    process.exit(errorCode);
};

/*
 * File coverage example:
 * {
 *     "lines":{
 *         "found":9,
 *         "hit":9,
 *         "details":[
 *             {"line":1,"hit":1},
 *             {"line":2,"hit":1},
 *             {"line":14,"hit":1},
 *             {"line":22,"hit":1},
 *             {"line":28,"hit":2},
 *             {"line":29,"hit":1},
 *             {"line":30,"hit":1},
 *             {"line":32,"hit":1},
 *             {"line":37,"hit":1}
 *         ]
 *     },
 *     "functions":{
 *         "hit":2,
 *         "found":2,
 *         "details":[
 *             {"name":"(anonymous_1)","line":21,"hit":1},
 *             {"name":"(anonymous_2)","line":27,"hit":2}
 *         ]
 *     },
 *     "branches":{
 *         "hit":2,
 *         "found":2,
 *         "details":[
 *             {"line":28,"block":1,"branch":0,"taken":1},
 *             {"line":28,"block":1,"branch":1,"taken":1}
 *         ]
 *     },
 *     "title":"",
 *     "file":"/Users/alex/pub/devel/pc4saas/ui-library/src/components/general/EllipsisLoader.jsx"
 * }
 */

/**
 * @typedef FeatureCoverage
 * @type {object}
 * @property {number} found - the number of properties found in the file
 * @property {number} hit - the number of properties hit by tests
 * @property {object} details - the feature coverage details (not used in verifications)
 */

/**
 * @typedef FileCoverage
 * @type {object}
 * @property {FeatureCoverage} LineCoverage the line coverage
 * @property {FeatureCoverage} FunctionCoverage the function coverage
 * @property {FeatureCoverage} BranchCoverage the branch coverage
 */

/**
 * @desc Convert the given absolute path of a file inside the ui-library
 * to a path relative to ui-library/src.
 * @param {string} absoluteFilePath - the absolute path of the file inside ui-library/src/
 * @return {string} - the file path relative to ui-library/src
 */
var relativiseFilePath = function (absoluteFilePath) {
    var root = "/src/";
    var index = absoluteFilePath.lastIndexOf(root);
    var relativePath;
    if (index === -1) {
        console.error(chalk.red(
            "The given absolute path (%s) is not a ui-library/src path",
            absoluteFilePath
        ));
    }
    else {
        relativePath = absoluteFilePath.slice(index);
    }
    return relativePath;
};

/**
 * @desc Get the current and reference coverage for the given feature (eg. one of the COVERAGE_PROPERTIES values).
 * @param {string} name - the feature name
 * @param {FeatureCoverage} coverage - the current coverage for the given feature
 * @param {FeatureCoverage} refCoverage - the reference coverage for the given feature
 * @return {object} - the current and reference coverages (as attributes on the returned object)
 */
var getFeatureCoverage = function (name, coverage, refCoverage) {
    // when no properties of this type are found, the coverage is considered 100%
    var current = coverage[name].found === 0 ? 1.0 : coverage[name].hit / coverage[name].found;

    //Okhtay: It's too restrictive to say that coverage will never drop.  Instead, we should always meet at least the reference
    //level of coverage or better than before.
    var reference = refCoverage && refCoverage[name].found
        ? refCoverage[name].hit / refCoverage[name].found
        : 1;

    return {
        current: current,
        reference: Math.min(reference, DEFAULT_COVERAGE[name])
    };
};

/**
 * @desc Verify that the current file coverage is at least equal to the reference coverage.
 * If the reference coverage is not provided, the default coverage is used as reference.
 * @param {string} relativePath - the relative path to the project root of the current file
 * @param {FileCoverage} coverage - the current file coverage
 * @param {FileCoverage} [refCoverage] - the reference file coverage
 * @return {object} - the verification result; one of the properties is "result", which is true if the coverage verification passes, false otherwise
 */
var verifyFileCoverage = function (relativePath, coverage, refCoverage) {
    var lineCoverage = getFeatureCoverage(COVERAGE_PROPERTIES.LINES, coverage, refCoverage);
    var functionCoverage = getFeatureCoverage(COVERAGE_PROPERTIES.FUNCTIONS, coverage, refCoverage);
    var branchCoverage = getFeatureCoverage(COVERAGE_PROPERTIES.BRANCHES, coverage, refCoverage);

    var lineCoverageResult = lineCoverage.current.toFixed(2) >= lineCoverage.reference.toFixed(2);
    var functionCoverageResult = functionCoverage.current.toFixed(2) >= functionCoverage.reference.toFixed(2);
    var branchCoverageResult = branchCoverage.current.toFixed(2) >= branchCoverage.reference.toFixed(2);

    var result = lineCoverageResult && functionCoverageResult && branchCoverageResult;

    //if the file is excluded from coverage, still measure it but set the result to pass
    if (excludes.indexOf(relativePath) !== -1) {
        result = true;
    }

    return {
        result: result,
        lineCoverageResult: lineCoverageResult,
        lineCoverageCrt: lineCoverage.current,
        lineCoverageRef: lineCoverage.reference,
        functionCoverageResult: functionCoverageResult,
        functionCoverageCrt: functionCoverage.current,
        functionCoverageRef: functionCoverage.reference,
        branchCoverageResult: branchCoverageResult,
        branchCoverageCrt: branchCoverage.current,
        branchCoverageRef: branchCoverage.reference
    };
};

/**
 * @desc Log the coverage verification results to the console
 * @param {object} comparisonResults - the verification results
 */
var logCoverageVerificationResult = function (comparisonResults) {
    var header = [
        {
            value: "filename",
            alias: "File",
            width: 70,
            align: "left"
        },
        {
            value: "result",
            alias: "Result",
            formatter: function (value) {
                return (value === "PASS" ? chalk.green : chalk.bold.red)(value);
            }
        },
        {
            value: "lineCoverage",
            alias: "Line coverage (current / reference)"
        },
        {
            value: "functionCoverage",
            alias: "Function coverage (current / reference)"
        },
        {
            value: "branchCoverage",
            alias: "Branch coverage (current / reference)"
        },
    ];

    var rows = _.map(comparisonResults, function (result) {
        var lineCoverage = (result.lineCoverageResult ? "!!! " : "    ") +
                result.result.lineCoverageCrt.toFixed(2) +
                " / " +
                result.result.lineCoverageRef.toFixed(2);
        var functionCoverage = (result.functionCoverageResult ? "!!! " : "    ") +
                result.result.functionCoverageCrt.toFixed(2) +
                " / " +
                result.result.functionCoverageRef.toFixed(2);
        var branchCoverage = (result.branchCoverageResult ? "!!! " : "    ") +
                result.result.branchCoverageCrt.toFixed(2) +
                " / " +
                result.result.branchCoverageRef.toFixed(2);

        return {
            filename: result.filename,
            result: result.result.result ? "PASS" : "FAIL",
            lineCoverage: lineCoverage,
            functionCoverage: functionCoverage,
            branchCoverage: branchCoverage
        };
    });

    var comparisonTable = table(header, rows, {
        borderStyle: 1,
        paddingBottom: 0,
        headerAlign: "center",
        align: "center"
    });
    var comparisonString = comparisonTable.render();
    console.log(comparisonString);
};

// read the current coverage and convert it to a JSON object
parse("./coverage/lcov.info", function (err, coverage) {
    if (err) {
        console.log(chalk.red("Error while parsing the current coverage report: %s"), err);
        errorOut(1);
    }

    // read the reference coverage and convert it to a JSON object
    parse("./coverage-reference/lcov.info", function (refErr, refCoverage) {
        if (refErr) {
            console.log(chalk.red("Error while parsing the reference coverage report: %s"), refErr);
            errorOut(2);
        }

        console.log("Verifying the current code coverage against the reference (or default when not available)");

        // iterate over the files in the current coverage report;
        // find the reference coverage for the current file,
        // and verify the file coverage against the reference
        var comparisonResults = _.map(coverage, function (file) {
            var relativePath = relativiseFilePath(file.file);
            var matchRefFile = _.find(refCoverage, function (refFile) {
                var refRelativePath = relativiseFilePath(refFile.file);
                return relativePath === refRelativePath;
            });
            return {
                filename: relativePath,
                result: verifyFileCoverage(relativePath, file, matchRefFile)
            };
        });

        logCoverageVerificationResult(comparisonResults);

        // the array of file names which failed the comparison
        var failedFilenames = _.map(
            _.filter(comparisonResults, function (comparisonResult) {
                return !comparisonResult.result.result;
            }),
            function (comparisonResult) {
                return comparisonResult.filename;
            }
        );

        //using setTimeout because sometimes this error gets thrown before logCoverageVerificationResult
        //has time to console.log the full table
        setTimeout(function() {
            if (failedFilenames.length === 0) {
                console.log(chalk.green("Coverage verification: PASS"));
            }
            else {
                console.log(chalk.red(
                    "Coverage verification: FAIL\nFiles in the wrong:",
                    _.reduce(failedFilenames, function (str, filename) {
                        return str + "\n    " + filename;
                    }, "")
                ));
                errorOut(3);
            }
        }, 5000);

    });
});
