var React = require("react"),
    Redux = require("redux"),
    EditViewCollapsible = require("../../../templates/edit-view-collapsible");

/**
* @name EditViewCollapsibleDemo
* @memberof EditViewCollapsible
* @desc A demo for EditViewCollapsible
*/
var EditViewCollapsibleDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(EditViewCollapsible.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (<EditViewCollapsible {...this.props}
            onInputChange={this.actions.setInput}
            onSectionToggle={this.actions.toggleSection}
            onSave={this.actions.saveForm} />);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewCollapsibleDemo.Reducer = EditViewCollapsible.Reducer;

module.exports = EditViewCollapsibleDemo;
