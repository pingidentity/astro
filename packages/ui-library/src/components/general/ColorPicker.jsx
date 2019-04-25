"use strict";


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
import Utils from "../../util/Utils";
import Validator from "validator";
import If from "./If";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import PopperContainer from "../tooltips/PopperContainer";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { cannonballProgressivelyStatefulWarning } from "../../util/DeprecationUtils";
import { cannonballPortalWarning } from "../../util/DeprecationUtils";
import { flagsPropType, hasFlag } from "../../util/FlagUtils";

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
 * @param {array} [flags]
 *     Set the flag for "use-portal" to render with popper.js and react-portal
 *
 * @param {string} [labelText]
 *     A label to render at the top of the color picker
 * @param {string} [label]
 *     Alias for labelText
 * @param {string} [hintText]
 *     If a label is provided, a hint text may also be optionally provided
 * @param {string} color
 *     A hexcode of chosen color
 * @param {boolean} [disabled=false]
 *     A property to disable the component
 * @param {boolean} [useInternalError=true]
 *     When using the p-stateful version, turn on or off the internal hex format error
 * @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX")} [width]
*      Specifies the width of the input.
 * @param {ColorPicker~onValueChange} onValueChange
 *     Callback to be triggered when a color is chosen by passing the new color.
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

class Stateless extends React.Component {
    static displayName = "ColorPickerStateless";

    static propTypes = {
        "data-id": PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        hintText: PropTypes.string,
        labelText: PropTypes.string,
        label: PropTypes.string,
        color: PropTypes.string.isRequired,
        disabled: PropTypes.bool,
        onValueChange: PropTypes.func,
        open: PropTypes.bool,
        onToggle: PropTypes.func.isRequired,
        errorMessage: PropTypes.string,
        internalError: PropTypes.string, // internal use only, leaving out of JSDocs on purpose
        onError: PropTypes.func,
        width: PropTypes.oneOf(InputWidthProptypes),
        flags: flagsPropType,
    };

    static defaultProps = {
        "data-id": "color-picker",
        open: false,
        disabled: false,
        cpid: Math.random(),
        onValueChange: _.noop,
        onError: _.noop,
        errorMessage: "",
        internalError: "",
        width: InputWidths.SM,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

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

    _usePortal = () => hasFlag(this, "use-portal");

    _getReference = () => this.refs.swatch;

    _errorMessage = () => this.props.errorMessage || this.props.internalError;

    render() {
        var containerCss = {
            "input-color-picker": true,
            open: this.props.open,
            "color-picker-error": this._errorMessage(),
        };
        containerCss[this.props.className] = !!this.props.className;

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
            <div data-id={this.props["data-id"]} className={css(containerCss)}>
                <FormLabel data-id="colorLabel" value={this.props.labelText || this.props.label} hint={this.props.hintText}/>
                <div className="color-picker" ref="swatch">
                    <span className="colors colors-theme-default colors-swatch-position-left colors-swatch-left colors-position-default"
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
                            flags={[ "p-stateful" ]}
                        />
                        <span className="colors-swatch" data-id={this.props["data-id"] + "-colors-swatch"} >
                            <span ref="colorSample" style={{ backgroundColor: this.props.color }}></span>
                        </span>
                    </span>
                    <If test={this.props.open && !this.props.disabled}>
                        {this._usePortal()
                            ? (
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
                            )
                            : (
                                <span
                                    className="colorpicker-container"
                                    data-id="colorpicker-container"
                                    data-parent={this.props["data-id"]}
                                >{picker}</span>
                            )
                        }
                    </If>
                </div>
            </div>
            /* eslint-enable max-len */
        );
    }
}

class Stateful extends React.Component {
    static displayName = "ColorPickerStateful";

    state = {
        open: false,
        errorMessage: ""
    };

    _handleToggle = () => {
        this.setState({
            open: !this.state.open
        });
    };

    _handleError = (message) => {
        this.setState({ errorMessage: message });
    };

    render() {
        return (
            <Stateless ref="stateless" {...this.props}
                errorMessage={this.state.errorMessage}
                onError={this._handleError}
                onToggle={this._handleToggle}
                onValueChange={this.props.onValueChange}
                open={this.state.open}/>
        );
    }
}

const PStatefulColorPicker = inStateContainer([
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
])(Stateless);
PStatefulColorPicker.displayName = "PStatefulColorPicker";

export default class ColorPicker extends React.Component {

    static displayName = "ColorPicker";

    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
        useInternalError: PropTypes.bool, // this appears in the JSDocs for the main component
    };

    static defaultProps = {
        stateless: false,
        useInternalError: true,
    };

    static _statelessComponent = Stateless; // this is to enable testing

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _usePStateful = () => hasFlag(this, "p-stateful");

    componentDidMount() {
        if (!this._usePStateful()) {
            if (!this.props.stateless && (this.props.open !== undefined && this.props.errorMessage !== undefined)) {
                cannonballProgressivelyStatefulWarning({ name: "ColorPicker" });
            } else if (this.props.stateless) {
                cannonballProgressivelyStatefulWarning({ name: "ColorPicker" });
            }
        }

        if (!hasFlag(this, "use-portal")) {
            cannonballPortalWarning({ name: "ColorPicker" });
        }

        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction()) {
            /* istanbul ignore if  */
            if (this.props.controlled !== undefined) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("controlled", "stateless"));
            }
            /* istanbul ignore if  */
            if (this.props.id) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            /* istanbul ignore if  */
            if (this.props.onChange) {
                /* istanbul ignore next  */
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
        }
    }

    render() {
        if (this._usePStateful()) {
            const { useInternalError, ...props } = this.props;
            return <PStatefulColorPicker {...props} internalError={useInternalError ? undefined : ""}/>;
        }

        return (
            this.props.stateless
                ? <Stateless ref="stateless" {...this.props} />
                : <Stateful ref="stateful" {...this.props} />);
    }
}