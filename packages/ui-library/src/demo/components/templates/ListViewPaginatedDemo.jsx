var React = require("react"),
    Redux = require("redux"),
    PropsToUrlWatcher = require("../../../components/offscreen/PropsToUrlWatcher.jsx"),
    ListViewPaginated = require("../../../templates/list-view-paginated"),
    _ = require("underscore");

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
        var demoWatch = _.pick(this.props, "page", "filters", "advancedSearch");

        return (
            <div>
                <ListViewPaginated {...this.props}
                    onSearchAdvancedToggle={this._handleToggleSearchBar}
                    onSearchFilterChange={this.actions.setFilter}
                    onPageChange={this.actions.setPage} />
                {
                  /* Because the DemoApp also writes the url, the open/selected nodes need to be passed in */
                }
                <PropsToUrlWatcher ignoreFalse={true}
                    location={this.props.location}
                    onReplaceUrl={this.props.replace}
                    watch={_.defaults(demoWatch, this.props.watch)} />
            </div>
            );
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
