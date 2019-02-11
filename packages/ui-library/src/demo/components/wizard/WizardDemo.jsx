var React = require("react"),
    Redux = require("redux"),
    Wizard = require("../../../components/wizard/Wizard"),
    FormCheckbox = require("../../../components/forms/FormCheckbox"),
    Step = Wizard.Step,
    Choose = Wizard.Choose;

var BUTTON_LABELS = {
    labelNext: "Next",
    labelCancel: "Cancel",
    labelDone: "Done",
    labelEdit: "Edit"
};

/**
* @name WizardDemo
* @memberof Wizard
* @desc A demo for Wizard
*/
class WizardDemo extends React.Component {

    constructor(props) {
        super(props);
        this.actions = Redux.bindActionCreators(Wizard.Actions, props.store.dispatch);

        //Root level reducer so null id
        this._handlePick = this.actions.pick.bind(null, null);
    }

    static flags = [ "use-portal" ];

    state = {
        isLoading: false,
        showCancelTooltip: false,
        showSaveTooltip: true,
        usePulsing: false
    };

    toggleUsePulsing = () => {
        this.setState({
            usePulsing: !this.state.usePulsing
        });
    };

    _handleNext = () => {
        this._closeCancelTooltip();
        this._closeSaveTooltip();

        if (this.state.usePulsing) {
            this.setState({ isLoading: true });

            setTimeout(function () {
                this.setState({ isLoading: false });
                this.actions.next();
            }.bind(this), 2500);
        } else {
            this.actions.next();
        }
    };

    _reset = () => {
        this.actions.reset();
    };

    _handleDone = () => {
        this._closeSaveTooltip();

        if (this.state.usePulsing) {
            this.setState({ isLoading: true });
            setTimeout(function () {
                this.setState({ isLoading: false });
            }.bind(this), 2500);
        } else {
            this._reset();
        }
    };

    _openCancelTooltip = () => {
        this.setState({ showCancelTooltip: true });
    };

    _closeCancelTooltip = () => {
        this.setState({ showCancelTooltip: false });
    };

    _openSaveTooltip = () => {
        this.setState({ showSaveTooltip: true });
    };

    _closeSaveTooltip = () => {
        this.setState({ showSaveTooltip: false });
    };

    render() {
        const cancelTooltipParams = {
            title: "Confirm cancel",
            open: this.state.showCancelTooltip,
            onConfirm: this._reset,
            onCancel: this._closeCancelTooltip,
            messageText: "Are you sure you want to cancel this wizard?",
            confirmButtonText: "Yes",
            cancelButtonText: "No",
        };
        const saveTooltipParams = {
            confirmButtonText: "Confirm save",
            cancelButtonText: "Nevermind",
            showClose: false,
            title: "Are you sure?",
        };
        const { flags } = this.props;

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
                    onDone={this._openSaveTooltip}
                    onCancel={this._openCancelTooltip}
                    showPulsing={this.state.isLoading}
                    {...this.props}
                    {...BUTTON_LABELS}>

                    <Wizard
                        title="Wizard 1"
                        cancelTooltip={cancelTooltipParams}
                        saveTooltip={{
                            ...saveTooltipParams,
                            messageText: "Are you sure you are want to complete this wizard?",
                            onConfirm: this._handleDone,
                            onCancel: this._closeSaveTooltip,
                            open: this.state.showSaveTooltip,
                        }}
                        flags={flags}
                    >
                        <Step
                            title="Wizard 1 - Step 1"
                            cancelTooltip={cancelTooltipParams}
                            onNext={this._openSaveTooltip}
                            saveTooltip={{
                                ...saveTooltipParams,
                                messageText: "Are you sure you are want to save this step?",
                                onConfirm: this._handleNext,
                                onCancel: this._closeSaveTooltip,
                                open: this.state.showSaveTooltip,
                            }}
                            flags={flags}
                        >
                            Step 1 content goes here.
                        </Step>
                        <Step title="Wizard 1 - Step 2" cancelTooltip={cancelTooltipParams} flags={flags}>
                            Step 2 content goes here.
                        </Step>
                    </Wizard>

                    <div style={{ marginBottom: 10 }}>OR</div>

                    <Wizard
                        title="Wizard 2"
                        flags={flags}
                    >
                        <Step title="Wizard 2 - Step 1">Step 1 content goes here.</Step>
                        <Step title="Wizard 2 - Step 2">Step 2 content goes here.</Step>
                        <Step title="Wizard 2 - Step 3">Step 3 content goes here.</Step>
                    </Wizard>
                </Choose>
                <div>{this.state.isLoading && "Making some async call..."}</div>
            </div>);
    }
}

/*
 * Expose the Reducer.  Doing so will tell the DemoApp to create an isolated store for the Demo to use.  Normally
 * Redux forbids having more than one store, but using the main store makes the data flow difficult to follow, and
 * can be unpredictable with events from one demo affecting another demo.  For this reason we treat each demo as
 * its own app.
 */
WizardDemo.Reducer = Wizard.Reducer;

module.exports = WizardDemo;
