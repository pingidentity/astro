import PropTypes from "prop-types";
import React from "react";
import classnames from "classnames";
import moment from "moment-range";
import DaysView from "./DaysView";
import FormLabel from "../forms/FormLabel";
import MonthsView from "./MonthsView";
import YearsView from "./YearsView";
import CalendarUtils from "./Utils";
import Translator from "../../util/i18n/Translator.js";
import PopperContainer from "../tooltips/PopperContainer";
import { inStateContainer } from "../utils/StateContainer";
import { InputWidths, InputWidthProptypesAuto, getInputWidthClass } from "../forms/InputWidths";

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
 *
 * @param {Calendar.Views} [minView=Calendar.Views.DAYS]
 *    Set the minimal view.
 * @param {Calendar~onValueChange} [onValueChange]
 *    Callback to be triggered when a date is selected.
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

class BaseCalendar extends React.Component {

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

        onValueChange: PropTypes.func,
    };

    static defaultProps = {
        "data-id": "calendar",
        computableFormat: "MM-DD-YYYY",
        closeOnSelect: false,
        minView: Views.DAYS,
        required: false,
        format: Translator.translate("dateformat"),
        tight: false,
        width: InputWidths.AUTO
    };

    constructor(props) {
        super(props);

        moment.locale(Translator.currentLanguage);

        this.state = {
            date: props.date || moment(),
            currentView: props.minView,
            isVisible: false
        };
    }

    // runs the date through moment
    _getDate = (date = this.props.date) => {
        // we have a habit of passing back stringified time numbers
        if (date && date.match && date.match(/^\-?[0-9]+$/)) {
            return moment(parseInt(date));
        }
        return date ? moment(date) : null;
    };

    // formats the date according to the supplied viewing format
    _getFormattedDate = (date = this._getDate(), format = this.props.format) => {
        return date ? date.format(format) : "";
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
        if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
            this._handleValueChange(date);
        }
    };

    /**
     * [setDate description]
     * @method Calendar#setDate
     * @param {?}  date      [description]
     * @param {Boolean} isDayView [description]
     */
    setDate = (date, isDayView) => {
        if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
            this._handleValueChange(date);

            if (this.props.closeOnSelect && isDayView) {
                this.setState({
                    isVisible: false,
                });
            }
        }
    };

    /**
     * Handles the value showing in the text input
     * @method Calendar#changeDate
     * @param  {Object} e The event object
     */
    changeDate = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    };

    // handles when a new date is selected
    // updates the text input as well
    _handleValueChange = value => {
        const { onValueChange } = this.props;

        this.setState({
            date: value,
            inputValue: undefined,
        });

        if (onValueChange) {
            onValueChange(this._getComputableDate(moment(value)));
        }
    }

    // formats the date according to the provided computable format
    _getComputableDate = (date) => date.format(this.props.computableFormat);

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
            newDate = moment(date, format, true);

            // if the new date didn't match our format, parse it otherwise
            if (!newDate.isValid()) {
                newDate = moment(date);
            }

            if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
                this._handleValueChange(newDate);
            }
            this.setState({
                inputValue: undefined,
            });
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

        const calendarDate = this._getDate() || moment();
        let view;
        switch (this.state.currentView) {
            case Views.DAYS:
                calendarDate.locale(Translator.currentLanguage);
                view = (<DaysView date={calendarDate} onSetDate={this.setDate} onNextView={this.nextView}
                    dateRange={this.props.dateRange} />);
                break;
            case Views.MONTHS:
                view = (<MonthsView date={calendarDate} onSetDate={this.setDate}
                    onNextView={this.nextView} onPrevView={this.prevView}
                    dateRange={this.props.dateRange} />);
                break;
            case Views.YEARS:
                view = (<YearsView date={calendarDate} onSetDate={this.setDate} onPrevView={this.prevView}
                    dateRange={this.props.dateRange} />);
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
            >
                {calendar}
            </PopperContainer>
        );

        const inputValue = this.state.inputValue === undefined
            ? this._getFormattedDate()
            : this.state.inputValue;

        const className = classnames("input-calendar",
            this.props.className,
            getInputWidthClass({ width: this.props.width }),
            {
                active: this.state.isVisible,
                required: this.props.required,
                "value-entered": !!inputValue,
                "input-calendar--width-tight": this.props.tight,
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
                        value={inputValue}
                        onBlur={this.inputBlur}
                        onChange={this.changeDate}
                        onClick={this.inputClick}
                        placeholder={this.props.placeholder}
                        ref={el => this.reference = el}
                    />
                </div>
                {this.state.isVisible && popup}
            </div>
        );
    }
}

const Calendar = inStateContainer([
    {
        name: "date",
        initial: moment(),
        setter: "onValueChange",
    },
])(BaseCalendar);

Calendar.Views = Views;
Calendar.FormLabel = FormLabel;
Calendar.widths = InputWidths;

export default Calendar;

