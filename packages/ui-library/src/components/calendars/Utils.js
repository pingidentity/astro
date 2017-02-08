var Const = require("./Constants");
var moment = require("moment-range");
var KeyboardUtils = require("../../util/KeyboardUtils.js");

var _keyDownViewHelper = [
    {
        prev: false,
        next: true,
        exit: true,
        unit: "day",
        upDown: 7
    },
    {
        prev: true,
        next: true,
        unit: "months",
        upDown: 3
    },
    {
        prev: true,
        next: false,
        unit: "years",
        upDown: 3
    }
];

module.exports = {

    keyDownActions: function (code) {
        var _viewHelper = _keyDownViewHelper[this.state.currentView];
        var unit = _viewHelper.unit;
        // Use today's date if no date given
        var date = this.state.date || moment();
        var newDate;

        switch (code) {
            case Const.keys.left:
                newDate = date.clone().subtract(1, unit);
                break;
            case Const.keys.right:
                newDate = date.clone().add(1, unit);
                break;
            case Const.keys.up:
                newDate = date.clone().subtract(_viewHelper.upDown, unit);
                break;
            case Const.keys.down:
                newDate = date.clone().add(_viewHelper.upDown, unit);
                break;
            case Const.keys.enter:
                if (_viewHelper.prev) {
                    switch (unit) {
                        case "months":
                            newDate = module.exports.getNearestInRange(date, this.props.dateRange);
                            break;
                        case "years":
                            newDate = module.exports.getNearestInRange(date, this.props.dateRange, "months");
                            break;
                    }
                    this.prevView(newDate || date);
                }

                if (_viewHelper.exit) {
                    this.setState( { isVisible: false } );
                }

                break;
            case Const.keys.esc:
                this.setState( { isVisible: false } );
                break;
        }
        if (KeyboardUtils.isArrowKey(code) && module.exports.inDateRange(newDate, this.props.dateRange, unit)) {
            this.setDate(newDate);
        }
    },

    inDateRange: function (date, dateRange, unit) {
        if (!date || !dateRange) {
            return true;
        }
        var current = moment(date),
            start = dateRange.startDate && moment(dateRange.startDate),
            end = dateRange.endDate && moment(dateRange.endDate);

        switch (unit) {
            case "months":
                // Disregard different date of month when comparing months by setting all to 1
                if ((start && current.clone().date(1).isBefore(start.date(1))) ||
                        (end && current.clone().date(1).isAfter(end.date(1)))) {
                    return false;
                }
                break;
            case "years":
                if ((start && current.clone().year() < start.year()) || (end && current.clone().year() > end.year())) {
                    return false;
                }
                break;
            default:
                if ((start && current.isBefore(start)) || (end && current.isAfter(end))) {
                    return false;
                }
                break;
        }
        return true;
    },

    getNearestInRange: function (date, dateRange, unit) {
        if (module.exports.inDateRange(date, dateRange, unit)) {
            return date;
        } else {
            var start = dateRange && dateRange.startDate && moment(dateRange.startDate),
                end = dateRange && dateRange.endDate && moment(dateRange.endDate),
                nearest = date.clone();

            switch (unit) {
                case "months":
                    // Set to nearest month within in the start/end range
                    if (start && (start.year() === date.year())) {
                        nearest = date.month(start.month());
                    } else if (end && (end.year() === date.year())) {
                        nearest = date.month(end.month());
                    }
                    break;
                case "years":
                    // Set to nearest year within in the start/end range
                    if (start && (date.year() < start.year())) {
                        nearest = date.year(start.year());
                    } else if (end && (date.year() > end.year())) {
                        nearest = date.year(end.year());
                    }
                    break;
                default:
                    // Set to nearest month within in the start/end range
                    if (start && (start.month() === date.month())) {
                        nearest = date.date(start.date());
                    } else if (end && (end.month() === date.month())) {
                        nearest = date.date(end.date());
                    }
                    break;
            }
            return nearest;
        }
    }

};