var HomePage = require("../HomePage.js");
var PaginatedListDemoPage = Object.create(HomePage, {


    /**
     * @desc this function is to get Search field
     */
    getSearchField: {
        get: function () {
            return this.getElement("//input[@data-id='searchBox-input']");
        }
    },

    /**
     * @desc this function is to set Search value
     * @param {string} keysSearch - the keyword to set
     */
    setSearchValue: {
        value: function (keysSearch) {
            this.getSearchField.setValue(keysSearch);
        }
    },

    /**
     * @desc this function is to click on link Filters to open filters
     */
    clickOpenFilters: {
        value: function () {
            this.click("//span[@data-id='searchbar-filter-link']");
        }
    },

    /**
     * @desc this function is to get the top paging section
     */
    getTopPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-id,'topPageLinks')]");
        }
    },

    /**
     * @desc this function is to get the bottom paging section
     */
    getBottomPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-id,'bottomPageLinks')]");
        }
    },

    /**
     * @desc this function to verify if the div element with given data-id (page number) existing
     * @param {rowNumber} rowNumber - the given page number
     */
    verifyRowNumberExisting: {
        value: function (rowNumber) {
            return this.isExisting(this.formatXpath("//div[@data-id='row-{rowNumber}']", { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function to click a given row
     * @param {rowNumber} rowNumber - the given page number
     */
    clickRowNumber: {
        value: function (rowNumber) {
            this.click(this.formatXpath("//div[@data-id='row-{rowNumber}']", { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function is to click on the given page number
     * @param {number} number - the given page number
     */
    clickPagingNumberPath: {
        value: function (number) {
            var xPath = "//a[contains(@data-id,'topPageLinks{number}')]";
            this.click(this.formatXpath(xPath, { number: number }));
        }
    },

    /**
     * @desc this function open the Paginated List template
     */
    openPaginatedListDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "ListView", "PaginatedList");
        }
    }
});

module.exports = PaginatedListDemoPage;
