var SelectTextPage = require("../../pages/general/SelectTextPage.js");

describe("SelectText Integration", function () {
    
    beforeEach(function () {
        SelectTextPage.openSelectTextDemoPage();
    });

    afterAll(function (done) {
        SelectTextPage.end(done);
    });

    /**
     * SCENARIO: Should have a correct layout
     * GIVEN: Goes to component Select Text
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Clicks on the text field
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have a correct layout", SelectTextPage.retriable(function () {
        SelectTextPage.openSelectTextDemoPage();

        expect(SelectTextPage.verifyTextFieldExisting()).toBeTruthy();
        //take screenshot and compare
        SelectTextPage.takeScreenshotAndCompare("ComponentSelectText_GeneralPage");
        expect(SelectTextPage.clickTextField());
        SelectTextPage.takeScreenshotAndCompare("ComponentSelectText_SelectedText");
    }));
});
