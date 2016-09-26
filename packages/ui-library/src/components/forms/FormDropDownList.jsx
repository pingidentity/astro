var React = require("react"),
    ReactDOM = require("react-dom"),
    _ = require("underscore"),
    classnames = require("classnames"),
    FormLabel = require("./FormLabel.jsx"),
    FormError = require("./FormError.jsx"),
    KeyboardUtils = require("../../util/KeyboardUtils.js"),
    callIfOutsideOfContainer = require("../../util/EventUtils.js").callIfOutsideOfContainer;

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
* @param {number} searchIndex
*    The index of the option that was just searched.
*/

/**
* @callback FormDropDownList~onValueChange
*
* @param {FormDropDownList~option} option
*    The newly selected list option.
*/

/**
* @typedef FormDropDownList~option
* @desc A single list option. Must contain a label.
*    Additional properties will be passed to the contentType as props.
*
* @property {string} label
*     The label of the option.
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
* @param {boolean} [controlled=false]
*     To enable the component to be externally managed. True will relinquish control to the component's owner.
*     False or not specified will cause the component to manage state internally.
*
* @param {array<FormDropDownList~option>} options
*    Array of options for the dropdown list. Each option should have a label.
*    Additional properties of the option object will be passed as props to the contentType.
* @param {FormDropDownList~option} selectedOption
*    The selected list option.
* @param {FormDropDownList~onValueChange} [onValueChange]
*    Callback to be triggered when an option is selected.
*
* @param {element} [contentType=FormDropDownListDefaultContent]
*    A custom element representing the contents of each option.
*
* @param {boolean} [open=false]
*    State of the open/closed dropdown menu.
* @param {FormDropDownList~onToggle} [onToggle]
*    Callback to be triggered when the open/closed state changes.
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
* @param {FormDropDownList~onSearch} [onSearch]
*    Callback to be triggered when the state of the search of an option when the list dropdown is expanded changes.
*
* @param {string} [selectClassName]
*    CSS classes to set on the select.
* @param {string} [selectedOptionLabelClassName]
*    CSS classes to set on the selected list option label.
* @param {string} [title=""]
*    The tooltip title to give the selected option.
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
var FormDropDownListDefaultContent = React.createClass({

    propTypes: {
        label: React.PropTypes.string
    },

    render: function () {
        return <div>{this.props.label}</div>;
    }
});

var FormDropDownListStateless = React.createClass({
    displayName: "FormDropDownListStateless",

    propTypes: {
        "data-id": React.PropTypes.string,
        className: React.PropTypes.string,
        options: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        selectedOption: React.PropTypes.object.isRequired,
        onValueChange: React.PropTypes.func,
        contentType: React.PropTypes.element,
        open: React.PropTypes.bool,
        onToggle: React.PropTypes.func,
        searchString: React.PropTypes.string,
        searchField: React.PropTypes.string,
        validSearchCharsRegex: React.PropTypes.string,
        searchIndex: React.PropTypes.number,
        searchTime: React.PropTypes.number,
        onSearch: React.PropTypes.func,
        selectClassName: React.PropTypes.string,
        selectedOptionLabelClassName: React.PropTypes.string,
        title: React.PropTypes.string,
        noneOption: React.PropTypes.object,
        noneOptionLabelClassName: React.PropTypes.string,
        label: React.PropTypes.string,
        labelHelpText: React.PropTypes.string,
        helpClassName: React.PropTypes.string,
        errorMessage: React.PropTypes.string,
        required: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        autofocus: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "form-drop-down-list",
            onValueChange: _.noop,
            contentType: <FormDropDownListDefaultContent />,
            open: false,
            onToggle: _.noop,
            searchString: "",
            searchField: "label",
            validSearchCharsRegex: "/[^a-zA-Z\d\s]+/",
            searchIndex: -1,
            searchTime: 0,
            onSearch: _.noop,
            title: "",
            required: false,
            disabled: false,
            autofocus: false
        };
    },

    componentDidUpdate: function () {
        this._setSearchListPosition(this.props.options);
    },

    componentDidMount: function () {
        window.addEventListener("click", this._handleGlobalClick);

        if (this.props.autofocus) {
            this.refs["selected-option"].focus();
        }
    },

    componentWillUnmount: function () {
        window.removeEventListener("click", this._handleGlobalClick);
    },

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
    _handleGlobalClick: function (e) {
        //if the click event isn't the click that opened the list
        if (this.props.open && this._clickEvent !== e) {
            var picker = ReactDOM.findDOMNode(this.refs["selected-option"]);

            //dont close the list if the click is on the select
            callIfOutsideOfContainer(picker, this.props.onToggle, e);
        }
    },

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
    _handleKeyDown: function (e) {
        if (this.props.open) { // only do search when select list expanded
            var search;
            var time = Date.now();
            if (e.keyCode === KeyboardUtils.KeyCodes.ENTER) { //enter, so pull previously entered search string
                if (this.props.searchIndex > -1) {
                    this.props.onValueChange(this.props.options[this.props.searchIndex]);
                }
                this.props.onToggle();
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ESC) { // esc, so clear
                search = "";
            } else if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                this._handleUpDownKeys(e);
            } else if (e.keyCode === KeyboardUtils.KeyCodes.TAB) {
                this.props.onToggle();
            } else if (String.fromCharCode(e.keyCode).search(this.props.validSearchCharsRegex) === -1) { // regex specifies valid characters, not i18n friendly right now
                search = String.fromCharCode(e.keyCode).toLowerCase();
                 // again, not i18n friendly
                if (this.props.searchTime !== 0 && (time - this.props.searchTime) < 1000) { // more than a second and reset search
                    search = this.props.searchString + search;
                }
            }
            if (search !== undefined) { // invalid character entered
                if (search !== "") { // don't bother searching if empty
                    var option = _.find(this.props.options,
                        function (o) {
                            if (o[this.props.searchField].toLowerCase().indexOf(search) === 0) { //starts with
                                return o;
                            }
                        }.bind(this));
                    var index = this.props.options.indexOf(option);
                    if (!option) {
                        search = ""; //nonsense entered, not in options list
                    }
                }
                this.props.onSearch(search, time, index);
            }
        } else if (!this.props.open) {
            if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP ||
                e.keyCode === KeyboardUtils.KeyCodes.ARROW_DOWN) {
                this._handleUpDownKeys(e);
            }
        }
    },

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
    _handleUpDownKeys: function (e) {
        if (this.props.open) {
            var index = this.props.searchIndex;
            if (e.keyCode === KeyboardUtils.KeyCodes.ARROW_UP) {
                index = index - 1;
            }
            else {
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

            this.props.onSearch("",0, index);
        } else if (!this.props.open && !this.props.disabled) {
            this.props.onToggle();
        }
        e.preventDefault();
        e.stopPropagation();
    },

    /**
     * Centers the search list on last searched item. Called on componentDidUpdate.
     *
     * @private
     * @ignore
     */
    _setSearchListPosition: function () {
        if (!this.props.open) {
            return;
        }
        var option = this.props.options[this.props.searchIndex],
            selectList = ReactDOM.findDOMNode(this.refs["selectList"]),
            selectListTarget= option ? "option-" + this.props.searchIndex : (this.props.noneOption
                ? "none-option" : "option-0"),
            selectListItem = ReactDOM.findDOMNode(this.refs[selectListTarget]);

        selectList.scrollTop = (selectListItem.offsetTop - 50);
    },

    _handleToggle: function (e) {
        if (!this.props.disabled) {
            //store a reference to this event so that we dont open and then close the list when the
            //global click event listener gets triggered.
            this._clickEvent = e.nativeEvent;
            this.props.onToggle();
        }
    },

    _handleOptionClick: function (item) {
        this.props.onValueChange(item);
        this.props.onToggle();
    },

    render: function () {
        var containerClassName = classnames("input-custom-select", "input-select", this.props.className, {
            open: this.props.open,

            "form-error": this.props.errorMessage,
            "value-entered": this.props.selectedOption,
            required: this.props.required,
            disabled: this.props.disabled
        });
        var selectClassName = classnames("selected-option", this.props.selectClassName);
        var noneOptionContainerClassName = classnames("none-option", { highlighted: this.props.searchIndex === -1 });
        var selectedOptionLabelClassName = classnames("selected-option-label", this.props.selectedOptionLabelClassName);

        return (
            <FormLabel data-id={this.props["data-id"]} ref="form-drop-down-list"
                    className={containerClassName}
                    value={this.props.label}
                    hint={this.props.labelHelpText}
                    helpClassName={this.props.helpClassName}>
                <div className="input-container">
                    <div className="wrapper">
                        <div data-target="list-select" data-id="selected-option" tabIndex="0" ref="selected-option"
                             onClick={this._handleToggle} onKeyDown={this._handleKeyDown}
                             className={selectClassName} title={this.props.title}>
                            <div data-target="list-select" className={selectedOptionLabelClassName}>
                                {this.props.selectedOption.label}
                            </div>
                            <div data-target="list-select" className={!this.props.disabled && "arrow"}></div>
                        </div>
                        <ul data-id="select-list" className="select-list" ref="selectList">
                            { this.props.noneOption &&
                                <li data-id="none-option" ref="none-option" className={noneOptionContainerClassName}
                                    onClick={this._handleOptionClick.bind(null, this.props.noneOption)}>
                                    <span className={this.props.noneOptionLabelClassName}>
                                        {this.props.noneOption.label}
                                    </span>
                                </li>
                            }
                            {
                                this.props.options.map(function (item, index) {
                                    var className = classnames("select-option", {
                                        highlighted: index === this.props.searchIndex
                                    });
                                    return (
                                        <li key={"option-" + index}
                                            ref={"option-" + index}
                                            data-id={"option-" + index}
                                            className={className}
                                            onClick={this._handleOptionClick.bind(null, item)}>
                                            {React.cloneElement(this.props.contentType, item)}
                                        </li>
                                    );
                                }.bind(this))
                            }
                        </ul>
                    </div>
                    {this.props.errorMessage && (
                        <FormError.Icon data-id={this.props["data-id"] + "-errorMessage-icon"} />
                    )}
                    {this.props.errorMessage && (
                        <FormError.Message
                            value={this.props.errorMessage}
                            data-id={this.props["data-id"] + "-errorMessage"}
                        />
                    )}
                </div>
            </FormLabel>
        );
    }
});

var FormDropDownListStateful = React.createClass({
    displayName: "FormDropDownListStateful",

    getInitialState: function () {
        return {
            open: this.props.open || false,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        };
    },

    _handleToggle: function () {
        this.setState({
            open: !this.state.open,
            searchIndex: -1,
            searchString: "",
            searchTime: 0
        });
    },

    _handleSearch: function (search, time, index) {
        this.setState({
            searchString: search,
            searchTime: time,
            searchIndex: index
        });
    },

    render: function () {
        var props = _.defaults({
            ref: "FormDropDownListStateless",
            open: this.state.open,
            onToggle: this._handleToggle,
            onSearch: this._handleSearch,
            searchIndex: this.state.searchIndex,
            searchString: this.state.searchString,
            searchTime: this.state.searchTime
        }, this.props);

        return React.createElement(FormDropDownListStateless, props);
    }
});

var FormDropDownList = React.createClass({
    displayName: "FormDropDownList",

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
            this.props.controlled
                ? React.createElement(FormDropDownListStateless,
                    _.defaults({ ref: "FormDropDownListStateless" }, this.props))
                : React.createElement(FormDropDownListStateful,
                    _.defaults({ ref: "FormDropDownListStateful" }, this.props))
        );
    }
});

module.exports = FormDropDownList;
