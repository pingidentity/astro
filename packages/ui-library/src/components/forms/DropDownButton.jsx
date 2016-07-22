var React = require("react"),
    ReactDOM = require("react-dom"),
    cx = require("classnames"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer,
    _ = require("underscore"),
    If = require("../general/If.jsx"),
    Utils = require("../../util/Utils.js");

/**
 * @callback DropDownButton~onValueChange
 * @param {object} value
 *     Selected value from menu (ie. the value of the selected item in the options object).
 */

/**
 * @callback DropDownButton~onToggle
 * @param {boolean} isOpen
 *     Current open/closed status before click.
 */

/**
 * @class DropDownButton
 * @desc Button which triggers drop down menu using list of provided options.
 *
 * @param {string} [data-id="drop-down-button"]
 *     To define the base "data-id" value for top-level HTML container.
 * @param {string} [id]
 *     DEPRECATED. Use "data-id" instead. To define the base "data-id" value for top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {boolean} [controlled=false]
 *     To enable the component to be externally managed. True will relinquish control to the component's owner.
 *     False or not specified will cause the component to manage state internally.
 *
 * @param {object} options
 *     An object where the keys are the item IDs, and the values are the corresponding labels.
 * @param {DropDownButton~onValueChange} [onValueChange]
 *     Callback to be triggered when the selection changed.
 * @param {DropDownButton~onSelect} [onSelect]
 *     DEPRECATED. Use "onValueChange" instead.
 * @param {DropDownButton~onToggle} [onToggle]
 *     Callback to be triggered when open/closed state changed. Used only when controlled=true.
 * @param {boolean} [open=false]
 *     Boolean state of open/closed menu. Used only when controlled=true.
 * @param {string} label
 *     Label text for button
 * @param {string} [title]
 *     Menu title text
 *
 * @example
 *
 *      <DropDownButton title="Drop Down"
 *              data-id="drop-down-menu"
 *              onValueChange={this._changeARule}
 *              options={optionsMenu}
 *      />
 *
 *      <DropDownButton controlled={true}
 *          data-id="drop-down-menu"
 *          title="My menu"
 *          onValueChange={this._changeARule}
 *          open={this.state.menuOpen}
 *          onToggle={this._toggleMenu}
 *          options={
 *              one: "One",
 *              two: "Two",
 *              three: "Three"
 *          }
 *     />
 */


var Stateless = React.createClass({
    displayName: "DropDownButtonStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        options: React.PropTypes.object.isRequired,
        onValueChange: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        onToggle: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool.isRequired,
        label: React.PropTypes.string.isRequired,
        title: React.PropTypes.string
    },

    /**
     * Triggered
     * @method DropDownButton#_toggle
     * @param {object} e
     *     The ReactJS synthetic event
     * @private
     * @ignore
     */
    _toggle: function (e) {
        e.stopPropagation();
        this.props.onToggle(this.props.open);
    },

    /**
     * On option selected
     * @method DropDownButton#_onValueChanged
     * @param {value} value
     *     The value selected from drop down
     * @private
     * @ignore
     */
    _onValueChanged: function (value) {
        // onSelect first, for onValueChange has a default
        (this.props.onSelect || this.props.onValueChange)(value);
    },

    _handleGlobalClick: function (e) {
        if (this.props.open) {
            callIfOutsideOfContainer(
                ReactDOM.findDOMNode(this.refs.menu),
                _.partial(this.props.onToggle, this.props.open),
                e
            );
        }
    },

    _handleGlobalKeyDown: function (e) {
        if (e.keyCode === 27 && this.props.open) {
            this.props.onToggle(this.props.open);
        }
    },

    getDefaultProps: function () {
        return {
            "data-id": "drop-down-button",
            onValueChange: _.noop,
            options: {},
            open: false
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            console.warn(Utils.deprecateMessage("id", "data-id"));
        }
        if (this.props.onSelect) {
            console.warn(Utils.deprecateMessage("onSelect", "onValueChange"));
        }
    },

    componentDidMount: function () {
        window.addEventListener("click", this._handleGlobalClick);
        window.addEventListener("keydown", this._handleGlobalKeyDown);
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
        window.removeEventListener("keydown", this._handleGlobalKeyDown);
    },

    render: function () {

        var that = this,
            styles = cx(
                "input-menu-button", {
                    open: this.props.open
                },
                this.props.className
            ),
            content = null,
            dataId = this.props.id || this.props["data-id"];

        if (this.props.open) {

            var optionNodes = _.map(this.props.options, function (value, key) {

                return (
                    <a data-id={key} onClick={_.partial(that._onValueChanged, key)} key={key}>
                        {value}
                    </a>
                );
            });

            content = (
                <div className="menu" ref="menu" data-id="menu">
                    <If test={this.props.title}>
                        <div className="options-title" data-id="options-title">{this.props.title}</div>
                    </If>
                    <div className="options" data-id="options">
                        {optionNodes}
                    </div>
                </div>
            );
        }

        return (
            <div className={styles} data-id={dataId}>
                <a data-id="action" className="add button inline" onClick={this._toggle}>
                    {this.props.label}
                </a>
                {content}
            </div>
        );
    }
});


var Stateful = React.createClass({
    displayName: "DropDownButtonStateful",

    _toggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _select: function (value) {
        this.setState({
            open: false
        }, function () {
            // onSelect first, for onValueChange has a default
            (this.props.onSelect || this.props.onValueChange)(value);
        });
    },

    getDefaultProps: function () {
        return {
            onValueChange: _.noop
        };
    },

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {
        var props = _.defaults({
            onToggle: this._toggle,
            onValueChange: this._select,
            open: this.state.open
        }, this.props);
        return React.createElement(Stateless, props);
    }
});

module.exports = React.createClass({
    displayName: "DropDownButton",

    propTypes: {
        "data-id": React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        controlled: React.PropTypes.bool,
        options: React.PropTypes.object,
        onValueChange: React.PropTypes.func,
        onSelect: React.PropTypes.func,
        onToggle: React.PropTypes.func,
        open: React.PropTypes.bool,
        label: React.PropTypes.string,
        title: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            "data-id": "drop-down-button",
            controlled: false,
            open: false
        };
    },

    render: function () {
        return this.props.controlled
            ? React.createElement(Stateless, _.defaults({ ref: "Stateless" }, this.props))
            : React.createElement(Stateful, _.defaults({ ref: "Stateful" }, this.props));
    }
});
