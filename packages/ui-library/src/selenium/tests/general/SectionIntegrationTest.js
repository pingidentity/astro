var SectionPage = require("../../pages/general/SectionPage.js");

describe("SectionPage Integration", function () {
    
    beforeEach(function () {
        SectionPage.openSectionDemoPage();
    });

    afterAll(function (done) {
        SectionPage.end(done);
    });

    /**
     * SCENARIO: Should expand and collapse the section
     * GIVEN: Goes to component Section
     * WHEN: Expands all sections
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Collapsed all sections
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should expand and collapse the section", function () {
        SectionPage.clickMySectionStatelessLink();
        //verify the expanded contents
        expect(SectionPage.verifyTextDetailsExisting(1)).toBeTruthy();
        SectionPage.clickMySectionStatefulLink();
        SectionPage.waitForTextDetail2Visible();
        //verify the expanded contents
        expect(SectionPage.verifyTextDetailsExisting(2)).toBeTruthy();
        //take screenshot and compare
        expect(SectionPage.takeScreenshotAndCompare("ComponentSection_ExpandedPage")).toBeTruthy();
        //collapse all section
        SectionPage.clickMySectionStatelessLink();
        SectionPage.clickMySectionStatefulLink();
        SectionPage.waitForTextDetails2Invisible();
        //take screenshot and compare
        expect(SectionPage.takeScreenshotAndCompare("ComponentSection_CollapsedPage")).toBeTruthy();
    });
});