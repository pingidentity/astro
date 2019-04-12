var DashboardTemplatePage = require("../../pages/templates/DashboardTemplatePage.js");

describe("Dashboard Integration", function () {


    beforeEach(function () {
        DashboardTemplatePage.openDashboardDemoPage();
    });


    afterAll(function (done) {
        DashboardTemplatePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes toDashboard template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("general page screenshot", DashboardTemplatePage.retriable(function () {

        //take screenshot and compare
        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_GeneralPage");

    }));

    it("scroll down to Donut card",DashboardTemplatePage.retriable(function () {
        //take screenshot and compare
        DashboardTemplatePage.scrollDownToDonutCard();

        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_DonutCard");

    }));

    it("scroll down to Horizontalbar Card",DashboardTemplatePage.retriable(function () {

        //take screenshot and compare
        DashboardTemplatePage.scrollDownToHorizontalbarCard();

        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_HorizontalBarCard");

    }));

    it("scroll down to Frequency Card",DashboardTemplatePage.retriable(function () {

        //take screenshot and compare
        DashboardTemplatePage.scrollDownToFrequencyCard();

        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_FrequencyCard");

    }));

    it("scroll down to Multiseries",DashboardTemplatePage.retriable(function () {

        //take screenshot and compare
        DashboardTemplatePage.scrollDownToMultiseries();

        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_MultseriesCard");

    }));

    it("scroll down to Heatmap",DashboardTemplatePage.retriable(function () {

        //take screenshot and compare
        DashboardTemplatePage.scrollDownToHeatmap();

        DashboardTemplatePage.takeScreenshotAndCompare("Dashboard_HeatMap");

    }));


});