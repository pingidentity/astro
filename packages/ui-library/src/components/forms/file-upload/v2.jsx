var React = require("react"),
    StatelessFileUpload = require("./v2-stateless.jsx"),
    StatefulFileUpload = require("./v2-stateful.jsx"),
    Constants = require("./v2-constants.js");

/**
 * @callback FileUpload~onValidateCallback
 * @param {object} file - browser File object to validate
 * @returns {string|undefined} error message, if no error - undefined
 */

/**
 * @callback FileUpload~onPreviewReady
 * @param {string} url - preview url, can be used directly with &lt;img /&gt; tags or css background styles
 */

/**
 * @callback FileUpload~onError
 * @param {string} errorCode - error code, supported error codes:
 *   - fileupload.error.read - there were browser problem while reading file
 *   - fileupload.error.type - selected file doesn't match provided list of allowed mime types
 *   - fileupload.error.size - selected file exceeding size limit
 */

/**
 * @class FileUpload
 * @desc Component to render an <code>&lt;input type="file" /&gt;</code> element.
 * Supports the upload of a single file and includes:
 *   - generation of a thumbnail image using the HTML5 File API (where available)
 *   - the File API is also used to provide validation of the size and type of the uploaded
 *     file (error messages are added to the MessageStore and the form to which this component is added
 *     is responsible for rendering these messages using a Messages panel)
 *
 * If the File API is not available (IE < 10), the component falls back to rendering the name of the uploaded file.
 *
 * @param {string} data-id
 *    used to generate data-id attributes for various inner HTML elements.
 * @param {string} [className]
 *    an optional classname to add to the container node.
 * @param {string} labelSelect
 *    text to display on the button when no file has been selected.
 * @param {string} labelRemove
 *    text to display for the link to remove an uploaded file.
 * @param {string} [labelSelectOther]
 *    override text to display on the button when a file had been selected (optional).
 * @param {string} [labelMaxFileSize]
 *    text to display for the max file size an uploaded file.
 *
 * @param {FileUpload~onPreviewReady} [onPreviewReady]
 *    notifies the parent that the component is done processing the
 *    file.  The name is a little misleading but kept for backwards compatibility with the v1 component.
 * @param {FileUpload~onError} [errorHandler] function to call with error message codes when an error is encountered.
 * @param {FileUpload~onFileChange} onChange
 *    callback to be triggered when new file selected
 * @param {FileUpload~onValidateCallback} [validator]
 *    callback to validate file selection when selection is made. The message returned by the validator
 *    will be displayed in the component.
 *
 * @param {number} maxFileSizeKb
 *    the maximum size (in KB) of the uploaded file (default 5MB)
 * @param {string} accept
 *    comma-separated string of MIME types that are fed to the 'accept' attribute of the &lt;input&gt;
 *    element and used in the file type validation. Pass an empty string to the property to disable validation.
 * @param {string} [filesAcceptedMsg]
 *    text describing the accepted file types
 * @param {string} [defaultImage]
 *    the url for the default image to use
 *
 * @param {boolean} [showThumbnail=false]
 *    controls whether a thumbnail is shown if an image file is selected
 * @param {boolean} [disabled]
 *    controls whether the component is disabled
 * @param {boolean} [stacked]
 *    controls whether to display file names inline or on a separate line
 * @param {bool} [controlled=false]
 *    A boolean to enable the component to be externally managed.  True will relinquish control to the components owner.
 *    False or not specified will cause the component to manage state internally but still execute the callbacks
 *    in case the owner is interested.
 *
 * @example
 *   <FileUpload accept="image/jpeg, image/jpg, image/gif, image/png" maxFileSizeKb={10} labelSelect="" />
 *
 */

var FileUpload = React.createClass({
    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false,
            accept: Constants.Accept.IMAGE,
            showRemoveButton: true,
        };
    },

    render: function () {
        return (
            this.props.controlled
                    ? <StatelessFileUpload ref="stateless" {...this.props} />
                    : <StatefulFileUpload ref="stateful" {...this.props} />);
    }
});

FileUpload.ErrorCodes = Constants.ErrorCodes;
FileUpload.Accept = Constants.Accept;

module.exports = FileUpload;
