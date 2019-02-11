var React = require("react"),
    Redux = require("redux"),
    Wizard = require("../../../components/wizard/"),
    Messages = require("../../../components/general/messages/"),
    WizardView = require("../../../templates/wizard-view");

var LABELS = {
    labelNext: "Next",
    labelDone: "Done",
    labelCancel: "Cancel",
    labelEdit: "Edit"
};

/**
* @name WizardViewDemo
* @memberof WizardView
* @desc A demo for WizardView
*/
class WizardViewDemo extends React.Component {

        messageActions = Redux.bindActionCreators(Messages.Actions, this.props.store.dispatch);
        wizardActions = Redux.bindActionCreators(Wizard.Actions, this.props.store.dispatch);
        fieldActions = Redux.bindActionCreators(WizardView.Actions, this.props.store.dispatch);

        //Root level reducer so null id
       _handlePick = this.wizardActions.pick.bind(null, null);

    _handleFieldChange = (name, value) => {
        this.fieldActions.set(["fields", name], value);
    };

    _handleComplexFieldChange = (rowIndex, fieldName, value) => {
        this.fieldActions.set(["fields", "complex", rowIndex, fieldName], value);
    };

    _handleReset = (id) => {
        this.wizardActions.reset(id);
        this.fieldActions.reset();
    };

    render() {
        return (
            <WizardView {...LABELS} {...this.props.wizard} {...this.props.messages} {...this.props.fields}
                onFieldChange={this._handleFieldChange}
                onComplexFieldChange={this._handleComplexFieldChange}
                onAddComplexFieldsRow={this.fieldActions.addComplexRow}
                onAddMessage={this.messageActions.addMessage}
                onRemoveMessage={this.messageActions.removeAt}
                onNext={this.wizardActions.next}
                onEdit={this.wizardActions.edit}
                onReset={this._handleReset}
                onValueChange={this._handlePick} />);
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
WizardViewDemo.Reducer = Redux.combineReducers({
    messages: Messages.Reducer,
    wizard: Wizard.Reducer,
    fields: WizardView.Reducer
});

module.exports = WizardViewDemo;
