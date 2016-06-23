var HomePage = require("../HomePage.js");

var CollapsibleLinkDemoPage = Object.create(HomePage, {

    firstCollapsibleLinkPath: {
        get: function () {
            return "//*[@data-id='collapsible-link'][1]";
        }
    },

    firstExpandedContentPath: {
        get: function () {
            return "//*[@data-id='collapsible-link'][1]/following-sibling::p[1]";
        }
    },

    secondCollapsibleLinkPath: {
        get: function () {
            return "//*[@data-id='collapsible-link'][2]";
        }
    },

    secondExpandedContentPath: {
        get: function () {
            return "//*[@data-id='collapsible-link'][2]/following-sibling::p[1]";
        }
    },

    /**
     * @desc this function is to go to the Collapsible Link page
     */
    openCollapsibleLinkDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Components"));
            this.click(this.navComponent("CollapsibleLink"));
        }
    }
});

module.exports = CollapsibleLinkDemoPage;