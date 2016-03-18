"use strict";

var Api = {
    get: jest.genMockFunction(),
    getNoCache: jest.genMockFunction(),
    post: jest.genMockFunction(),
    put: jest.genMockFunction(),
    doDelete: jest.genMockFunction()
};

var CsrfApi = function (config) { // eslint-disable-line no-unused-vars
    return Api;
};

module.exports = CsrfApi;
