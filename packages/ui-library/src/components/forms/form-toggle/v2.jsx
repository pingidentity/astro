var React = require("re-react"),
    ReactVanilla = require("react"),
    classnames = require("classnames"),
    Utils = require("../../../util/Utils"),
    _ = require("underscore");

/**
 * @enum {string}
 * @alias Toggle.Status
 */
var Status = {
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
* @param {boolean} [controlled=false]
*     DEPRECATED. Use "stateless" instead.
* @param {boolean} [disabled=false]
*     If disabled then the toggle will be styled with a "disabled" class and will not be clickable.
* @param {boolean} [stateless]
*     WARNING. Default value for "stateless" will be set to true from next version.
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
* @param {boolean} [toggled=false]
*     Toggle state; either true for "on" or false for "off".
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

var Toggle = ReactVanilla.createClass({

    propTypes: {
        controlled: React.PropTypes.bool, //TODO: remove in new version
        stateless: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            controlled: false //TODO: change to stateless with true default in new version
        };
    },

    componentWillMount: function () {
        if (!Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("controlled", "stateless", "false", "true"));
        }
    },

    render: function () {
        var stateless = this.props.stateless !== undefined ? this.props.stateless : this.props.controlled;

        return stateless
            ? React.createElement(ToggleStateless, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "ToggleStateless" }, this.props))
            : React.createElement(ToggleStateful, //eslint-disable-line no-use-before-define
                _.defaults({ ref: "ToggleStateful" }, this.props));

    }
});

var ToggleStateless = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        toggled: React.PropTypes.bool.affectsRendering,
        onToggle: React.PropTypes.func,
        disabled: React.PropTypes.bool.affectsRendering,
        status: React.PropTypes.string.affectsRendering
    },

    getDefaultProps: function () {
        return {
            "data-id": "toggle",
            className: "",
            toggled: false,
            onToggle: _.noop,
            disabled: false
        };
    },

    componentWillMount: function () {
        if (this.props.id && !Utils.isProduction()) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
    },

    _handleToggle: function () {
        if (this.props.disabled) {
            return;
        }
        this.props.onToggle();
    },

    render: function () {
        var id = this.props.id || this.props["data-id"],
            status = this.props.status ? Status[this.props.status.toUpperCase()] : null,
            className = classnames("input-toggle", this.props.className, status, {
                selected: this.props.toggled,
                disabled: this.props.disabled
            });

        return (
            <div data-id={id} className={className} onClick={this._handleToggle}>
                <span className="toggle">
                    <input type="hidden" />
                </span>
            </div>
        );
    }
});

var ToggleStateful = ReactVanilla.createClass({

    _handleToggle: function () {
        this.setState({
            toggled: !this.state.toggled
        });
    },

    getInitialState: function () {
        return {
            toggled: this.props.toggled || false
        };
    },

    render: function () {
        var props = _.defaults({
            ref: "ToggleStateless",
            toggled: this.state.toggled,
            onToggle: this._handleToggle
        }, this.props);

        return React.createElement(ToggleStateless, props);
    }
});

Toggle.Status = Status;

module.exports = Toggle;
