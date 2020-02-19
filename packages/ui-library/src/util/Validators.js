/*eslint-disable valid-jsdoc*/

"use strict";


/**
 * @module util/Validators
 * @desc Validator library, containing reusable validation functions.
 */

module.exports = {

    /**
     * @alias module:util/Validators.isValidEmail
     * @desc Validate that the string looks like an email address.
     *
     * @param {string} email
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string looks like an email address
     */
    isValidEmail: function (email) {
        var re = /^[\w\._\-]+([\+\w\._\-])*@[A-Za-z0-9]+([\-\.][A-Za-z0-9]+)*\.[A-Za-z0-9]{2,18}$/;
        return re.test(email);
    },

    /**
     * @alias module:util/Validators.isValidDomainName
     * @desc Validate that the string looks like a domain name.
     *
     * @param {string} domainName
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string looks like a domain name
     */
    isValidDomainName: function (domainName) {
        // supports TLDs up to 18 characters e.g. domain.travelersinsurance
        var re = /^[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,18}$/;
        return !!domainName && re.test(domainName.toLowerCase());
    },

    /**
     * @alias module:util/Validators.isValidIp
     * @desc Validate that the string looks like an IP address (a.b.c.d, all integers).
     *
     * @param {string} str
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string looks like an IP address
     */
    isValidIp: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}$/;
        return re.test(str.trim());
    },

    /**
     * @alias module:util/Validators.isValidCidr
     * @desc Validate that the string looks like valid CIDR format (a.b.c.d/e, all integers).
     *
     * @param {string} str
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string looks like valid CIDR format
     */
    isValidCidr: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
        return re.test(str.trim());
    },

    /**
     * @alias module:util/Validators.isDigitsOnly
     * @desc Validate that the given string contains only digits.
     *
     * @param {string} str
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string contains only digits
     */
    isDigitsOnly: function (str) {
        return /^\d+$/.test(str);
    },

    /**
     * @alias module:util/Validators.isValidUrl
     * @desc Validate that the given string looks like a valid URL including protocol
     *     (e.g., http://www.pingidentity.com/mypage)
     *
     * @param {string} str
     *     The string to validate
     * @returns {boolean}
     *     Returns true if the string looks like a valid URL
     */
    isValidUrl: function (str) {
        var myRegExp = /[^:]+:\/\/[^:\/]+(:[0-9]+)?.*/;
        return myRegExp.test(str);
    },

    /**
     * @alias module:util/Validators.isValidPhoneNumber
     * @desc Validate that a phone number has only empty, numbers, parens, dashes & whitespace (e.g.: (604) 555-1337)
     *
     * @param {string} str
     *     The string to validate
     * @return {boolean}
     *     Returns true if only empty, numbers, parens, dashes & whitespace present
     */
    isValidPhoneNumber: function (str) {
        return /^$|^[\d\-\(\)\s\.]+$|^\+/g.test(str);
    },

    /**
    * @alias module:util/Validators.isValidHexColorCharacter
    * @desc Validate that a hex color only has values: empty, # or hex value between 00 - FF (e.g.: #ABC or #FF00FF)
    *
    * @param {string} str
    *     The string to validate
    * @returns {boolean}
    *     Returns true if the string only contains values: empty, # or hex value between 00 - FF
    */
    isValidHexColorCharacter: function (str) {
        return /^$|^#?[0-9A-F]*$/i.test(str);
    },

    /**
    * @alias module:util/Validators.isValidFileSize
    * @desc Validate the file size.
    *
    * @param {number} fileSizeInBytes
    *     The file size.
    * @param {number} maxFileSizeKb
    *     The maximum size (in KB) of the uploaded file (default 5MB).

    */
    isValidFileSize: function (fileSizeInBytes, maxFileSizeKb) {
        if (maxFileSizeKb && fileSizeInBytes > (maxFileSizeKb * 1000)) {
            return false;
        } else {
            return true;
        }
    },

    /**
    * @alias module:util/Validators.isValidMimeType
    * @desc Validate the mime type.
    *
    * @param {string} type
    *     The string to validate
    * @param {string} [accept]
    *    Comma-separated string of MIME types and/or file extensions that are fed to the 'accept' attribute of the &lt;input&gt;
    *    element and used in the file type validation. Pass an empty string to the property to disable validation.
    *    Further information can be found here: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#Unique_file_type_specifiers.
    */
    isValidMimeType: function (type, accept) {
        if (accept && !accept.match(new RegExp("\\b" + type + "\\b"))) {
            return false;
        } else {
            return true;
        }
    },

    /**
    * @alias module:util/Validators.readFile
    * @desc Reads the file to make sure it will load.
    *
    * @param {object} file
    *    Browser File object to validate.
    * @param {function} readSuccessFunc
    *     Function that reads the successful file and loads it.
    * @param {function} errorFunc
    *     Function that checks to see if there is an error.
    * @param {string} errorCode
    * @alias FileUpload.ErrorCodes
    *   Error code given to the file
    */
    readFile: function (file, readSuccessFunc, errorFunc, errorCode) {

        var reader = new FileReader();
        reader.onloadend = function () { readSuccessFunc(file, reader.result); };
        reader.onerror = function () { errorFunc(errorCode); };
        reader.readAsDataURL(file);

    },

};
