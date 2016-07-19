var React = require("react"),
    Redux = require("redux"),
    Wizard = require("../../../components/wizard/Wizard.jsx"),
    FormCheckbox = require("../../../components/forms/FormCheckbox.jsx"),
    Step = Wizard.Step,
    Choose = Wizard.Choose;

/**
* @name WizardDemo
* @memberof Wizard
* @desc A demo for Wizard
*/
var WizardDemo = React.createClass({
    BUTTON_LABELS: {
        labelNext: "next",
        labelCancel: "cancel",
        labelDone: "done",
        labelEdit: "edit"
    },

    getInitialState: function () {
        return {
            usePulsing: false,
            isLoading: false
        };
    },

    toggleUsePulsing: function () {
        this.setState({
            usePulsing: !this.state.usePulsing
        });
    },

    next: function () {
        if (this.state.usePulsing) {
            this.setState({ isLoading: true });

            setTimeout(function () {
                this.setState({ isLoading: false });
                this.actions.next();
            }.bind(this), 2500);
        } else {
            this.actions.next();
        }
    },

    done: function () {
        if (this.state.usePulsing) {
            this.setState({ isLoading: true });
            setTimeout(function () {
                this.setState({ isLoading: false });
                this.actions.reset();
            }.bind(this), 2500);
        } else {
            this.actions.reset();
        }
    },

    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(Wizard.Actions, this.props.store.dispatch);

        //Root level reducer so null id
        this._handlePick = this.actions.pick.bind(null, null);
    },

    render: function () {
        return (
            <div style={{ float: "left", width: "100%" }}>
                <div className="input-row">
                    <FormCheckbox
                        label="Use pulsing"
                        onChange={this.toggleUsePulsing}
                        checked={this.state.usePulsing}
                        className="stacked" />
                </div>

                <Choose title="Choose a wizard" {...this.props} {...this.BUTTON_LABELS}
                    onValueChange={this._handlePick}
                    onEdit={this.actions.edit}
                    onNext={this.next}
                    onDone={this.done}
                    showPulsing={this.state.isLoading} >

                    <Wizard title="Wizard 1">
                        <Step title="Wizard 1 - Step 1">some content herreeeeeeeeeeeee</Step>
                        <Step title="Wizard 1 - Step 2">some content herreeeeeeeeeeeee</Step>
                    </Wizard>

                    <div style={{ marginBottom: 10 }}>OR</div>

                    <Wizard title="Wizard 2">
                        <Step title="Wizard 2 - Step 1">some content herreeeeeeeeeeeee</Step>
                        <Step title="Wizard 2 - Step 2">some content herreeeeeeeeeeeee</Step>
                        <Step title="Wizard 2 - Step 3">some content herreeeeeeeeeeeee</Step>
                    </Wizard>
                </Choose>
                <div>{this.state.isLoading && "Making some async call..."}</div>
           </div>);
    }
});

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
WizardDemo.Reducer = Wizard.Reducer;

module.exports = WizardDemo;
