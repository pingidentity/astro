var HomePage = require("../HomePage.js");

var ToggleDemoPage = Object.create(HomePage, {

    /*
    * @desc this function is to get the toggle div with data-id: toggle
    */
    togglePath: {
        get: function () {
            return "//div[@data-id='toggle']";
        }
    },

    /*
    * @desc this function is to get the calendar div with data-id: userStatus
    */
    status: {
        get: function () {
            return this.getElements("//div[@data-id='userStatus']");
        }
    },

    /**
     * @desc this function is to go to the toggle page
     */
    openToggleDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Forms"));
            this.click(this.navComponent("Toggle"));
        }
    }
});

module.exports = ToggleDemoPage;