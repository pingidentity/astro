var React = require("react"),
    Redux = require("redux"),
    PropsToUrlWatcher = require("../../../components/offscreen/PropsToUrlWatcher"),
    ListViewOrdering = require("../../../templates/list-view-ordering/"),
    _ = require("underscore");

/**
* @name ListViewOrderingDemo
* @memberof ListViewOrdering
* @desc A demo for ListViewOrdering
*/
class ListViewOrderingDemo extends React.Component {
    _handleToggleSearchBar = () => {
        this.actions.setExpandedSearch(!this.props.advancedSearch);
    };

    componentWillMount() {
        this.actions = Redux.bindActionCreators(ListViewOrdering.Actions, this.props.store.dispatch);
    }

    render() {
        var demoWatch = _.pick(this.props, "page", "filters", "advancedSearch");

        return (
            <div>
                <ListViewOrdering {...this.props}
                    onSearchAdvancedToggle={this._handleToggleSearchBar}
                    onSearchFilterChange={this.actions.setFilter}
                    onPageChange={this.actions.setPage}
                    onReorder={this.actions.reorder} />
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
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
ListViewOrderingDemo.Reducer = ListViewOrdering.Reducer;

module.exports = ListViewOrderingDemo;
