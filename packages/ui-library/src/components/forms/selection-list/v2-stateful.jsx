var React = require("react"),
    _ = require("underscore"),
    Stateless = require("./v2-stateless.jsx"),
    filterItemsFunction = require("./v2-reducer").filterItemsFunction;

/**
 * @name SelectionListStateful
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (controlled=false) SelectionList to give the user search support
 *    without having to implement that logic.
 */
module.exports = React.createClass({
    displayName: "SelectionListStateful",

    getDefaultProps: function () {
        return {
            /*
             * The default search function does a "startsWith" search for query strings
             * less than or equal to 3 chars, otherwise is does a "contains" search.
             */
            onSearch: filterItemsFunction
        };
    },

    getInitialState: function () {
        return {
            queryString: "",
            matchedItems: this.props.items
        };
    },

    /**
     * @desc Filter items by search criteria.
     *     Items can be filtered by default search (3 first chars for start-search, 4 or more chars for contain-search)
     *     Items can be also filtered by a custom search implementation
     *
     * @param {string} queryString
     *     The new query string
     * @private
     */
    _onFilter: function (queryString) {
        var matchedItems = this.props.onSearch(this.props.items, queryString);
        this.setState({
            queryString: queryString,
            matchedItems: matchedItems
        });
    },

    render: function () {
        var statelessProps = _.defaults(
            {
                ref: "SelectionListStateless",
                onFilter: this._onFilter,
                items: this.state.matchedItems,
                queryString: this.state.queryString
            },
            this.props
        );

        return React.createElement(Stateless, statelessProps);
    }
});
