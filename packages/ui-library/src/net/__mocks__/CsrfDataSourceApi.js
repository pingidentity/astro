"use strict";

var CsrfApi = {
    MiddlewareTiming: {
        CALL_BEFORE_REQUEST: "before",
        CALL_AFTER_RESPONSE: "after"
    },
    registerMiddleware: jest.fn(),
    unregisterMiddleware: jest.fn(),
    unregisterAllMiddleware: jest.fn(),
    _loadConfig: jest.fn(),
    _execMiddlewareCallbacks: jest.fn(),
    _handleResponse: jest.fn(),
    get: jest.fn(),
    getNoCache: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    doDelete: jest.fn(),

};

module.exports = CsrfApi;
