window.__DEV__ = true;

jest.dontMock("../CsrfDataSourceApi");

describe("CsrfDataSourceApi", function () {
    var api, callback, apiExport;

    beforeEach(function () {
        // configure the DataSourceApi mock instance, to allow controlling the DataSourceApi mock
        apiExport = {
            get: jest.genMockFunction(),
            getNoCache: jest.genMockFunction(),
            post: jest.genMockFunction(),
            put: jest.genMockFunction(),
            doDelete: jest.genMockFunction()
        };
        jest.setMock("../DataSourceApi", apiExport);

        api = require("../CsrfDataSourceApi");

        api._loadConfig({
            rootPath: "/web-portal/",
            csrfHeaderName: "X-CSRF-TOKEN",
            csrfCookieName: "web-portal-csrf"
        });

        callback = jest.genMockFunction();

        // delete the cookies with the 2 main names used in this test class;
        // if a test uses a different name, it has to be deleted explicitly
        document.cookie = "web-portal-csrf=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        document.cookie = "application-csrf=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

        api.callbacks.before = [];
        api.callbacks.after = [];
    });

    function testUnaffectedByMiddleware (method, params) {
        var callbackIndex = params.findIndex(function (i) { return typeof(i) === "function"; });

        apiExport[method] = jest.genMockFunction();
        api[method].apply(null, params);

        //execute the callback
        apiExport[method].mock.calls[0][callbackIndex]({
            headers: []
        });

        expect(params[callbackIndex]).toBeCalled();
    }

    it("GET is called", function () {
        var params = { param1: "value 1" };
        api.get("endpoint", params, callback);

        expect(apiExport.get.mock.calls.length).toEqual(1);
        expect(apiExport.get.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.get.mock.calls[0][1]).toBe(params);
    });

    it("GET no cache is called", function () {
        var params = { param1: "value 1" };
        api.getNoCache("endpoint", params, callback);

        expect(apiExport.getNoCache.mock.calls.length).toEqual(1);
        expect(apiExport.getNoCache.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.getNoCache.mock.calls[0][1]).toBe(params);
    });

    it("POST is called with CSRF token", function () {
        document.cookie = "web-portal-csrf=token; max-age=3600; path=/";

        var params = { param1: "value 1" };
        var data = { "field name 1": "field value" };
        var files = { filename: "file content" };
        api.post("endpoint", data, params, callback, files);

        expect(apiExport.post.mock.calls.length).toEqual(1);
        expect(apiExport.post.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.post.mock.calls[0][1]).toBe(data);
        expect(apiExport.post.mock.calls[0][2]).toBe(params);
        expect(apiExport.post.mock.calls[0][4]).toBe(files);

        // check the CSRF token which was retrieved from the document cookie
        expect(apiExport.post.mock.calls[0][5]["X-CSRF-TOKEN"]).toEqual("token");
    });

    it("PUT is called with CSRF token", function () {
        document.cookie = "web-portal-csrf=token; max-age=3600; path=/";

        var params = { param1: "value 1" };
        var data = { "field name 1": "field value" };
        api.put("endpoint", data, params, callback);

        expect(apiExport.put.mock.calls.length).toEqual(1);
        expect(apiExport.put.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.put.mock.calls[0][1]).toBe(data);
        expect(apiExport.put.mock.calls[0][2]).toBe(params);

        // check the CSRF token which was retrieved from the document cookie
        expect(apiExport.put.mock.calls[0][4]["X-CSRF-TOKEN"]).toEqual("token");
    });

    it("DELETE is called with CSRF token", function () {
        document.cookie = "web-portal-csrf=token; max-age=3600; path=/";

        var params = { param1: "value 1" };
        api.doDelete("endpoint", params, callback);

        expect(apiExport.doDelete.mock.calls.length).toEqual(1);
        expect(apiExport.doDelete.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.doDelete.mock.calls[0][1]).toBe(params);

        // check the CSRF token which was retrieved from the document cookie
        expect(apiExport.doDelete.mock.calls[0][3]["X-CSRF-TOKEN"]).toEqual("token");
    });

    it("set CSRF cookie on GET response", function () {
        // mock the get function in the core DataSourceApi, so that it calls the callback function
        apiExport.get = jest.genMockFunction().mockImplementation(function (endpoint, params, callbackFn) {
            callbackFn({
                headers: {
                    "x-csrf-token": "VALUE"
                }
            });
        });

        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        api.get("endpoint", {}, callback);

        // the cookie must have been set by the get method call
        expect(document.cookie).toEqual("web-portal-csrf=VALUE");

        expect(callback.mock.calls.length).toEqual(1);
    });

    it("set CSRF cookie on GET no cache response", function () {
        // mock the get function in the core DataSourceApi, so that it calls the callback function
        apiExport.getNoCache = jest.genMockFunction().mockImplementation(function (endpoint, params, callbackFn) {
            callbackFn({
                headers: {
                    "x-csrf-token": "VALUE"
                }
            });
        });

        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        api.getNoCache("endpoint", {}, callback);

        // the cookie must have been set by the get method call
        expect(document.cookie).toEqual("web-portal-csrf=VALUE");

        expect(callback.mock.calls.length).toEqual(1);
    });

    it("doesn't set cookie if there's no such header in GET response", function () {
        // mock the get function in the core DataSourceApi, so that it calls the callback function
        apiExport.get = jest.genMockFunction().mockImplementation(function (endpoint, params, callbackFn) {
            callbackFn({
                headers: {}
            });
        });

        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        api.get("endpoint", {}, callback);

        // the cookie must have not been set by the get method call, this is the default value
        expect(document.cookie).toEqual("");
    });

    it("doesn't send CSRF token if no such cookie exists", function () {
        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        var params = { param1: "value 1" };
        api.doDelete("endpoint", params, callback);

        expect(apiExport.doDelete.mock.calls.length).toEqual(1);
        expect(apiExport.doDelete.mock.calls[0][0]).toEqual("/web-portal/endpoint");
        expect(apiExport.doDelete.mock.calls[0][1]).toBe(params);

        // check the CSRF token sent is the defeault one
        expect(apiExport.doDelete.mock.calls[0][3]).toEqual({});
    });

    it("use default cookie name if none provided", function () {
        api._loadConfig({
            rootPath: "/web-portal/",
            csrfHeaderName: "X-CSRF-TOKEN",
        });

        // mock the get function in the core DataSourceApi, so that it calls the callback function
        apiExport.get = jest.genMockFunction().mockImplementation(function (endpoint, params, callbackFn) {
            callbackFn({
                headers: {
                    "x-csrf-token": "VALUE"
                }
            });
        });

        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        // make a GET request
        api.get("endpoint", {}, callback);

        // the cookie must have been set by the get method call
        expect(document.cookie).toEqual("application-csrf=VALUE");

        // make a PUT request
        api.put("endpoint", {}, {}, callback);

        // one such request should've been sent out
        expect(apiExport.put.mock.calls.length).toEqual(1);

        // check the CSRF token which was retrieved from the document cookie
        expect(apiExport.put.mock.calls[0][4]["X-CSRF-TOKEN"]).toEqual("VALUE");
    });

    it("set '' as default root path if none provided", function () {
        api._loadConfig({});

        api.get("endpoint", {}, callback);

        expect(apiExport.get.mock.calls.length).toEqual(1);
        expect(apiExport.get.mock.calls[0][0]).toEqual("endpoint");
    });

    it("does not parse/store token if the header name is not specified", function () {
        api._loadConfig({
            rootPath: "/web-portal/",
            csrfCookieName: "web-portal-csrf"
        });

        // mock the get function in the core DataSourceApi, so that it calls the callback function
        apiExport.get = jest.genMockFunction().mockImplementation(function (endpoint, params, callbackFn) {
            callbackFn({
                headers: {
                    "x-csrf-token": "VALUE"
                }
            });
        });

        // verify that there's no cookie set already
        expect(document.cookie).toEqual("");

        // make a GET request
        api.get("endpoint", {}, callback);

        // no cookie must have been set by the get method call
        expect(document.cookie).toEqual("");

        // make a PUT request
        api.put("endpoint", {}, {}, callback);

        // one such request should've been sent out
        expect(apiExport.put.mock.calls.length).toEqual(1);

        // check that the headers on the PUT request are empty
        expect(apiExport.put.mock.calls[0][4]).toEqual({});
    });

    it("register middleware callback", function () {
        var cb = jest.genMockFunction();

        expect(api.callbacks.before).toEqual([]);

        api.registerMiddleware("before", cb);
        expect(api.callbacks.before).toEqual([cb]);
    });

    it("unregister middleware callback by index", function () {
        var cb = jest.genMockFunction();

        api.registerMiddleware("before", cb);
        expect(api.callbacks.before).toEqual([cb]);

        api.unregisterMiddleware("before", cb);
        expect(api.callbacks.before).toEqual([]);
    });

    it("unregister middleware callback", function () {
        var cb = jest.genMockFunction();

        api.registerMiddleware("before", cb);
        expect(api.callbacks.before).toEqual([cb]);

        api.unregisterMiddleware("before", cb);
        expect(api.callbacks.before).toEqual([]);
    });

    it("unregister all middleware callback", function () {
        var cbBefore = jest.genMockFunction();
        api.registerMiddleware("before", cbBefore);
        expect(api.callbacks.before).toEqual([cbBefore]);

        var cbAfter = jest.genMockFunction();
        api.registerMiddleware("after", cbAfter);
        expect(api.callbacks.before).toEqual([cbAfter]);

        api.unregisterAllMiddleware();
        expect(api.callbacks.before).toEqual([]);
        expect(api.callbacks.after).toEqual([]);
    });

    it("get without middleware", function () {
        testUnaffectedByMiddleware("get", ["/some/url", {}, jest.genMockFunction()]);
    });

    it("getNoCache without middleware", function () {
        testUnaffectedByMiddleware("getNoCache", ["/some/url", {}, jest.genMockFunction()]);
    });

    it("post without middleware", function () {
        testUnaffectedByMiddleware("post", ["/some/url", { some: "data" }, {}, jest.genMockFunction()]);
    });

    it("put without middleware", function () {
        testUnaffectedByMiddleware("put", ["/some/url", { some: "data" }, {}, jest.genMockFunction()]);
    });

    it("delete without middleware", function () {
        testUnaffectedByMiddleware("doDelete", ["/some/url", {}, jest.genMockFunction()]);
    });

    it("executes callback", function () {
        var before = jest.genMockFunction();
        var after = jest.genMockFunction();
        var cb = jest.genMockFunction();

        api.registerMiddleware("before", before);
        api.registerMiddleware("after", after);
        api.get("blah", null, cb);

        expect(before).toBeCalled();
        expect(after).not.toBeCalled();

        //execute the callback
        apiExport.get.mock.calls[0][2]({
            headers: []
        });

        expect(after).toBeCalled();
    });

    it("skips callback if middleware returns false", function () {
        var after = jest.genMockFunction().mockReturnValue(false);
        var cb = jest.genMockFunction();

        api.registerMiddleware("after", after);
        api.get("blah", null, cb);

        //execute the callback
        apiExport.get.mock.calls[0][2]({
            headers: []
        });

        expect(cb).not.toBeCalled();
    });
});
