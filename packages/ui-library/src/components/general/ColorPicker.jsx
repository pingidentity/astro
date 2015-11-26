"use strict";

var React = require("react"),
    Picker = require("react-colorpicker"),
    HelpHint = require("../tooltips/HelpHint.jsx");

/** @class ColorPicker
 * @desc A wrapper around react-color picker which allows you to pick a color and displays a swatch and hex code
 * @param {string} color - A hexcode of chosen color
 * @param {function} onChange - A callback executed when a color is chosen
 * @param {function} onToggle - A callback executed when the user expands/collapses the color picker
 * @param {bool} expanded - A boolean which determines when the color picker is expanded
 * @param {number} [swatchSize=18] - The dims in pixels of the swatch
 * @param {string} [id] - Set the data-id on the top level html element
 * @param {string} [className] - Append classname to the top level html element
 * @param {bool} [controlled] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the component's owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 * @param {string} [defaultColor] - RGB string for the default color
 */
module.exports = React.createClass({
    render: function () {
        return (
            this.props.controlled
                ? <ControlledColorPicker ref="picker" {...this.props} />
                : <ManagedColorPicker ref="manager" {...this.props} />);
    }
});


var ControlledColorPicker = React.createClass({
    propTypes: {
        color: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        expanded: React.PropTypes.bool.isRequired,
        swatchSize: React.PropTypes.number,
        id: React.PropTypes.string,
        classname: React.PropTypes.string,
        defaultColor: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            swatchSize: 18,
            defaultColor: "#fff"
        };
    },

    _handleKeyDown: function (e) {
        switch (e.keyCode) {
            case 13:
                this.props.onToggle();
                break;
            case 27:
                this._close();
                break;
        }
    },

    _handleClick: function (e) {
        var target = e.target;

        //if the click event originated in the hue slider, dont toggle the picker
        while (target && target !== this.container) {
            if (target === this.slider) {
                e.stopPropagation();
                return;
            }
            target = target.parentNode;
        }

        //if the click happened inside the container show then show, or any click when the picker is expanded hides
        if (target === this.container || this.props.expanded) {
            e.stopPropagation(); //stop propagation, otherwise it will bubble up and call this function again
            this.props.onToggle();
        }
    },

    _close: function () {
        if (this.props.expanded) {
            this.props.onToggle();
        }
    },

    _handleChange: function (e) {
        if (e.toHex) {
            this.props.onChange(e.toHex());
        } else if (e.target.value !== this.props.color) {
            this.props.onChange(e.target.value);
        }
    },

    _getLabel: function () {
        return (
            <label>
                <span className="label-text">
                    { this.props.labelText }
                    { this.props.hintText ? <HelpHint hintText={this.props.hintText} /> : null }
                </span>
            </label>);
    },

    /* There were performance issues with having many of these components on the screen causing eachother to re-render */
    shouldComponentUpdate: function (nextProps) {
        return nextProps.color !== this.props.color || nextProps.expanded !== this.props.expanded;
    },

    componentDidMount: function () {
        this.slider = React.findDOMNode(this.refs.picker).getElementsByClassName("hue-slider")[0];
        this.container = React.findDOMNode(this.refs.container);
        window.addEventListener("click", this._close);
    },

    componentWillUnmount: function () {
        this.slider = null;
        this.container = null;
        window.removeEventListener("click", this._close);
    },

    render: function () {
        var style = {
            display: this.props.expanded ? "" : "none",
            left: this.props.swatchSize + 10,
            top: this.props.swatchSize + 10
        };
        var swatchStyle = {
            height: this.props.swatchStyle,
            width: this.props.swatchStyle,
            backgroundColor: this.props.color
        };

        return (
            <div>
                <div>
                { this.props.labelText && this._getLabel() }
                </div>
                <div ref="container"
                    className={"input-color-picker inline " + (this.props.className || "")}
                    onClick={this._handleClick} data-id={this.props.id}>
                    <span className="colors">
                        <span className="colors-swatch">
                            <span style={swatchStyle}></span>
                        </span>
                        <input ref="input" type="text" className="colors-input btn-fg-color"
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown}
                            value={this.props.color} maxLength="7" />
                    </span>
                    <span className="colorpicker-container" style={style}>
                        <Picker ref="picker" color={this.props.color || this.props.defaultColor}
                            onChange={this._handleChange}/>
                    </span>
                </div>
            </div>
        );
    }
});

var ManagedColorPicker = React.createClass({
    getInitialState: function () {
        return {
            expanded: false,
        };
    },

    _handleToggle: function () {
        this.setState({ expanded: !this.state.expanded });
        if (typeof(this.props.onToggle) === "function") {
            this.props.onToggle();
        }
    },

    render: function () {
        return (<ControlledColorPicker ref="picker" {...this.props}
            expanded={this.state.expanded}
            onToggle={this._handleToggle} />);
    }
});

