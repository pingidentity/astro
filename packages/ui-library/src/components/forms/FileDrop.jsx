
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";


/**
 * @class FileDrop
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [data-id="file-drop"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string[]} [accept]
 *     An optional array of the the allowed file mime types or file extensions.
 * @param {string} [fileName]
 *     The name of the currently selected file.
 * @param {function} [onRemove]
 *     The callback triggered when the remove file link is clicked.
 * @param {function} [onValueChange]
 *     The callback triggered when a file is dropped or selected.
 * @param {Object} [strings]
 *     An object containing the various blurbs of text rendered in the component.
 *
 * @example
 *     <FileDrop
 *         onValueChange={this._handleChange}
 *         onRemove={this._handleRemove}
 *         fileName={this.state.selectedFile}
 *         accept={["text/csv", "image/jpeg", "image/png"]}
 *     />
 *
 */

export default class FileDrop extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        accept: PropTypes.array,
        fileName: PropTypes.string,
        onRemove: PropTypes.func,
        onValueChange: PropTypes.func,
        strings: PropTypes.objectOf(PropTypes.string),
    };

    static defaultProps = {
        "data-id": "input-filedrop",
        accept: [],
        onValidateFile: _.noop,
        onValueChange: _.noop,
        strings: {},
    };

    state = {
        hovered: false,
    };

    defaultStrings = {
        drop: "Drag and drop a file here to upload",
        separator: "or",
        select: "Select a file",
        change: "Change file",
        remove: "Remove file",
    };

    _preventDefaults (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    _onHover = () => this.setState({ hovered: true })
    _onExit = () => this.setState({ hovered: false });

    _onInputChange = (e) => {
        const file = e.target.files ? e.target.files[0] : null;
        this._handleFileChange(file, e);
    }

    _onDrop = (e) => {
        this._preventDefaults(e);

        const file = e.dataTransfer && e.dataTransfer.files ? e.dataTransfer.files[0] : null;

        this._handleFileChange(file, e);
    }

    _validateFile = ({ name = "", type }) => {
        const {
            accept
        } = this.props;
        if (accept.length > 0) {
            const extension = name.substring(name.lastIndexOf(".") + 1, name.length);
            return accept.some(acc => acc === type || acc === extension);
        } else {
            return true;
        }
    }

    _handleFileChange = (file, e) => {
        const isValidFile = this._validateFile(file);

        this.props.onValidateFile(isValidFile, file, e);

        if (!isValidFile) {
            return false;
        }

        this.props.onValueChange(file, e);
    }

    _renderInput = (labelContent) => {
        return (
            <label key="label" data-id={`${this.props["data-id"]}-label`}>
                {labelContent}
                <input
                    data-id={`${this.props["data-id"]}-input`}
                    type="file"
                    onChange={this._onInputChange}
                    ref={ (fi) => this.fileInput = fi }
                />
            </label>
        );
    }

    _renderString = (key) => {
        return this.props.strings[key] || this.defaultStrings[key];
    }

    componentDidMount () {
        ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
            this.dropFile.addEventListener(eventName, this._preventDefaults, false);
        });

        ["dragleave", "drop"].forEach(eventName => {
            this.dropFile.addEventListener(eventName, this._onExit, false);
        });

        ["dragenter", "dragover"].forEach(eventName => {
            this.dropFile.addEventListener(eventName, this._onHover, false);
        });

        ["drop"].forEach(eventName => {
            this.dropFile.addEventListener(eventName, this._onDrop, false);
        });
    }

    componentWillUnmount () {
        ["dragenter", "dragleave", "dragover", "drop"].forEach(eventName => {
            this.dropFile.removeEventListener(eventName, this._preventDefaults);
        });

        ["dragleave", "drop"].forEach(eventName => {
            this.dropFile.removeEventListener(eventName, this._onExit);
        });

        ["dragenter", "dragover"].forEach(eventName => {
            this.dropFile.removeEventListener(eventName, this._onHover);
        });

        ["drop"].forEach(eventName => {
            this.dropFile.removeEventListener(eventName, this._onDrop);
        });
    }

    render () {
        const fileSelected = !!this.props.fileName;
        const classNames = {
            "input-filedrop--hover": this.state.hovered,
            "input-filedrop--selected": fileSelected,
        };

        return (
            <div
                data-id={this.props["data-id"]}
                ref={ (df) => this.dropFile = df }
                className={classnames("input-filedrop", classNames)}>

                {!fileSelected && ([
                    <div className="input-filedrop__upload-text" key="input-filedrop__upload-text">
                        <div data-id={`${this.props["data-id"]}-drop-text`}>
                            {this._renderString("drop")}
                        </div>
                        <div data-id={`${this.props["data-id"]}-separator-text`}>
                            {this._renderString("separator")}
                        </div>
                        <div
                            data-id={`${this.props["data-id"]}-select-link`}
                            className="input-filedrop__link">
                            {this._renderString("select")}
                        </div>
                    </div>,
                    this._renderInput()
                ])}
                {fileSelected && (
                    <div
                        className="input-filedrop__selected-content"
                        title={this.props.fileName}>

                        <span
                            data-id={`${this.props["data-id"]}-icon`}
                            className="icon-check icon__rounded input-filedrop__icon"
                        />
                        <span
                            data-id={`${this.props["data-id"]}-file-name`}
                            className="input-filedrop__selected-text" >
                            {this.props.fileName}
                        </span>
                        {this._renderInput(
                            <span className="input-filedrop__link input-filedrop__divider">
                                {this._renderString("change")}
                            </span>
                        )}
                        {this.props.onRemove && (
                            <span
                                data-id={`${this.props["data-id"]}-remove-link`}
                                className="input-filedrop__link input-filedrop__divider"
                                onClick={this.props.onRemove}>
                                {this._renderString("remove")}
                            </span>
                        )}
                    </div>
                )}
            </div>
        );
    }

}
