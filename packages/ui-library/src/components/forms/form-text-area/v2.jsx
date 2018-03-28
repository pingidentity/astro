var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormFieldConstants = require("../../../constants/FormFieldConstants"),
    FormLabel = require("../FormLabel"),
    FormError = require("../FormError"),
    Utils = require("../../../util/Utils.js"),
    _ = require("underscore");

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
* @callback FormTextArea~onUndo
*/

/**
* @class FormTextArea
* @desc A text area component that supports edit and readonly modes.
*
* @param {string} [data-id="form-text-area"]
*     To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*     CSS classes to se ton the top-level HTML container.
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {string} [value=""]
*     The current text field value, used when state is managed outside of component.
*     Must be used with onValueChange handle to get updates.
* @param {FormTextArea~onChange} [onChange]
*     Callback to be triggered when the field changes. It will receive the triggering event.
*     The onValueChange callback will also be triggered.
* @param {FormTextArea~onValueChange} [onValueChange]
*     Callback to be triggered when the field changes. It will receive the component's value.
*     The onChange callback will also be triggered.
* @param {FormTextArea~onBlur} [onBlur]
*     Callback to be triggered when the field loses focus (is blurred).
*
* @param {String} [originalValue]
*     The original value of the field. Also used for handling undo when stateless=false as
*     the value to set the field to if the undo icon is clicked - if not specified, no undo control will be shown.
* @param {boolean} [edited=false]
*     Whether or not the field has been edited.
* @param {boolean} [showUndo=false]
*     Whether or not to display an undo option when field is edited. Only used when stateless=true.
* @param {FormTextArea~onUndo} [onUndo]
*     Callback to be triggered when the 'undo' icon is clicked. Only used when stateless=true.
*
* @param {string} [labelText]
*     The text to show as the field's label.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
* @param {string} [name]
*     The name attribute for the input.
*
* @param {string} [inputClassName]
*     CSS classes to set on the input element.
* @param {module:constants/FormFieldConstants.FormFieldTypes} [mode=FormFieldTypes.EDIT]
*     How the field will be shown: FormFieldTypes.EDIT or FormFieldTypes.READ_ONLY.
* @param {number} [maxLength]
*     Max length supported by the field.
* @param {number} [cols]
*     Columns value for sizing, default is taken from CSS styles.
* @param {number} [rows]
*     Rows value for sizing, default is taken from CSS styles.
*
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [placeholder]
*     Placeholder text to show as the field's label.
* @param {boolean} [disabled=false]
*     If true, the text area will be disabled.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
*
* @param {boolean} [autoFocus=false]
*     Whether or not to auto-focus the element.
* @param {boolean} [useAutocomplete=false]
*     Whether or not the field will support autocomplete.
*
* @example
*                   <FormTextArea
*                       data-id={name}
*                       labelText={element.viewName}
*                       required={element.required}
*                       value={element ? element.value : ''}
*                       onValueChange={myFunction} />
*/

module.exports = class extends React.Component {
    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: true
    };

    componentWillMount() {
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            throw new Error(Utils.deprecatePropError("controlled", "stateless", "false", "true"));
        }
    }

    render() {
        return (
            this.props.stateless
                ? React.createElement(FormTextAreaStateless, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormTextAreaStateless" }, this.props), this.props.children)
                : React.createElement(FormTextAreaStateful, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormTextAreaStateful" }, this.props), this.props.children)
        );
    }
};

class FormTextAreaStateless extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func,
        onValueChange: PropTypes.func,
        originalValue: PropTypes.string,
        edited: PropTypes.bool,
        showUndo: PropTypes.bool,
        onUndo: PropTypes.func,
        onBlur: PropTypes.func,
        labelText: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object,
            PropTypes.string
        ]),
        labelHelpText: PropTypes.string,
        helpClassName: PropTypes.string,
        inputClassName: PropTypes.string,
        mode: PropTypes.string,
        maxLength: PropTypes.number,
        name: PropTypes.string,
        cols: PropTypes.number,
        rows: PropTypes.number,
        errorMessage: PropTypes.string,
        placeholder: PropTypes.string,
        disabled: PropTypes.bool,
        required: PropTypes.bool,
        autoFocus: PropTypes.bool,
        useAutocomplete: PropTypes.bool,
        children: PropTypes.node
    };

    static defaultProps = {
        "data-id": "form-text-area",
        mode: FormFieldConstants.FormFieldMode.EDIT,
        labelText: "",
        edited: false,
        showUndo: false,
        disabled: false,
        required: false,
        autoFocus: false,
        useAutocomplete: false,
        onChange: _.noop,
        onValueChange: _.noop,
        onBlur: _.noop,
        onUndo: _.noop,
        value: ""
    };

    _handleChange = (e) => {
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);
    };

    render() {
        var readonly = this.props.mode.toUpperCase() === FormFieldConstants.FormFieldMode.READ_ONLY,
            className = classnames("input-textarea", this.props.className, {
                required: this.props.required,
                "form-error": this.props.errorMessage,
                disabled: this.props.disabled,
                edited: this.props.edited,
                "value-entered": !!this.props.value,
                readonly: readonly,
                actions: this.props.showUndo
            });

        return (
            <FormLabel
                data-id={this.props["data-id"]}
                className={className}
                value={this.props.labelText}
                hint={this.props.labelHelpText}
                helpClassName={this.props.helpClassName}>
                <span className="input-container">
                    <textarea
                        data-id={this.props["data-id"] + "-textarea"}
                        ref={this.props["data-id"] + "-textarea"}
                        name={this.props.name || (this.props["data-id"] + "-textarea")}
                        className={this.props.inputClassName}
                        disabled={this.props.disabled}
                        placeholder={this.props.placeholder}
                        required={this.props.required}
                        readOnly={readonly}
                        maxLength={this.props.maxLength}
                        value={this.props.value}
                        onChange={this._handleChange}
                        onBlur={this.props.onBlur}
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

class FormTextAreaStateful extends React.Component {
    static defaultProps = {
        "data-id": "form-text-area",
        onChange: _.noop,
        onValueChange: _.noop
    };

    state = {
        value: this.props.value || ""
    };

    _handleUndo = (e) => {
        // update the event with the reverted data and send back to the parent
        // otherwise the parent won't be aware of the reverted field even though the browser displays the original value
        e.target = ReactDOM.findDOMNode(this.refs.FormTextAreaStateless.refs[this.props["data-id"] + "-textarea"]);
        e.target.value = this.props.originalValue;
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);

        this.setState({
            value: this.props.originalValue
        });
    };

    _handleValueChange = (value) => {
        this.setState({
            value: value
        }, function () {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        });
    };

    render() {
        var props = _.defaults({
            ref: "FormTextAreaStateless",
            value: this.state.value,
            onValueChange: this._handleValueChange,
            edited: this.props.originalValue && this.state.value !== this.props.originalValue,
            showUndo: this.props.originalValue && this.state.value !== this.props.originalValue,
            onUndo: this._handleUndo
        }, this.props);

        return React.createElement(FormTextAreaStateless, props, this.props.children);
    }
}
