var React = require("re-react"),
    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox"),
    FormTextField = require("ui-library/src/components/forms//form-text-field").v2,
    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup"),
    FormLabel = require("ui-library/src/components/forms/FormLabel"),
    FormTextArea = require("ui-library/src/components/forms/form-text-area"),
    ButtonBar = require("ui-library/src/components/forms/ButtonBar"),
    PageHeader = require("ui-library/src/components/general/PageHeader");

var ShowsEdit = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.
     */
    propTypes: {
        inputs: React.PropTypes.object,
        errors: React.PropTypes.object
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Create the partials here for better performance, instead of binding on every render
        this._handleTitleInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "title"]);
        this._handleStatusInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "status"]);
        this._handleSummaryInputValueChange = this.props.onInputValueChange.bind(null, ["editingRowInputs", "summary"]);

        this._handleGenreInputValueChange = {};
        for (var genre in this.props.genres) {
            this._handleGenreInputValueChange[genre] =
                this.props.onInputValueChange.bind(null,["editingRowInputs", genre]);
        }

        //Initialize the status radio options
        this._statusRadioOptions = [];
        for (var status in this.props.statuses) {
            this._statusRadioOptions.push({ id: status, name: this.props.statuses[status] });
        }

        //Set the page title to the existing input title
        this._pageTitle = this.props.inputs.title;
    },

    /*
    * Handle edit cancel
    */
    _handleCancel: function () {
        this.props.onCancel();
    },

    /*
    * Handle edit save
    */
    _handleSave: function () {
        var genres = [];
        for (var genre in this.props.genres) {
            if (this.props.inputs[genre]) {
                genres.push(this.props.genres[genre]);
            }
        }

        this.props.onSave(this.props.inputs.id, this.props.inputs.title, genres,
            this.props.statuses[this.props.inputs.status], this.props.inputs.summary);
    },

    /*
    * Generate genre checkbox options
    */
    _getGenreInputs: function () {
        return Object.keys(this.props.genres).map(function (genre) {
            return (
                <FormCheckbox key={genre + "-input"}
                        data-id={genre + "-input"}
                        label={this.props.genres[genre].title}
                        onValueChange={this._handleGenreInputValueChange[genre]}
                        checked={this.props.inputs[genre]} />
            );
        }.bind(this));
    },

    render: function () {
        return (
            <div className="shows-edit">
                <a className="page-return-link" onClick={this._handleCancel}>To shows list</a>

                <PageHeader title={this._pageTitle}/>

                <div className="page-section">
                    <div className="input-row">
                        <FormTextField labelText="Title"
                                className="input-width-medium"
                                data-id="title"
                                value={this.props.inputs.title}
                                onValueChange={this._handleTitleInputValueChange} />
                    </div>
                    <div className="input-row">
                        <FormTextArea controlled={true}
                                labelText="Summary"
                                className="input-width-full"
                                maxLength={250}
                                defaultValue={this.props.inputs.summary}
                                onValueChange={this._handleSummaryInputValueChange}
                                errorMessage={this.props.errors.summaryMaxLength
                                    ? "Summary cannot exceed 250 characters." : ""} />
                    </div>
                    <div className="input-row">
                        <h4>Genres</h4>
                    </div>
                    <div>{this._getGenreInputs()}</div>
                    <div className="input-row">
                        <FormLabel value="Status" />
                        <FormRadioGroup groupName="statusGroup"
                                selected={this.props.inputs.status}
                                onValueChange={this._handleStatusInputValueChange}
                                items={this._statusRadioOptions} />
                    </div>
                </div>

                <ButtonBar
                        onCancel={this._handleCancel}
                        onSave={this._handleSave}
                        cancelText="Cancel"
                        saveText="Save"
                        saveDisabled={this.props.errors.summaryMaxLength} />
            </div>
        );
    }
});

/*
* This component creates the ShowsEditView
*/
var ShowsEditView = React.createClass({

    render: function () {
        return (
            <ShowsEdit
                    genres={this.props.genres}
                    statuses={this.props.statuses}
                    inputs={this.props.editingRowInputs}
                    onInputValueChange={this.props.onShowsValueChange}
                    errors={this.props.editingRowErrors}
                    onCancel={this.props.onShowsEditCancel}
                    onSave={this.props.onShowsEditSave} />
        );
    }
});

module.exports = ShowsEditView;
