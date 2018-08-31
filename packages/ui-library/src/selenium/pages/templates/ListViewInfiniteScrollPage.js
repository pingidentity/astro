var HomePage = require("../HomePage.js");
var ListViewInfiniteScrollDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to click on given tab
     * @param {number} index - the order of tab
     */
    clickOnTab: {
        value: function (index) {
            this.click(this.formatXpath("//li[@data-id='tabbed-sections-{index}']", { index: index }));
        }
    },

    /**
     * @desc this function is to get Search field
     * @private
     * @ignore
     */
    getSearchField: {
        get: function () {
            return this.getElement("//input[@data-id='searchBox-input']");
        }
    },

    /**
     * @desc this function is to set Search value
     * @param {string} keysSearch - the keyword to search
     */
    setSearchValue: {
        value: function (keysSearch) {
            this.getSearchField.setValue(keysSearch);
        }
    },

    /**
     * @desc this function is to check if result items existing
     * @param {string} item - the number of item
     */
    verifyResultItemsExisting: {
        value: function (item) {
            var xPath = "//div[@data-id='infinite-scroll']//div[@data-id='{item}']";
            return this.isExisting(this.formatXpath(xPath, { item: item }));
        }
    },

    /**
     * @desc this function is to click on link Filters to open filters
     */
    clickOpenFilters: {
        value: function () {
            this.click("//div[@data-id='searchbar-filter-link']");
        }
    },

    /**
     * @desc this function is to click on check box Filter Odd Rows
     */
    clickCheckboxFilterOddRows: {
        value: function () {
            this.click("//label[1]/input[@data-id='form-checkbox']/following-sibling::div");
        }
    },

    /**
     * @desc this function is to click on check box Filter Even Rows
     */
    clickCheckboxFilterEvenRows: {
        value: function () {
            this.click("//label[2]/input[@data-id='form-checkbox']/following-sibling::div");
        }
    },

    /**
     * @desc this function is to verify displayed page
     * @param {number} index - the index of tab
     */
    verifyDisplayedPageExisting: {
        value: function (index) {
            var xPath = "//li[@data-id='tabbed-sections-{index}'][@class='active']";
            return this.isExisting(this.formatXpath(xPath, { index: index }));
        }
    },

    verifyRows: {
        value: function (isOddRow) {
            var rows = this.getElements("//div[@data-id='result-set']//div[@data-id='batch']");
            for (var i = 0; i < rows.value.length; i=i+1) {
                var rowDataId = rows.getAttribute("data-id");
                if (isOddRow && rowDataId % 2 === 0) {
                    return false;
                } else if (!isOddRow && rowDataId % 2 > 0) {
                    return false;
                }
                return true;
            }
        }
    },

    /**
     * @desc this function is to verify odd rows in the list
     */
    verifyOddRows: {
        get: function () {
            return this.verifyRows(true);
        }
    },

    /**
     * @desc this function is to verify even rows in the list
     */
    verifyEvenRows: {
        get: function () {
            return this.verifyRows(false);
        }
    },

    /**
     * @desc this function is to open template List View Infinite Scroll
     */
    openListViewInfiniteScrollDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "ListView", "ListViewInfiniteScroll");
        }
    }
});

module.exports = ListViewInfiniteScrollDemoPage;
