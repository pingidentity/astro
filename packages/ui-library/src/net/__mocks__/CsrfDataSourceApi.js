"use strict";

var CsrfApi = {
    MiddlewareTiming: {
        CALL_BEFORE_REQUEST: "before",
        CALL_AFTER_RESPONSE: "after"
    },
    registerMiddleware: jest.genMockFunction(),
    unregisterMiddleware: jest.genMockFunction(),
    unregisterAllMiddleware: jest.genMockFunction(),
    _loadConfig: jest.genMockFunction(),
    _execMiddlewareCallbacks: jest.genMockFunction(),
    _handleResponse: jest.genMockFunction(),
    get: jest.genMockFunction(),
    getNoCache: jest.genMockFunction(),
    post: jest.genMockFunction(),
    put: jest.genMockFunction(),
    doDelete: jest.genMockFunction(),

};

module.exports = CsrfApi;
