var React = require("react"),
    _ = require("underscore"),
    Stateless = require("./v2-stateless.jsx"),
    filterItemsFunction = require("./v2-reducer").filterItemsFunction;

/**
 * @name SelectionListStateful
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (stateless=false) SelectionList to give the user search support
 *    without having to implement that logic.
 */
module.exports = React.createClass({
    displayName: "SelectionListStateful",

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
    _handleSearch: function (queryString) {
        var matchedItems = this.props.items;
        // Use custom onSearch if specified, otherwise use default filter
        if (this.props.onSearch) {
            matchedItems = this.props.onSearch(queryString);
        } else {
            /*
             * The default search function does a "startsWith" search for query strings
             * less than or equal to 3 chars, otherwise is does a "contains" search.
             */
            matchedItems = filterItemsFunction(this.props.items, queryString);
        }

        this.setState({
            queryString: queryString,
            matchedItems: matchedItems
        });
    },

    componentDidUpdate: function (prevProps) {
        if (this.props.items !== prevProps.items) {
            var queryString = this.props.queryString || "";
            this._handleSearch(queryString);
        }
    },

    /**
     * @desc toggle visibility of unselected items
     *
     * @private
     */
    _handleVisibilityChange: function () {
        this.setState({
            showOnlySelected: !this.state.showOnlySelected
        });
    },

    render: function () {
        var statelessProps = _.defaults(
            {
                ref: "SelectionListStateless",
                onSearch: this._handleSearch,
                items: this.state.matchedItems,
                queryString: this.state.queryString,
                showOnlySelected: this.state.showOnlySelected,
                onVisibilityChange: this._handleVisibilityChange
            },
            this.props
        );

        return React.createElement(Stateless, statelessProps);
    }
});
