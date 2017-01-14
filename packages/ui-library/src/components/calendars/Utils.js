var Const = require("./Constants");
var moment = require("moment-range");

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

        switch (code) {
            case Const.keys.left:
                this.setDate(date.subtract(1, unit));
                break;
            case Const.keys.right:
                this.setDate(date.add(1, unit));
                break;
            case Const.keys.up:
                this.setDate(date.subtract(_viewHelper.upDown, unit));
                break;
            case Const.keys.down:
                this.setDate(date.add(_viewHelper.upDown, unit));
                break;
            case Const.keys.enter:
                if (_viewHelper.prev) {
                    this.prevView(date);
                }

                if (_viewHelper.exit) {
                    this.setState( { isVisible: false } );
                }

                break;
            case Const.keys.esc:
                this.setState( { isVisible: false } );
                break;
        }
    }

};