var LicenseTemplatePage = require("../../pages/templates/LicenseTemplatePage.js");

describe("Edit Page Sectioned Integration", function () {

    beforeEach(function () {
        LicenseTemplatePage.LiscenseDemoPage();
    });

    afterAll(function (done) {
        LicenseTemplatePage.end(done);
    });

    /**
     * GIVEN: Goes to License template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should take a screenshot of the whole page", LicenseTemplatePage.retriable(function () {
        //take screenshot and compare
        var generalPageFileName = "TemplatesLicense_GeneralPage";
        LicenseTemplatePage.takeScreenshotAndCompare(generalPageFileName);
    }));
});