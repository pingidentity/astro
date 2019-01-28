var NotificationsTemplatePage = require("../../pages/templates/NotificationsTemplatePage.js");

describe("Notifications Template Integration", function () {

    beforeEach(function () {
        NotificationsTemplatePage.openNotificationsDemoPage();
    });


    afterAll(function (done) {
        NotificationsTemplatePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to Notification template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should input data into all fields and take screenshot", NotificationsTemplatePage.retriable(function () {
        NotificationsTemplatePage.openNotificationsDemoPage();

        //take screenshot and compare
        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_GeneralPage");
        //input data into all fields
        NotificationsTemplatePage.setFromAddressValue("pingid@pingidentity.com");
        NotificationsTemplatePage.setFromNameValue("PingID");
        NotificationsTemplatePage.setReplyAddressValue("eric@eric.com");
        NotificationsTemplatePage.setReplyToNameValue("Eric the Enemy");
        NotificationsTemplatePage.setSubjectValue("Pied Piper");

        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_TopContent");

        NotificationsTemplatePage.clickListNavLocation();

        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_NavClick");

        NotificationsTemplatePage.clickDefaultLanguageButton();

        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_DefaultLanguageDropDown");

        NotificationsTemplatePage.clickLanguageButton();

        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_LanguageToolTip");

        NotificationsTemplatePage.clickCancelLanguageButton();
        NotificationsTemplatePage.scrollDownPage(800);
        NotificationsTemplatePage.setEmailBodyValue("<div></div>");
        NotificationsTemplatePage.setSenderIDValue("Tyler");
        NotificationsTemplatePage.setMessageValue("coolest guy ever");

        //take screenshot and compare
        NotificationsTemplatePage.takeScreenshotAndCompare("TemplatesNotifications_InputData");
    }));
});