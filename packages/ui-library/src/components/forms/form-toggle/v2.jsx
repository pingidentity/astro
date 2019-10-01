import React, { Component } from "react";
import PropTypes from "prop-types" ;
import classnames from "classnames";
import _ from "underscore";
import { inStateContainer, toggleTransform } from "../../utils/StateContainer";
import { flagsPropType } from "../../../util/FlagUtils";
import { deprecatedStatelessProp } from "../../../util/DeprecationUtils";

/**
 * @enum {string}
 * @alias Toggle.Status
 */
const Status = {
    LOCKED: "locked"
};

/**
* @callback Toggle~onToggle
*/

/**
* @class Toggle
* @desc Toggles between two states on click. Is either "off" or "on".
*
* @param {string} [data-id=toggle]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
*
* @param {boolean} [disabled=false]
*     If disabled then the toggle will be styled with a "disabled" class and will not be clickable.
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [toggled=false]
*     Toggle state; either true for "on" or false for "off".
*     When not provided, the component will manage this value.
* @param {string} [name]
*     Name attribute for the input.
*
* @param {Toggle.Status} [status]
*     The status determines aspects of the visual presentation of the toggle. Ex: if status=locked then the off state
*     of the toggle has a yellow bg color instead of the default gray
* @param {Toggle~onToggle} [onToggle]
*     Callback to be triggered when toggled state changes.
*
*
* @example
*     <Toggle className="small" onToggle={this._handleToggle} toggled={true} />
*/

class Stateless extends Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        toggled: PropTypes.bool,
        onToggle: PropTypes.func,
        disabled: PropTypes.bool,
        name: PropTypes.string,
    };

    static defaultProps = {
        "data-id": "toggle",
        className: "",
        disabled: false,
        onToggle: _.noop,
    };

    _handleToggle = () => {
        if (this.props.disabled) {
            return;
        }

        this.props.onToggle();
    };

    render() {
        const status = this.props.status ? Status[this.props.status.toUpperCase()] : null,
            className = classnames("input-toggle", this.props.className, status, {
                selected: this.props.toggled,
                disabled: this.props.disabled
            });

        return (
            <div data-id={this.props["data-id"]} className={className} onClick={this._handleToggle}>
                <span className="toggle">
                    <input type="hidden" name={this.props.name} />
                </span>
            </div>
        );
    }
}

const Toggle = inStateContainer([
    {
        name: "toggled",
        initial: false,
        callbacks: [
            {
                name: "onToggle",
                transform: toggleTransform,
            }
        ],
    }
])(Stateless);

Toggle.displayName = "Toggle";

Toggle.propTypes = {
    stateless: deprecatedStatelessProp,
    flags: flagsPropType,
};

Toggle.contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

Toggle.Status = Status;

module.exports = Toggle;
