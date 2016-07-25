var CollapsibleLinkPage = require("../../pages/general/CollapsibleLinkPage.js");

describe("Collapsible Link Integration", function () {
    beforeEach(function () {
        CollapsibleLinkPage.openCollapsibleLinkDemoPage();
    });

    afterAll(function (done) {
        CollapsibleLinkPage.end(done);
    });

    /**
     * SCENARIO: should expand and collapse all links normally
     * GIVEN: Goes to component Collapsible Link
     * WHEN: Expands all Links
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Collapses all links
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should expand and collapse all links normally", function () {
        //click on the "Normal link" link
        CollapsibleLinkPage.clickCollapsibleLink(1);
        //verify the expanded contents
        expect(CollapsibleLinkPage.verifyExpandedTextExisting(1)).toBeTruthy();
        //click on the "Collapsed link" link
        CollapsibleLinkPage.clickCollapsibleLink(2);
        //verify the expanded contents
        expect(CollapsibleLinkPage.verifyExpandedTextExisting(2)).toBeTruthy();
        //take screenshot and compare
        CollapsibleLinkPage.waitForExpandedText2Exist();
        var expandedLinksFileName = "ComponentCollapsibleLink_ExpandedLinks";
        expect(CollapsibleLinkPage.takeScreenshotAndCompare(expandedLinksFileName)).toBeTruthy();
        //collapse all link
        CollapsibleLinkPage.clickCollapsibleLink(1);
        CollapsibleLinkPage.clickCollapsibleLink(2);
        //take screenshot and compare
        var collapsedLinksFileName = "ComponentCollapsibleLink_CollapsedLinks";
        expect(CollapsibleLinkPage.takeScreenshotAndCompare(collapsedLinksFileName)).toBeTruthy();
    });
});