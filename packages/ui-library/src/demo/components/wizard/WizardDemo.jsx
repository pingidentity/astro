var Redux = require("redux"),
    React = require("react"),
    Wizard = require("../../../components/wizard/Wizard.jsx");

// this is the store

var Step = Wizard.Step;
var Choose = Wizard.Choose;

var Demo = React.createClass({
    BUTTON_LABELS: {
        labelNext: "next",
        labelCancel: "cancel",
        labelEdit: "edit"
    },

    getInitialState: function () {
        return {
            choices: [],
            activeStep: 1,
            numSteps: 2
        };
    },

    change: function (index, totalSteps) {
        this.store.dispatch(Wizard.Actions.choose(index, totalSteps));
    },

    edit: function (index) {
        this.store.dispatch(Wizard.Actions.edit(index));
    },

    next: function () {
        this.store.dispatch(Wizard.Actions.next());
    },

    storeChange: function () {
        this.setState(this.store.getState());
    },

    componentWillMount: function () {
        this.store = Redux.createStore(Wizard.Reducer);
        this.unsub = this.store.subscribe(this.storeChange);
    },

    componentWillUnmount: function () {
        this.store = null;
        this.unsub();
    },

    render: function () {
        return (
        <div style={{ float: "left", width: "100%" }}>
        <Choose title="Choose a Wizard"
            onChange={this.change}
            onNext={this.next}
            onEdit={this.edit}
            {...this.state}
            {...this.BUTTON_LABELS} >
            <Wizard title="wizard A">
                <Step title="step 1">some content herreeeeeeeeeeeee</Step>
                <Step title="Step 2">some content herreeeeeeeeeeeee</Step>
                <Step title="Step 3" when={false}>some content herreeeeeeeeeeeee</Step>
                <Step title="Step 4">some content herreeeeeeeeeeeee</Step>
            </Wizard>

            <div style={{ marginBottom: 10 }}>OR</div>

            <Choose title="Deeper wizard">
                <Wizard title="Wizard B.1">
                    <Step title="Step B1-1">some content herreeeeeeeeeeeee</Step>
                </Wizard>
                <Wizard title="Wizard B.2">
                    <Step title="Step B2-1">some content herreeeeeeeeeeeee</Step>
                    <Step title="Step B2-2">some content herreeeeeeeeeeeee</Step>
                </Wizard>
            </Choose>
        </Choose></div>);
    }
});

module.exports = Demo;

