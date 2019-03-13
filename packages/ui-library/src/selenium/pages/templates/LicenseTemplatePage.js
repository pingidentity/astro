var HomePage = require("../HomePage.js");
var LicenseDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to open License template page
     */
    LicenseDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "License");
        }
    }
});

module.exports = LicenseDemoPage;