/*eslint-disable valid-jsdoc*/

var cp = require("child_process");
var Q = require("q");

/**
 * @module util/ImageMagick
 * @desc A set of ImageMagick util functions.
 */
var ImageMagick = {
    /**
     * @typedef {object} module:util/ImageMagick.PromiseObject
     *
     * @property {bool} error
     *    True if there is an error.
     * @property {string} stderr
     *    Error details.
     */

    /**
     * @alias module:util/ImageMagick.compare
     *
     * @desc Run comparison command line of Image Magick.
     *
     * @param {string} origin
     *    The origin image path.
     * @param {string} compareTo
     *    The compareTo image path.
     * @param {string} diff
     *    The diff image path.
     * @param {number} equalRatio
     *    By default it will be set to 0.
     *     - This is an optional parameter to increase or decrease the accuracy
     *     - Higher value is more accuracy
     *
     * @returns {module:util/ImageMagick.PromiseObject}
     *    A promise object.
     */
    compare: function (origin, compareTo, diff, equalRatio) {
        var deferred = Q.defer();
        var command = "compare";
        // more info about arguments at: http://www.imagemagick.org/script/command-line-options.php#metric
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
     @alias module:util/ImageMagick.crop
     *
     * @desc Run crop command line of Image Magick.
     *
     * @param {string} origin
     *    The origin image path.
     * @param {string} destination
     *    The destination image path.
     * @param {string} width
     *    Width in pixel.
     * @param {string} height
     *    Height in pixel.
     * @param {string} x
     *    The x position.
     * @param {string} y
     *    The y position.
     *
     * @returns {module:util/ImageMagick.PromiseObject}
     *    A promise object.
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
     * @alias module:util/ImageMagick.resize
     *
     * @desc Run resize command line of Image Magick.
     *
     * @param {string} origin
     *    The origin image path.
     * @param {string} destination
     *    The destination image path.
     * @param {string} width
     *    Width in pixel.
     * @param {string} height
     *    Height in pixel.
     *
     * @returns {module:util/ImageMagick.PromiseObject}
     *    A promise object.
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
    },

    /**
     * @alias module:util/ImageMagick.createBlankImageWithText
     *
     * @desc Create a default diff screenshot if base and new screenshot have different size.
     * @param {string} text
     *     The text to print to the image. Should no include single quotes.
     * @param {string} fileName
     *     The screenshot filename.
     */
    createBlankImageWithText: function (text, fileName) {
        cp.exec("convert -size 300x300 -stroke red -fill red -gravity center label:'" + text + "' " + fileName);
    }

};
module.exports = ImageMagick;
