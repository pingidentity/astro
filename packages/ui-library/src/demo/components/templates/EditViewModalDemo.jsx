var React = require("react"),
    Redux = require("redux"),
    EditViewModal = require("../../../templates/edit-view-modal");

var EditViewModalDemo = React.createClass({
    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(EditViewModal.Actions, this.props.store.dispatch);
    },

    render: function () {
        return (
            <EditViewModal {...this.props}
                onInputChange={this.actions.setInput}
                onSave={this.actions.saveForm}
                onModalToggle={this.actions.toggleModal} />);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewModalDemo.Reducer = EditViewModal.Reducer;

module.exports = EditViewModalDemo;
