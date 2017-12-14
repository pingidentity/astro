var React = require("react"),
    _ = require("underscore"),
    Stateless = require("./v2-stateless"),
    filterItemsFunction = require("./v2-reducer").filterItemsFunction;

/**
 * @name SelectionListStateful
 * @memberof SelectionList
 * @desc This is a wrapper around the stateful (stateless=false) SelectionList to give the user search support
 *    without having to implement that logic.
 */
module.exports = class extends React.Component {
    static displayName = "SelectionListStateful";

    state = {
        queryString: "",
        matchedItems: this.props.items
    };

    /**
     * @desc Filter items by search criteria.
     *     Items can be filtered by default search (3 first chars for start-search, 4 or more chars for contain-search)
     *     Items can be also filtered by a custom search implementation
     *
     * @param {string} queryString
     *     The new query string
     * @private
     */
    _handleSearch = (queryString) => {
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
    };

    componentDidUpdate(prevProps) {
        if (this.props.items !== prevProps.items) {
            var queryString = this.props.queryString || "";
            this._handleSearch(queryString);
        }
    }

    /**
     * @desc toggle visibility of unselected items
     *
     * @private
     */
    _handleVisibilityChange = () => {
        this.setState({
            showOnlySelected: !this.state.showOnlySelected
        });
    };

    _handleValueChange = (newIds) => {
        this.setState({
            selectedItemIds: newIds
        });

        this.props.onValueChange(newIds);
    };

    _handelSelectAll = () => {
        var newIds = this.props.items.map(function (item) {
            return item.id;
        });

        this.setState({
            selectedItemIds: newIds
        });

        this.props.onSelectAll(newIds);
    };

    render() {
        var statelessProps = _.defaults(
            {
                ref: "SelectionListStateless",
                onSearch: this._handleSearch,
                items: this.state.matchedItems,
                queryString: this.state.queryString,
                showOnlySelected: this.state.showOnlySelected,
                onVisibilityChange: this._handleVisibilityChange,
                onValueChange: this._handleValueChange,
                onSelectAll: this._handelSelectAll,
                selectedItemIds: this.state.selectedItemIds
            },
            this.props
        );

        return <Stateless {...statelessProps} />;
    }
};
