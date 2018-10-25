jest.dontMock("../DataSourceApi");

var api;
var callback;
var cacheGet, cachePatch, cachePut, cacheClear;
var superagent = require("superagent");
var response;


// helpers
var verifyResponse = function (responseCallback, expectedResponse, expectedCachedData, error) {
    expect(responseCallback.mock.calls.length).toEqual(1);

    expect(responseCallback.mock.calls[0][0].status).toEqual(expectedResponse.status);
    expect(responseCallback.mock.calls[0][0].headers).toEqual(expectedResponse.header);
    expect(responseCallback.mock.calls[0][0].data).toEqual(expectedResponse.body);
    expect(responseCallback.mock.calls[0][0].error).toEqual(error ? error : "");

    expect(responseCallback.mock.calls[0][0].fromCache).toEqual(expectedCachedData);
};

describe("DataSourceApi", function () {
    callback = jest.fn();

    // by default no request exists in the cache
    cacheGet = jest.fn();
    cachePatch = jest.fn().mockReturnValue(true);
    cachePut = jest.fn().mockReturnValue(true);
    cacheClear = jest.fn();

    beforeEach(function () {
        callback.mockReset();
        cacheGet.mockReset();
        cachePatch.mockReset();
        cachePut.mockReset();
        cacheClear.mockReset();

        //reset the super agent mocks
        jest.clearAllMocks();


        // configure the cache mock instance, to allow controlling the cache mock
        var cacheExports = function () {
            this.get = cacheGet;
            this.patch = cachePatch;
            this.put = cachePut;
            this.clear = cacheClear;
        };
        jest.setMock("../Cache", cacheExports);

        api = require("../DataSourceApi");

        // allow customizing the superagent mock/response (I need it for mocking response w/ errors)
        response = {
            status: 200,
            body: "value",
            header: []
        };
        superagent.request.response = response;
    });

    it("retrieves GET requests from cache", function () {
        // mock the cache GET to respond as if the request has been cached
        cacheGet.mockReturnValue(response);

        api.get("/testendpoint", { param: "testGET" }, callback);

        expect(cacheGet.mock.calls.length).toEqual(1);

        // the response returned is the object returned by the cache GET
        // (see the mock return value above)
        expect(callback.mock.calls[0][0]).toBe(response);
        // the fromCache property should have been modified to be true
        expect(callback.mock.calls[0][0].fromCache).toBeTruthy();
    });

    it("performs and caches GET requests", function () {
        api.get("/testendpoint", { param: "testGET" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have been called (but it returned undefined)
        expect(cacheGet.mock.calls.length).toEqual(1);

        // verify that the response has been added to the cache
        expect(cachePut.mock.calls.length).toEqual(1);
        expect(cachePut.mock.calls[0][0]).toEqual('/testendpoint{"param":"testGET"}');

        // the cache CLEAR should have not been called
        expect(cacheClear.mock.calls.length).toEqual(0);

        // verify that the respnse sent to the cache is correct
        var putResponse = cachePut.mock.calls[0][1];
        expect(putResponse.error).toEqual("");
        expect(putResponse.fromCache).toBeFalsy();
        expect(putResponse.status).toEqual(response.status);
        expect(putResponse.headers).toEqual(response.header);
        expect(putResponse.data).toEqual(response.body);
    });

    it("performs GET requests bypassing the cache", function () {
        api.getNoCache("/testendpoint", { param: "testGETnocache" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have not been called
        expect(cacheGet.mock.calls.length).toEqual(0);

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have not been called
        expect(cacheClear.mock.calls.length).toEqual(0);
    });

    it("performs POST requests with no files", function () {
        api.post("/testendpoint", {}, { param: "testPOST" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have not been called
        expect(cacheGet.mock.calls.length).toEqual(0);

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });

    it("data is set in POST requests", function () {
        var data = {
            name: "value",
            "another name": "some value"
        };

        api.post("/testendpoint", data, { param: "testPOST" }, callback);

        expect(superagent.request.send.mock.calls.length).toEqual(1);
        expect(superagent.request.send.mock.calls[0][0]).toBe(data);

        expect(superagent.request.field.mock.calls.length).toEqual(0);
        expect(superagent.request.attach.mock.calls.length).toEqual(0);
    });

    it("data and files are set in POST requests", function () {
        var data = {
            name: "value",
            "another name": "some value"
        };
        var files = {
            file1: {},
            file2: {}
        };

        api.post("/testendpoint", data, { param: "testPOST" }, callback, files);

        expect(superagent.request.send.mock.calls.length).toEqual(0);

        expect(superagent.request.field.mock.calls.length).toEqual(2);
        expect(superagent.request.field.mock.calls[0][0]).toEqual("name");
        expect(superagent.request.field.mock.calls[0][1]).toEqual("value");
        expect(superagent.request.field.mock.calls[1][0]).toEqual("another name");
        expect(superagent.request.field.mock.calls[1][1]).toEqual("some value");

        expect(superagent.request.attach.mock.calls.length).toEqual(2);
        expect(superagent.request.attach.mock.calls[0][0]).toEqual("file1");
        expect(superagent.request.attach.mock.calls[0][1]).toEqual(files.file1);
        expect(superagent.request.attach.mock.calls[1][0]).toEqual("file2");
        expect(superagent.request.attach.mock.calls[1][1]).toEqual(files.file2);
    });

    it("performs PATCH requests", function () {
        api.patch("/testendpoint", {}, { param: "testPATCH" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have not been called
        expect(cacheGet.mock.calls.length).toEqual(0);

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });

    it("performs PUT requests", function () {
        api.put("/testendpoint", {}, { param: "testPUT" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have not been called
        expect(cacheGet.mock.calls.length).toEqual(0);

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });

    it("performs DELETE requests", function () {
        api.doDelete("/testendpoint", { param: "testDELETE" }, callback);

        verifyResponse(callback, response, false);

        // the cache GET should have not been called
        expect(cacheGet.mock.calls.length).toEqual(0);

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });

    it("clears cache on response error", function () {
        response.error = { message: "validation_error" };
        api.get("/testendpoint", { param: "testGET" }, callback);

        verifyResponse(callback, response, false, "validation_error");

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have not been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });



    it("clears cache on response error text in body", function () {
        response.text = "ERROR";
        api.get("/testendpoint", { param: "testGET" }, callback);

        verifyResponse(callback, response, false, "ERROR");

        // the cache PATCH should have not been called
        expect(cachePatch.mock.calls.length).toEqual(0);

        // the cache PUT should have not been called
        expect(cachePut.mock.calls.length).toEqual(0);

        // the cache CLEAR should have not been called
        expect(cacheClear.mock.calls.length).toEqual(1);
    });

    it("send headers to server", function () {
        api.put("/testendpoint",
                {},
                { param: "testPOST" },
                callback,
                { "xsrf-token": "abc", Accept: "text/plain" });

        expect(superagent.request.set.mock.calls.length).toEqual(2);

        expect(superagent.request.set.mock.calls[0][0]).toEqual("Accept");
        expect(superagent.request.set.mock.calls[0][1]).toEqual("text/plain");

        expect(superagent.request.set.mock.calls[1][0]).toEqual("xsrf-token");
        expect(superagent.request.set.mock.calls[1][1]).toEqual("abc");
    });

    it("send default accept header to server", function () {
        api.get("/testendpoint", { param: "testGETnocache" }, callback);

        expect(superagent.request.set.mock.calls.length).toEqual(1);
        expect(superagent.request.set.mock.calls[0][0]).toEqual("Accept");
        expect(superagent.request.set.mock.calls[0][1]).toEqual("application/json, text/plain, */*");
    });

    it("expect error message from error response body", function () {
        var errorMessage = "this is an error";

        superagent.request.end =jest.fn().mockImplementation(function(cb) {
            var mockError = {
                response: {
                    body: {
                        message: errorMessage
                    }
                }
            };
            cb(mockError, response);
        });
        api.get(null, null, callback);
        verifyResponse(callback, response, false, errorMessage);
    });
    it("expect error message from error response error", function () {
        var errorMessage = "this is an error";

        superagent.request.end =jest.fn().mockImplementation(function(cb) {
            var mockError = {
                response: {
                    error: {
                        message: errorMessage
                    }
                }
            };
            cb(mockError, response);
        });
        api.get(null, null, callback);
        verifyResponse(callback, response, false, errorMessage);
    });
    it("expect empty error message when error respnse is null", function () {
        superagent.request.end =jest.fn().mockImplementation(function(cb) {
            var mockError = {
                response: null
            };
            cb(mockError, response);
        });
        api.get(null, null, callback);
        verifyResponse(callback, response, false, "");
    });

});
