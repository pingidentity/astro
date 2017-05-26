var HomePage = require("../HomePage.js");
var ListViewPaginatedDemoPage = Object.create(HomePage, {

    
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
     * @desc this function is to click on link Narrow By
     */
    clickLinkNarrowBy: {
        value: function () {
            this.click("//span[@data-id='narrow-by']");
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
     * @desc this function is to get the top paging section
     */
    getTopPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-reactid,'topPageLinks')]");
        }
    },

    /**
     * @desc this function is to get the bottom paging section
     */
    getBottomPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-reactid,'bottomPageLinks')]");
        }
    },

    /**
     * @desc this function to verify if the div element with given data-id (page number) existing
     * @param {rowNumber} rowNumber - the given page number
     */
    verifyRowNumberExisting: {
        value: function (rowNumber) {
            return this.isExisting(this.formatXpath("//div[@data-id='{rowNumber}']", { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function to click a given row
     * @param {rowNumber} rowNumber - the given page number
     */
    clickRowNumber: {
        value: function (rowNumber) {
            this.click(this.formatXpath("//div[@data-id='{rowNumber}']", { rowNumber: rowNumber }));
        }
    },

    /**
     * @desc this function is to click on the given page number
     * @param {number} number - the given page number
     */
    clickPagingNumberPath: {
        value: function (number) {
            var xPath = "//a[contains(@data-reactid,'$topPageLinks.${number}')]";
            this.click(this.formatXpath(xPath, { number: number }));
        }
    },
    
    /**
     * @desc this function open the List View Paginated template
     */
    openListViewPaginatedDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "ListViewPaginated");
        }
    }
});

module.exports = ListViewPaginatedDemoPage;
