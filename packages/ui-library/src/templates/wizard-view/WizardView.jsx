var PropTypes = require("prop-types");
var React = require("react"),
    Wizard = require("../../components/wizard/Wizard"),
    Layout = require("../../components/general/ColumnLayout"),
    Messages = require("../../components/general/messages/"),
    FormLabel = require("../../components/forms/FormLabel"),
    FileUpload = require("../../components/forms/file-upload").v2,
    FormRadioGroup = require("../../components/forms/FormRadioGroup"),
    FormCheckbox = require("../../components/forms/FormCheckbox"),
    FormTextField = require("../../components/forms/form-text-field").v2;

import Button from "../../components/buttons/Button";
import Modal from "../../components/general/Modal";
import InputWidths from "../../components/forms/InputWidths";


/**
 * @callback WizardView~onFieldChange
 * @param {string} name
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @callback WizardView~onComplexFieldChange
 * @param {string} name
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @callback WizardView~onAddComplexFieldsRow
 * @param {string} name
 *          Identifier for input
 * @param {string} value
 *          New value of input
 */

/**
 * @callback WizardView~onAddMessage
 * @param {string} message
 *          Passed message
 */

/**
 * @callback WizardView~onNext
 */

/**
 * @callback WizardView~onReset
 */

/**
 * @class WizardView
 * @desc This is a template to demonstrate how to build a page with a wizard in a modal dialog.  Use it as a
 *     starting poing for a wizard in modal page.
 *
 * @param {string} labelNext
 *     Label for next button
 * @param {string} labelCancel
 *     Label for cancel button
 * @param {string} labelEdit
 *     Label for edit button
 * @param {object} fields
 *     Object for fields
 * @param {array} choices
 *     Array for choices
 * @param {number} activeStep
 *     Current active step
 * @param {number} numSteps
 *     Number of steps
 * @param {array} messages
 *     Array of messages
 * @param {WizardView~onFieldChange} onFieldChange
 *     Callback to be triggered when an input field value changes
 * @param {WizardView~onComplexFieldChange} onComplexFieldChange
 *     Callback to be triggered when a complex input field value changes
 * @param {WizardView~onAddComplexFieldsRow} onAddComplexFieldsRow
 *     Callback to be triggered when a complex input field row is added
 * @param {WizardView~onAddMessage} onAddMessage
 *     Callback to be triggered when a message is added
 * @param {Messages~onRemoveMessage} onRemoveMessage
 *     Callback to be triggered when a message is removed
 * @param {Wizard~onEdit} onEdit
 *     Callback to be triggered when a wizard's edit is clicked
 * @param {WizardView~onNext} onNext
 *     Callback to be triggered when a wizard's next is clicked
 * @param {WizardView~onReset} onReset
 *     Callback to be triggered to reset a wizard
 * @param {Wizard#Choose~onValueChange} onValueChange
 *     Callback to be triggered when the choice is made on first step of wizard.
 */
module.exports = class extends React.Component {
    static propTypes = {
        labelNext: PropTypes.string,
        labelCancel: PropTypes.string,
        labelEdit: PropTypes.string,
        fields: PropTypes.object,
        choices: PropTypes.array,
        activeStep: PropTypes.number,
        numSteps: PropTypes.number,
        messages: PropTypes.array,

        onFieldChange: PropTypes.func,
        onComplexFieldChange: PropTypes.func,
        onAddComplexFieldsRow: PropTypes.func,
        onAddMessage: PropTypes.func,
        onRemoveMessage: PropTypes.func,
        onNext: PropTypes.func,
        onReset: PropTypes.func,
    };

    state = {
        expanded: false
    }


    _next = () => {
        this.props.onNext();
        this.props.onAddMessage("Next clicked");
    };

    _done = () => {
        alert("done");
        this.setState(prevState => {
            return { expanded: !prevState.expanded };
        });
    };

    _cancel = () => {
        alert("cancel");
        this.props.onReset();
    };

    _onFieldChange = (name, value) => {
        this.props.onAddMessage(name + " changed to " + value);
        this.props.onFieldChange(name, value);
    };

    _handleModalToggle = () => {
        this.setState(prevState => {
            return { expanded: !prevState.expanded };
        });
    }


    componentWillMount() {
        this.props.onReset();
    }

    render() {
        return (
            <div className="clear-both">
                {/* This outer div is only required to style inside the DemoApp */}
                <Button data-id="showWizard-button" label="Show Wizard" onClick={this._handleModalToggle}/>
                <Modal ref="modal"
                    data-id="showWizard"
                    className="full-width"
                    modalTitle="Object creation wizard"
                    expanded={this.state.expanded}
                    onClose={this._handleModalToggle}>
                    <Messages messages={this.props.messages}
                        onRemoveMessage={this.props.onRemoveMessage} />
                    <Wizard.Choose labelCancel={this.props.labelCancel}
                        labelDone={this.props.labelDone}
                        labelEdit={this.props.labelEdit}
                        labelNext={this.props.labelNext}
                        numSteps={this.props.numSteps}
                        activeStep={this.props.activeStep}
                        choices={this.props.choices}
                        title="Choose a Wizard"
                        onEdit={this.props.onEdit}
                        onValueChange={this.props.onValueChange}
                        onNext={this._next}
                        onCancel={this._cancel}
                        onReset={this.props.onReset}
                        onDone={this._done} >
                        <Wizard title="Two Column Step">
                            <TwoColumnStep labelCancel={this.props.labelCancel}
                                labelDone={this.props.labelDone}
                                labelEdit={this.props.labelEdit}
                                labelNext={this.props.labelNext}
                                numSteps={this.props.numSteps}
                                activeStep={this.props.activeStep}
                                fields={this.props.fields}
                                onEdit={this.props.onEdit}
                                onNext={this._next}
                                onDone={this._done}
                                onCancel={this._cancel}
                                onFieldChange={this._onFieldChange}
                                onRemoveMessage={this.props.onRemoveMessage}
                                onComplexFieldChange={this.props.onComplexFieldChange}
                                onAddMessage={this.props.onAddMessage}
                                onAddComplexFieldsRow={this.props.onAddComplexFieldsRow}
                            />
                        </Wizard>

                        <Or />

                        <Wizard title="Form Template">
                            <FormStep labelCancel={this.props.labelCancel}
                                labelDone={this.props.labelDone}
                                labelEdit={this.props.labelEdit}
                                labelNext={this.props.labelNext}
                                numSteps={this.props.numSteps}
                                activeStep={this.props.activeStep}
                                fields={this.props.fields}
                                onEdit={this.props.onEdit}
                                onNext={this._next}
                                onDone={this._done}
                                onCancel={this._cancel}
                                onFieldChange={this._onFieldChange}
                                onRemoveMessage={this.props.onRemoveMessage}
                                onComplexFieldChange={this.props.onComplexFieldChange}
                                onAddMessage={this.props.onAddMessage}
                                onAddComplexFieldsRow={this.props.onAddComplexFieldsRow}
                            />
                            <Wizard.Step title="Final Step" />
                        </Wizard>
                    </Wizard.Choose>
                </Modal>
            </div>);
    }
};

var RADIO_OPTS = [
    { id: "1", name: "First Choice" },
    { id: "2", name: "Second Choice" },
    { id: "3", name: "Third Choice" }
];

/*
 * Instead of having a really messy render function, let's break this particular step into its own
 * component
 */
class TwoColumnStep extends React.Component {
    //create the partials on bind for better performance, instead of binding on every render
    componentWillMount() {
        this._handleField1Change = this.props.onFieldChange.bind(null, "field1");
        this._handleCheckboxChange1 = this.props.onFieldChange.bind(null, "checkbox1");
        this._handleCheckboxChange2 = this.props.onFieldChange.bind(null, "checkbox2");
        this._handleRadioChange = this.props.onFieldChange.bind(null, "radio");
    }

    render() {
        return (
            <Wizard.Step {...this.props} title="Two Column Step">
                <Layout.Row>
                    <Layout.Column>
                        <div className="input-row">
                            <FormCheckbox label="Checkbox without a value"
                                checked={this.props.fields.checkbox1}
                                onValueChange={this._handleCheckboxChange1} />
                        </div>
                        <div className="input-row">
                            <FormLabel value="Stacked radio button group" />
                            <FormRadioGroup groupName="stackedRadioGroup"
                                selected={this.props.fields.radio}
                                onValueChange={this._handleRadioChange}
                                items={RADIO_OPTS} />
                        </div>
                    </Layout.Column>
                    <Layout.Column>
                        <div className="input-row">
                            <FormCheckbox label="Checkbox without a value"
                                checked={this.props.fields.checkbox2}
                                onValueChange={this._handleCheckboxChange2} />
                        </div>
                        <div className="input-row">
                            <FileUpload buttonText="Image upload" labelRemove="Remove" labelSelect="Image upload" />
                        </div>
                    </Layout.Column>
                </Layout.Row>
            </Wizard.Step>);
    }
}

class FormStep extends React.Component {
    componentWillMount() {
        this._handleField1Change = this.props.onFieldChange.bind(null, "field1");
        this._handleCheckboxChange = this.props.onFieldChange.bind(null, "checkbox");
    }

    render() {
        return (
            <Wizard.Step {...this.props} title="Wizard Form">
                <div className="input-row">
                    <FormTextField labelText="Text field"
                        data-id="field1"
                        value={this.props.fields.field1}
                        onValueChange={this._handleField1Change} />
                </div>

                <label className="input-group">
                    Complex Fields
                </label>
                <div className="input-row">
                    {
                        this.props.fields.complex.map(function (row, index) {
                            return (
                                <ComplexField id={index} key={index}
                                    field1={this.props.fields.complex[index].field1}
                                    field2={this.props.fields.complex[index].field2}
                                    field3={this.props.fields.complex[index].field3}
                                    onComplexFieldChange={this.props.onComplexFieldChange} />);
                        }.bind(this))
                    }
                    <a onClick={this.props.onAddComplexFieldsRow}>Add Line +</a>
                </div>
                <div className="input-row">
                    <FormCheckbox label="Checkbox without a value"
                        checked={this.props.fields.checkbox}
                        onValueChange={this._handleCheckboxChange} />
                </div>
            </Wizard.Step>);
    }
}

class Or extends React.Component {
    render() {
        return <div style={{ marginBottom: 10 }}>OR</div>;
    }
}

/*
 * The complex field has 3 input fields.  Better to put it into its own component than to have all these
 * lines of jsx inline inside another component
 */
class ComplexField extends React.Component {
    componentWillMount() {
        this._handleField1Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field1");
        this._handleField2Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field2");
        this._handleField3Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field3");
    }

    render() {
        return (
            <div className="input-row">
                <FormTextField labelText="First part"
                    data-id="field1"
                    value={this.props.field1}
                    width={InputWidths.SM}
                    onValueChange={this._handleField1Change}
                />
                <FormTextField labelText="second part"
                    data-id="field2"
                    value={this.props.field2}
                    width={InputWidths.SM}
                    onValueChange={this._handleField2Change}
                />
                <FormTextField labelText="third part"
                    data-id="fieldd"
                    value={this.props.field3}
                    width={InputWidths.XS}
                    onValueChange={this._handleField3Change}
                />
            </div>
        );
    }
}
