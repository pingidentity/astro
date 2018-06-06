var HomePage = require("../HomePage.js");
var WizardDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathPulsingCheckBox: {
        get: function () {
            return "//input[@data-id='form-checkbox']/following-sibling::div";
        }
    },

    xpathCancelButton: {
        get: function () {
            return "//input[@value='cancel']";
        }
    },

    xpathNextButton: {
        get: function () {
            return "//button[@data-id='nextButton']";
        }
    },

    xpathDoneButton: {
        get: function () {
            return "//button[@data-id='button-bar-save']";
        }
    },

    xpathWizardCheckbox: {
        get: function () {
            return "//label[@data-id='choose{index}']";
        }
    },

    xpathLinkEditStep: {
        get: function () {
            return "//div[@data-id='{name}']//div[@data-id='progress']/following-sibling::a";
        }
    },

    xpathLinkEditStep3: {
        get: function () {
            return "//div[@data-id='wizard']/div[2]//div[@data-id='progress']/following-sibling::a";
        }
    },

    xpathDoneButtonPulsing: {
        get: function () {
            return "//button[contains(@class,'loading')][@data-id='button-bar-save']";
        }
    },

    xpathNextButtonPulsing: {
        get: function () {
            return "//button[contains(@class,'loading')][@data-id='nextButton']";
        }
    },

    /**
     * @desc this function is to check if check box Pulsing existing
     */
    verifyPulsingCheckboxExisting: {
        value: function () {
            return this.isExisting(this.xpathPulsingCheckBox);
        }
    },

    /**
     * @desc this function is to click check box Pulsing
     */
    clickPulsingCheckbox: {
        value: function () {
            this.click(this.xpathPulsingCheckBox);
        }
    },

    /**
     * @desc this function is to click button Cancel
     */
    clickCancelButton: {
        value: function () {
            this.click(this.xpathCancelButton);
        }
    },

    /**
     * @desc this function is to select checkbox Wizard
     * @param {number} index - the order of Wizard
     */
    selectWizardCheckbox: {
        value: function (index) {
            this.click(this.formatXpath(this.xpathWizardCheckbox, { index: index }));
        }
    },

    /**
     * @desc this function is to click button Next
     */
    clickNextButton: {
        value: function () {
            this.click(this.xpathNextButton);
        }
    },

    /**
     * @desc this function is to check if icon step 2 existing
     */
    verifyIconStep2Existing: {
        value: function () {
            return this.isExisting("//div[@data-id='wizard']//div[@data-id='progress']");
        }
    },

    /**
     * @desc this function is to check if icon step 3 existing
     */
    verifyIconStep3Existing: {
        value: function () {
            return this.isExisting("//div[@data-id='wizard']/div[2]//div[@data-id='progress']");
        }
    },

    /**
     * @desc this function is to check if icon step 4 existing
     */
    verifyIconStep4Existing: {
        value: function () {
            return this.isExisting("//div[@data-id='wizard']/div[3]//div[@data-id='progress']");
        }
    },

    /**
     * @desc this function is to click on button Done
     */
    clickDoneButton: {
        value: function () {
            this.click(this.xpathDoneButton);
        }
    },

    /**
     * @desc this function is to check if button Done has Pulsing existing
     */
    verifyDoneButtonPulsingExisting: {
        value: function () {
            return this.isExisting(this.xpathDoneButtonPulsing);
        }
    },

    /**
     * @desc this function is to wait for Done Button Pulsing invisible
     */
    waitForDoneButtonPulsingInvisible: {
        value: function () {
            this.waitForVisible(this.xpathDoneButtonPulsing, this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to wait for Next Button Pulsing invisible
     */
    waitForNextButtonPulsingInvisible: {
        value: function () {
            this.waitForVisible(this.xpathNextButtonPulsing, this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to check if button Next has Pulsing existing
     */
    verifyNextButtonPulsingExisting: {
        value: function () {
            return this.isExisting(this.xpathNextButtonPulsing);
        }
    },

    /**
     * @desc this function is to check if link Edit of step 1 existing
     */
    verifyLinkEditStep1Existing: {
        value: function () {
            return this.isExisting(this.formatXpath(this.xpathLinkEditStep, { name: "choose" }));
        }
    },

    /**
     * @desc this function is to check if link Edit of step 2 existing
     */
    verifyLinkEditStep2Existing: {
        value: function () {
            return this.isExisting(this.formatXpath(this.xpathLinkEditStep, { name: "wizard" }));
        }
    },

    /**
     * @desc this function is to check if link Edit of step 3 existing
     */
    verifyLinkEditStep3Existing: {
        value: function () {
            return this.isExisting(this.xpathLinkEditStep3);
        }
    },

    /**
     * @desc this function is to click on link Edit of step 1
     */
    clickLinkEditStep1: {
        value: function () {
            this.click(this.formatXpath(this.xpathLinkEditStep, { name: "choose" }));
        }
    },

    /**
     * @desc this function is to click on link Edit of step 2
     */
    clickLinkEditStep2: {
        value: function () {
            this.click(this.formatXpath(this.xpathLinkEditStep, { name: "wizard" }));
        }
    },

    /**
     * @desc this function is to click on link Edit of step 3
     */
    clickLinkEditStep3: {
        value: function () {
            this.click(this.xpathLinkEditStep3);
        }
    },

    /**
     * @desc this function is to wait for button Next exist
     */
    waitForNextButtonExist: {
        value: function () {
            this.waitForExist(this.xpathNextButton, this.waitInterval);
        }
    },

    /**
     * @desc this function is to wait for button Done exist
     */
    waitForDoneButtonExist: {
        value: function () {
            this.waitForExist(this.xpathDoneButton, 10000);
        }
    },

    /**
     * @desc this function is to open the Wizard component
     */
    openWizardDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "ModalsTooltips", "Wizard");
        }
    }
});

module.exports = WizardDemoPage;
