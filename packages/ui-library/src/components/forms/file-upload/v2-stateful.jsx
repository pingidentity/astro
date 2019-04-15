import React, { Component } from "react";
import Constants from "./v2-constants.js";
import StatelessFileUpload from "./v2-stateless";
import Utils from "../../../util/Utils";
import fixOrientation from "fix-orientation";
import readExif from "exif-js";
import _ from "underscore";

/**
 * @name FileUploadStateful
 * @memberof FileUpload
 * @desc This is a wrapper around the stateful (stateless=false) FileUpload to give the user image preview
 *    and error messages without having to implement that logic.
 */
export default class FileUpload extends Component {
    static displayName = "FileUploadStateful";

    static defaultProps = {
        onPreviewReady: _.noop
    };

    _useTrueDefault = () => this.props.flags.includes("true-default")

    state = {
        errorMessage: "",
        thumbnailSrc: this._useTrueDefault()
            ? this.props.thumbnailSrc
            : this.props.defaultImage || this.props.thumbnailSrc,
        labelAcceptedFileTypes: this.props.labelAcceptedFileTypes || this.props.accept.split("image/").join("")
    };

    _validateFileSize = (fileSizeInBytes) => {
        if (this.props.maxFileSizeKb && fileSizeInBytes > (this.props.maxFileSizeKb * 1000)) {
            this.resetComponent();
            throw Constants.ErrorCodes.TOO_BIG;
        }
    };

    _validateMimeType = (type) => {
        if (this.props.accept && !this.props.accept.match(new RegExp("\\b" + type + "\\b"))) {
            this.resetComponent();
            throw Constants.ErrorCodes.WRONG_MIME_TYPE;
        }
    };

    _fileReadSuccess = (file, contentUrl) => {
        var self = this;

        this.setState({ thumbnailSrc: contentUrl });
        this.props.onPreviewReady(contentUrl);

        if (contentUrl && file.type.match(/^image\/jpe?g$/i)) {
            //try to read exif data the base64 data was passed
            readExif.getData(file, function () {
                if (this.exifdata && this.exifdata.Orientation) {
                    //correct and display the image according to the exif orientation
                    fixOrientation(contentUrl, { image: true }, function (fixedImgContentUrl) {
                        self.setState({ thumbnailSrc: fixedImgContentUrl });
                        self.props.onPreviewReady(fixedImgContentUrl);
                    });
                }
            });
        }
    };

    _readFile = (file) => {
        var reader = new FileReader();

        reader.onloadend = function () { this._fileReadSuccess(file, reader.result); }.bind(this);
        reader.onerror = function () { this.props.onError(Constants.ErrorCodes.CANT_READ); }.bind(this);
        reader.readAsDataURL(file);
    };

    _processWithHtml5Api = (file, path) => {
        this.setState({
            fileName: Utils.stripFakePath(path)
        });

        try {
            this._validateFileSize(file.size);
            this._validateMimeType(file.type);

            if (this.props.showThumbnail && file.type.match("image.*")) {
                this._readFile(file);
            } else {
                this._processSimple();
            }
        } catch (err) {
            this.props.onError(err);
        }
    };

    _processSimple = () => {
        this.setState({ errorMessage: "", thumbnailSrc: "" });
    };

    _process = (files, path) => {
        if (!files) {
            return;
        }
        if (this.props.onValidate) {
            var errorMessage = this.props.onValidate(files[0]);

            if (errorMessage) {
                this.setState({ errorMessage: errorMessage });
                return;
            }
        }

        if (files && files[0]) {
            if (Utils.isHtmlFileApiSupported()) {
                this._processWithHtml5Api(files[0], path);
            } else {
                this._processSimple();
            }
        }
    };

    _handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
        this._process(e.target.files, e.target.value);
    };

    _handleRemove = () => {
        if (this.props.onRemove) {
            this.props.onRemove();
        }
        if (this.props.disabled) {
            return;
        }
        if (this.props.onValidate) {
            this.setState({
                errorMessage: this.props.onValidate()
            });
        }
        this.resetComponent();
    };

    /*
     * Reset the input
     */
    resetComponent = () => {
        this.setState({
            thumbnailSrc: "",
            fileName: ""
        });
        this.refs.FileUploadStateless.resetComponent();
    };

    render() {
        var props = _.defaults({
            ref: "FileUploadStateless",
            showFilename: !this.props.showThumbnail,
            onRemove: this._handleRemove,
            onChange: this._handleChange
        }, this.props, this.state);

        return <StatelessFileUpload {...props} />;
    }
}
