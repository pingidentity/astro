'use strict';

var moment = require('moment');

module.exports = {
    /**
     * Helper method to test if the HTML5 File API is supported by the user agent
     * @returns {Boolean}
     */
    isHtmlFileApiSupported: function () {
        return global.File && global.FileList && global.FileReader;
    },

    /**
     * Remove the leading 'fakepath' directory added by the browser to <input type="file" /> elements
     *
     * @param path {string} the path to strip
     * @returns {string} the stripped path
     */
    stripFakePath: function (path) {
        return path.replace(/^c:\\fakepath\\/i, '');
    },

    /**
     * Trigger a Blob download - based on http://stackoverflow.com/a/23797348
     * @param filename
     * @param blobData {Array} the raw data for the file
     * @param fileType {String} MIME type e.g. 'text/plain'
     */
    triggerFileDownload: function (filename, blobData, fileType) {
        var blob = new Blob(blobData, { type: fileType });

        if (typeof global.navigator.msSaveBlob !== 'undefined') {
            // IE has its own way of saving blobs locally (see HTML7007 error)
            global.navigator.msSaveBlob(blob, filename);
        } else {
            var URL = global.URL || global.webkitURL;
            var downloadUrl = URL.createObjectURL(blob);

            // use HTML5 a[download] attribute to specify filename
            var a = document.createElement('a');

            if (typeof a.download === 'undefined') {
                global.location = downloadUrl;
            } else {
                a.href = downloadUrl;
                a.download = filename;
                document.body.appendChild(a);
                a.click();
            }
        }
    },

    /**
     * Format the given timestamp in milliseconds as a YYYY-MM-DD date.
     *
     * @param timestamp {Number} the timestamp (UNIX time * 1000)
     * @returns {String} the formatted date
     */
    formatDate: function (timestamp) {
        return moment.utc(timestamp).format('YYYY-MM-DD');
    }
};
