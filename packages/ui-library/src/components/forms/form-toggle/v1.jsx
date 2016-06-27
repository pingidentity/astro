var React = require("react"),
    classnames = require("classnames"),
    _ = require("underscore");

/**
 * @callback Toggle~onToggle
 *
 * @param {boolean} newState
 *     New toggle state after switch.
 * @param {object} paramObj
 *     Context, paramObj from original props.
 *
 * @returns {boolean} shouldClose
 *     True if toggle can switch its state, false otherwise.
 */

 /**
 * @class Toggle
 * @desc Toggles between two states on click.  Is either "off" or "on".
 *
 * @param {string} [id="toggle"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 *
 * @param {boolean} [toggled=false]
 *     Initial toggle state; set true for "on".
 * @param {boolean} [value]
 *     Toggle state (true/false), used to manage state outside of Toggle component, must be used in conjunction with
 *     onToggle callback to receive state updates.
 * @param {object} [paramObj]
 *     Parameter object to pass to onToggle delegate method.
 * @param {Toggle~onToggle} [onToggle]
 *     Callback to be triggered when toggle state changed - if returns true then toggle will be toggled,
 *     otherwise toggle will not be toggled.
 *
 * @param {boolean} [disabled=false]
 *     If disabled then the toggle will be styled with a "disabled" class and will not be clickable.
 *
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

    componentWillMount: function () {
        console.warn("** This version of the Toggle is deprecated and will be removed in the next release");
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

        var classNames = classnames({
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
