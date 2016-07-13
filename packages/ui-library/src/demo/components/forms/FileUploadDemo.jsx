var React = require("react"),
    FileUpload = require("../../../components/forms/file-upload"),
    DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

var FileUploadDemo = React.createClass({

    getInitialState: function () {
        return {
            firstFile: "none",
            secondFile: "favicon.png (4762 bytes)",
            thirdFile: "",
            fourthFile: "",
            tooltipOpen: false,
            tooltipConfirmed: ""
        };
    },

    _onFirstFileChanged: function (file) {
        this.setState({
            firstFile: file ? file.name : "none"
        });
    },

    _onSecondFileChanged: function (file) {
        this.setState({
            secondFile: file ? (file.name + " " + file.size + " bytes") : "none"
        });
    },

    _toggleTooltip: function () {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen,
            tooltipConfirmed: ""
        });
    },

    /*
     * Simple error handling function to log errors to the console.
     */
    _onError: function (errorCode) {
        // TODO replace with messaging when messaging ported
        console.log("Error in file upload: " + errorCode);
    },

    /*
     * Simple validating function that always returns valid.
     */
    _fileValidator: function (file) {
        if (file) {
            if (file.size > 102400) {
                return "Opps, too big for me (100Kb max)";
            }

            if (file.type !== "image/png") {
                return "Sorry, can handle only PNG.";
            }
        }
    },

    render: function () {
        return (
            <div>

                <div className="input-row">
                    <label>
                        <span className="label-text">Image Upload w Max Size Passed</span>
                    </label>
                    <FileUpload
                        data-id="fileUpload"
                        maxFileSizeKb={4096}
                        onError={this._onError}
                        showThumbnail={true}
                        onFileChange={this._onFirstFileChanged}
                        labelMaxFileSize="Max Size 4MB"
                        accept="image/jpeg, image/jpg, image/png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                </div>
                <div className="input-row">
                    Selected file = {this.state.firstFile}
                </div>

                <div className="input-row">
                    <label>
                        <span className="label-text">Image Uploaded</span>
                    </label>
                    <FileUpload
                        accept="image/png"
                        validator={this._fileValidator}
                        showThumbnail={true}
                        onFileChange={this._onSecondFileChanged}
                        onError={this._onError}
                        defaultImage="src/demo/images/favicon.png"
                        labelSelect="Choose a File"
                        labelRemove="Remove" />
                </div>
                <div className="input-row">
                    Selected file = {this.state.secondFile}
                </div>

                <div className="input-row">
                    <label>
                        <span className="label-text">File Upload</span>
                    </label>
                    <FileUpload onError={this._onError} accept="" labelSelect="Choose a File"
                            labelRemove="Remove a File" />
                </div>

                <a onClick={this._toggleTooltip}>Stacked File Name in a DetailsTooltip</a>
                <DetailsTooltip
                    positionClassName="top right"
                    labelClassName="my-css-class"
                    title="File Upload in a Details Tooltip"
                    open={this.state.tooltipOpen}
                    onToggle={this._toggleTooltip}>

                    <br/><br/>
                    <div className="input-row">
                        <label>
                            <span className="label-text">File Upload</span>
                        </label>

                        <FileUpload
                            onError={this._onError}
                            data-id="uploadedFile"
                            accept=""
                            buttonText="Choose a File"
                            stacked={true}
                            labelSelect="Choose a File"
                            labelRemove="Remove" />
                    </div>

                    <div className="buttons" data-id="delete-confirmation">
                        <input
                            type="button"
                            data-id="cancel-action"
                            value="Cancel"
                            className="secondary"
                            onClick={this._toggleTooltip}
                        />
                        <input
                            type="button"
                            data-id="confirm-action"
                            value="Confirm"
                            className="primary"
                            onClick={this._toggleTooltip}
                        />
                    </div>
                </DetailsTooltip>

            </div>

        );
    }
});

module.exports = FileUploadDemo;
