
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import FileDrop from "./FileDrop";
import Icon from "../general/Icon";
import classnames from "classnames";

/**
* @callback FileInput~onRemove
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
* @callback FileInput~onValidateFile
*
* @param {boolean} isValidFile
*     A boolean indicating whether the file type is one the accepted file types.
* @param {Object} file
*     The file object
* @param {Object} e
*     The even object provided with the onChange event
*/

/**
 * @class FileInput
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string} [data-id="file-drop"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string[]} [accept]
 *     An optional array of the the allowed file mime types or file extensions.
 * @param {string} [className]
 *     Optional CSS classname(s) applied to top-level container.
 * @param {string} [fileName]
 *     The name of the currently selected file.
 * @param {FileInput~onRemove} [onRemove]
 *     The callback triggered when the remove file link is clicked.
 * @param {FileInput~onValueChange} [onValueChange]
 *     A callback triggered when a file is dropped or selected.
 * @param {FileInput~onValidateFile} [onValidateFile]
 *     The callback triggered when when a file is selected that idicates if the selected file type matches those allowed by the "accept" prop.
 * @param {Object} [strings]
 *     An object containing the various blurbs of text rendered in the component.
 *
 * @example
 *     <FileInput
 *         onValidate={this._handleValidate}
 *         onValueChange={this._handleChange}
 *         onRemove={this._handleRemove}
 *         fileName={this.state.selectedFile}
 *         accept={["text/csv", "image/jpeg", "image/png"]}
 *     />
 */

export default class FileInput extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        accept: PropTypes.array,
        className: PropTypes.string,
        fileName: PropTypes.string,
        fileData: PropTypes.node,
        onRemove: PropTypes.func,
        onValidateFile: PropTypes.func,
        onValueChange: PropTypes.func,
        strings: PropTypes.objectOf(PropTypes.string),
    };

    static defaultProps = {
        strings: {},
    }

    defaultStrings = {
        select: "Choose",
        remove: "Remove",
    };

    _clickButton = (inputRef) => /* istanbul ignore next  */ () => inputRef.click();

    _renderContent = (props) => {
        const {
            inputRef
        } = props;
        const {
            fileName,
            fileData,
            onRemove,
            selectedTitle,
            strings,
        } = this.props;
        const text = { ...this.defaultStrings, ...strings };

        return (
            fileName ? (
                <div className="input-file__selected-content">
                    <div className="input-file__selected-title">{selectedTitle}</div>
                    <div className="input-file__info">
                        <Icon
                            data-id="file-icon"
                            className="input-file__file-icon"
                            iconName="docs"
                            iconSize={Icon.iconSizes.MD}
                            type="leading"
                        />
                        <div className="input-file__file">
                            <div data-id="file-name" className="input-file__file-name">
                                {fileName}
                            </div>
                            {fileData && (
                                <div data-id="file-data" className="input-file__file-data">{fileData}</div>
                            )}
                        </div>
                    </div>
                    <Button
                        data-id="remove-button"
                        className="input-file__remove-btn"
                        onClick={onRemove}
                        inline
                    >
                        {text.remove}
                    </Button>
                </div>
            ) : (
                <div className="input-file__select-btn">
                    <Button
                        data-id="select-button"
                        onClick={this._clickButton(inputRef)}
                        inline
                    >
                        {text.select}
                    </Button>
                </div>
            )

        );
    }

    render () {
        const {
            fileName,
        } = this.props;

        const classNames = classnames(this.props.className, "input-file", {
            "input-file--selected": fileName
        });

        return (
            <FileDrop
                {...this.props}
                renderContent={this._renderContent}
                className={classNames}
            />
        );
    }
}
