'use strict';

/*
 * Validator library.
 *
 * Library containing reusable validation functions.
 */

module.exports = {

    /**
     * Validate that the string looks like an email address.
     *
     * @param email {String} the string to validate
     * @returns {boolean} true if the string looks like an email address
     */
    isValidEmail: function (email) {
        var re = /^[\w._-]+[+]?[\w._-]+@[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z0-9]{2,18}$/;
        return re.test(email);
    },

    /**
     * Validate that the string looks like a domain name.
     *
     * @param domainName {String} the string to validate
     * @returns {boolean} true if the string looks like a domain name
     */
    isValidDomainName: function (domainName) {
        // supports TLDs up to 18 characters e.g. domain.travelersinsurance
        var re = /^[a-z0-9]+([\-\.][a-z0-9]+)*\.[a-z]{2,18}$/;
        return !!domainName && re.test(domainName.toLowerCase());
    },

    /**
     * Validate that the string looks like an IP address (a.b.c.d, all integers).
     *
     * @param str {String} the string to validate
     * @returns {boolean} true if the string looks like an IP address
     */
    isValidIp: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}$/;
        return re.test(str.trim());
    },

    /**
     * Validate that the string looks like valid CIDR format (a.b.c.d/e, all integers).
     *
     * @param str {String} the string to validate
     * @returns {boolean} true if the string looks like valid CIDR format
     */
    isValidCidr: function (str) {
        var re = /^(\d{1,3}\.){3}\d{1,3}\/\d{1,2}$/;
        return re.test(str.trim());
    },

    /**
     * Validate that the given string contains only digits.
     *
     * @param str {String} the string to validate
     * @returns {boolean} true if the string contains only digits
     */
    isDigitsOnly: function (str) {
        return /^\d+$/.test(str);
    },

    /**
     * Validate that the given string looks like a valid URL including protocol
     * (e.g., http://www.pingidentity.com/mypage)
     *
     * @param str {String} the string to validate
     * @returns {boolean} true if the string looks like a valid URL
     */
    isValidUrl: function (str) {
        var myRegExp = /[^:]+:\/\/[^:\/]+(:[0-9]+)?.*/;
        return myRegExp.test(str);
    }
};
