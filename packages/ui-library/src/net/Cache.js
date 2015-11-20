var Constants = require("../constants/CacheConstants");

/**
 * @desc Class object dedicated to data caching
 * @param {constants/CacheConstants#CacheTypes} type the cache type
 * @param {String} name the cache's name
 * @param {Number} expiry cache expiry time in seconds
 * @example
 * var cache = new Cache('LOCAL', 'usersStore', 180);
 */
function Cache (type, name, expiry) {
    if (type !== Constants.CacheTypes.LOCAL && type !== Constants.CacheTypes.MEMORY) {
        throw "Invalid cache type";
    }
    if (!name) {
        throw "Cache name is required";
    }
    if (!expiry || expiry <= 0) {
        throw "Expiry time for cache is required and should be greater than zero";
    }
    this.cache = {
        expiry: expiry,
        data: {}
    };
    this.name = name;
    this.type = type;
    if (this.type === Constants.CacheTypes.LOCAL) {
        if (!sessionStorage.getItem(name)) {
            sessionStorage.setItem(name, JSON.stringify(this.cache));
        }
    }
}

/**
 * @public
 * @desc Clear the cache.
 */
Cache.prototype.clear = function () {
    if (this.type === Constants.CacheTypes.LOCAL) {
        var myCache = JSON.parse(sessionStorage.getItem(this.name));
        myCache.data = {};
        sessionStorage.setItem(this.name, JSON.stringify(myCache));
    } else {
        this.cache.data = {};
    }
};

/**
 * @public
 * @desc Get an item from the cache.
 * @param {*} key the item's key
 * @return {*} the value in the cache for the given key, otherwise undefined
 */
Cache.prototype.get = function (key) {
    var now = new Date().getTime(), myCache;
    if (this.type === Constants.CacheTypes.LOCAL) {
        myCache = JSON.parse(sessionStorage.getItem(this.name));
    } else { // default to memory cache
        myCache = this.cache;
    }
    var record = myCache.data[key];
    if (!record) {
        // the record is not in the cache
        return;
    }
    // check if the data is still valid
    if (now - record.createdAt >= myCache.expiry * 1000) {
        myCache.data[key] = null;
        return; // data has expired, so return a miss
    }
    return record.item;
};

/**
 * @public
 * @desc Put an item in the cache.
 * @param {*} key the item's key
 * @param {*} item the item
 * @returns {boolean} true if successfully stored, false otherwise
 */
Cache.prototype.put = function (key, item) {
    try {
        if (!key) {
            // no key, no cache!
            return false;
        }
        var record = {
            item: item,
            createdAt: new Date().getTime()
        };
        if (this.type === Constants.CacheTypes.LOCAL) {
            var localCache = JSON.parse(sessionStorage.getItem(this.name));
            localCache.data[key] = record;
            sessionStorage.setItem(this.name, JSON.stringify(localCache));
        } else { // default to memory cache
            this.cache.data[key] = record;
        }
        return true;
    } catch (e) {
        return false;
    }
};

// export the class
module.exports = Cache;
