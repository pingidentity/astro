var PropTypes = require("prop-types");
var React = require("react"),
    classnames = require("classnames"),
    moment = require("moment-range"),
    DaysView = require("./DaysView.jsx"),
    FormLabel = require("../forms/FormLabel.jsx"),
    MonthsView = require("./MonthsView.jsx"),
    YearsView = require("./YearsView.jsx"),
    CalendarUtils = require("./Utils"),
    Translator = require("../../util/i18n/Translator.js"),
    Utils = require("../../util/Utils.js");

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
* @deprecated
* @callback Calendar~onChange
*
* @param {number} date
*    The numeric value for the selected date.
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
 * @param {string} [id]
 *    DEPRECATED. Use "data-id" instead.
 * @param {string} [className]
 *    CSS classes to apply to the top-level HTML container.
 * @param {string} [labelClassName]
 *    CSS classes to apply to the label container.
 * @param {string} [helpClassName]
 *    CSS classes to apply to the label help container.
 *
 * @param {*} [date]
 *    Numeric value for the selected date. If not provided, will use the today's date.
 * @param {Calendar~dateRange} [dateRange]
 *    A date range to restrict the selectable dates in the calendar.
 *    If provided, will restrict calendar date selection so it can't be less and/or can't be greater than the date range.
 *    An undefined start/end date will result in no restrictions in that direction for the allowable calendar dates.
 * @param {string} [format="MM-DD-YYYY"]
 *    String value of the date format you want to display (e.g. "YYYY-MM-DD").
 * @param {string} [computableFormat="MM-DD-YYYY"]
 *    If unsure, leave as "x". Refer to moment#formatTokenFunctions for more info.
 * @param {string} [labelHelpText]
 *     The text to display for the help tooltip.
 * @param {string} [labelText]
 *     The text to show as the field's label.
 *
 * @param {Calendar.Views} [minView=Calendar.Views.DAYS]
 *    Set the minimal view.
 * @param {Calendar~onValueChange} [onValueChange]
 *    Callback to be triggered when a date is selected.
 * @param {Calendar~onChange} [onChnage]
 *    DEPRECATED. Use "onValueChange" instead.
 *
 * @param {string} [placeholder]
 *    Placeholder text for the calendar field.
 * @param {boolean} [closeOnSelect=false]
 *    Whether or not the calendar should close once a date is selected.
 * @param {boolean} [required=false]
 *    If true, the user must select a date for the calendar.
 * @param {boolean} [isRequired]
 *    DEPRECATED. Use "required" instead.
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
        labelClassName: PropTypes.string,
        labelText: PropTypes.string,
        labelHelpText: PropTypes.string,
        minView: PropTypes.oneOf([Views.DAYS, Views.MONTHS, Views.YEARS]),
        placeholder: PropTypes.string,
        required: PropTypes.bool,

        //TODO: set as required when v1 no longer supported
        onValueChange: PropTypes.func,

        //TODO: remove when v1 no longer supported
        id: PropTypes.string,
        isRequired: PropTypes.bool,
        onChange: PropTypes.func
    };

    static defaultProps = {
        "data-id": "calendar",
        computableFormat: "MM-DD-YYYY",
        minView: Views.DAYS,
        closeOnSelect: false,
        required: false,
        format: Translator.translate("dateformat")
    };

    constructor(props) {
        super(props);
        var date = props.date ? moment(props.date) : null;

        this.state = {
            date: date,
            inputValue: date ? date.format(props.format) : null,
            currentView: props.minView,
            isVisible: false
        };
    }

    componentWillMount() {
        moment.locale(Translator.currentLanguage);

        if (!Utils.isProduction()) {
            if (this.props.id) {
                console.warn(Utils.deprecateMessage("id", "data-id"));
            }
            if (this.props.onChange) {
                console.warn(Utils.deprecateMessage("onChange", "onValueChange"));
            }
            if (this.props.isRequired) {
                console.warn(Utils.deprecateMessage("isRequired", "required"));
            }
        }
    }

    componentDidMount() {
        document.addEventListener("click", this.documentClick);
    }

    componentWillUnmount() {
        document.removeEventListener("click", this.documentClick);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.date ? moment(nextProps.date) : this.state.date,
            inputValue: nextProps.date ? moment(nextProps.date).format(this.props.format) : null
        });
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
                date: date,
                inputValue: date.format(this.props.format),
                isVisible: false
            });

            if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
                //TODO: remove when v1 no longer supported
                if (this.props.onChange) {
                    this.props.onChange(date.format(this.props.computableFormat));
                }
                if (this.props.onValueChange) {
                    this.props.onValueChange(date.format(this.props.computableFormat));
                }
            }

        } else {
            this.setState({
                date: date,
                currentView: this.state.currentView - 1
            });
        }
    };

    /**
     * [setDate description]
     * @method Calendar#setDate
     * @param {?}  date      [description]
     * @param {Boolean} isDayView [description]
     */
    setDate = (date, isDayView) => {
        this.setState({
            date: date,
            inputValue: date.format(this.props.format),
            isVisible: this.props.closeOnSelect && isDayView ? !this.state.isVisible : this.state.isVisible
        });

        if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
            //TODO: remove when v1 no longer supported
            if (this.props.onChange) {
                this.props.onChange(date.format(this.props.computableFormat));
            }
            if (this.props.onValueChange) {
                this.props.onValueChange(date.format(this.props.computableFormat));
            }
        }
    };

    /**
     * Sets the inputValue state
     * @method Calendar#changeDate
     * @param  {Object} e The event object
     */
    changeDate = (e) => {
        this.setState({
            inputValue: e.target.value
        });
    };

    /**
     * Handles input blur
     * @method Calendar#inputBlur
     */
    inputBlur = () => {
        var date = this.state.inputValue,
            newDate = null,
            computableDate = null,
            format = this.props.format;

        if (date) {
            // format, with strict parsing true, so we catch bad dates
            newDate = moment(date, format, true);

            // if the new date didn't match our format, see if the native
            // js date can parse it
            if (!newDate.isValid()) {
                var d = new Date(date);

                // if native js cannot parse, just make a new date
                if (isNaN(d.getTime())) {
                    d = new Date();
                }

                newDate = moment(d);
            }

            computableDate = newDate.format(this.props.computableFormat);
        }

        if (CalendarUtils.inDateRange(date, this.props.dateRange)) {
            this.setState({
                date: newDate,
                inputValue: newDate ? newDate.format(format) : null
            });

            //TODO: remove when v1 no longer supported
            if (this.props.onChange) {
                this.props.onChange(computableDate);
            }
            if (this.props.onValueChange) {
                this.props.onValueChange(computableDate);
            }
        } else {
            this.setState({
                date: this.state.date,
                inputValue: this.state.date.format(format)
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

    render() {

        // its ok for this.state.date to be null, but we should never
        // pass null for the date into the calendar pop up, as we want
        // it to just start on todays date if there is no date set
        var calendarDate = this.state.date || moment();
        var view;
        switch (this.state.currentView) {
            case Views.DAYS:
                if (typeof calendarDate === "object") {
                    calendarDate.locale(Translator.currentLanguage);
                }
                view = (<DaysView date={calendarDate} onSetDate={this.setDate} onNextView={this.nextView}
                                dateRange={this.props.dateRange} />);
                break;
            case Views.MONTHS:
                view = (<MonthsView date={calendarDate} onSetDate={this.setDate} //eslint-disable-line
                                   onNextView={this.nextView} onPrevView={this.prevView}
                                   dateRange={this.props.dateRange} />);
                break;
            case Views.YEARS:
                view = (<YearsView date={calendarDate} onSetDate={this.setDate} onPrevView={this.prevView}
                                dateRange={this.props.dateRange} />);
                break;
        }

        var calendar = !this.state.isVisible ? "" : (
            <div className="input-calendar-wrapper active"
                data-id="input-calendar-wrapper"
                onClick={this.calendarClick}>
                {view}
            </div>
        );

        var className = classnames("input-calendar", this.props.className, {
            active: this.state.isVisible,
            required: this.props.isRequired || this.props.required,
            "value-entered": !!this.state.inputValue
        });

        var id = this.props.id || this.props["data-id"];

        return (
            <div
                className={className}
                onClick={this.toggleClick}>

                <FormLabel
                    className={classnames(this.props.labelClassName)}
                    helpClassName={classnames(this.props.helpClassName)}
                    data-id={id + "-label"}
                    value={this.props.labelText}
                    hint={this.props.labelHelpText}
                />
                <div className="input-container">
                    <input type="text"
                        data-id={id}
                        className="input-calendar-value"
                        value={this.state.inputValue}
                        onBlur={this.inputBlur}
                        onChange={this.changeDate}
                        placeholder={this.props.placeholder} />
                </div>
                {calendar}
            </div>
        );
    }
}

Calendar.Views = Views;

module.exports = Calendar;
