var React = require("re-react"),
    ModalButton = require("../../components/general/ModalButton.jsx"),
    Wizard = require("../../components/wizard/Wizard.jsx"),
    Layout = require("../../components/general/ColumnLayout.jsx"),
    Messages = require("../../components/general/messages"),
    FormLabel = require("../../components/forms/FormLabel.jsx"),
    FileUpload = require("../../components/forms/file-upload").v2,
    FormRadioGroup = require("../../components/forms/FormRadioGroup.jsx"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    FormTextField = require("../../components/forms/form-text-field").v2;

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
 *              Label for next button
 * @param {string} labelCancel
 *              Label for cancel button
 * @param {string} labelEdit
 *              Label for edit button
 * @param {object} fields
 *              Object for fields
 * @param {array} choices
 *              Array for choices
 * @param {number} activeStep
 *              Current active step
 * @param {number} numSteps
 *              Number of steps
 * @param {array} messages
 *              Array of messages
 * @param {WizardView~onFieldChange} onFieldChange
 *              Callback to be triggered when an input field value changes
 * @param {WizardView~onComplexFieldChange} onComplexFieldChange
 *              Callback to be triggered when a complex input field value changes
 * @param {WizardView~onAddComplexFieldsRow} onAddComplexFieldsRow
 *              Callback to be triggered when a complex input field row is added
 * @param {WizardView~onAddMessage} onAddMessage
 *              Callback to be triggered when a message is added
 * @param {Messages~onRemoveMessage} onRemoveMessage
 *              Callback to be triggered when a message is removed
 * @param {Wizard~onEdit} onEdit
 *              Callback to be triggered when a wizard's edit is clicked
 * @param {WizardView~onNext} onNext
 *              Callback to be triggered when a wizard's next is clicked
 * @param {WizardView~onReset} onReset
 *              Callback to be triggered to reset a wizard
 * @param {Wizard#Choose~onValueChange} onValueChange
 *              Callback to be triggered when the choice is made on first step of wizard.
 */
module.exports = React.createClass({
    propTypes: {
        labelNext: React.PropTypes.string.affectsRendering,
        labelCancel: React.PropTypes.string.affectsRendering,
        labelEdit: React.PropTypes.string.affectsRendering,
        fields: React.PropTypes.object.affectsRendering,
        choices: React.PropTypes.array.affectsRendering,
        activeStep: React.PropTypes.number.affectsRendering,
        numSteps: React.PropTypes.number.affectsRendering,
        messages: React.PropTypes.array.affectsRendering,

        onFieldChange: React.PropTypes.func,
        onComplexFieldChange: React.PropTypes.func,
        onAddComplexFieldsRow: React.PropTypes.func,
        onAddMessage: React.PropTypes.func,
        onRemoveMessage: React.PropTypes.func,
        onNext: React.PropTypes.func,
        onReset: React.PropTypes.func
    },

    _next: function () {
        this.props.onNext();
        this.props.onAddMessage("Next clicked");
    },

    _done: function () {
        alert("done");
        this.refs.modal.refs.ModalButtonStateful._handleClose();
    },

    _cancel: function () {
        alert("cancel");
        this.props.onReset();
    },

    _onFieldChange: function (name, value) {
        this.props.onAddMessage(name + " changed to " + value);
        this.props.onFieldChange(name, value);
    },

    componentWillMount: function () {
        this.props.onReset();
    },

    render: function () {
        return (
            <div className="clear-both">
                {/* This outer div is only required to style inside the DemoApp */}

                <ModalButton ref="modal"
                        activatorButtonLabel="Show wizard"
                        modalClassName="full-width"
                        modalTitle="Object creation wizard">
                    <Messages messages={this.props.messages}
                        containerType={Messages.ContainerTypes.MODAL}
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
                            onReset={this.props.onReset} >
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
                </ModalButton>
            </div>);
    }
});

/*
 * Instead of having a really messy render function, let's break this particular step into its own
 * component
 */
var TwoColumnStep = React.createClass({
    RADIO_OPTS: [
        { id: "1", name: "First Choice" },
        { id: "2", name: "Second Choice" },
        { id: "3", name: "Third Choice" }
    ],

    //create the partials on bind for better performance, instead of binding on every render
    componentWillMount: function () {
        this._handleField1Change = this.props.onFieldChange.bind(null, "field1");
        this._handleCheckboxChange1 = this.props.onFieldChange.bind(null, "checkbox1");
        this._handleCheckboxChange2 = this.props.onFieldChange.bind(null, "checkbox2");
        this._handleRadioChange = this.props.onFieldChange.bind(null, "radio");
    },

    render: function () {
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
                                items={this.RADIO_OPTS} />
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
});

var FormStep = React.createClass({
    componentWillMount: function () {
        this._handleField1Change = this.props.onFieldChange.bind(null, "field1");
        this._handleCheckboxChange = this.props.onFieldChange.bind(null, "checkbox");
    },

    render: function () {
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
});

var Or = React.createClass({
    render: function () {
        return <div style={{ marginBottom: 10 }}>OR</div>;
    }
});

/*
 * The complex field has 3 input fields.  Better to put it into its own component than to have all these
 * lines of jsx inline inside another component
 */
var ComplexField = React.createClass({
    componentWillMount: function () {
        this._handleField1Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field1");
        this._handleField2Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field2");
        this._handleField3Change = this.props.onComplexFieldChange.bind(null, this.props.id, "field3");
    },

    render: function () {
        return (
            <div className="input-row">
                <FormTextField labelText="First part"
                    data-id="field1"
                    value={this.props.field1}
                    className="input-width-small"
                    onValueChange={this._handleField1Change} />

                <FormTextField labelText="second part"
                    data-id="field2"
                    value={this.props.field2}
                    className="input-width-small"
                    onValueChange={this._handleField2Change} />

                <FormTextField labelText="third part"
                    data-id="fieldd"
                    value={this.props.field3}
                    className="input-width-xsmall"
                    onValueChange={this._handleField3Change} />
            </div>);
    }
});
