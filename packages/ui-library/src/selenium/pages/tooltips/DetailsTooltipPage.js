var HomePage = require("../HomePage.js");
var DetailsTooltipDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathContentPage: {
        get: function () {
            return "//div[@id='content']";
        }
    },

    /**
     * @desc this function is to click the link "With a label (label is passed into component)"
     */
    clickWithALabelLink: {
        value: function () {
            this.click("//a[contains(text(),'With a label')]");
        }
    },

    /**
     * @desc this function is to click the link "Without label (label is outside component)"
     */
    clickWithoutLabelLink: {
        value: function () {
            this.click("//a[contains(text(),'Without label')]");
        }
    },

    /**
     * @desc this function is to click the button "Lable As Button"
     */
    clickLabelAsButton: {
        value: function () {
            this.click("//button[contains(text(), 'Label as button')]");
        }
    },

    /**
     * @desc this function is to click the link "Open by default"
     */
    clickOpenByDefaultLink: {
        value: function () {
            this.click("//a[contains(text(),'Open by default')]");
        }
    },

    /**
     * @desc this function is to click the link "With alert styling"
     */
    clickWithAlertStylingLink: {
        value: function () {
            this.click("//a[contains(text(),'With alert styling')]");
        }
    },

    /**
     * @desc this function is to click the link "Stateful tooltip"
     */
    clickStatefulTooltipLink: {
        value: function () {
            this.click("//a[contains(text(),'Stateful tooltip')]");
        }
    },

    /**
     * @desc this function is to check if details tooltip existing
     */
    verifyTooltipDetailsExisting: {
        value: function () {
            return this.isExisting("//div[@data-id='details-body']");
        }
    },

    /**
     * @desc this function is to click the confirm button
     */
    clickConfirmButton: {
        value: function () {
            this.click("//button[@data-id='confirm-action']");
        }
    },

    /**
     * @desc this function is to click cancel button
     */
    clickCancelButton: {
        value: function () {
            this.click("//div[@data-id='delete-confirmation']/a");
        }
    },

    /**
     * @desc this function is to click icon close
     */
    clickIconCloseTooltip: {
        value: function () {
            this.click("//span[@data-id='details-close']");
        }
    },

    /**
     * @desc this function is to scroll page to top
     */
    scrollPage: {
        value: function () {
            this.scrollElementToTopSync(this.xpathContentPage, 10);
            this.waitForExist(this.xpathContentPage);
        }
    },

    /**
     * @desc this function open the details tooltip page
     */
    openDetailsTooltipDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "ModalsTooltips", "DetailsTooltip");
        }
    }
});
module.exports = DetailsTooltipDemoPage;
