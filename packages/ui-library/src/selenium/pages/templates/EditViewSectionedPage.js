var HomePage = require("../HomePage.js");
var EditViewSectionedDemoPage = Object.create(HomePage, {


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
     * @param {string} valueOption - value for select box
     */
    selectAddressLocation: {
        value: function (valueOption) { //eslint-disable-line no-unused-vars
            this.waitForExist("//label[@data-id='addressType']");
            this.click("//label[@data-id='addressType']");
            this.click("//label[@data-id='addressType']//li//div[contains(string(), valueOption)]");
        }
    },

    /**
     * @desc this function is to select Alternate Address Location
     * @param {string} valueOption - value for select box
     */
    selectAlternateAddressLocation: {
        value: function (valueOption) { //eslint-disable-line no-unused-vars
            this.waitForExist("//label[@data-id='alternateAddressType']");
            this.click("//label[@data-id='alternateAddressType']");
            this.click("//label[@data-id='alternateAddressType']//li//div[contains(string(), valueOption)]");
        }
    },

    /**
     * @desc this function is to click on User Group
     * @param {number} index - the order of user group
     */
    clickUserGroup: {
        value: function (index) {
            var xPath = "//input[@data-id='radio-btn_{index}']/following-sibling::div";
            this.click(this.formatXpath(xPath, { index: index }));
        }
    },

    /**
     * @desc this function is to click on Checkbox Active User
     */
    clickCheckboxActiveUser: {
        value: function () {
            this.click("//input[@data-id='userActive']/following-sibling::div");
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
     * @desc this function is to click on Save button
     */
    clickButtonSave: {
        value: function () {
            this.click("//input[@value='Save']");
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
     * @desc this function is to open template Edit View Sectioned
     */
    EditViewSectionedDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "EditViewSectioned");
        }
    }
});

module.exports = EditViewSectionedDemoPage;
