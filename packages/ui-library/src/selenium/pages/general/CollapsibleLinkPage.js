var HomePage = require("../HomePage.js");

var CollapsibleLinkDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathExpandedText: {
        value: function (index) {
            var xPath = "//div[@data-id='collapsible-link-{index}']/following-sibling::p";
            return this.formatXpath(xPath, { index: index });
        }
    },

    /**
     * @desc this function is to click on the link
     * @param {number} index - order of collapsible link
     */
    clickCollapsibleLink: {
        value: function (index) {
            this.click(this.formatXpath("//div[@data-id='collapsible-link-{index}']", { index: index }));
        }
    },

    /**
     * @desc this function is to check if expanded text existing
     * @param {number} index - order of collapsible link
     */
    verifyExpandedTextExisting: {
        value: function (index) {
            return this.isExisting(this.xpathExpandedText(index));
        }
    },

    /**
     * @desc this function is to wait for expaned text 2 displays
     */
    waitForExpandedText2Exist: {
        value: function () {
            this.waitForExist(this.xpathExpandedText(2), this.waitInterval);
        }
    },

    /**
     * @desc this function open the Collapsile Link page
     */
    openCollapsibleLinkDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "Layout", "CollapsibleLink");
        }
    }
});
module.exports = CollapsibleLinkDemoPage;
