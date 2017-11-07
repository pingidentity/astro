var PropTypes = require("prop-types");
var React = require("react"),
    _ = require("underscore"),
    Utils = require("../../../util/Utils.js"),
    StatelessFileUpload = require("./v2-stateless.jsx"),
    StatefulFileUpload = require("./v2-stateful.jsx"),
    Constants = require("./v2-constants.js");

/**
 * @callback FileUpload~onValidate
 *
 * @param {object} file
 *    Browser File object to validate.
 *
 * @returns {string|undefined} errorMessage
 *    If no error - undefined.
 */

/**
 * @callback FileUpload~onPreviewReady
 *
 * @param {string} url
 *    The preview url, can be used directly with &lt;img /&gt; tags or css background styles.
 */

/**
 * @callback FileUpload~onError
 *
 * @param {string} errorCode
 *   Error code, supported error codes:
 *       - fileupload.error.read - there were browser problem while reading file.
 *       - fileupload.error.type - selected file doesn't match provided list of allowed mime types.
 *       - fileupload.error.size - selected file exceeding size limit.
 */

/**
* @callback FileUpload~onChange
*
* @param {object} e
*    The ReactJS synthetic event object.
*/

/**
 * @class FileUpload
 * @desc Component to render an <code>&lt;input type="file" /&gt;</code> element.
 *     Supports the upload of a single file and includes:
 *         - generation of a thumbnail image using the HTML5 File API (where available)
 *         - the File API is also used to provide validation of the size and type of the uploaded
 *           file (error messages are added to the MessageStore and the form to which this component is added
 *           is responsible for rendering these messages using a Messages panel)
 *
 *     If the File API is not available (IE < 10), the component falls back to rendering the name of the uploaded file.
 *
 * @param {string} [data-id="file-upload"]
 *    To define the base "data-id" for the top-level HTML container.
 * @param {string} [className]
 *    CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *    To enable the component to be externally managed. True will relinquish control to the component's owner.
 *    False or not specified will cause the component to manage state internally.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
 *
 * @param {string} labelSelect
 *    Text to display on the button when no file has been selected.
 * @param {string} labelRemove
 *    Text to display for the link to remove an uploaded file.
 * @param {string} [labelSelectOther]
 *    Override text to display on the button when a file had been selected.
 * @param {string} [labelMaxFileSize]
 *    Text to display for the max file size an uploaded file.
 *
 * @param {FileUpload~onPreviewReady} [onPreviewReady]
 *    Callback to be triggered to notify the parent that the component is done processing the file.
 *    The name is a little misleading but kept for backwards compatibility with the v1 component.
 * @param {FileUpload~onError} [onError]
 *    Callback to be triggered when an error is encountered.
 * @param {FileUpload~onChange} onChange
 *    Callback to be triggered when a new file is selected.
 * @param {FileUpload~onRemove} [onRemove]
 *    Callback triggered when the selected image for file is removed
 * @param {FileUpload~onValidate} [onValidate]
 *    Callback to be triggered to validate file selection when a selection is made.
 *    The message returned by the validator will be displayed in the component.
 *
 * @param {string} [errorMessage]
 *    When defined this value is displayed as an error message.
 * @param {string} [fileName]
 *    The current/default value or name of the file upload input.
 * @param {string} accept
 *    Comma-separated string of MIME types that are fed to the 'accept' attribute of the &lt;input&gt;
 *    element and used in the file type validation. Pass an empty string to the property to disable validation.
 * @param {string} [filesAcceptedMessage]
 *    Text describing the accepted file types.
 * @param {string} [defaultImage]
 *    The url for the default image to use.
 * @param {string} [labelText]
 *     The text to show as the input's label.
 * @param [title] {string}
 *    DEPRECATED. Use "labelText" instead.
 * @param {number} maxFileSizeKb
 *    The maximum size (in KB) of the uploaded file (default 5MB).
 * @param {string} [thumbnailSrc]
 *    The current/default thumbnail image to display
 *
 * @param {boolean} [showFilename]
 *    When true, the value of the select file name is displayed as text
 * @param {boolean} [showThumbnail=false]
 *    Whether or not a thumbnail should be displayed if an image file is selected.
 * @param {boolean} [showRemoveButton=true]
 *    Whether or not the remove button should be displayed.
 * @param {boolean} [disabled=false]
 *    controls whether the component is disabled
 *
 *
 * @example
 *   <FileUpload accept="image/jpeg, image/jpg, image/gif, image/png" maxFileSizeKb={10} labelSelect="" />
 *
 */


class FileUpload extends React.Component {
    static displayName = "FileUpload";

    static propTypes = {
        controlled: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "file-upload",
        controlled: false,
        accept: Constants.Accept.IMAGE,
        showThumbnail: false,
        showRemoveButton: true,
        disabled: false
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    }

    render() {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return stateless
            ? <StatelessFileUpload {..._.defaults({ ref: "FileUploadStateless" }, this.props)} />
            : <StatefulFileUpload {..._.defaults({ ref: "FileUploadStateful" }, this.props)} />;
    }
}

FileUpload.ErrorCodes = Constants.ErrorCodes;
FileUpload.Accept = Constants.Accept;

module.exports = FileUpload;
