var HomePage = require("../HomePage.js");
var MultiColumnDragDropDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathMultiColumnDragDropDemoPage: {
        get: function () {
            return "//div[@data-id='multidragDemoDiv']";
        }
    },

    xpathSearchOptionNone: {
        get: function () {
            return "//input[@data-id='radio-btn_none']/following-sibling::div";
        }
    },

    xpathSearchOptionFirstColumnOnly: {
        get: function () {
            return "//input[@data-id='radio-btn_first']/following-sibling::div";
        }
    },

    xpathSearchOptionAll: {
        get: function () {
            return "//input[@data-id='radio-btn_all']/following-sibling::div";
        }
    },

    xpathRowOptionIconOnly: {
        get: function () {
            return "//input[@data-id='radio-btn_icon']/following-sibling::div";
        }
    },

    xpathRowOptionTextOnly: {
        get: function () {
            return "//input[@data-id='radio-btn_text']/following-sibling::div";
        }
    },

    xpathRowOptionIconAndText: {
        get: function () {
            return "//input[@data-id='radio-btn_both']/following-sibling::div";
        }
    },

    xpathLeftSearchField: {
        get: function () {
            return "//div[@data-id='DragDropColumn-0']//input[@data-id='form-text-field-input']";
        }
    },

    xpathRightSearchField: {
        get: function () {
            return "//div[@data-id='DragDropColumn-1']//input[@data-id='form-text-field-input']";
        }
    },

    xpathLeftColumn: {
        get: function () {
            return "//div[@data-id='DragDropColumn-0']";
        }
    },

    xpathRightColumn: {
        get: function () {
            return "//div[@data-id='DragDropColumn-1']";
        }
    },

    /**
     * @desc this function is to check if the Multi column drag and drop page existing
     */
    verifyMultiColumnDragDropDemoPageExisting: {
        value: function () {
            return this.isExisting(this.xpathMultiColumnDragDropDemoPage);
        }
    },

    /**
     * @desc this function is to select Search option None
     */
    selectSearchOptionNone: {
        value: function () {
            this.click(this.xpathSearchOptionNone);
        }
    },

    /**
     * @desc this function is to select Search option First Column Only
     */
    selectSearchOptionFirstColumnOnly: {
        value: function () {
            this.click(this.xpathSearchOptionFirstColumnOnly);
        }
    },

    /**
     * @desc this function is to select Search option All
     */
    selectSearchOptionAll: {
        value: function () {
            this.click(this.xpathSearchOptionAll);
        }
    },

    /**
     * @desc this function is to select row option Icon only
     */
    selectRowOptionIconOnly: {
        value: function () {
            this.click(this.xpathRowOptionIconOnly);
        }
    },

    /**
     * @desc this function is to select row option TextOnly
     */
    selectRowOptionTextOnly: {
        value: function () {
            this.click(this.xpathRowOptionTextOnly);
        }
    },

    /**
     * @desc this function is to select row option Icon And Text
     */
    selectRowOptionIconAndText: {
        value: function () {
            this.click(this.xpathRowOptionIconAndText);
        }
    },

    /**
     * @desc this function is to check if the left search field existing
     */
    verifyLeftSearchFieldExisting: {
        value: function () {
            return this.isExisting(this.xpathLeftSearchField);
        }
    },

    /**
     * @desc this function is to check if the right search field existing
     */
    verifyRightSearchFieldExisting: {
        value: function () {
            return this.isExisting(this.xpathRightSearchField);
        }
    },

    /**
     * @desc this function is to check if Icon Of Item Existing
     * @param {number} itemNumber - number of item
     */
    verifyIconOfItemExisting: {
        value: function (itemNumber) {
            var xPath = "//div[contains(@data-reactid, '${itemNumber}')]//div[@data-id='row-icon']";
            return this.isExisting(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to check if name Of Item Existing
     * @param {number} itemNumber - number of item
     */
    verifyNameOfItemExisting: {
        value: function (itemNumber) {
            var xPath = "//div[contains(@data-reactid,'${itemNumber}')]//span[@data-id='row-name']";
            return this.isExisting(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to add item to the right column
     * @param {number} itemNumber - number of item
     */
    addItemToRightColumn: {
        value: function (itemNumber) {
            var xPath = "//div[contains(@data-reactid, '$0.2.${itemNumber}')]//button[@data-id='row-button-add']";
            this.click(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to check if item that is added to the right column existing
     * @param {number} itemNumber - number of item
     */
    verifyAddedItemToRightColumnExisting: {
        value: function (itemNumber) {
            var prefixXpath = "//div[@data-id='DragDropColumn-1']//div[@data-id='drag-drop-row']";
            var xPath = prefixXpath + "[contains(@data-reactid,'$1.2.${itemNumber}')]";
            return this.isExisting(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to check if item that is added to the left column existing
     * @param {number} itemNumber - number of item
     */
    verifyRemovedItemToLeftColumnExisting: {
        value: function (itemNumber) {
            var prefixXpath = "//div[@data-id='DragDropColumn-0']//div[@data-id='drag-drop-row']";
            var xPath = prefixXpath + "[contains(@data-reactid, '$0.2.${itemNumber}')]";
            return this.isExisting(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to remove item to the Left column
     * @param {number} itemNumber - number of item
     */
    removeItemToLeftColumn: {
        value: function (itemNumber) {
            var xPath = "//div[contains(@data-reactid, '$1.2.${itemNumber}')]//button[@data-id='row-button-remove']";
            this.click(this.formatXpath(xPath, { itemNumber: itemNumber }));
        }
    },

    /**
     * @desc this function is to wait for left search field exist
     */
    waitForLeftSearchFieldExist: {
        value: function () {
            this.waitForExist(this.xpathLeftSearchField);
        }
    },

    /**
     * @desc this function is to wait for left search field invisible
     */
    waitForLeftSearchFieldInvisible: {
        value: function () {
            this.waitForVisible(this.xpathLeftSearchField, this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to wait for Right search field exist
     */
    waitForRightSearchFieldExist: {
        value: function () {
            this.waitForExist(this.xpathRightSearchField);
        }
    },

    /**
     * @desc this function is to wait for Right search field invisible
     */
    waitForRightSearchFieldInvisible: {
        value: function () {
            this.waitForVisible(this.xpathRightSearchField, this.waitInterval, true);
        }
    },

    /**
     * @desc this function is to wait for Right Column exist
     */
    waitForRightColumnExist: {
        value: function () {
            this.waitForExist(this.xpathRightColumn);
        }
    },
    
    /**
     * @desc this function is to scroll page to top
     */
    scrollPage: {
        value: function () {
            this.scrollElementToTopSync("//div[@id='content']", 10);
        }
    },

    /**
     * @desc this function is to scroll the left DragDropColumn to top
     */
    scrollLeftItemsColumn: {
        value: function () {
            this.scrollElementToTopSync("//div[@data-id='DragDropColumn-0']/div[2]", 2);
        }
    },

    /**
     * @desc this function is to open the MultiColumnDragDrop page
     */
    openMultiColumnDragDropDemoPage: {
        value: function () {
            this.openHomePage();
            this.click(this.navComponent("Panels"));
            this.click(this.navComponent("MultiColumnDragDrop"));
            this.scrollMenuNavigation(100);
            this.waitForExist(this.xpathMultiColumnDragDropDemoPage);
        }
    }
});

module.exports = MultiColumnDragDropDemoPage;