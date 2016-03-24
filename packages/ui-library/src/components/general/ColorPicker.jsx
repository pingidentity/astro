"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var Picker = require("react-color-picker");
var css = require("classnames");
var FormLabel = require("../forms/FormLabel.jsx");
var If = require("./If.jsx");
var callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer;

/**
 * @class ColorPicker
 *
 * @desc  A color picker component that supports common rgb values for text, background, etc.
 *   It has a text field for displaying the current color (which also allows entering the desired
 *   color code) and a color selection area.
 *   Pressing ESC while the color selection area is showing will close the color selection.
 *
 * @param {string} [id="color-picker"] - Set the data-id on the top level html element
 * @param {string} [className] - Append classname to the top level html element
 * @param {string} color - A hexcode of chosen color
 * @param {bool} [controlled=false] - A boolean to enable the component to be externally managed.
 *   True will relinquish control to the components owner.  False or not specified will cause
 *   the component to manage state internally but still execute the onToggle callback
 *   in case the owner is interested.
 * @param {function} onChange - function (color, keepOpen) {...} A callback executed when a color is
 *   chosen; the new color is passed as param, as well as the keepOpen boolean which tells the
 *   parent whether the color picker should be kept open or not.
 * @param {bool} [disabled=false] - A property to disable the component
 * @param {string} [labelText] - A label to render at the top of the color picker
 * @param {string} [hintText] - If a label is provided, a hint text may also be optionally provided
 * @param {function} [onToggle] - function () {...} delegate to call when open/closed state changed.
 *   Used only with stateless mode. Will receive current open status value.
 * @param {function} [open=false] - boolean state of open/closed menu. Used only in stateless mode.
 * @param {bool} [pickerHidden=false] - A property to hide the color picker using CSS.  When
 *   pickerHidden is true, the "colorpicker-container" is always rendered and the visibility is
 *   controlled via the presence of the "open" class the components top-level div (see containerCss
 *   below).
 *
 * @example
 *   <ColorPicker
 *       id="my-color-picker"
 *       onClick={this._onBgPickerClick}
 *       onChange={this._onBgColorChange}
 *       pickerHidden={this.state.bgPickerHidden}
 *       color={this.props.data.enrollmentBgColor} />
 *
 *   <ColorPicker
 *       id="my-color-picker"
 *       onClick={this._onBgPickerClick}
 *       onChange={this._onBgColorChange}
 *       pickerHidden={this.state.bgPickerHidden}
 *       color={this.props.data.enrollmentBgColor}
 *       onToggle={this._onColorPickerToggle}
 *       open={this.state.colorPickerOpen}
 *       controlled={true} />
 */

/**
 * @typedef {object} KeyEvent
 * @typedef {object} MouseEvent
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
        // prop validations
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        color: React.PropTypes.string.isRequired,
        disabled: React.PropTypes.bool,
        hintText: React.PropTypes.string,
        labelText: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool,
        pickerHidden: React.PropTypes.bool
    },

    /**
     * Toggle the color picker
     * if a mouse click happens outside the color picker area
     * and if the color picker is open.
     * @param {MouseEvent} e - the mouse event
     * @private
     */
    _handleGlobalClick: function (e) {
        if (this.props.open) {
            callIfOutsideOfContainer(ReactDOM.findDOMNode(this.refs.swatch), this._onToggle, e);
        }
    },

    /**
     * Close the color picker if open and the ESC key is pressed.
     * @param {KeyEvent} e - the key event
     * @private
     */
    _handleGlobalKeyDown: function (e) {
        if (e.keyCode === 27 && this.props.open) {
            this._onToggle();
        }
    },

    /**
     * Open the color picker if ENTER is pressed in the input field.
     * Close it if ESCAPE is pressed in the input field.
     * @param {KeyEvent} e - the key event
     * @private
     */
    _onColorInputKeyDown: function (e) {
        switch (e.keyCode) {
            case 13:
                if (!this.props.open) {
                    this._onToggle();
                }
                break;
            case 27:
                if (this.props.open) {
                    this._onToggle();
                }
                break;
        }
    },

    /**
     * Toggle the color picker, but only if it is not disabled.
     * @private
     */
    _onToggle: function () {
        if (!this.props.disabled) {
            this.props.onToggle();
        }
    },

    /**
     * Call the onChange callback when a color is selected in the color picker.
     * @param {string} color - the new color
     * @private
     */
    _onChange: function (color) {
        this.props.onChange(color);
    },

    /**
     * Call the onChange callback when a color is selected by dragging in the color picker.
     * @param {string} color - the new color
     * @private
     */
    _onDrag: function (color) {
        this.props.onChange(color, true);
    },

    /**
     * Call the onChange callback when a color code is typed into the input field.
     * @param {Event} e - the input field change event
     * @private
     */
    _onColorInputChange: function (e) {
        this.props.onChange(e.target.value);
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
            id: "color-picker",
            open: false,
            disabled: false
        };
    },

    getInitialState: function () {
        return {
            pickerHidden: this.props.pickerHidden || false
        };
    },


    render: function () {
        /* When props.pickerHidden is true, the "colorpicker-container" is always rendered and the
        visibility is controlled via the presence of the "open" class the components top-level div
        (see containerCss below). */
        var containerCss = {
            "input-color-picker": true,
            open: this.props.open
        };
        containerCss[this.props.className] = !!this.props.className;

        return (
            /* eslint-disable max-len */
            <div data-id={this.props.id} className={css(containerCss)}>
                <FormLabel value={this.props.labelText} hint={this.props.hintText}/>
                <div className="color-picker" ref="swatch">
                    <span className="colors colors-theme-default colors-swatch-position-left colors-swatch-left colors-position-default"
                          ref="innerSwatch"
                          onClick={this._onToggle}>
                        <span className="colors-swatch">
                            <span ref="colorSample" style={{ backgroundColor: this.props.color }}></span>
                        </span>
                        <input type="text"
                                ref="colorInput"
                                className="colors-input btn-fg-color"
                                value={this.props.color}
                                maxLength="7"
                                disabled={this.props.disabled}
                                onChange={this._onColorInputChange}
                                onKeyDown={this._onColorInputKeyDown} />
                    </span>
                    <If test={(this.props.pickerHidden || this.props.open) && !this.props.disabled}>
                        <span className="colorpicker-container">
                            <Picker ref="reactColorPicker" value={this.props.color}
                                    onChange={this._onChange}
                                    onDrag={this._onDrag}
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

    _toggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    /**
     * Call the onChange callback.
     * @param {string} value - the new color
     * @param {boolean} keepOpen - whether to keep the color picker open or close it
     *    (eg. the drag event triggers several change callbacks, but they should not close the
     *    picker).
     * @private
     */
    _change: function (value, keepOpen) {
        if (keepOpen === true) {
            // just call the callback and don't change the open state
            this.props.onChange(value);
        }
        else {
            this.setState({
                open: false
            }, function () {
                this.props.onChange(value);
            });
        }
    },

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {
        return (
            <Stateless ref="stateless" {...this.props}
                    onToggle={this._toggle}
                    onChange={this._change}
                    open={this.state.open}/>
        );
    }
});
