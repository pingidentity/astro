const HomePage = require("../HomePage.js");
const SandboxWhitelistDemoPage = Object.create(HomePage, {

    clickAddUser: {
        value: function () {
            this.click("//button[@data-id='button']");
        }
    },

    clickUser: {
        value: function () {
            this.click("//label[@data-id='selectionList-Checkbox-1-container']");
        }
    },

    clickAddButton: {
        value: function () {
            this.click("//button[@data-id='add-button']");
        }
    },

    clickSearchBox: {
        value: function () {
            this.click("//input[@data-id='searchBox-input']");
        }
    },

    getSearchBoxValue: {
        get: function () {
            return this.getElement("//input[@data-id='searchBox-input']");
        }
    },

    setSearchBoxValue: {
        value: function (inputValue) {
            this.getSearchBoxValue.setValue(inputValue);
            this.blurElement();
        }
    },

    clickRemoveButton: {
        value: function () {
            this.click("//button[@class='button minus inline']");
        }
    },

    /**
     * @desc this function is to open template notifications Whitelist User
     */
    openSandboxWhitelistDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "SandboxWhitelist");
        }
    },

});

module.exports = SandboxWhitelistDemoPage;
