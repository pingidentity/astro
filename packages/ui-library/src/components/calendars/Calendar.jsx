var React = require("react"),
    classnames = require("classnames"),
    moment = require("moment-range"),
    DaysView = require("./DaysView.jsx"),
    MonthsView = require("./MonthsView.jsx"),
    YearsView = require("./YearsView.jsx"),
    CalendarUtils = require("./Utils"),
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
 *    CSS classes to set on the top-level HTML container.
 *
 * @param {*} date
 *    Numeric value for the selected date.
 * @param {string} [format="MM-DD-YYYY"]
 *    String value of the date format you want to display (e.g. "YYYY-MM-DD").
 * @param {string} [computableFormat="MM-DD-YYYY"]
 *    If unsure, leave as "x". Refer to moment#formatTokenFunctions for more info.
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
 *                          onValueChange={this._onEnrollmentDateChanged}/>
 *             );
 *     }
 */

var Calendar = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        //TODO: remove when v1 no longer supported
        id: React.PropTypes.string,
        className: React.PropTypes.string,
        date: React.PropTypes.any.isRequired,
        format: React.PropTypes.string,
        computableFormat: React.PropTypes.string,
        minView: React.PropTypes.oneOf([Views.DAYS, Views.MONTHS, Views.YEARS]),
        //TODO: set as required when v1 no longer supported
        onValueChange: React.PropTypes.func,
        //TODO: remove when v1 no longer supported
        onChange: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        closeOnSelect: React.PropTypes.bool,
        required: React.PropTypes.bool,
        //TODO: remove when v1 no longer supported
        isRequired: React.PropTypes.bool
    },

    getDefaultProps: function () {
        return {
            "data-id": "calendar",
            format: "MM-DD-YYYY",
            computableFormat: "MM-DD-YYYY",
            minView: Views.DAYS,
            closeOnSelect: false,
            required: false
        };
    },

    getInitialState: function () {
        var date = this.props.date ? moment(this.props.date) : null,
            minView = parseInt(this.props.minView, 10);

        return {
            date: date,
            format: this.props.format,
            computableFormat: this.props.computableFormat,
            inputValue: date ? date.format(this.props.format) : null,
            views: ["days", "months", "years"],
            minView: minView,
            currentView: minView || Views.DAYS,
            isVisible: false
        };
    },

    componentWillMount: function () {
        if (this.props.id) {
            Utils.deprecateWarn("id", "data-id");
        }
        if (this.props.onChange) {
            Utils.deprecateWarn("onChange", "onValueChange");
        }
        if (this.props.isRequired) {
            Utils.deprecateWarn("isRequired", "required");
        }
    },

    componentDidMount: function () {
        document.addEventListener("click", this.documentClick);
    },

    componentWillUnmount: function () {
        document.removeEventListener("click", this.documentClick);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({
            date: nextProps.date ? moment(nextProps.date) : this.state.date,
            inputValue: nextProps.date ? moment(nextProps.date).format(this.state.format) : null
        });
    },

    /**
     * [keyDown description]
     * @method Calendar#keydown
     * @param  {Object} e The event object
     */
    keyDown: function (e) {
        _keyDownActions.call(this, e.keyCode);
    },

    /**
     * Increments the currentView state
     * @method Calendar#nextView
     */
    nextView: function () {
        this.setState({
            currentView: this.state.currentView + 1
        });
    },

    /**
     * Decrements the currentView state
     * @method Calendar#prevView
     * @param {?} date [description]
     */
    prevView: function (date) {
        if (this.state.currentView === this.state.minView) {
            this.setState({
                date: date,
                inputValue: date.format(this.state.format),
                isVisible: false
            });

            //TODO: remove when v1 no longer supported
            if (this.props.onChange) {
                this.props.onChange(date.format(this.state.computableFormat));
            }
            if (this.props.onValueChange) {
                this.props.onValueChange(date.format(this.state.computableFormat));
            }

        } else {
            this.setState({
                date: date,
                currentView: this.state.currentView - 1
            });
        }
    },

    /**
     * [setDate description]
     * @method Calendar#setDate
     * @param {?}  date      [description]
     * @param {Boolean} isDayView [description]
     */
    setDate: function (date, isDayView) {
        this.setState({
            date: date,
            inputValue: date.format(this.state.format),
            isVisible: this.props.closeOnSelect && isDayView ? !this.state.isVisible : this.state.isVisible
        });

        //TODO: remove when v1 no longer supported
        if (this.props.onChange) {
            this.props.onChange(date.format(this.state.computableFormat));
        }
        if (this.props.onValueChange) {
            this.props.onValueChange(date.format(this.state.computableFormat));
        }
    },

    /**
     * Sets the inputValue state
     * @method Calendar#changeDate
     * @param  {Object} e The event object
     */
    changeDate: function (e) {
        this.setState({
            inputValue: e.target.value
        });
    },

    /**
     * Handles input blur
     * @method Calendar#inputBlur
     * @param {Object} e The event object
     */
    inputBlur: function (e) {
        //ignore blank inputs to avoid inputBlur setting date to be invalid before setDate can be called
        if (e.target.value === "") {
            return;
        }

        var date = this.state.inputValue,
            newDate = null,
            computableDate = null,
            format = this.state.format;

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

            computableDate = newDate.format(this.state.computableFormat);
        }

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
    },

    // notify document click handler that event originated from calendar elements
    isCalendar: false,

    /**
     * Handles document click
     * @method Calendar#documentClick
     */
    documentClick: function () {
        if (!this.isCalendar) {
            this.setVisibility(false);
        }
        this.isCalendar = false;
    },

    /**
     * Handles calendar click
     * @method Calendar#calendarClick
     * @param  {Object} e The event object
     */
    calendarClick: function (e) {
        e.stopPropagation();
        this.isCalendar = true;
    },

    /**
     * @method Calendar#toggleClick
     */
    toggleClick: function () {
        this.isCalendar = true;
        this.setVisibility();
    },

    /**
     * Sets Visibility
     * @method Calendar#setVisibility
     * @param {?} val [description]
     */
    setVisibility: function (val) {
        var value = val !== undefined ? val : !this.state.isVisible;
        var eventMethod = value ? "addEventListener" : "removeEventListener";
        document[eventMethod]("keydown", this.keyDown);

        this.setState({
            isVisible: value
        });
    },

    render: function () {

        // its ok for this.state.date to be null, but we should never
        // pass null for the date into the calendar pop up, as we want
        // it to just start on todays date if there is no date set
        var calendarDate = this.state.date || moment();

        var view;
        switch (this.state.currentView) {
            case Views.DAYS:
                view = <DaysView date={calendarDate} onSetDate={this.setDate} onNextView={this.nextView} />;
                break;
            case Views.MONTHS:
                view = <MonthsView date={calendarDate} onSetDate={this.setDate} //eslint-disable-line
                                   onNextView={this.nextView} onPrevView={this.prevView} />;
                break;
            case Views.YEARS:
                view = <YearsView date={calendarDate} onSetDate={this.setDate} onPrevView={this.prevView} />;
                break;
        }

        var calendar = !this.state.isVisible ? "" : (
            <div className="input-calendar-wrapper active" onClick={this.calendarClick}>
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
            <div className={className}
                 onClick={this.toggleClick}>
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

});

Calendar.Views = Views;

module.exports = Calendar;
