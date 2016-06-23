var PaginationPage = require("../../pages/list/PaginationPage.js");

describe("Pagination Integration", function () {

    beforeEach(function () {
        PaginationPage.openPaginationDemoPage();
    });

    afterAll(function (done) {
        PaginationPage.end(done);
    });

    it("should have the top and bottom pagination", function () {
        expect(PaginationPage.pagePaginationDetail).not.toBeNull();
        expect(PaginationPage.topPaging).not.toBeNull();
        expect(PaginationPage.bottomPaging).not.toBeNull();

        expect(PaginationPage.entryNumber(0)).not.toBeNull();
        expect(PaginationPage.entryNumber(1)).not.toBeNull();
        expect(PaginationPage.entryNumber(2)).not.toBeNull();
        expect(PaginationPage.entryNumber(3)).not.toBeNull();
        expect(PaginationPage.entryNumber(4)).not.toBeNull();
    });

    it("should be clickable for the third page, previous and next page", function () {
        expect(PaginationPage.pagePaginationDetail).not.toBeNull();

        // clicks on the third page
        PaginationPage.clickPagingNumberPath(3);
        expect(PaginationPage.entryNumber(10)).not.toBeNull();
        expect(PaginationPage.entryNumber(11)).not.toBeNull();
        expect(PaginationPage.entryNumber(12)).not.toBeNull();
        expect(PaginationPage.entryNumber(13)).not.toBeNull();
        expect(PaginationPage.entryNumber(14)).not.toBeNull();

        // clicks on the previous page
        PaginationPage.clickPagingNumberPath("previous");
        expect(PaginationPage.entryNumber(5)).not.toBeNull();
        expect(PaginationPage.entryNumber(6)).not.toBeNull();
        expect(PaginationPage.entryNumber(7)).not.toBeNull();
        expect(PaginationPage.entryNumber(8)).not.toBeNull();
        expect(PaginationPage.entryNumber(9)).not.toBeNull();

        // clicks on the next page
        PaginationPage.clickPagingNumberPath("next");
        expect(PaginationPage.entryNumber(10)).not.toBeNull();
        expect(PaginationPage.entryNumber(11)).not.toBeNull();
        expect(PaginationPage.entryNumber(12)).not.toBeNull();
        expect(PaginationPage.entryNumber(13)).not.toBeNull();
        expect(PaginationPage.entryNumber(14)).not.toBeNull();

        // clicks on the third page again
        PaginationPage.clickPagingNumberPath(20);
        expect(PaginationPage.entryNumber(95)).not.toBeNull();
        expect(PaginationPage.entryNumber(96)).not.toBeNull();
        expect(PaginationPage.entryNumber(97)).not.toBeNull();
        expect(PaginationPage.entryNumber(98)).not.toBeNull();
        expect(PaginationPage.entryNumber(99)).not.toBeNull();

        // clicks on the first page
        PaginationPage.clickPagingNumberPath("first");
        expect(PaginationPage.entryNumber(0)).not.toBeNull();
        expect(PaginationPage.entryNumber(1)).not.toBeNull();
        expect(PaginationPage.entryNumber(2)).not.toBeNull();
        expect(PaginationPage.entryNumber(3)).not.toBeNull();
        expect(PaginationPage.entryNumber(4)).not.toBeNull();
    });
});