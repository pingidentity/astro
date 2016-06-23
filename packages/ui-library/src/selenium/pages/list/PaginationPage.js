var HomePage = require("../HomePage.js");

var PaginationDemoPage = Object.create(HomePage, {

    /*
    * @desc this function is to get the div element with data-id: 'pagination'
    */
    pagePaginationDetail: {
        get: function () {
            return this.getElement("//div[@data-id='pagination']");
        }
    },

    /*
    * @desc this function is to get the top paging section
    */
    topPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-reactid,'topPageLinks')]");
        }
    },

    /*
    * @desc this function is to get the bottom paging section
    */
    bottomPaging: {
        get: function () {
            return this.getElements("//div[contains(@data-reactid,'bottomPageLinks')]");
        }
    },

    /*
    * @desc this function to get the div element with class name: 'clearfix'
    */
    titlePagination: {
        get: function () {
            return this.getElements("//div[@class='documentation']/div[@class='doc']/div[@class='clearfix']/h2");
        }
    },

    /*
    * @desc this function to get the div element with class name: 'item title-only'
    *   and contains data-reactid with number as param
    * @param {number} number - given page
    */
    entryNumber: {
        value: function (number) {
            return this.getElements(
                "//div[@data-id='pagination']/div[@class='item title-only'][contains(@data-reactid,'$" + number + "')]"
            );
        }
    },

    /*
    * @desc this function is to click on the given page number
    * @param {number} number - given page
    */
    clickPagingNumberPath: {
        value: function (number) {
            var paging = "//a[contains(@data-reactid,'$topPageLinks.$"+ number +"')]";
            this.click(paging);
        }
    },

    /**
     * @desc this function open the pagination page
     */
    openPaginationDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Components"));
            this.click(this.navComponent("Pagination"));
        }
    }
});

module.exports = PaginationDemoPage;