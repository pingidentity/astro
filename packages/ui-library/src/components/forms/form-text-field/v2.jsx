"use strict";

var React = require("react"),
    classnames = require("classnames"),
    FormLabel = require("../FormLabel.jsx"),
    _ = require("underscore");

/** @class FormTextFieldError
 * @param {string} value - The error message
 * @param {string} [className] - Optional classname to apply to the error container
 * @param {string} [data-id] - Optional data-id
 * @private
 */
var FormTextFieldError = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
        "data-id": React.PropTypes.string
    },

    render: function () {
        if (!this.props.value) {
            return null;
        }

        var className = this.props.className + " help-tooltip form-error-message show";

        return (
            <div className={className} data-id={this.props["data-id"]}>
                <div className="tooltip-text">
                    <div className="tooltip-text-content">{this.props.value}</div>
                </div>
            </div>);
    }
});

/**
 * @class FormTextField
 * @desc A text field component.
 *
 * @param {string}   [data-id]            Name used by the parent to get the value/text entered in this component (default 'formTextField')
 * @param {boolean}  [required]           Whether the field is required or not (default false)
 * @param {string}   [value]              Current text field value. this is used when state is managed outside of component,
 *                                        Must be used with onValueChange/onChange handler to get updates
 * @param {string}   [labelText]          The text to show as the field's label
 * @param {string}   [placeholder]        Placeholder text for the input field
 * @param {function} [onFocus]            A callback that will be triggered when the field gains focus
 * @param {function} [onBlur]             A callback that will be triggered when the field blurs (loses focus)
 * @param {function} [onKeyPress]         A callback that will be triggered when a key is pressed in the field;
 * @param {function} [onKeyDown]          A callback that will be triggered when a key is pressed down in the field;
 * @param {function} [onValueChange]      A callback that will be triggered when the field value changes but will receive the component's value
 * @param {function} [onChange]           A callback that will be triggered when the field value changes but will receive the triggering event
 * @param {function} [onSave]             A callback to be triggred when 'save' icon is clicked
 * @param {function} [onUndo]             A callback to be triggred when 'undo' icon is clicked
 *
 * @param {number}   [maxLength]          Maximum length supported by the field
 * @param {string}   [defaultValue]       The default (initial) value to be shown in the field, when component managing state itself
 * @param {string}   [inputClassName]     CSS classes to add to the input element
 * @param {string}   [labelClassName]     CSS classes to add to the label element
 * @param {string}   [className]          CSS classes to add to the parent Label element
 * @param {string}   [errorMessage]       Error message to render if validation is being done externally
 * @param {boolean}  [autoFocus]          Whether or not to auto-focus the element
 * @param {boolean}  [autoComplete]       Whether or not the field will support autoComplete (default false)
 * @param {boolean}  [maskValue]          If true, the value shown in the input field will be masked with '*****' i.e: passwords (default false)
 * @param {boolean}  [readOnly=false]     Make the input field readonly.
 * @param {boolean}  [disabled]           A property that disables the component
 *
 * @example <FormTextField
 *              data-id="my-data-id"
 *              labelText={element.viewName}
 *              required={element.required}
 *              defaultValue="default value"
 *              onValueChange={myFunction} />
 */
module.exports = React.createClass({
    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    render: function () {
        return (
            this.props.controlled
                ? <Stateless ref="stateless" {...this.props} />
                : <Stateful ref="stateful" {...this.props} />);
    }
});


var Stateless = React.createClass({
    propTypes: {
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onKeyPress: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onChange: React.PropTypes.func,
        onValueChange: React.PropTypes.func,
        onUndo: React.PropTypes.func,
        onSave: React.PropTypes.func,
        onToggleReveal: React.PropTypes.func,
        "data-id": React.PropTypes.string,
        errorClassName: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        inputClassName: React.PropTypes.string,
        className: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        labelText: React.PropTypes.string,
        disabled: React.PropTypes.bool,
        required: React.PropTypes.bool,
        maskValue: React.PropTypes.bool,
        maxLength: React.PropTypes.number,
        placeholder: React.PropTypes.string,
        showSave: React.PropTypes.bool,
        showUndo: React.PropTypes.bool,
        showReveal: React.PropTypes.bool,
        autoComplete: React.PropTypes.bool,
        value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),
        autoFocus: React.PropTypes.bool,
        readOnly: React.PropTypes.bool,
        reveal: React.PropTypes.bool
    },

    /**
     * Perform any operations that need to happen when the field value changes.
     *
     * @param {object} e the event object
     * @private
     */
    _handleFieldChange: function (e) {
        this.props.onValueChange(e.target.value);
        this.props.onChange(e);
    },

    getDefaultProps: function () {
        return {
            defaultValue: "",
            autoComplete: false,
            errorClassName: "",
            //do nothing with the events if no handlers are passed
            onFocus: _.noop,
            onBlur: _.noop,
            onKeyPress: _.noop,
            onMouseDown: _.noop,
            onToggleReveal: _.noop,
            onSave: _.noop,
            onUndo: _.noop,
            onValueChange: _.noop,
            onChange: _.noop
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn("Deprecated: use data-id instead of id.  Support for id will be removed in next version");
        }
    },

    render: function () {
        var id = this.props["data-id"] || this.props.id,
            className = classnames(this.props.className, "input-text", {
                edited: this.props.isEdited,
                required: this.props.required,
                disabled: this.props.disabled,
                "value-entered": this.props.value,
                "inline-save": this.props.showSave,
                "form-error": this.props.errorMessage,
                actions: this.props.showReveal || this.props.showUndo
            });

        return (
            <FormLabel className={className}
                       ref="container"
                       data-id={id}
                       value={this.props.labelText}
                       hint={this.props.labelHelpText}>
                <span className="input-container">
                    <input className={this.props.inputClassName}
                           onFocus={this.props.onFocus}
                           onBlur={this.props.onBlur}
                           onKeyPress={this.props.onKeyPress}
                           onKeyDown={this.props.onKeyDown}
                           onMouseDown={this.props.onMouseDown}
                           onChange={this._handleFieldChange}
                           placeholder={this.props.placeholder}
                           defaultValue={this.props.defaultValue}
                           ref={id + "-input"}
                           readOnly={this.props.readOnly}
                           data-id={id + "-input"}
                           type={this.props.maskValue && !this.props.reveal ? "password" : "text"}
                           maxLength={this.props.maxLength}
                           value={this.props.value}
                           autoComplete={this.props.autoComplete ? "on" : "off"}
                           disabled={this.props.disabled}
                           autoFocus={this.props.autoFocus} />

                    { this.props.showReveal &&
                        <a data-id="reveal" onClick={this.props.onToggleReveal}
                            className={classnames("password-show-button", {
                                "icon-view": !this.props.reveal,
                                "icon-view-hidden": this.props.reveal
                            })} />
                    }
                    { this.props.showUndo &&
                        <a data-id="undo" className="undo" onClick={this.props.onUndo}>undo</a>}
                    { this.props.showSave &&
                        <a data-id="save" className="save" onClick={this.props.onSave}>save</a>}

                    <FormTextFieldError value={this.props.errorMessage}
                        data-id="error-message" />

                </span>
            </FormLabel>
        );
    }
});

var Stateful = React.createClass({
    getInitialState: function () {
        return {
            reveal: false
        };
    },

    _toggleReveal: function () {
        this.setState({
            reveal: !this.state.reveal
        });
    },

    render: function () {
        return (
            <Stateless ref="stateless" {...this.props}
                reveal={this.state.reveal}
                onToggleReveal={this._toggleReveal} />
        );
    }
});
