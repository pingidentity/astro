"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import Utils from "../../util/Utils.js";
import FormLabel from "./FormLabel";
import FormError from "./FormError";

const placeholder = document.createElement("span");
placeholder.className = "placeholder";

import Icon from "../general/Icon";


/**
 * @class MultivaluesOption
 * @private
 * @ignore
 **/
class MultivaluesOption extends Component {
    static propTypes = {
        errorMessage: PropTypes.string,
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    /**
    * Passes entry index to delete function
    *
    * @param {object} e
    *     The ReactJS synthetic event object.
    * @private
    * @ignore
    */
    _delete = () => {
        this.props.onDelete(this.props.id);
    };

    render() {

        return (
            <label data-id={this.props.id} className="entry" title={this.props.label}>
                {this.props.label}
                {this.props.iconName && <Icon iconName={this.props.iconName}/>}
                <a className="delete"
                    data-id="delete"
                    id={this.props.id}
                    onClick={this._delete}
                />
            </label>
        );
    }
}

/**
* @callback Multivalues~onValueChange
*
* @param {arrray<string>} newValues
*     Array of strings, contains new list of entries.
*/

/**
 * @callback Multivalues~onNewValue
 *
 * @param {number} keyCode
 *     keyCode of keyDown event.
 * @return {boolean}
 *     true if the keyCode is the key to finish typing a token
 */

/**
 * @class Multivalues
 *
 * @desc Multivalues takes an array of strings and creates "boxed" text entries of each. Free form typing creates
 *     new entries when Enter or Comma is used.
 *
 * @param {string} [data-id="multivalues"]
 *     To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *     CSS classes to set on the top-level HTML container.
 * @param {array<string>} [entries=[]]
 *     Array of strings used to display initial entry boxes.
 * @param {string} [name]
 *     Name attribute for the input.
 * @param {Multivalues~onValueChange} [onValueChange]
 *     Callback triggered when a new entry is added or removed.
 * @param {Multivalues~onNewValue} [onNewValue]
 *     Callback triggered and return a boolean when a new value is completed typing.
 *     Default keyCode to detect completed typing are 13, 188, 9 and 32
 * @param {boolean} [stacked=false]
 *     If true, each value occupies it's own line.
 * @param {boolean} [required=false]
 *     If true, the user must enter an entry to the field.
 * @param {boolean} [autoFocus=false]
 *     Whether or not to auto-focus the element.
 * @param {string} [errorMessage]
 *     An error message to be displayed below the component body.
 *

 *
 * @example
 *
 *    <Multivalues labelText="Multi-value Entry"
 *        entries={[
 *            "Entry 1",
 *            "Entry 2",
 *            "Entry 3"
 *        ]}
 *        required={element.required}
 *        onValueChange={this._addEntries}
 *    />
 *
 **/

class Multivalues extends Component {
    static displayName = "Multivalues";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        entries: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired
            })
        ])),
        errorMessage: PropTypes.string,
        iconName: PropTypes.string,
        name: PropTypes.string,
        onValueChange: PropTypes.func.isRequired,
        onNewValue: PropTypes.func,
        required: PropTypes.bool,
        stacked: PropTypes.bool,
    };

    static defaultProps = {
        "data-id": "multivalues",
        entries: [],
        name: "value-entry",
        stacked: false,
        required: false,
        autoFocus: false,
        onNewValue: function (keyCode) {
            if (keyCode === 13 || keyCode === 188 || keyCode === 9 || keyCode === 32) {
                return true;
            }
            return false;
        }
    };

    hiddenDiv = null;

    state = {
        inputWidth: "20px",
        validValue: true
    };

    componentWillMount() {
        if (!Utils.isProduction()) {
            if (this.props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (this.props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
            if (this.props.isRequired !== undefined) {
                throw new Error(Utils.deprecatePropError("isRequired", "required"));
            }
        }
    }

    /**
    * Dynamically expand the input as the user types
    *
    *
    * @param {object} e - the event
    * @private
    */
    _handleChange = (e) => {
        //Sets the html of a hidden div to calculate exact pixel width of the input string
        this.hiddenDiv.innerHTML = e.target.value;
        //add 20 pixels so input has room for next character
        this.setState({
            inputWidth: this.hiddenDiv.offsetWidth + 20 + "px"
        });
    };

    /**
     * add the last entered value to the multivalue list if enter/comma/tab wasn't used
     * @param {object} e - the event
     * @private
     */
    _handleBlur = (e) => {
        // simulate a tab key press
        const syntheticEvent = {
            target: e.target,
            preventDefault: _.noop,
            keyCode: 9
        };
        this._handleKeyDown(syntheticEvent);
    };

    /**
    * Add string to array and pass to parent
    *
    *
    * @param {object} e - the event
    * @private
    */
    _handleKeyDown = (e) => {
        const {
            keyCode,
            target: {
                value = ""
            }
        } = e;

        //When delete key is pressed, delete previous string if nothing is entered
        if (keyCode === 8 && value.length < 1) {
            e.preventDefault(); //keeps the browser from going back after last item is deleted
            const id = this.props.entries.length - 1;
            this._handleDelete(id);
            return;
        }

        //Adds input value to array when Enter and Comma key are pressed
        if (this.props.onNewValue(keyCode, value)) {
            const trimmedValue = value.trim();
            if (!trimmedValue) {
                if (keyCode !== 9) { //let key tab take you to the next field if input is empty
                    e.preventDefault();
                }
                return;
            }
            e.preventDefault();
            e.target.value = "";

            if (this.props.onValueChange) {
                this.props.onValueChange([
                    ...this.props.entries,
                    trimmedValue
                ]);
            }

            //reset the input width
            this.setState({
                inputWidth: "20px"
            });
        }
    };

    /**
    * Delete string from array based on index and returns array to parent
    *
    *
    * @param {number} index - index of item to be deleted
    * @private
    */
    _handleDelete = (index) => {
        var entries = this.props.entries;
        entries.splice(index,1);

        if (this.props.onValueChange) {
            this.props.onValueChange(entries);
        }
    };

    render() {
        const {
            entries,
            errorMessage,
            onValueChange
        } = this.props;

        const className = classnames(this.props.className, "input-multivalues", {
            required: this.props.required && entries.length === 0,
            "value-entered": (entries.length !== 0),
            stacked: this.props.stacked
        });

        //this style is for the hidden div that allows us to get an accurate
        //size for our dynamic input
        const hiddenStyle = {
            width: "auto",
            display: "inline-block",
            visibility: "hidden",
            position: "absolute",
            zIndex: "-1",
            bottom: "0",
            left: "0"
        };

        const inputStyle = {
            width: [this.state.inputWidth]
        };

        const entryNodes = _.map(entries, (entry, index) => _.isString(entry)
            ? (
                <MultivaluesOption
                    id={index}
                    label={entry}
                    onChange={onValueChange}
                    onDelete = {this._handleDelete}
                    key={index}
                />
            )
            : (
                <MultivaluesOption
                    id={index}
                    label={entry.label}
                    onChange={onValueChange}
                    onDelete = {this._handleDelete}
                    key={index}
                    iconName={entry.icon}
                />
            ));

        return (
            <FormLabel
                value={this.props.labelText || this.props.label}
                className={className}
                data-id={this.props["data-id"]}
            >
                <div className="entries" data-id="entries">
                    {entryNodes}
                    <div className="value-input">
                        <input
                            data-id="value-entry"
                            style={inputStyle}
                            type="text"
                            tabIndex="0"
                            name={this.props.name}
                            onBlur={this._handleBlur}
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown}
                            autoFocus={this.props.autoFocus}
                        />
                    </div>
                    <div ref={ref => this.hiddenDiv = ref} style={hiddenStyle} />
                </div>
                {errorMessage &&
                    <div className="form-error">
                        <FormError.Message
                            className={"input-multivalues__error"}
                            value={errorMessage}
                        />
                    </div>
                }
            </FormLabel>
        );
    }
}

module.exports = Multivalues;
