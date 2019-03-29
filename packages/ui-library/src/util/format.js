/*eslint-disable valid-jsdoc*/

/**
* @module util/format
*/

/**
 * @alias module:util/format.format
 *
 * @desc Format a string. The format string may call methods on the target key.
 *
 * @param {string} string
 *    The string to format.
 * @param {Object[]} keys
 *    The keys to use for substitution.
 * @returns {string}
 *    The formatted string.
 *
 * @example
 *   var p = new Person('mr', 'okhtay', 'shoghi')
 *   'Hello {salutation.capitalize} {lastName.capitalize}'.format(p);
 *   //'Hello Mr. Shoghi'
 * @example
 *   '{0} + {1} = {2}'.format(1, 2, 3);
 *   //'1 + 2 = 3'
 * @example
 *   var p = {first: 'okhtay', last: 'shoghi'}
 *   'Hello {name.first.capitalize}'.format(p);
 *   //'Hello Okhtay'
 */
module.exports = function (string, keys) {
    if (arguments.length > 2 || typeof(keys) !== "object") {
        keys = Array.prototype.splice.call(arguments, 1);
    }

    var parts = string.split(/(?=[{])|}/);
    var l = parts.length;

    for (var i = 0; i < l; i += 1) {
        if (parts[i][0] === "{") {
            var result = keys[parts[i].slice(1)];

            if (typeof(result) !== "undefined") {
                parts[i] = typeof(result) === "function" ? result() : result;
            } else {
                parts[i] = parts[i] + "}";
            }
        }
    }

    return parts.join("");
};
