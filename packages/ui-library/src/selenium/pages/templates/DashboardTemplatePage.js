var HomePage = require("../HomePage.js");
var DashboardDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to scroll to element
     */

    scrollDownToDonutCard: {
        value: function () {
            this.scrollToElement("div", "donut-card");
        }
    },

    scrollDownToHorizontalbarCard: {
        value: function () {
            this.scrollToElement("div", "horizontalBar-card");
        }
    },

    scrollDownToFrequencyCard: {
        value: function () {
            this.scrollToElement("div", "frequency-card");
        }
    },

    scrollDownToMultiseries: {
        value: function () {
            this.scrollToElement("div", "multiseries-chart");
        }
    },

    scrollDownToHeatmap: {
        value: function () {
            this.scrollToElement("div", "heatmap-card");
        }
    },

    /**
     * @desc this function is to open template Dashboard View Sectioned
     */
    openDashboardDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "DashboardLayout");
        }
    }
});

module.exports = DashboardDemoPage;