"use strict";

var React = require("react");
var ReactDOM = require("react-dom");
var cx = require("classnames");
var _ = require("underscore");
var placeholder = document.createElement("span");
placeholder.className = "placeholder";


/**
 * @class MultivaluesOption
 * @private
 **/
var MultivaluesOption = React.createClass({

    propTypes: {
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired

    },
    /**
    * Passes entry index to delete function
    *
    * @param {string} e - event object
    * @private
    */
    _delete: function (e) {
        var id = e.target.id;
        this.props.onDelete(id);
    },

    render: function () {

        return (
            <label data-id={this.props.id} className="entry">
                {this.props.label}
                <a className="delete"
                    data-id="delete"
                    id = {this.props.id}
                    onClick={this._delete}>x</a>
            </label>
        );
    }
});


/**
 * @callback Multivalues~onChangeCallback
 * @param {array} newValues - Array of strings, contains new list of entries
 */

/**
 * @class Multivalues
 *
 * @desc Multivalues takes an array of strings and creates "boxed" text entries of each. Free form typing creates
 *       new entries when Enter or Comma is used.
 *
 * @param {array} [entries] - array of strings used to display initial entry boxes.
 * @param {Multivalues~onChangeCallback} onChange - Callback to be triggered when new entry added or removed
 * @param {string} [className] - extra CSS classes to be applied
 * @param {boolean} [isRequired] whether the field is required or not (default false)
 * @param {string} [id] - it is used for a unique data-id
 *
 * @example
 *
 *    <Multivalues title="Multi-value Entry"
 *                         entries={[
 *                                "Entry 1",
 *                                "Entry 2",
 *                                "Entry 3"
 *                          ]}
 *                          isRequired={element.required}
 *                          onChange={this._addEntries} />
 *
 **/

var Multivalues = React.createClass({

    displayName: "Multivalues",

    propTypes: {
        entries: React.PropTypes.array,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        id: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            inputWidth: "20px"
        };
    },

    getDefaultProps: function () {
        return {
            entries: null
        };
    },

    /**
    * Dynamically expand the input as the user types
    *
    *
    * @param {object} e - the event
    * @private
    */
    _handleChange: function (e) {
        //Sets the html of a hidden div to calculate exact pixel width of the input string
        var hidden = ReactDOM.findDOMNode(this.refs["hidden-div"]);
        hidden.innerHTML = e.target.value;
        //add 20 pixels so input has room for next character
        var newWidth = hidden.offsetWidth + 20 + "px";

        var newState = {};
        newState["inputWidth"] = newWidth;
        this.setState(newState);
    },

    /**
    * Add string to array and pass to parent
    *
    *
    * @param {object} e - the event
    * @private
    */
    _handleKeyDown: function (e) {
        var enteredValue = e.target.value ? e.target.value : "";

        //When delete key is pressed, delete previous string if nothing is entered
        if (e.keyCode === 8 && enteredValue.length < 1) {
            e.preventDefault(); //keeps the browser from going back after last item is deleted
            var id = this.props.entries.length - 1;
            this._handleDelete(id);
            return;
        }

        enteredValue = e.target.value.trim();
        //Adds input value to array when Enter and Comma key are pressed
        if (e.keyCode === 13 || e.keyCode === 188) {
            e.preventDefault();
            if (!enteredValue) {return;}
            e.target.value = "";
            var entries = this.props.entries;
            entries.push(enteredValue);
            this.props.onChange(entries);
            //reset the input width
            this.setState({
                inputWidth: "20px"
            });
        }
    },

    /**
    * Delete string from array based on index and returns array to parent
    *
    *
    * @param {number} index - index of item to be deleted
    * @private
    */
    _handleDelete: function (index) {
        var entries = this.props.entries;
        entries.splice(index,1);
        this.props.onChange(entries);
    },

    render: function () {
        var containerCss = cx({
            "input-multivalues": true,
            required: this.props.isRequired,
            "value-entered": (this.props.entries.length !== 0)
        });

        //this style is for the hidden div that allows us to get an accurate
        //size for our dynamic input
        var hiddenStyle = {
            width: "auto",
            display: "inline-block",
            visibility: "hidden",
            position: "absolute",
            zIndex: "-1",
            bottom: "0",
            left: "0" };

        var inputStyle = {
            width: [this.state.inputWidth]
        };

        if (this.props.className) {
            containerCss = containerCss + " " + this.props.className;
        }

        var self = this;

        var entryNodes = _.map(this.props.entries, function (label, index) {
            return (
                <MultivaluesOption
                    id={index}
                    label={label}
                    onChange={self.props.onChange}
                    onDelete = {self._handleDelete}
                    key={index}
                    />
            );
        });

        return (
            <label className={containerCss} data-id={this.props.id} >
                <div className="entries" data-id="entries">
                    {entryNodes}
                    <div className="value-input">
                        <input
                            data-id = "value-entry"
                            style = {inputStyle}
                            type = "text"
                            ref="value-entry"
                            tabIndex="0"
                            name="value-entry"
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown} />
                    </div>
                    <div ref = "hidden-div" style = {hiddenStyle} />
                </div>
            </label>
        );
    }
});

module.exports = Multivalues;
