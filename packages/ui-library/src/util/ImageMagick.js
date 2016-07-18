var cp = require("child_process");
var Q = require("q");
var ImageMagick = {
    /**
     * @typedef CompareOutput
     * @type Object
     * @property {bool} error true if there is an error
     * @property {string} stderr error details
     */

    /**
     * @desc this function is to run comparison command line of Image Magick
     * @param {string} origin the origin image path.
     * @param {string} compareTo the compareTo image path.
     * @param {string} diff the diff image path.
     * @param {number} equalRatio By default it will be set to 0.
     * - This is an optional parameter to increase or decrease the accuracy
     * - Higher value is more accuracy
     * @returns {CompareOutput} a promise object
     */
    compare: function (origin, compareTo, diff, equalRatio) {
        var deferred = Q.defer();
        var command = "compare";
        var args = ["-metric", "ae", "-fuzz", equalRatio+"%", origin, compareTo, diff];
        var fullCommand = command;

        fullCommand += args.length ? " " + args.join(" ") : "";
        cp.exec(fullCommand, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
            deferred.resolve(output);
        });

        return deferred.promise;
    },
    /**
     * @typedef CropOutput
     * @type Object
     * @property {bool} error true if there is an error
     * @property {string} stderr error details
     */

    /**
     * @desc this function is to run crop command line of Image Magick
     * @param {string} origin the origin image path.
     * @param {string} destination the destination image path.
     * @param {string} width width in pixel.
     * @param {string} height height in pixel.
     * @param {string} x position.
     * @param {string} y position.
     * @returns {CropOutput} a promise object
     */
    crop: function (origin, destination, width, height, x, y) {
        var deferred = Q.defer();
        var command = "convert";
        var size = width+"x"+height+"+"+x+"+"+y+"!";
        var args = [origin, "-crop", size, destination];
        var fullCommand = command;
        fullCommand += args.length ? " " + args.join(" ") : "";
        cp.exec(fullCommand, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
            deferred.resolve(output);
        });

        return deferred.promise;
    },

    /**
     * @typedef ResizeOutput
     * @type Object
     * @property {bool} error true if there is an error
     * @property {string} stderr error details
     */

    /**
     * @desc this function is to run resize command line of Image Magick
     * @param {string} origin the origin image path.
     * @param {string} destination the destination image path.
     * @param {string} width width in pixel.
     * @param {string} height height in pixel.
     * @returns {CropOutput} a promise object
     */
    resize: function (origin, destination, width, height) {
        var deferred = Q.defer();
        var command = "convert";
        var size = width+"x"+height+"!";
        var args = [origin, "-resize", size, destination];
        var fullCommand = command;
        fullCommand += args.length ? " " + args.join(" ") : "";
        cp.exec(fullCommand, function (error, stdout, stderr) {
            var output = {
                error: error,
                stderr: stderr
            };
            deferred.resolve(output);
        });

        return deferred.promise;
    }

};
module.exports = ImageMagick;
