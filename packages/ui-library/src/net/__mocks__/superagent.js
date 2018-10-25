/*eslint-disable no-unused-vars */
var request = {
    // to allow customizing the mock response in jest tests
    response: {
        header: [],
        status: 200
    },

    query: jest.fn().mockReturnThis(),
    send: jest.fn().mockReturnThis(),
    end: jest.fn().mockImplementation(function (callback) {
        callback(null, this.response);
    }),
    set: jest.fn().mockImplementation(function (name, value) {
        return request;
    }),
    field: jest.fn().mockImplementation(function (name, value) {
        return request;
    }),
    attach: jest.fn().mockImplementation(function (name, value) {
        return request;
    })
};

var agent = {
    // to allow customizing the request/response in jest tests
    request: request,

    get: jest.fn().mockImplementation(function (path) {
        return this.request;
    }),
    patch: jest.fn().mockImplementation(function (path) {
        return this.request;
    }),
    post: jest.fn().mockImplementation(function (path) {
        return this.request;
    }),
    put: jest.fn().mockImplementation(function (path) {
        return this.request;
    }),
    del: jest.fn().mockImplementation(function (path) {
        return this.request;
    })
};
/*eslint-enable no-unused-vars */

module.exports = agent;
