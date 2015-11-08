jest.dontMock("../Cache");
jest.dontMock("../../constants/CacheConstants");

// mock the browser's sessionStorage
var mock = (function () {
    var store = {};
    return {
        getItem: function (key) {
            return store[key];
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        }
    };
})();
Object.defineProperty(window, "sessionStorage", { value: mock });

// test constants
var KEY = "myKey", VALUE = "myValue", NAME = "test-cache", TIMEOUT = 0.2,
    KEY2 = "myOtherKey", VALUE2 = "myOtherValue";

// helpers
function sleep (seconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i = i + 1) {
        if ((new Date().getTime() - start) > seconds * 1000) {
            break;
        }
    }
}

describe("Cache", function () {
    var Constants = require("../../constants/CacheConstants");
    var Cache = require("../Cache");
    var localCache, memoryCache;

    beforeEach(function () {
        localCache = new Cache(Constants.CacheTypes.LOCAL, NAME, TIMEOUT);
        memoryCache = new Cache(Constants.CacheTypes.MEMORY, NAME, TIMEOUT);
    });

    it("instantiates correctly (local cache)", function () {
        expect(localCache).not.toBeNull();
    });

    it("instantiates correctly (memory cache)", function () {
        expect(memoryCache).not.toBeNull();
    });

    it("throws error if parameters are incorrect", function () {
        var invalidName = "Cache name is required",
            invalidType = "Invalid cache type",
            invalidExpiry = "Expiry time for cache is required and should be greater than zero";
        expect(function () {
            return new Cache(Constants.CacheTypes.MEMORY);
        }).toThrow(new Error(invalidName));
        expect(function () {
            return new Cache(Constants.CacheTypes.MEMORY, NAME);
        }).toThrow(new Error(invalidExpiry));
        expect(function () {
            return new Cache(Constants.CacheTypes.MEMORY, NAME, 0);
        }).toThrow(new Error(invalidExpiry));
        expect(function () {
            return new Cache();
        }).toThrow(new Error(invalidType));
        expect(function () {
            return new Cache(NAME);
        }).toThrow(new Error(invalidType));
    });

    it("puts a value in the local cache", function () {
        // happy path
        var ok = localCache.put(KEY, VALUE);
        expect(ok).toBeTruthy();
        // edge cases
        ok = localCache.put();
        expect(ok).toBeFalsy();
    });

    it("puts a value in the memory cache", function () {
        // happy path
        var ok = memoryCache.put(KEY, VALUE);
        expect(ok).toBeTruthy();
        // edge cases
        ok = memoryCache.put();
        expect(ok).toBeFalsy();
    });

    it("gets value from local cache", function () {
        localCache.put(KEY, VALUE);
        var value = localCache.get(KEY);
        expect(value).toEqual(VALUE, NAME);
    });

    it("gets value from memory cache", function () {
        memoryCache.put(KEY, VALUE);
        var value = memoryCache.get(KEY);
        expect(value).toEqual(VALUE, NAME);
    });

    it("clears the local cache", function () {
        localCache.put(KEY, VALUE);
        localCache.clear();
        var value = localCache.get(KEY);
        expect(value).toBeFalsy();
    });

    it("clears the memory cache", function () {
        memoryCache.put(KEY, VALUE);
        memoryCache.clear();
        var value = memoryCache.get(KEY);
        expect(value).toBeFalsy();
    });

    it("handles timeouts correctly in the local cache", function () {
        localCache.put(KEY, VALUE);
        sleep(TIMEOUT / 2);
        localCache.put(KEY2, VALUE2);
        sleep(TIMEOUT / 2);
        expect(localCache.get(KEY)).toBeFalsy();
        expect(localCache.get(KEY2)).toBeTruthy();
        sleep(TIMEOUT / 2);
        expect(localCache.get(KEY2)).toBeFalsy();
    });

    it("handles timeouts correctly in the memory cache", function () {
        memoryCache.put(KEY, VALUE);
        sleep(TIMEOUT / 2);
        memoryCache.put(KEY2, VALUE2);
        sleep(TIMEOUT / 2);
        expect(memoryCache.get(KEY)).toBeFalsy();
        expect(memoryCache.get(KEY2)).toBeTruthy();
        sleep(TIMEOUT / 2);
        expect(memoryCache.get(KEY2)).toBeFalsy();
    });
});
