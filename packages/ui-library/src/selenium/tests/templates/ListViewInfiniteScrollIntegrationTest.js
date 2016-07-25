var ListViewInfiniteScrollPage = require("../../pages/templates/ListViewInfiniteScrollPage.js");

describe("List View Infinite Scroll Integration", function () {

    beforeEach(function () {
        ListViewInfiniteScrollPage.openListViewInfiniteScrollDemoPage();
    });

    afterAll(function (done) {
        ListViewInfiniteScrollPage.end(done);
    });

    /**
     * SCENARIO: should open the page after selecting page
     * GIVEN: Goes to template List View Infinite Scroll
     * WHEN: Clicks on each page
     * THEN: The page should be displayed and active
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should open the page after selecting page", function () {
        //click on the first page
        ListViewInfiniteScrollPage.clickOnTab(0);
        expect(ListViewInfiniteScrollPage.verifyDisplayedPageExisting("0")).toBeTruthy();
        //click on the second page
        ListViewInfiniteScrollPage.clickOnTab(1);
        expect(ListViewInfiniteScrollPage.verifyDisplayedPageExisting("1")).toBeTruthy();
        //take screenshot and compare
        var secondPageFileName = "TemplateListViewInfiniteScroll_SecondPage";
        expect(ListViewInfiniteScrollPage.takeScreenshotAndCompare(secondPageFileName)).toBeTruthy();
        //click on the third page
        ListViewInfiniteScrollPage.clickOnTab(2);
        expect(ListViewInfiniteScrollPage.verifyDisplayedPageExisting("2")).toBeTruthy();
        //take screenshot and compare
        var thirdPageFileName = "TemplateListViewInfiniteScroll_ThirdPage";
        expect(ListViewInfiniteScrollPage.takeScreenshotAndCompare(thirdPageFileName)).toBeTruthy();
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
        //click on the first page
        ListViewInfiniteScrollPage.clickOnTab(0);
        //click on Narrow By link
        ListViewInfiniteScrollPage.clickLinkNarrowBy();
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
        //click on the first page
        ListViewInfiniteScrollPage.clickOnTab(0);
        //search with item "15"
        ListViewInfiniteScrollPage.setSearchValue("15");
        //verify result
        expect(ListViewInfiniteScrollPage.verifyResultItemsExisting(15)).toBeTruthy();
    });
});

