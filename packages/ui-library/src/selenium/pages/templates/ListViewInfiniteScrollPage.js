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
     * @desc this function clicks the clear button on the search field
     */
    clickClearSearch: {
        value: function () {
            this.click("//a[@data-id='clear']");
        }
    },

    /**
     * @desc this function clicks the expand button for a row
     */
    clickExpandRow: {
        value: function (index) {
            this.click(`(//a[@data-id='expand-btn'])[${index}]`);
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
     * @desc this function is to check if result items existing
     * @param {string} item - the number of item
     */
    verifyItemHasTitle: {
        value: function (dataId, title) {
            const titleEl = this.getElement(`//*[@data-id='${dataId}']//div[contains(@class, 'item-title')]`);
            return titleEl.getText() === title;
        }
    },

    /**
     * @desc this function is to check the title of the any/all indent component
     * @param {string} item - the number of item
     */
    verifyIndentTitle: {
        value: function (title) {
            const titleEl = this.getElement("//div[@data-id='indent']//div[@data-id='title']");
            return titleEl.getText() === title;
        }
    },

    /**
     * @desc this function is to check if row is open
     * @param {string} item - the number of item
     */
    verifyRowIsOpen: {
        value: function (index) {
            const xPath = (
                `(//div[contains(@class, 'result-set')]//div[contains(concat(' ', @class, ' '), ' item ')])[${index}]` +
                    `//*[@data-id='expanded-row']`
            );
            return this.isExisting(xPath);
        }
    },

    /**
     * @desc this function is to check if advanced section is showing
     */
    verifyAdvancedIsShowing: {
        value: function () {
            const xPath = (`//*[@data-id='custom-filters']`);
            return this.isExisting(xPath);
        }
    },

    /**
     * @desc this function is to check if the Indent component for any/all is showing
     */
    verifyIndentIsShowing: {
        value: function () {
            const xPath = (`//*[@data-id='indent']`);
            return this.isExisting(xPath);
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
     * @desc this function is to click on link + Add Filter
     */
    clickAddCustomFilter: {
        value: function () {
            this.click("//a[@data-id='add-filter-link']");
        }
    },

    /**
     * @desc this function is to click on radio button, like Any/All
     */
    clickRadio: {
        value: function (label) {
            this.click(`//label[@data-id='radio-btn_label_${label}']`);
        }
    },

    /**
     * @desc this function is to choost a custom filter type
     */
    chooseNewFilterType: {
        value: function (index) {
            this.click("//label[@data-id='new-filter-type']");
            this.click(`//label[@data-id='new-filter-type']//li[@data-id='option-${index}']`);
        }
    },

    /**
     * @desc this function is to click on link Advanced to open advanced
     */
    clickOpenAdvanced: {
        value: function () {
            this.click("//div[@data-id='advanced-link']//div[@data-id='collapsible-link']");
        }
    },

    /**
     * @desc this function is to click on the enabled status filter
     */
    clickEnabledStatus: {
        value: function () {
            this.click("//span[@data-id='status-selector']//label[@data-id='selection-filter-label']");
            this.click("//span[@data-id='status-selector']//label[@data-id='selectionList-Checkbox-0-container']");
        }
    },

    /**
     * @desc this function is to click on the good password status filter
     */
    clickGoodPasswordStatus: {
        value: function () {
            this.click("//span[@data-id='pw-status-selector']//label[@data-id='selection-filter-label']");
            this.click("//span[@data-id='pw-status-selector']//label[@data-id='selectionList-Checkbox-0-container']");
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

    verifySuccessStatuses: {
        value: function () {
            var rows = this.getElements("//div[contains(@class, 'result-set')]//div[contains(@class, 'item')]");
            for (var i = 0; i < rows.length; i += 1) {
                const xPath = (
                    "//div[@data-id='user-{index}']//span[contains(@class, 'status-indicator--icon__success')]"
                );
                if (!this.isExisting(this.formatXpath(xPath, { index: i }))) {
                    return false;
                }
            }
            return true;
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
