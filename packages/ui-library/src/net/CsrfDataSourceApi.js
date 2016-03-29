"use strict";

/**
 * @module net/CsrfDataSourceApi
 *
 * @desc A wrapper on {@link net/DataSourceApi} with support for CSRF protection.
 *
 * Caching is set by default, unless using getNoCache() method.
 *
 * Parsing the response: If the server returns responses in JSON format,
 * then it will get automatically parsed in the "response.data"
 * so if the JSON has a property like: "phone" then all you have to do is to read its value
 * from "response.data.phone"
 *
 * @example
 * var api = require("/ui-library/src/net/CsrfDataSourceApi")({
 *     rootPath: "/web-portal/",
 *     csrfHeaderName: "X-CSRF-TOKEN",
 *     csrfCookieName: "web-portal-csrf"
 * });
 *
 * // GET Request
 * api.get("myendpoint/action", { queryParam: "q1" }, function (response) {
 *     if (!response.error) {
 *         console.log("Received " + response.status + " with data: " + response.data);
 *     } else {
 *         console.log("Received error: "  + response.error);
 *     }
 *
 * });
 *
 * // POST Request
 * api.post("myendpoint/action", { postParam: "p1" }, { queryParam: "q1" }, function (response) {
 *     if (!response.error) {
 *         console.log("Received " + response.status + " with data: " + response.data);
 *     } else {
 *         console.log("Received error: "  + response.error);
 *     }
 * });
 */

var DataSourceApi = require("./DataSourceApi"),
    _ = require("underscore");


/**
 * @desc Read the value of the cookie with the given name.
 * @private
 * @param {string} name the cookie name
 * @return {?string} the cookie value or null
 */
var readCookie = function (name) {
    var nameEq = name + "=";
    var targetCookie = _.find(
        document.cookie.split(";"),
        function (cookie) {
            return cookie.replace(/^\s\s*/, "").indexOf(nameEq) === 0;
        }
    );
    return targetCookie ? targetCookie.trim().slice(nameEq.length) : null;
};

/**
 * @desc Write a cookie with the given name, value and max age.
 * @private
 * @param {string} name the cookie name
 * @param {string} value the cookie value
 * @param {number} maxAge the max age of the cookie
 */
var writeCookie = function (name, value, maxAge) {
    var cookie = name + "=" + value + "; max-age=" + maxAge + "; path=/";
    document.cookie = cookie;
};

/**
 * @desc Read the CSRF protection token from the heads on the given response object,
 *     and, if found, store it in a cookie to be used on a subsequent request to the server.
 * @private
 * @param {object} response the super agent response
 * @param {string} headerName the name of the header containing the CSRF protection token
 *     The method is a no-op if the headerName is falsy.
 * @param {string} cookieName the name of the cookie to store the CSRF protection token
 */
var parseCsrfHeader = function (response, headerName, cookieName) {
    if (headerName) {
        var csrfToken = response.headers[headerName.toLowerCase()];
        if (csrfToken) {
            writeCookie(cookieName, csrfToken, 3600);
        }
    }
};

/**
 * @desc Build a headers object (including the CSRF protection token if available)
 *     to be used on a POST/PUT/DELETE/PATCH request.
 * @private
 * @param {string} headerName the name of the header to set with the CSRF protection token as value.
 * @param {string} cookieName the name of the cookie which contains the CSRF protection token
 * @return {object} the headers object to be used on the super agent request. If the header name
 *     is falsy, an empty object is returned.
 */
var buildCsrfHeader = function (headerName, cookieName) {
    var headers = {};

    if (headerName) {
        var csrfToken = readCookie(cookieName);
        if (csrfToken !== null) {
            headers[headerName] = csrfToken;
        }
    }

    return headers;
};

/**
 * @typedef GetRequest
 * @type {function}
 * @param {string} endpoint the endpoint to send the request to
 * @param {object} params the GET request parameters
 * @param {function} callback a function to be called back with the response
 */

/**
 * @typedef CsrfDataSourceApiResult
 * @type {object}
 * @property {GetRequest} get make a GET request; it uses the local cached data if available and valid
 * @property {GetRequest} getNoCache make a GET request; it bypasses the local cache
 * @property {function} post make a POST request
 * @property {function} put make a PUT request
 * @property {function} doDelete make a DELETE request
 */

/**
 * @desc Build a DataSourceApi with CSRF protection enabled, configured with the supplied config object.
 * @param {object} config the DataSourceApi config
 * @param {string} config.rootPath it is used to to prefix each endpoint URL
 * @param {string} [config.csrfHeaderName] the name of the CSRF protection header sent by
 *    the server to the client and back
 * @param {string} [config.csrfCookiename="application-csrf"] the cookie name to store
 *    the CSRF protection token received from the server
 * @return {CsrfDataSourceApiResult} a DataSourceApi configured for the root path
 *    and CSRF protection as defined by the provided config
 */
var CsrfDataSourceApi = function (config) {

    var rootPath = config && config.rootPath || "";

    var csrfHeaderName = config && config.csrfHeaderName;
    var csrfCookieName = config && config.csrfCookieName || "application-csrf";

    var Api = {
        MiddlewareTiming: {
            CALL_BEFORE_REQUEST: "before",
            CALL_AFTER_RESPONSE: "after"
        },

        callbacks: {
            after: [],
            before: []
        },

        registerMiddleware: function (which, callback) {
            Api.callbacks[which].push(callback);
        },

        unregisterMiddleware: function (which, index) {
            Api.callbacks[which].splice(index, 1);
        },

        unregisterAllMiddleware: function () {
            Api.callbacks = { after: [], before: [] };
        },

        _execMiddlewareCallbacks: function (which, resp) {
            var callbacks = Api.callbacks[which] || [];
            var result = true;

            for (var i = 0; i < callbacks.length; i += 1) {
                result = result && callbacks[i](resp) !== false;
            }

            return result;
        },

        _handleResponse: function (callback, resp) {
            if (Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, resp) !== false) {
                parseCsrfHeader(resp, csrfHeaderName, csrfCookieName);
                callback(resp);
            }
        },

        get: function (endpoint, params, callback) {
            Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

            DataSourceApi.get(
                    rootPath + endpoint,
                    params,
                    Api._handleResponse.bind(null, callback));
        },
        getNoCache: function (endpoint, params, callback) {
            Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

            DataSourceApi.getNoCache(
                    rootPath + endpoint,
                    params,
                    Api._handleResponse.bind(null, callback));
        },
        post: function (endpoint, data, params, callback, files, headers) {
            Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

            DataSourceApi.post(
                    rootPath + endpoint,
                    data,
                    params,
                    Api._handleResponse.bind(null, callback),
                    files,
                    _.extend(buildCsrfHeader(csrfHeaderName, csrfCookieName), headers));
        },
        put: function (endpoint, data, params, callback, headers) {
            Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

            DataSourceApi.put(
                    rootPath + endpoint,
                    data,
                    params,
                    Api._handleResponse.bind(null, callback),
                    _.extend(buildCsrfHeader(csrfHeaderName, csrfCookieName), headers));
        },
        doDelete: function (endpoint, params, callback, headers) {
            Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

            DataSourceApi.doDelete(
                    rootPath + endpoint,
                    params,
                    Api._handleResponse.bind(null, callback),
                    _.extend(buildCsrfHeader(csrfHeaderName, csrfCookieName), headers));
        }
    };

    return Api;
};

module.exports = CsrfDataSourceApi;
