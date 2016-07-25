var GridPage = require("../../pages/grid/GridPage.js");

describe("SelectText Integration", function () {
    
    beforeEach(function () {
        GridPage.openGridDemoPage();
    });

    afterAll(function (done) {
        GridPage.end(done);
    });
    
    /**
     * SCENARIO: Should be clickable for next, previous page, expand or collapse row
     * GIVEN: Goes to component Grid
     * WHEN: Collapses the first row
     * THEN: The expanded row should be collapsed
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Expands and collapses the second row
     * THEN: The row should be expanded and collapsed
     * WHEN: Clicks on the Next page
     * THEN: The next page should be switched
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Clicks on the previous page
     * THEN: The previous page should be returned
     */
    it("should be clickable for next, previous page and expand row", function () {
        //verify the current grid tables
        expect(GridPage.verifyGridTableExisting(1)).toBeTruthy();
        expect(GridPage.verifyGridTableExisting(2)).toBeTruthy();
        //collapse the first row
        GridPage.expandOrCollapseRow(0);
        //verify the expanded content is collapsed
        GridPage.waitForExpandedRowInvisible(0);
        expect(GridPage.verifyExpandedRowExisting(0)).toBeFalsy();
        //take screenshot and compare
        expect(GridPage.takeScreenshotAndCompare("ComponentGrid_GeneralPage")).toBeTruthy();
        //expand the second row
        GridPage.expandOrCollapseRow(1);
        GridPage.waitForExpandedRowVisible(1);
        //verify the the expanded row
        expect(GridPage.verifyExpandedRowExisting(1)).toBeTruthy();
        //collapse the second row
        GridPage.expandOrCollapseRow(1);
        //verify the expanded content is collapsed
        GridPage.waitForExpandedRowInvisible(1);
        expect(GridPage.verifyExpandedRowExisting(1)).toBeFalsy();
        //click on next page
        GridPage.clickIconNextPage();
        //verify the second page is selected
        expect(GridPage.verifyCurrentPageExisting(2)).toBeTruthy();
        //take screenshot and compare
        expect(GridPage.takeScreenshotAndCompare("ComponentGrid_NextPage")).toBeTruthy();
        //click on previous page
        GridPage.clickIconPreviousPage();
        //verify the first page is returned
        expect(GridPage.verifyCurrentPageExisting(1)).toBeTruthy();
    });
});