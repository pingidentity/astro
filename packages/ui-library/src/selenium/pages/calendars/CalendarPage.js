var HomePage = require("../HomePage.js"),
    moment = require("moment");

var CalendarDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of element
     */
    xpathCalendar: {
        get: function () {
            return "//input[@data-id='calendar']";
        }
    },

    xpathCalendarWrapper: {
        get: function () {
            return "//input[@data-id='calendar']/../following-sibling::div";
        }
    },

    xpathLeftNavigationIcon: {
        get: function () {
            return "//input[@data-id='calendar']/../following-sibling::div//i[1]";
        }
    },

    xpathRightNavigationIcon: {
        get: function () {
            return "//input[@data-id='calendar']/../following-sibling::div//span[3]/i";
        }
    },

    /**
     * @desc this function is to get calendar input field
     * @private
     * @ignore
     */
    getCalendarField: {
        get: function () {
            return this.getElement(this.xpathCalendar);
        }
    },

    /**
     * @desc this function is to check if calendar input field existing
     */
    verifyCalendarFieldExisting: {
        value: function () {
            return this.isExisting(this.xpathCalendar);
        }
    },

    /**
     * @desc this function is to click on calendar input field
     */
    clickCalendarField: {
        value: function () {
            this.click(this.xpathCalendar);

            // wait until wrapper exist
            this.waitForCalendarWrapperExist();
        }
    },

    /**
     * @desc this function is to change the value of calendar input field
     * @param {string} valueText - date value to set
     */
    setValueToCalendar: {
        value: function (valueText) {
            this.getCalendarField.setValue(valueText);

            // wait until wrapper refresh value
            this.waitUntilWrapperRefreshValue();

            this.blurElement();
        }
    },

    /**
     * @desc this function is to wait for the wrapper to refresh the value until it has selected day equals to given day
     */
    waitUntilWrapperRefreshValue: {
        value: function () {
            this.waitForCondition(function () {
                this.click("//h1[@data-id='component-title']");
                this.click(this.xpathCalendar);
                this.waitForCalendarWrapperExist();

                var daysCell25 = this.getElement("//div[@data-id='days-cell-25']");

                return "20" === daysCell25.getText();
            }.bind(this), 500, 100, 100);
        }
    },

    /**
     * @desc this function is to get value of calendar field
     */
    getValueOfCalendar: {
        value: function () {
            return this.getCalendarField.getValue();
        }
    },

    /**
     * @desc this function is to check if calendar wrapper is existing
     * This only return value after clickCalendar function was called.
     */
    verifyCalendarWrapperExisting: {
        value: function () {
            return this.isExisting(this.xpathCalendarWrapper);
        }
    },

    /**
     * @desc this function is to click on left arrow icon after calendar table was shown
     */
    clickLeftNavigationIcon: {
        value: function () {
            this.click(this.xpathLeftNavigationIcon);
        }
    },

    /**
     * @desc this function is to click on right arrow icon after calendar table was shown
     */
    clickRightNavigationIcon: {
        value: function () {
            this.click(this.xpathRightNavigationIcon);
        }
    },

    /**
     * @desc this function is to return the current date with format: YYYY-MM-DD
     */
    getCurrentDate: {
        value: function () {
            var currentDate = moment().format("YYYY-MM-DD");
            return currentDate;
        }
    },

    /**
     * @desc this function is to return the current month: (1 - 12)
     */
    getCurrentMonth: {
        value: function () {
            var currentMonth = moment().month();
            return currentMonth + 1;
        }
    },

    /**
     * @desc this function is to return the month of a given date: (1 - 12)
     */
    getMonthByDate: {
        value: function (date) {
            // use moment(date) and not new Date(date), for moment is tz aware;
            // Date is not and will use UTC as timezone instead of local
            var currentMonth = moment(date).month();
            return currentMonth + 1;
        }
    },

    /**
     * @desc this function is to wait for Calendar wrapper exist
     */
    waitForCalendarWrapperExist: {
        value: function () {
            this.waitForExist(this.xpathCalendarWrapper);
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
