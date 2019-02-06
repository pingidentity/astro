const HomePage = require("../HomePage");

const ActionsDemoPage = Object.create(HomePage, {

    /**
     * @desc open the Actions template
     */
    openActionsTemplatePage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "Actionstemplate");
        }
    },

    /**
     * @desc gets the row-builder add link based on index (either 1 or 2)
     */
    clickListAddRowButton: {
        value: function (index) {
            this.click(`//*[@data-id="list${index}-add-button"]`);
        }
    },

    /**
    * @desc returns the row builder contents based on index (either 1 or 2)
    */
    getListItems: {
        value: function (index) {
            const xpath = `//*[@data-id="input-list-${index}"]//*[@class="input-row row-builder__row"]`;
            return this.isExisting(xpath) ? this.getElements(xpath) : false;
        }
    },

    /**
     * @desc clicks the popup/details-tooltip trigger button
     */
    clickPopupButton: {
        value: function () {
            this.click("//*[@data-id='popup-button']");
        }
    },

    /**
    * @desc gets the row-builder add link based on index (either 1 or 2)
    */
    clickPopupCloseButton: {
        value: function () {
            this.click("//*[@data-id='details-close']");
        }
    },

    /**
    * @desc clicks the popup/details-tooltip cancel link/button
    */
    clickPopupCancelButton: {
        value: function () {
            this.click("//*[@data-id='popup-tooltip-cancel']");
        }
    },

    /**
    * @desc clicks the popup/details-tooltip confirm button
    */
    clickPopupConfirmButton: {
        value: function () {
            this.click("//*[@data-id='popup-tooltip-button']");
        }
    },

    /**
    * @desc returns the content of the popup/details-tooltip
    */
    getPopup: {
        value: function () {
            const xpath = "//*[@data-id='details-content']";
            return this.isExisting(xpath) ? this.getElement(xpath) : false;
        }
    },

    /**
    * @desc clicks the popover/modal trigger button
    */
    clickPopoverButton: {
        value: function () {
            this.click(`//*[@data-id="popover-button"]`);
        }
    },

    /**
    * @desc clicks the popover/modal close button (X)
    */
    clickPopoverCloseButton: {
        value: function () {
            this.click(`//*[@data-id="close-button"]`);
        }
    },

    /**
    * @desc clicks the popover/modal cancel button
    */
    clickPopoverCancelButton: {
        value: function () {
            this.click(`//*[@data-id="popover-cancel-button"]`);
        }
    },

    /**
    * @desc clicks the popover/modal confirm button
    */
    clickPopoverConfirmButton: {
        value: function () {
            this.click(`//*[@data-id="popover-confirm-button"]`);
        }
    },

    /**
    * @desc returns the popover/modal in its entirety
    */
    getPopover: {
        value: function () {
            const xpath = `//*[@data-id="popover-modal"]`;
            return this.isExisting(xpath) ? this.getElement(xpath) : false;
        }
    },

    /**
    * @desc returns the body of the popover/modal
    */
    getPopoverContent: {
        value: function () {
            const xpath = `//*[@data-id="modal-body"]`;
            return this.isExisting(xpath) ? this.getElement(xpath) : false;
        }
    },

    /**
    * @desc returns the page message
    */
    getPageMessage: {
        value: function () {
            const xpath = `//*[@data-id="messages-message-0"]//span`;
            return this.isExisting(xpath) ? this.getElement(xpath) : false;
        }
    },

    /**
    * @desc scrolls page down to reveal content below the fold
    */
    scrollDownPage: {
        value: function () {
            this.scrollElementToTop(`//div[@id="content"]`, 700);
        }
    },

});

module.exports = ActionsDemoPage;