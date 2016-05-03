var React = require("react"),
    ListView = require("../../../templates/list-view");

var ListViewDemo = React.createClass({
    render: function () {
        return <ListView {...this.props.demoProps} />;
    }
});

/*
 * Expose the Reducer and the Actions for the Demo app to inject
 */
ListViewDemo.Reducer = ListView.Reducer;
ListViewDemo.Actions = ListView.Actions;

module.exports = ListViewDemo;
