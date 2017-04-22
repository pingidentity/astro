var React = require("re-react"),
    ReactVanilla = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx"),
    Utils = require("../../../util/Utils.js");

/**
 * @name FileUploadStateless
 * @memberof FileUpload
 * @desc This is a wrapper around the stateless (stateless=true) FileUpload.
 */
module.exports = React.createClass({
    displayName: "FileUploadStateless",

    propTypes: {
        //labels
        labelText: React.PropTypes.string.affectsRendering,
        labelSelect: React.PropTypes.string.isRequired.affectsRendering,
        labelSelectOther: React.PropTypes.string.affectsRendering,
        labelRemove: React.PropTypes.string.isRequired.affectsRendering,
        labelMaxFileSize: React.PropTypes.string.affectsRendering,
        //callbacks
        onRemove: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        //flags
        disabled: React.PropTypes.bool.affectsRendering,
        showFilename: React.PropTypes.bool.affectsRendering,
        showThumbnail: React.PropTypes.bool.affectsRendering,
        showRemoveButton: React.PropTypes.bool.affectsRendering,
        //properties
        errorMessage: React.PropTypes.string.affectsRendering,
        filesAcceptedMessage: React.PropTypes.string.affectsRendering,
        fileName: React.PropTypes.string.affectsRendering,
        title: React.PropTypes.string.affectsRendering,
        accept: React.PropTypes.string.affectsRendering,
        "data-id": React.PropTypes.string,
        thumbnailSrc: React.PropTypes.string.affectsRendering
    },

    /*
     * Reset the input to the original state
     */
    resetComponent: function () {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    },

    componentWillMount: function () {
        if (!Utils.isProduction() && this.props.title) {
            console.warn(Utils.deprecateMessage("title", "labelText"));
        }
    },

    render: function () {
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
                    value={this.props.labelText || this.props.title}>

                    <ImagePreview
                        show={this.props.showThumbnail}
                        src={this.props.thumbnailSrc}
                    />
                    <input
                        disabled={this.props.disabled}
                        type="file"
                        ref="fileInput"
                        name={this.props.fileName}
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
});

var ImagePreview = ReactVanilla.createClass({
    render: function () {
        if (!this.props.show) { return null; }

        return (
            <div>
                <span className="image-icon"></span>
                <span className="input-image-thumb">
                    <img src={this.props.src} ref="imageThumb" data-id="imageThumb" />
                </span>
            </div>);
    }
});

var FileRestrictions = ReactVanilla.createClass({
    render: function () {
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
});

var AcceptMessage = ReactVanilla.createClass({
    render: function () {
        if (!this.props.value) { return null; }

        return (
            <div className="image-types" data-id={this.props["data-id"]}>
                {this.props.value}
            </div>);
    }
});

var Filename = ReactVanilla.createClass({
    render: function () {
        if (!this.props.show) { return null; }

        return (
            <span className="file-name" data-id={this.props["data-id"]}>
                <span className="icon-file"></span>
                {this.props.value}
            </span>);
    }
});
