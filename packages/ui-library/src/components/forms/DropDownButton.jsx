var React = require("react/addons"),
    cx = require("classnames"),
    _ = require("underscore");

/**
 * @module DropDownButton
 *
 * @desc DropDownButton implementation
 *
 * @param {string} options - array of string labels to use as drop down options
 * @param {function} onSelect - function (value) {...} delegate to call when selection changed.
 * @param {string} id - optional id to pass
 * @param {string} className - optional class to pass
 *
 * @example
 *
 *      <DropDownButton title="Drop Down"
 *                 id="drop-down-menu"
 *                 onSelect={this._changeARule}
 *                 options={optionsMenu}/>
 */
var DropDownButton = React.createClass({

    propTypes: {
        options: React.PropTypes.object.isRequired,
        onSelect: React.PropTypes.func.isRequired,
        label: React.PropTypes.string,
        id: React.PropTypes.string,
        className: React.PropTypes.string
    },

    /**
     * Toggle the menu
     *
     * @param {object} e - the event
     * @private
     */
    _toggle: function (e) {
        e.stopPropagation();

        this.setState({ open: !this.state.open });
    },

    /**
     * On option selected
     *
     * @param {value} value selected from drop down
     * @private
     */
    _onOptionSelected: function (value) {
        if (this.props.onSelect) {
            this.props.onSelect(value);
        }
        this.setState({ open: false });
    },

    /**
     * Close menu
     *
     * @private
     */
    close: function () {
        this.setState({ open: false });
    },

    getDefaultProps: function () {
        return {
            label: "Add",
            options: {}
        };
    },

    getInitialState: function () {
        return {
            open: false
        };
    },

    render: function () {

        var that = this,
            styles = cx("input-menu-button", {
                open: this.state.open
            }),
            content = null;
            
        if (this.props.className) {
            styles = styles + " " + this.props.className;
        }

        if (this.state.open) {

            var optionNodes = _.map(this.props.options, function (value, key) {

                return (
                    <a data-id={key} onClick={_.partial(that._onOptionSelected, key)} key={key}>{value}</a>
                );
            });

            content = (
                <div className="menu">
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

module.exports = DropDownButton;
