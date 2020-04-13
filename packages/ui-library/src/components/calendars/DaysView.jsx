var PropTypes = require("prop-types");
var React = require("react");
var classnames = require("classnames");
var moment = require("moment-range");
var Cell = require("./Cell");
var ViewHeader = require("./ViewHeader");
var CalendarUtils = require("./Utils.js");

module.exports = class extends React.Component {
    static propTypes = {
        "data-id": PropTypes.string,
        date: PropTypes.object.isRequired,
        onSetDate: PropTypes.func,
        onNextView: PropTypes.func
    };

    static defaultProps = {
        "data-id": "days-view"
    };

    getDaysTitles = () => {
        return moment.weekdaysMin().map(function (item) {
            return {
                val: item,
                label: item
            };
        });
    };

    next = () => {
        var date = this.props.date.clone().add(1, "months");

        // Get nearest date within month that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
        this.props.onSetDate(date);
    };

    prev = () => {
        var date = this.props.date.clone().subtract(1, "months");

        // Get nearest date within month that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
        this.props.onSetDate(date);
    };

    cellClick = (e) => {
        /* istanbul ignore next  */
        var cell = e.target,
            date = parseInt(cell.innerHTML, 10),
            newDate = this.props.date ? this.props.date.clone() : this.getNow();

        /* istanbul ignore if  */
        if (isNaN(date)) {
            return;
        }

        /* istanbul ignore if  */
        if (cell.className.indexOf("prev") > -1) {
            newDate.subtract(1, "months");

        /* istanbul ignore elseif */
        } else if (cell.className.indexOf("next") > -1) {
            /* istanbul ignore next  */
            newDate.add(1, "months");
        }

        newDate.date(date);
        if (CalendarUtils.inDateRange(newDate, this.props.dateRange)) {
            this.props.onSetDate(newDate, true);
        }
    };

    getNow = () => {
        return this.props.utcOffset ? moment().utcOffset(this.props.utcOffset, true) : moment();
    }

    getDays = () => {
        /* istanbul ignore next  */
        var now = this.props.date ? this.props.date : this.getNow(),
            start = now.clone().startOf("month").day(0),
            end = now.clone().endOf("month").day(6),
            month = now.month(),
            today = this.getNow(),
            currDay = now.date(),
            year = now.year(),
            days = [];

        today
            .range(start, end)
            .by("days", function (day) {
                days.push({
                    label: day.format("D"),
                    prev: (day.month() < month && (day.year() <= year)) || day.year() < year,
                    next: day.month() > month || day.year() > year,
                    curr: day.date() === currDay && day.month() === month,
                    today: day.date() === today.date() && day.month() === today.month(),
                    outOfRange: !CalendarUtils.inDateRange(day, this.props.dateRange)
                });
            }.bind(this));

        return days;
    };

    render() {
        var titles = this.getDaysTitles().map(function (item, i) {
            return <Cell data-id={"titles-cell-" + item.val} value={item.label} className="day title" key={i} />;
        });

        var days = this.getDays().map(function (item, i) {
            var className = classnames({
                day: true,
                next: item.next,
                prev: item.prev,
                current: item.curr,
                today: item.today,
                disabled: item.outOfRange
            });
            return <Cell data-id={"days-cell-" + item.label} value={item.label} className={className} key={i} />;
        });

        /* istanbul ignore next  */
        var currentDate = this.props.date ? this.props.date.clone().format("MMMM") : this.getNow().format("MMMM");
        var start = this.props.dateRange && this.props.dateRange.startDate && moment(this.props.dateRange.startDate);
        var end = this.props.dateRange && this.props.dateRange.endDate && moment(this.props.dateRange.endDate);

        return (
            <div data-id={this.props["data-id"]} className="view days-view">
                { /* Clone & alter to first & last days to only compare month & year ranges w/o days */ }
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    prevDisabled={start &&
                        this.props.date.clone().date(1).subtract(1, "months").isBefore(start.date(1))}
                    nextDisabled={end && this.props.date.clone().date(31).add(1, "months").isAfter(end.date(31))}
                    data={currentDate}
                    onClick={this.props.onNextView} />

                <div className="days-title">{titles}</div>
                {
                    /* onMouseDown instead of onClick so cell selection event is caught BEFORE input blur event */
                }
                <div className="days" onMouseDown={this.cellClick} >{days}</div>
            </div>
        );
    }
};
