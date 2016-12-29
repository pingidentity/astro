var EditViewSimplePage = require("../../pages/templates/EditViewSimplePage.js");

describe("Edit View Simple Integration", function () {
    
    beforeEach(function () {
        EditViewSimplePage.openEditViewSimpleDemoPage();
    });

    afterAll(function (done) {
        EditViewSimplePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to Edit View Simple template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should input data into all fields and take screenshot", EditViewSimplePage.retriable(function () {
        EditViewSimplePage.openEditViewSimpleDemoPage();

        //take screenshot and compare
        var generalPageFileName = "TemplatesEditViewSimple_GeneralPage";
        EditViewSimplePage.takeScreenshotAndCompare(generalPageFileName);
        //input data into all fields
        EditViewSimplePage.setFirstNameValue("First Name");
        EditViewSimplePage.setLastNameValue("Last Name");
        EditViewSimplePage.setUserNameValue("UserName");
        EditViewSimplePage.setAddressValue(1, "Address1");
        EditViewSimplePage.setAddressValue(2, "Address2");
        EditViewSimplePage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewSimplePage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewSimplePage.scrollDownPage(800);
        EditViewSimplePage.selectAddressLocation("work");
        EditViewSimplePage.selectAlternateAddressLocation("home");
        EditViewSimplePage.clickUserGroup(2);
        EditViewSimplePage.clickCheckboxActiveUser();
        //take screenshot and compare
        var inputDataFilename = "TemplatesEditViewSimple_InputData";
        EditViewSimplePage.takeScreenshotAndCompare(inputDataFilename);
    }));
});

