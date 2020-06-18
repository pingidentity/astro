import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import { isString } from "underscore";
import FormLabel from "../FormLabel";
import FormError from "../FormError";
import Button from "../../buttons/Button";
import { withFocusOutline } from "../../../util/KeyboardUtils";
import { getClickableA11yProps } from "../../../util/PropUtils";

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
        label: PropTypes.node,
        labelSelect: PropTypes.string,
        labelSelectOther: PropTypes.string,
        labelRemove: PropTypes.string,
        labelMaxFileSize: PropTypes.string,
        description: PropTypes.node,
        //callbacks
        onRemove: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        //flags
        disabled: PropTypes.bool,
        showFilename: PropTypes.bool,
        showThumbnail: PropTypes.bool,
        showRemoveButton: PropTypes.bool,
        //properties
        defaultImage: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
        ]),
        errorMessage: PropTypes.string,
        filesAcceptedMessage: PropTypes.string,
        fileName: PropTypes.string,
        name: PropTypes.string,
        accept: PropTypes.string,
        "data-id": PropTypes.string,
        thumbnailSrc: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.string,
        ]),

        required: PropTypes.bool,
    };

    // Testing this would require testing that the file input was clicked,
    // which Jest doesn't have a good way of doing. We can't really test an
    // actual file input change, either, because Jest isn't creating a real
    // file upload screen.
    /* istanbul ignore next*/
    _clickFileInput = e => {
        e.stopPropagation();
        this.refs.fileInput.click();
    }

    /*
     * Reset the input to the original state
     */
    resetComponent = () => {
        ReactDOM.findDOMNode(this.refs.fileInput).value = "";
    };

    render() {
        const {
            defaultImage,
            thumbnailSrc
        } = this.props;

        const fileSelected = !!(thumbnailSrc || this.props.fileName);
        const containerClass = classnames(this.props.className, "input-file-upload", {
            "image-upload": this.props.showThumbnail,
            "file-selected": fileSelected,
            disabled: this.props.disabled,
            "form-error": !!this.props.errorMessage
        });

        const useDefault = defaultImage && !thumbnailSrc;

        return (
            <div className={containerClass} data-id={this.props["data-id"]}>
                <input
                    disabled={this.props.disabled}
                    type="file"
                    ref="fileInput"
                    name={this.props.name || this.props.fileName}
                    accept={this.props.accept}
                    onChange={this.props.onChange}
                    data-id={this.props["data-id"] + "-input"}
                />
                <FormLabel
                    className={classnames({ "form-error": this.props.errorMessage }) }
                    value={this.props.labelText || this.props.label}
                    description={this.props.description}>
                    <ImagePreview
                        disabled={this.props.disabled}
                        isDefault={useDefault}
                        onClick={this._clickFileInput}
                        show={this.props.showThumbnail}
                        src={useDefault ? defaultImage : thumbnailSrc}
                    />
                    <FileRestrictions
                        show={this.props.showThumbnail}
                        data-id={this.props["data-id"] + "-restrictions"}
                        labelMaxFileSize={this.props.labelMaxFileSize}
                        labelAcceptedFileTypes={this.props.labelAcceptedFileTypes}
                    />
                    {!this.props.showThumbnail &&
                    <Button
                        data-id="upload-button"
                        disabled={this.props.disabled}
                        inline
                        className= {classnames (
                            "choose",
                            { "input-file-upload__select-btn--required": this.props.required }
                        )}
                        onClick={this._clickFileInput}
                    >
                        {(fileSelected && this.props.labelSelectOther) || this.props.labelSelect}
                    </Button>
                    }
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
                        <a
                            className="file-remove"
                            data-id="file-remove"
                            ref="remove"
                            onClick={this.props.onRemove}
                        >
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

const ImagePreview = withFocusOutline(({
    disabled,
    isDefault,
    onClick,
    src,
    show,
}) => {
    const isNode = !isString(src);
    return show ? (
        <div>
            {!isDefault &&
            <span
                onClick={onClick}
                {...getClickableA11yProps(onClick)}
                className={classnames(
                    "image-icon",
                    { "image-icon--disabled": disabled }
                )}
            />}
            <span
                className={classnames(
                    "input-image-thumb",
                    isDefault ? "input-image-thumb--default" : ""
                )}
                data-id="image-preview"
                onClick={onClick}
                {...getClickableA11yProps(onClick)}
            >
                {isNode
                    ? src
                    : <img
                        className={classnames(
                            "input-image-thumb__img",
                            { "input-image-thumb__img--disabled": disabled }
                        )}
                        src={src}
                        data-id="imageThumb"
                        alt="Thumbnail"
                    />
                }
            </span>
        </div>
    ) : null;
});

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
            <span className="icon-file" />
            {value}
        </span>
    ) : null;
}
