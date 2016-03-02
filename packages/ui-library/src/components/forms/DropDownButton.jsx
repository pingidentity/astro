var React = require("react"),
    ReactDOM = require("react-dom"),
    cx = require("classnames"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer,
    _ = require("underscore");

/**
 * @callback DropDownButton~onSelectCallback
 * @param {object} selectedValue - selected value from menu
 */

/**
 * @callback DropDownButton~onToggleCallback
 * @param {boolean} isOpen - current open/closed status before click
 */

/**
 * @class DropDownButton
 * @desc Button which triggers drop down menu using list of provided options.
 *
 * @param {string} options - array of string labels to use as drop down options
 * @param {DropDownButton~onSelectCallback} onSelect - callback to be triggered when selection changed.
 *                                                     Will recieve selected value from options list.
 * @param {DropDownButton~onToggleCallback} [onToggle] - callback to be triggered when open/closed state changed.
 *                                Used only with stateless mode. Will receive current open status value.
 * @param {bool} [open=false] - boolean state of open/closed menu. Used only in stateless mode.
 * @param {string} [id] - optional id to pass to be used as data-id attribute value
 * @param {string} [className] - optional class to pass to style top level container
 * @param {string} [label="Add"] - label text for button
 * @param {string} [title] - menu title text
 * @param {bool} [controlled=false] - A boolean to enable the component to be externally managed.  True will relinquish
 *   control to the components owner.  False or not specified will cause the component to manage state internally
 *   but still execute the onToggle callback in case the owner is interested.
 *
 * @example
 *
 *      <DropDownButton title="Drop Down"
 *                      id="drop-down-menu"
 *                      onSelect={this._changeARule}
 *                      options={optionsMenu}/>
 *
 *      <DropDownButton controlled={true}
 *                      title="My menu"
 *                      id="drop-down-menu"
 *                      onSelect={this._changeARule}
 *                      open={this.state.menuOpen}
 *                      onToggle={this._toggleMenu}
 *                      options={
 *                          one: "One",
 *                          two: "Two",
 *                          three: "Three"} />
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
        return (
            this.props.controlled ? <Stateless {...this.props} /> : <Stateful {...this.props} />);
    }
});


var Stateless = React.createClass({

    propTypes: {
        options: React.PropTypes.object.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        onToggle: React.PropTypes.func.isRequired,
        label: React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        open: React.PropTypes.bool.isRequired,
        title: React.PropTypes.string
    },

    /**
     * Triggered
     * @method DropDownButton#_toggle
     * @param {object} e The event
     * @private
     */
    _toggle: function (e) {
        e.stopPropagation();
        this.props.onToggle(this.props.open);
    },

    /**
     * On option selected
     * @method DropDownButton#_onOptionSelected
     * @param {value} value The value selected from drop down
     * @private
     */
    _onOptionSelected: function (value) {
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
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
            label: "Add",
            title: "",
            options: {},
            open: false
        };
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
            styles = cx("input-menu-button", {
                open: this.props.open
            }),
            content = null;

        if (this.props.className) {
            styles = styles + " " + this.props.className;
        }

        if (this.props.open) {

            var optionNodes = _.map(this.props.options, function (value, key) {

                return (
                    <a data-id={key} onClick={_.partial(that._onOptionSelected, key)} key={key}>{value}</a>
                );
            });

            content = (
                <div className="menu" ref="menu">
                    <div className="description">{this.props.title}</div>
                    <div className="options">
                        {optionNodes}
                    </div>
                </div>
            );
        }

        return (
            <div className={styles} data-id={this.props.id}>
                <a data-id="action" className="add button inline" onClick={this._toggle}>{this.props.label}</a>
                {content}
            </div>
        );
    }
});


var Stateful = React.createClass({

    _toggle: function () {
        this.setState({
            open: !this.state.open
        });
    },

    _select: function (value) {
        this.setState({
            open: false
        }, function () {
            if (this.props.onSelect) {
                this.props.onSelect(value);

            }
        });
    },

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {
        return (
            <Stateless {...this.props} onToggle={this._toggle} onSelect={this._select} open={this.state.open}/>
        );
    }
});

