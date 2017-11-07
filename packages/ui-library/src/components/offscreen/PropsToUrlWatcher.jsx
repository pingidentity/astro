var PropTypes = require("prop-types");
var React = require("react"),
    update = require("re-mutable"),
    _ = require("underscore");

/**
 * @callback PropsToUrlWatcher~onReplaceUrl
 * @param {string} url
 *              Formatted url with params
 */

/**
 * @class PropsToUrlWatcher
 * @desc This component can be used to monitor properties and write them to the url by passing in properties as a
 * hash to the watch property.
 *
 * @param {string} [data-id="props-to-url-watcher"]
 *              To define the base "data-id" value for the top-level HTML container.
 * @param {object} watch
 *              A hash of properties watch.  When their values change, a new string will be generated
 *              and passed to the callback.
 * @param {object} location
 *              The React Router's location object
 * @param {bool} [ignoreFalse=false]
 *              An option which treats false as undefined and skips writing them to the url
 * @param {PropsToUrlWatcher~onReplaceUrl} onReplaceUrl
 *              A callback to replace the history object.  Typically this will just be the replace action creator
 *              from react-router-redux
 *
 * @example:
 * var App = React.createClass({
 *     render: function () {
 *         return (
 *             <div>
 *                 <PropsToUrlWatcher onReplaceUrl={this.routerActions.replace} watch={{ prop1: this.props.prop1 ... }} />
 *                 ...
 *         );
 *     }
 * })
 */
class PropsToUrlWatcher extends React.Component {
    static propTypes = {
        watch: PropTypes.object.isRequired,
        onReplaceUrl: PropTypes.func.isRequired,
        location: PropTypes.object.isRequired
    };

    static defaultProps = {
        "data-id": "props-to-url-watcher"
    };

    /**
     * @method
     * @name PropsToUrlWatcher#shouldComponentUpdate
     * @desc since this is an offscreen component, never update the dom
     * @returns {bool} - false
     */
    shouldComponentUpdate() {
        return false;
    }

    /**
     * @method
     * @name PropsToUrlWatcher#componentWillReceiveProps
     * @desc When new properties are received by the component, this function will compare them to the previous
     * props, determine if anything has changed, and if so, recompute the query string and push it to the callback.
     * @param {object} nextProps - next props
     */
    componentWillReceiveProps(nextProps) {
        var vals = [], v;

        //only recompute the string if the input props have changed
        if ( _.isEqual(this.props.watch, nextProps.watch) &&   //list of props to watch changed
            nextProps.ignoreFalse === this.props.ignoreFalse)  //or the option to ignoreFalse changed
        {
            return;
        }

        for (var key in nextProps.watch) {
            v = nextProps.watch[key];

            switch (typeof(v)) {
                case "object":
                    //since arrays evaluate as object, have a condition to catch this and treat them differntly.
                    //Arrays will be written to the query string as key=val1,val2,val3&...
                    if (_.isArray(v)) {
                        vals.push(key + "=" + v.join(","));
                        break;
                    }

                    for (var subKey in v) {
                        //TODO: some day build the ability to have any level of depth but practically speaking
                        // this is generally not necessary.
                        if (typeof(v[subKey]) === "object") {
                            throw "cannot watch a key which maps to an hash of hashes";
                        }

                        if (nextProps.ignoreFalse && v[subKey] === false) {
                            continue;
                        }

                        vals.push(key + "." + subKey + "=" + v[subKey]);
                    }
                    break;
                case "null":
                    //here to make Alex happy though it's unnecessary because _.pick skips nulls
                    break;
                case "boolean":
                    if (v || !nextProps.ignoreFalse) {
                        vals.push(key + "=" + v);
                    }
                    break;
                default:
                    vals.push(key + "=" + v);
                    break;
            }
        }

        this.props.onReplaceUrl(this.props.location.pathname + "?" + vals.join("&"));
    }

    render() {
        return <div data-id={this.props["data-id"]} style={{ display: "none" }} />;
    }
}

/**
 * @memberof PropsToUrlWatcher
 * @function getBool
 * @param {object} location - ReactRouter's location object
 * @param {string} key - The Key we'd like to extract from the query string
 * @return {bool} - the value
 */
PropsToUrlWatcher.getBool = function (location, key) {
    return location.query[key] === "true";
};

/**
 * @memberof PropsToUrlWatcher
 * @function getNum
 * @param {object} location - ReactRouter's location object
 * @param {string} key - The Key we'd like to extract from the query string
 * @return {number} - the number
 */
PropsToUrlWatcher.getNum = function (location, key) {
    return parseFloat(location.query[key]);
};

/**
 * @memberof PropsToUrlWatcher
 * @function getArray
 * @param {object} location - ReactRouter's location object
 * @param {string} key - The Key we'd like to extract from the query string
 * @return {array} - the array of values
 */
PropsToUrlWatcher.getArray = function (location, key) {
    var str = location.query[key];
    return str ? str.split(",") : [];
};

/**
 * @memberof PropsToUrlWatcher
 * @function getObj
 * @desc get all keys in the query string that belong to the same namespace
 * @param {object} location - ReactRouter's location object
 * @param {string} prefix - The key namespace we'd like extract
 * @return {object} - the resulting object
 */
PropsToUrlWatcher.getObj = function (location, prefix) {
    var result = {};
    var regex = new RegExp("^" + prefix + "\\.");

    for (var k in location.query) {
        if (k.match(regex)) {
            result = update.set(result, k, location.query[k]);
        }
    }

    return result[prefix];
};

module.exports = PropsToUrlWatcher;
