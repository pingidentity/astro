var HomePage = require("../HomePage.js");
var SelectTextDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathTextField: {
        get: function () {
            return "//input[@data-id='form-text-field-input']";
        }
    },

    /**
     * @desc this function is to check if Text Field existing
     */
    verifyTextFieldExisting: {
        value: function () {
            return this.isExisting(this.xpathTextField);
        }
    },

    /**
     * @desc this function is to click on Text field
     */
    clickTextField: {
        value: function () {
            this.click(this.xpathTextField);
        }
    },

    /**
     * @desc this function open the SelectText page
     */
    openSelectTextDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "Misc", "SelectText");
        }
    }
});

module.exports = SelectTextDemoPage;
