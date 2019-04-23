const HomePage = require ("../HomePage.js");
const NotificationsWhitelistDemoPage = Object.create(HomePage, {

    clickToClose: {
        value: function () {
            this.click("//a[@class='expand-btn']");
        }
    },

    clickToOpen: {
        value: function () {
            this.click("//a[@class='expand-btn']");
        }
    },

    clickToggle: {
        value: function () {
            this.click("//div[@class='input-toggle']");
        }
    },

    /**
     * @desc this function is to open template notifications Whitelist User
     */
    openNotificationsWhitelistDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "NotificationsWhitelistUser");
        }
    }
});

module.exports = NotificationsWhitelistDemoPage;
