var React = require("react"),
    classnames = require("classnames"),
    moment = require("moment-range");

var DaysView = require("./DaysView.jsx");
var MonthsView = require("./MonthsView.jsx");
var YearsView = require("./YearsView.jsx");
var Utils = require("./Utils");

var _keyDownActions = Utils.keyDownActions;

/**
 * @class Calendar
 * @desc Calendar renders a basic Calendar popup over an input field. It takes a date number that can be used to set the
 *          current date. Coming from Java backend this should be straight forward. To play with this client side
 *          the moment plugin is helpful to convert a Date object to a numeric value.
 *
 *          Credit: Calendar control taken from https://github.com/Rudeg/react-input-calendar
 *          Compatibility: 0.12.2+ compatible, tested against 0.13.3 and still compatible
 *
 * @param {string}   format           - string value of the date format you want to display, e.g. "YYYY-MM-DD"
 * @param {number}   date             - numeric value for the selected date
 * @param {string}   computableFormat - if unsure leave as "x". Refer to moment#formatTokenFunctions for more info.
 * @param {boolean}  closeOnSelect    - close once date is selected
 * @param {function} onChange         - the callback function called when a date is selected
 * @param {string}   id               - the data-id property
 * @param {boolean}  isRequired       - whether the field is required or not (default false)
 * @param {boolean}  className        - additional classes to add to the container element
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
 *                          onChange={this._onEnrollmentDateChanged}/>
 *             );
 *     }
 */

var Calendar = React.createClass({

    propTypes: {
        closeOnSelect: React.PropTypes.bool,
        computableFormat: React.PropTypes.string,
        date: React.PropTypes.any,
        format: React.PropTypes.string,
        id: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        minView: React.PropTypes.number,
        onChange: React.PropTypes.func,
        placeholder: React.PropTypes.string,
        className: React.PropTypes.string
    },

    getDefaultProps: function () {
        return {
            id: "calendar",
            isRequired: false
        };
    },

    getInitialState: function () {
        var date = this.props.date ? moment(this.props.date) : null,
            format = this.props.format || "MM-DD-YYYY",
            minView = parseInt(this.props.minView, 10) || 0,
            computableFormat = this.props.computableFormat || "MM-DD-YYYY";

        return {
            date: date,
            format: format,
            computableFormat: computableFormat,
            inputValue: date ? date.format(format) : null,
            views: ["days", "months", "years"],
            minView: minView,
            currentView: minView || 0,
            isVisible: false
        };
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

            if (this.props.onChange) {
                this.props.onChange(date.format(this.state.computableFormat));
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

        if (this.props.onChange) {
            this.props.onChange(date.format(this.state.computableFormat));
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

        if (this.props.onChange) {
            this.props.onChange(computableDate);
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
            case 0:
                view = <DaysView date={calendarDate} setDate={this.setDate} nextView={this.nextView} />;
                break;
            case 1:
                view = <MonthsView date={calendarDate} setDate={this.setDate} //eslint-disable-line
                                   nextView={this.nextView} prevView={this.prevView} />;
                break;
            case 2:
                view = <YearsView date={calendarDate} setDate={this.setDate} prevView={this.prevView} />;
                break;
        }

        var calendar = !this.state.isVisible ? "" : (
            <div className="input-calendar-wrapper active" onClick={this.calendarClick}>
                {view}
            </div>
        );

        var containerCss = {
            active: this.state.isVisible,
            required: this.props.isRequired,
            "value-entered": !!this.state.inputValue
        };

        return (
            <div className={classnames("input-calendar", this.props.className, containerCss)}
                 onClick={this.toggleClick}>
                <div className="input-container">
                    <input type="text"
                        data-id={this.props.id}
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

module.exports = Calendar;
