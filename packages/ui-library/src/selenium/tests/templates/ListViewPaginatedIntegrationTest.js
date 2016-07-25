var ListViewPaginatedPage = require("../../pages/templates/ListViewPaginatedPage.js");

describe("List View Paginated Integration", function () {

    beforeEach(function () {
        ListViewPaginatedPage.openListViewPaginatedDemoPage();
    });

    afterAll(function (done) {
        ListViewPaginatedPage.end(done);
    });

    /**
     * SCENARIO: Should search rows normally
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Searches any row (e.g "Row 15")
     * THEN: The row 15 should display in the list
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should search rows normally", function () {
        //searches with item "Row 15"
        ListViewPaginatedPage.setSearchValue("Row 15");
        //verifies result
        expect(ListViewPaginatedPage.verifyRowNumberExisting(15)).toBeTruthy();
        //takes screenshot and compare
        var searchingResultFileName = "TemplatesListViewPaginated_SearchingResult";
        ListViewPaginatedPage.clickRowNumber(15);
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(searchingResultFileName)).toBeTruthy();
    });

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
    it("should be clickable for the next, previous, last, first page", function () {
        //clicks on the third page
        ListViewPaginatedPage.clickPagingNumberPath(3);
        for (var i = 21; i < 31; i = i + 1) {
            expect(ListViewPaginatedPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var theThirdPageFileName = "TemplatesListViewPaginated_TheThirdPage";
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(theThirdPageFileName)).toBeTruthy();

        //clicks on the previous page
        ListViewPaginatedPage.clickPagingNumberPath("previous");
        for (var i = 11; i < 21; i = i + 1) {
            expect(ListViewPaginatedPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var thePreviousPageFileName = "TemplatesListViewPaginated_ThePreviousPage";
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(thePreviousPageFileName)).toBeTruthy();

        //clicks on the next page
        ListViewPaginatedPage.clickPagingNumberPath("next");
        for (var i = 21; i < 31; i = i + 1) {
            expect(ListViewPaginatedPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theNextPageFileName = "TemplatesListViewPaginated_TheNextPage";
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(theNextPageFileName)).toBeTruthy();

        //clicks on the first page
        ListViewPaginatedPage.clickPagingNumberPath(1);
        for (var i = 1; i < 11; i = i + 1) {
            expect(ListViewPaginatedPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var theFirstPageFileName = "TemplatesListViewPaginated_TheFirstPage";
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(theFirstPageFileName)).toBeTruthy();

        //clicks on the last page
        ListViewPaginatedPage.clickPagingNumberPath(5);
        for (var i = 41; i < 51; i = i + 1) {
            expect(ListViewPaginatedPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theLastPageFileName = "TemplatesListViewPaginated_ThelastPage";
        expect(ListViewPaginatedPage.takeScreenshotAndCompare(theLastPageFileName)).toBeTruthy();
    });
});

