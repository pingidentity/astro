var HomePage = require("../HomePage.js"),
    moment = require("moment");

var CalendarDemoPage = Object.create(HomePage, {

    /*
    * @desc this function is to get calendar input field
    */
    calendar: {
        get: function () {
            return this.getElement("//input[@data-id='calendar']");
        }
    },

    /*
    * @desc this function is to click on calendar input field
    */
    clickCalendar: {
        value: function () {
            this.click("//input[@data-id='calendar']");
        }
    },

    /*
    * @desc this function is to change the value of calendar input field
    * @param {string} valueText - date string value
    */
    setValueToCalendar: {
        value: function (valueText) {
            this.calendar.setValue(valueText);
        }
    },

    /*
    * @desc this function is to get calendar table
    * This only return value after clickCalendar function was called.
    */
    calendarWrapper: {
        get: function () {
            return this.getElements("//div[@class='input-calendar-wrapper active']/div[@class='view days-view']");
        }
    },

    /*
    * @desc this function is to click on left arrow icon after calendar table was shown
    */
    clickLeftNavigationIcon: {
        value: function () {
            this.click("//i[@class='fa fa-angle-left icon-left']");
        }
    },

    /*
    * @desc this function is to click on right arrow icon after calendar table was shown
    */
    clickRightNavigationIcon: {
        value: function () {
            this.click("//i[@class='fa fa-angle-right icon-right']");
        }
    },

    /*
    * @desc this function is to return the current date with format: YYYY-MM-DD
    */
    getCurrentDate: {
        value: function () {
            // get current date and format to [YYYY-MM-DD]
            var currentDate = moment().format("YYYY-MM-DD");
            return currentDate;
        }
    },

    /*
    * @desc this function is to return the current month: (1 - 12)
    */
    getCurrentMonth: {
        value: function () {
            var currentMonth = moment().month();
            return currentMonth + 1;
        }
    },

    /**
     * @desc this function is to go to calendar page
     */
    openCalendarDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Components"));
            this.click(this.navComponent("Calendar"));
        }
    }
});

module.exports = CalendarDemoPage;