var React = require("re-react");
var classnames = require("classnames");
var moment = require("moment-range");
var Cell = require("./Cell.jsx");
var ViewHeader = require("./ViewHeader.jsx");
var CalendarUtils = require("./Utils.js");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        date: React.PropTypes.object.isRequired.affectsRendering,
        onSetDate: React.PropTypes.func,
        onNextView: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "days-view"
        };
    },

    getDaysTitles: function () {
        return moment.weekdaysMin().map(function (item) {
            return {
                val: item,
                label: item
            };
        });
    },

    next: function () {
        var date = this.props.date.clone().add(1, "months");

        // Get nearest date within month that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
        this.props.onSetDate(date);
    },

    prev: function () {
        var date = this.props.date.clone().subtract(1, "months");

        // Get nearest date within month that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
        this.props.onSetDate(date);
    },

    cellClick: function (e) {
        var cell = e.target,
            date = parseInt(cell.innerHTML, 10),
            newDate = this.props.date ? this.props.date.clone() : moment();

        if (isNaN(date)) {
            return;
        }

        if (cell.className.indexOf("prev") > -1) {
            newDate.subtract(1, "months");
        } else if (cell.className.indexOf("next") > -1) {
            newDate.add(1, "months");
        }

        newDate.date(date);
        if (CalendarUtils.inDateRange(newDate, this.props.dateRange)) {
            this.props.onSetDate(newDate, true);
        }
    },


    getDays: function () {
        var now = this.props.date ? this.props.date : moment(),
            start = now.clone().startOf("month").day(0),
            end = now.clone().endOf("month").day(6),
            month = now.month(),
            today = moment(),
            currDay = now.date(),
            year = now.year(),
            days = [];

        moment()
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
    },

    render: function () {
        var titles = this.getDaysTitles().map(function (item, i) {
            return <Cell data-id={"titles-cell-" + i} value={item.label} className="day title" key={i} />;
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
            return <Cell data-id={"days-cell-" + i} value={item.label} className={className} key={i} />;
        });

        var currentDate = this.props.date ? this.props.date.clone().format("MMMM") : moment().format("MMMM");
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

});