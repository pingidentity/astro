var React = require("react"),
    Redux = require("redux"),
    ListView = require("../../../templates/list-view"),
    PropsToUrlWatcher = require("../../../components/offscreen/PropsToUrlWatcher"),
    _ = require("underscore");

/**
* @name ListViewDemo
* @memberof ListView
* @desc A demo for ListView
*/
class ListViewDemo extends React.Component {
    _handleToggleSearchBar = () => {
        this.actions.setExpandedSearch(!this.props.advancedSearch);
    };

    _handleSearchFilterChange = (name, value) => {
        this.actions.setFilter(name, value);
    };

    componentWillMount() {
        this.actions = Redux.bindActionCreators(ListView.Actions, this.props.store.dispatch);
    }

    render() {
        var demoWatch = _.pick(this.props, "position", "activeTab", "filters", "advancedSearch");

        return (
            <div>
                <ListView {...this.props}
                        onSearchAdvancedToggle={this._handleToggleSearchBar}
                        onSearchFilterChange={this._handleSearchFilterChange}
                        onScrollPositionChange={this.actions.setPosition}
                        onActiveTabChange={this.actions.setActiveTab} />

                {
                  /* Because the DemoApp also writes the url, the open/selected nodes need to be passed in */
                }
                <PropsToUrlWatcher ignoreFalse={true}
                    location={this.props.location}
                    onReplaceUrl={this.props.replace}
                    watch={_.defaults(demoWatch, this.props.watch)} />
            </div>);
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
ListViewDemo.Reducer = ListView.Reducer;

module.exports = ListViewDemo;
