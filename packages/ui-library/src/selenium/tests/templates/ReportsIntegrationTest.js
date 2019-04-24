var ReportsTemplatePage = require("../../pages/templates/ReportsTemplatePage.js");

describe("Reports Template Integration", function () {

    beforeAll(function () {
        ReportsTemplatePage.openReportsDemoPage();
    });


    afterAll(function (done) {
        ReportsTemplatePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to Reports template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("general page screenshot", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare
        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_GeneralPage");

    }));


    it("it clicks on the report type dropdown", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare

        ReportsTemplatePage.clickReportType();

        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_ReportTypeClick");
    }));

    it("it clicks on the time range", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare

        ReportsTemplatePage.clickTimeRange();

        ReportsTemplatePage.blurElement();

        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_ReportTimeRange");


    }));

    it("it clicks on the unit input text", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare

        ReportsTemplatePage.clickUnitText();

        ReportsTemplatePage.blurElement();

        // Wait for animations to complete

        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_ReportUnitInputText");


    }));

    it("it clicks on the unit input time", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare

        ReportsTemplatePage.clickUnitTime();

        ReportsTemplatePage.blurElement();


        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_ReportUnitInputTime");


    }));

    it("it clicks on the filter", ReportsTemplatePage.retriable(function () {

        ReportsTemplatePage.clickFilter();
        //take screenshot and compare
        ReportsTemplatePage.setFilterValue("tracking ID");


        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_ReportFilterText");


    }));

    it("scroll down page", ReportsTemplatePage.retriable(function () {

        //take screenshot and compare
        ReportsTemplatePage.scrollDownPage(800);


        ReportsTemplatePage.takeScreenshotAndCompare("TemplatesReports_Scroll");

    }));


});