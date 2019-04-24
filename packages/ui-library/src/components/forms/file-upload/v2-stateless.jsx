import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import FormLabel from "../FormLabel";
import FormError from "../FormError";
import Button from "../../buttons/Button";
import { cannonballChangeWarning } from "../../../util/DeprecationUtils";
import { flagsPropType } from "../../../util/FlagUtils";

/**
 * @name FileUploadStateless
 * @memberof FileUpload
 * @desc This is a wrapper around the stateless (stateless=true) FileUpload.
 */
export default class extends Component {
    static displayName = "FileUploadStateless";

    static propTypes = {
        //labels
        labelText: PropTypes.string,
        label: PropTypes.string,
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
        defaultImage: PropTypes.string,
        errorMessage: PropTypes.string,
        filesAcceptedMessage: PropTypes.string,
        fileName: PropTypes.string,
        name: PropTypes.string,
        accept: PropTypes.string,
        "data-id": PropTypes.string,
        thumbnailSrc: PropTypes.string,

        flags: flagsPropType
    };

    _useTrueDefault = () => this.props.flags.includes("true-default")

    componentDidMount() {
        if (!this._useTrueDefault() && this.props.defaultImage) {
            cannonballChangeWarning({
                message: "The \"defaultImage\" parameter will no longer " +
                    "be the same as passing in thumbnailSrc. Instead, " +
                    "defaultImage will show an image when there is no " +
                    "current thumbnail, either due to not passing the prop " +
                    "or due to removing the image in the stateful version."
            });
        }
    }

    /*
     * Reset the input to the original state
     */
    resetComponent = () => {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    };

    render() {
        const fileSelected = !!(this.props.thumbnailSrc || this.props.fileName);
        const containerClass = classnames(this.props.className, "input-file-upload", {
            "image-upload": this.props.showThumbnail,
            "file-selected": fileSelected,
            disabled: this.props.disabled,
            "form-error": !!this.props.errorMessage
        });

        const {
            defaultImage,
            thumbnailSrc
        } = this.props;

        const useDefault = this._useTrueDefault() && defaultImage && !thumbnailSrc;

        return (
            <div className={containerClass} data-id={this.props["data-id"]}>
                <FormLabel
                    className={classnames({ "form-error": this.props.errorMessage }) }
                    value={this.props.labelText || this.props.label}>
                    <ImagePreview
                        isDefault={useDefault}
                        show={this.props.showThumbnail}
                        src={useDefault ? defaultImage : thumbnailSrc}
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
                    <Button inline className="choose">
                        {(fileSelected && this.props.labelSelectOther) || this.props.labelSelect}
                    </Button>
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
}

function ImagePreview({
    isDefault,
    src,
    show,
}) {
    return show ? (
        <div>
            {!isDefault && <span className="image-icon"></span>}
            <span
                className={classnames(
                    "input-image-thumb",
                    isDefault ? "input-image-thumb--default" : ""
                )}>
                <img src={src} data-id="imageThumb" alt="Thumbnail" />
            </span>
        </div>
    ) : null;
}

function FileRestrictions({
    "data-id": dataId,
    labelAcceptedFileTypes,
    labelMaxFileSize,
    show
}) {
    return show ? (
        <span className="file-size">
            <span className="max-size" data-id={dataId + "-max-size"}>
                {labelMaxFileSize}
            </span>
            <span className="accepted-types" data-id={dataId + "-accepted-types"}>
                {labelAcceptedFileTypes}
            </span>
        </span>
    ) : null;
}

function AcceptMessage({
    "data-id": dataId,
    value
}) {
    return value ? (
        <div className="image-types" data-id={dataId}>
            {value}
        </div>
    ) : null;
}

function Filename({
    "data-id": dataId,
    show,
    value
}) {
    return show ? (
        <span className="file-name" data-id={dataId}>
            <span className="icon-file"></span>
            {value}
        </span>
    ) : null;
}
