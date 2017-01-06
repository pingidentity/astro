"use strict";

var React = require("re-react");
var ReactDOM = require("react-dom");
var Picker = require("ping-react-color-picker");
var css = require("classnames");
var _ = require("underscore");
var FormLabel = require("../forms/FormLabel.jsx");
var FormTextField = require("../forms/form-text-field");
var Validators = require("../../util/Validators");
var Utils = require("../../util/Utils");
var Validator = require("validator");
var If = require("./If.jsx");
var callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer;

/**
 * @callback ColorPicker~onValueChange
 * @param {string} color
 *     Newly chosen color
 */

/**
 * @deprecated
 * @callback ColorPicker~onChange
 * @param {string} color
 *     Newly chosen color
 */

/**
 * @callback ColorPicker~onToggle
 */

/**
 * @callback ColorPicker~onError
 */

/**
 * @class ColorPicker
 * @desc  A color picker component that supports common rgb values for text, background, etc.
 *     It has a text field for displaying the current color (which also allows entering the desired
 *     color code) and a color selection area.
 *     Pressing ESC while the color selection area is showing will close the color selection.
 *
 * @param {string} [data-id="color-picker"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {boolean} [controlled=false]
 *     DEPRECATED. Use "stateless" instead.
 *
 * @param {string} [labelText]
 *     A label to render at the top of the color picker
 * @param {string} [hintText]
 *     If a label is provided, a hint text may also be optionally provided
 * @param {string} color
 *     A hexcode of chosen color
 * @param {boolean} [disabled=false]
 *     A property to disable the component
 * @param {ColorPicker~onValueChange} onValueChange
 *     Callback to be triggered when a color is chosen by passing the new color. For current version, either
 *     onValueChange or onChange can be provided but from next version onValueChange will be the required prop.
 * @param {ColorPicker~onChange} [onChange]
 *     DEPRECATED. Callback to be triggered when a color is chosen by passing the new color. For current version, either
 *     onValueChange or onChange can be provided but from next version onValueChange will be the required prop.
 *
 * @param {boolean} [open=false]
 *     Boolean state of open/closed menu. Used only in stateless mode.
 * @param {ColorPicker~onToggle} [onToggle]
 *     Callback to be triggered when open/closed state changed. Used only with stateless mode. Will receive current
 *     open status value.
 *
 * @param {string} [errorMessage=""]
 *     The message to display if an error occurs.
 * @param {ColorPicker~onError} [onError]
 *     Callback to be triggered when input is an invalid color
 *
 * @example
 *   <ColorPicker
 *       data-id="my-color-picker"
 *       onValueChange={this._onBgColorChange}
 *       color={this.props.data.enrollmentBgColor} />
 *
 *   <ColorPicker
 *       data-id="my-color-picker"
 *       onValueChange={this._onBgColorChange}
 *       color={this.props.data.enrollmentBgColor}
 *       onToggle={this._onColorPickerToggle}
 *       open={this.state.colorPickerOpen}
 *       stateless={true} />
 */

module.exports = React.createClass({
    displayName: "ColorPicker",

    propTypes: {
        controlled: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return (
            stateless
                    ? <Stateless ref="stateless" {...this.props} />
                    : <Stateful ref="stateful" {...this.props} />);
    }
});

var Stateless = React.createClass({
    displayName: "ColorPickerStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        hintText: React.PropTypes.string.affectsRendering,
        labelText: React.PropTypes.string.affectsRendering,
        color: React.PropTypes.string.isRequired.affectsRendering,
        disabled: React.PropTypes.bool.affectsRendering,
        onValueChange: React.PropTypes.func,
        onChange: React.PropTypes.func,
        open: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func.isRequired,
        errorMessage: React.PropTypes.string.affectsRendering,
        onError: React.PropTypes.func
    },

    /*
     * Toggle the color picker. If a mouse click happens outside the color picker area and if the color picker is open.
     * @param {MouseEvent} e
     *     The ReactJS synthetic event object
     */
    _handleGlobalClick: function (e) {
        //if the click event isn't the click that opened the color picker
        if (this.props.open && this._clickEvent !== e) {
            var picker = ReactDOM.findDOMNode(this.refs.reactColorPicker);
            var hue = picker.getElementsByClassName("react-color-picker__hue-spectrum")[0];

            //dont close the color picker if the click is in the hue slider
            callIfOutsideOfContainer(hue, this.props.onToggle, e);
        }
    },

    /*
     * Close the color picker if open and the ESC key is pressed.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleGlobalKeyDown: function (e) {
        if (e.keyCode === 27) {
            this._close();
        }
    },

    /*
     * Open the color picker if ENTER is pressed in the input field. Close it if ESCAPE is pressed in the input field.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleColorInputKeyDown: function (e) {
        switch (e.keyCode) {
            case 13:  //return key
                this._open();
                break;
            case 9:   //tab key
            case 27:  //esc key
                this._close();
                break;
        }
    },

    /*
    * Check if the input value is a valid hex color, trigger onError callback if not
    * @param {KeyEvent} e
    *     The ReactJS synthetic event object
    */
    _handleColorInputBlur: function (e) {
        if (e.target.value !== "" && !Validator.isHexColor(e.target.value)) {
            this.props.onError("This is not a valid hex color.");
        }
    },

    _open: function () {
        if (!this.props.open) {
            this.props.onToggle();
        }
    },

    _close: function () {
        if (this.props.open) {
            this.props.onToggle();
        }
    },

    /*
     * Toggle the color picker, but only if it is not disabled.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleClick: function (e) {
        if (!this.props.disabled) {
            //store a reference to this event so that we dont open and then close the colorpicker when the
            //global click event listener gets triggered.
            this._clickEvent = e.nativeEvent;
            this.props.onToggle();
        }
    },

    _handleFocus: function (e) {
        if (e.nativeEvent.relatedTarget) {
            this._open();
        }
    },

    //TODO remove when onChange is discontinued.
    _valueChange: function () {
        return this.props.onValueChange || this.props.onChange;
    },

    /*
     * Call the onChange callback when a color is selected in the color picker.
     * @param {string} color
     *     The new color
     */
    _handleValueChange: function (color) {
        if (Validator.isHexColor(color)) {
            this._valueChange()(color);
            this.props.onError(null);   // clear the errorMessage
        }
    },

    /*
     * Call the onChange callback when a color is selected by dragging in the color picker.
     * @param {string} color
     *     The new color
     */
    _handleDrag: function (color) {
        this._valueChange()(color);
    },

    /*
     * Call the onChange callback when a valid hex color code is typed into the input field.
     * @param {string} value
     *     The input field value
     */
    _handleColorInputChange: function (value) {
        var val = value && value[0] !== "#" ? ("#" + value) : value;

        if (Validators.isValidHexColorCharacter(val)) {
            this._valueChange()(val);
            this.props.onError(null);   // clear the errorMessage
        }
    },

    componentDidMount: function () {
        window.addEventListener("click", this._handleGlobalClick);
        window.addEventListener("keydown", this._handleGlobalKeyDown);
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    },

    getDefaultProps: function () {
        return {
            "data-id": "color-picker",
            open: false,
            disabled: false,
            cpid: Math.random(),
            onError: _.noop,
            errorMessage: ""
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onChange) {
                console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
            }
            if (!(this.props.onValueChange || this.props.onChange)) {
                console.error(
                    "Warning: Failed propType: Required prop onValueChange was not specified in `ColorPicker`.");
            }
        }
    },

    render: function () {
        var containerCss = {
            "input-color-picker": true,
            open: this.props.open
        };
        containerCss[this.props.className] = !!this.props.className;

        var dataId = this.props.id || this.props["data-id"];
        
        return (
            /* eslint-disable max-len */
            <div data-id={dataId} className={css(containerCss)}>
                <FormLabel data-id="colorLabel" value={this.props.labelText} hint={this.props.hintText}/>
                <div className="color-picker" ref="swatch">
                    <span className="colors colors-theme-default colors-swatch-position-left colors-swatch-left colors-position-default"
                          ref="innerSwatch"
                          onFocus={this._handleFocus}
                          onClick={this._handleClick}>
                        <FormTextField
                                data-id="colorInput"
                                className="colors-label"
                                inputClassName="colors-input btn-fg-color"
                                value={this.props.color}
                                maxLength={7}
                                disabled={this.props.disabled}
                                errorMessage={this.props.errorMessage}
                                onValueChange={this._handleColorInputChange}
                                onKeyDown={this._handleColorInputKeyDown}
                                onBlur={this._handleColorInputBlur} />
                        <span className="colors-swatch" data-id={this.props["data-id"] + "-colors-swatch"} >
                            <span ref="colorSample" style={{ backgroundColor: this.props.color }}></span>
                        </span>
                    </span>
                    <If test={this.props.open && !this.props.disabled}>
                        <span className="colorpicker-container">
                            <Picker ref="reactColorPicker"
                                    value={Validator.isHexColor(this.props.color || "") ? this.props.color : ""}
                                    onChange={this._handleValueChange}
                                    onDrag={this._handleDrag}
                                    saturationWidth={173}
                                    saturationHeight={173} />
                        </span>
                    </If>
                </div>
            </div>
            /* eslint-enable max-len */
        );
    }
});

var Stateful = React.createClass({
    displayName: "ColorPickerStateful",

    _handleToggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _handleError: function (message) {
        this.setState({ errorMessage: message });
    },

    getInitialState: function () {
        return {
            open: false,
            errorMessage: ""
        };
    },

    render: function () {
        //TODO remove when onChange is discontinued.
        var valueChangeFn = this.props.onValueChange || this.props.onChange;
        return (
            <Stateless ref="stateless" {...this.props}
                    errorMessage={this.state.errorMessage}
                    onError={this._handleError}
                    onToggle={this._handleToggle}
                    onValueChange={valueChangeFn}
                    open={this.state.open}/>
        );
    }
});
