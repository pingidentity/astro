/*eslint-disable valid-jsdoc*/

"use strict";

/**
 * @module net/DataSourceApi
 *
 * @desc A simple singleton wrapper that will serve as the main interface for server API calls.
 *    By default the Accept content type header is set to json, text or *;
 *    it can be overriden by passing the 'Accept' header.
 *
 *    <strong>Caching</strong>
 *    Caching is set by default, unless using getNoCache() method in lieu of get().
 *
 *    <strong>Parsing the response</strong>
 *    If the server returns responses in JSON format, then the response will get
 *    automatically parsed in the 'response.data'; so if the JSON has a property
 *    like: 'phone' then all you have to do is to read its value from 'response.data.phone'.
 *
 *    See the unit tests for more examples.
 */

// variables
var request = require("superagent"),
    _ = require("underscore");

var Constants = require("../constants/CacheConstants"),
    Cache = require("./Cache");

var memCache = new Cache(Constants.CacheTypes.MEMORY, "memCache", 180);

// constants
var GET_REQUEST = "GET",
    PATCH_REQUEST = "PATCH",
    POST_REQUEST = "POST",
    PUT_REQUEST = "PUT",
    DELETE_REQUEST = "DELETE";

/**
* @typedef module:net/DataSourceApi.VerifyCacheOptions
*
* @property {boolean} bypassCache
*    Whether the cache should be bypassed or not.
* @property {string} type
*    The request method: GET_REQUEST, POST_REQUEST, etc.
* @property {Cache} cache
*    The Cache object.
*/

/**
 * @alias module:net/DataSourceApi.verifyCache
 * @private
 *
 * @desc Check if the request represented by the supplied options
 *    is allowed to hit the cache (ie. if the type is GET_REQUEST and the bypassCache
 *    is not true). If the type is not GET_REQUEST, the cache will be cleared.
 *
 * @param {module:net/DataSourceApi.VerifyCacheOptions} options
 *    The request attributes; all three attributes are expected.
 *
 * @return {boolean}
 *    True if the request can hit the cache, false otherwise.
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

/**
* @typedef module:net/DataSourceApi.processRequestCallbackObject
* @private
*
* @param {string} error
*    The request error message.
* @param {number} status
*    The request status.
* @param {Object} data
*    The request data.
* @param {boolean} fromCache
*    Whether or not the request is from the Cache.
*/

/**
* @callback module:net/DataSourceApi.processRequestCallback
* @private
*
* @param {module:net/DataSourceApi.processRequestCallbackObject} object
*    An object of callback values.
*/

/**
* @callback module:net/DataSourceApi.bypassCache
* @private
*
* @param {Object.<string, *>}
*    An associative array of data to pass to bypassCache.
*/

/**
* @typedef module:net/DataSourceApi.ProcessRequestOptions
* @private
*
* @property {string} endpoint
*    The request endpoint.
* @property {string} type
*    The request method: GET_REQUEST, POST_REQUEST, etc.
* @property {Object.<string, string>} params
*    An array of named request parameters.
* @property {Object.<string, *>} data
*    An associative array of form data.
* @propety {Object.<string, Object} files
*    An associative array of objects.
* @property {Object.<string, string>} headers
*    An associative array of headers (the Accept is optional).
* @property {module:net/DataSourceApi.processRequestCallback} callback
*    Callback to be triggered upon response.
* @property {module:net/DataSourceApi.bypassCache} bypassCache
*    Callback to be triggered to bypass the Cache.
* @property {Cache} cache
*    The Cache object.
*/

/**
 * @alias: module:net/DataSourceApi.processRequest
 * @private
 *
 * @desc Given the request attributes passed as the options argument, build an HTTP request and sends it to the server.
 *
 * @param {module:net/DataSourceApi.ProcessRequestOptions} options
 *    The request attributes.
 *
 * @return {undefined}
 */
var processRequest = function (options) {
    var req;
    switch (options.type) {
        case GET_REQUEST:
            req = request.get(options.endpoint);
            break;
        case PATCH_REQUEST:
            req = request.patch(options.endpoint);
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
        req.query(options.params).end(function (err, res) {
            var error;
            // this is to comply with the way the webportal endpoints return certain failures
            if (res.text === "ERROR") {
                error = res.text;
            } else if (err) {
                var response = err.response ? (err.response.body || err.response.error) : "";
                error = response ? response.message : "";
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



var DataSourceApi = {

    /**
     * @callback module:net/DataSourceApi.responseCallback
     *
     * @param {object} object
     *    Response data object.
     * @param {string|falsy} error
     *    Error string if request failed, falsy otherwise.
     * @param {number} status
     *    Response HTTP status code.
     * @param {object} data
     *    Response data.
     * @param {object} headers
     *    Response headers (string -> string).
     * @param {boolean} fromCache
     *    True if response was served from cache, false if real networking.
     */

    /**
     * @alias module:net/DataSourceApi.get
     *
     * @desc Makes a GET request and calls the callback with the response.
     *    If the response exists in the cache, it will be returned from there.
     *    Use getNoCache() method to force sending the request even if it exists in the response cache.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [headers]
     *    Request headers as an associative array (string -> string).
     *
     * @example
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.get(
     *          'http://localhost:9090/web-portal/myendpoint/action',
     *          { query: 'search string', count: 10 },
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          },
     *          { 'Accept': 'application/json' );
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
     * @alias module:net/DataSourceApi.getNoCache
     *
     * @desc Makes a GET request and calls the callback with the response.
     *    It is explicitly bypassing cache and always do networking.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [headers]
          Request headers as an associative array (string -> string).
     *
     * @example
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.getNoCache(
     *          'http://localhost:9090/web-portal/myendpoint/action',
     *          { query: 'search string', count: 10 },
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          },
     *          { 'Accept': 'application/json' );
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
     * @alias module:net/DataSourceApi.patch
     *
     * @desc Makes a PATCH request and calls the callback with the response.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} data
     *    The form data to be sent in the body.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [headers]
     *    Request headers as an associative array (string -> string).
     *
     * @example
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.patch(
     *          'http://localhost:9090/web-portal/myendpoint/action',
     *          { query: 'search string', count: 10 },
     *          { param1: "value1, param2: "value2},
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          },
     *          { 'Accept': 'application/json' );
     */
    patch: function (endpoint, data, params, callback, headers) {
        processRequest(
            {
                type: PATCH_REQUEST,
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
     * @alias module:net/DataSourceApi.post
     *
     * @desc Makes a POST request and calls the callback with the response.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} data
     *    The form data to be sent in the body.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [files]
     *    The files to be attached to the request. Will be sent as 'multipart/form-data`.
     * @param {object} [headers]
     *    Request headers as an associative array (string -> string).
     *
     * @example
     *
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.post(
     *          'myendpoint/action',
     *          {postParam: 'p1'},
     *          {queryParam: 'q1'},
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          });
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
     * @alias module:net/DataSourceApi.put
     *
     * @desc Makes a PUT request and calls the callback with the response.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} data
     *    The form data to be sent in the body.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [headers]
     *    Request headers as an associative array (string -> string).
     *
     * @example
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.put(
     *          'http://localhost:9090/web-portal/myendpoint/action',
     *          { query: 'search string', count: 10 },
     *          { param1: "value1, param2: "value2},
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          },
     *          { 'Accept': 'application/json' );
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
     * @alias module:net/DataSourceApi.doDelete
     *
     * @desc Makes a DELETE request and calls the callback with the response.
     *
     * @param {string} endpoint
     *    The endpoint to send the request to.
     * @param {object} params
     *    The request query parameters as an associative array (string -> string).
     * @param {module:net/DataSourceApi.responseCallback} callback
     *    Callback to be triggered once response is ready.
     * @param {object} [headers]
     *    Request headers as an associative array (string -> string).
     *
     * @example
     *      var api = require('ui-library/src/net/DataSourceAPI');
     *
     *      api.doDelete(
     *          'http://localhost:9090/web-portal/resource/123',
     *          { query: 'search string', count: 10 },
     *          function(response) {
     *              if (!response.error) {
     *                  console.log('Received ' + response.status + ' with data: ' + response.data);
     *              } else {
     *                  console.log('Received error: '  + response.error);
     *              }
     *          },
     *          { 'Accept': 'application/json' );
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
