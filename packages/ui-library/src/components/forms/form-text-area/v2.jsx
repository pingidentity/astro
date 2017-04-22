var React = require("re-react"),
    ReactVanilla = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    FormFieldConstants = require("../../../constants/FormFieldConstants"),
    FormLabel = require("../FormLabel.jsx"),
    FormError = require("../FormError.jsx"),
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
* @param {boolean} [controlled=false]
*     DEPRECATED. Use "stateless" instead.
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

module.exports = ReactVanilla.createClass({

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless with true default in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless", "false", "true"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                ? React.createElement(FormTextAreaStateless, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormTextAreaStateless" }, this.props), this.props.children)
                : React.createElement(FormTextAreaStateful, //eslint-disable-line no-use-before-define
                    _.defaults({ ref: "FormTextAreaStateful" }, this.props), this.props.children)
        );
    }
});

var FormTextAreaStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string.affectsRendering,
        value: React.PropTypes.string.affectsRendering,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        originalValue: React.PropTypes.string.affectsRendering,
        edited: React.PropTypes.bool.affectsRendering,
        showUndo: React.PropTypes.bool.affectsRendering,
        onUndo: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        labelText: React.PropTypes.string.affectsRendering,
        labelHelpText: React.PropTypes.string.affectsRendering,
        helpClassName: React.PropTypes.string.affectsRendering,
        inputClassName: React.PropTypes.string.affectsRendering,
        mode: React.PropTypes.string.affectsRendering,
        maxLength: React.PropTypes.number.affectsRendering,
        cols: React.PropTypes.number.affectsRendering,
        rows: React.PropTypes.number.affectsRendering,
        errorMessage: React.PropTypes.string.affectsRendering,
        placeholder: React.PropTypes.string.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering,
        required: React.PropTypes.bool.affectsRendering,
        autoFocus: React.PropTypes.bool,
        useAutocomplete: React.PropTypes.bool,
        children: React.PropTypes.node.affectsRendering
    },

    getDefaultProps: function () {
        return {
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
    },

    _handleChange: function (e) {
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);
    },

    render: function () {
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
                        name={this.props["data-id"] + "-textarea"}
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
});

var FormTextAreaStateful = ReactVanilla.createClass({

    _handleUndo: function (e) {
        // update the event with the reverted data and send back to the parent
        // otherwise the parent won't be aware of the reverted field even though the browser displays the original value
        e.target = ReactDOM.findDOMNode(this.refs.FormTextAreaStateless.refs[this.props["data-id"] + "-textarea"]);
        e.target.value = this.props.originalValue;
        this.props.onChange(e);
        this.props.onValueChange(e.target.value);

        this.setState({
            value: this.props.originalValue
        });
    },

    _handleValueChange: function (value) {
        this.setState({
            value: value
        }, function () {
            if (this.props.onValueChange) {
                this.props.onValueChange(value);
            }
        });
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-text-area",
            onChange: _.noop,
            onValueChange: _.noop
        };
    },

    getInitialState: function () {
        return {
            value: this.props.value || ""
        };
    },

    render: function () {
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
});
