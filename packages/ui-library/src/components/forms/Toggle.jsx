var React = require("react"),
    css = require("classnames"),
    _ = require("underscore");

/**
 * @callback Toggle~onToggleCallback
 * @param {boolean} newState - new toggle state after switch
 * @param {object} paramObj - context, paramObj from original props
 * @returns {boolean} shouldClose - true if toggle can switch its state, false otherwise
 */

 /**
 * @class Toggle
 * @desc Toggles between two states on click.  Is either "off" or "on".
 *
 * @param {Toggle~onToggleCallback} [onToggle] - callback to be triggered toggle is clicked.
 *          If call returns true then toggle will be toggled, otherwise toggle will
 *          not be toggled.
 * @param {object} [paramObj] - parameter object to pass to onToggle delegate method.
 * @param {boolean} [toggled] - Initial toggle state; set true for "on".  Default: false.
 * @param {boolean} [value] - toggle state (true/false), used to manage state outside of Toggle component, must be used in
 *          conjunction with onToggle callback to receive state updates.
 * @param {boolean} [disabled] - If disabled then the toggle will be styled with a "disabled" class
 *          and will not be clickable.  Default: false.
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [id] - it is used for a unique data-id
 * @example
 *    <Toggle className="small" onToggle={this._toggleChanged} paramObj={someObject} toggled={true} />
 *
 *  Where _toggleChanged will be called as:
 *      _toggleChanged(newToggleState, someObject)
 *      and if it returns true then the toggle will be toggled.
 *
 **/
var Toggle = React.createClass({

    propTypes: {
        onToggle: React.PropTypes.func,
        paramObj: React.PropTypes.object,
        toggled: React.PropTypes.bool,
        value: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        className: React.PropTypes.string,
        id: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            id: "toggle"
        };
    },

   /**
     * Call the props toggle() function .
     *
     * @private
    */
    _toggle: function () {
        if (this.props.disabled) {
            return;
        }

        var value = _.isUndefined(this.props.value) ? this.state.toggled : this.props.value;

        var result = true;

        if (this.props.onToggle) {
            result = this.props.onToggle(!value, this.props.paramObj);
        }

        if (result) {
            this.setState({
                toggled: !value
            });
        }
    },

    getInitialState: function () {
        return {
            toggled: (this.props.toggled) ? true : false
        };
    },

    render: function () {

        var state = _.isUndefined(this.props.value) ? this.state.toggled : this.props.value;

        var classNames = css({
            "input-toggle": true,
            selected: state,
            disabled: this.props.disabled
        });

        if (this.props.className) {
            classNames = classNames + " " + this.props.className;
        }

        return (
            <div data-id={this.props.id} className={classNames} onClick={this._toggle}>
                <a className="toggle">
                    <input type="hidden" />
                </a>
            </div>
        );
    }
});

module.exports = Toggle;
