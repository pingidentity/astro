var DetailsTooltipPage = require("../../pages/tooltips/DetailsTooltipPage.js");

describe("DetailsTooltipPage Integration", function () {

    beforeEach(function () {
        DetailsTooltipPage.openDetailsTooltipDemoPage();
    });

    afterAll(function (done) {
        DetailsTooltipPage.end(done);
    });

    /**
     * SCENARIO: Should have the details tooltip when clicking on each link
     * GIVEN: Goes to component Details Tooltip
     * WHEN: Clicks on each links and buttons on the page
     * THEN: The detail tooltip should display
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have the details tooltip when clicking on each link", DetailsTooltipPage.retriable(function () {
        DetailsTooltipPage.openDetailsTooltipDemoPage();
        DetailsTooltipPage.scrollElementToTop("//div[@id='content']", 300);
        DetailsTooltipPage.clickOutside();

        //click on the link "With a label (label is passed into component)"
        DetailsTooltipPage.clickWithALabelLink();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip1");
        DetailsTooltipPage.clickIconCloseTooltip();
        //click on link "Without label (label is outside component)"
        DetailsTooltipPage.clickWithoutLabelLink();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip2");
        DetailsTooltipPage.clickConfirmButton();
        //click on button "Label as button"
        DetailsTooltipPage.clickLabelAsButton();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip3");
        DetailsTooltipPage.clickCancelButton();
        //click on link "Open by default"
        DetailsTooltipPage.clickOpenByDefaultLink();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip4");
        DetailsTooltipPage.clickConfirmButton();
        //click on link "With alert styling"
        DetailsTooltipPage.clickWithAlertStylingLink();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip5");
        DetailsTooltipPage.clickConfirmButton();
        //click on link "Stateful tooltip"
        DetailsTooltipPage.clickStatefulTooltipLink();
        expect(DetailsTooltipPage.verifyTooltipDetailsExisting()).toBeTruthy();
        //take screenshot and compare
        DetailsTooltipPage.takeScreenshotAndCompare("ComponentDetailsTooltip_Tooltip6");
        DetailsTooltipPage.clickIconCloseTooltip();
        //take screenshot for the whole page
        var generalPageFileName = "ComponentDetailsTooltip_GeneralPage";
        DetailsTooltipPage.takeScreenshotAndCompare(generalPageFileName);
    }));
});
