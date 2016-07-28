var React = require("react"),
    Redux = require("redux"),
    EditViewSimple = require("../../../templates/edit-view-simple");

/**
* @name EditViewSimpleDemo
* @memberof EditViewSimple
* @desc A demo for EditViewSimple
*/
var EditViewSimpleDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(EditViewSimple.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (
            <EditViewSimple {...this.props}
                onInputChange={this.actions.setInput}
                onSave={this.actions.saveForm}
                saving={this.props.inputs.saving}
                showButtonBar={this.props.inputs.dirty} />);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewSimpleDemo.Reducer = EditViewSimple.Reducer;

module.exports = EditViewSimpleDemo;
