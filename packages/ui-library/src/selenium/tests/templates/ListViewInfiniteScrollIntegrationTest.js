var ListViewInfiniteScrollPage = require("../../pages/templates/ListViewInfiniteScrollPage.js");

describe("List View Infinite Scroll Integration", function () {

    beforeEach(function () {
        ListViewInfiniteScrollPage.openListViewInfiniteScrollDemoPage();
    });

    afterAll(function (done) {
        ListViewInfiniteScrollPage.end(done);
    });

    /**
     * SCENARIO: Should filter odd rows and even rows
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Selects the first page
     * AND: Selects the odd row filter option
     * THEN: There should be only odd rows displayed in the list
     * WHEN: Selects only the Even row filter option
     * THEN: There should be only even rows displayed in the list
     */
    it("should filter odd rows and even rows", function () {
        //click on Narrow By link
        ListViewInfiniteScrollPage.clickOpenFilters();
        //filter odd rows
        ListViewInfiniteScrollPage.clickCheckboxFilterOddRows();
        expect(ListViewInfiniteScrollPage.verifyOddRows).toBeTruthy();

        //filter even rows
        ListViewInfiniteScrollPage.clickCheckboxFilterOddRows();
        ListViewInfiniteScrollPage.clickCheckboxFilterEvenRows();
        expect(ListViewInfiniteScrollPage.verifyEvenRows).toBeTruthy();
    });

    /**
     * SCENARIO: Should search rows normally
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Search any row (e.g "15")
     * THEN: The row 15 should display in the list
     */
    it("should search rows normally", function () {
        //search with item "15"
        ListViewInfiniteScrollPage.setSearchValue("15");
        //verify result
        expect(ListViewInfiniteScrollPage.verifyResultItemsExisting(15)).toBeTruthy();
    });
});

