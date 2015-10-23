/*eslint-disable no-unused-vars */
var request = {
    // to allow customizing the mock response in jest tests
    response: {
        header: [],
        status: 200
    },

    query: jest.genMockFunction().mockReturnThis(),
    send: jest.genMockFunction().mockReturnThis(),
    end: jest.genMockFunction().mockImplementation(function (callback) {
        callback(this.response);
    }),
    set: jest.genMockFunction().mockImplementation(function (name, value) {
        return request;
    }),
    field: jest.genMockFunction().mockImplementation(function (name, value) {
        return request;
    }),
    attach: jest.genMockFunction().mockImplementation(function (name, value) {
        return request;
    })
};

var agent = {
    // to allow customizing the request/response in jest tests
    request: request,

    get: jest.genMockFunction().mockImplementation(function (path) {
        return this.request;
    }),
    post: jest.genMockFunction().mockImplementation(function (path) {
        return this.request;
    }),
    put: jest.genMockFunction().mockImplementation(function (path) {
        return this.request;
    }),
    del: jest.genMockFunction().mockImplementation(function (path) {
        return this.request;
    })
};
/*eslint-enable no-unused-vars */

module.exports = agent;
