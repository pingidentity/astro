var React = require("react");
var FileUpload = require("../../../components/forms/FileUpload.jsx");

var FileUploadDemo = React.createClass({

    getInitialState: function () {
        return {
            firstFile: "none",
            secondFile: "favicon.png (4762 bytes)"
        };
    },

    _onFirstFileChanged: function (file) {
        this.setState({
            firstFile: file ? file.name : "none"
        });
    },

    _onSecondFileChanged: function (file) {
        this.setState({
            secondFile: file ? `${file.name} (${file.size} bytes)` : "none"
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
                <FileUpload
                    referenceName="fileUpload"
                    maxFileSizeKb={4096}
                    errorHandler={this._onError}
                    showThumbnail={true}
                    onFileChange={this._onFirstFileChanged}
                    removeFileLabel="Remove File"
                    buttonText="Choose a File"
                />

                <br/><br/>
                <div>
                    Selected file = {this.state.firstFile}
                </div>

                <br/><br/>

                <FileUpload
                    accept="image/png"
                    validator={this._fileValidator}
                    showThumbnail={true}
                    onFileChange={this._onSecondFileChanged}
                    errorHandler={this._onError}
                    defaultImage="src/demo/images/favicon.png"
                    removeFileLabel="Remove File"
                    buttonText="Choose a File"
                />

                <br/><br/>
                <div>
                    Selected file = {this.state.secondFile}
                </div>

            </div>

        );
    }
});


module.exports = FileUploadDemo;
