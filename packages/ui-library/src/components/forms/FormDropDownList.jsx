var PropTypes = require("prop-types");
var React = require("react"),
    ReactDOM = require("react-dom"),
    FormLabel = require("./FormLabel.jsx"),
    FormTextField = require("./form-text-field").v2,
    HelpHint = require("../tooltips/HelpHint.jsx"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer,
    FilterUtils = require("../../util/FilterUtils.js"),
    KeyboardUtils = require("../../util/KeyboardUtils.js"),
    Utils = require("../../util/Utils.js"),
    classnames = require("classnames"),
    _ = require("underscore");

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
function filterOptions (options, filterString) {
    return options.filter(FilterUtils.filterFieldContains.bind(null, "label", filterString));
}

/**
 * @enum {string}
 * @alias FormDropDownList.SearchTypes
 */
var SearchTypes = {
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
        return (
            <li
                data-id={this.props["data-id"]}
                className={this.props.className}
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
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        selectedOption: PropTypes.object.isRequired,
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
        onSearch: _.noop,
        title: "",
        showSelectedOptionLabel: true,
        required: false,
        disabled: false,
        autofocus: false,
    };

    componentWillMount() {
        this.didPressKey = false;
        this.inlineMenuStyle = Utils.isIE() ? { border: "none" } : {};
        this._setupGroups(this.props.options, this.props.groups);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEqual(this.props.options, nextProps.options) || !_.isEqual(this.props.groups, nextProps.groups)) {
            this._setupGroups(nextProps.options, nextProps.groups);
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

    _setupGroups = (options, groups) => {
        if (groups) {
            // Groups by id
            this._groupById = {};
            groups.forEach(function (group) {
                this._groupById[group.id] = group;
            }.bind(this));

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
            groups.forEach(function (groupItem) {
                if (groupedOptions[groupItem.id]) {
                    this._orderedOptions = this._orderedOptions.concat(groupedOptions[groupItem.id]);
                }
            }.bind(this));
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
            var picker = ReactDOM.findDOMNode(this.refs["input-container"]);

            //dont close the list if the click is on the select
            callIfOutsideOfContainer(picker, this._closeList, e);
        }
    };

    _closeList = () => {
        this.props.onToggle();
        this.props.onSearch("",0,0);
    };

    _getOrderedOptionsIndex = (option) => {
        var index = -1;

        if (this.props.groups && option) {
            this._orderedOptions.forEach(function (opt, i) {
                if (opt.value === option.value) {
                    index = i;
                }
            });
        }
        return index;
    };

    _isBoxSearch = () => {
        return this.props.canAdd || this.props.searchType === SearchTypes.BOX;
    };

    _isKeyboardSearch = () => {
        return !this.props.canAdd && this.props.searchType === SearchTypes.KEYBOARD;
    };

    _getPrompt = () => {
        if (this._isBoxSearch()) {
            var className = "select-prompt",
                searchClassName = classnames(className, "select-search-prompt"),
                addClassName = classnames(className, "select-add", { highlighted: this.props.options.length === 0 });

            if (this.props.searchString === "") {
                return <li data-id="search-prompt" className={searchClassName}>{this.props.labelPrompt}</li>;
            } else if (this.props.canAdd) {
                // Cannot add if duplicate
                for (var i=0; i<this.props.options.length; i+=1) {
                    if (this.props.options[i].label.toLowerCase().trim() ===
                            this.props.searchString.toLowerCase().trim()) {
                        return;
                    }
                }
                return (
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
        if (this.props.open) { // only do search when select list expanded
            var search,
                time = Date.now();

            if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) { //enter, so pull previously entered search string
                if (this.props.canAdd && this.props.options.length === 0) {
                    if (this.props.searchString !== "" || this.props.noneOption) {
                        this._handleAdd();
                    }
                } else if (this.props.searchIndex > -1) {
                    if (this.props.groups) {
                        var option = this._orderedOptions[this.props.searchIndex];
                        if (!option.group ||
                            (this._groupById[option.group] && !this._groupById[option.group].disabled)) {
                            this.props.onValueChange(option);
                        }
                    } else {
                        this.props.onValueChange(this.props.options[this.props.searchIndex]);
                    }
                } else if (this.props.searchIndex === -1 && this.props.noneOption) {
                    this.props.onValueChange(this.props.noneOption);
                }
                this.props.onSearch("", 0, this.props.noneOption ? -1 : 0);
                this.props.onToggle();
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ESC) { // esc, so clear
                search = "";
                if (this._isBoxSearch()) {
                    this.props.onSearch("", 0, this.props.noneOption ? -1 : 0);
                }
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                this._handleUpDownKeys(e);
            } else if (e.keyCode === KeyboardUtils.KeyCodes.TAB) {
                this.props.onToggle();
            } else if (this._isKeyboardSearch() &&
                    String.fromCharCode(e.keyCode).search(this.props.validSearchCharsRegex) === -1) { // regex specifies valid characters, not i18n friendly right now
                search = String.fromCharCode(e.keyCode).toLowerCase();
                 // again, not i18n friendly
                if (this.props.searchTime !== 0 && (time - this.props.searchTime) < 1000) { // more than a second and reset search
                    search = this.props.searchString + search;
                }
            }
            if (this._isKeyboardSearch() && search !== undefined) { // invalid character entered
                if (search !== "") { // don't bother searching if empty
                    var option = _.find(this.props.options,
                        function (o) {
                            if (o[this.props.searchField].toLowerCase().indexOf(search) === 0) { //starts with
                                return o;
                            }
                        }.bind(this));
                    var index = this.props.groups
                        ? this._getOrderedOptionsIndex(option)
                        : this.props.options.indexOf(option);
                    if (!option) {
                        search = ""; //nonsense entered, not in options list
                    }
                }
                this.props.onSearch(search, time, index);
            }
        } else {
            if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                this._handleUpDownKeys(e);
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
        if (this.props.open) {
            var index = this.props.searchIndex;
            if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
                index = index - 1;
            }
            else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                index = index + 1;
            }
            //Dont allow index to go below the lowest or higher than the length of options
            var lowest = this.props.noneOption ? -1 : 0;
            if (index < lowest) {
                index = lowest;
            }
            else if (index >= this.props.options.length) {
                index = this.props.options.length -1;
            }
            this.props.onSearch(this.props.searchString, 0, index);
        } else if (!this.props.open && !this.props.disabled) {
            this.props.onToggle();
        }
        e.preventDefault();
        e.stopPropagation();
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
        var index = this.props.searchIndex,
            option = this.props.options[index],
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

    _getGroupSeparator = (index) => {
        return <div key={"group-separator" + index} className="group-separator" />;
    };

    _getSingleGroupHeader = (group) => {
        var className = classnames("select-group", { disabled: group.disabled });
        return (
            <li
                key={"select-group-" + group.id}
                ref={"select-group-" + group.id}
                data-id={"select-group-" + group.id}
                className={className}>
                {group.label}
            </li>
        );
    };

    _getSingleOption = (option, index) => {
        var group = this.props.groups && this._groupById[option.group],
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

    _getNoneOption = () => {
        var noneOptionContainerClassName = classnames("none-option", { highlighted: this.props.searchIndex === -1 }),
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

    _getGroupedOptions = () => {
        var options = [],
            lastGroup;

        this._orderedOptions.forEach(function (option, index) {
            if (lastGroup !== option.group) {
                lastGroup = option.group;
                options.push(this._getGroupSeparator(index));
                options.push(this._getSingleGroupHeader(this._groupById[option.group]));
            }
            return options.push(this._getSingleOption(option, index));
        }.bind(this));

        return options;
    };

    _generateOptions = () => {
        var options = [];

        // If noneOption exits, always at the top of the list
        if (this.props.noneOption && (!this.props.searchString || this.props.searchString === "" )) {
            options.push(this._getNoneOption());
        }
        // If groups, sort options by groups
        if (this.props.groups) {
            options = options.concat(this._getGroupedOptions());
        } else {
            // No groups, so just get list of options
            options = options.concat(this.props.options.map(this._getSingleOption));
        }
        return options;
    };

    render() {
        var containerClassName = classnames("input-custom-select", "input-select", this.props.className, {
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
            inputValue = this._isBoxSearch() && this.didPressKey ? this.props.searchString : selectedOptionLabel;

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
                            tabIndex="0" ref="selected-option"
                            onClick={this._handleToggle}
                            onKeyDown={this._handleKeyDown}
                            className={selectClassName}
                            title={this.props.title}>

                            <FormTextField
                                data-id="selected-input"
                                inputClassName={selectedOptionLabelClassName}
                                helpClassName={this.props.helpClassName}
                                errorMessage={this.props.errorMessage}
                                autoFocus={this.props.autofocus}
                                selectOnFocus={this._isBoxSearch()}
                                stateless={true}
                                value={inputValue}
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
            searchString: "",
            searchTime: 0
        });
    };

    _handleSearch = (search, time, index) => {
        var matchedOptions = this.state.matchedOptions;

        if (this.props.canAdd || this.props.searchType === SearchTypes.BOX) {
            if (search === "") {
                matchedOptions = this.props.options;
            } else {
                matchedOptions = filterOptions(this.props.options, search);
            }
        }

        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index,
            matchedOptions: matchedOptions
        });
    };

    render() {
        var props = _.defaults({
            ref: "FormDropDownListStateless",
            options: this.state.matchedOptions,
            open: this.state.open,
            onToggle: this._handleToggle,
            onSearch: this._handleSearch,
            searchIndex: this.state.searchIndex,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime
        }, this.props);

        return React.createElement(FormDropDownListStateless, props);
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
        if (!Utils.isProduction() && this.props.controlled) {
            /* istanbul ignore next  */
            throw(Utils.deprecatePropError("controlled", "stateless"));
        }
    }

    render() {
        return (
            this.props.stateless
                ? React.createElement(FormDropDownListStateless,
                    _.defaults({ ref: "FormDropDownListStateless" }, this.props))
                : React.createElement(FormDropDownListStateful,
                    _.defaults({ ref: "FormDropDownListStateful" }, this.props))
        );
    }
}

FormDropDownList.SearchTypes = SearchTypes;
FormDropDownList.filterOptions = filterOptions;

module.exports = FormDropDownList;
