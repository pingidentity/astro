"use strict";

var PropTypes = require("prop-types");

var React = require("react"),
    ReactDOM = require("react-dom"),
    classnames = require("classnames"),
    _ = require("underscore"),
    Utils = require("../../util/Utils.js"),
    placeholder = document.createElement("span"),
    FormLabel = require("./FormLabel.jsx");

placeholder.className = "placeholder";


/**
 * @class MultivaluesOption
 * @private
 * @ignore
 **/
class MultivaluesOption extends React.Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired

    };

    /**
    * Passes entry index to delete function
    *
    * @param {object} e
    *     The ReactJS synthetic event object.
    * @private
    * @ignore
    */
    _delete = (e) => {
        var id = e.target.id;
        this.props.onDelete(id);
    };

    render() {

        return (
            <label data-id={this.props.id} className="entry">
                {this.props.label}
                <a className="delete"
                    data-id="delete"
                    id = {this.props.id}
                    onClick={this._delete}></a>
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
 *
 * @param {array<string>} [entries=[]]
 *     Array of strings used to display initial entry boxes.
 * @param {Multivalues~onValueChange} [onValueChange]
 *     Callback triggered when a new entry is added or removed.
 *
 * @param {Multivalues~onNewValue} [onNewValue]
 *     Callback triggered and return a boolean when a new value is completed typing.
 *     Default keyCode to detect completed typing are 13, 188, 9 and 32
 *
 * @param {boolean} [required=false]
 *     If true, the user must enter an entry to the field.
 *
 * @example
 *
 *    <Multivalues title="Multi-value Entry"
 *                         entries={[
 *                                "Entry 1",
 *                                "Entry 2",
 *                                "Entry 3"
 *                          ]}
 *                          required={element.required}
 *                          onValueChange={this._addEntries} />
 *
 **/

class Multivalues extends React.Component {
    static displayName = "Multivalues";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        entries: PropTypes.arrayOf(PropTypes.string),
        onValueChange: PropTypes.func.isRequired,
        onNewValue: PropTypes.func,
        required: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "multivalues",
        entries: [],
        required: false,
        onNewValue: function (keyCode) {
            if (keyCode === 13 || keyCode === 188 || keyCode === 9 || keyCode === 32) {
                return true;
            }
            return false;
        }
    };

    state = {
        inputWidth: "20px"
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
        var hidden = ReactDOM.findDOMNode(this.refs["hidden-div"]);
        hidden.innerHTML = e.target.value;
        //add 20 pixels so input has room for next character
        var newWidth = hidden.offsetWidth + 20 + "px";

        var newState = {};
        newState["inputWidth"] = newWidth;
        this.setState(newState);
    };

    /**
     * add the last entered value to the multivalue list if enter/comma/tab wasn't used
     * @param {object} e - the event
     * @private
     */
    _handleBlur = (e) => {
        // simulate a tab key press
        var syntheticEvent = {
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
        if (this.props.onNewValue(e.keyCode)) {
            if (!enteredValue) {
                if (e.keyCode !== 9) { //let key tab take you to the next field if input is empty
                    e.preventDefault();
                }
                return;
            }
            e.preventDefault();
            e.target.value = "";
            var entries = this.props.entries;
            entries.push(enteredValue);

            if (this.props.onValueChange) {
                this.props.onValueChange(entries);
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
        var className = classnames(this.props.className, {
            "input-multivalues": true,
            required: this.props.required,
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

        var entryNodes = _.map(this.props.entries, function (label, index) {
            return (
                <MultivaluesOption
                    id={index}
                    label={label}
                    onChange={this.props.onValueChange}
                    onDelete = {this._handleDelete}
                    key={index}
                    />
            );
        }.bind(this));

        return (
            <FormLabel className={className} data-id={this.props["data-id"]} >
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
                            onBlur={this._handleBlur}
                            onChange={this._handleChange}
                            onKeyDown={this._handleKeyDown} />
                    </div>
                    <div ref = "hidden-div" style = {hiddenStyle} />
                </div>
            </FormLabel>
        );
    }
}

module.exports = Multivalues;
