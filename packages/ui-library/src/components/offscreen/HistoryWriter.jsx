var React = require("react"),
    ReduxUtils = require("../../util/ReduxUtils.js"),
    _ = require("underscore");

/**
 * @class HistoryWriter
 * @desc This component can be used to monitor properties and write them to the url.  The props
 * of the app should be passed in so the component has access to the same state as the app (see
 * example)
 * @param {string[]} watch - A list of keys to watch.  Keys may be paths to a value
 * @param {function} onReplaceUrl - A callback to replace the history object.  Typically this will just
 * be the replace action creator from react-router-redux
 * @param {object} location - The React Router's location object
 * @example:
 * var App = React.createClass({
 *     render: function () {
 *         return (
 *             <div>
 *                 <HistoryWriter onReplaceUrl={this.routerActions.replace} watch={["initialItem"]} {...this.props} />
 *                 ...
 *         );
 *     }
 * })
 */
var HistoryWriter = React.createClass({
    propTypes: {
        watch: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onReplaceUrl: React.PropTypes.func.isRequired,
        location: React.PropTypes.object.isRequired
    },

    /**
     * @method _get
     * @private
     * @desc Extracts a value from the props, at the given path
     * @param {object} tree - the object to search
     * @param {string} path - the path to resolve within the object
     * @return {object} the value or null
     */
    _get: function (tree, path) {
        var parts = path.split(".");

        for (var i = 0; i < parts.length; i += 1) {
            if (typeof(tree[parts[i]]) === "undefined") {
                return null;
            }

            tree = tree[parts[i]];
        }

        return tree;
    },

    /**
     * @method _arePropsUnchanged
     * @param {object} props - a set of props to compare to the current props (generally nextProps).
     * @private
     * @return {bool} - whether or not the new set of props are different than the current one
     * for the keys specified in this.props.watch.  This is very important to avoid the infinite
     * loop of replacing the url, which causes a state change, which causes props to update.
     */
    _arePropsUnchanged: function (props) {
        return _.isEqual(
            _.pick(this.props, this.props.watch),
            _.pick(props, this.props.watch));
    },

    shouldComponentUpdate: function () {
        return false;
    },

    componentWillReceiveProps: function (nextProps) {
        var vals = [], v;

        if (this._arePropsUnchanged(nextProps) && _.isEqual(this.props.watch, nextProps.watch)) {
            return;
        }

        nextProps.watch.forEach(function (key) {
            v = this._get(nextProps, key);

            switch (typeof(v)) {
                case "object":
                    for (var subKey in v) {
                        //TODO: some day build the ability to have any level of depth but practically speaking
                        // this is generally not necessary.
                        if (typeof(v[subKey]) === "object") {
                            throw "cannot watch a key which maps to an hash of hashes";
                        }

                        vals.push(key + "." + subKey + "=" + v[subKey]);
                    }
                    break;
                case "null":
                    //here to make Alex happy though it's unnecessary because _.pick skips nulls
                    break;
                default:
                    vals.push(key + "=" + v);
                    break;
            }
        }.bind(this));

        this.props.onReplaceUrl(this.props.location.pathname + "?" + vals.join("&"));
    },

    render: function () {
        return <div style={{ display: "none" }} />;
    }
});

/** @static
 * @function getNumFromQuery
 * @param {object} location - ReactRouter's location object
 * @param {string} key - The Key we'd like to extract from the query string
 * @return {number} - the number
 */
HistoryWriter.getNumFromQuery = function (location, key) {
    return parseFloat(location.query[key]);
};

/** @static
 * @function getObjFromQuery
 * @desc get all keys in the query string that belong to the same namespace
 * @param {object} location - ReactRouter's location object
 * @param {string} prefix - The key namespace we'd like extract
 * @return {object} - the resulting object
 */
HistoryWriter.getObjFromQuery = function (location, prefix) {
    var result = {};
    var regex = new RegExp("^" + prefix + "\\.");

    for (var k in location.query) {
        if (k.match(regex)) {
            ReduxUtils.setAtPath(result, k, location.query[k]);
        }
    }

    return result[prefix];
};

module.exports = HistoryWriter;

