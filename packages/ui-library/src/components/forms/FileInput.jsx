
import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../buttons/Button";
import FileDrop from "./FileDrop";
import MessageButton from "../buttons/MessageButton";
import Icon, { iconSizes } from "../general/Icon";
import classnames from "classnames";
import FlexRow, { alignments } from "../layout/FlexRow";

/**
* @callback FileInput~onRemove
*/

/**
* @callback FileDrop~onValueChange
*
* @param {Object} e
*     The even object provided with the onChange event
* @param {Object} file
*     The file object
*/

/**
* @callback FileInput~onValidateFile
*
* @param {Object} e
*     The even object provided with the onChange event
* @param {Object} file
*     The file object
* @param {boolean} isValidFile
*     A boolean indicating whether the file type is one the accepted file types.
*/

/**
 * @class FileInput
 * @desc A single-selection component with big icons and titles.
 *
 * @param {string[]} [accept]
 *     An optional array of the the allowed file mime types or file extensions.
 * @param {string} [buttonLabel]
 *     Adds a custom button label if this prop is provided. If not it will default to "remove".
 * @param {node} [buttonNode]
 *     Adds a custom component/element/string instead of the standard remove pill button.
 * @param {string} [className]
 *     Optional CSS classname(s) applied to top-level container.
 * @param {string} [data-id="file-drop"]
 *     Defines the "data-id" for top-level HTML container.
 * @param {string} [error=error]
 *    The type of error to display on the input (error = red, warning = yellow)
 * @param {node} [fileName]
 *     The name of the currently selected file.
 * @param {boolean} [loading]
 *     If the component should show a loading state for uploading files
 * @param {boolean} [fullWidth]
 *     If there are multiple files in the same container being uploaded then pass this prop to make sure everything is lined up.
 * @param {boolean} [noBorder]
 *     If the component shows a line around the upload this will remove it.
 * @param {FileInput~onRemove} [onRemove]
 *     The callback triggered when the remove file link is clicked.
 * @param {FileInput~onValueChange} [onValueChange]
 *     A callback triggered when a file is dropped or selected.
 * @param {FileInput~onValidateFile} [onValidateFile]
 *     The callback triggered when when a file is selected that idicates if the selected file type matches those allowed by the "accept" prop.
 * @param {boolean} [required=false]
 *    If true, user is required to upload a file
 * @param {Object} [strings]
 *     An object containing the various blurbs of text rendered in the component.
 * @example
 *     <FileInput
 *         onValidate={this._handleValidate}
 *         onValueChange={this._handleChange}
 *         onRemove={this._handleRemove}
 *         fileName={this.state.selectedFile}
 *         accept={["text/csv", "image/jpeg", "image/png"]}
 *     />
 */

const errorTypes = {
    ERROR: "error",
    WARNING: "warning",
};

class FileInput extends Component {

    static propTypes = {
        "data-id": PropTypes.string,
        accept: PropTypes.array,
        buttonLabel: PropTypes.string,
        buttonNode: PropTypes.node,
        className: PropTypes.string,
        fileName: PropTypes.node,
        fileData: PropTypes.node,
        onRemove: PropTypes.func,
        noBorder: PropTypes.bool,
        fullWidth: PropTypes.bool,
        onValidateFile: PropTypes.func,
        onValueChange: PropTypes.func,
        required: PropTypes.bool,
        strings: PropTypes.objectOf(PropTypes.string),
        status: PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.string,
        }),
        error: PropTypes.oneOf([
            errorTypes.ERROR,
            errorTypes.WARNING,
        ])
    };

    static defaultProps = {
        strings: {},
        noBorder: false,
        required: false,
    }

    defaultStrings = {
        select: "Choose",
        remove: "Remove",
    };

    _clickButton = (inputRef) => /* istanbul ignore next  */ () => inputRef.click();

    _handleRemove = (inputRef = {}) => () => {
        inputRef.value = null;
        this.props.onRemove();
    }

    _renderContent = (props) => {
        const {
            inputRef
        } = props;
        const {
            fileName,
            fileData,
            noBorder,
            selectedTitle,
            buttonLabel,
            buttonNode,
            strings,
            status,
            error,
        } = this.props;
        const text = { ...this.defaultStrings, ...strings };

        const classNames = classnames(this.props.className, "input-file__field-set", {
            "unfocused": noBorder,
            "focused": !noBorder,
            "input-file__field-set--focused": !noBorder,
        });

        let errorColor;

        switch (error) {
            case "error":
                // $color-critical-red
                errorColor = "#a31300";
                break;
            case "warning":
                // $color-warning-yellow
                errorColor = "#eeb91c";
                break;
            default:
                errorColor = undefined;
        }

        return (
            fileName && !status ? (
                <FlexRow alignment={alignments.CENTER}>
                    { errorColor ? <span style={{ color: errorColor }}>
                        <Icon iconName="alert" data-id="error-icon" iconSize={iconSizes.MD} />
                    </span>
                        : null }
                    <fieldset className={classNames} style={{
                        borderColor: errorColor
                    }}>
                        {selectedTitle && !noBorder ? <legend>{selectedTitle}</legend> : null }
                        <div className="input-file__selected-content">
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
                            {buttonNode ? <div className="input-file__node-btn">{buttonNode}</div>
                                : <Button
                                    data-id="remove-button"
                                    className="input-file__remove-btn"
                                    onClick={this._handleRemove(inputRef)}
                                    inline
                                >
                                    {buttonLabel ? buttonLabel : text.remove}
                                </Button>}
                        </div>
                    </fieldset>
                </FlexRow>
            ) : (
                <div className="input-file__select-btn">
                    <MessageButton
                        status={status ? status.type : "default" }
                        data-id="select-button"
                        onClick={this._clickButton(inputRef)}
                        label={status ? status.label : text.select}
                        inline
                        className= {classnames (
                            { "input-file__select-btn--required": this.props.required }
                        )}
                    />
                </div>
            )
        );
    }

    render () {
        const {
            fileName,
            fullWidth
        } = this.props;

        const classNames = classnames(this.props.className, "input-file", {
            "input-file--selected": fileName,
            "input-file--selected-full-width": fullWidth
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

FileInput.errorTypes = errorTypes;

export default FileInput;
