var EditViewSectionedPage = require("../../pages/templates/EditViewSectionedPage.js");

describe("Edit View Sectioned Integration", function () {

    beforeEach(function () {
        EditViewSectionedPage.EditViewSectionedDemoPage();
    });

    afterAll(function (done) {
        EditViewSectionedPage.end(done);
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
    it("should input data into all fields and take screenshot", EditViewSectionedPage.retriable(function () {
        EditViewSectionedPage.EditViewSectionedDemoPage();

        //take screenshot and compare
        var generalPageFileName = "TemplatesEditViewSectioned_GeneralPage";
        EditViewSectionedPage.takeScreenshotAndCompare(generalPageFileName);
        //input data into all fields
        EditViewSectionedPage.setFirstNameValue("First Name");
        EditViewSectionedPage.setLastNameValue("Last Name");
        EditViewSectionedPage.setUserNameValue("UserName");
        EditViewSectionedPage.setAddressValue(1, "Address1");
        EditViewSectionedPage.setAddressValue(2, "Address2");
        EditViewSectionedPage.scrollDownPage(800);
        EditViewSectionedPage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewSectionedPage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewSectionedPage.selectAddressLocation("work");
        EditViewSectionedPage.selectAlternateAddressLocation("home");
        EditViewSectionedPage.clickUserGroup(2);
        EditViewSectionedPage.clickCheckboxActiveUser();
        //take screenshot and compare
        var inputDataFilename = "TemplatesEditViewSectioned_InputData";
        EditViewSectionedPage.takeScreenshotAndCompare(inputDataFilename);
    }));
});

