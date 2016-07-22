var React = require("react"),
    Redux = require("redux"),
    ListViewPaginated = require("../../../templates/list-view-paginated");

/**
* @name ListViewPaginatedDemo
* @memberof ListViewPaginated
* @desc A demo for ListViewPaginated
*/
var ListViewPaginatedDemo = React.createClass({
    _handleToggleSearchBar: function () {
        this.actions.setExpandedSearch(!this.props.advancedSearch);
    },

    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(ListViewPaginated.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (
            <ListViewPaginated {...this.props}
                onSearchAdvancedToggle={this._handleToggleSearchBar}
                onSearchFilterChange={this.actions.setFilter}
                onPageChange={this.actions.setPage} />);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
ListViewPaginatedDemo.Reducer = ListViewPaginated.Reducer;

module.exports = ListViewPaginatedDemo;
