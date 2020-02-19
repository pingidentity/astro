import React, { Component } from "react";
import StatelessFileUpload from "./v2-stateless";
import Utils from "../../../util/Utils";
import _ from "underscore";
import validator from "../../../util/Validators";
import readExif from "exif-js";
import fixOrientation from "fix-orientation";
import Constants from "./v2-constants.js";

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

    state = {
        errorMessage: "",
        thumbnailSrc: this.props.thumbnailSrc,
        labelAcceptedFileTypes: this.props.labelAcceptedFileTypes || this.props.accept.split("image/").join("")
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


    _processWithHtml5Api = (file, path) => {
        this.setState({
            fileName: Utils.stripFakePath(path)
        });

        const isValidFileSize = validator.isValidFileSize(file.size, this.props.maxFileSizeKb);

        const isValidMimeType = validator.isValidMimeType(file.type, this.props.accept);

        try {
            if (!isValidFileSize) {
                this.resetComponent();
                throw Constants.ErrorCodes.TOO_BIG;
            }

            if (!isValidMimeType) {
                this.resetComponent();
                throw Constants.ErrorCodes.WRONG_MIME_TYPE;
            }

            if (this.props.showThumbnail && file.type.match("image.*")) {
                validator.readFile(
                    file,
                    this._fileReadSuccess,
                    this.props.onError,
                    Constants.ErrorCodes.CANT_READ
                );
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
