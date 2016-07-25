var CollapsibleSectionPage = require("../../pages/general/CollapsibleSectionPage.js");

describe("Collapsible Link Integration", function () {
    
    beforeEach(function () {
        CollapsibleSectionPage.openCollapsibleSectionDemoPage();
    });

    afterAll(function (done) {
        CollapsibleSectionPage.end(done);
    });

    /**
     * SCENARIO: Should expand and collapse the section normally
     * GIVEN: Goes to component Collapsible Section
     * WHEN: Expands the section
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * AND: Collapses the section
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should expand and collapse the section normally", function () {
        //click on the "Collapsible Title" link to expand
        CollapsibleSectionPage.clickCollapsibleTitleLink();
        //verify the expanded contents
        CollapsibleSectionPage.waitForTextDetailsExist();
        expect(CollapsibleSectionPage.verifyTextDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        var expandedSectionFileName = "ComponentCollapsibleSection_ExpandedSection";
        expect(CollapsibleSectionPage.takeScreenshotAndCompare(expandedSectionFileName)).toBeTruthy();
        //click on the "Collapsible Title" link to collapse
        CollapsibleSectionPage.clickCollapsibleTitleLink();
        CollapsibleSectionPage.waitForTextDetailsInvisible();
        //take screenshot and compare
        var collapsedSectionFileName = "ComponentCollapsibleSection_CollapsedSection";
        expect(CollapsibleSectionPage.takeScreenshotAndCompare(collapsedSectionFileName)).toBeTruthy();
    });
});