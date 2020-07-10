import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import moment from "moment-range";
import DaysView from "./DaysView";
import FormError from "../forms/FormError";
import FormLabel from "../forms/FormLabel";
import MonthsView from "./MonthsView";
import YearsView from "./YearsView";
import CalendarUtils from "./Utils";
import Translator from "../../util/i18n/Translator.js";
import PopperContainer from "../tooltips/PopperContainer";
import { InputWidths, InputWidthProptypesAuto, getInputWidthClass } from "../forms/InputWidths";
import { isFunction, noop } from "underscore";

var _keyDownActions = CalendarUtils.keyDownActions;
/**
 * @enum {number}
 * @alias Calendar.Views
 * @desc An enum of calendar views.
 */
var Views = {
    DAYS: 0,
    MONTHS: 1,
    YEARS: 2
};

/**
 * @typedef Calendar~dateRange
 * @desc An object describing the start and end dates (inclusive) of a selectable date range.
 *
 * @property {*} [startDate]
 *    The numeric value for the start date of the date range.
 * @property {*} [endDate]
 *    The numeric value for the end date of the date range.
 *
 */

/**
 * @callback Calendar~onValueChange
 *
 * @param {number} date
 *    The numeric value for the selected date.
 */

/**
 * @callback Calendar~onInputTextValueChange
 *
 * @param {number} date
 *    The numeric value for the date typed in the text input field.
 */

/**
 * @class Calendar
 * @desc Calendar renders a basic Calendar popup over an input field. It takes a date number that can be used to set the
 *    current date. Coming from Java backend this should be straight forward. To play with this client side
 *    the moment plugin is helpful to convert a Date object to a numeric value.
 *
 *    Credit: Calendar control taken from https://github.com/Rudeg/react-input-calendar
 *    Compatibility: 0.12.2+ compatible, tested against 0.13.3 and still compatible
 *
 * @param {string} [data-id="calendar"]
 *    To define the base "data-id" value for the top-level HTML container.
 * @param {string} [className]
 *    CSS classes to apply to the top-level HTML container.
 * @param {string} [labelClassName]
 *    CSS classes to apply to the label container.
 * @param {HelpHint.Placements} [helpPlacement]
 *     How to place the help hint.
 *
 * @param {*} [date]
 *    Numeric value for the selected date. If not provided, will use the today's date.
 *    When not provided, the component will manage this value.
 * @param {Calendar~dateRange} [dateRange]
 *    A date range to restrict the selectable dates in the calendar.
 *    If provided, will restrict calendar date selection so it can't be less and/or can't be greater than the date range.
 *    An undefined start/end date will result in no restrictions in that direction for the allowable calendar dates.
 * @param {string} [errorMessage]
 *    Text which appears on input field hover as a red error message.
 * @param {string} [format="MM-DD-YYYY"]
 *    String value of the date format you want to display (e.g. "YYYY-MM-DD").
 * @param {string} [computableFormat="MM-DD-YYYY"]
 *    If unsure, leave as "x". Refer to moment#formatTokenFunctions for more info.
 * @param {node} [labelNode]
 *     A FormLabel component that replaces the default label of the calendar.
 * @param {string} [labelHelpText]
 *     The text to display for the help tooltip.
 * @param {string} [labelText]
 *     The text to show as the field's label.
 * @param {string} [label]
 *     Alias for labelText.
 * @param {string} [name]
 *     Name attribute for the input.
 * @param {string} [utcOffset]
 *     When prop is enabled, custom UTC offset value overwrites default browser utc offset.
 *     Format as positive or negative for HH:MM such as +01:50.
 *
 * @param {Calendar.Views} [minView=Calendar.Views.DAYS]
 *    Set the minimal view.
 * @param {Calendar~onValueChange} [onValueChange]
 *    Callback to be triggered when a date is selected.
 * @param {Calendar~onTextInputValueChange} [onTextInputValueChange]
 *    Callback to be triggered when a date is typed into the text input field.
 * @param {Calendar~validateInputValue} [validateInputValue]
 *    Validator function called whenever the value of the Calendar input is changed. Receives
 *    the input's value as an argument; if it returns true, allows the value to be entered. If
 *    false, it does not allow the value to be entered.
 *
 * @param {string} [placeholder]
 *    Placeholder text for the calendar field.
 * @param {boolean} [closeOnSelect=false]
 *    Whether or not the calendar should close once a date is selected.
 * @param {boolean} [required=false]
 *    If true, the user must select a date for the calendar.
 *
 * @example
 *
 *     getInitialState: function () {
 *           return {
 *               selectedDate: moment(new Date()) //current date
 *           };
 *       },
 *
 *     _onEnrollmentDateChanged: function (newValue) {
 *           this.setState({
 *               selectedDate: parseInt(newValue)
 *           });
 *     },
 *
 *     render: function () {
 *             return (
 *                     <Calendar format="YYYY-MM-DD"
 *                          date={this.state.selectedDate}
 *                          computableFormat="x"
 *                          closeOnSelect={true}
 *                          labelText="Start Date"
 *                          onValueChange={this._onEnrollmentDateChanged}/>
 *             );
 *     }
 */

class Calendar extends React.Component {

    static propTypes = {
        "data-id": PropTypes.string,

        className: PropTypes.string,
        closeOnSelect: PropTypes.bool,
        computableFormat: PropTypes.string,
        date: PropTypes.any,
        dateRange: PropTypes.shape({
            startDate: PropTypes.any,
            endDate: PropTypes.any
        }),
        format: PropTypes.string,
        helpClassName: PropTypes.string,
        helpPlacement: PropTypes.string,
        labelClassName: PropTypes.string,
        label: PropTypes.string,
        labelNode: PropTypes.node,
        labelText: PropTypes.string,
        labelHelpText: PropTypes.string,
        minView: PropTypes.oneOf([Views.DAYS, Views.MONTHS, Views.YEARS]),
        name: PropTypes.string,
        placeholder: PropTypes.string,
        required: PropTypes.bool,
        tight: PropTypes.bool,
        width: PropTypes.oneOf(InputWidthProptypesAuto),
        onInputTextValueChange: PropTypes.func,
        onValueChange: PropTypes.func,

    };

    static defaultProps = {
        "data-id": "calendar",
        computableFormat: "MM-DD-YYYY",
        closeOnSelect: false,
        minView: Views.DAYS,
        required: false,
        format: Translator.translate("dateformat"),
        onInputTextValueChange: noop,
        tight: false,
        width: InputWidths.AUTO,

    };

    // runs the date through moment
    _getDate = (date, utcOffset) => {
        // we have a habit of passing back stringified time numbers
        if (date && date.match && date.match(/^\-?[0-9]+$/)) {
            return this._handleUtcOffset(parseInt(date), utcOffset);
        }
        return date ? this._handleUtcOffset(date, utcOffset) : null;
    };

    _parseDateRange = ({ startDate, endDate } = {}) =>
        (startDate || endDate)
            ? ({
                startDate: startDate ? this._getDate(startDate) : undefined,
                endDate: endDate ? this._getDate(endDate) : undefined
            })
            : undefined;

    constructor(props) {
        super(props);

        moment.locale(Translator.currentLanguage);

        const now = moment();

        if (props.utcOffset) {
            // Change the current time to match the current time in the
            // timezone represented by the UTC offset.
            now.utcOffset(props.utcOffset);
        }

        const {
            initialState = {},
            date = initialState.date
        } = props;

        this.state = {
            date: this._getDate(date, props.utcOffset) || now,
            currentView: props.minView,
            isVisible: false,
        };
    }

    componentWillReceiveProps({ date: nextDate }) {
        if (this.props.date !== nextDate) {
            this.setState({
                date: this._getDate(nextDate)
            });
        }
    }

    // formats the date according to the supplied viewing format
    _getFormattedDate = (date) => {
        if (date && this.props.format) {
            return date.format(this.props.format);
        } else if (date) {
            return date;
        } else {
            return "";
        }
    };

    componentDidMount() {
        document.addEventListener("click", this.documentClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClick);
    }

    /**
     * [keyDown description]
     * @method Calendar#keydown
     * @param  {Object} e The event object
     */
    keyDown = (e) => {
        e.preventDefault();
        _keyDownActions.call(this, e.keyCode);
    };

    /**
     * Increments the currentView state
     * @method Calendar#nextView
     */
    nextView = () => {
        this.setState({
            currentView: this.state.currentView + 1
        });
    };

    /**
     * Decrements the currentView state
     * @method Calendar#prevView
     * @param {?} date [description]
     */
    prevView = (date) => {
        if (this.state.currentView === this.props.minView) {
            this.setState({
                isVisible: false
            });
        } else {
            this.setState({
                currentView: this.state.currentView - 1
            });
        }
        const parsedDate = this._getDate(date);
        if (CalendarUtils.inDateRange(parsedDate, this._parseDateRange(this.props.dateRange))) {
            this._handleValueChange(parsedDate);
        }

    };

    /**
     * [setDate description]
     * @method Calendar#setDate
     * @param {?}  date      [description]
     * @param {Boolean} isDayView [description]
     */
    setDate = (date, isDayView) => {
        const parsedDate = this._getDate(date);
        this._handleValueChange(parsedDate);

        if (this.props.closeOnSelect && isDayView) {
            this.setState({
                isVisible: false,
            });
        }
    };

    /**
     * Handles the value showing in the text input
     * @method Calendar#changeDate
     * @param  {Object} e The event object
     */
    changeDate = (e) => {
        const {
            onInputTextValueChange,
            validateInputValue
        } = this.props;
        const inputValue = e.target.value;

        // If there's no validator or if the value is valid, set a new value.
        if (!isFunction(validateInputValue) || validateInputValue(inputValue)) {
            this.setState({
                inputValue
            });
            onInputTextValueChange(inputValue);
        }
    };

    // formats the date according to the provided computable format
    _getComputableDate = (date) => date.format(this.props.computableFormat);

    // handles when a new date is selected
    // updates the text input as well
    _handleValueChange = value => {
        const { onValueChange } = this.props;

        // Doing p-stateful implementation here. Because of the computed format change
        // below and the fact that the keyboard interactions use this.state.date,
        // the StateContainer just creates a second source of truth.
        this.setState({
            ...(this.props.date ? {} : { date: value }),
            inputValue: undefined,
        });

        if (onValueChange) {
            onValueChange(this._getComputableDate(value));
        }
    }

    _handleUtcOffset = (date) => {
        const convertedDate = moment(date).clone();
        // .utcOffset doesn't actually change the date if the argument is undefined,
        // so calling this when there's no utcOffset won't have any effect.
        convertedDate.utcOffset(this.props.utcOffset, true);
        return convertedDate;
    }

    /**
     * When the input blurs, use it to set the value for the component
     * @method Calendar#inputBlur
     */
    inputBlur = () => {
        var date = this.state.inputValue,
            newDate = null,
            format = this.props.format;

        if (date) {
            // format, with strict parsing true, so we catch bad dates
            newDate = this._handleUtcOffset(moment(date, format, true));

            // if the new date didn't match our format, parse it otherwise
            if (!newDate.isValid()) {
                newDate = this._handleUtcOffset(date);
            }

            if (CalendarUtils.inDateRange(newDate, this._parseDateRange(this.props.dateRange))) {
                this._handleValueChange(newDate);
            } else {
                this.setState({
                    inputValue: undefined,
                });
            }
        }
    };

    // notify document click handler that event originated from calendar elements
    isCalendar = false;

    /**
     * Handles document click
     * @method Calendar#documentClick
     */
    documentClick = () => {
        if (!this.isCalendar) {
            this.setVisibility(false);
        }
        this.isCalendar = false;
    };

    /**
     * Handles calendar click
     * @method Calendar#calendarClick
     * @param  {Object} e The event object
     */
    calendarClick = (e) => {
        e.stopPropagation();
        this.isCalendar = true;
    };

    /**
     * @method Calendar#toggleClick
     */
    toggleClick = () => {
        this.isCalendar = true;
        this.setVisibility();
    };

    /**
     * Sets Visibility
     * @method Calendar#setVisibility
     * @param {?} val [description]
     */
    setVisibility = (val) => {
        var value = val !== undefined ? val : !this.state.isVisible;
        var eventMethod = value ? "addEventListener" : "removeEventListener";
        document[eventMethod]("keydown", this.keyDown);

        this.setState({
            isVisible: value
        });
    };

    /**
     * Handles input click
     * Hide calendar when clicking input text to type date
     * @method Calendar#inputClick
     * @param  {Object} e The event object
     */
    inputClick = (e) => {
        e.stopPropagation();
    };

    _getReference = () => this.reference;

    render() {
        const calendarDate = this._getDate(this.state.date) || this._handleUtcOffset();
        let view;

        const viewProps = {
            date: calendarDate,
            onSetDate: this.setDate,
            onNextView: this.nextView,
            // Run these through getDate so that they're both moment object going into
            // the views and they both have the correct UTC offset, if needed.
            dateRange: this._parseDateRange(this.props.dateRange),
            onPrevView: this.prevView,
            utcOffset: this.props.utcOffset,
        };

        switch (this.state.currentView) {
            case Views.DAYS:
                if (calendarDate.locale) {
                    calendarDate.locale(Translator.currentLanguage);
                }
                view = (<DaysView {...viewProps}/>);
                break;
            case Views.MONTHS:
                view = (<MonthsView {...viewProps}/>);
                break;
            case Views.YEARS:
                view = (<YearsView {...viewProps} />);
                break;
        }

        const calendar = (
            <div className="input-calendar-wrapper active"
                data-id="input-calendar-wrapper"
                onClick={this.calendarClick}>
                {view}
            </div>
        );

        const popup = (
            <PopperContainer
                className="calendar-popup"
                data-parent={this.props["data-id"]}
                getReference={this._getReference}
                placement="bottom-start"
                ref={el => this.popperContainer = el}
                noGPUAcceleration
                matchWidth
            >
                {calendar}
            </PopperContainer>
        );

        const inputValue = this.state.inputValue === undefined
            ? this._getFormattedDate(this._getDate(this.state.date))
            : this.state.inputValue;

        const className = classnames("input-calendar",
            this.props.className,
            getInputWidthClass({ width: this.props.width }),
            {
                active: this.state.isVisible,
                required: this.props.required,
                "value-entered": !!inputValue,
                "input-calendar--width-tight": this.props.tight,
                "form-error": this.props.errorMessage
            });

        return (
            <div
                className={className}
                onClick={this.toggleClick}
                data-id={this.props["data-id"]}
            >
                {this.props.labelNode ||
                    <FormLabel
                        className={classnames("input-calendar__label", this.props.labelClassName)}
                        helpClassName={classnames(this.props.helpClassName)}
                        helpPlacement={this.props.helpPlacement}
                        data-id={this.props["data-id"] + "-label"}
                        value={this.props.labelText || this.props.label}
                        hint={this.props.labelHelpText}
                    />
                }
                <div className="input-container">
                    <input type="text"
                        data-id="calendar-input"
                        className="input-calendar-value"
                        name={this.props.name}
                        value={this.props.date === "" ? "" : inputValue}
                        onBlur={this.inputBlur}
                        onChange={this.changeDate}
                        onClick={this.inputClick}
                        placeholder={this.props.placeholder}
                        ref={el => this.reference = el}
                    />
                </div>
                {this.state.isVisible && popup}
                {this.props.errorMessage && (
                    <FormError.Icon data-id="calendar-error-message-icon" />
                )}
                {this.props.errorMessage && (
                    <FormError.Message
                        value={this.props.errorMessage}
                        data-id="calendar-error-message"
                    />
                )}
            </div>
        );
    }
}

Calendar.Views = Views;
Calendar.FormLabel = FormLabel;
Calendar.widths = InputWidths;

export default Calendar;

