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
        return /^$|^[\d\-\(\)\s\.]+$/g.test(str);
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
    }
};
