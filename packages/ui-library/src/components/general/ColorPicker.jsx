import { ChromePicker } from "react-color";
import { InputWidths, InputWidthProptypes } from "../forms/InputWidths";

import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import css from "classnames";
import _ from "underscore";
import FormLabel from "../forms/FormLabel";
import FormTextField from "../forms/form-text-field";
import Validators from "../../util/Validators";
import Validator from "validator";
import If from "./If";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import PopperContainer from "../tooltips/PopperContainer";
import StateContainer, { toggleTransform } from "../utils/StateContainer";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";

export const pickerTypes = {
    DETAILED: "detailed",
    SIMPLE: "simple",
};

/**
 * @callback ColorPicker~onValueChange
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
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [stateless]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 * @param {string} [name]
 *    Name attribute for the input.
 * @param {string} [labelText]
 *     A label to render at the top of the color picker.
 * @param {string} [label]
 *     Alias for labelText
 * @param {node} [description]
 *     Description to display below the label.
 * @param {node} [hintText]
 *     If a label is provided, a hint text may also be optionally provided.
 *     This can be a string or a JSX object.
 * @param {string} color
 *     A hexcode of chosen color
 *     When not provided, the component will manage this value.
 * @param {boolean} [disabled=false]
 *     A property to disable the component
 * @param {boolean} [useInternalError=true]
 *     Turn on or off the internal hex format error
 * @param {InputWidths} [width]
*      Specifies the width of the input.
 * @param {ColorPicker~onValueChange} onValueChange
 *     Callback to be triggered when a color is chosen by passing the new color.
 *
 * @param {boolean} [open=false]
 *     Boolean state of open/closed menu. Used only in stateless mode.
 *     When not provided, the component will manage this value.
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
 *       />
 */

class Stateless extends React.Component {
    static displayName = "ColorPickerStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        description: PropTypes.node,
        hintText: PropTypes.node,
        labelText: PropTypes.string,
        label: PropTypes.string,
        color: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        onValueChange: PropTypes.func,
        onMouseEnter: PropTypes.func,
        onMouseLeave: PropTypes.func,
        open: PropTypes.bool,
        onToggle: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        internalError: PropTypes.string, // internal use only, leaving out of JSDocs on purpose
        onError: PropTypes.func,
        width: PropTypes.oneOf(InputWidthProptypes),
        type: PropTypes.oneOf(Object.values(pickerTypes)),
    };

    static defaultProps = {
        "data-id": "color-picker",
        open: false,
        disabled: false,
        cpid: Math.random(),
        onValueChange: _.noop,
        onMouseEnter: _.noop,
        onMouseLeave: _.noop,
        onError: _.noop,
        errorMessage: "",
        internalError: "",
        width: InputWidths.SM,
        type: pickerTypes.DETAILED,
    };

    /*
     * Toggle the color picker. If a mouse click happens outside the color picker area and if the color picker is open.
     * @param {MouseEvent} e
     *     The ReactJS synthetic event object
     */
    _handleGlobalClick = (e) => {
        //if the click event isn't the click that opened the color picker
        if (this.props.open && this._clickEvent !== e) {
            var picker = ReactDOM.findDOMNode(this.reactColorPicker);

            //dont close the color picker if the click is inside
            callIfOutsideOfContainer(picker, this.props.onToggle, e);
        }
    };

    /*
     * Close the color picker if open and the ESC key is pressed.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleGlobalKeyDown = (e) => {
        if (e.keyCode === 27) {
            this._close();
        }
    };

    /*
     * Open the color picker if ENTER is pressed in the input field. Close it if ESCAPE is pressed in the input field.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleColorInputKeyDown = (e) => {
        switch (e.keyCode) {
            case 13: //return key
                this._open();
                break;
            case 9: //tab key
            case 27: //esc key
                this._close();
                break;
        }
    };

    /*
    * Check if the input value is a valid hex color, trigger onError callback if not
    * @param {KeyEvent} e
    *     The ReactJS synthetic event object
    */
    _handleColorInputBlur = (e) => {
        if (e.target.value !== "" && !Validator.isHexColor(e.target.value)) {
            this.props.onError("This is not a valid hex color.");
        }
    };

    _open = () => {
        if (!this.props.open) {
            this.props.onToggle();
        }
    };

    _close = () => {
        if (this.props.open) {
            this.props.onToggle();
        }
    };

    /*
     * Toggle the color picker, but only if it is not disabled.
     * @param {KeyEvent} e
     *     The ReactJS synthetic event object
     */
    _handleClick = (e) => {
        if (!this.props.disabled) {
            //store a reference to this event so that we dont open and then close the colorpicker when the
            //global click event listener gets triggered.
            this._clickEvent = e.nativeEvent;
            this.props.onToggle();
        }
    };

    _valueChange = (hex) => {
        return this.props.onValueChange(hex);
    };

    /*
     * Call the onValueChange callback when a color is selected in the color picker.
     * @param {string} color
     *     The new color
     */
    _handleValueChange = (color) => {
        this._valueChange(color.hex);
    };

    /*
     * Call the onValueChange callback when a color is selected by dragging in the color picker.
     * @param {string} color
     *     The new color
     */
    _handleDrag = (color) => {
        this._valueChange(color.hex);
    };

    /*
     * Call the onValueChange callback when a valid hex color code is typed into the input field.
     * @param {string} value
     *     The input field value
     */
    _handleColorInputChange = (value) => {
        var val = value && value[0] !== "#" ? ("#" + value) : value;

        if (Validators.isValidHexColorCharacter(val)) {
            this._valueChange(val);
            this.props.onError(null); // clear the errorMessage
        }
    };

    componentDidMount() {
        window.addEventListener("click", this._handleGlobalClick);
        window.addEventListener("keydown", this._handleGlobalKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    }

    _getReference = () => this.refs.swatch;

    _errorMessage = () => this.props.errorMessage || this.props.internalError;

    render() {
        const classNames = css(this.props.className, "input-color-picker", {
            open: this.props.open,
            "color-picker-error": this._errorMessage()
        });

        const picker = (
            <ChromePicker
                ref={component => this.reactColorPicker = component}
                color={Validator.isHexColor(this.props.color || "") ? this.props.color : ""}
                handleChangeComplete={this._handleValueChange}
                disableAlpha={true}
                onChange={this._handleDrag}
            />
        );


        return (
            /* eslint-disable max-len */
            <div
                data-id={this.props["data-id"]}
                className={classNames}
                onMouseEnter={this.props.onMouseEnter}
                onMouseLeave={this.props.onMouseLeave}
            >
                { this.props.type === pickerTypes.DETAILED ? (
                    <>
                        <FormLabel data-id="colorLabel" value={this.props.labelText || this.props.label} hint={this.props.hintText} description={this.props.description} />
                        <div className="color-picker" ref="swatch">
                            <span
                                className="colors colors-theme-default colors-swatch-position-left colors-swatch-left colors-position-default"
                                data-id="inner-swatch"
                                ref="innerSwatch"
                                onClick={this._handleClick}>
                                <FormTextField
                                    data-id="colorInput"
                                    className="colors-label"
                                    inputClassName="colors-input btn-fg-color"
                                    value={this.props.color}
                                    maxLength={7}
                                    name={this.props.name}
                                    disabled={this.props.disabled}
                                    errorMessage={this._errorMessage()}
                                    onValueChange={this._handleColorInputChange}
                                    onKeyDown={this._handleColorInputKeyDown}
                                    onBlur={this._handleColorInputBlur}
                                    width={this.props.width}
                                />
                                <span className="colors-swatch" data-id={this.props["data-id"] + "-colors-swatch"} >
                                    <span ref="colorSample" style={{ backgroundColor: this.props.color }}></span>
                                </span>
                            </span>
                            <If test={this.props.open && !this.props.disabled}>
                                <PopperContainer
                                    data-id="colorpicker-container"
                                    data-parent={this.props["data-id"]}
                                    className="popover-display"
                                    getReference={this._getReference}
                                    pointerClassName="popup-frame__pointer"
                                    ref={el => this.popperContainer = el}
                                    positionFixed
                                >
                                    <div className="popup-frame popup-frame--padded">{picker}</div>
                                </PopperContainer>
                            </If>
                        </div>
                    </>
                ) : null }
                { this.props.type === pickerTypes.SIMPLE ? (
                    <div className="color-picker-simple" ref="swatch">
                        <div
                            data-id="inner-swatch"
                            className="color-picker-simple__dot"
                            onClick={this._handleClick}
                            style={{
                                backgroundColor: this.props.color,
                                borderColor: this.props.color,
                            }}
                        />
                        <FormLabel
                            data-id="color-label"
                            className="color-picker-simple__label"
                            noSpacing
                            value={
                                this.props.labelText || this.props.label
                            }
                        />
                        <If test={this.props.open && !this.props.disabled}>
                            <PopperContainer
                                data-id="colorpicker-container"
                                data-parent={this.props["data-id"]}
                                className="popover-display"
                                getReference={this._getReference}
                                pointerClassName="popup-frame__pointer"
                                ref={el => this.popperContainer = el}
                                positionFixed
                            >
                                <div className="popup-frame popup-frame--padded">
                                    {(this.props.labelText || this.props.label) &&
                                        <div className="color-picker-simple__popover-title">
                                            { this.props.labelText || this.props.label }
                                        </div>
                                    }
                                    {picker}
                                </div>
                            </PopperContainer>
                        </If>
                    </div>
                ) : null }
            </div>
            /* eslint-enable max-len */
        );
    }
}

const stateDefs = [
    {
        name: "color",
        initial: "",
        setter: "onValueChange",
    },
    {
        name: "open",
        initial: false,
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform,
        }],
    },
    {
        name: "internalError",
        initial: "",
        setter: "onError",
    },
];

const ColorPicker = ({ initialState, useInternalError, ...props }) => (
    <StateContainer
        stateDefs={stateDefs}
        initialState={initialState}
        passedProps={{ ...props, internalError: useInternalError ? undefined : "" }}
    >
        {containerProps => <Stateless {...containerProps} />}
    </StateContainer>
);

ColorPicker.displayName = "ColorPicker";

ColorPicker.propTypes = {
    stateless: deprecatedStatelessProp,
    useInternalError: PropTypes.bool, // this appears in the JSDocs for the main component
};

ColorPicker.defaultProps = {
    useInternalError: true,
};

ColorPicker._statelessComponent = Stateless; // this is to enable testing

export default ColorPicker;