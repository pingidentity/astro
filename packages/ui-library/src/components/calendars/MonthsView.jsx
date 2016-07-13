var React = require("react");
var classnames = require("classnames");
var moment = require("moment-range");
var Cell = require("./Cell.jsx");
var ViewHeader = require("./ViewHeader.jsx");

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
        this.props.onSetDate(this.props.date.add(1, "years"));
    },

    prev: function () {
        this.props.onSetDate(this.props.date.subtract(1, "years"));
    },

    cellClick: function (e) {
        var month = e.target.innerHTML;
        var date = this.props.date.month(month);
        this.props.onPrevView(date);
    },

    getMonth: function () {
        var now = this.props.date,
            month = now.month();

        return moment.monthsShort().map(function (item, i) {
            return {
                label: item,
                curr: i === month
            };
        });
    },

    render: function () {
        var months = this.getMonth().map(function (item, i) {
            var className = classnames({
                month: true,
                current: item.curr
            });
            return <Cell data-id={"months-cell-" + i} value={item.label} className={className} key={i} />;
        });

        var currentDate = this.props.date.format("YYYY");

        return (
            <div data-id={this.props["data-id"]} className="months-view" >
                <ViewHeader
                    onPrev={this.prev}
                    onNext={this.next}
                    data={currentDate}
                    onClick={this.props.onNextView} />

                <div className="months" onClick={this.cellClick}>{months}</div>
            </div>
        );
    }

});
