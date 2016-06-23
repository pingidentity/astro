var React = require("re-react"),
    FormCheckbox = require("ui-library/src/components/forms/FormCheckbox.jsx"),
    FormTextField = require("ui-library/src/components/forms//form-text-field").v2,
    FormRadioGroup = require("ui-library/src/components/forms/FormRadioGroup.jsx"),
    FormLabel = require("ui-library/src/components/forms/FormLabel.jsx"),
    FormTextArea = require("ui-library/src/components/forms/FormTextArea.jsx"),
    EventUtils = require("ui-library/src/util/EventUtils");

var ShowsEdit = React.createClass({
    /*
     * Declare which variables affect rendering.  The shouldComponentUpdate method will be be injected by re-react.
     */
    propTypes: {
        inputs: React.PropTypes.object.affectsRendering,
        errors: React.PropTypes.object.affectsRendering
    },

    /*
     * When the component mounts, do a bunch of initialization
     */
    componentWillMount: function () {
        //Create the partials here for better performance, instead of binding on every render
        this._handleTitleInputChange = this.props.onInputChange.bind(null, ["editingRowInputs", "title"]);
        this._handleStatusInputChange = this.props.onInputChange.bind(null, ["editingRowInputs", "status"]);
        this._handleSummaryInputChange = EventUtils.forwardTargetValue(
            this.props.onInputChange.bind(null, ["editingRowInputs", "summary"]));

        this._handleGenreInputChange = {};
        for (var genre in this.props.genres) {
            this._handleGenreInputChange[genre] = this.props.onInputChange.bind(null, ["editingRowInputs", genre]);
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
                        id={genre + "-input"}
                        label={this.props.genres[genre].title}
                        onValueChange={this._handleGenreInputChange[genre]}
                        checked={this.props.inputs[genre]} />
            );
        }.bind(this));
    },

    render: function () {
        return (
            <div className="shows-edit">
                <a className="page-return-link" onClick={this._handleCancel}>To shows list</a>

                <h1 className="page-title">{this._pageTitle}</h1>

                <div className="page-section">
                    <div className="input-row">
                        <FormTextField labelText="Title"
                                className="input-width-medium"
                                data-id="title"
                                value={this.props.inputs.title}
                                onValueChange={this._handleTitleInputChange} />
                    </div>
                    <div className="input-row">
                        <FormTextArea labelText="Summary"
                                className="input-width-full"
                                maxLength={250}
                                defaultValue={this.props.inputs.summary}
                                onValueChange={this._handleSummaryInputChange}
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
                                onChange={this._handleStatusInputChange}
                                items={this._statusRadioOptions} />
                    </div>
                </div>

                <div className="page-controls-primary">
                    <input
                        type="button"
                        className="cancel"
                        value="Cancel"
                        onClick={this._handleCancel} />
                    <input
                        type="button"
                        className="primary"
                        value="Save"
                        disabled={this.props.errors.summaryMaxLength}
                        onClick={this._handleSave} />
                </div>
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
                    onInputChange={this.props.onShowsChange}
                    errors={this.props.editingRowErrors}
                    onCancel={this.props.onShowsEditCancel}
                    onSave={this.props.onShowsEditSave} />
        );
    }
});

module.exports = ShowsEditView;
