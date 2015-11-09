var React = require("react/addons");
var _ = require("underscore");
var Utils = require("../../util/Utils");
var css = require("classnames");

/**
 * @module components/forms/FileUpload
 *
 * @desc
 *
 * Component to render an <input type="file" /> element
 *
 * Supports the upload of a single file and includes:
 * - generation of a thumbnail image using the HTML5 File API (where available)
 * - the File API is also used to provide validation of the size and type of the uploaded
 *   file (error messages are added to the MessageStore and the form to which this component is added
 *   is responsible for rendering these messages using a Messages panel)
 *
 * NOTE: the actual upload of files to online file storage (e.g. Amazon S3) will be handled server-side
 * in order to avoid exposing the encryption key in client-side code.
 *
 * If the File API is not available (IE < 10), the component falls back to rendering the name of the uploaded file.
 *
 * Configurable props:
 * @param {string} accept comma-separated string of MIME types that are fed to the 'accept' attribute of the <input>
 *         element and used in the file type validation. Pass an empty string to the property to disable validation.
 * @param {number} maxFileSizeKb the maximum size (in KB) of the uploaded file (default 5MB)
 * @param {string} [filesAcceptedMsg] text describing the accepted file types
 * @param {string} referenceName name attribute for the <input>
 * @param {boolean} [showThumbnail] controls whether a thumbnail is shown if an image file is selected
 * @param {function} onFileChange callback that handles the file selection event
 * @param {boolean} isFileSelected whether or not a file has been selected for this component.  Useful for changing
 *         the button text and displaying the remove link even when the uploaded file name is not available
 * @param {string} buttonText text to display on the button when no file has been selected.
 * @param {string} [buttonTextSelected] override text to display on the button when a file had been selected (optional).
 * @param {string} removeFileLabel text to display for the link to remove an uploaded file.
 * @param {function} [validator] callback function to call to validate file selection when selection is made.
 * @param {function} [onPreviewReady] notifies the parent when a file is ready to preview
 * @param {function} [errorHandler] function to call with error message codes when an error is encountered.
 *
 * @example
 *   <FileUpload accept="image/jpeg, image/jpg, image/gif, image/png" maxFileSizeKb={10} buttonText="" />
 *
 */
var FileUpload = React.createClass({
    propTypes: {
        accept: React.PropTypes.string,
        maxFileSizeKb: React.PropTypes.number,
        filesAcceptedMsg: React.PropTypes.string,
        referenceName: React.PropTypes.string,
        showThumbnail: React.PropTypes.bool,
        onFileChange: React.PropTypes.func,
        isFileSelected: React.PropTypes.bool,
        buttonText: React.PropTypes.string.isRequired,
        buttonTextSelected: React.PropTypes.string,
        removeFileLabel: React.PropTypes.string.isRequired,
        validator: React.PropTypes.func,
        onPreviewReady: React.PropTypes.func,
        errorHandler: React.PropTypes.func
    },

    /*
     * Async function to read a given image file and return a base64 encoded string representation
     * @param {Object} file an individual file from a FileList object
     * @param {function} success Callback to call on success
     * @param {function} error Callback to call if an error is encountered
     */
    _getImagePreview: function (file, success, error) {
        var reader = new FileReader();

        reader.onloadend = function () {
            success(reader.result);
        };

        reader.onerror = function (e) {
            error(e);
        };

        reader.readAsDataURL(file);
    },

    /*
     * Triggered when the file input has been changed.
     * Calls the validator (if present) and onChange
     * callback (if present).
     *
     */
    _onChange: function (e) {
        var errorMessage = "";
        var files = e.target.files;

        if (this.props.validator) {
            errorMessage = this.props.validator(files[0]);
        }

        if (this.props.onFileChange) {
            this.props.onFileChange(files[0]);
        }

        // check if there is a file selected and the user agent supports the HTML5 File API
        if (Utils.isHtmlFileApiSupported() && files && files[0]) {
            var fileToUpload = files[0],
                self = this;

            this._validateFile(fileToUpload, function () {
                if (self.props.showThumbnail && fileToUpload.type.match("image.*")) {
                    var onFileReadSuccess = function (imgContent) {
                        self.setState({
                            errorMessage: errorMessage,
                            thumbnailSrc: imgContent
                        });

                        if (self.props.onPreviewReady) {
                            self.props.onPreviewReady(imgContent);
                        }
                    };
                    var onFileReadError = function () {
                        return this._handleError("cid.users.fileUpload.error.readingFile");
                    };
                    return self._getImagePreview(files[0], onFileReadSuccess, onFileReadError);
                } else {
                    // display the selected file name
                    self.setState({
                        errorMessage: errorMessage,
                        fileName: Utils.stripFakePath(e.target.value),
                        thumbnailSrc: ""
                    });
                }
            });
        } else {
            // display the selected file name
            this.setState({
                errorMessage: errorMessage,
                fileName: Utils.stripFakePath(e.target.value),
                thumbnailSrc: ""
            });
        }
    },

    /*
     * Validate the MIME type and size of a selected file.
     *
     */
    _validateFile: function (file, success) {
        if (this.props.maxFileSizeKb) {
            var maxFileSizeBytes = this.props.maxFileSizeKb * 1000;
            if (file.size > maxFileSizeBytes) {
                this._resetComponent();
                return this._handleError("cid.users.fileUpload.error.tooBig");
            }
        }
        if (this.props.accept) {
            // remove any whitespace
            var acceptArray = this.props.accept.replace(/\s+/g, "").split(",");
            if (_.indexOf(acceptArray, file.type) === -1) {
                this._resetComponent();
                return this._handleError("cid.users.fileUpload.error.fileType");
            }
        }
        success();
    },
    
    /*
     * Handle an error event by invoking the configured
     * error handler function if one was supplied.
     *
     */
    _handleError: function (errorKey) {
        if (this.props.errorHandler) {
            this.props.errorHandler(errorKey);
        }
    },

    /*
     * Handle removal of the file when remove has
     * been clicked.
     *
     */
    _onClickRemove: function () {
        if (this.props.validator) {
            this.setState({
                errorMessage: this.props.validator("")
            });
        }
        this._resetComponent();
    },

    /*
     * Reset the state of the component.
     *
     */
    _resetComponent: function () {
        this.refs.fileInput.getDOMNode().value = "";
        this.setState({ fileName: "", thumbnailSrc: "" });
        if (this.props.onFileChange) {
            this.props.onFileChange();
        }
    },

    componentWillReceiveProps: function (next) {
        // if file selection managed externally, reset thumbnails and state
        if (this.props.isFileSelected && !_.isUndefined(next.isFileSelected) && !next.isFileSelected) {
            this.setState({ fileName: "", thumbnailSrc: "" });
        }
    },

    getDefaultProps: function () {
        return {
            accept: "image/jpeg,image/jpg,image/gif,image/png",  // comma-separated MIME types
            showThumbnail: false
        };
    },

    getInitialState: function () {
        return {
            errorMessage: "",
            fileName: "",
            thumbnailSrc: ""
        };
    },

    render: function () {
        var imageUpload = this.props.showThumbnail,
            fileSelected = this.state.thumbnailSrc || this.state.fileName || this.props.isFileSelected,
            containerCss = css({
                "input-file-upload": true,
                "image-upload": imageUpload,
                "file-selected": fileSelected
            }),
            labelCss = css({
                "form-error help-tooltip show": this.state.errorMessage
            });

        var buttonText = this.props.buttonText;
        var buttonTextSelected = this.props.buttonTextSelected || this.props.buttonText;
        var buttonLabel = fileSelected ? buttonTextSelected : buttonText;

        return (
            <div className={containerCss}>
                <label className={labelCss}>
                    <div className="tooltip-text" data-id={this.props.referenceName + "_tooltip"}>
                        {this.state.errorMessage}
                    </div>
                    {imageUpload &&
                        <div>
                            {this.props.title && <div>{this.props.title}</div>}
                            <span className="image-icon"></span>
                            <span className="input-image-thumb">
                                <img src={this.state.thumbnailSrc} ref="imageThumb" />
                            </span>
                        </div>
                    }

                    <input type="file"
                           ref="fileInput"
                           name={this.props.name}
                           accept={this.props.accept || null}
                           onChange={this._onChange}
                           data-id={this.props.referenceName + "_input"} />
                    <span className="button inline">{buttonLabel}</span>
                </label>
                <div className="file-info">
                    <a className="file-remove" onClick={this._onClickRemove}>
                        {this.props.removeFileLabel}
                    </a>
                    {!imageUpload &&
                        <span className="file-name" data-id="fileUploadFileName">{this.state.fileName}</span>
                    }
                </div>

                {this.props.filesAcceptedMsg &&
                    <div className="image-types" data-id="filesAcceptedMsg">
                        {this.props.filesAcceptedMsg}
                    </div>
                }
            </div>
        );
    }
});

module.exports = FileUpload;
