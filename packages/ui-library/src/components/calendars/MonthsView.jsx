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
        onPrevView: PropTypes.func,
        onNextView: PropTypes.func,
        onSetDate: PropTypes.func
    };

    static defaultProps = {
        "data-id": "months-view"
    };

    next = () => {
        var date = this.props.date.clone().add(1, "years");

        // Get nearest month within next year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "months");
        this.props.onSetDate(date);
    };

    prev = () => {
        var date = this.props.date.clone().subtract(1, "years");

        // Get nearest month within next year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "months");
        this.props.onSetDate(date);
    };

    cellClick = (e) => {
        var month = e.target.innerHTML;
        var date = this.props.date.clone().month(month);
        // Check month falls in range
        if (CalendarUtils.inDateRange(date, this.props.dateRange, "months")) {
            // Get nearest date within month that falls in range
            date = CalendarUtils.getNearestInRange(date, this.props.dateRange);
            this.props.onPrevView(date);
        }
    };

    getMonth = () => {
        var now = this.props.date,
            month = now.month();

        return moment.monthsShort().map(function (item, i) {
            return {
                label: item,
                curr: i === month,
                outOfRange: !CalendarUtils.inDateRange(now.clone().month(i), this.props.dateRange, "months")
            };
        }.bind(this));
    };

    render() {
        var months = this.getMonth().map(function (item, i) {
            var className = classnames({
                month: true,
                current: item.curr,
                disabled: item.outOfRange
            });
            return <Cell data-id={"months-cell-" + i} value={item.label} className={className} key={i} />;
        });

        var currentDate = this.props.date.clone().format("YYYY");
        const { startDate, endDate } = this.props.dateRange || {};

        return (
            <div data-id={this.props["data-id"]} className="months-view" >
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    prevDisabled={startDate && (this.props.date.year() - 1) < startDate.year()}
                    nextDisabled={endDate && (this.props.date.year() + 1) > endDate.year()}
                    data={currentDate}
                    onClick={this.props.onNextView} />

                <div className="months" onClick={this.cellClick}>{months}</div>
            </div>
        );
    }
};
