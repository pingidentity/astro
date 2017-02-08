var React = require("react");
var classnames = require("classnames");
var moment = require("moment-range");
var Cell = require("./Cell.jsx");
var ViewHeader = require("./ViewHeader.jsx");
var CalendarUtils = require("./Utils.js");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        date: React.PropTypes.object.isRequired,
        onPrevView: React.PropTypes.func,
        onNextView: React.PropTypes.func,
        onSetDate: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "months-view"
        };
    },

    next: function () {
        var date = this.props.date.clone().add(1, "years");

        // Get nearest month within next year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "months");
        this.props.onSetDate(date);
    },

    prev: function () {
        var date = this.props.date.clone().subtract(1, "years");

        // Get nearest month within next year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "months");
        this.props.onSetDate(date);
    },

    cellClick: function (e) {
        var month = e.target.innerHTML;
        var date = this.props.date.clone().month(month);
        // Check month falls in range
        if (CalendarUtils.inDateRange(date, this.props.dateRange, "months")) {
            // Get nearest date within month that falls in range
            date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
            this.props.onPrevView(date);
        }
    },

    getMonth: function () {
        var now = this.props.date,
            month = now.month();

        return moment.monthsShort().map(function (item, i) {
            return {
                label: item,
                curr: i === month,
                outOfRange: !CalendarUtils.inDateRange(now.clone().month(i), this.props.dateRange, "months")
            };
        }.bind(this));
    },

    render: function () {
        var months = this.getMonth().map(function (item, i) {
            var className = classnames({
                month: true,
                current: item.curr,
                disabled: item.outOfRange
            });
            return <Cell data-id={"months-cell-" + i} value={item.label} className={className} key={i} />;
        });

        var currentDate = this.props.date.clone().format("YYYY");
        var start = this.props.dateRange && this.props.dateRange.startDate && moment(this.props.dateRange.startDate);
        var end = this.props.dateRange && this.props.dateRange.endDate && moment(this.props.dateRange.endDate);

        return (
            <div data-id={this.props["data-id"]} className="months-view" >
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    prevDisabled={start && (this.props.date.year() - 1) < start.year()}
                    nextDisabled={end && (this.props.date.year() + 1) > end.year()}
                    data={currentDate}
                    onClick={this.props.onNextView} />

                <div className="months" onClick={this.cellClick}>{months}</div>
            </div>
        );
    }

});
