import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Utils from '../../util/Utils';
import _ from 'underscore';
import { cannonballChangeWarning } from '../../util/DeprecationUtils';
import { inStateContainer, toggleTransform } from '../../util/StateContainer';
import { flagsPropType, hasFlag } from '../../util/FlagUtils';

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
        onToggle: () => { }
    };

    componentDidMount() {
        if (!hasFlag(this, "p-stateful")) {
            if (
                (typeof this.props.toggled === "undefined" && this.props.stateless) ||
                (typeof this.props.toggled !== "undefined" && !this.props.stateless)
            ) {
                cannonballChangeWarning({
                    message: `The 'toggled' prop will no longer serve as an initial state. ` +
                        `If it is present, it will control the current value of the component. ` +
                        `Set the 'p-stateful' flag to switch to this behavior now.`,
                });
            }
        }
    }

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

class Stateful extends React.Component {
    static defaultProps = {
        onToggle: /* istanbul ignore next  */ () => { }
    };

    state = {
        toggled: this.props.toggled || false
    };

    _handleToggle = () => {
        this.props.onToggle(!this.state.toggled);
        this.setState({
            toggled: !this.state.toggled
        });
    };

    render() {
        const props = _.defaults({
            ref: "ToggleStateless",
            toggled: this.state.toggled,
            onToggle: this._handleToggle
        }, this.props);

        return <Stateless {...props} />;
    }
}

const PStatefulToggle = inStateContainer([
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

PStatefulToggle.displayName = "PStatefulToggle";

export default class Toggle extends Component {
    static propTypes = {
        stateless: PropTypes.bool,
        flags: flagsPropType,
    };

    static defaultProps = {
        stateless: true,
    };

    static contextTypes = { flags: PropTypes.arrayOf(PropTypes.string) };

    _usePStateful = () => hasFlag(this, "p-stateful");

    render() {
        if (this._usePStateful()) {
            return <PStatefulToggle {...this.props} />;
        }

        return this.props.stateless
            ? <Stateless ref="ToggleStateless" {...this.props} />
            : <Stateful ref="ToggleStateful" {...this.props} />;
    }
}

Toggle.Status = Status;

module.exports = Toggle;
