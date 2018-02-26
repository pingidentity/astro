var HomePage = require("../HomePage.js");
var SectionDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathTextDetails1: {
        get: function () {
            return "//div[@data-id='section-content']";
        }
    },

    xpathTextDetails2: {
        get: function () {
            return "//div[@data-id='section-2-content']";
        }
    },

    /**
     * @desc this function is to click on My Section Stateless Link
     */
    clickMySectionStatelessLink: {
        value: function () {
            this.click("//div[contains(text(),'My section Stateless')]");
        }
    },

    /**
     * @desc this function is to click on My section Stateful Link
     */
    clickMySectionStatefulLink: {
        value: function () {
            this.click("//div[contains(text(),'My section Stateful')]");
        }
    },

    /**
     * @desc this function is to check if Text Details existing
     * @param {number} index - order of text detail
     */
    verifyTextDetailsExisting: {
        value: function (index) {
            if (index === 1) {
                return this.isExisting(this.xpathTextDetails1);
            } else if (index === 2) {
                return this.isExisting(this.xpathTextDetails2);
            }
        }
    },

    /**
     * @desc this function is to wait for Text Details invisible
     */
    waitForTextDetail2Visible: {
        value: function () {
            this.waitForVisible(this.xpathTextDetails2, this.waitInterval, false);
        }
    },

    /**
     * @desc this function is to wait for Text Details invisible
     */
    waitForTextDetails2Invisible: {
        value: function () {
            this.waitForVisible(this.xpathTextDetails2, this.waitInterval, true);
        }
    },

    /**
     * @desc this function open the section page
     */
    openSectionDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "General", "Section");
        }
    }
});

module.exports = SectionDemoPage;
