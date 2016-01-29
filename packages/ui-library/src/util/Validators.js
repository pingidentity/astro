"use strict";

/**
 * @class util/Validators
 * @desc Validator library, containing reusable validation functions.
 */

module.exports = {

    /**
     * @desc Validate that the string looks like an email address.
     *
     * @param {string} email the string to validate
     * @returns {boolean} true if the string looks like an email address
     */
    isValidEmail: function (email) {
        var re = /^[\w._-]+[+]?[\w._-]+@[A-Za-z0-9]+([\-\.][A-Za-z0-9]+)*\.[A-Za-z0-9]{2,18}$/;
        return re.test(email);
    },

    /**
     * @desc Validate that the string looks like a domain name.
     *
     * @param {string} domainName the string to validate
     * @returns {boolean} true if the string looks like a domain name
     */
    isValidDomainName: function (domainName) {
        // supports TLDs up to 18 characters e.g. domain.travelersinsurance
        var re = /^[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,18}$/;
        return !!domainName && re.test(domainName.toLowerCase());
    },

    /**
     * @desc Validate that the string looks like an IP address (a.b.c.d, all integers).
     *
     * @param {string} str the string to validate
     * @returns {boolean} true if the string looks like an IP address
     */
    isValidIp: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}$/;
        return re.test(str.trim());
    },

    /**
     * @desc Validate that the string looks like valid CIDR format (a.b.c.d/e, all integers).
     *
     * @param {string} str the string to validate
     * @returns {boolean} true if the string looks like valid CIDR format
     */
    isValidCidr: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
        return re.test(str.trim());
    },

    /**
     * @desc Validate that the given string contains only digits.
     *
     * @param {string} str the string to validate
     * @returns {boolean} true if the string contains only digits
     */
    isDigitsOnly: function (str) {
        return /^\d+$/.test(str);
    },

    /**
     * @desc Validate that the given string looks like a valid URL including protocol
     * (e.g., http://www.pingidentity.com/mypage)
     *
     * @param {string} str the string to validate
     * @returns {boolean} true if the string looks like a valid URL
     */
    isValidUrl: function (str) {
        var myRegExp = /[^:]+:\/\/[^:\/]+(:[0-9]+)?.*/;
        return myRegExp.test(str);
    },

    /**
     * @desc Validate that a phone number has only numbers, parens, dashes & whitespace
             (e.g.: (604) 555-1337)
     * @param {string} str string to validate
     * @return {boolean} true if only numbers, parens, dashes & whitespace present
     */
    isValidPhoneNumber: function (str) {
        return /^[\d\-\(\)\s\.]+$/g.test(str);
    }
};
