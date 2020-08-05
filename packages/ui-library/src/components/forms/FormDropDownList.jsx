import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

import FormLabel from "./FormLabel";
import { FormTextFieldStateless } from "./form-text-field/index";
import HelpHint from "../tooltips/HelpHint";
import { InputWidths, InputWidthProptypes, getInputWidthClass } from "./InputWidths";

import Icon from "../general/Icon";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
import classnames from "classnames";
import { filterFieldContains } from "../../util/FilterUtils.js";
import {
    isArrowDown,
    isArrowUp,
    isEnter,
    isEsc,
    isSpace,
    isTab
} from "../../util/KeyboardUtils.js";
import Utils from "../../util/Utils.js";
import _ from "underscore";

import PopperContainer from "../tooltips/PopperContainer";
import PopperContainerContext from "../tooltips/PopperContainerContext";
import { inStateContainer, toggleTransform } from "../utils/StateContainer";
import { deprecatedStatelessProp } from "../../util/DeprecationUtils";
import { defaultRender } from "../../util/PropUtils";
/**
* @function FormDropDownList~filterOptions
* @desc Filters the given list of options with the filter string
*
* @param {array<FormDropDownList~option>} options
*    The array of options to filter
* @param {string} filterString
*    The string to use to filter the options
*
* @return {array<FormDropDownList~option>}
*    Returns the list of filtered options
*/
const filterOptions = (options, filterString) => options.filter(filterFieldContains.bind(null, "label", filterString));

/**
 * @enum {string}
 * @alias FormDropDownList.SearchTypes
 */
const SearchTypes = {
    KEYBOARD: "keyboard",
    BOX: "box"
};

/**
* @callback FormDropDownList~onToggle
*/

/**
* @callback FormDropDownList~onFocus
 * @param {Event} event
 *      Synthetic React focus event
*/

/**
* @callback FormDropDownList~onBlur
 * @param {Event} event
 *      Synthetic React blur event
*/

/**
* @callback FormDropDownList~onSearch
*
* @param {string} searchString
*    The text to search with.
* @param {number} searchTime
*    The time after which to clear the search when the user delays their search.
*    Not applicable when searchType = BOX.
* @param {number} searchIndex
*    The index of the option that was just searched.
*    Not applicable when searchType = BOX.
*/

/**
* @callback FormDropDownList~onValueChange
*
* @param {FormDropDownList~option} option
*    The newly selected list option.
*/

/**
* @callback FormDropDownList~onAdd
*
* @param {string} label
*    The label for the new option to be added.
*/

/**
* @typedef FormDropDownList~option
* @desc A single list option. Must contain a label and value.
*    If groups is enabled, can pass a group id if option should be part of a group.
*    Additional properties will be passed to the contentType as props.
*
* @property {string} label
*     The label of the option.
* @property {string} value
*     The value of the option.
* @property {string|number} [group]
*     The id of the group the option belongs to.
* @property {string} helpHintText
*     The help text to display in a tooltip when hovering over an option
*/

/**
* @typedef FormDropDownList~group
* @desc A single group section.
*
* @property {string|number} id
*     The id of the group.
* @property {string} label
*     The label of the group.
* @property {boolean} disabled
*     Whether or not this group should be disabled.
*/

/**
* @class FormDropDownList
* @desc A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement.
*       The array of options will insure display order of options. Has tabbing, up/down key, and search support.
*
* @param {string} [data-id="form-drop-down-list"]
*    To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*    CSS classes to set on the top-level HTML container.
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
* @param {string} [iconName]
*     adds an icon to the option
* @param {string} [label]
*     The text to display as the field's label.
* @param {node} [description]
*     Description to display below the label.
* @param {string} [name]
*     The name attribute for the input.
* @param {array<FormDropDownList~option>} options
*    Array of options for the dropdown list. Each option should have a label and value,
*    but value is required and label is not. If no label is passed in Value will take the place of label.
*    Additional properties of the option object will be passed as props to the contentType.
* @param {FormDropDownList~option} selectedOption
*    The selected list option.
* @param {FormDropDownList~onValueChange} [onValueChange]
*    Callback to be triggered when an option is selected.
*
* @param {element} [contentType=FormDropDownListDefaultContent]
*    A custom element representing the contents of each option.
*
* @param {array<FormDropDownList~group>} [groups]
*    Array of group sections for the dropdown list. If specified, will enable grouping of options.
*    Order of the groups is preserved in the dropdown list, and the order of options in each group
*    will be preserved with the order in which they were specified in the options prop.
*
* @param {boolean} [open=false]
*    State of the open/closed dropdown menu.
* @param {FormDropDownList~onToggle} [onToggle]
*    Callback to be triggered when the open/closed state changes.
*
* @param {string} [labelAdd]
*    The label for the add new option preview prompt.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [labelPrompt]
*    The label for the prompt displayed when using BOX searchType.
* @param {string} [name]
*     The name attribute for the input.
* @param {string} [noneOptionLabelClassName]
*    CSS classes to set on the label for the none option.
* @param {string} [placeholder]
*    Placeholder string for the input
* @param {string} [searchField="label"]
*    The field value to use in the search.
* @param {number} [searchIndex=-1]
*    The index of the option that was just searched. Allows for highlighting and up/down arrow movement.
*    When not provided, the component will manage this value.
* @param {string} [searchString=""]
*    Value to help with finding an option on keydown.
*    When not provided, the component will manage this value.
* @param {number} [searchTime=0]
*    Time to help clear the search when the user delays their search.
*    When not provided, the component will manage this value.
* @param {string} [selectClassName]
*    CSS classes to set on the select.
* @param {string} [selectedOptionLabelClassName]
*    CSS classes to set on the selected list option label.
* @param {string} [title=""]
*    The tooltip title to give the selected option.
* @param {string} [validSearchCharsRegex=/[^a-zA-Z\d\s]+/]
*    A regex of the valid characters for the search. Allows alphanumeric and whitespace by default.
* @param {InputWidths} [width]
*    Specifies the width of the input.
*
* @param {array<FormDropDownList~option>} options
*    Array of options for the dropdown list. Each option should have a label and value.
*    Additional properties of the option object will be passed as props to the contentType.
* @param {FormDropDownList~option} selectedOption
*    The selected list option.
* @param {FormDropDownList~onValueChange} [onValueChange]
*    Callback to be triggered when an option is selected.
* @param {boolean} [autofocus=false]
*    Whether or not this field should autofocus.
* @param {boolean} [canAdd=false]
*    Whether or not adding new options to the list is enabled.
*    Will override searchType to use BOX type searching when true.
* @param {boolean} [disabled=false]
*     If true, the select element will be disabled.
* @param {boolean} [open=false]
*    State of the open/closed dropdown menu.
*    When not provided, the component will manage this value.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [showSelectedOptionLabel=true]
*    Whether or not to display the label text for the selected option.
* @param {FormDropDownList.onAdd} [onAdd]
*    Callback to be triggered when a new option is to be added to the list.
* @param {FormDropDownList~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of an option when the list dropdown is expanded changes.
* @param {FormDropDownList~onBlur} [onBlur]
*    Callback to be triggered when search input looses focus
* @param {FormDropDownList~onFocus} [onFocus]
*    Callback to be triggered when search input gets focus
* @param {FormDropDownList~onToggle} [onToggle]
*    Callback to be triggered when the open/closed state changes.
* @param {array<FormDropDownList~group>} [groups]
*    Array of group sections for the dropdown list. If specified, will enable grouping of options.
*    Order of the groups is preserved in the dropdown list, and the order of options in each group
*    will be preserved with the order in which they were specified in the options prop.
* @param {FormDropDownList~option} [noneOption]
*    If specified, adds an option which does not count as a selection (e.g., "select an option").
*    This option will be shown at the top of the dropdown list.
*    The object should specify the label of the none option.
* @param {FormDropDownList.SearchTypes} [searchType="KEYBOARD"]
*    The type of search to use with the dropdown list.
*    If the "add" prop is set to true, will override to use BOX type of searching.
*
* @param {element} [contentType=FormDropDownListDefaultContent]
*    A custom element representing the contents of each option.
*
* @param {FormSearchBox~renderList} [renderList]
*     Renders a custom list
* @param {FormSearchBox~renderInput} [onClear]
*     Rende function for the input
*/

/**
* @class FormDropDownListDefaultContent
* @desc A simple default content type for the FormDropDownList that just renders the label of each option.
* @memberof FormDropDownList
*
* @param {string} label
*    The label to render.
* @param {string} value
*    The value to render if label is not provided. This value is required.
*/
class FormDropDownListDefaultContent extends React.Component {
    static propTypes = {
        label: PropTypes.string,
        value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]).isRequired
    };

    static defaultProps = {
        value: "",
    };

    render() {
        return <span>{this.props.label ? this.props.label : this.props.value}</span>;
    }
}

class OptionItem extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        content: PropTypes.node,
        iconName: PropTypes.string,
        onClick: PropTypes.func,
        option: PropTypes.object,
        iconPlaceholder: PropTypes.bool,
    };

    static defaultProps = {
        content: null
    };

    _handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.option, event);
        }
    };

    _renderContent = () => {
        const content = this.props.iconName
            ? (
                <div>
                    <Icon
                        iconName={this.props.iconName}
                        className="select-option__icon"
                        type="leading"
                    >
                        {this.props.content}
                    </Icon>
                </div>
            )
            : <div>{this.props.content}</div>;
        if (this.props.option.helpHintText) {
            return (
                <HelpHint
                    data-id={this.props["data-id"] + "-helphint"}
                    delayHide={0}
                    placement="right"
                    hintText={this.props.option.helpHintText}>
                    {content}
                </HelpHint>
            );
        } else {
            return content;
        }
    };

    render() {
        const className = {
            "help-hint-option": this.props.option.helpHintText,
            "select-option__placeholder": this.props.iconPlaceholder && this.props.iconName === undefined
        };
        return (
            <li
                data-id={this.props["data-id"]}
                className={classnames(this.props.className, className)}
                onClick={this._handleClick}>
                {this._renderContent()}
            </li>
        );
    }
}

class FormDropDownListStateless extends React.Component {
    static displayName = "FormDropDownListStateless";

    static propTypes = {
        autofocus: PropTypes.bool,
        canAdd: PropTypes.bool,
        className: PropTypes.string,
        contentType: PropTypes.element,
        "data-id": PropTypes.string,
        disabled: PropTypes.bool,
        errorMessage: PropTypes.string,
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string,
                disabled: PropTypes.bool
            })
        ),
        helpClassName: PropTypes.string,
        label: PropTypes.node,
        description: PropTypes.node,
        labelAdd: PropTypes.string,
        labelHelpText: PropTypes.string,
        labelPrompt: PropTypes.string,
        name: PropTypes.string,
        noneOption: PropTypes.object,
        noneOptionLabelClassName: PropTypes.string,
        onValueChange: PropTypes.func,
        onFocus: PropTypes.func,
        onBlur: PropTypes.func,
        open: PropTypes.bool,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                value: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.number
                ]).isRequired
            })
        ),
        onSearch: PropTypes.func,
        setSearchIndex: PropTypes.func,
        setSearchString: PropTypes.func,
        setSearchTime: PropTypes.func,
        onToggle: PropTypes.func,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        searchField: PropTypes.string,
        searchIndex: PropTypes.number,
        searchString: PropTypes.string,
        searchTime: PropTypes.number,
        searchType: PropTypes.oneOf([SearchTypes.KEYBOARD, SearchTypes.BOX]),
        selectClassName: PropTypes.string,
        selectedOption: PropTypes.object,
        selectedOptionLabelClassName: PropTypes.string,
        title: PropTypes.string,
        validSearchCharsRegex: PropTypes.string,
        width: PropTypes.oneOf(InputWidthProptypes),
        renderInput: PropTypes.func,
        renderList: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "form-drop-down-list",
        onValueChange: _.noop,
        contentType: <FormDropDownListDefaultContent />,
        open: false,
        onToggle: _.noop,
        onFocus: _.noop,
        onBlur: _.noop,
        canAdd: false,
        searchString: "",
        searchField: "label",
        validSearchCharsRegex: "/[^a-zA-Z\d\s]+/",
        searchIndex: -1,
        searchTime: 0,
        searchType: SearchTypes.KEYBOARD,
        onSearch: _.noop,
        setSearchIndex: _.noop,
        setSearchString: _.noop,
        setSearchTime: _.noop,
        title: "",
        showSelectedOptionLabel: true,
        required: false,
        disabled: false,
        autofocus: false,
        renderInput: defaultRender,
        renderList: defaultRender,
    };
    didPressKey = false;
    inlineMenuStyle = Utils.isIE() ? { border: "none" } : {};

    constructor(props) {
        super(props);
        this._setupGroups(props);
    }

    _getOptionLabel = ({ label, value }) => {
        if (label !== null && label !== undefined) {
            return label;
        } else {
            return value;
        }
    }

    _getLabelOptions = (options) => {
        return _.map(options, (option) => {
            return {
                ...option,
                label: this._getOptionLabel(option),

            };
        });
    }

    componentDidUpdate() {
        this._setSearchListPosition(this.props.options);
    }

    componentDidMount() {
        window.addEventListener("click", this._handleGlobalClick);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this._handleGlobalClick);
    }

    // Moving complexity of the stateful version's _handleSearch behavior here
    _onSearchProxy = (search, time, index) => {
        this.props.onSearch(search, time, index);

        this.props.setSearchString(search);
        this.props.setSearchTime(time);
        this.props.setSearchIndex(index);
    };

    _filteredOptions = () => {
        return (this.props.canAdd || this.props.searchType === SearchTypes.BOX)
            ? filterOptions(this._getLabelOptions(this.props.options), this.props.searchString)
            : this._getLabelOptions(this.props.options);
    }

    // Moving complexity of the stateful version's _handleToggle behavior here
    _onToggleProxy = () => {
        this.props.onToggle();
        this.props.setSearchIndex(
            this._orderedOptions.findIndex(o =>
                this.props.selectedOption && this.props.selectedOption.value === o.value)
        );
        this.props.setSearchTime(-1);
    };

    _setupGroups = ({ groups }) => {
        if (groups) {
            // Groups by id
            this._groupById = {};
            groups.forEach((group) => {
                this._groupById[group.id] = group;
            });

            // Sort all options into groups
            var groupedOptions = {};
            this._filteredOptions().forEach(function (option) {
                if (groupedOptions[option.group || "undefined"]) {
                    groupedOptions[option.group || "undefined"].push(option);
                } else {
                    groupedOptions[option.group || "undefined"] = [option];
                }
            });

            // Order options: undefined first then all other groups
            // in the same group/options order specified in groups/options props
            this._orderedOptions = [];
            if (groupedOptions["undefined"]) {
                this._orderedOptions = this._orderedOptions.concat(groupedOptions["undefined"]);
            }
            groups.forEach((groupItem) => {
                if (groupedOptions[groupItem.id]) {
                    this._orderedOptions = this._orderedOptions.concat(groupedOptions[groupItem.id]);
                }
            });
        } else {
            this._orderedOptions = this.props.options;
        }
    };

    /**
    * Toggle the select list if a mouse click happens outside of the select list area
    * and if the select list is open.
    *
    * @param {object} e
    *    The ReactJS synthetic event object.
    *
    * @private
    * @ignore
    */
    _handleGlobalClick = (e) => {
        // if the click event isn't the click that opened the list
        if (this.props.open && this._clickEvent !== e) {
            const picker = ReactDOM.findDOMNode(this.refs["input-container"]);

            //dont close the list if the click is on the select
            callIfOutsideOfContainer(picker, this._closeList, e);
        }
    };

    _closeList = () => {
        this._onToggleProxy();
        this._onSearchProxy("", 0, 0);
    };

    _getOrderedOptionsIndex = option => (
        this.props.groups && option
            ? this._orderedOptions.findIndex(({ value }) => value === option.value)
            : -1
    );

    _isBoxSearch = () => this.props.canAdd || this.props.searchType === SearchTypes.BOX;

    _isKeyboardSearch = () => !this.props.canAdd && this.props.searchType === SearchTypes.KEYBOARD;

    _isPromptVisible = () => {
        if (!this._isBoxSearch() || this.props.searchString === "" || !this.props.canAdd) {
            return false;
        } else {
            const cleanSearch = this.props.searchString.toLowerCase().trim();
            return this._getLabelOptions(this.props.options).some(({
                label
            }) => label.toLowerCase().trim() === cleanSearch)
                ? false
                : true;
        }
    }

    _getPrompt = () => {
        if (this._isBoxSearch()) {
            const className = "select-prompt",
                searchClassName = classnames(className, "select-search-prompt"),
                addClassName = classnames(
                    className,
                    "select-add",
                    { highlighted: this._filteredOptions().length === 0 || this.props.searchIndex === 0 },
                );

            if (this.props.searchString === "") {
                return <li data-id="search-prompt" className={searchClassName}>{this.props.labelPrompt}</li>;
            } else if (this.props.canAdd) {
                const cleanSearch = this.props.searchString.toLowerCase().trim();
                // Cannot add if duplicate
                return this._getLabelOptions(this.props.options).some(({
                    label
                }) => label.toLowerCase().trim() === cleanSearch)
                    ? null
                    : (
                        <li data-id="add-prompt" className={addClassName} onClick={this._handleAddClick}>
                            {
                                this.props.labelAdd !== undefined ? (
                                    <span className="label">{this.props.labelAdd}</span>
                                ) : null
                            }
                            <span>{this.props.searchString}</span>
                        </li>
                    );
            }
        }
    };

    _handleInputValueChange = (searchString) => {
        if (!this.props.open) {
            this._onToggleProxy();
        }
        this._onSearchProxy(searchString, 0, 0);
    };

    _handleAdd = () => {
        this.props.onAdd(this.props.searchString);
    };

    _handleAddClick = () => {
        this._handleAdd();
        this._onSearchProxy("", 0, this.props.noneOption ? -1 : 0);
        this._onToggleProxy();
    }

    /**
     * On key press open/close list or try and auto find the option that matches the characters typed on a starts with.
     * Doesn't reduce the list, but just goes to.
     *
     * NOTE: This function is not i18n friendly and would need to be updated to support that.
     *       The Unicode character (ASCII excluded) can not be generated by the non-input element
     *       When typing a unicode character the user have to use a unicode processing program but
     *       it does not support in <div> element.
     *       So if UI-Library is set to non-ascii language, user can not search Unicode item.
     *
     * @param {object} e
     *    The ReactJS synthetic event object.
     *
     * @private
     * @ignore
     */
    _handleKeyDown = (e) => {
        this.didPressKey = true;
        const { keyCode } = e;
        const {
            canAdd,
            groups,
            noneOption,
            onValueChange,
            open,
            searchField,
            searchIndex,
            searchString,
            searchTime,
            validSearchCharsRegex
        } = this.props;

        if (isArrowUp(keyCode) || isArrowDown(keyCode)) {
            this._handleUpDownKeys(e);
            return;
        }

        if (!open) {
            if (isEnter(keyCode) || isSpace(keyCode)) {
                e.preventDefault();
                this._onToggleProxy();
            }
            return;
        }

        if (isEnter(keyCode)) { // Enter, so pull previously entered search string
            const hasPrompt = this._isPromptVisible();
            const isItemSelected = (
                (!canAdd && searchIndex >= 0) ||
                (hasPrompt && searchIndex > 0) ||
                (!hasPrompt && canAdd && searchIndex >= 0)
            );
            const isPromptSelected = (
                hasPrompt &&
                canAdd &&
                (searchIndex === 0 || (searchIndex === -1 && searchString !== ""))
            );

            if (isPromptSelected && (searchString !== "" || noneOption)) { // Add the new option
                this._handleAdd();
            } else if (!isPromptSelected && isItemSelected) { // Select the current option
                if (groups) {
                    const option = this._orderedOptions[
                        hasPrompt ? searchIndex - 1 : searchIndex
                    ];

                    if (option.disabled) {
                        // option itself is disabled; ignoring;
                    } else if (option.group &&
                        this._groupById[option.group] && this._groupById[option.group].disabled) {
                        // option's parent group is disabled; ignoring;
                    } else {
                        onValueChange(option);
                    }
                } else {
                    const option = this._filteredOptions()[
                        hasPrompt ? searchIndex - 1 : searchIndex
                    ];
                    if (!option.disabled) {
                        onValueChange(option);
                    }
                }
            } else if (searchIndex === -1 && noneOption) {
                onValueChange(noneOption);
            }

            // Reset dropdown
            this._onSearchProxy("", 0, noneOption ? -1 : 0);
            this._onToggleProxy();
        } else if (isTab(keyCode)) {
            this._onToggleProxy();
        } else if (isEsc(keyCode)) { // ESC, so clear
            this._onSearchProxy("", 0, noneOption ? -1 : 0);
            this._onToggleProxy();
        } else if (this._isKeyboardSearch()) { // Regex specifies valid characters, not i18n friendly right now
            if (String.fromCharCode(keyCode).toLowerCase().search(validSearchCharsRegex) < 0) {
                const char = String.fromCharCode(keyCode).toLowerCase();
                const time = Date.now();

                const search = searchTime > 0 && (time - searchTime) < 1000
                    ? searchString + char
                    : char;

                const labeledOptions = this._getLabelOptions(this.props.options);
                const option =
                    labeledOptions.find(o =>
                        o[searchField].toLowerCase().indexOf(search) === 0);
                const index = groups
                    ? this._getOrderedOptionsIndex(option)
                    : labeledOptions.indexOf(option);
                // again, not i18n friendly
                this._onSearchProxy(option ? search : "", Date.now(), index);
            } else if (searchString) { // invalid character entered
                this._onSearchProxy("", Date.now(), noneOption ? -1 : 0);
            }
        }
    };

    /**
     * When Up or Down keys are pressed, increment/decrement the searchIndex accordingly
     * and call this.props.onSearch if list is open. Otherwise, toggle the list to open.
     *
     * @param {object} e
     *    The ReactJS synthetic event object.
     *
     * @private
     * @ignore
     */
    _handleUpDownKeys = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const { keyCode } = e;

        if (this.props.open) {
            const {
                noneOption,
                options,
                searchIndex,
                searchString
            } = this.props;

            if (isArrowUp(keyCode)) {
                const lowest = noneOption ? -1 : 0;
                const index = (searchIndex - 1 >= -1) && (searchIndex > lowest) ? searchIndex - 1 : lowest;
                this._onSearchProxy(searchString, 0, index);
            }
            else { // down arrow
                const lastIndex = options.length - 1;
                const index = searchIndex + 1 <= lastIndex ? searchIndex + 1 : lastIndex;
                this._onSearchProxy(searchString, 0, index);
            }
        } else if (!this.props.disabled) {
            this._onToggleProxy();
        }
    };

    /**
     * Centers the search list on last searched item. Called on componentDidUpdate.
     *
     * @private
     * @ignore
     */
    _setSearchListPosition = () => {
        if (!this.props.open) {
            return;
        }
        const { searchIndex: index, options } = this.props,
            option = options[index],
            selectList = ReactDOM.findDOMNode(this.refs["selectList"]),
            selectListTarget= option ? "option-" + index : (this.props.noneOption
                ? "none-option" : "option-0"),
            selectListItem = ReactDOM.findDOMNode(this.refs[selectListTarget]);

        selectList.scrollTop = selectListItem ? (selectListItem.offsetTop - 50) : 0;

    };

    _handleToggle = (e) => {
        if (!this.props.disabled) {
            // store a reference to this event so that we dont open and then close the list when the
            // global click event listener gets triggered.
            this._clickEvent = e.nativeEvent;
            this._onToggleProxy();
        }
    };

    _handleOptionClick = (item, e) => {
        e.preventDefault(); // TODO: remove after refactor of DOM
        this.props.onValueChange(item);
        this._onToggleProxy();
    };

    _getGroupSeparator = (index) => <div key={"group-separator" + index} className="group-separator" />;
    _getSingleGroupHeader = ({ disabled, id, label }) => (
        <li
            key={"select-group-" + id}
            ref={"select-group-" + id}
            data-id={"select-group-" + id}
            className={classnames("select-group", { disabled })}>
            {label}
        </li>
    );

    _getSingleOption = hasIcon => (option, i) => {
        const hasPrompt = this._isPromptVisible();

        const index = hasPrompt ? i + 1 : i;
        const group = this.props.groups && this._groupById[option.group],
            disabled = (group && group.disabled) || option.disabled,
            className = classnames("select-option", {
                highlighted: !disabled && index === this.props.searchIndex,
                selected: option.value === (this.props.selectedOption && this.props.selectedOption.value),
                disabled: disabled
            });

        return (
            <OptionItem
                key={`option-${option.label}-${option.value}`} // add prop allows re-ordering, so must have unique key
                ref={"option-" + index}
                data-id={"option_" + option.value}
                className={className}
                onClick={!disabled ? this._handleOptionClick : _.noop}
                option={option}
                content={React.cloneElement(this.props.contentType, option)}
                iconName={option.iconName}
                iconPlaceholder={hasIcon}
            />
        );
    };

    _getNoneOption = () => {
        const noneOptionContainerClassName = classnames("none-option", {
                highlighted: this.props.searchIndex === -1,
                selected: this.props.selectedOption.label === this.props.noneOption.label
            }),
            content = (
                <span className={this.props.noneOptionLabelClassName}>
                    {this.props.noneOption.label}
                </span>
            );

        return (
            <OptionItem
                key="none-option"
                data-id="none-option"
                ref="none-option"
                className={noneOptionContainerClassName}
                onClick={this._handleOptionClick}
                option={this.props.noneOption}
                content={content}
            />
        );
    };

    _getGroupedOptions = (hasIcon) =>
        this._orderedOptions.reduce(({ lastGroup, opts }, { group, ...opt }, index) => ({
            lastGroup: group,
            opts: [
                ...opts,
                ...(group && group !== lastGroup)
                    ? [this._getGroupSeparator(index), this._getSingleGroupHeader(this._groupById[group])]
                    : [],
                this._getSingleOption(hasIcon)({ group, ...opt }, index)
            ]
        }), { lastGroup: null, opts: [] }).opts;

    _generateOptions = (hasIcon) => (
        [
            ...this.props.noneOption && !this.props.searchString ? [this._getNoneOption()] : [],
            ...this.props.groups
                ? this._getGroupedOptions(hasIcon)
                : this._filteredOptions().map(this._getSingleOption(hasIcon))
        ]
    )

    _getSelectedOptionLabel = () => {
        if (this.props.showSelectedOptionLabel && this.props.selectedOption) {
            return this._getOptionLabel(this.props.selectedOption);
        }
    }

    _getReference = () => this.reference;

    _getLongestString = () => {
        const arr = this._getLabelOptions(this.props.options);

        return arr.reduce((longest, option) => {
            return option.label.length >= longest.length ? option.label : longest;
        }, "");
    }

    render() {
        this._setupGroups(this.props);
        if (this.didPressKey && !this.props.open) {
            this.didPressKey = false;
        }
        const hasIcon = this.props.options.some((option) => option.iconName);
        const containerClassName = classnames(
                "input-custom-select",
                "input-select",
                this.props.className,
                getInputWidthClass({
                    width: this.props.width,
                    className: this.props.className,
                    defaultClass: InputWidths.AUTO
                }),
                {
                    open: this.props.open,
                    "form-error": this.props.errorMessage,
                    "value-entered": this.props.selectedOption &&
                    (!this.props.noneOption || this.props.noneOption.label !== this.props.selectedOption.label),
                    required: this.props.required,
                    disabled: this.props.disabled,
                }),
            selectClassName = classnames("selected-option", this.props.selectClassName),
            selectedOptionLabelClassName = classnames(
                "selected-option-label",
                this.props.selectedOptionLabelClassName,
                {
                    "selected-option-label--icon-padding": this.props.selectedOption &&
                    this.props.selectedOption.iconName
                }
            ),
            selectedOptionLabel = this._getSelectedOptionLabel(),
            inputValue = this._isBoxSearch() &&
                this.didPressKey && this.props.open ? this.props.searchString : selectedOptionLabel;


        return (
            <FormLabel
                value={this.props.label}
                description={this.props.description}
                data-id={this.props["data-id"]}
                ref="form-drop-down-list"
                className={containerClassName}
                hint={this.props.labelHelpText}>
                <div className="input-container" ref="input-container">
                    <div className="wrapper">
                        <div
                            data-id="selected-option"
                            ref="selected-option"
                            onClick={this._handleToggle}
                            onKeyDown={this._handleKeyDown}
                            className={selectClassName}
                            title={this.props.title}>
                            {
                                <span className="wrapper__spacer">{this._getLongestString()}</span>
                                // for auto-sized dropdowns, it pushes out the width of the input
                            }
                            {
                                this.props.renderInput({
                                    "data-id": "selected-input",
                                    disabled: this.props.disabled,
                                    inputClassName: selectedOptionLabelClassName,
                                    helpClassName: this.props.helpClassName,
                                    errorMessage: this.props.errorMessage,
                                    autoFocus: this.props.autofocus,
                                    selectOnFocus: this._isBoxSearch(),
                                    onFocus: this.props.onFocus,
                                    onBlur: this.props.onBlur,
                                    value: inputValue,
                                    placeholder: this.props.placeholder,
                                    name: this.props.name,
                                    onValueChange: this._handleInputValueChange,
                                    iconLeft: this.props.selectedOption && this.props.selectedOption.iconName
                                        ? this.props.selectedOption.iconName
                                        : undefined,
                                    readOnly: this.props.disabled || this._isKeyboardSearch(),
                                    width: InputWidths.MAX ,
                                    ref: el => this.reference = el,
                                }, FormTextFieldStateless)
                            }

                            {!this.props.disabled && <div className="arrow" /> }
                        </div>
                        {this.props.open &&
                            <PopperContainer
                                data-parent={this.props["data-id"]}
                                data-id={this.props["data-id"]+"-dropdown"}
                                getReference={this._getReference}
                                className={containerClassName}
                                placement="bottom-start"
                                matchWidth
                                noGPUAcceleration
                                hasPopperParent={this.context}
                            >
                                {
                                    this.props.renderList({
                                        "data-id": "select-list",
                                        className: "select-list",
                                        ref: "selectList",
                                        style: this.inlineMenuStyle,
                                        children: [this._getPrompt(), this._generateOptions(hasIcon)],
                                    }, "ul"
                                    )
                                }

                            </PopperContainer>
                        }
                    </div>
                </div>
            </FormLabel>
        );
    }
}

FormDropDownListStateless.contextType = PopperContainerContext;

const DropDownList = inStateContainer([
    {
        name: "open",
        initial: false,
        callbacks: [{
            name: "onToggle",
            transform: toggleTransform,
        }],
    },
    {
        name: "searchIndex",
        initial: -1,
        setter: "setSearchIndex",
    },
    {
        name: "searchString",
        initial: "",
        setter: "setSearchString",
    },
    {
        name: "searchTime",
        initial: 0,
        setter: "setSearchTime",
    },
])(FormDropDownListStateless);

DropDownList.displayName = "FormDropDownList";

DropDownList.propTypes = {
    stateless: deprecatedStatelessProp,
};

DropDownList.SearchTypes = SearchTypes;
DropDownList.searchTypes = SearchTypes; // we agreed on a new naming standard, but I'm also preserving bw compat
DropDownList.filterOptions = filterOptions;
DropDownList._statelessComponent = FormDropDownListStateless;
DropDownList.optionFromValue = (options, fromValue) => options.find(({ value }) => (value === fromValue));

export default DropDownList;
