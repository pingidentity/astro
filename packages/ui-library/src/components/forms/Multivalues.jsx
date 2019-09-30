"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import _ from "underscore";
import Utils from "../../util/Utils.js";
import FormLabel from "./FormLabel";
import FormError from "./FormError";
import OptionList from "./OptionList";
import PopperContainer from "../tooltips/PopperContainer";
import { containsString } from "../../util/SearchUtils";
import {
    isBackSpace,
    isComma,
    isEnter,
    isEsc,
    isSpace,
    isTab,
    isArrowUp,
    isArrowDown,
    isArrowLeft,
    isArrowRight,
    withFocusOutline
} from "../../util/KeyboardUtils.js";
import Icon from "../general/Icon";
import { InputWidths, InputWidthProptypes, getInputWidthClass } from "./InputWidths";

const placeholder = document.createElement("span");
placeholder.className = "placeholder";

const dontPropagate = e => e.stopPropagation();

/**
 * @class MultivaluesOption
 * @private
 * @ignore
 */
class MultivaluesOption extends Component {
    static propTypes = {
        label: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        onEdit: PropTypes.func,
        canEdit: PropTypes.bool,
        onDelete: PropTypes.func,
        iconName: PropTypes.string,
        active: PropTypes.bool
    };

    static defaultProps = {
        onEdit: _.noop,
        onDelete: _.noop,
        canEdit: true,
        iconName: "",
        active: false,
    };

    entryRef = null;
    timeout = null;

    state = {
        hover: false
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
        e.stopPropagation();
        const { onDelete, id } = this.props;
        onDelete(id);
    };

    _onEdit = () => {
        const {
            id,
            onEdit,
            canEdit
        } = this.props;
        if (canEdit) {
            onEdit(id);
        }
    };

    _showEditControl = () => {
        this.setState({
            hover: true
        });
    };

    _hideEditControl = () => {
        this.setState({
            hover: false
        });
    };

    render() {
        const {
            active,
            iconName,
            id,
            label,
            canEdit
        } = this.props;
        const {
            hover
        } = this.state;
        const showEditControls = canEdit && hover;

        return (
            <div
                className={classnames("entry", { "entry--active": active, "entry--editable": canEdit, hover })}
                onMouseEnter={this._showEditControl}
                onMouseLeave={this._hideEditControl}
            >
                <label
                    data-id={id}
                    title={label}
                    ref={(entryRef) => this.entryRef = entryRef}
                >
                    {label}
                    {iconName && <Icon iconName={iconName} type="leading" />}
                </label>
                <a className="delete"
                    data-id="delete"
                    id={id}
                    onClick={this._delete}
                />
                {showEditControls &&
                    <span className="entry__edit">
                        <Icon
                            iconName="edit"
                            type="inline"
                            containerClassName="entry__edit-icon"
                            onClick={this._onEdit}
                        />
                    </span>
                }
            </div>
        );
    }
}

/**
* @callback Multivalues~onValueChange
*
* @param {array<string>} newValues
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
 * @param {array<string|Object>} [entries=[]]
 *     Array of strings used to display initial entry boxes.
 * @param {string} [name]
 *     Name attribute for the input.
 * @param {node} [description]
 *     Description to display below the label.
 * @param {Multivalues~onValueChange} [onValueChange]
 *     Callback triggered when a new entry is added or removed.
 * @param {Multivalues~onNewValue} [onNewValue]
 *     Callback triggered and return a boolean when a new value is completed typing.
 *     Default keyCode to detect completed typing are 13, 188, 9 and 32
 * @param {function} [onBlur]
 *     Blur callback
 * @param {function} [onFocus]
 *     Focus callback
 * @param {boolean} [stacked=false]
 *     If true, each value occupies it's own line.
 * @param {boolean} [required=false]
 *     If true, the user must enter an entry to the field.
 * @param {boolean} [autoFocus=false]
 *     Whether or not to auto-focus the element.
 * @param {string} [errorMessage]
 *     An error message to be displayed below the component body.
 * @param {boolean} [autoHeight=false]
 *     Is only as high as its entries
 * @param {boolean} [autoWidth=false]
 *     Is only as wide as it needs to be
 * @param {array.OptionList~Option} [options]
 *     An array of value-label pairs. When supplied, the behavior changes a bit.
 *     - The entries prop will be a list of values
 *     - The component will display the corresponding labels
 *     - Only valid options can be added as entries
 *     - An auto-complete list will appear while focused
 * @param {boolean} [includeDraftInEntries=false]
 *     When set to true, the draft that is currently being edited is treated
 *     as the last entry in the list of entries.
 * @param {("XS" | "SM" | "MD" | "LG" | "XL" | "XX" | "MAX")} [width=LG]
 *    Specifies the width of the input.
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
 */


export class MultivaluesBase extends Component {

    static displayName = "Multivalues";

    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        autoFocus: PropTypes.bool,
        description: PropTypes.node,
        entries: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired
            })
        ])),
        errorMessage: PropTypes.string,
        name: PropTypes.string,
        onValueChange: PropTypes.func.isRequired,
        onNewValue: PropTypes.func,
        onBlur: PropTypes.func,
        onFocus: PropTypes.func,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                heading: PropTypes.bool,
                helpHintText: PropTypes.string,
                iconName: PropTypes.string,
                label: PropTypes.string,
                value: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
            })
        ),
        required: PropTypes.bool,
        stacked: PropTypes.bool,
        autoHeight: PropTypes.bool,
        includeDraftInEntries: PropTypes.bool,
        width: PropTypes.oneOf(InputWidthProptypes),
    };

    static defaultProps = {
        "data-id": "multivalues",
        entries: [],
        name: "value-entry",
        stacked: false,
        required: false,
        autoFocus: false,
        autoHeight: false,
        autoWidth: false,
        onNewValue: (keyCode, value) => (
            value !== "" && (isEnter(keyCode) || isComma(keyCode) || isTab(keyCode) || isSpace(keyCode))
        ),
        onValueChange: _.noop,
        onBlur: _.noop,
        onFocus: _.noop,
        includeDraftInEntries: false,
        width: InputWidths.LG,
    };

    constructor(props) {
        super(props);
        if (!Utils.isProduction()) {
            if (props.id) {
                throw new Error(Utils.deprecatePropError("id", "data-id"));
            }
            if (props.onChange) {
                throw new Error(Utils.deprecatePropError("onChange", "onValueChange"));
            }
            if (props.isRequired !== undefined) {
                throw new Error(Utils.deprecatePropError("isRequired", "required"));
            }
        }
    }

    state = {
        validValue: true,
        listOpen: this.props.autoFocus,
        draft: "",
        highlightedOption: -1,
        focused: false,
        activeEntry: -1,
    };

    _draftInputRef = null;

    _getCommittedEntries = () => {
        const { includeDraftInEntries, entries } = this.props;

        return (includeDraftInEntries && (this.state.draft === entries[entries.length - 1]))
            ? entries.slice(0, -1)
            : entries;
    };

    _getDraft = () => (this.props.includeDraftInEntries && this.state.draft)
        ? this.props.entries[this.props.entries.length - 1]
        : this.state.draft;

    /**
    * Dynamically expand the input as the user types
    * @param {object} e - the event
    * @private
    */
    _handleChange = (e, value = e.target.value) => {
        const { options, onValueChange } = this.props;

        if (this.props.includeDraftInEntries) {
            onValueChange([...this._getCommittedEntries(), value]);
        }

        // manage the input element, open the list if applicable, make sure we're highlighting a valid item, unselect entries
        this.setState(({ highlightedOption }) => ({
            draft: value,
            listOpen: options ? true : false,
            highlightedOption: (highlightedOption < 0 && value !== "") ? 0 : highlightedOption,
            activeEntry: -1,
        }));
    };

    /**
     * add the last entered value to the multivalue list if enter/comma/tab wasn't used
     * Manage focused state
     * @private
     */
    _handleBlur = (e) => {
        this.setState({ focused: false });

        const draft = this._getDraft();

        if (draft) {
            this._addInputValue(draft);
        }
        this._hideList();
        this.props.onBlur(e);
    };

    /**
     * Manage focused state
     * @private
     */
    _handleFocus = (e) => {
        this.setState({ focused: true });

        this.props.onFocus(e);
    };

    /**
     * fire the onValueChange event with the new entry added to the existing list
     * @param {string|number} value - the new entry
     * @private
     */
    _addInputValue = value => {
        const {
            entries,
            onValueChange,
            includeDraftInEntries,
        } = this.props;

        if (!includeDraftInEntries) {
            onValueChange([...entries, value]);
        }

        this.setState({
            draft: "",
            highlightedOption: -1,
            listOpen: false,
        });
    };

    /**
    * Move the highlighted index
    * @param {number} step - how much to move it by
    * @private
    */
    _moveHighlight = step => this.setState(({ highlightedOption }) => {
        const newHighlight = highlightedOption + step;

        // make sure the highlight index is valid
        return (newHighlight >= 0 && newHighlight < this._getFilteredOptions().length)
            ? { highlightedOption: newHighlight }
            : {};
    });

    /**
    * Add string to array and pass to parent
    * @param {object} e - the event
    * @private
    */
    _handleKeyDown = (e) => {
        const { keyCode } = e;
        const {
            activeEntry,
            highlightedOption,
        } = this.state;
        const {
            onNewValue,
        } = this.props;
        const entries = this._getCommittedEntries();
        const draft = this._getDraft();

        //When delete key is pressed, delete previous string if nothing is entered
        if (isBackSpace(keyCode) && draft === "") {
            e.preventDefault(); //keeps the browser from going back after last item is deleted
            if (activeEntry < 0) {
                this._handleDelete(entries.length - 1);
            } else {
                this._handleDelete(activeEntry);
            }
            return;
        }

        // escape key clears any entered text
        if (isEsc(keyCode)) {
            this._handleChange(null, "");
        }

        const { options } = this.props;
        if (options) {
            // different behavior when options are involved
            const { listOpen } = this.state;

            if (listOpen) {
                // Close the dropdown when escape is pressed
                if (isEsc(keyCode)) {
                    this._hideList();
                    e.preventDefault();
                    return;
                }

                // Up/down arrows change selected item on dropdown list
                if (isArrowUp(keyCode)) {
                    if (highlightedOption > 0) {
                        this._moveHighlight(-1);
                    } else {
                        this._hideList();
                    }
                    e.preventDefault();
                    return;
                } else if (isArrowDown(keyCode)) {
                    this._moveHighlight(1);
                    e.preventDefault();
                    return;
                }
            }

            // if options are provided, translate the value
            const filteredOptions = this._getFilteredOptions();
            const value = (listOpen && highlightedOption < filteredOptions.length && highlightedOption >= 0)
                ? filteredOptions[highlightedOption].value : draft;

            // if an item is selected and it's valid, add it
            if (highlightedOption >= 0 && highlightedOption < filteredOptions.length) {
                if (isEnter(keyCode) || isComma(keyCode) || isTab(keyCode)) {
                    e.preventDefault();
                    this._addInputValue(value);
                }
            }
        } else {
            //Adds input value to array when Enter and Comma key are pressed
            if (onNewValue(keyCode, draft)) {
                e.preventDefault();
                this._addInputValue(draft);
                return;
            }
        }

        if (draft === "") {
            // the draft is empty
            if (isSpace(keyCode) || isComma(keyCode)) {
                // when no text is entered, space should toggle the dropdown
                e.preventDefault();
                this._toggleList();
            } else if (isArrowDown(keyCode)) {
                // pressing the down arrow opens the list
                this._showList();
            } else if (isArrowLeft(keyCode)) {
                // pressing the left arrow selects an entry
                this.setState(({ activeEntry: active }) => (
                    active === 0
                        ? {} : {
                            activeEntry: active < 0 ? entries.length - 1 : active - 1,
                            listOpen: false,
                            highlightedOption: -1,
                        }
                ));
                e.preventDefault();
            } else if (isArrowRight(keyCode)) {
                // pressing the right arrow selects a later entry
                this.setState(({ activeEntry: active }) => (
                    active >= 0
                        ? {
                            activeEntry: active < entries.length - 1 ? active + 1 : -1,
                        } : {}
                ));
                e.preventDefault();
            }
        }
    };

    /**
    * Delete string from array based on index and returns array to parent
    * @param {number} index - index of item to be deleted
    * @private
    */
    _handleDelete = (index) => {
        const { entries, onValueChange } = this.props;
        onValueChange([...entries.slice(0, index), ...entries.slice(index + 1)]);

        // make sure active entry index isn't out of range now
        this.setState(({ activeEntry }) => activeEntry >= entries.length - 1 ? { activeEntry: -1 } : {});
    };

    _focusDraftField = () => {
        if (this._draftInputRef) {
            this._draftInputRef.focus();
        }
    };

    /**
     * Make item as a draft to allow user editing it
     * @param {number} index - index of item to be edited
     * @private
     */
    _onEntryEditStarted = (index) => {
        const { entries, onValueChange, includeDraftInEntries } = this.props;
        const [[entryToEdit], entriesToSend] = _.partition(entries, (entry, i) => index === i);
        const draft = this._getDraft();
        if (draft && !includeDraftInEntries) {
            entriesToSend.push(draft);
        }
        let newDraft;
        if (_.isObject(entryToEdit)) {
            newDraft = entryToEdit.value || entryToEdit.label;
        } else {
            newDraft = entryToEdit;
        }
        this.setState({ draft: newDraft }, this._focusDraftField);

        if (includeDraftInEntries) {
            entriesToSend.push(newDraft);
        }
        onValueChange(entriesToSend);
    };

    /**
    * Toggle the open state of the dropdown list
    * @private
    */
    _toggleList = () => this.setState(({ listOpen }) => ({ listOpen: !listOpen }));

    /**
    * Close the dropdown list
    * @private
    */
    _hideList = () => this.setState({ listOpen: false, highlightedOption: -1 });

    /**
    * Open the dropdown list
    * @private
    */
    _showList = () => this.setState({ listOpen: true });

    /**
    * When the user clicks, toggle the list
    * @private
    */
    _handleClick = e => {
        this._toggleList();
        e.stopPropagation();
    };

    /**
    * Return the input box element so the popper can attach to it
    * @private
    */
    _getTrigger = () => this.inputBox;

    /**
    * When the user clicks the dropdown list item, add that entry
    * @private
    */
    _handleChooseOption = this._addInputValue;

    /**
    * Apply the filter to options
    * @private
    */
    _getFilteredOptions = () => {
        const { options, entries } = this.props;
        const { draft } = this.state;

        return options
            ? options.filter(
                ({ value, label = value }) => (containsString(label, draft) && !entries.includes(value))
            )
            : [];
    };

    render() {
        const {
            autoFocus,
            autoHeight,
            autoWidth,
            className: classNameProp,
            errorMessage,
            label,
            labelText,
            name,
            options,
            onValueChange,
            required,
            stacked,
            width,
        } = this.props;

        const {
            activeEntry,
            focused,
            highlightedOption,
            listOpen,
        } = this.state;

        const entries = this._getCommittedEntries();
        const draft = this._getDraft();

        const className = classnames(
            classNameProp,
            "input-multivalues",
            width !== undefined ? getInputWidthClass({
                width,
            }) : "",
            {
                required: required && entries.length === 0,
                "value-entered": (entries.length !== 0),
                stacked: stacked,
                "input-multivalues--focused": focused,
                "input-multivalues--auto-width": autoWidth,
            }
        );

        const entryClassNames = classnames(
            "entries",
            {
                "entries--error": errorMessage,
                "entries--auto-height": autoHeight,
            }
        );

        const entryNodes = _.map(entries, (entryValue, index) => {
            const entry = options
                ? options.find(option => option.value === entryValue)
                : entryValue;

            if (!entry) {
                return null;
            }

            return (
                <MultivaluesOption
                    id={index}
                    label={entry.label || entry.value || entry}
                    onChange={onValueChange}
                    onEdit={this._onEntryEditStarted}
                    onDelete = {this._handleDelete}
                    key={index}
                    iconName={entry.icon}
                    active={index === activeEntry}
                    canEdit={_.isEmpty(options)}
                />
            );
        });

        const filteredOptions = this._getFilteredOptions();

        return (
            <FormLabel
                value={labelText || label}
                className={className}
                data-id={this.props["data-id"]}
                description={this.props.description}
            >
                <div className={entryClassNames} data-id="entries" ref={el => this.inputBox = el}>
                    {entryNodes}
                    <div className="value-input">
                        <div className="value-input__wrapper">
                            <input
                                data-id="value-entry"
                                className="value-input__input"
                                ref={(ref) => this._draftInputRef = ref}
                                type="text"
                                tabIndex="0"
                                name={name}
                                onBlur={this._handleBlur}
                                onChange={this._handleChange}
                                onClick={this._handleClick}
                                onKeyDown={this._handleKeyDown}
                                onMouseDown={dontPropagate}
                                autoFocus={autoFocus}
                                onFocus={this._handleFocus}
                                value={draft}
                                autoComplete="off"
                            />
                        </div>
                        <div className="value-input__hidden">{draft}</div>
                    </div>
                </div>
                {filteredOptions && (filteredOptions.length > 0) && (listOpen) && (
                    <PopperContainer
                        data-id="multivalue-options-container"
                        data-parent={this.props["data-id"]}
                        key={`popper-${entries.length}-${draft}`}
                        className="input-multivalues__popper"
                        getReference={this._getTrigger}
                        matchWidth
                        noGPUAcceleration
                        placement="bottom-start"
                    >
                        <OptionList
                            data-id="multivalue-options"
                            options={this._getFilteredOptions()}
                            className="option-list--popover"
                            onValueChange={this._handleChooseOption}
                            highlightedIndex={highlightedOption}
                        />
                    </PopperContainer>
                )}
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

const Multivalues = withFocusOutline(MultivaluesBase);

Multivalues.inputWidths = InputWidths;

export default Multivalues;
