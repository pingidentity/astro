var React = require("react"),
    FileUpload = require("../../../components/forms/file-upload").v2,
    DetailsTooltip = require("../../../components/tooltips/DetailsTooltip.jsx");

/**
* @name FileUploadDemo
* @memberof FileUpload
* @desc A demo for FileUpload
*/
var FileUploadDemo = React.createClass({

    getInitialState: function () {
        return {
            file3: "none",
            file1: "none",
            file2: "favicon.png (4762 bytes)",
            status3: "",
            thumb3: "src/demo/images/favicon.png",
            tooltipOpen: false,
            tooltipConfirmed: ""
        };
    },

    _onChange1: function (file) {
        this.setState({ file1: file ? file.name : "none" });
    },

    _onRemove1: function () {
        this.setState({ file1: "none" });
    },

    _onChange2: function (file) {
        this.setState({ file2: file ? (file.name + " " + file.size + " bytes") : "none" });
    },

    _onRemove2: function () {
        this.setState({ file2: "none" });
    },

    _onChange3: function () {
        this.setState({
            file3: "something",
            thumb3: "src/demo/images/favicon.png",
            status3: "onChange callback triggered"
        });
    },

    _onRemove3: function () {
        this.setState({
            file3: undefined,
            thumb3: undefined,
            status3: "onRemove callback triggered"
        });
        this.fileUploadStateless.resetComponent();
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
                    <label className="detached">
                        Basic File Input
                    </label>
                    <FileUpload
                        onError={this._onError}
                        accept=""
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                </div>

                <div className="input-row">
                    <label className="detached">
                        Image File Input with a Max Size
                    </label>
                    <FileUpload
                        data-id="fileUpload"
                        maxFileSizeKb={4096}
                        showThumbnail={true}
                        onChange={this._onChange1}
                        onRemove={this._onRemove1}
                        onError={this._onError}
                        labelMaxFileSize="Max Size 4MB"
                        accept="image/jpeg, image/jpg, image/png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                    <br /><br />
                    Selected file = {this.state.file1}
                </div>

                <div className="input-row">
                    <label className="detached">
                        File Input with Default on Page Load
                    </label>
                    <FileUpload
                        accept="image/png"
                        validator={this._fileValidator}
                        showThumbnail={true}
                        onChange={this._onChange2}
                        onRemove={this._onRemove2}
                        onError={this._onError}
                        defaultImage="src/demo/images/favicon.png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                    Selected file = {this.state.file2}
                </div>

                <div className="input-row">
                    <label className="detached">
                        File Input in a Tooltip
                    </label>
                    <DetailsTooltip
                        positionClassName="top right"
                        labelClassName="my-css-class"
                        title="File Input in a Details Tooltip"
                        open={this.state.tooltipOpen}
                        onToggle={this._toggleTooltip}
                        label="Toggle Tooltip">

                        <div className="input-row">
                            <label className="detached">
                                Select a File
                            </label>
                            <FileUpload
                                onError={this._onError}
                                data-id="uploadedFile"
                                accept=""
                                buttonText="Choose a File"
                                stacked={true}
                                labelSelect="Choose a File"
                                labelRemove="Remove"
                            />
                        </div>
                        <div className="buttons" data-id="delete-confirmation">
                            <button
                                type="button"
                                data-id="confirm-action"
                                className="primary"
                                onClick={this._toggleTooltip} >
                                Confirm
                            </button>
                            <br />
                            <a className="cancel" onClick={this._toggleTooltip}>Cancel</a>
                        </div>
                    </DetailsTooltip>
                </div>

                <div className="input-row">
                    <label className="detached">
                        Stateless File Input
                    </label>
                    <div className="attention">
                        Note that it is recommended that the stateful version of this component be used since
                        it performs all of the file parsing involved when handling files in javascript. For that reason,
                        this example is not fully functional and is meant to illustrate the various hooks and
                        precautions for using this component in its stateless form. Inspection of the stateful version
                        code will more clearly show how the file handling is performed.
                    </div>
                    <FileUpload
                        data-id="statelessFileUpload"
                        ref={function (component) {
                            if (component && !this.fileUploadStateless) {
                                this.fileUploadStateless = component.refs.FileUploadStateless;
                            }
                        }}
                        stateless={true}
                        fileName={this.state.file3}
                        onChange={this._onChange3}
                        onRemove={this._onRemove3}
                        onError={this._onError}
                        showThumbnail={true}
                        thumbnailSrc={this.state.thumb3}
                        accept="image/jpeg, image/jpg, image/png"
                        labelSelect="Choose a File"
                        labelRemove="Remove"
                    />
                    Input status = {this.state.status3}

                    <div className="attention">
                        <p>
                            Also note that when using the stateless component, unexpected behavior can occur when
                            selecting a file, removing it, then adding the same file again. In some browsers the
                            onChange event will not trigger for the second file selection.
                        </p>
                        <p>
                            To circumvent this issue there is a public function named "resetComponent" in the stateless
                            file-upload component that should be called in your onRemove callback function. This will
                            properly reset/clear your file input regardless of the browser.
                        </p>
                        <p>
                            See the source code for the above demo for an example of this being used.
                        </p>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = FileUploadDemo;
