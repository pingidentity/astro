/*eslint-disable valid-jsdoc*/

"use strict";

/**
* @module util/FilterUtils
* @desc A set of search util functions.
*/

/**
* @alias module:util/FilterUtils.filterFieldStartsWith
* @desc Searches the specified field within item for a starts with match of filter
*    (leading/trailing whitespace ignored).
*
* @param {string} field
*    The field to use in the search.
* @param {string} filter
*    The value to search for.
* @param {object} item
*    The object to search.
*
* @return {boolean}
*    True if filter matches the start of the field within item, false otherwise.
*/
exports.filterFieldStartsWith = function (field, filter, item) {
    filter = filter.trim().toLowerCase();

    if (field) {
        return item[field].toLowerCase().startsWith(filter);
    } else {
        for (var key in item) {
            if (item[key].toString && item[key].toString().toLowerCase().startsWith(filter)) {
                return true;
            }
        }
        return false;
    }
};

/**
* @alias module:util/FilterUtils.filterFieldContains
* @desc Searches the specified field within item for a contains match of filter
*    (leading/trailing whitespace ignored).
*
* @param {string} field
*    The field to use in the search.
* @param {string} filter
*    The value to search for.
* @param {object} item
*    The object to search.
*
* @return {boolean}
*    True if filter matches some portion of the field within item, false otherwise.
*/
exports.filterFieldContains = function (field, filter, item) {
    filter = filter.trim().toLowerCase();

    if (field) {
        return item[field].toLowerCase().includes(filter);
    } else {
        for (var key in item) {
            if (item[key].toString && item[key].toString().toLowerCase().includes(filter)) {
                return true;
            }
        }
        return false;
    }
};

/**
 * @alias module:util/FilterUtils.filterStartsWith
 * @desc Searches the specified item for a starts with match of filter in any string-able field
 *    (leading/trailing whitespace ignored).
 *
 * @param {string} filter
 *    The value to search for.
 * @param {object} item
 *    The object to search.
 *
 * @return {boolean}
 *    True if filter matches the start of any string-able field within item, false otherwise.
 */
exports.filterStartsWith = exports.filterFieldStartsWith.bind(null, null);

/**
 * @alias module:util/FilterUtils.filter
 * @desc Searches the specified the specified item for a match of filter in any string-able field
 *    (leading/trailing whitespace ignored).
 *
 * @param {string} filter
 *    The value to search for.
 * @param {object} item
 *    The object to search.
 *
 * @return {boolean}
 *    True if filter matches some portion of any string-able field within item, false otherwise.
 */
exports.filterContains = exports.filterFieldContains.bind(null, null);

/**
 * @alias module:util/FilterUtils.getFilterFunction
 * @desc Returns the appropriate filter function based on the search string's length
 *    (leading/trailing whitespace ignored) and whether a field name to search was given.
 *    Search strings <= 3 characters in length will use a "startsWith" search, otherwise a "contains" search is done.
 *    If no field name is given to search will return filters that search all string-able properties of an object.
 *
 * @param {object} str
 *    The value to search for.
 * @param {string} fieldName
 *    The field to use in the search.
 *
 * @return {function}
 *    A filter function.
 */
exports.getFilterFunction = function (str, fieldName) {
    str = str.trim();

    if (str.length <= 3) {
        return fieldName
            ? exports.filterFieldStartsWith.bind(null, fieldName, str)
            : exports.filterStartsWith.bind(null, str);
    } else {
        return fieldName
            ? exports.filterFieldContains.bind(null, fieldName, str)
            : exports.filterContains.bind(null, str);
    }
};