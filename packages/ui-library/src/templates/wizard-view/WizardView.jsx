var React = require("re-react"),
    ModalButton = require("../../components/general/ModalButton.jsx"),
    Wizard = require("../../components/wizard/Wizard.jsx"),
    Layout = require("../../components/general/ColumnLayout.jsx"),
    Messages = require("../../components/general/Messages.jsx"),
    FormLabel = require("../../components/forms/FormLabel.jsx"),
    FileUpload = require("../../components/forms/FileUpload.jsx"),
    FormRadioGroup = require("../../components/forms/FormRadioGroup.jsx"),
    FormCheckbox = require("../../components/forms/FormCheckbox.jsx"),
    FormTextField = require("../../components/forms/form-text-field");

/**
 * @class WizardView
 * @desc This is a template to demonstrate how to build a page with a wizard in a modal dialog.  Use it as a
 *     starting poing for a wizard in modal page.
 *
 * @param {function} onFieldChange - A callback executed when an input field value changes
 * @param {function} onComplexFieldChange - A callback executed when a complex input field value changes
 * @param {function} onAddComplexFieldsRow - A callback executed when a complex input field row is added
 * @param {function} onAddMessage - A callback executed when a message is added
 * @param {function} onRemoveMessage - A callback executed when a message is removed
 * @param {function} onNext - A callback executed when a wizard's next is clicked
 * @param {function} onEdit - A callback executed when a wizard's edit is clicked
 * @param {function} onReset - A callback executed to reset a wizard
 * @param {function} onChange - A callback executed when a wizard is chosen
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
        messages: React.PropTypes.array.affectsRendering
    },

    _next: function () {
        this.props.onNext();
        this.props.onAddMessage("Next clicked");
    },

    _done: function () {
        alert("done");
        this.refs.modal.close();
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

                <ModalButton value="Show wizard" modalTitle="Object creation wizard" ref="modal">
                    <Messages messages={this.props.messages}
                        containerType={Messages.ContainerTypes.MODAL}
                        removeMessage={this.props.onRemoveMessage} />

                    <Wizard.Choose {...this.props}
                                   title="Choose a Wizard"
                                   onNext={this._next}
                                   onDone={this._done}
                                   onCancel={this._cancel} >
                        <Wizard title="Two Column Step">
                            <TwoColumnStep {...this.props} onFieldChange={this._onFieldChange} />
                        </Wizard>

                        <Or />

                        <Wizard title="Form Template">
                            <FormStep {...this.props} onFieldChange={this._onFieldChange} />
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

                <div className="input-row">
                    <h4>Complex Fields</h4>
                </div>

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
