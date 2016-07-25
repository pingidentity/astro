var HomePage = require("../HomePage.js");
var PaginationDemoPage = Object.create(HomePage, {

    /**
     * @desc this function is to check if the div element with data-id: 'pagination' existing
     */
    verifyPagePaginationDetailExisting: {
        value: function () {
            return this.isExisting("//div[@data-id='pagination']");
        }
    },

    /**
     * @desc this function is to check if the top paging section existing
     */
    verifyTopPagingExisting: {
        value: function () {
            return this.isExisting("//div[contains(@data-reactid, 'topPageLinks')]");
        }
    },

    /**
     * @desc this function is to check if the bottom paging section existing
     */
    verifyBottomPagingExisting: {
        value: function () {
            return this.isExisting("//div[contains(@data-reactid, 'bottomPageLinks')]");
        }
    },

    /**
     * @desc this function to check if entry number in the list existing
     * @param {number} number - the page number to get
     */
    verifyEntryNumberExisting: {
        value: function (number) {
            var xPath = "//div[@data-id='expandable-row'][contains(@data-reactid, '${number}')]";
            return this.isExisting(this.formatXpath(xPath, { number: number }));
        }
    },

    /**
     * @desc this function is to click on the given page number
     * @param {number} number - the page number to click
     */
    clickPagingNumberPath: {
        value: function (number) {
            var xPath = "//a[contains(@data-reactid, '$topPageLinks.${number}')]";
            this.click(this.formatXpath(xPath, { number: number }));
        }
    },
    
    /**
     * @desc this function open the pagination page
     */
    openPaginationDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Components"));
            this.scrollMenuNavigation(150);
            this.click(this.navComponent("Pagination"));
        }
    }
});

module.exports = PaginationDemoPage;