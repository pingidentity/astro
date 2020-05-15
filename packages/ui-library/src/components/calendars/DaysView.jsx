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

    getNow = () => {
        const now = moment();
        if (this.props.utcOffset) {
            now.utcOffset(this.props.utcOffset);
        }
        return now;
    }

    getDays = () => {
        /* istanbul ignore next  */
        const now = this.props.date ? this.props.date : this.getNow();
        const start = now.clone().startOf("month").day(0);
        const end = now.clone().endOf("month").day(6);
        const month = now.month();
        const today = this.getNow();
        const currDay = now.date();
        const year = now.year();
        const days = [];

        today
            .range(start, end)
            .by("days", (day) => {
                days.push({
                    label: day.format("D"),
                    value: day,
                    prev: (day.month() < month && (day.year() <= year)) || day.year() < year,
                    next: day.month() > month || day.year() > year,
                    curr: day.date() === currDay && day.month() === month,
                    today: day.date() === today.date() && day.month() === today.month(),
                    outOfRange: !CalendarUtils.inDateRange(day, this.props.dateRange)
                });
            });

        return days;
    };

    _getNextDisabled = () => {
        const { endDate } = this.props.dateRange || {};
        if (endDate) {
            // Get the end of the next month relative to the current date
            const currentComparison = CalendarUtils.normalizeTime(
                this.props.date.clone().add(1, "months").date(31)
            );

            // Get the end of the month containing the end date. Have to tack on 5 minutes because
            // isAfter will return true if dates are exactly equal.
            const endComparison = CalendarUtils.normalizeTime(endDate.clone().date(31)).minutes(5);
            return currentComparison.isAfter(endComparison);
        } else {
            return false;
        }
    }

    _getPreviousDisabled = () => {
        const { startDate } = this.props.dateRange || {};
        if (startDate) {
            const currentComparison = CalendarUtils.normalizeTime(
                this.props.date.clone().subtract(1, "months").date(1)
            );

            const startComparison = CalendarUtils.normalizeTime(startDate.clone().date(1)).minutes(-5);
            return currentComparison.isBefore(startComparison);
        } else {
            return false;
        }
    }

    render() {
        const titles = this.getDaysTitles().map(function (item, i) {
            return <Cell data-id={"titles-cell-" + item.val} value={item.label} className="day title" key={i} />;
        });

        const days = this.getDays().map((item, i) => {
            const className = classnames({
                day: true,
                next: item.next,
                prev: item.prev,
                current: item.curr,
                today: item.today,
                disabled: item.outOfRange
            });
            return (
                <Cell
                    data-id={"days-cell-" + item.label}
                    value={item.label}
                    className={className}
                    key={i}
                    onClick={!item.outOfRange ? () => this.props.onSetDate(item.value, true) : undefined}
                />
            );
        });

        /* istanbul ignore next  */
        var currentDate = this.props.date ? this.props.date.clone().format("MMMM") : this.getNow().format("MMMM");

        return (
            <div data-id={this.props["data-id"]} className="view days-view">
                { /* Clone & alter to first & last days to only compare month & year ranges w/o days */ }
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    prevDisabled={this._getPreviousDisabled()}
                    nextDisabled={this._getNextDisabled()}
                    data={currentDate}
                    onClick={this.props.onNextView} />

                <div className="days-title">{titles}</div>
                <div className="days" >{days}</div>
            </div>
        );
    }
};
