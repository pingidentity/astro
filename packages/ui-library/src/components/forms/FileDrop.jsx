
import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";


/**
* @callback FileDrop~onRemove
*/

/**
* @callback FileDrop~onValueChange
*
* @param {Object} file
*     The file object
* @param {Object} e
*     The even object provided with the onChange event
*/

/**
* @callback FileDrop~onValidateFile
*
* @param {boolean} isValidFile
*     A boolean indicating whether the file type is one the accepted file types.
* @param {Object} file
*     The file object
* @param {Object} e
*     The even object provided with the onChange event
*/

/**
 * @class FileDrop
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [data-id="file-drop"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string[]} [accept]
 *     An optional array of the the allowed file mime types or file extensions.
 * @param {string} [className]
 *     Optional CSS classname(s) applied to top-level container.
 * @param {node} [fileName]
 *     The name of the currently selected file.
 * @param {FileDrop~onRemove} [onRemove]
 *     The callback triggered when the remove file link is clicked.
 * @param {FileDrop~onValueChange} [onValueChange]
 *     A callback triggered when a file is dropped or selected.
 * @param {FileDrop~onValidateFile} [onValidateFile]
 *     The callback triggered when when a file is selected that idicates if the selected file type matches those allowed by the "accept" prop.
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
        className: PropTypes.string,
        fileName: PropTypes.node,
        onRemove: PropTypes.func,
        onValidateFile: PropTypes.func,
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

    _handleFileChange = (file, e) => {

        // needed for when canceling out of the file dialog
        if (!file) {
            return;
        }

        // Only keeping this in here for backwards compatibility. Existing file validation in this
        // component duplicated the functionality of <input> accept and did it very badly.
        this.props.onValidateFile(true, file, e);

        this.props.onValueChange(file, e);
    }

    _clickInput = () => {
        this.fileInput.click();
    }

    _handleRemove = () => {
        this.fileInput.value = null;
        this.props.onRemove();
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
        const {
            accept,
            renderContent,
            className,
            "data-id": dataId,
            fileName,
            hovered,
            onRemove,
        } = this.props;

        const fileSelected = !!fileName;
        const classNames = {
            "input-filedrop--hover": hovered,
            "input-filedrop--selected": fileSelected,
        };
        const text = { ...this.defaultStrings, ...this.props.strings };
        const customContent = typeof renderContent === "function";

        return (
            <div
                data-id={dataId}
                ref={ (df) => this.dropFile = df }
                className={classnames("input-filedrop", className, classNames)}>

                {customContent && renderContent({ inputRef: this.fileInput })}
                {!customContent && (
                    fileSelected ? (
                        <div
                            className="input-filedrop__selected-content"
                            title={fileName}>

                            <span
                                data-id={`${dataId}-icon`}
                                className="icon-check icon__rounded input-filedrop__icon"
                            />
                            <span
                                data-id={`${dataId}-file-name`}
                                className="input-filedrop__selected-text"
                            >
                                {fileName}
                            </span>
                            <span
                                data-id={`${dataId}-change-link`}
                                onClick={this._clickInput}
                                className="input-filedrop__link input-filedrop__divider"
                            >
                                {text.change}
                            </span>
                            {onRemove && (
                                <span
                                    data-id={`${dataId}-remove-link`}
                                    className="input-filedrop__link input-filedrop__divider"
                                    onClick={this._handleRemove}
                                >
                                    {text.remove}
                                </span>
                            )}
                        </div>
                    ) : (
                        <div className="input-filedrop__upload-text" key="input-filedrop__upload-text">
                            <div data-id={`${dataId}-drop-text`}>
                                {text.drop}
                            </div>
                            <div data-id={`${dataId}-separator-text`}>
                                {text.separator}
                            </div>
                            <div
                                data-id={`${dataId}-select-link`}
                                className="input-filedrop__link">
                                {text.select}
                            </div>
                        </div>
                    )
                )}
                <label key="label" data-id={`${dataId}-label`}>
                    <input
                        data-id={`${dataId}-input`}
                        accept={accept}
                        type="file"
                        onChange={this._onInputChange}
                        ref={ (fi) => this.fileInput = fi }
                    />
                </label>
            </div>
        );
    }

}
