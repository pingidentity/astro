var EditViewCollapsiblePage = require("../../pages/templates/EditViewCollapsiblePage.js");

describe("Edit View Collapsible Integration", function () {

    beforeEach(function () {
        EditViewCollapsiblePage.openEditViewCollapsibleDemoPage();
    });

    afterAll(function (done) {
        EditViewCollapsiblePage.end(done);
    });

    /**
     * SCENARIO: Should expand and collapse all sections
     * GIVEN: Goes to Edit View Collapsible template
     * WHEN: Expands and collapses all section
     * THEN: All sections should be expanded and collapsed correctly
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should expand and collapse all sections ", function () {
        expect(EditViewCollapsiblePage.verifyFirstNameInputExisting()).toBeTruthy();
        //take screenshot and compare
        var generalPageFilename = "TemplatesEditViewCollapsible_GeneralPage";
        expect(EditViewCollapsiblePage.takeScreenshotAndCompare(generalPageFilename)).toBeTruthy();
        //input value for all fields of Identity section
        EditViewCollapsiblePage.setFirstNameValue("First Name");
        EditViewCollapsiblePage.setLastNameValue("Last Name");
        EditViewCollapsiblePage.setUserNameValue("UserName");
        var expandedIdentityFilename = "TemplatesEditViewCollapsible_ExpandedIdentity";
        EditViewCollapsiblePage.clickUserNameInput();
        expect(EditViewCollapsiblePage.takeScreenshotAndCompare(expandedIdentityFilename)).toBeTruthy();
        //collapse Identity section
        EditViewCollapsiblePage.clickIdentitySection();
        //expand Address section
        EditViewCollapsiblePage.clickAddressSection();
        //input value for all fields of Address section
        EditViewCollapsiblePage.scrollDownPage(200);
        EditViewCollapsiblePage.setAddressValue(1, "Address1");
        EditViewCollapsiblePage.setAddressValue(2, "Address2");
        EditViewCollapsiblePage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewCollapsiblePage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewCollapsiblePage.selectAddressLocation("work");
        EditViewCollapsiblePage.selectAlternateAddressLocation("other");
        //take screenshot and compare
        var expandedAddressFilename = "TemplatesEditViewCollapsible_ExpandedAddress";
        expect(EditViewCollapsiblePage.takeScreenshotAndCompare(expandedAddressFilename)).toBeTruthy();
        //collapse Address section
        EditViewCollapsiblePage.clickAddressSection();
        //expanded Miscellaneous section
        EditViewCollapsiblePage.clickMiscellaneousSection();
        //input value for all fields of Miscellaneous section
        EditViewCollapsiblePage.clickUserGroup(2);
        EditViewCollapsiblePage.clickCheckboxActiveUser();
        //take screenshot and compare
        var expandedMiscellaneousFilename = "TemplatesEditViewCollapsible_ExpandedMiscellaneous";
        expect(EditViewCollapsiblePage.takeScreenshotAndCompare(expandedMiscellaneousFilename)).toBeTruthy();
        //collapse Miscellaneous
        EditViewCollapsiblePage.clickMiscellaneousSection();
        EditViewCollapsiblePage.waitForCheckboxActiveUserInvisible();
        //take screenshot and compare
        var collapsedAllSectionsFilename = "TemplatesEditViewCollapsible_CollapsedAllSections";
        expect(EditViewCollapsiblePage.takeScreenshotAndCompare(collapsedAllSectionsFilename)).toBeTruthy();
    });
});

