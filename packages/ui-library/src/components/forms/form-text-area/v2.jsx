import React from "react";
import PropTypes from "prop-types";

import FormFieldConstants from "../../../constants/FormFieldConstants";
import FormLabel, { labelProps, passLabelProps } from "../FormLabel";
import FormError from "../FormError";
import { InputWidthProptypes, getInputWidthClass } from "../InputWidths";

import classnames from "classnames";
import _ from "underscore";

import { inStateContainer } from "../../utils/StateContainer";
import { deprecatedStatelessProp } from "../../../util/DeprecationUtils";

/**
 * @enum {string}
 * @alias TextArea.inputHeights
 * @desc Heights for TextArea component.
 */
const inputHeights = {
    /** auto */
    AUTO: "auto",
    /** short */
    SM: "short",
    /** medium */
    MD: "medium",
    /** large */
    LG: "large"
};

/**
* @callback FormTextArea~onChange
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onValueChange
* @param {string} value
*     The current text area value.
*/

/**
* @callback FormTextArea~onBlur
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onFocus
* @param {object} e
*     The ReactJS synthetic event object.
*/

/**
* @callback FormTextArea~onUndo
*/

/**
* @class FormTextArea
* @desc A text area component that supports edit and readonly modes.
*
* @param {string} [className]
*     CSS classes to se ton the top-level HTML container.
* @param {number} [cols]
*     Columns value for sizing, default is taken from CSS styles.
* @param {string} [data-id="form-text-area"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {node} [description]
*     The text to display below the title. Can be a node or a string
* @param {node} [explanation]
*     Explanation text for the field appears below it.
* @param {node} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
* @param {FormTextArea.inputHeights} [height]
*     Hard-coded heights for text areas.
* @param {string} [inputClassName]
*     CSS classes to set on the input element.
* @param {string} [label]
*     Alias for labelText
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {number} [maxLength]
*     Max length supported by the field.
* @param {boolean} [monospaced=false]
*     If set to true, will use a monospaced font.
* @param {string} [name]
*     The name attribute for the input.
* @param {string} [originalValue]
*     The original value of the field.
* @param {string} [placeholder]
*     Placeholder text to show as the field's label.
* @param {number} [rows]
*     Rows value for sizing, default is taken from CSS styles.
* @param {string} [value=""]
*     The current text field value.
*     Must be used with onValueChange handle to get updates.
 *    When not provided, the component will manage this value.
* @param {object} [initialState]
*     initialState.value determines the initial state of 'value'.
* @param {InputWidths} [width]
*    Specifies the width of the input.
*
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [disabled=false]
*     If true, the text area will be disabled.
* @param {boolean} [edited=false]
*     Whether or not the field has been edited.
* @param {boolean} [noResize=false]
*     If we disallow end user to be able resizing textarea in browsers that support this
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [showUndo=false]
*     Whether or not to display an undo option when field is edited.
* @param {boolean} [useAutocomplete=false]
*     Whether or not the field will support autocomplete.
* @param {FormTextArea~onBlur} [onBlur]
*     Callback to be triggered when the field loses focus (is blurred).
* @param {FormTextArea~onFocus} [onFocus]
*     Callback to be triggered when the field gets focus.
* @param {FormTextArea~onChange} [onChange]
*     Callback to be triggered when the field changes. It will receive the triggering event.
*     The onValueChange callback will also be triggered.
* @param {FormTextArea~onValueChange} [onValueChange]
*     Callback to be triggered when the field changes. It will receive the component's value.
*     The onChange callback will also be triggered.
* @param {FormTextArea~onUndo} [onUndo]
*     Callback to be triggered when the 'undo' icon is clicked.
*
* @param {module:constants/FormFieldConstants.FormFieldTypes} [mode=FormFieldTypes.EDIT]
*     How the field will be shown: FormFieldTypes.EDIT or FormFieldTypes.READ_ONLY.
*
* @example
*     <FormTextArea
*         data-id={name}
*         labelText={element.viewName}
*         required={element.required}
*         value={element ? element.value : ''}
*         onValueChange={myFunction}
*     />
*/

class FormTextAreaStateless extends React.Component {
    static propTypes = {
        autoFocus: PropTypes.bool,
        children: PropTypes.node,
        className: PropTypes.string,
        cols: PropTypes.number,
        "data-id": PropTypes.string,
        description: PropTypes.node,
        disabled: PropTypes.bool,
        edited: PropTypes.bool,
        errorMessage: PropTypes.node,
        height: PropTypes.oneOf(Object.values(inputHeights)),
        helpClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        label: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        labelHelpText: PropTypes.string,
        labelText: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        maxLength: PropTypes.number,
        mode: PropTypes.string,
        monospaced: PropTypes.bool,
        name: PropTypes.string,
        noResize: PropTypes.bool,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        onChange: PropTypes.func,
        onUndo: PropTypes.func,
        onValueChange: PropTypes.func,
        originalValue: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        rows: PropTypes.number,
        showUndo: PropTypes.bool,
        useAutocomplete: PropTypes.bool,
        value: PropTypes.string,
        width: PropTypes.oneOf(InputWidthProptypes),
        ...labelProps,
    };

    static defaultProps = {
        autoFocus: false,
        "data-id": "form-text-area",
        disabled: false,
        edited: false,
        height: inputHeights.AUTO,
        id: "",
        mode: FormFieldConstants.FormFieldMode.EDIT,
        monospaced: false,
        noResize: false,
        onBlur: _.noop,
        onFocus: _.noop,
        onChange: _.noop,
        onUndo: _.noop,
        onValueChange: _.noop,
        required: false,
        showUndo: false,
        useAutocomplete: false,
        value: "",
    };

    state = {
        width: this.props.width
    };

    _handleChange = (e) => {
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);
    };

    /* istanbul ignore next  */
    _outputsize = entries => {
        this.setState({ width: entries[0].target.offsetWidth });
    };

    /* istanbul ignore next  */
    componentWillMount() {
        this.fieldId = this.props.id || _.uniqueId("form-text-area-");
    }
    /* istanbul ignore next  */
    componentDidMount() {
        new ResizeObserver(this._outputsize).observe(this._textarea);
    }

    render() {
        const
            readonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            className = classnames(
                "input-textarea",
                getInputWidthClass({
                    className: this.props.className,
                    width: this.state.width,
                }),
                this.props.className,
                {
                    required: this.props.required,
                    "form-error": this.props.errorMessage,
                    disabled: this.props.disabled,
                    edited: this.props.edited,
                    "value-entered": this.props.value && `${this.props.value}`.trim() !== "",
                    readonly: readonly,
                    actions: this.props.showUndo,
                    [`textarea-height--${this.props.height}`]: this.props.height !== inputHeights.AUTO,
                }
            );

        return (
            <FormLabel
                data-id={this.props["data-id"]}
                className={className}
                value={this.props.labelText || this.props.label}
                hint={this.props.labelHelpText}
                labelFor={this.fieldId}
                {...passLabelProps(this.props)}
            >
                <span className="input-container" style={{ width: this.state.width }}>
                    <textarea
                        data-id={this.props["data-id"] + "-textarea"}
                        ref={node => this._textarea = node}
                        name={this.props.name || (this.props["data-id"] + "-textarea")}
                        className={classnames(
                            this.props.inputClassName,
                            {
                                "input-textarea__input--monospaced": this.props.monospaced,
                                "input-textarea__input--no-resize": this.props.noResize,
                            }
                        )}
                        id={this.fieldId}
                        disabled={this.props.disabled}
                        placeholder={this.props.placeholder}
                        readOnly={readonly}
                        maxLength={this.props.maxLength}
                        value={this.props.value}
                        onChange={this._handleChange}
                        onBlur={this.props.onBlur}
                        onFocus={this.props.onFocus}
                        cols={this.props.cols}
                        rows={this.props.rows}
                        autoFocus={this.props.autoFocus}
                        autoComplete={this.props.useAutocomplete ? "on" : "off"}>
                    </textarea>
                    {this.props.edited && this.props.showUndo &&
                        <a data-id="undo" className="undo" onClick={this.props.onUndo}>undo</a>
                    }
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-errorMessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errorMessage"}
                        />
                    )}
                </span>
                {this.props.children}
            </FormLabel>
        );
    }
}

const resetToOriginal = (value, current, { originalValue }) => originalValue;

const isEdited = ({ value }, { originalValue }) => {
    if (value !== undefined && originalValue !== undefined) {
        return { edited: (value !== originalValue) };
    }
    return {};
};

const FormTextArea = inStateContainer([
    {
        name: "value",
        initial: "",
        setter: "onValueChange",
        callbacks: [{
            name: "onUndo",
            transform: resetToOriginal,
        }],
    },
], isEdited)(FormTextAreaStateless);

FormTextArea.displayName = "FormTextArea";

FormTextArea.propTypes = {
    stateless: deprecatedStatelessProp,
};

FormTextArea.inputHeights = inputHeights;

export default FormTextArea;
