
/**
 * @module util/FileUtils
 * @desc A set of file handling util functions.
 */
export default {

    /**
     * @alias module:util/FileUtils.isHtmlFileApiSupported
     * @desc Helper method to test if the HTML5 File API is supported by the user agent
     *
     * @returns {boolean}
     *     Returns true the API is supported
     */
    isHtmlFileApiSupported() {
        return global.File && global.FileList && global.FileReader;
    },

    /**
     * @alias module:util/FileUtils.stripFakePath
     * @desc Remove the leading "fakepath" directory added by the browser to `<input type="file" />`
     *      elements
     *
     * @param {string} path
     *     The path to strip
     * @returns {string}
     *     The stripped path
     */
    stripFakePath(path) {
        return path.replace(/^c:\\fakepath\\/i, '');
    },

    /**
     * @alias module:util/FileUtils.validateFileSize
     * @desc determines if the file size exceeds the specified limit
     *
     * @param {number} fileSizeInBytes
     *     The size of the file in bytes
     * @param {number} maxFileSizeKb
     *     The max allowed file size in Kb
     */
    validateFileSize(fileSizeInBytes, maxFileSizeKb) {
        if (this.props.maxFileSizeKb && fileSizeInBytes > (maxFileSizeKb * 1000)) {
            return false;
        }
        return true;
    },


};
