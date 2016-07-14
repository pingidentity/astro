var React = require("re-react"),
    classnames = require("classnames"),
    Utils = require("../../../util/Utils"),
    _ = require("underscore");

/**
* @callback Toggle~onToggle
*/

/**
* @class Toggle
* @desc Toggles between two states on click. Is either "off" or "on".
*
* @param {string} [data-id="toggle"]
*     To define the base "data-id" value for top-level HTML container.
* @param {string} [className]
*     CSS classes to be set on the top-level HTML container.
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {boolean} [toggled=false]
*     Toggle state; either true for "on" or false for "off".
* @param {Toggle~onToggle} [onToggle]
*     Callback to be triggered when toggled state changes.
*
* @param {boolean} [disabled=false]
*     If disabled then the toggle will be styled with a "disabled" class and will not be clickable.
*
* @example
*     <Toggle className="small" onToggle={this._handleToggle} toggled={true} />
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
        return this.props.controlled
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
        disabled: React.PropTypes.bool.affectsRendering
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
        if (this.props.id) {
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
            className = classnames("input-toggle", this.props.className, {
                selected: this.props.toggled,
                disabled: this.props.disabled
            });

        return (
            <div data-id={id} className={className} onClick={this._handleToggle}>
                <a className="toggle">
                    <input type="hidden" />
                </a>
            </div>
        );
    }
});

var ToggleStateful = React.createClass({

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