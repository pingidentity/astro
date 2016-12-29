var HomePage = require("../HomePage.js");
var EditViewModalDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathButtonOpenDefaultModal: {
        get: function () {
            return "//button[@data-id='default-example-button']";
        }
    },

    xpathDialogDefaultModal: {
        get: function () {
            return "//div[@data-id='default-example-modal']";
        }
    },

    /**
     * @desc this function is to check if button Open Default Modal existing
     */
    verifyButtonOpenDefaultModalExisting: {
        value: function () {
            return this.isExisting(this.xpathButtonOpenDefaultModal);
        }
    },

    /**
     * @desc this function is to click on button Open Default Modal
     */
    clickButtonOpenDefaultModal: {

        value: function () {
            this.click(this.xpathButtonOpenDefaultModal);
        }
    },

    /**
     * @desc this function is to wait for Dialog Default Modal exist
     */
    waitForDialogDefaultModalExist: {
        value: function () {
            this.waitForExist("//div[@data-id='default-example-modal']");
        }
    },

    /**
     * @desc this function is to check if Dialog Default Modal existing
     */
    verifyDialogDefaultModalExisting: {
        value: function () {
            return this.isExisting(this.xpathDialogDefaultModal);
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

    /*
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
     * @param {string} inputValue - the address to set
     */
    selectAddressLocation: {
        value: function (valueOption) {
            this.waitForExist("//select[@data-id='addressType-select']");
            this.setDropDownValue("//select[@data-id='addressType-select']", valueOption);
        }
    },

    /**
     * @desc this function is to select Alternate Address Location
     * @param {string} inputValue - the address to set
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
     * @desc this function is to click on icon close of dialog
     */
    clickIconCloseDialog: {
        value: function () {
            this.click("//div[@data-id='default-example-modal']//div/a");
        }
    },

    /**
     * @desc this function is to scroll down the dialog
     * @param {number} number - offset to scroll (pixel)
     */
    scrollDownDialog: {
        value: function (number) {
            this.scrollElementToTop(this.xpathDialogDefaultModal, number);
        }
    },

    /**
     * @desc this function is to click on Cancel button
     */
    clickButtonCancel: {
        value: function () {
            this.click("//button[@data-id='button-bar-cancel']");
        }
    },

    /**
     * @desc this function is to click on Save button
     */
    clickButtonSave: {
        value: function () {
            this.click("//button[@data-id='button-bar-save']");
        }
    },

    /**
     * @desc this function is to open template Edit View Collapsible
     */
    openEditViewModalDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "EditViewModal");
        }
    }
});

module.exports = EditViewModalDemoPage;
