var HomePage = require("../HomePage.js");
var GridDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     * @param {number} index - the order of grid
     */
    xpathGridTable: {
        value: function (index) {
            return this.formatXpath("//div[@data-id='grid-table'][{index}]", { index: index });
        }
    },

    xpathIconPreviousPage: {
        get: function () {
            return "//a[@data-id='pagination-previous']";
        }
    },

    xpathIconNextPage: {
        get: function () {
            return "//a[@data-id='pagination-next']";
        }
    },

    /**
     * @desc this function is to check if grid table existing
     * @param {number} index - the order of grid
     */
    verifyGridTableExisting: {
        value: function (index) {
            return this.isExisting(this.xpathGridTable(index));
        }
    },

    /**
     * @desc this function is to click the previous page
     */
    clickIconPreviousPage: {
        value: function () {
            this.click(this.xpathIconPreviousPage);
        }
    },

    /**
     * @desc this function is to click the Next page
     */
    clickIconNextPage: {
        value: function () {
            this.click(this.xpathIconNextPage);
        }
    },

    /**
     * @desc this function is to expand or collapse row
     * @param {number} rowNumber - the position of the row
     */
    expandOrCollapseRow: {
        value: function (rowNumber) {
            var xPath = "//td[@data-id='grid-row-{rowNumber}_expandableIconCell']/button";
            this.click(this.formatXpath(xPath, { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function is to check if the expanded row existing
     * @param {number} rowNumber - the position of the expanded row
     */
    verifyExpandedRowExisting: {
        value: function (rowNumber) {
            var xPath = "//td[@data-id='expandedCell-{rowNumber}']";
            return this.isExisting(this.formatXpath(xPath, { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function is to check if the current page existing
     * @param {number} currentPage - the position of the page (1,2,3)
     */
    verifyCurrentPageExisting: {
        value: function (currentPage) {
            var xPath = "//div[@data-id='pagination'][contains(text(),'{currentPage}')]";
            return this.isExisting(this.formatXpath(xPath, { currentPage: currentPage }));
        }
    },

    /**
     * @desc this function is to wait for expanded row invisible
     * @param {number} rowNumber - the position of the expanded row
     */
    waitForExpandedRowInvisible: {
        value: function (rowNumber) {
            var xPath = "//td[@data-id='expandedCell-{rowNumber}']";
            this.waitForVisible(this.formatXpath(xPath, { rowNumber: rowNumber }), this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to wait for expanded row visible
     * @param {number} rowNumber - the position of the expanded row
     */
    waitForExpandedRowVisible: {
        value: function (rowNumber) {
            var xPath = "//td[@data-id='expandedCell-{rowNumber}']";
            this.waitForVisible(this.formatXpath(xPath, { rowNumber: rowNumber }), this.waitInterval);

        }
    },

    /**
     * @desc this function open the Grid page
     */
    openGridDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "Misc", "Grid");
        }
    }
});

module.exports = GridDemoPage;
