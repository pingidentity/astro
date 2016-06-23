var React = require("react"),
    Redux = require("redux"),
    EditViewSwitched = require("../../../templates/edit-view-switched");

var EditViewSwitchedDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(EditViewSwitched.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (
            <EditViewSwitched {...this.props}
                onInputChange={this.actions.setInput}
                onRockerButtonChange={this.actions.setActiveRockerButton}
                onSave={this.actions.saveForm} />);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewSwitchedDemo.Reducer = EditViewSwitched.Reducer;

module.exports = EditViewSwitchedDemo;
