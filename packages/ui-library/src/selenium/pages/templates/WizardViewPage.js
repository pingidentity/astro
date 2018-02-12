var HomePage = require("../HomePage.js");

var WizardViewPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathButtonNext: {
        get: function () {
            return "//button[@data-id='nextButton']";
        }
    },

    xpathButtonDone: {
        get: function () {
            return "//button[@data-id='button-bar-save']";
        }
    },

    xpathButtonShowWizard: {
        get: function () {
            return "//button[@data-id='showWizard-button']";
        }
    },

    xpathChooseWizardBox: {
        get: function () {
            return "//div[@data-id='choose']";
        }
    },

    xpathInnerContent: {
        get: function () {
            return "//span[@data-id='modal-inner-content']";
        }
    },

    /**
     * @desc this function is to hide message area
     * @private
     * @ignore
     */
    preTakeScreenshot: {
        value: function () {
            this.hideElement("//div[@data-id='messages']");
        }
    },

    /**
     * @desc this function is to show message area
     * @private
     * @ignore
     */
    postTakeScreenshot: {
        value: function () {
            this.showElement("//div[@data-id='messages']");
        }
    },

    /**
     * @desc this function to take element screenshot then compare it with baseline and create diff image
     *      all transitions should have finished by the time this method is called
     * @param {string} fileName - name of screenshot file.
     * @param {string} elementSelector - xpath to element.
     * @throws {ScreenshotComparisonException}
     *    if the current screenshot does not match the baseline
     */
    takeElementScreenshotAndCompare: {
        value: function (filename, elementSelector) {
            this.preTakeScreenshot();
            HomePage.takeElementScreenshotAndCompare(filename, elementSelector);
            this.postTakeScreenshot();
        }
    },

    /**
     * @desc this function is to click on button Show wizard
     */
    clickButtonShowWizard: {
        value: function () {
            this.click(this.xpathButtonShowWizard);
        }
    },

    /**
     * @desc this function is to click on wizard box to make cursor lose
     */
    clickChooseWizardBox: {
        value: function () {
            this.click(this.xpathChooseWizardBox);
        }
    },

    /**
     * @desc this function is to check if choose Wizard box existing
     */
    verifyChooseWizardBoxExisting: {
        value: function () {
            return this.isExisting(this.xpathChooseWizardBox);
        }
    },

    /**
     * @desc this function is to click on option Two Column Step
     */
    clickOptionTwoColumnStep: {
        value: function () {
            this.click("//div[@data-id='step']/div/label[1]/div");
        }
    },

    /**
     * @desc this function is to click on option Form Template
     */
    clickOptionFormTemplate: {
        value: function () {
            this.click("//div[@data-id='step']/div/label[2]/div");
        }
    },

    /**
     * @desc this function is to click on Cancel button
     */
    clickButtonCancel: {
        value: function () {
            this.click("//input[@value='Cancel']");
        }
    },

    /**
     * @desc this function is to click on Cancel button
     */
    clickButtonNext: {
        value: function () {
            this.click(this.xpathButtonNext);
        }
    },

    /**
     * @desc this function is to click on Done button
     */
    clickButtonDone: {
        value: function () {
            this.click(this.xpathButtonDone);
        }
    },

    /**
     * @desc this function is to click on check box "Checkbox without a value" on left of the wizard 1
     */
    clickLeftCheckboxWithoutValue: {
        value: function () {
            var prefixXpath = "//div[@data-id='step']//div[1]";
            this.click(prefixXpath + "//input[@data-id='form-checkbox']/following-sibling::div");
        }
    },

    /**
     * @desc this function is to click on check box "Checkbox without a value" on right of the wizard 1
     */
    clickRightCheckboxWithoutValue: {
        value: function () {
            var prefixXpath = "//div[@data-id='step']/div//div[2]";
            this.click(prefixXpath + "//input[@data-id='form-checkbox']/following-sibling::div");
        }
    },

    /**
     * @desc this function is to click on check box "Checkbox without a value" of the wizard2
     */
    clickCheckboxWithoutValueWizard2: {
        value: function () {
            this.click("//input[@data-id='form-checkbox']/following-sibling::div");
        }
    },

    /**
     * @desc this function is to click on option "First Choice"
     * @param {number} index - the order of option
     */
    clickOptionChoice: {
        value: function (index) {
            var xPath = "//input[@data-id='radio-btn_{index}']/following-sibling::div";
            this.click(this.formatXpath(xPath, { index: index }));
        }
    },

    /**
     * @desc this function is to click on Image upload
     */
    clickImageUpload: {
        value: function () {
            this.click("//input[@data-id='undefined_input']");
        }
    },

    /**
     * @desc this function is to get Text field
     */
    getTextField: {
        get: function () {
            return this.getElement("//div[1]/label/span/input[@data-id='field1-input']");
        }
    },

    /**
     * @desc this function is to set Text Field Value
     * @param {string} inputValue - the value to set
     */
    setTextFieldValue: {
        value: function (inputValue) {
            this.getTextField.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get First part field of line 1
     */
    getFirstPartLine1: {
        get: function () {
            return this.getElement("//div[3]/div[1]/label/span/input[@data-id='field1-input']");
        }
    },

    /**
     * @desc this function is to set First part field Value
     * @param {string} inputValue - the value to set
     */
    setFirstPartLine1Value: {
        value: function (inputValue) {
            this.getFirstPartLine1.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get Second Part field
     */
    getSecondPartLine1: {
        get: function () {
            return this.getElement("//div[1]//input[@data-id='field2-input']");
        }
    },

    /**
     * @desc this function is to set Second Partfield Value
     * @param {string} inputValue - the value to set
     */
    setSecondPartLine1Value: {
        value: function (inputValue) {
            this.getSecondPartLine1.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get Third Part field
     */
    getThirdPartLine1: {
        get: function () {
            return this.getElement("//div[1]//input[@data-id='fieldd-input']");
        }
    },

    /**
     * @desc this function is to set Third Part field Value
     * @param {string} inputValue - the value to set
     */
    setThirdPartLine1Value: {
        value: function (inputValue) {
            this.getThirdPartLine1.setValue(inputValue);
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
     * @desc this function is to get icon step
     * @param {number} index - the order of icon
     * @private
     * @ignore
     */
    iconStep: {
        value: function (index) {
            var xPath = "//div[@data-id='wizard']/div[{index}]//div[@data-id='progress']";
            return this.getElement(this.formatXpath(xPath, { index: index }));
        }
    },

    /**
     * @desc this function is to wait for button Next exist
     */
    waitForNextButtonExist: {
        value: function () {
            this.waitForExist(this.xpathButtonNext, this.waitInterval);
        }
    },

    /**
     * @desc this function is to wait for button Done exist
     */
    waitForDoneButtonExist: {
        value: function () {
            this.waitForExist(this.xpathButtonDone, this.waitInterval);
        }
    },

    /**
     * @desc this function is to scroll down the dialog
     */
    scrollDownDialog: {
        value: function (number) {
            this.scrollElementToTop("//div[@data-id='modal-body']", number);
        }
    },

    /**
     * @desc this function is to wait for Button Show Wizard exist
     */
    waitForShowWizardButtonExist: {
        value: function () {
            this.waitForExist(this.xpathButtonShowWizard, this.waitInterval);
        }
    },

    /**
     * @desc this function is to wait for Choose Wizard Box exist
     */
    waitForChooseWizardBoxExist: {
        value: function () {
            this.waitForExist(this.xpathChooseWizardBox, this.waitInterval);
        }
    },

    /**
     * @desc this function open the Wizard View template
     */
    openWizardViewDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "WizardView");
        }
    }
});

module.exports = WizardViewPage;
