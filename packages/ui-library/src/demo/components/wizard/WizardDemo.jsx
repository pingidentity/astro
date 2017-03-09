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
        labelNext: "Next",
        labelCancel: "Cancel",
        labelDone: "Done",
        labelEdit: "Edit"
    },

    getInitialState: function () {
        return {
            isLoading: false,
            showCancelTooltip: false,
            usePulsing: false
        };
    },

    toggleUsePulsing: function () {
        this.setState({
            usePulsing: !this.state.usePulsing
        });
    },

    _handleNext: function () {
        this._closeTooltip();

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

    _reset: function () {
        this.actions.reset();
    },

    _handleDone: function () {
        if (this.state.usePulsing) {
            this.setState({ isLoading: true });
            setTimeout(function () {
                this.setState({ isLoading: false });
            }.bind(this), 2500);
        } else {
            this._reset();
        }
    },

    _openTooltip: function () {
        this.setState({ showCancelTooltip: true });
    },

    _closeTooltip: function () {
        this.setState({ showCancelTooltip: false });
    },

    componentWillMount: function () {
        this.actions = Redux.bindActionCreators(Wizard.Actions, this.props.store.dispatch);

        //Root level reducer so null id
        this._handlePick = this.actions.pick.bind(null, null);
    },

    render: function () {
        var cancelTooltipParams = {
            title: "Cancel Confirmation",
            open: this.state.showCancelTooltip,
            onConfirm: this._reset,
            onCancel: this._closeTooltip,
            messageText: "Are you sure you want to cancel this wizard?",
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        };

        return (
            <div>
                <div className="input-row">
                    <FormCheckbox
                        label="Demonstrate saving animation"
                        onChange={this.toggleUsePulsing}
                        checked={this.state.usePulsing}
                        className="stacked"
                    />
                </div>

                <Choose
                    title="Choose a wizard"
                    onValueChange={this._handlePick}
                    onEdit={this.actions.edit}
                    onNext={this._handleNext}
                    onDone={this._handleDone}
                    onCancel={this._openTooltip}
                    showPulsing={this.state.isLoading}
                    {...this.props}
                    {...this.BUTTON_LABELS}>

                    <Wizard
                        title="Wizard 1"
                        cancelTooltip={cancelTooltipParams}>
                        <Step title="Wizard 1 - Step 1" cancelTooltip={cancelTooltipParams}>
                            Step 1 content goes here.
                        </Step>
                        <Step title="Wizard 1 - Step 2" cancelTooltip={cancelTooltipParams}>
                            Step 2 content goes here.
                        </Step>
                    </Wizard>

                    <div style={{ marginBottom: 10 }}>OR</div>

                    <Wizard
                        title="Wizard 2">
                        <Step title="Wizard 2 - Step 1">Step 1 content goes here.</Step>
                        <Step title="Wizard 2 - Step 2">Step 2 content goes here.</Step>
                        <Step title="Wizard 2 - Step 3">Step 3 content goes here.</Step>
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
