var PaginationPage = require("../../pages/list/PaginationPage.js");

describe("Pagination Integration", function () {

    beforeEach(function () {
        PaginationPage.openPaginationDemoPage();
    });

    afterAll(function (done) {
        PaginationPage.end(done);
    });

    /**
     * SCENARIO: Should have the top, bottom pagination and the number of items in the list
     * GIVEN: Goes to component Pagination
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * THEN: The top, the bottom paging and the number of items in the list should display correctly
     */
    it("should have the top, bottom pagination and the number of items in the list", PaginationPage.retriable(
        function () {
            PaginationPage.openPaginationDemoPage();

            expect(PaginationPage.verifyPagePaginationDetailExisting()).toBeTruthy();
            var generalPageFileName = "ComponentPagination_GeneralPage";
            //take screenshot and compare
            PaginationPage.takeScreenshotAndCompare(generalPageFileName);
            expect(PaginationPage.verifyTopPagingExisting()).toBeTruthy();
            expect(PaginationPage.verifyBottomPagingExisting()).toBeTruthy();
            for (var i = 0; i < 5; i = i + 1) {
                expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
            }
        }
    ));
    
    /**
     * SCENARIO: Should be clickable for the next, previous, last, first page
     * GIVEN: Goes to component Pagination
     * WHEN: Clicks on the third page
     * THEN: The third page should be switched
     * WHEN: Clicks on the previous page
     * THEN: The second page should be switched
     * WHEN: Clicks on the next page
     * THEN: The next page should be switched
     * WHEN: Clicks on the first page
     * THEN: The first page should be switched
     * WHEN: Clicks on the final page
     * THEN: The final page should be selected
     */
    it("should be clickable for the next, previous, last, first page", PaginationPage.retriable(function () {
        PaginationPage.openPaginationDemoPage();

        expect(PaginationPage.verifyPagePaginationDetailExisting()).toBeTruthy();
        //clicks on the third page
        PaginationPage.clickPagingNumberPath(3);
        for (var i = 10; i < 15; i = i+1) {
            expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theThirdPageFileName = "ComponentPagination_TheThirdPage";
        PaginationPage.takeScreenshotAndCompare(theThirdPageFileName);
        //clicks on the previous page
        PaginationPage.clickPagingNumberPath("previous");
        for (var i = 5; i < 10; i = i+1) {
            expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var thePreviousPageFileName = "ComponentPagination_ThePreviousPage";
        PaginationPage.takeScreenshotAndCompare(thePreviousPageFileName);
        //clicks on the next page
        PaginationPage.clickPagingNumberPath("next");
        for (var i = 10; i < 15; i = i+1) {
            expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theNextPageFileName = "ComponentPagination_TheNextPage";
        PaginationPage.takeScreenshotAndCompare(theNextPageFileName);
        //clicks on the first page
        PaginationPage.clickPagingNumberPath("first");
        for (var i = 0; i < 5; i = i+1) {
            expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theFirstPageFileName = "ComponentPagination_TheFirstPage";
        PaginationPage.takeScreenshotAndCompare(theFirstPageFileName);
        //clicks on the last page
        PaginationPage.clickPagingNumberPath(20);
        for (var i = 95; i < 100; i = i+1) {
            expect(PaginationPage.verifyEntryNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theLastPageFileName = "ComponentPagination_TheLastPage";
        PaginationPage.takeScreenshotAndCompare(theLastPageFileName);
    }));
});
