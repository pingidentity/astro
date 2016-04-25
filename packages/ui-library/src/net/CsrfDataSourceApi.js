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
 * @desc return csrfConfig if called from either ui-library or pingone-ui-library
 * @return {object|null} The config if found or null
 */
var getCSRFConfig = function () {
    var uiLibPackageJson = require("../../../../package.json");
    var pingOneUiLibPackageJson = require("../../../../../../package.json");

    if (uiLibPackageJson) {
        return uiLibPackageJson.csrfDataSourceApiConfig;
    }

    if (pingOneUiLibPackageJson) {
        return pingOneUiLibPackageJson.csrfDataSourceApiConfig;
    }

    return null;
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
 * MUST be configured in the parent project's packages.json with the following keys, under csrfDataSourceApiConfig:
 * - {object} config the DataSourceApi config
 * - {string} [config.rootPath=""] it is used to to prefix each endpoint URL
 * - {string} [config.csrfHeaderName] the name of the CSRF protection header sent by the server to the client and back
 * - {string} [config.csrfCookiename="application-csrf"] the cookie name to store
 *   the CSRF protection token received from the server
 */

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

    /** unregister a middleware function.  Can be called in one of two ways
     * @param {string} which - middleware can be injected with different timing.  Specify which one you're removing
     * @param {number|function} index - specify which callback to remove.  If the actual function is passed
     *   a search through all the callbacks will be performed to find the index.
     * @example:
     * Api.unregisterMiddleware(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, 1)
     * //or
     * Api.unregisterMiddleware(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, this._handleResp)
     **/
    unregisterMiddleware: function (which, index) {
        if (typeof(index) === "function") {
            index = Api.callbacks[which].indexOf(index);

            if (index === -1) {
                return;
            }
        }

        Api.callbacks[which].splice(index, 1);
    },

    unregisterAllMiddleware: function () {
        Api.callbacks = { after: [], before: [] };
    },

    _loadConfig: function (config) {
        Api.config = config;

        if (!Api.config) {
            throw "did not find csrfDataSourceApiConfig in package.json";
        }

        Api.rootPath = Api.config.rootPath || "";
        Api.csrfCookieName = Api.config.csrfCookieName || "application-csrf";
        Api.csrfHeaderName = Api.config.csrfHeaderName;
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
            parseCsrfHeader(resp, Api.csrfHeaderName, Api.csrfCookieName);
            callback(resp);
        }
    },

    get: function (endpoint, params, callback) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.get(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback));
    },
    getNoCache: function (endpoint, params, callback) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.getNoCache(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback));
    },
    post: function (endpoint, data, params, callback, files, headers) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.post(
                Api.rootPath + endpoint,
                data,
                params,
                Api._handleResponse.bind(null, callback),
                files,
                _.extend(buildCsrfHeader(Api.csrfHeaderName, Api.csrfCookieName), headers));
    },
    put: function (endpoint, data, params, callback, headers) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.put(
                Api.rootPath + endpoint,
                data,
                params,
                Api._handleResponse.bind(null, callback),
                _.extend(buildCsrfHeader(Api.csrfHeaderName, Api.csrfCookieName), headers));
    },
    doDelete: function (endpoint, params, callback, headers) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.doDelete(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback),
                _.extend(buildCsrfHeader(Api.csrfHeaderName, Api.csrfCookieName), headers));
    }
};

//this package wont exist in unit tests, so catch the situation
//jest will not let you mock a module which doesnt exist on disk
var config = window.__DEV__ ? {} : getCSRFConfig();

Api._loadConfig(config);

module.exports = Api;
