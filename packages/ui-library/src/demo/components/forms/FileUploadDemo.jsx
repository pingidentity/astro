var React = require("react/addons");
var FileUpload = require("../../../components/forms/FileUpload.jsx");

var FileUploadDemo = React.createClass({
    
    /*
     * Simple error handling function to log errors to the console.
     */
    _fileUploadError: function (errorCode) {
        // TODO replace with messaging when messaging ported
        console.log("Error in file upload: " + errorCode);
    },
    
    /*
     * Simple validating function that always returns valid.
     */
    _fileValidator: function (file) {
        // TODO replace with a Validator when validators are ported
        console.log("Validating file: " + file);
        return true;
    },
    
    render: function () {
        return (
            <div>
                <FileUpload
                    referenceName="fileUpload"
                    accept="image/jpeg, image/jpg, image/gif, image/png"
                    maxFileSizeKb={50}
                    validator={this._fileValidator}
                    buttonText="Choose a File"
                    removeFileLabel="Remove File"
                    errorHandler={this._fileUploadError}
                 />
            </div>
        );
    }
});


module.exports = FileUploadDemo;
