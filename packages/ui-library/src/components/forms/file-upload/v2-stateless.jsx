var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx");

/**
 * @name FileUploadStateless
 * @memberof FileUpload
 * @desc This is a wrapper around the stateless (controlled=true) FileUpload.
 */
module.exports = React.createClass({
    displayName: "FileUploadStateless",

    propTypes: {
        //labels
        labelSelect: React.PropTypes.string.isRequired,
        labelSelectOther: React.PropTypes.string,
        labelRemove: React.PropTypes.string.isRequired,
        labelMaxFileSize: React.PropTypes.string,
        //callbacks
        onRemove: React.PropTypes.func.isRequired,
        onChange: React.PropTypes.func.isRequired,
        //flags
        disabled: React.PropTypes.bool,
        stacked: React.PropTypes.bool,
        showFilename: React.PropTypes.bool,
        showThumbnail: React.PropTypes.bool,
        showRemoveButton: React.PropTypes.bool,
        //properties
        errorMessage: React.PropTypes.string,
        filesAcceptedMessage: React.PropTypes.string,
        fileName: React.PropTypes.string,
        title: React.PropTypes.string,
        accept: React.PropTypes.string,
        "data-id": React.PropTypes.string,
        thumbnailSrc: React.PropTypes.string
    },

    /*
     * Reset the input to the original state
     */
    resetComponent: function () {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    },

    render: function () {
        var fileSelected = !!(this.props.thumbnailSrc || this.props.fileName);
        var containerClass = classnames(this.props.className, "input-file-upload", {
            "image-upload": this.props.showThumbnail,
            "file-selected": fileSelected,
            disabled: this.props.disabled
        });

        return (
            <div className={containerClass} data-id={this.props["data-id"]}>
                <FormLabel className={classnames({ "form-error": this.props.errorMessage }) }>
                    <ImagePreview
                            show={this.props.showThumbnail}
                            title={this.props.title}
                            src={this.props.thumbnailSrc} />

                    <input
                            disabled={this.props.disabled}
                            type="file"
                            ref="fileInput"
                            name={this.props.fileName}
                            accept={this.props.accept}
                            onChange={this.props.onChange}
                            data-id={this.props["data-id"] + "-input"} />

                    <FileRestrictions
                            show={this.props.showThumbnail}
                            data-id={this.props["data-id"] + "-restrictions"}
                            labelMaxFileSize={this.props.labelMaxFileSize}
                            labelAcceptedFileTypes={this.props.labelAcceptedFileTypes} />

                    <button className="inline choose">
                        {(fileSelected && this.props.labelSelectOther) || this.props.labelSelect}
                    </button>

                    <FormError
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errormessage"} />
                </FormLabel>

                <div className={classnames("file-info", { stacked: this.props.stacked })}>
                    <Filename
                            show={this.props.showFilename}
                            data-id={this.props["data-id"] + "-fileName"}
                            value={this.props.fileName} />

                    <a className="file-remove" ref="remove" onClick={this.props.onRemove}>
                        {this.props.labelRemove}
                    </a>
                </div>

                <AcceptMessage
                        data-id={this.props["data-id"] + "-filesAcceptedMessage"}
                        label={this.props.filesAcceptedMessage} />
            </div>
        );
    }
});

var ImagePreview = React.createClass({
    render: function () {
        if (!this.props.show) { return null; }

        return (
            <div>
                {this.props.title && <div>{this.props.title}</div>}
                <span className="image-icon"></span>
                    <span className="input-image-thumb">
                        <img src={this.props.src} ref="imageThumb" data-id="imageThumb" />
                    </span>
            </div>);
    }
});

var FileRestrictions = React.createClass({
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

var AcceptMessage = React.createClass({
    render: function () {
        if (!this.props.value) { return null; }

        return (
            <div className="image-types" data-id={this.props["data-id"]}>
                {this.props.value}
            </div>);
    }
});

var Filename = React.createClass({
    render: function () {
        if (!this.props.show) { return null; }

        return (
            <span className="file-name" data-id={this.props["data-id"]}>
                <span className="icon-file"></span>
                {this.props.value}
            </span>);
    }
});
