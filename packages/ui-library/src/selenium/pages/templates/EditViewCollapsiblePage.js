var HomePage = require("../HomePage.js");
var EditViewCollapsibleDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathCheckboxActiveUser: {
        get: function () {
            return "//label[@data-id='userActive-container']";
        }
    },

    xpathIdentitySectionOpen: {
        get: function () {
            return "//div[contains(@class,'open')][@data-id='identity-section-title']";
        }
    },

    xpathIdentitySectionClosed: {
        get: function () {
            return "//div[not(contains(@class,'open'))][@data-id='identity-section-title']";
        }
    },

    xpathAddressSectionOpen: {
        get: function () {
            return "//div[contains(@class,'open')][@data-id='address-section-title']";
        }
    },

    xpathAddressSectionClosed: {
        get: function () {
            return "//div[not(contains(@class,'open'))][@data-id='address-section-title']";
        }
    },

    xpathMiscellaneousSectionOpen: {
        get: function () {
            return "//div[contains(@class,'open')][@data-id='miscellaneous-section-title']";
        }
    },

    xpathMiscellaneousSectionClosed: {
        get: function () {
            return "//div[not(contains(@class,'open'))][@data-id='miscellaneous-section-title']";
        }
    },

    /**
     * @desc this function is to click on button toggle
     */
    clickButtonToggle: {
        value: function () {
            this.click("//div[@data-id='toggle']");
        }
    },

    /**
     * @desc this function is to get button toggle is selected
     */
    getSelectedButtonToggle: {
        get: function () {
            return this.getElement("//div[contains(@class,'selected')][@data-id='toggle']");
        }
    },

    /**
     * @desc this function is to click on Identity Section
     */
    clickIdentitySection: {
        value: function () {
            this.click("//div[@data-id='identity-section-title']");
        }
    },

    waitForIdentitySectionToOpen: {
        value: function () {
            this.waitForExist(this.xpathIdentitySectionOpen);
            this.waitForVisible("//input[@data-id='firstName-input']");
        }
    },

    waitForIdentitySectionToClose: {
        value: function () {
            this.waitForExist(this.xpathIdentitySectionClosed);
            this.waitForVisible("//input[@data-id='firstName-input']", false);
        }
    },

    /**
     * @desc this function is to click on Address Section
     */
    clickAddressSection: {
        value: function () {
            this.click("//div[@data-id='address-section-title']");
        }
    },

    waitForAddressSectionToOpen: {
        value: function () {
            this.waitForExist(this.xpathAddressSectionOpen);
            this.waitForExist("//select[@data-id='addressType-select']");
        }
    },

    waitForAddressSectionToClose: {
        value: function () {
            this.waitForExist(this.xpathAddressSectionClosed);
            this.waitForExist("//select[@data-id='addressType-select']", false);
        }
    },

    /**
     * @desc this function is to click on Miscellaneous Section
     */
    clickMiscellaneousSection: {
        value: function () {
            this.click("//div[@data-id='miscellaneous-section-title']");
        }
    },

    waitForMiscellaneousSectionToOpen: {
        value: function () {
            this.waitForExist(this.xpathMiscellaneousSectionOpen);
            this.waitForVisible(this.xpathCheckboxActiveUser);
        }
    },

    waitForMiscellaneousSectionToClose: {
        value: function () {
            this.waitForExist(this.xpathMiscellaneousSectionClosed);
            this.waitForVisible(this.xpathCheckboxActiveUser, false);
        }
    },

    /**
     * @desc this function is to get Expanded Identity Section
     */
    getExpandedIdentitySection: {
        get: function () {
            return this.getElement("//div[contains(@class,'open')][@data-id='identity-section-title']");
        }
    },

    /**
     * @desc this function is to get Expanded Address Section
     */
    getExpandedAddressSection: {
        get: function () {
            return this.getElement("//div[contains(@class,'open')][@data-id='address-section-title']");
        }
    },

    /**
     * @desc this function is to get Expanded Miscellaneous Section
     */
    getExpandedMiscellaneousSection: {
        get: function () {
            var e = "//div[contains(@class,'open')][@data-id='miscellaneous-section-title']";
            return this.getElement(e);
        }
    },

    /**
     * @desc this function is to check if First Name input existing
     */
    verifyFirstNameInputExisting: {
        value: function () {
            return this.isExisting("//input[@data-id='firstName-input']");
        }
    },

    /**
     * @desc this function is to get First Name
     */
    getFirstName: {
        get: function () {
            return this.getElement("//input[@data-id='firstName-input']");
        }
    },

    /**
     * @desc this function is to set FirstName Value
     * @param {string} inputValue - the firstname to set
     */
    setFirstNameValue: {
        value: function (inputValue) {
            this.getFirstName.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get Last Name
     */
    getLastName: {
        get: function () {
            return this.getElement("//input[@data-id='lastName-input']");
        }

    },

    /**
     * @desc this function is to set Last Name Value
     * @param {string} inputValue - the lastname to set
     */
    setLastNameValue: {
        value: function (inputValue) {
            this.getLastName.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get UserName
     */
    getUserName: {
        get: function () {
            return this.getElement("//input[@data-id='username-input']");
        }
    },

    /**
     * @desc this function is to set userName Value
     * @param {string} inputValue - the username to set
     */
    setUserNameValue: {
        value: function (inputValue) {
            this.getUserName.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to click userName input
     */
    clickUserNameInput: {
        value: function () {
            this.click("//input[@data-id='username-input']");
        }
    },

    /**
     * @desc this function is to get Address
     * @param {number} index - the order of address field
     * @private
     * @ignore
     */
    getAddress: {
        value: function (index) {
            return this.getElement(this.formatXpath("//input[@data-id='address{index}-input']", { index: index }));
        }
    },

    /**
     * @desc this function is to set Address Value
     * @param {number} index - the order of address field
     * @param {string} inputValue - the address to set
     */
    setAddressValue: {
        value: function (index, inputValue) {
            this.getAddress(index).setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get AlternateAddress
     * @param {number} index - the order of address field
     * @private
     * @ignore
     */
    getAlternateAddress: {
        value: function (index) {
            var xPath = "//input[@data-id='alternateAddress{index}-input']";
            return this.getElement(this.formatXpath(xPath, { index: index }));
        }
    },

    /**
     * @desc this function is to set AlternateAddress Value
     * @param {number} index - the order of address field
     * @param {string} inputValue - the address to set
     */
    setAlternateAddressValue: {
        value: function (index, inputValue) {
            this.getAlternateAddress(index).setValue(inputValue);
        }
    },

    /**
     * @desc this function is to select Address Location
     * @param {string} valueOption - the value to set to select
     */
    selectAddressLocation: {
        value: function (valueOption) {
            this.waitForExist("//select[@data-id='addressType-select']");
            this.setDropDownValue("//select[@data-id='addressType-select']", valueOption);
        }
    },

    /**
     * @desc this function is to select Alternate Address Location
     * @param {string} valueOption - the value to set to select
     */
    selectAlternateAddressLocation: {
        value: function (valueOption) {
            this.waitForExist("//select[@data-id='alternateAddressType-select']");
            this.setDropDownValue("//select[@data-id='alternateAddressType-select']", valueOption);
        }
    },

    /**
     * @desc this function is to click on User Group
     * @param {number} index - the order of user group
     */
    clickUserGroup: {
        value: function (index) {
            this.waitForExist(this.formatXpath("//label[@data-id='radio-btn_label_{index}']", { index: index }));
            this.click(this.formatXpath("//label[@data-id='radio-btn_label_{index}']", { index: index }));
        }
    },

    /**
     * @desc this function is to click on Checkbox Active User
     */
    clickCheckboxActiveUser: {
        value: function () {
            this.click(this.xpathCheckboxActiveUser);
        }
    },

    /**
     * @desc this function is to scroll down the page
     * @param {number} y position(pixel)
     */
    scrollDownPage: {
        value: function (y) {
            this.scrollElementToTop("//div[@id='content']", y);
        }
    },

    /**
     * @desc this function is to wait for Checkbox Active User invisible
     */
    waitForCheckboxActiveUserInvisible: {
        value: function () {
            this.waitForVisible(this.xpathCheckboxActiveUser, this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to open template Edit View Collapsible
     */
    openEditViewCollapsibleDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "EditViewCollapsible");
        }
    }
});

module.exports = EditViewCollapsibleDemoPage;
