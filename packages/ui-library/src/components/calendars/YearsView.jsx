var React = require("react");
var classnames = require("classnames");
var moment = require("moment-range");
var Cell = require("./Cell.jsx");
var ViewHeader = require("./ViewHeader.jsx");

module.exports = React.createClass({

    propTypes: {
        "data-id": React.PropTypes.string,
        date: React.PropTypes.object,
        onSetDate: React.PropTypes.func,
        onPrevView: React.PropTypes.func
    },

    getDefaultProps: function () {
        return {
            "data-id": "years-view"
        };
    },

    years: [],

    next: function () {
        this.props.onSetDate(this.props.date.add(10, "years"));
    },

    prev: function () {
        this.props.onSetDate(this.props.date.subtract(10, "years"));
    },

    rangeCheck: function (currYear) {
        if (this.years.length === 0) {
            return false;
        }

        return this.years[0].label <= currYear && this.years[this.years.length - 1].label >= currYear;
    },

    getYears: function () {
        var now = this.props.date,
            start = now.clone().subtract(5, "year"),
            end = now.clone().add(6, "year"),
            currYear = now.year(),
            items = [],
            inRange = this.rangeCheck(currYear);

        if (this.years.length > 0 && inRange) {
            return this.years;
        }

        moment()
            .range(start, end)
            .by("years", function (year) {
                items.push({
                    label: year.format("YYYY"),
                    curr: currYear === year.year()
                });
            });

        this.years = items;
        return items;
    },

    cellClick: function (e) {
        var year = parseInt(e.target.innerHTML, 10);
        var date = this.props.date.year(year);
        this.props.onPrevView(date);
    },


    render: function () {
        var years = this.getYears();
        var currYear = this.props.date.year();

        var yearsCells = years.map(function (item, i) {
            var className = classnames({
                year: true,
                current: item.label === currYear
            });
            return <Cell data-id={"years-cell-" + i} value={item.label} className={className} key={i} />;
        });

        var currentDate = [years[0].label, years[years.length - 1].label].join("-");

        return (
            <div data-id={this.props["data-id"]} className="years-view">
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    data={currentDate} />
                <div className="years" onClick={this.cellClick}>{yearsCells}</div>
            </div>
        );
    }

});
