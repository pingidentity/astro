"use strict";

var React = require("react");
var cx = require("classnames");
var _ = require("underscore");
var _s = require("underscore.string");

/**
 * @class MultiselectOption
 * @desc It is a helper compoment, not for export.
 * @private
 **/
var MultiselectOption = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        value: React.PropTypes.any.isRequired,
        onChange: React.PropTypes.func
    },

    /**
    * It is used to set the checkbox is checked or not and then
    * call the props onChange() function to updte the value.
    *
    * @param {bool} e - checked value
    * @private
    */
    _changed: function (e) {
        var checked = e.target.checked;
        this.setState({
            isSelected: checked
        });
        this.props.onChange(this.props.value, checked); //propage event to owner
    },

    getInitialState: function () {
        return {
            isSelected: false //unselected by default
        };
    },

    render: function () {
        return (
            <label data-id={this.props.id}>
                <input type="checkbox" data-id="checkbox" onChange={this._changed} checked={this.state.isSelected}/>
                <div className="icon"></div>{this.props.label}</label>
        );
    }
});

/**
 * @module Multiselect
 * @desc Multiselect implements multi selection drop-down with option search capability.
 *
 * @param {string} title - drop down label. (required)
 * @param {object} options - key-value object to draw drop down options, keys are expected to be
 *            string labels (will be rendered in browser), while values can be arbitaraty
 *            data of functions, specific value object will be passed to callback
 *            when selection change.
 * @param {string} [className] - extra CSS classes to be applied
 * @param {string} [id] - it is used for a unique data-id
 * @example
 *    <Multiselect title="User Status"
 *                         options={{
 *                                "Active":'active',
 *                                "Disabled":Constants.User.INACTIVE,
 *                                "Suspended":function () { console.log('suspended'); },
 *                                "Waiting for approcal":{'any':'data'}
 *                          }}
 *                          onChange={this._updateUserStatus} />
 *
 * , where this._updateUserStatus can be defined as:
 *
 *
 *            _updateUserStatus: function (value,checked) {
 *               console.log("++ _updateUserStatus:",value," is ", checked);
 *            }
 *
 **/
var Multiselect = React.createClass({
    displayName: "Multiselect",

    propTypes: {
        title: React.PropTypes.string.isRequired,
        options: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func,
        className: React.PropTypes.string,
        id: React.PropTypes.string
    },

    /**
    * It is used to decide the menu should displayed or not.
    * If it is open, it is closed and vice versa.
    *
    * @private
    */
    _toggle: function () {
        this.setState({
            isOpen: !this.state.isOpen
        });
    },

    /**
    * Clear the search field.
    *
    * @param {string} e - search parameter
    * @private
    */
    _clearSearch: function (e) {
        e.stopPropagation();
        this.setState({
            searchStr: ""
        });
    },

    /**
    * Set the filter criteria by entered value.
    *
    * @param {string} e - search parameter
    * @private
    */
    _filterOptions: function (e) {
        var searchStr = e.target.value;
        this.setState({
            searchStr: searchStr
        });
    },

    /**
    * Clear search on ESC or close multiselect
    * if search is empty.
    *
    * @param {string} e - search parameter
    * @private
    */
    _searchKeyUp: function (e) {
        //clear search on ESC or close multiselect if search is empty
        if (e.keyCode === 27) {
            if (this.state.searchStr === "") {
                this._toggle();
            } else {
                this._clearSearch(e);
            }
        }
    },

    getInitialState: function () {
        return {
            isOpen: false,
            searchStr: ""
        };
    },

    render: function () {
        var containerCss = cx({
            "input-multiselect": true,
            open: this.state.isOpen
        });
        if (this.props.className) {
            containerCss = containerCss + " " + this.props.className;
        }

        var self = this;

        //filter options by label to get matched keys
        var match = _.filter(Object.keys(this.props.options), function (key) {
            return _s.startsWith(key.toLowerCase(), self.state.searchStr.toLowerCase());
        });

        var optionsNodes = _.map(match, function (label, index) {
            var value = self.props.options[label];

            return (
                <MultiselectOption id={"option" + index} label={label} onChange={self.props.onChange}
                    key={label} value={value} />
            );
        });

        return (
            <div className={containerCss} data-id={this.props.id}>
                <div className="button default" onClick={this._toggle}>{this.props.title}</div>
                <div className="menu">
                    <input type="text" name="search-text" onKeyUp={this._searchKeyUp}
                        onChange={this._filterOptions} value={this.state.searchStr} />
                    <a className="clear" data-id="clear" onClick={this._clearSearch}>X</a>
                    <div className="options" data-id="options">
                        {optionsNodes}
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Multiselect;
