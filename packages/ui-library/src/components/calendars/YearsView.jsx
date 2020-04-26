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
        date: PropTypes.object,
        onSetDate: PropTypes.func,
        onPrevView: PropTypes.func
    };

    static defaultProps = {
        "data-id": "years-view"
    };

    years = [];

    next = () => {
        var date = this.props.date.clone().add(10, "years");

        // Get nearest year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "years");
        this.props.onSetDate(date);
    };

    prev = () => {
        var date = this.props.date.clone().subtract(10, "years");

        // Get nearest year that falls in range
        date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "years");
        this.props.onSetDate(date);
    };

    rangeCheck = (currYear) => {
        if (this.years.length === 0) {
            return false;
        }

        return this.years[0].label <= currYear && this.years[this.years.length - 1].label >= currYear;
    };

    getNow = () => {
        const now = moment();
        if (this.props.utcOffset) {
            now.utcOffset(this.props.utcOffset);
        }
        return now;
    }

    getYears = () => {
        var now = this.props.date,
            start = now.clone().subtract(5, "year"),
            end = now.clone().add(6, "year"),
            currYear = now.year(),
            items = [],
            inRange = this.rangeCheck(currYear);

        if (this.years.length > 0 && inRange) {
            return this.years;
        }

        this.getNow()
            .range(start, end)
            .by("years", function (year) {
                items.push({
                    label: year.format("YYYY"),
                    curr: currYear === year.year(),
                    outOfRange: !CalendarUtils.inDateRange(year, this.props.dateRange, "years")
                });
            }.bind(this));

        this.years = items;
        return items;
    };

    cellClick = (e) => {
        var year = parseInt(e.target.innerHTML, 10);
        var date = this.props.date.clone().year(year);
        // Check year falls in range
        if (CalendarUtils.inDateRange(date, this.props.dateRange, "years")) {
            // Get nearest month within year that falls in range
            date = CalendarUtils.getNearestInRange(date, this.props.dateRange, "months");
            this.props.onPrevView(date);
        }
    };

    render() {
        var years = this.getYears();
        var currYear = this.props.date.year();

        var yearsCells = years.map(function (item, i) {
            var className = classnames({
                year: true,
                current: parseInt(item.label) === currYear,
                disabled: item.outOfRange
            });
            return <Cell data-id={"years-cell-" + item.label} value={item.label} className={className} key={i} />;
        });

        var currentDate = [years[0].label, years[years.length - 1].label].join("-");
        const { startDate, endDate } = this.props.dateRange || {};

        return (
            <div data-id={this.props["data-id"]} className="years-view">
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    prevDisabled={startDate && (parseInt(years[0].label) - 1) < startDate.year()}
                    nextDisabled={endDate && (parseInt(years[years.length - 1].label) + 1) > endDate.year()}
                    data={currentDate} />
                <div
                    className="years"
                    onClick={this.cellClick}
                    data-id="years-view_cell"
                >{yearsCells}
                </div>
            </div>
        );
    }
};
