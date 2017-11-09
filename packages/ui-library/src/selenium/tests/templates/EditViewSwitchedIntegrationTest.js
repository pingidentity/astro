var EditViewSwitchedPage = require("../../pages/templates/EditViewSwitchedPage.js");

describe("Edit View Switched Integration", function () {

    beforeEach(function () {
        EditViewSwitchedPage.openEditViewSwitchedDemoPage();
    });

    afterAll(function (done) {
        EditViewSwitchedPage.end(done);
    });

    /**
     * SCENARIO: Should be clickable all sections and input value into all fields
     * GIVEN: Goes to Edit View Switched template
     * WHEN: Clicks on Identity section
     * AND: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Clicks on Address section
     * AND: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Clicks on Miscellaneous section
     * AND: Selects some options
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should be clickable all sections and input value into all fields", EditViewSwitchedPage.retriable(function () {
        EditViewSwitchedPage.openEditViewSwitchedDemoPage();

        //clicks on Identity section and input data into all fields
        EditViewSwitchedPage.clickIdentitySection();
        EditViewSwitchedPage.setFirstNameValue("First Name");
        EditViewSwitchedPage.setLastNameValue("Last Name");
        EditViewSwitchedPage.setUserNameValue("UserName");
        //take screenshot and compare
        var identitySectionFilename = "TemplatesEditViewSwitched_IdentitySection";
        EditViewSwitchedPage.clickIdentitySection();
        EditViewSwitchedPage.takeScreenshotAndCompare(identitySectionFilename);
        //clicks on Address section and input data into all fields
        EditViewSwitchedPage.clickAddressSection();
        EditViewSwitchedPage.setAddressValue(1, "Address1");
        EditViewSwitchedPage.setAddressValue(2, "Address2");
        EditViewSwitchedPage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewSwitchedPage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewSwitchedPage.selectAddressLocation("work");
        EditViewSwitchedPage.selectAlternateAddressLocation("home");
        //take screenshot and compare
        var addressSectionFilename = "TemplatesEditViewSwitched_AddressSection";
        EditViewSwitchedPage.takeScreenshotAndCompare(addressSectionFilename);
        //Clicks on Miscellaneous section and select some options
        EditViewSwitchedPage.clickMiscellaneousSection();
        EditViewSwitchedPage.clickUserGroup(3);
        EditViewSwitchedPage.clickCheckboxActiveUser();
        //take screenshot and compare
        var miscellaneousSectionFilename = "TemplatesEditViewSwitchedMiscellaneousSection";
        EditViewSwitchedPage.takeScreenshotAndCompare(miscellaneousSectionFilename);
    }));
});
