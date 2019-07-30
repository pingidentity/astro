var ListViewInfiniteScrollPage = require("../../pages/templates/ListViewInfiniteScrollPage.js");

describe("List View Infinite Scroll Integration", function () {

    beforeEach(function () {
        ListViewInfiniteScrollPage.openListViewInfiniteScrollDemoPage();
    });

    afterAll(function (done) {
        ListViewInfiniteScrollPage.end(done);
    });

    /**
     * SCENARIO: Should filter Enabled/Good users
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Selects the first page
     * AND: Selects the enabled and good password statuses
     * THEN: Rows should only show green indicators
     */
    it("should filter Enabled/Good users", function () {
        //click on Filters link
        ListViewInfiniteScrollPage.clickOpenFilters();
        ListViewInfiniteScrollPage.clickEnabledStatus();
        ListViewInfiniteScrollPage.clickGoodPasswordStatus();
        expect(ListViewInfiniteScrollPage.verifySuccessStatuses()).toBeTruthy();
        ListViewInfiniteScrollPage.takeScreenshotAndCompare("TemplatesListView_FilteredList");
    });

    /**
     * SCENARIO: Should search rows normally
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Search any row (e.g "curtis")
     * THEN: The row for Kathryn Curtis
     * WHEN: Click clear search
     * THEN: The row for Teresa Adams
     */
    it("should search rows normally", function () {
        //search with item "curtis"
        ListViewInfiniteScrollPage.setSearchValue("curtis");
        //verify result
        expect(ListViewInfiniteScrollPage.verifyItemHasTitle("user-0", "Kathryn Curtis")).toBeTruthy();
        ListViewInfiniteScrollPage.takeScreenshotAndCompare("TemplatesListView_Search");

        // clear search
        ListViewInfiniteScrollPage.clickClearSearch();
        //verify result
        expect(ListViewInfiniteScrollPage.verifyItemHasTitle("user-0", "Teresa Adams")).toBeTruthy();
    });

    /**
     * SCENARIO: Should expand item in list
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Click expand button on row
     * THEN: There is an "expanded-row" data id in the row
     */
    it("should expand item in list", function () {
        // open row
        ListViewInfiniteScrollPage.clickExpandRow(1);

        // Finish animations
        ListViewInfiniteScrollPage.pause(2000);

        ListViewInfiniteScrollPage.scrollToTop();

        ListViewInfiniteScrollPage.takeScreenshotAndCompare("TemplatesListView_ExpandedItem");
    });

    /**
     * SCENARIO: Should show any/all control and change divider to say any
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Click expand filters and click Advanced
     * THEN: There is an "advanced-container" data id showing
     * WHEN: Click to choose filter and add a second
     * THEN: There is an "indent" data id showing
     * WHEN: Click radio button for Any
     * THEN: The divider shows "Any"
     */
    it("should show any/all control and change divider to say any", function () {
        // click on Filters link
        ListViewInfiniteScrollPage.clickOpenFilters();
        // click on Advanced link
        ListViewInfiniteScrollPage.clickOpenAdvanced();
        // verify advanced section
        expect(ListViewInfiniteScrollPage.verifyAdvancedIsShowing()).toBeTruthy();
        // choose a custom filter type
        ListViewInfiniteScrollPage.chooseNewFilterType(1);
        // add a filter
        ListViewInfiniteScrollPage.clickAddCustomFilter();
        // verify any/all is showing
        expect(ListViewInfiniteScrollPage.verifyIndentIsShowing()).toBeTruthy();
        // click on Any radio button
        ListViewInfiniteScrollPage.clickRadio("Any");
        // verify indent says "Any"
        expect(ListViewInfiniteScrollPage.verifyIndentTitle("ANY")).toBeTruthy();
        ListViewInfiniteScrollPage.takeScreenshotAndCompare("TemplatesListView_CustomFilters");
    });
});

