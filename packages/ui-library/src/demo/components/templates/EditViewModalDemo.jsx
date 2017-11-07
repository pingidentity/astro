var React = require("react"),
    Redux = require("redux"),
    EditViewModal = require("../../../templates/edit-view-modal");

/**
* @name EditViewModalDemo
* @memberof EditViewModal
* @desc A demo for EditViewModal
*/
class EditViewModalDemo extends React.Component {
    componentWillMount() {
        this.actions = Redux.bindActionCreators(EditViewModal.Actions, this.props.store.dispatch);
    }

    render() {
        return (
            <EditViewModal {...this.props}
                onInputChange={this.actions.setInput}
                onSave={this.actions.saveForm}
                onModalToggle={this.actions.toggleModal}
                showButtonBar={this.props.inputs.dirty} />);
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
EditViewModalDemo.Reducer = EditViewModal.Reducer;

module.exports = EditViewModalDemo;
