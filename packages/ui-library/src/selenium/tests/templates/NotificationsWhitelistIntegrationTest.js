const NotificationsWhitelistPage = require("../../pages/templates/NotificationsWhitelistPage.js");

describe("Notifications White list", function () {


    beforeAll(function () {
        NotificationsWhitelistPage.openNotificationsWhitelistDemoPage();
    });


    afterAll(function (done) {
        NotificationsWhitelistPage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes t oNotificationsWhiteList template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("general page screenshot", NotificationsWhitelistPage.retriable(function () {

        //take screenshot and compare
        NotificationsWhitelistPage.takeScreenshotAndCompare("NotificationsWhiteList_GeneralPage");

    }));

    it("click to close expandable row",NotificationsWhitelistPage.retriable(function () {
        //take screenshot and compare
        NotificationsWhitelistPage.clickToClose();

        NotificationsWhitelistPage.takeScreenshotAndCompare("NotificationsWhiteList_Expanded-close");

    }));

    it("click to open expandable row",NotificationsWhitelistPage.retriable(function () {
        //take screenshot and compare
        NotificationsWhitelistPage.clickToOpen();

        NotificationsWhitelistPage.takeScreenshotAndCompare("NotificationsWhiteList_Expanded-open");

    }));


    it("clicks Toggle the toggle to change the state" ,NotificationsWhitelistPage.retriable(function () {

        //take screenshot and compare
        NotificationsWhitelistPage.clickToggle();

        NotificationsWhitelistPage.takeScreenshotAndCompare("NotificationsWhiteList_Toggle");

    }));
});