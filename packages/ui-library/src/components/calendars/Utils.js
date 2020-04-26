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

    inDateRange: function (date, { startDate, endDate } = {}, unit) {
        if (!date || (!startDate && !endDate)) {
            return true;
        }
        // The else cases here are only in case somebody outside the library is using
        // this function and not passing a moment object.
        const start = startDate && startDate.clone ? startDate.clone() : moment(startDate);
        const end = endDate && endDate.clone ? endDate.clone() : moment(endDate);

        switch (unit) {
            case "months":
                // Disregard different date of month when comparing months by setting all to 1
                if ((start && date.clone().date(1).isBefore(start.date(1))) ||
                        (end && date.clone().date(1).isAfter(end.date(1)))) {
                    return false;
                }
                break;
            case "years":
                if ((start && date.clone().year() < start.year()) || (end && date.clone().year() > end.year())) {
                    return false;
                }
                break;
            default:
                if ((start && date.isBefore(start)) || (end && date.isAfter(end))) {
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
            const { startDate = {}, endDate = {} } = dateRange || {};
            // The else cases here are only in case somebody outside the library is using
            // this function and not passing a moment object.
            const start = startDate.clone ? startDate.clone() : moment(startDate);
            const end = endDate.clone ? endDate.clone() : moment(endDate);
            let nearest = date.clone();

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