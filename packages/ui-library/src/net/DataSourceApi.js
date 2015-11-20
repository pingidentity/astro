"use strict";

// variables
var request = require("superagent"),
    _ = require("underscore");

var Constants = require("../constants/CacheConstants"),
    Cache = require("./Cache");

var memCache = new Cache(Constants.CacheTypes.MEMORY, "memCache", 180);

// constants
var GET_REQUEST = "GET",
    POST_REQUEST = "POST",
    PUT_REQUEST = "PUT",
    DELETE_REQUEST = "DELETE";


/*
 * @desc [INTERNAL] Check if the request represented by the supplied options
 * is allowed to hit the cache (ie. if the type is GET_REQUEST and the bypassCache
 * is not true). If the type is not GET_REQUEST, the cache will be cleared.
 * @private
 * @param {{bypassCache: boolean, type: string, cache: Cache}} options
 * the request attributes; three attributes are expected:
 * bypassCache (whether the cache should be bypassed or not), type (the request
 * method: GET_REQUEST, POST_REQUEST, etc), cache (the Cache object).
 * @return {boolean} true if the request can hit the cache, false otherwise
 */
var verifyCache = function (options) {
    if (!options.bypassCache) {
        if (options.type !== GET_REQUEST) {
            // data is changing, so clear the cache
            options.cache.clear();
            // no need to hit the cache for requests that are not GETs
            return false;
        }
        // this is a GET request so use the cache (unless bypassed)
        return true;
    }
    // cache has been bypassed
    return false;
};

/*
 * @desc [INTERNAL] given the request attributes passed as the options argument,
 * build an HTTP request and sends it to the server.
 * @private
 * @param {{endpoint: string, type: string, params: Object.<string, string>, data: Object.<string, *>, files: Object.<string, Object>, headers: Object.<string, string>, callback: function, bypassCache: function(Object.<string, *>), cache: <Cache>}} options
 * the request type can be one of GET_REQUEST, POST_REQUEST, etc;
 * the params field is an array of named request parameters;
 * the data field is an associative array of form data;
 * the files field is an associative array of objects;
 * the headers field is an associative array of headers (the Accept is optional)
 * callback is the function to be called upon response, it is called with an object of this type:
 * {error: string, status: number, data: Object, fromCache: boolean}
 *
 * @return {undefined}
 */
var processRequest = function (options) {
    var req;
    switch (options.type) {
        case GET_REQUEST:
            req = request.get(options.endpoint);
            break;
        case POST_REQUEST:
            req = request.post(options.endpoint);
            break;
        case PUT_REQUEST:
            req = request.put(options.endpoint);
            break;
        case DELETE_REQUEST:
            req = request.del(options.endpoint);
            break;
        default:
            // Unknown request method? Respond with an error.
            options.callback({
                error: "request.method.invalid",
                status: -1,
                data: "",
                fromCache: false
            });
            return;
    }

    // set the content type
    var contentType;
    if (options.headers && options.headers.Accept) {
        contentType = options.headers.Accept;
    }
    else {
        contentType = "application/json, text/plain, */*";
    }
    req.set("Accept", contentType);

    // add the rest of the provided headers
    _.each(options.headers, function (value, key) {
        if (key !== "Accept") {
            req.set(key, value);
        }
    });

    if (!options.files) {
        if (options.data) {
            req.send(options.data);
        }
    } else {
        // Special handling if we are uploading files
        // Accompanying field data will be sent as form data, not JSON.
        _.each(options.data, function (value, key) {
            // Undefined values appear to be sent as the literal 'undefined' string,
            // so sending them is probably never the right thing to do.
            if (value !== null && typeof value !== "undefined") {
                req.field(key, value);
            }
        });

        // Add the files
        _.each(options.files, function (value, key) {
            if (value && typeof value === "object") {
                req.attach(key, value);
            }
        });
    }

    var cacheKey = options.endpoint + JSON.stringify(options.params);
    var cachedData = verifyCache(options) ? options.cache.get(cacheKey) : undefined;
    if (cachedData) {
        cachedData.fromCache = true;
        options.callback(cachedData);
    } else {
        req.query(options.params).end(function (res) {
            var error;
            // this is to comply with the way the webportal endpoints return certain failures
            if (res.text === "ERROR") {
                error = res.text;
            } else {
                error = res.error ? res.error.message : "";
            }

            // build the response object and pass it to the callback function
            var response = {
                error: error,
                status: res.status,
                data: (res.body || res.body === false) ? res.body : res.text,
                headers: res.header,
                fromCache: false
            };
            options.callback(response);

            // cache the GET request
            if (options.type === GET_REQUEST && !options.bypassCache) {
                if (response.error) {
                    // clear the cache if an error happens
                    // this is to avoid inconsistencies with local optimistic updates
                    options.cache.clear();
                } else {
                    options.cache.put(cacheKey, response);
                }
            }
        });
    }
};


/*
 * Do not change the interface parameters and the callback response structure
 * since they are the 'contract' to be used across the entire application.
 */

/**
 *
 * @class net/DataSourceApi
 *
 * @desc
 * A simple singleton wrapper that will serve as the main
 * interface for server API calls. By default the Accept content type header
 * is set to json, text or *; it can be overriden by passing the 'Accept' header.
 * <br/><br/>
 * <strong>Caching</strong>
 * Caching is set by default, unless using getNoCache() method in lieu of get().
 * <br/><br/>
 * <strong>Parsing the response</strong>
 * If the server returns responses in JSON format, then the response will get
 * automatically parsed in the 'response.data'; so if the JSON has a property
 * like: 'phone' then all you have to do is to read its value from
 * 'response.data.phone'.
 *
 * @example
 * See the unit tests for more examples.
 *
 * var api = require('ui-library/src/net/DataSourceAPI');
 *
 * // GET request
 * api.get(
 *     'http://localhost:9090/web-portal/myendpoint/action',
 *     { query: 'search string', count: 10 },
 *     function(response) {
 *         if (!response.error) {
 *             console.log('Received ' + response.status + ' with data: ' + response.data);
 *         } else {
 *             console.log('Received error: '  + response.error);
 *         }
 *     },
 *     { 'Accept': 'application/json' );
 *
 * // POST request
 * api.post(
 *     'myendpoint/action',
 *     {postParam: 'p1'},
 *     {queryParam: 'q1'},
 *     function(response) {
 *         if (!response.error) {
 *             console.log('Received ' + response.status + ' with data: ' + response.data);
 *         } else {
 *             console.log('Received error: '  + response.error);
 *         }
 *     });
 */
var DataSourceApi = {
    /**
     * @public
     * @desc Makes a GET request and calls the callback with the response.
     * If the response exists in the cache, it will be returned from there.
     * Use getNoCache() method to force sending the request even if it exists
     * in the response cache.
     * @param {string} endpoint the endpoint to send the request to
     * @param {Object.<string, string>} params the request parameters as an associative array
     * @param {function(Object.<string, *>)} callback the callback function, it will be called with an object of this type:
     * {error: string, status: number, data: Object, headers: Object.<string, string>, fromCache: boolean}
     * @param {Object.<string, string>} [headers] request headers as an associative array
     */
    get: function (endpoint, params, callback, headers) {
        processRequest(
            {
                type: GET_REQUEST,
                endpoint: endpoint,
                params: params,
                callback: callback,
                headers: headers,
                bypassCache: false,
                cache: memCache
            }
        );
    },

    /**
     * @public
     * @desc Makes a GET request and calls the callback with the response.
     * It doesn't use the response cache.
     * @param {string} endpoint the endpoint to send the request to
     * @param {Object.<string, string>} params the request parameters as an associative array
     * @param {function(Object.<string, *>)} callback the callback function, it will be called with an object of this type:
     * {error: string, status: number, data: Object, headers: Object.<string, string>, fromCache: boolean}
     * @param {Object.<string, string>} [headers] request headers as an associative array
     */
    getNoCache: function (endpoint, params, callback, headers) {
        processRequest(
            {
                type: GET_REQUEST,
                endpoint: endpoint,
                params: params,
                callback: callback,
                headers: headers,
                bypassCache: true,
                cache: memCache
            }
        );
    },

    /**
     * @public
     * @desc Makes a POST request and calls the callback with the response.
     * @param {string} endpoint the endpoint to send the request to
     * @param {Object.<string, *>} data the form data to be sent in the body, as an associative array
     * @param {Object.<string, string>} params the request parameters as an associative array
     * @param {function(Object.<string, *>)} callback the callback function, it will be called with an object of this type:
     * {error: string, status: number, data: Object, headers: Object.<string, string>, fromCache: boolean}
     * @param {Object.<string, Object>} [files] the files to be attached to the request, as an associative array
     * @param {Object.<string, string>} [headers] request headers as an associative array
     */
    post: function (endpoint, data, params, callback, files, headers) {
        processRequest(
            {
                type: POST_REQUEST,
                endpoint: endpoint,
                data: data,
                params: params,
                callback: callback,
                headers: headers,
                bypassCache: false,
                cache: memCache,
                files: files
            }
        );
    },

    /**
     * @public
     * @desc Makes a PUT request and calls the callback with the response.
     * @param {string} endpoint the endpoint to send the request to
     * @param {Object} data the form data to be sent in the body, as an associative array
     * @param {Object.<string, string>} params the request parameters as an associative array
     * @param {function(Object.<string, *>)} callback the callback function, it will be called with an object of this type:
     * {error: string, status: number, data: Object, headers: Object.<string, string>, fromCache: boolean}
     * @param {Object.<string, string>} [headers] request headers as an associative array
     */
    put: function (endpoint, data, params, callback, headers) {
        processRequest(
            {
                type: PUT_REQUEST,
                endpoint: endpoint,
                data: data,
                params: params,
                callback: callback,
                headers: headers,
                bypassCache: false,
                cache: memCache
            }
        );
    },

    /**
     * @public
     * @desc Makes a DELETE request and calls the callback with the response.
     * @param {string} endpoint the endpoint to send the request to
     * @param {Object.<string, string>} params the request parameters as an associative array
     * @param {function(Object.<string, *>)} callback the callback function, it will be called with an object of this type:
     * {error: string, status: number, data: Object, headers: Object.<string, string>, fromCache: boolean}
     * @param {Object.<string, string>} [headers] request headers as an associative array
     */
    doDelete: function (endpoint, params, callback, headers) {
        processRequest(
            {
                type: DELETE_REQUEST,
                endpoint: endpoint,
                params: params,
                callback: callback,
                headers: headers,
                bypassCache: false,
                cache: memCache
            }
        );
    }
};

module.exports = DataSourceApi;
