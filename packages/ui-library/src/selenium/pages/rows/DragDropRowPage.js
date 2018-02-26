var HomePage = require("../HomePage.js");
var DragDropRowDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathDragAndDropPage: {
        get: function () {
            return "//div[@data-id='dragDropRowDemo']";
        }
    },

    /**
     * @desc this function is to check if drag and drop page existing
     */
    verifyDragAndDropPageExisting: {
        value: function () {
            return this.isExisting(this.xpathDragAndDropPage);
        }
    },

    /**
     * @desc this function open the DragNDropRowD page
     */
    openDragDropRowDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "ListsTables", "DragNDropRow");
        }
    }
});

module.exports = DragDropRowDemoPage;
