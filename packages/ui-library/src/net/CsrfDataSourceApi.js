/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

"use strict";

/**
 * @module net/CsrfDataSourceApi
 *
 * @desc A wrapper on {@link module:net/DataSourceApi} with support for CSRF protection.
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
 * @alias module:net/CsrfDataSourceApi.readCookie
 * @private
 *
 * @desc Read the value of the cookie with the given name.
 *
 * @param {string} name
 *    The cookie name.
 *
 * @return {string|null}
 *    The cookie value or null.
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
 * @alias module:net/CsrfDataSourceApi.writeCookie
 * @private
 *
 * @desc Write a cookie with the given name, value and max age.
 *
 * @param {string} name
 *    The cookie name.
 * @param {string} value
 *    The cookie value.
 * @param {number} maxAge
 *     The max age of the cookie.
 */
var writeCookie = function (name, value, maxAge) {
    // add the secure flag to the cookie when the protocol is https
    var secure = window.location.protocol === "https:" ? "; secure" : "";
    var cookie = name + "=" + value + "; max-age=" + maxAge + secure;
    document.cookie = cookie;
};

/**
 * @alias module:net/CsrfDataSourceApi.parseCsrfHeader
 * @private
 *
 * @desc Read the CSRF protection token from the heads on the given response object,
 *     and, if found, store it in a cookie to be used on a subsequent request to the server.
 *
 * @param {object} response
 *    The super agent response.
 * @param {string} headerName
 *    The name of the header containing the CSRF protection token.
 *    The method is a no-op if the headerName is falsy.
 * @param {string} cookieName
 *    The name of the cookie to store the CSRF protection token.
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
 * @alias module:net/CsrfDataSourceApi.buildCsrfHeader
 * @private
 *
 * @desc Build a headers object (including the CSRF protection token if available)
 *     to be used on a POST/PUT/DELETE/PATCH request.
 *
 * @param {string} headerName
 *    The name of the header to set with the CSRF protection token as value.
 * @param {string} cookieName
 *    The name of the cookie which contains the CSRF protection token.
 *
 * @return {object}
 *    The headers object to be used on the super agent request.
 *    If the header name is falsy, an empty object is returned.
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
 * @typedef module:net/CsrfDataSourceApi.ConfigObject
 * @desc The DataSourceApi config.
 *
 * @property {string} [rootPath=""]
 *    Used to prefix each endpoint URL.
 * @property {string} [csrfHeaderName]
 *    The name of the CSRF protection header sent by the server to the client and back.
 * @property {string} [csrfCookiename="application-csrf"]
 *    The cookie name to store. The CSRF protection token received from the server.
 */

/**
 * @desc Build a DataSourceApi with CSRF protection enabled, configured with the supplied config object.
 *     MUST be configured in the parent project's packages.json with the following keys, under csrfDataSourceApiConfig:
 *
 * @param {module:net/CsrfDataSourceApi.ConfigObject} config
 *    The DataSouceApi config.
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

    /**
    * @alias module:net/CsrfDataSourceApi.registerMiddleware
    * @desc Registers middleware.
    *
    * @param {string} which
    *    Middleware can be injected with different timing. Specify which ones you're registering.
    * @param {function} callback
    *    Callback function to register with this middleware.
    *
    */
    registerMiddleware: function (which, callback) {
        Api.callbacks[which].push(callback);
    },

    /**
     * @alias module:net/CsrfDataSourceApi.unregisterMiddleware
     * @desc Unregister a middleware function.  Can be called in one of two ways - see example.
     *
     * @param {string} which
     *    Middleware can be injected with different timing.  Specify which one you're unregistering.
     * @param {number|function} index
     *    Specify which callback to remove.
     *    If the actual function is passed, a search through all the callbacks will be performed to find the index.
     *
     * @example:
     *      Api.unregisterMiddleware(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, 1)
     *      //or
     *      Api.unregisterMiddleware(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, this._handleResp)
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

    /**
    * @alias module:net/CsrfDataSourceApi.unregisterAllMiddlware
    * @desc Unregisters all middlware.
    */
    unregisterAllMiddleware: function () {
        Api.callbacks = { after: [], before: [] };
    },

    /**
    * @alias module:net/CsrfDataSourceApi._loadConfig
    * @private
    *
    * @desc Loads the {@link module:net/CsrfDataSourceApi.ConfigObject} to configure the object.
    */
    _loadConfig: function (config) {
        Api.config = config;

        if (!Api.config) {
            throw "did not find csrfDataSourceApiConfig in package.json";
        }

        Api.rootPath = Api.config.rootPath || "";
        Api.csrfCookieName = Api.config.csrfCookieName || "application-csrf";
        Api.csrfHeaderName = Api.config.csrfHeaderName;
    },

    /**
    * @alias module:net/CsrfDataSourceApi._execMiddlewareCallbacks
    * @private
    *
    * @desc Executes a callback for some middleware.
    *
    * @param {string} which
    *    Specify which middleware to execute callback for.
    * @param {?} resp
    *    The response to pass to the callback.
    */
    _execMiddlewareCallbacks: function (which, resp) {
        var callbacks = Api.callbacks[which] || [];
        var result = true;

        for (var i = 0; i < callbacks.length; i += 1) {
            result = result && callbacks[i](resp) !== false;
        }

        return result;
    },

    /**
    * @alias module:net/CsrfDataSourceApi._handleResponse
    * @private
    *
    * @desc Handles a response.
    *
    * @param {function} callback
    *    The callback to execute for the response.
    * @param {?} resp
    *    The response to pass to the callback.
    */
    _handleResponse: function (callback, resp) {
        if (Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_AFTER_RESPONSE, resp) !== false) {
            parseCsrfHeader(resp, Api.csrfHeaderName, Api.csrfCookieName);
            callback(resp);
        }
    },

    /**
    * @alias module:net/CsrfDataSourceApi.get
    * @desc Makes a GET request and calls the callback with the response.
    *    If the response exists in the cache, it will be returned from there.
    *    Use {@link module:net/CsrfDataSourceApi.getNoCache} method to force sending the request
    *    even if it exists in the response cache.
    *
    * @param {string} endpoint
    *    The endpoint to send the request to.
    * @param {object} params
    *    The request query parameters as an associative array (string -> string).
    * @param {function} callback
    *    The callback function to be triggered once response is ready.
    */
    get: function (endpoint, params, callback) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.get(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback));
    },

    /**
    * @alias module:net/CsrfDataSourceApi.getNoCache
    * @desc Makes a GET request and calls the callback with the response.
    *    It is explicitly bypassing cache and always do networking.
    *
    * @param {string} endpoint
    *    The endpoint to send the request to.
    * @param {object} params
    *    The request query parameters as an associative array (string -> string).
    * @param {function} callback
    *    The callback function to be triggered once response is ready.
    */
    getNoCache: function (endpoint, params, callback) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.getNoCache(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback));
    },

    /**
    * @alias module:net/CsrfDataSourceApi.post
    * @desc Makes a POST request and calls the callback with the response.
    *
    * @param {string} endpointF
    *    The endpoint to send the request to.
    * @param {object} data
    *    The form data to be sent in the body.
    * @param {object} params
    *    The request query parameters as an associative array (string -> string).
    * @param {function} callback
    *    The callback function to be triggered once response is ready.
    * @param {object} [files]
    *    The files to be attached to the request. Will be sent as 'multipart/form-data`.
    * @param {object} [headers]
    *    Request headers as an associative array (string -> string).
    */
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

    /**
    * @alias module:net/CsrfDataSourceApi.put
    * @desc Makes a PUT request and calls the callback with the response.
    *
    * @param {string} endpoint
    *    The endpoint to send the request to.
    * @param {object} data
    *    The form data to be sent in the body.
    * @param {object} params
    *    The request query parameters as an associative array (string -> string).
    * @param {function} callback
    *    The callback function to be triggered once response is ready.
    * @param {object} [headers]
    *    Request headers as an associative array (string -> string).
    */
    put: function (endpoint, data, params, callback, headers) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.put(
                Api.rootPath + endpoint,
                data,
                params,
                Api._handleResponse.bind(null, callback),
                _.extend(buildCsrfHeader(Api.csrfHeaderName, Api.csrfCookieName), headers));
    },

    /**
    * @alias module:net/CsrfDataSourceApi.doDelete
    * @desc Makes a DELETE request and calls the callback with the response.
    *
    * @param {string} endpoint
    *    The endpoint to send the request to.
    * @param {object} params
    *    The request query parameters as an associative array (string -> string).
    * @param {function} callback
    *    The callback function to be triggered once response is ready.
    * @param {object} [headers]
    *    Request headers as an associative array (string -> string).
    */
    doDelete: function (endpoint, params, callback, headers) {
        Api._execMiddlewareCallbacks(Api.MiddlewareTiming.CALL_BEFORE_REQUEST);

        DataSourceApi.doDelete(
                Api.rootPath + endpoint,
                params,
                Api._handleResponse.bind(null, callback),
                _.extend(buildCsrfHeader(Api.csrfHeaderName, Api.csrfCookieName), headers));
    }
};

// this package wont exist in unit tests, so catch the situation
// jest will not let you mock a module which doesnt exist on disk
var config = window.__DEV__ ? {} : require("../../../../package.json").csrfDataSourceApiConfig;

Api._loadConfig(config);

module.exports = Api;