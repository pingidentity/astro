var DragDropRowPage = require("../../pages/rows/DragDropRowPage.js");

describe("Drag Drop Row Integration", function () {
    
    beforeEach(function () {
        DragDropRowPage.openDragDropRowDemoPage();
    });
    
    afterAll(function (done) {
        DragDropRowPage.end(done);
    });

    /**
     * SCENARIO: Should have a correct layout
     * GIVEN: Goes to component Drag N Drop Row
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have a correct layout", function () {
        expect(DragDropRowPage.verifyDragAndDropPageExisting()).toBeTruthy();
        //take screenshot and compare
        var generalPageFilename = "ComponentDragDropRowPage_GeneralPage";
        expect(DragDropRowPage.takeScreenshotAndCompare(generalPageFilename)).toBeTruthy();
    });
});