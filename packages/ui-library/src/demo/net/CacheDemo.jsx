/*eslint-disable valid-jsdoc*/

//For some very odd reason linting picks up the "/**"  JSDoc definitions of the @alias as having a JSDoc syntax error. So we disable.

var React = require("react");
var Cache = require("../../net/Cache");

/**
* @name CacheDemo
* @memberof module:net/Cache
* @desc A demo for Cache
*/

function sleep (seconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i = i + 1) {
        if ((new Date().getTime() - start) > seconds * 1000) {
            break;
        }
    }
}

var KEY = "myKey", VALUE = "myValue", CACHE_NAME = "local-cache",
    TIMEOUT = 0.2;

var CacheDemo = React.createClass({
    getInitialState: function () {
        return {
            localCache: new Cache("LOCAL", CACHE_NAME, TIMEOUT)
        };
    },

    render: function () {
        this.state.localCache.put(KEY, VALUE);
        var putGetBlock = (
            <div>
                <span>Cache PUT/GET: {this.state.localCache.get(KEY) === VALUE ? "PASS" : "FAIL"}</span><br />
            </div>
        );

        sleep(TIMEOUT);
        var timeoutBlock = (
            <div>
                <span>Cache timeout: {this.state.localCache.get(KEY) ? "FAIL" : "PASS"}</span><br />
            </div>
        );

        this.state.localCache.put(KEY, VALUE);
        this.state.localCache.clear();
        var clearBlock = (
            <div>
                <span>Cache clear: {this.state.localCache.get(KEY) ? "FAIL" : "PASS"}</span>
            </div>
        );

        return (
            <div>
                {putGetBlock}
                {timeoutBlock}
                {clearBlock}
            </div>
        );
    }
});

module.exports = CacheDemo;
