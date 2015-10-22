var React = require('react');
var css = require('classnames');
var moment = require('moment-range');
var Cell = require('./Cell.jsx');
var ViewHeader = require('./ViewHeader.jsx');

module.exports = React.createClass({

    propTypes: {
        date: React.PropTypes.object.isRequired
    },

    next: function () {
        this.props.setDate(this.props.date.add(1, 'years'));
    },

    prev: function () {
        this.props.setDate(this.props.date.subtract(1, 'years'));
    },

    cellClick: function (e) {
        var month = e.target.innerHTML;
        var date = this.props.date.month(month);
        this.props.prevView(date);
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
            var _class = css({
                month: true,
                current: item.curr
            });
            /* jshint ignore:start */
            return <Cell value={item.label} classes={_class} key={i} />;
            /* jshint ignore:end */
        });

        var currentDate = this.props.date.format('YYYY');

        return (
            /* jshint ignore:start */
            <div className="months-view" >
                <ViewHeader
                    prev={this.prev}
                    next={this.next}
                    data={currentDate}
                    titleAction={this.props.nextView} />

                <div className="months" onClick={this.cellClick}>{months}</div>
            </div>
            /* jshint ignore:end */
        );
    }

});
