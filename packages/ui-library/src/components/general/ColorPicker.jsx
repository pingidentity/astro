"use strict";

var React = require("react"),
    Picker = require("react-colorpicker");

/** @class ColorPicker
 * @desc A wrapper around react-color picker which allows you to pick a color and displays a swatch and hex code
 * @param {string} color - A hexcode of chosen color
 * @param {function} onChange - A callback executed when a color is chosen
 * @param {function} onToggle - A callback executed when the user expands/collapses the color picker
 * @param {bool} visible - A boolean which determines when the color picker is expanded
 * @param {number} [swatchSize=18] - The dims in pixels of the swatch
 * @param {string} [id] - Set the data-id on the top level html element
 * @param {string} [className] - Append classname to the top level html element
 */
var ColorPicker = React.createClass({
    propTypes: {
        color: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        visible: React.PropTypes.bool.isRequired,
        swatchSize: React.PropTypes.number,
        id: React.PropTypes.string,
        classname: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            swatchSize: 18
        };
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

        //if the click happened inside the container show then show, or any click when the picker is visible hides
        if (target === this.container || this.props.visible) {
            e.stopPropagation(); //stop propagation, otherwise it will bubble up and call this function again
            this.props.onToggle();
        }
    },

    componentDidMount: function () {
        this.slider = React.findDOMNode(this.refs.picker).getElementsByClassName("hue-slider")[0];
        this.container = React.findDOMNode(this.refs.container);
        window.addEventListener("click", this._handleClick);
    },

    componentWillUnmount: function () {
        this.slider = null;
        this.container = null;
        window.removeEventListener("click", this._handleClick);
    },

    render: function () {
        var style = {
            display: this.props.visible ? "" : "none",
            left: this.props.swatchSize + 10,
            top: this.props.swatchSize + 10
        };
        var swatchStyle = {
            height: this.props.swatchStyle,
            width: this.props.swatchStyle,
            backgroundColor: this.props.color
        };

        return (
                <div ref="container"
                    className={"input-color-picker inline " + (this.props.className || "")}
                    onClick={this._handleClick} data-id={this.props.id}>
                    <span className="colors">
                        <span className="colors-swatch">
                            <span style={swatchStyle}></span>
                        </span>
                        <input readOnly={true} type="text"
                            className="colors-input btn-fg-color"
                            value={this.props.color} maxLength="7" />
                    </span>
                    <span className="colorpicker-container" style={style}>
                        <Picker ref="picker" color={this.props.color} onChange={this.props.onChange}/>
                    </span>
                </div>
        );
    }
});

module.exports = ColorPicker;
