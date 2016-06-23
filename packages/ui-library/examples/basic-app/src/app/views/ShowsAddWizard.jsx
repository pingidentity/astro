var React = require("re-react"),
    ModalButton = require("ui-library/src/components/general/ModalButton.jsx"),
    Wizard = require("ui-library/src/components/wizard"),
    Layout = require("ui-library/src/components/general/ColumnLayout.jsx"),
    FormLabel = require("ui-library/src/components/forms/FormLabel.jsx"),
    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup.jsx"),
    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),
    FormTextField = require("ui-library/src/components/forms/form-text-field"),
    FormTextArea = require("ui-library/src/components/forms/FormTextArea.jsx"),
    EventUtils = require("ui-library/src/util/EventUtils");

var ShowsAddWizard = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.
     */
    propTypes: {
        labelNext: React.PropTypes.string.affectsRendering,
        labelCancel: React.PropTypes.string.affectsRendering,
        labelEdit: React.PropTypes.string.affectsRendering,
        fields: React.PropTypes.object.affectsRendering,
        errors: React.PropTypes.object.affectsRendering,
        choices: React.PropTypes.array.affectsRendering,
        activeStep: React.PropTypes.number.affectsRendering,
        numSteps: React.PropTypes.number.affectsRendering
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Initialize the wizard
        this.props.onReset();

        //Create the partials here for better performance, instead of binding on every render
        this._handleTitleFieldChange = this.props.onFieldChange.bind(null, "title");
        this._handleStatusFieldChange = this.props.onFieldChange.bind(null, "status");
        this._handleSummaryFieldChange = EventUtils.forwardTargetValue(this.props.onFieldChange.bind(null, "summary"));

        this._handleGenreFieldChange = {};
        for (var genre in this.props.genres) {
            this._handleGenreFieldChange[genre] = this.props.onFieldChange.bind(null, genre);
        }

        //Initialize the status radio options
        this._statusRadioOptions = [];
        for (var status in this.props.statuses) {
            this._statusRadioOptions.push({ id: status, name: this.props.statuses[status] });
        }
    },

    /*
    * Add the show & close the modal wizard on done
    */
    _handleDone: function () {
        var genres = [];
        for (var genre in this.props.genres) {
            if (this.props.fields[genre]) {
                genres.push(this.props.genres[genre]);
            }
        }
        
        this.props.onAdd(this.props.fields.title, genres, this.props.statuses[this.props.fields.status],
            this.props.fields.summary);
        this.refs["shows-add-wizard-modal"].close();
    },

    /*
    * Generate genre checkbox options
    */
    _getGenreFields: function () {
        return Object.keys(this.props.genres).map(function (genre) {
            return (
                <FormCheckbox key={genre + "-field"}
                        id={genre + "-field"}
                        label={this.props.genres[genre].title}
                        onValueChange={this._handleGenreFieldChange[genre]}
                        checked={this.props.fields[genre]} />
            );
        }.bind(this));
    },

    render: function () {
        return (
            <ModalButton ref="shows-add-wizard-modal"
                    value="+ Add Show"
                    modalTitle="Show Creation Wizard"
                    containerStyle="add-modal" >

                <Wizard {...this.props} title="Enter details to add a new show" className="shows-add">
                    <Wizard.Step title="Set Show Details"
                            canProceed={!this.props.errors.summaryMaxLength}
                            onCancel={this.props.onReset}
                            onDone={this._handleDone}>
                        <Layout.Row>
                            <Layout.Column>
                                <div className="input-row">
                                    <FormTextField labelText="Title"
                                            data-id="title"
                                            value={this.props.fields.title}
                                            onValueChange={this._handleTitleFieldChange} />
                                </div>
                                <div className="input-row">
                                    <FormTextArea labelText="Summary"
                                            maxLength={250}
                                            defaultValue={this.props.fields.summary}
                                            onValueChange={this._handleSummaryFieldChange}
                                            errorMessage={this.props.errors.summaryMaxLength
                                                ? "Summary cannot exceed 250 characters." : ""} />
                                </div>
                                <div className="input-row">
                                    <FormLabel value="Status" />
                                    <FormRadioGroup groupName="statusGroup"
                                            selected={this.props.fields.status}
                                            onChange={this._handleStatusFieldChange}
                                            items={this._statusRadioOptions} />
                                </div>
                            </Layout.Column>

                            <Layout.Column>
                                <div className="input-row">
                                    <h4>Genres</h4>
                                </div>
                                <div>{this._getGenreFields()}</div>
                            </Layout.Column>
                        </Layout.Row>
                    </Wizard.Step>
                </Wizard>
            </ModalButton>
        );
    }
});

/*
* This component creates the ShowsAddWizardView
*/
var ShowsAddWizardView = React.createClass({

    LABELS: {
        labelNext: "Next",
        labelDone: "Done",
        labelCancel: "Cancel",
        labelEdit: "Edit"
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        this._wizardId = "shows-add-wizard";

        //Create the partials here for better performance, instead of binding on every render
        this._handleWizardReset = this.props.onWizardReset.bind(null, this._wizardId);
        this._handleWizardNext = this.props.onWizardNext.bind(null, this._wizardId);
        this._handleWizardEdit = this.props.onWizardEdit.bind(null, this._wizardId);
        this._handleWizardChoose = this.props.onWizardChoose.bind(null, this._wizardId);
    },

    /*
    * Handle input field changes
    */
    _handleFieldChange: function (name, value) {
        this.props.onShowsChange(["addWizardFields", name], value);
    },

    /*
    * Handle resetting the wizard & input fields
    */
    _handleReset: function () {
        this._handleWizardReset();
        this.props.onShowsAddWizardReset();
    },

    render: function () {
        return (
            <ShowsAddWizard {...this.props.wizard[this._wizardId]} {...this.LABELS}
                    showing={this.props.addWizardShowing}
                    fields={this.props.addWizardFields}
                    errors={this.props.addWizardErrors}
                    genres={this.props.genres}
                    statuses={this.props.statuses}
                    onFieldChange={this._handleFieldChange}
                    onReset={this._handleReset}
                    onNext={this._handleWizardNext}
                    onEdit={this._handleWizardEdit}
                    onChange={this._handleWizardChoose}
                    onAdd={this.props.onShowsAdd} />
        );
    }
});

module.exports = ShowsAddWizardView;