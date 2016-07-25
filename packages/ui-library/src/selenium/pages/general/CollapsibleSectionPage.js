var HomePage = require("../HomePage.js");
var CollapsibleSectionDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathTextDetails: {
        get: function () {
            return "//div[@data-id='collapsableSection']/div";
        }
    },

    /**
     * @desc this function is to click on the link Collapsible Title
     */
    clickCollapsibleTitleLink: {
        value: function () {
            this.click("//div[@data-id='collapsableSection']/span[2]");
        }
    },

    /**
     * @desc this function is to check if expanded contents existing
     */
    verifyTextDetailsExisting: {
        value: function () {
            return this.isExisting(this.xpathTextDetails);
        }
    },

    /**
     * @desc this function is to wait for Text Details exist
     */
    waitForTextDetailsExist: {
        value: function () {
            this.waitForExist(this.xpathTextDetails);
        }
    },

    /**
     * @desc this function is to wait for Text Details invisible
     */
    waitForTextDetailsInvisible: {
        value: function () {
            this.waitForVisible(this.xpathTextDetails, this.waitInterval, true);
        }
    },
    
    /**
     * @desc this function open the Collapsible Section page
     */
    openCollapsibleSectionDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Components"));
            this.click(this.navComponent("CollapsibleSectionstateless"));
        }
    }
});
module.exports = CollapsibleSectionDemoPage;