var CollapsibleLinkDemoPage = require("../../pages/general/CollapsibleLinkDemoPage.js");
var ScreenshotUtils = require("../../../util/ScreenshotUtils.js");

// Should provide the link to test plan on Confluence
describe("Collapsible Link Page", function () {
    afterAll(function (done) {
        CollapsibleLinkDemoPage.end(done);
    });

    it("Collapsible Link should toggle new title", function () {
        CollapsibleLinkDemoPage.openCollapsibleLinkDemoPage();
        var collapsibleLink = CollapsibleLinkDemoPage.getElement(CollapsibleLinkDemoPage.secondCollapsibleLinkPath);
        CollapsibleLinkDemoPage.click(CollapsibleLinkDemoPage.secondCollapsibleLinkPath);
        expect(collapsibleLink.getText()).toEqual("Expanded link");

        // ignore custom element
        CollapsibleLinkDemoPage.hideElement(CollapsibleLinkDemoPage.secondExpandedContentPath);

        // wait for hiding element
        CollapsibleLinkDemoPage.waitForVisible(CollapsibleLinkDemoPage.secondExpandedContentPath, 100 , true);

        // take screenshot and compare
        expect(ScreenshotUtils.takeScreenShotAndCompareWithBaseline("Collapsible-Link-01", 0)).toBeTruthy();
    });

    it("Collapsible Link should not toggle new title if there is not toggledTitle", function () {
        CollapsibleLinkDemoPage.openCollapsibleLinkDemoPage();
        var collapsibleLink = CollapsibleLinkDemoPage.getElement(CollapsibleLinkDemoPage.firstCollapsibleLinkPath);
        CollapsibleLinkDemoPage.click(CollapsibleLinkDemoPage.firstCollapsibleLinkPath);
        expect(collapsibleLink.getText()).toEqual("Normal link");

        // ignore custom element
        CollapsibleLinkDemoPage.hideElement(CollapsibleLinkDemoPage.firstExpandedContentPath);

        // wait for hiding element
        CollapsibleLinkDemoPage.waitForVisible(CollapsibleLinkDemoPage.firstExpandedContentPath, 100 , true);

        // take screenshot
        ScreenshotUtils.takeScreenshotAndSaveToCurrentPath("Collapsible-Link-02");

        // compare screenshot
        expect(ScreenshotUtils.compareScreenshotWithBaseline("Collapsible-Link-02", 0)).toBeTruthy();
    });


});