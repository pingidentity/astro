var PaginatedListPage = require("../../pages/templates/PaginatedListPage.js");

describe("List View Paginated Integration", function () {

    beforeEach(function () {
        PaginatedListPage.openPaginatedListDemoPage();
    });

    afterAll(function (done) {
        PaginatedListPage.end(done);
    });

    /**
     * SCENARIO: Should search rows normally
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Searches any row (e.g "Row 3")
     * THEN: The row 15 should display in the list
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should search rows normally", PaginatedListPage.retriable(function () {
        PaginatedListPage.openPaginatedListDemoPage();

        //searches with item "Row 15"
        PaginatedListPage.setSearchValue("Row 3");
        //verifies result
        expect(PaginatedListPage.verifyRowNumberExisting(3)).toBeTruthy();
        //takes screenshot and compare
        const searchingResultFileName = "TemplatesPaginatedList_SearchingResult";
        PaginatedListPage.clickRowNumber(3);
        PaginatedListPage.takeScreenshotAndCompare(searchingResultFileName);
    }));

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
    it("should be clickable for the next, previous, last, first page", PaginatedListPage.retriable(function () {
        PaginatedListPage.openPaginatedListDemoPage();

        //clicks on the third page
        PaginatedListPage.clickPagingNumberPath(3);
        for (var i = 21; i < 31; i = i + 1) {
            expect(PaginatedListPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var theThirdPageFileName = "TemplatesPaginatedList_TheThirdPage";
        PaginatedListPage.takeScreenshotAndCompare(theThirdPageFileName);

        //clicks on the previous page
        PaginatedListPage.clickPagingNumberPath("previous");
        for (var i = 11; i < 21; i = i + 1) {
            expect(PaginatedListPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var thePreviousPageFileName = "TemplatesPaginatedList_ThePreviousPage";
        PaginatedListPage.takeScreenshotAndCompare(thePreviousPageFileName);

        //clicks on the next page
        PaginatedListPage.clickPagingNumberPath("next");
        for (var i = 21; i < 31; i = i + 1) {
            expect(PaginatedListPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theNextPageFileName = "TemplatesPaginatedList_TheNextPage";
        PaginatedListPage.takeScreenshotAndCompare(theNextPageFileName);

        //clicks on the first page
        PaginatedListPage.clickPagingNumberPath(1);
        for (var i = 1; i < 11; i = i + 1) {
            expect(PaginatedListPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //takes screenshot and compare
        var theFirstPageFileName = "TemplatesPaginatedList_TheFirstPage";
        PaginatedListPage.takeScreenshotAndCompare(theFirstPageFileName);

        //clicks on the last page
        PaginatedListPage.clickPagingNumberPath(5);
        for (var i = 41; i < 51; i = i + 1) {
            expect(PaginatedListPage.verifyRowNumberExisting(i)).toBeTruthy();
        }

        //take screenshot and compare
        var theLastPageFileName = "TemplatesPaginatedList_ThelastPage";
        PaginatedListPage.takeScreenshotAndCompare(theLastPageFileName);
    }));
});

