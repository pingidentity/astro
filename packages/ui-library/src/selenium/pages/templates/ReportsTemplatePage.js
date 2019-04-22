var HomePage = require("../HomePage.js");
var ReportsDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to select the input values from the reports filter
     */
    clickReportType: {
        value: function () {
            this.click("//input[@name='report-type']");
        }
    },

    //clicks time range dropdown
    clickTimeRange: {
        value: function () {
            this.click("//input[@name='time-range']");
        }
    },

    //clicks unit text dropdown
    clickUnitText: {
        value: function () {
            this.click("//input[@name='time-field']");
        }
    },

    //clicks unit time dropdown
    clickUnitTime: {
        value: function () {
            this.click("//input[@name='unit-time']");
        }
    },

    /**
     * @desc this function is to click on the text filter
     */
    clickFilter: {
        value: function () {
            this.click("//input[@name='filter']");
        }
    },

    /**
     * @desc this function is to get the textfield filter
     */
    getFilter: {
        get: function () {
            return this.getElement("//input[@name='filter']");
        }
    },

    /**
     * @desc this function is to set Filter Value
     * @param {string} inputValue - the Filter to set
     */
    setFilterValue: {
        value: function (inputValue) {
            this.getFilter.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to scroll down the page
     * @param {string} y - the offset to scroll
     */
    scrollDownPage: {
        value: function (y) {
            this.scrollElementToTop("//div[@id='content']", y);
        }
    },


    /**
     * @desc this function open the ReportsTemplate
     */
    openReportsDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "Reports");
        }
    }
});



module.exports = ReportsDemoPage;
