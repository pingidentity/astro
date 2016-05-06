var React = require("react"),
    ListView = require("../../../templates/list-view");

var ListViewDemo = React.createClass({
    _handleToggleSearchBar: function () {
        this.props.demoActions.setExpandedSearch(!this.props.demoProps.advancedSearch);
    },

    _handleSearchFilterChange: function (name, value) {
        this.props.demoActions.setFilter(name, value);
    },

    render: function () {
        return (<ListView {...this.props.demoProps}
            onSearchToggleAdvanced={this._handleToggleSearchBar}
            onSearchFilterChange={this._handleSearchFilterChange}
            onScrollPositionChange={this.props.demoActions.setPosition}
            onActiveTabChange={this.props.demoActions.setActiveTab} />);
    }
});

/*
 * Expose the Reducer, Actions, and WatchedProps for the Demo app to inject
 */
ListViewDemo.Reducer = ListView.Reducer;
ListViewDemo.Actions = ListView.Actions;
ListViewDemo.WatchProps = ["position", "activeTab", "filters", "advancedSearch"];

module.exports = ListViewDemo;
