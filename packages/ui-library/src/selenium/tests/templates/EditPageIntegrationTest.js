var EditPageTemplatePage = require("../../pages/templates/EditPageTemplatePage.js");

describe("Edit Page Sectioned Integration", function () {

    beforeEach(function () {
        EditPageTemplatePage.EditPageDemoPage();
    });

    afterAll(function (done) {
        EditPageTemplatePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to Edit View Sectioned template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should input data into all fields and take screenshot", EditPageTemplatePage.retriable(function () {
        EditPageTemplatePage.EditPageDemoPage();

        //take screenshot and compare
        var generalPageFileName = "TemplatesEditViewSectioned_GeneralPage";
        EditPageTemplatePage.takeScreenshotAndCompare(generalPageFileName);
        //input data into all fields
        EditPageTemplatePage.setFirstNameValue("First Name");
        EditPageTemplatePage.setLastNameValue("Last Name");
        EditPageTemplatePage.setUserNameValue("UserName");
        EditPageTemplatePage.setAddressValue(1, "Address1");
        EditPageTemplatePage.setAddressValue(2, "Address2");
        EditPageTemplatePage.scrollDownPage(800);
        EditPageTemplatePage.setAlternateAddressValue(1, "AlternateAddress1");
        EditPageTemplatePage.setAlternateAddressValue(2, "AlternateAddress2");
        EditPageTemplatePage.selectAddressLocation("work");
        EditPageTemplatePage.selectAlternateAddressLocation("home");
        EditPageTemplatePage.clickUserGroup(2);
        //take screenshot and compare
        var inputDataFilename = "TemplatesEditViewSectioned_InputData";
        EditPageTemplatePage.takeScreenshotAndCompare(inputDataFilename);
    }));
});

