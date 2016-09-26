var React = require("react"),
    ReactDOM = require("react-dom"),
    Utils = require("../../../util/Utils"),
    fixOrientation = require("fix-orientation"),
    readExif = require("exif-js"),
    classnames = require("classnames"),
    _ = require("underscore"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx");

var Accept = {
    IMAGE: "image/jpeg, image/jpg, image/gif, image/png",
    TEXT: "text/html, text/*"
};

var ErrorCodes = {
    TooBig: "fileupload.error.size",
    WrongMimeType: "fileupload.error.type",
    CantRead: "fileupload.error.read"
};

/**
 * @callback FileUpload~onValidateCallback
 * @ignore
 *
 * @param {object} file - browser File object to validate
 * @returns {string|undefined} error message, if no error - undefined
 */

/**
 * @callback FileUpload~onFileChange
 * @ignore
 *
 * @param {object} file - browser File object
 */

/**
 * @callback FileUpload~onPreviewReady
 * @ignore
 *
 * @param {string} url - preview url, can be used directly with &lt;img /&gt; tags or css background styles
 */

/**
 * @callback FileUpload~onError
 * @ignore
 *
 * @param {string} errorCode - error code, supported error codes:
 *   - fileupload.error.read - there were browser problem while reading file
 *   - fileupload.error.type - selected file doesn't match provided list of allowed mime types
 *   - fileupload.error.size - selected file exceeding size limit
 */

/**
 * @class FileUpload
 * @ignore
 *
 * @desc Component to render an <code>&lt;input type="file" /&gt;</code> element.
 * Supports the upload of a single file and includes:
 *   - generation of a thumbnail image using the HTML5 File API (where available)
 *   - the File API is also used to provide validation of the size and type of the uploaded
 *     file (error messages are added to the MessageStore and the form to which this component is added
 *     is responsible for rendering these messages using a Messages panel)
 *
 * If the File API is not available (IE < 10), the component falls back to rendering the name of the uploaded file.
 *
 * @param {string} accept comma-separated string of MIME types that are fed to the 'accept' attribute of the &lt;input&gt;
 *         element and used in the file type validation. Pass an empty string to the property to disable validation.
 * @param {number} maxFileSizeKb the maximum size (in KB) of the uploaded file (default 5MB)
 * @param {string} [filesAcceptedMsg] text describing the accepted file types
 * @param {string} referenceName used to generate data-id attributes for various inner HTML elements
 * @param {boolean} [showThumbnail=false] controls whether a thumbnail is shown if an image file is selected
 * @param {boolean} [disabled] controls whether the component is disabled
 * @param {string} [defaultImage] the url for the default image to use
 * @param {FileUpload~onFileChange} onFileChange callback to be triggered when new file selected
 * @param {boolean} isFileSelected whether or not a file has been selected for this component.  Useful for changing
 *         the button text and displaying the remove link even when the uploaded file name is not available
 * @param {string} buttonText text to display on the button when no file has been selected.
 * @param {string} [buttonTextSelected] override text to display on the button when a file had been selected (optional).
 * @param {string} removeFileLabel text to display for the link to remove an uploaded file.
 * @param {string} [maxFileSizeLabel] text to display for the max file size an uploaded file.
 * @param {FileUpload~onValidateCallback} [validator] callback to validate file selection when selection is made.
 * @param {FileUpload~onPreviewReady} [onPreviewReady] notifies the parent when a file preview is generated by browser and ready to be displayed
 * @param {FileUpload~onError} [errorHandler] function to call with error message codes when an error is encountered.
 * @param {boolean} [stacked] - controls whether to display file names inline or on a separate line
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
        buttonText: React.PropTypes.string,
        buttonTextSelected: React.PropTypes.string,
        removeFileLabel: React.PropTypes.string.isRequired,
        maxFileSizeLabel: React.PropTypes.string,
        validator: React.PropTypes.func,
        onPreviewReady: React.PropTypes.func,
        errorHandler: React.PropTypes.func,
        defaultImage: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        stacked: React.PropTypes.bool
    },

    /**
     * Async function to read a given image file and return a base64 encoded string representation
     * @method FileUpload#_getImagePreview
     * @private
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

    /**
     * @desc process the file and update the state accordingly.
     * @method FileUpload#_processFileAndSetState
     * @private
     * @param {string} dataURI the base64 encoded image data
     * @param {string} errorMessage to display if any
     */
    _processFileAndSetState: function (dataURI, errorMessage) {
        this.setState({
            errorMessage: errorMessage,
            thumbnailSrc: dataURI
        });

        if (this.props.onPreviewReady) {
            this.props.onPreviewReady(dataURI);
        }
    },

    /**
     * @desc call the file change event handler
     * @method FileUpload#_invokeOnFileChange
     * @private
     * @param {object} file the file to be uploaded
     * @param {string} errorMessage message to display if any
     */
    _invokeOnFileChange: function (file) {
        if (this.props.onFileChange) {
            this.props.onFileChange(file);
        }
    },

    /**
     * @desc Convert image base64 dataURL to file object.
     * @method FileUpload#_dataURItoFile
     * @private
     * @param {string} dataURI the base64 encoded image data
     * @param {object} file used to generate the base64 data
     * @returns {object} new file created based on the base64 data passed
     */
    _dataURItoFile: function (dataURI, file) {
        var byteString = atob(dataURI.split(",")[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new File([ab], file.name, { type: file.type });
    },

    /**
     * Triggered when the file input has been changed.
     * Calls the validator (if present) and onChange
     * callback (if present).
     * @method FileUpload#_onChange
     * @private
     * @param  {Object} e The event object
     */
    _onChange: function (e) {
        var errorMessage = "";
        var files = e.target.files;
        var self = this;

        if (this.props.validator) {
            errorMessage = this.props.validator(files[0]);
        }

        // check if there is a file selected and the user agent supports the HTML5 File API
        if (Utils.isHtmlFileApiSupported() && files && files[0]) {
            var fileToUpload = files[0];

            this._validateFile(fileToUpload, function () {
                if (self.props.showThumbnail && fileToUpload.type.match("image.*")) {
                    var onFileReadSuccess = function (imgContentUrl) {
                        //exif only affects jpeg so check it is a jpeg/jpg file
                        if (((fileToUpload.type === "image/jpg") || (fileToUpload.type === "image/jpeg")) &&
                            imgContentUrl)
                        {
                            //try to read exif data the base64 data was passed
                            readExif.getData(e.target.files[0], function () {
                                if (this.exifdata.Orientation) {
                                    //correct and display the image according to the exif orientation
                                    fixOrientation(imgContentUrl, { image: true }, function (fixedImgContentUrl) {
                                        var fixedFile = self._dataURItoFile(fixedImgContentUrl, files[0]);
                                        self._invokeOnFileChange(fixedFile);
                                        self._processFileAndSetState(fixedImgContentUrl, errorMessage);
                                    });
                                }
                                else {
                                    self._invokeOnFileChange(fileToUpload);
                                    self._processFileAndSetState(imgContentUrl, errorMessage);
                                }
                            });
                        }
                        else {
                            self._invokeOnFileChange(fileToUpload);
                            self._processFileAndSetState(imgContentUrl, errorMessage);
                        }
                    };
                    var onFileReadError = function () {
                        return self._handleError(ErrorCodes.CantRead);
                    };
                    return self._getImagePreview(files[0], onFileReadSuccess, onFileReadError);
                } else {

                    self._invokeOnFileChange(fileToUpload);

                    // display the selected file name
                    self.setState({
                        errorMessage: errorMessage,
                        fileName: Utils.stripFakePath(e.target.value),
                        thumbnailSrc: ""
                    });
                }
            });
        } else {
            self._invokeOnFileChange(files[0]);

            // display the selected file name
            this.setState({
                errorMessage: errorMessage,
                fileName: Utils.stripFakePath(e.target.value),
                thumbnailSrc: ""
            });
        }
    },

    /**
     * Validate the MIME type and size of a selected file.
     * @method FileUpload#_validateFile
     * @private
     * @param  {object} file browser File object
     * @param  {function} success callback to trigger on success
     * @return {String|undefined} Returns error if invalid
     */
    _validateFile: function (file, success) {
        if (this.props.maxFileSizeKb) {
            var maxFileSizeBytes = this.props.maxFileSizeKb * 1000;
            if (file.size > maxFileSizeBytes) {
                this._resetComponent();
                return this._handleError(ErrorCodes.TooBig);
            }
        }
        if (this.props.accept) {
            // remove any whitespace
            var acceptArray = this.props.accept.replace(/\s+/g, "").split(",");
            if (_.indexOf(acceptArray, file.type) === -1) {
                this._resetComponent();
                return this._handleError(ErrorCodes.WrongMimeType);
            }
        }
        success();
    },

    /**
     * Handle an error event by invoking the configured
     * error handler function if one was supplied.
     * @method FileUpload#_handleError
     * @private
     * @param  {?} errorKey [description]
     */
    _handleError: function (errorKey) {
        if (this.props.errorHandler) {
            this.props.errorHandler(errorKey);
        }
    },

    /**
     * Handle removal of the file when remove has
     * been clicked.
     * @method FileUpload#_onClickRemove
     * @private
     */
    _onClickRemove: function () {
        if (this.props.disabled) {
            return;
        }
        if (this.props.validator) {
            this.setState({
                errorMessage: this.props.validator("")
            });
        }
        this._resetComponent();
    },

    /**
     * Reset the state of the component.
     * @method FileUpload#_resetComponent
     * @private
     */
    _resetComponent: function () {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
        this.setState({ fileName: "", thumbnailSrc: "" });
        if (this.props.onFileChange) {
            this.props.onFileChange();
        }
    },

    componentWillReceiveProps: function (next) {
        var state = {};

        // if file selection managed externally, reset thumbnails and state
        if (this.props.isFileSelected && !_.isUndefined(next.isFileSelected) && !next.isFileSelected) {
            state = { fileName: "", thumbnailSrc: "" };
        }
        if (next.defaultImage !== this.props.defaultImage && !this.state.thumbnailSrc) {
            state.thumbnailSrc = next.defaultImage;
        }

        this.setState(state);
    },

    getDefaultProps: function () {
        return {
            accept: Accept.IMAGE,
            showThumbnail: false,
            stacked: false
        };
    },

    getInitialState: function () {
        return {
            errorMessage: "",
            fileName: "",
            thumbnailSrc: this.props.defaultImage
        };
    },

    render: function () {
        var imageUpload = this.props.showThumbnail,
            fileSelected = this.state.thumbnailSrc || this.state.fileName || this.props.isFileSelected,
            containerClass = classnames("input-file-upload", {
                "image-upload": imageUpload,
                "file-selected": fileSelected,
                disabled: this.props.disabled
            }),
            labelClass = classnames({
                "form-error": this.state.errorMessage
            }),
            fileInfoClass = classnames("file-info", {
                stacked: this.props.stacked
            });

        var buttonText = this.props.buttonText,
            buttonTextSelected = this.props.buttonTextSelected || this.props.buttonText,
            buttonLabel = fileSelected ? buttonTextSelected : buttonText,
            acceptTypesText = "";

        if (!_.isUndefined(this.props.maxFileSizeLabel) && this.props.accept) {
            // if an end user specifies a max size label, but not the accept
            // types, then default 'image/jpeg, image/jpg, image/gif, image/png' will be displayed
            acceptTypesText = this.props.accept.replace(/\s+/g, " ").split("image/");
        }

        return (
            <div className={containerClass}>
                <FormLabel className={labelClass}>
                    {imageUpload &&
                    <div>
                        {this.props.title && <div>{this.props.title}</div>}
                        <span className="image-icon"></span>
                        <span className="input-image-thumb">
                            <img src={this.state.thumbnailSrc} ref="imageThumb" />
                        </span>
                    </div>
                    }
                    <input
                        disabled={this.props.disabled}
                        type="file"
                        ref="fileInput"
                        name={this.props.name}
                        accept={this.props.accept || null}
                        onChange={this._onChange}
                        data-id={this.props.referenceName + "_input"}
                    />
                    {imageUpload &&
                        <span className="file-size">
                            <span className="max-size">{this.props.maxFileSizeLabel}</span>
                            <span className="accepted-types">{acceptTypesText}</span>
                        </span>
                    }
                    <button className="inline choose">
                        {buttonLabel}
                    </button>

                    {this.state.errorMessage && (
                        <FormError.Icon data-id={this.props.referenceName + "_errormessage-icon"} />
                    )}
                    {this.state.errorMessage && (
                        <FormError.Message
                            value={this.state.errorMessage}
                            data-id={this.props.referenceName + "_errormessage"}
                        />
                    )}
                </FormLabel>

                <div className={fileInfoClass}>
                    {!imageUpload &&
                        <span className="file-name" data-id="fileUploadFileName">
                            <span className="icon-file"></span>
                            {this.state.fileName}
                        </span>
                    }
                    <a className="file-remove" ref="remove" onClick={this._onClickRemove}>
                        {this.props.removeFileLabel}
                    </a>
                </div>

                {this.props.filesAcceptedMsg && (
                    <div className="image-types" data-id="filesAcceptedMsg">
                        {this.props.filesAcceptedMsg}
                    </div>
                )}
            </div>
        );
    }
});

FileUpload.Accept = Accept;
FileUpload.ErrorCodes = ErrorCodes;
module.exports = FileUpload;
