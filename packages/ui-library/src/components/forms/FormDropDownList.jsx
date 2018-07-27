import PropTypes from "prop-types";
import React from "react";
import ReactDOM from "react-dom";
import classnames from "classnames";
import _ from "underscore";
import FormLabel from "./FormLabel";
import { v2 as FormTextField } from "./form-text-field";
import HelpHint from "../tooltips/HelpHint";
import { callIfOutsideOfContainer } from "../../util/EventUtils.js";
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
*
* @desc A generic select (dropdown) component. Encapsulates common markup and designed to be a drop-in replacement.
*       The array of options will insure display order of options. Has tabbing, up/down key, and search support.
*
* @param {string} [data-id="form-drop-down-list"]
*    To define the base "data-id" value for the top-level HTML container.
* @param {string} [className]
*    CSS classes to set on the top-level HTML container.
* @param {string} [name]
*     The name attribute for the input.
* @param {boolean} [stateless=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {array<FormDropDownList~option>} options
*    Array of options for the dropdown list. Each option should have a label and value.
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
* @param {boolean} [canAdd=false]
*    Whether or not adding new options to the list is enabled.
*    Will override searchType to use BOX type searching when true.
* @param {FormDropDownList.onAdd} [onAdd]
*    Callback to be triggered when a new option is to be added to the list.
*
* @param {string} [placeholder]
*    Placeholder string for the input
* @param {string} [searchString=""]
*    Value to help with finding an option on keydown.
* @param {string} [searchField="label"]
*    The field value to use in the search.
* @param {string} [validSearchCharsRegex=/[^a-zA-Z\d\s]+/]
*    A regex of the valid characters for the search. Allows alphanumeric and whitespace by default.
* @param {number} [searchIndex=-1]
*    The index of the option that was just searched. Allows for highlighting and up/down arrow movement.
* @param {number} [searchTime=0]
*    Time to help clear the search when the user delays their search.
* @param {FormDropDownList.SearchTypes} [searchType="KEYBOARD"]
*    The type of search to use with the dropdown list.
*    If the "add" prop is set to true, will override to use BOX type of searching.
* @param {string} [labelPrompt]
*    The label for the prompt displayed when using BOX searchType.
* @param {FormDropDownList~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of an option when the list dropdown is expanded changes.
*
* @param {string} [selectClassName]
*    CSS classes to set on the select.
* @param {string} [selectedOptionLabelClassName]
*    CSS classes to set on the selected list option label.
* @param {string} [title=""]
*    The tooltip title to give the selected option.
* @param {boolean} [showSelectedOptionLabel=true]
*    Whether or not to display the label text for the selected option.
*
* @param {FormDropDownList~option} [noneOption]
*    If specified, adds an option which does not count as a selection (e.g., "select an option").
*    This option will be shown at the top of the dropdown list.
*    The object should specify the label of the none option.
* @param {string} [noneOptionLabelClassName]
*    CSS classes to set on the label for the none option.
*
* @param {string} [label]
*     The text to display as the field's label.
* @param {string} [labelHelpText]
*     The text to display for the help tooltip.
* @param {string} [helpClassName]
*     CSS classes to set on the HelpHint component.
*
* @param {string} [errorMessage]
*     The message to display if defined when external validation failed.
* @param {boolean} [required=false]
*     If true, the user must select a value for this field.
* @param {boolean} [disabled=false]
*     If true, the select element will be disabled.
* @param {bool} [autofocus=false]
*    Whether or not this field should autofocus.
*/

/**
* @class FormDropDownListDefaultContent
* @desc A simple default content type for the FormDropDownList that just renders the label of each option.
* @memberof FormDropDownList
*
* @param {string} label
*    The label to render.
*/
class FormDropDownListDefaultContent extends React.Component {
    static propTypes = {
        label: PropTypes.string
    };

    render() {
        return <div>{this.props.label}</div>;
    }
}

class OptionItem extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        className: PropTypes.string,
        onClick: PropTypes.func,
        content: PropTypes.node,
        option: PropTypes.object
    };

    _handleClick = (event) => {
        if (this.props.onClick) {
            this.props.onClick(this.props.option, event);
        }
    };

    _renderContent = () => {
        if (this.props.option.helpHintText) {
            return (
                <HelpHint
                    data-id={this.props["data-id"] + "-helphint"}
                    delayHide={0}
                    placement="right"
                    hintText={this.props.option.helpHintText}>
                        {this.props.content}
                </HelpHint>
            );
        } else {
            return this.props.content;
        }
    };

    render() {
        const className = {
            "help-hint-option": this.props.option.helpHintText
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
        "data-id": PropTypes.string,
        className: PropTypes.string,
        name: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object,
        onValueChange: PropTypes.func,
        contentType: PropTypes.element,
        groups: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string,
                disabled: PropTypes.bool
            })),
        open: PropTypes.bool,
        onToggle: PropTypes.func,
        labelPrompt: PropTypes.string,
        labelAdd: PropTypes.string,
        canAdd: PropTypes.bool,
        placeholder: PropTypes.string,
        searchString: PropTypes.string,
        searchField: PropTypes.string,
        validSearchCharsRegex: PropTypes.string,
        searchIndex: PropTypes.number,
        searchTime: PropTypes.number,
        searchType: PropTypes.oneOf([SearchTypes.KEYBOARD, SearchTypes.BOX]),
        onSearch: PropTypes.func,
        selectClassName: PropTypes.string,
        selectedOptionLabelClassName: PropTypes.string,
        title: PropTypes.string,
        noneOption: PropTypes.object,
        noneOptionLabelClassName: PropTypes.string,
        label: PropTypes.string,
        labelHelpText: PropTypes.string,
        helpClassName: PropTypes.string,
        errorMessage: PropTypes.string,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        autofocus: PropTypes.bool
    };

    static defaultProps = {
        "data-id": "form-drop-down-list",
        onValueChange: _.noop,
        contentType: <FormDropDownListDefaultContent />,
        open: false,
        onToggle: _.noop,
        canAdd: false,
        searchString: "",
        searchField: "label",
        validSearchCharsRegex: "/[^a-zA-Z\d\s]+/",
        searchIndex: -1,
        searchTime: 0,
        searchType: SearchTypes.KEYBOARD,
        selectedOption: {},
        onSearch: _.noop,
        title: "",
        showSelectedOptionLabel: true,
        required: false,
        disabled: false,
        autofocus: false,
    };

    didPressKey = false;
    inlineMenuStyle = Utils.isIE() ? { border: "none" } : {};

    constructor(props) {
        super(props);
        this._setupGroups(props);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.options, nextProps.options) || !_.isEqual(this.props.groups, nextProps.groups)) {
            this._setupGroups(nextProps);
        }
        if (this.props.open && !nextProps.open) {
            this.didPressKey = false;
        }
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

    _setupGroups = ({ groups, options }) => {
        if (groups) {
            // Groups by id
            this._groupById = {};
            groups.forEach((group) => {
                this._groupById[group.id] = group;
            });

            // Sort all options into groups
            var groupedOptions = {};
            options.forEach(function (option) {
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
        this.props.onToggle();
        this.props.onSearch("",0,0);
    };

    _getOrderedOptionsIndex = option => (
        this.props.groups && option
        ? this._orderedOptions.findIndex(({ value }) => value === option.value)
        : -1
    );

    _isBoxSearch = () => this.props.canAdd || this.props.searchType === SearchTypes.BOX;

    _isKeyboardSearch = () => !this.props.canAdd && this.props.searchType === SearchTypes.KEYBOARD;

    _getPrompt = () => {
        if (this._isBoxSearch()) {
            const className = "select-prompt",
                searchClassName = classnames(className, "select-search-prompt"),
                addClassName = classnames(className, "select-add", { highlighted: this.props.options.length === 0 });

            if (this.props.searchString === "") {
                return <li data-id="search-prompt" className={searchClassName}>{this.props.labelPrompt}</li>;
            } else if (this.props.canAdd) {
                const cleanSearch = this.props.searchString.toLowerCase().trim();
                // Cannot add if duplicate
                return this.props.options.some(({ label }) => label.toLowerCase().trim() === cleanSearch)
                    ? undefined
                    : (
                        <li data-id="add-prompt" className={addClassName} onClick={this._handleAdd}>
                        <span className="label">{this.props.labelAdd}</span>
                        <span>{this.props.searchString}</span>
                    </li>
                    );
            }
        }
    };

    _handleInputValueChange = (searchString) => {
        if (!this.props.open) {
            this.props.onToggle();
        }
        this.props.onSearch(searchString, 0, this.props.noneOption ? -1 : 0);
    };

    _handleAdd = () => {
        this.props.onAdd(this.props.searchString);
        this.props.onSearch("",0,this.props.noneOption ? -1 : 0);
        this.props.onToggle();
    };

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
            onSearch,
            onToggle,
            onValueChange,
            open,
            options,
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
                onToggle();
            }
            return;
        }

        if (isEnter(keyCode)) { //enter, so pull previously entered search string
            if (canAdd && options.length === 0) {
                if (searchString !== "" || noneOption) {
                    this._handleAdd();
                }
            } else if (searchIndex > -1) {
                if (groups) {
                    const option = this._orderedOptions[searchIndex];
                    if (!option.group ||
                        (this._groupById[option.group] && !this._groupById[option.group].disabled)) {
                        onValueChange(option);
                    }
                } else {
                    onValueChange(options[searchIndex]);
                }
            } else if (searchIndex === -1 && noneOption) {
                onValueChange(noneOption);
            }
            onSearch("", 0, noneOption ? -1 : 0);
            onToggle();
        } else if (isTab(keyCode)) {
            onToggle();
        } else if (isEsc(keyCode)) { // esc, so clear
            onSearch("", 0, noneOption ? -1 : 0);
            onToggle();
        } else if (this._isKeyboardSearch()) { // regex specifies valid characters, not i18n friendly right now
            e.preventDefault();
            e.stopPropagation();
            if (String.fromCharCode(keyCode).toLowerCase().search(validSearchCharsRegex) < 0) {
                const char = String.fromCharCode(keyCode).toLowerCase();
                const time = Date.now();

                const search = searchTime > 0 && (time - searchTime) < 1000
                    ? searchString + char
                    : char;

                const option =
                    options.find(o => o[searchField].toLowerCase().indexOf(search) === 0);
                const index = groups
                    ? this._getOrderedOptionsIndex(option)
                    : options.indexOf(option);
                    // again, not i18n friendly
                onSearch(option ? search : "", Date.now(), index);
            } else if (searchString) { // invalid character entered
                onSearch("", Date.now(), noneOption ? -1 : 0);
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
                onSearch,
                options,
                searchIndex,
                searchString
            } = this.props;

            if (isArrowUp(keyCode)) {
                const lowest = noneOption ? -1 : 0;
                const index = (searchIndex - 1 >= -1) && (searchIndex > lowest) ? searchIndex - 1 : lowest;
                onSearch(searchString, 0, index);
            }
            else { // down arrow
                const lastIndex = options.length - 1;
                const index = searchIndex + 1 <= lastIndex ? searchIndex + 1 : lastIndex;
                onSearch(searchString, 0, index);
            }
        } else if (!this.props.disabled) {
            this.props.onToggle();
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
            this.props.onToggle();
        }
    };

    _handleOptionClick = (item, e) => {
        e.preventDefault(); // TODO: remove after refactor of DOM

        this.props.onValueChange(item);
        this.props.onToggle();
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

    _getSingleOption = (option, index) => {
        const group = this.props.groups && this._groupById[option.group],
            disabled = group && group.disabled,
            className = classnames("select-option", {
                highlighted: !disabled && index === this.props.searchIndex,
                selected: option.value === this.props.selectedOption.value,
                disabled: disabled
            });

        return (
            <OptionItem
                key={"option-" + option.label} // add prop allows re-ordering, so must have unique key
                ref={"option-" + index}
                data-id={"option-" + index}
                className={className}
                onClick={!disabled ? this._handleOptionClick : _.noop}
                option={option}
                content={React.cloneElement(this.props.contentType, option)}
            />
        );
    };

    _getNoneOption = ({ value: selectedIndex } = {}) => {
        const noneOptionContainerClassName = classnames("none-option", {
                highlighted: this.props.searchIndex === -1,
                selected: !selectedIndex }),
            content = (
                <span className={this.props.noneOptionLabelClassName}>
                    {this.props.noneOption.label}
                </span>
            );

        return(
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

    _getGroupedOptions = () =>
        this._orderedOptions.reduce(({ lastGroup, opts }, { group, ...opt }, index) => ({
            lastGroup: group,
            opts: [
                ...opts,
                ...(group && group !== lastGroup)
                    ? [this._getGroupSeparator(index), this._getSingleGroupHeader(this._groupById[group])]
                    : [],
                this._getSingleOption({ group, ...opt }, index)
            ]
        }), { lastGroup: null, opts: [] }).opts;

    _generateOptions = () => (
        [
            ...this.props.noneOption && !this.props.searchString
                ? [this._getNoneOption(this.props.selectedOption)] : [],
            ...this.props.groups ? this._getGroupedOptions() : this.props.options.map(this._getSingleOption)
        ]
    )

    render() {
        const containerClassName = classnames("input-custom-select", "input-select", this.props.className, {
                open: this.props.open,
                "form-error": this.props.errorMessage,
                "value-entered": this.props.selectedOption &&
                    (!this.props.noneOption || this.props.noneOption.label !== this.props.selectedOption.label),
                required: this.props.required,
                disabled: this.props.disabled
            }),
            selectClassName = classnames("selected-option", this.props.selectClassName),
            selectedOptionLabelClassName = classnames("selected-option-label", this.props.selectedOptionLabelClassName),
            selectedOptionLabel = this.props.showSelectedOptionLabel ? this.props.selectedOption.label : "",
            inputValue = this._isBoxSearch() &&
                this.didPressKey && this.props.open ? this.props.searchString : selectedOptionLabel;

        return (
            <FormLabel
                value={this.props.label}
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

                            <FormTextField
                                data-id="selected-input"
                                disabled={this.props.disabled}
                                inputClassName={selectedOptionLabelClassName}
                                helpClassName={this.props.helpClassName}
                                errorMessage={this.props.errorMessage}
                                autoFocus={this.props.autofocus}
                                selectOnFocus={this._isBoxSearch()}
                                stateless={true}
                                value={inputValue}
                                placeholder={this.props.placeholder}
                                name={this.props.name}
                                onValueChange={this._handleInputValueChange}
                                readOnly={this.props.disabled || this._isKeyboardSearch()}
                            />
                            {!this.props.disabled && <div className="arrow" /> }
                        </div>
                        <ul
                            data-id="select-list"
                            className="select-list"
                            ref="selectList"
                            style={this.inlineMenuStyle}>
                            {this._getPrompt()}
                            {this._generateOptions()}
                        </ul>
                    </div>
                </div>
            </FormLabel>
        );
    }
}

class FormDropDownListStateful extends React.Component {
    static displayName = "FormDropDownListStateful";

    state = {
        open: this.props.open || false,
        searchIndex: -1,
        searchString: "",
        searchTime: 0,
        matchedOptions: this.props.options
    };

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.options, nextProps.options)) {
            this.setState({
                matchedOptions: nextProps.options
            });
        }
    }

    _handleToggle = () => {
        this.setState({
            open: !this.state.open,
            searchIndex: -1,
            searchTime: 0
        });
    };

    _handleSearch = (search, time, index) => {
        const matchedOptions =
            this.props.canAdd || this.props.searchType === SearchTypes.BOX
            ? (search === "" ? this.props.options : filterOptions(this.props.options, search))
            : this.state.matchedOptions;

        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index,
            matchedOptions
        });
    };

    render() {
        const props = _.defaults({
            ref: "FormDropDownListStateless",
            options: this.state.matchedOptions,
            open: this.state.open,
            onToggle: this._handleToggle,
            onSearch: this._handleSearch,
            searchIndex: this.state.searchIndex,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime
        }, this.props);

        return <FormDropDownListStateless {...props} />;
    }
}

class FormDropDownList extends React.Component {
    static displayName = "FormDropDownList";

    static propTypes = {
        stateless: PropTypes.bool
    };

    static defaultProps = {
        stateless: false
    };

    componentWillMount() {
        // TODO: figure out why Jest test was unable to detect the specific error, create tests for throws
        /* istanbul ignore if  */
        if (!Utils.isProduction() && this.props.controlled !== undefined) {
            /* istanbul ignore next  */
            throw new Error(Utils.deprecatePropError("controlled", "stateless"));
        }
    }

    render() {
        return (
            this.props.stateless
                ? <FormDropDownListStateless ref="FormDropDownListStateless" {...this.props} />
                : <FormDropDownListStateful ref="FormDropDownListStateful" {...this.props} />
        );
    }
}

FormDropDownList.SearchTypes = SearchTypes;
FormDropDownList.filterOptions = filterOptions;

export default FormDropDownList;
