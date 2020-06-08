var React = require("react"),
    Redux = require("redux"),
    ListViewOrdering = require("ui-library/lib/templates/list-view-ordering");

/**
* @name ListViewOrderingDemo
* @memberof ListViewOrdering
* @desc A demo for ListViewOrdering
*/
class ListViewOrderingDemo extends React.Component {

    constructor(props) {
        super(props);
        this.actions = Redux.bindActionCreators(ListViewOrdering.Actions, props.store.dispatch);
    }

    _handleToggleSearchBar = () => {
        this.actions.setExpandedSearch(!this.props.advancedSearch);
    };

    render() {
        return (
            <div>
                <ListViewOrdering {...this.props}
                    onSearchAdvancedToggle={this._handleToggleSearchBar}
                    onSearchFilterChange={this.actions.setFilter}
                    onPageChange={this.actions.setPage}
                    onReorder={this.actions.reorder} />
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
