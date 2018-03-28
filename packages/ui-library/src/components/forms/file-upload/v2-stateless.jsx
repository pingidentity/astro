var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel"),
    FormError = require("../FormError");

/**
 * @name FileUploadStateless
 * @memberof FileUpload
 * @desc This is a wrapper around the stateless (stateless=true) FileUpload.
 */
module.exports = class extends React.Component {
    static displayName = "FileUploadStateless";

    static propTypes = {
        //labels
        labelText: PropTypes.string,
        labelSelect: PropTypes.string.isRequired,
        labelSelectOther: PropTypes.string,
        labelRemove: PropTypes.string.isRequired,
        labelMaxFileSize: PropTypes.string,
        //callbacks
        onRemove: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        //flags
        disabled: PropTypes.bool,
        showFilename: PropTypes.bool,
        showThumbnail: PropTypes.bool,
        showRemoveButton: PropTypes.bool,
        //properties
        errorMessage: PropTypes.string,
        filesAcceptedMessage: PropTypes.string,
        fileName: PropTypes.string,
        name: PropTypes.string,
        accept: PropTypes.string,
        "data-id": PropTypes.string,
        thumbnailSrc: PropTypes.string
    };

    /*
     * Reset the input to the original state
     */
    resetComponent = () => {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    };

    render() {
        var fileSelected = !!(this.props.thumbnailSrc || this.props.fileName);
        var containerClass = classnames(this.props.className, "input-file-upload", {
            "image-upload": this.props.showThumbnail,
            "file-selected": fileSelected,
            disabled: this.props.disabled,
            "form-error": !!this.props.errorMessage
        });

        return (
            <div className={containerClass} data-id={this.props["data-id"]}>
                <FormLabel
                    className={classnames({ "form-error": this.props.errorMessage }) }
                    value={this.props.labelText}>
                    <ImagePreview
                        show={this.props.showThumbnail}
                        src={this.props.thumbnailSrc}
                    />
                    <input
                        disabled={this.props.disabled}
                        type="file"
                        ref="fileInput"
                        name={this.props.name || this.props.fileName}
                        accept={this.props.accept}
                        onChange={this.props.onChange}
                        data-id={this.props["data-id"] + "-input"}
                    />
                    <FileRestrictions
                        show={this.props.showThumbnail}
                        data-id={this.props["data-id"] + "-restrictions"}
                        labelMaxFileSize={this.props.labelMaxFileSize}
                        labelAcceptedFileTypes={this.props.labelAcceptedFileTypes}
                    />
                    <button className="inline choose">
                        {(fileSelected && this.props.labelSelectOther) || this.props.labelSelect}
                    </button>
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-errormessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errormessage"}
                        />
                    )}
                </FormLabel>

                {fileSelected &&
                    <div className="file-info">
                        <Filename
                            show={this.props.showFilename}
                            data-id={this.props["data-id"] + "-fileName"}
                            value={this.props.fileName}
                        />
                        <a className="file-remove" ref="remove" onClick={this.props.onRemove}>
                            {this.props.labelRemove}
                        </a>
                    </div>
                }

                <AcceptMessage
                    data-id={this.props["data-id"] + "-filesAcceptedMessage"}
                    label={this.props.filesAcceptedMessage}
                />
            </div>
        );
    }
};

class ImagePreview extends React.Component {
    render() {
        if (!this.props.show) { return null; }

        return (
            <div>
                <span className="image-icon"></span>
                <span className="input-image-thumb">
                    <img src={this.props.src} ref="imageThumb" data-id="imageThumb" />
                </span>
            </div>);
    }
}

class FileRestrictions extends React.Component {
    render() {
        if (!this.props.show) { return null; }

        return (
            <span className="file-size">
                <span className="max-size" data-id={this.props["data-id"] + "-max-size"}>
                    {this.props.labelMaxFileSize}
                </span>
                <span className="accepted-types" data-id={this.props["data-id"] + "-accepted-types"}>
                    {this.props.labelAcceptedFileTypes}
                </span>
            </span>);
    }
}

class AcceptMessage extends React.Component {
    render() {
        if (!this.props.value) { return null; }

        return (
            <div className="image-types" data-id={this.props["data-id"]}>
                {this.props.value}
            </div>);
    }
}

class Filename extends React.Component {
    render() {
        if (!this.props.show) { return null; }

        return (
            <span className="file-name" data-id={this.props["data-id"]}>
                <span className="icon-file"></span>
                {this.props.value}
            </span>);
    }
}
