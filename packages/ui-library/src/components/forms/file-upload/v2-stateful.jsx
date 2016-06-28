var React = require("react"),
    Constants = require("./v2-constants.js"),
    StatelessFileUpload = require("./v2-stateless.jsx"),
    Utils = require("../../../util/Utils"),
    fixOrientation = require("fix-orientation"),
    readExif = require("exif-js"),
    _ = require("underscore");

/**
 * @class StatefulFileUpload
 * @desc this is a wrapper around the StatefulFileUpload to give the user image preview and error messages without
 * having to implement that logic.
 */
module.exports = React.createClass({
    displayName: "StatefulFileUpload",

    getInitialState: function () {
        return {
            errorMessage: "",
            thumbnailSrc: this.props.defaultImage || this.props.thumbnailSrc,
            labelAcceptedFileTypes: this.props.labelAcceptedFileTypes || this.props.accept.split("image/").join("")
        };
    },

    getDefaultProps: function () {
        return {
            onPreviewReady: _.noop
        };
    },

    _validateFileSize: function (fileSizeInBytes) {
        if (this.props.maxFileSizeKb && fileSizeInBytes > (this.props.maxFileSizeKb * 1000)) {
            this._reset();
            throw Constants.ErrorCodes.TOO_BIG;
        }
    },

    _validateMimeType: function (type) {
        if (this.props.accept && !this.props.accept.match(new RegExp("\\b" + type + "\\b"))) {
            this._reset();
            throw Constants.ErrorCodes.WRONG_MIME_TYPE;
        }
    },

    _fileReadSuccess: function (file, contentUrl) {
        var self = this;

        this.setState({ thumbnailSrc: contentUrl });
        this.props.onPreviewReady(contentUrl);

        if (contentUrl && file.type.match(/^image\/jpe?g$/i)) {
            //try to read exif data the base64 data was passed
            readExif.getData(file, function () {
                if (this.exifdata.Orientation) {
                    //correct and display the image according to the exif orientation
                    fixOrientation(contentUrl, { image: true }, function (fixedImgContentUrl) {
                        self.setState({ thumbnailSrc: fixedImgContentUrl });
                        self.props.onPreviewReady(fixedImgContentUrl);
                    });
                }
            });
        }
    },

    _readFile: function (file) {
        var reader = new FileReader();

        reader.onloadend = function () { this._fileReadSuccess(file, reader.result); }.bind(this);
        reader.onerror = function () { this.props.onError(Constants.ErrorCodes.CANT_READ); }.bind(this);
        reader.readAsDataURL(file);
    },

    _processWithHtml5Api: function (file, path) {
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
    },

    _processSimple: function () {
        this.setState({ errorMessage: "", thumbnailSrc: "" });
    },

    _process: function (files, path) {
        if (this.props.validator) {
            var errorMessage = this.props.validator(files[0]);

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
    },

    _handleChange: function (e) {
        if (this.props.onChange) {
            this.props.onChange();
        }

        this._process(e.target.files, e.target.value);
    },

    _reset: function () {
        this.setState({
            thumbnailSrc: "",
            fileName: ""
        });
        this.refs.stateless.resetComponent();
    },

    _handleRemove: function () {
        if (this.props.onRemove) {
            this.props.onRemove();
        }
        if (this.props.disabled) {
            return;
        }
        if (this.props.validator) {
            this.setState({
                errorMessage: this.props.validator()
            });
        }

        this._reset();
    },

    render: function () {
        return (
            <StatelessFileUpload ref="stateless" {...this.props} {...this.state}
                showFilename={!this.props.showThumbnail}
                onRemove={this._handleRemove}
                onChange={this._handleChange} />
        );
    }
});
