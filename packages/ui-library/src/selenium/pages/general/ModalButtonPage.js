var HomePage = require("../HomePage.js");
var ModalButtonDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathOpenDefaultModalButton: {
        get: function () {
            return "//button[@data-id='default-example-button']";
        }
    },

    xpathOpenMaximizedModalButton: {
        get: function () {
            return "//button[@data-id='maximized-modal-button']";
        }
    },

    xpathOpenDialogModalButton: {
        get: function () {
            return "//button[@data-id='dialog-modal-button']";
        }
    },

    xpathOpenAlertModal: {
        get: function () {
            return "//button[@data-id='alert-modal-button']";
        }
    },

    /**
     * @desc this function is to check if OpenDefaultModal Button existing
     */
    verifyOpenDefaultModalButtonExisting: {
        value: function () {
            return this.isExisting(this.xpathOpenDefaultModalButton);
        }
    },

    /**
     * @desc this function is click on OpenDefaultModal Button
     */
    clickOpenDefaultModalButton: {
        value: function () {
            this.click(this.xpathOpenDefaultModalButton);
        }
    },

    /**
     * @desc this function is to check if OpenMaximizedModal Button existing
     */
    verifyOpenMaximizedModalButtonExisting: {
        value: function () {
            return this.isExisting(this.xpathOpenMaximizedModalButton);
        }
    },

    /**
     * @desc this function is to click on OpenMaximizedModal Button
     */
    clickOpenMaximizedModalButton: {
        value: function () {
            this.click(this.xpathOpenMaximizedModalButton);
        }
    },

    /**
     * @desc this function is to check if OpenDialogModal Button existing
     */
    verifyOpenDialogModalButtonExisting: {
        value: function () {
            return this.isExisting(this.xpathOpenDialogModalButton);
        }
    },

    /**
     * @desc this function is to click on OpenDialogModal Button
     */
    clickOpenDialogModalButton: {
        value: function () {
            this.click(this.xpathOpenDialogModalButton);
        }
    },

    /**
     * @desc this function is to check if OpenAlertModal Button existing
     */
    verifyOpenAlertModalButtonExisting: {
        value: function () {
            return this.isExisting(this.xpathOpenAlertModal);
        }
    },

    /**
     * @desc this function is to click on OpenAlertModal Button
     */
    clickOpenAlertModalButton: {
        value: function () {
            this.click(this.xpathOpenAlertModal);
        }
    },

    /**
     * @desc this function is to check if the dialog is closed
     */
    isModalDialogClosed: {
        get: function () {
            return !this.isExisting("//div[@data-id='modal-body']");
        }
    },

    /**
     * @desc this function is to check if ModalDialog existing
     */
    verifyModalDialogExisting: {
        value: function () {
            return this.isExisting("//div[@data-id='modal-body']");
        }
    },

    /**
     * @desc this function is to click on Icon Close Dialog
     */
    clickIconCloseDialog: {
        value: function () {
            this.click("//span[@data-id='close-button']");
        }
    },

    /**
     * @desc this function is to click on Nope button
     */
    clickNopeButton: {
        value: function () {
            this.click("//button[@data-id='nopeButton']");
        }
    },

    /**
     * @desc this function is to click on Yup button
     */
    clickYupButton: {
        value: function () {
            this.click("//button[@data-id='yupButton']");
        }
    },

    /**
     * @desc this function is to click on Discard Changes Button
     */
    clickDiscardChangesButton: {
        value: function () {
            this.click("//button[@data-id='discardChangesButton']");
        }
    },

    /**
     * @desc this function is to click on Save button
     */
    clickSaveButton: {
        value: function () {
            this.click("//button[@data-id='saveButton']");
        }
    },

    /**
     * @desc this function is to click on Cancel button
     */
    clickCancelButton: {
        value: function () {
            this.click("//a[@data-id='cancelLink']");
        }
    },

    /**
     * @desc this function open the component
     */
    openModalButtonDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "ModalsTooltips", "ModalButton");
            this.waitForExist(this.xpathOpenDefaultModalButton);
        }
    }
});

module.exports = ModalButtonDemoPage;
