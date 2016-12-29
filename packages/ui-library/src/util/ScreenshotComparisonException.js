var ComparisonExitCode = {
    SUCCESS: 0,
    DIFFERENT_IMAGE_SIZE: -1,
    NO_BASELINE: -2,
    UNKNOWN_ERROR: -100
};

function ScreenshotComparisonException (fileName, comparisonResult) {
    this.name = "ScreenshotComparisonException";
    this.fileName = fileName;
    this.comparisonResult = comparisonResult;
    this.stack = (new Error()).stack;

    switch (comparisonResult) {
        case ComparisonExitCode.DIFFERENT_IMAGE_SIZE:
            this.message = "The current screenshot '" + fileName +
                    "' does not match the baseline; the two images have different sizes";
            break;
        case ComparisonExitCode.NO_BASELINE:
            this.message = "There is no baseline screenshot for '" + fileName + "'";
            break;
        case ComparisonExitCode.UNKNOWN_ERROR:
            this.message = "There was an unknown error while comparing the baseline and the current" +
                    " screenshots for '" + fileName + "'; see above for the comparison error message";
            break;
        case ComparisonExitCode.SUCCESS:
            // there should be no exception for SUCCESS, but just in case
            this.message = "The screenshots are identical. What am I doing here?";
            break;
        default:
            // anything > 0 will go here
            this.message = "The current screenshot '" + fileName + "' does not match the baseline;" +
                    " there are " + comparisonResult + " different pixels between the two screenshots";
    }
}

ScreenshotComparisonException.prototype = Object.create(Error.prototype);
ScreenshotComparisonException.prototype.constructor = ScreenshotComparisonException;

ScreenshotComparisonException.ComparisonExitCode = ComparisonExitCode;

module.exports = ScreenshotComparisonException;

