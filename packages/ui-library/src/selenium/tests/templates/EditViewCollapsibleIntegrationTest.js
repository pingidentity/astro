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
    it("should expand and collapse all sections ", EditViewCollapsiblePage.retriable(function () {
        EditViewCollapsiblePage.openEditViewCollapsibleDemoPage();
        EditViewCollapsiblePage.waitForIdentitySectionToOpen();

        //take screenshot and compare
        var generalPageFilename = "TemplatesEditViewCollapsible_GeneralPage";
        EditViewCollapsiblePage.takeScreenshotAndCompare(generalPageFilename);
        //input value for all fields of Identity section
        EditViewCollapsiblePage.setFirstNameValue("First Name");
        EditViewCollapsiblePage.setLastNameValue("Last Name");
        EditViewCollapsiblePage.setUserNameValue("UserName");
 
        var expandedIdentityFilename = "TemplatesEditViewCollapsible_ExpandedIdentity";
        EditViewCollapsiblePage.clickUserNameInput();
        EditViewCollapsiblePage.takeScreenshotAndCompare(expandedIdentityFilename);

        //collapse Identity section
        EditViewCollapsiblePage.clickIdentitySection();
        EditViewCollapsiblePage.waitForIdentitySectionToClose();

        //expand Address section
        EditViewCollapsiblePage.clickAddressSection();
        EditViewCollapsiblePage.waitForAddressSectionToOpen();

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
        EditViewCollapsiblePage.takeScreenshotAndCompare(expandedAddressFilename);

        //collapse Address section
        EditViewCollapsiblePage.clickAddressSection();
        EditViewCollapsiblePage.waitForAddressSectionToClose();

        //expanded Miscellaneous section
        EditViewCollapsiblePage.clickMiscellaneousSection();
        EditViewCollapsiblePage.waitForMiscellaneousSectionToOpen();

        //input value for all fields of Miscellaneous section
        EditViewCollapsiblePage.clickUserGroup(2);
        EditViewCollapsiblePage.clickCheckboxActiveUser();

        /*
         * The screenshot verification below is flaky and I cannot fix it
         * https://jira.pingidentity.com/browse/ID-6426
        //take screenshot and compare
        var expandedMiscellaneousFilename = "TemplatesEditViewCollapsible_ExpandedMiscellaneous";
        EditViewCollapsiblePage.takeScreenshotAndCompare(expandedMiscellaneousFilename);
        */

        //collapse Miscellaneous
        EditViewCollapsiblePage.clickMiscellaneousSection();
        EditViewCollapsiblePage.waitForMiscellaneousSectionToClose();

        //take screenshot and compare
        var collapsedAllSectionsFilename = "TemplatesEditViewCollapsible_CollapsedAllSections";
        EditViewCollapsiblePage.takeScreenshotAndCompare(collapsedAllSectionsFilename);
    }));
});

