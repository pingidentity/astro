var HomePage = require("../HomePage.js");
var NotificationsDemoPage = Object.create(HomePage, {


    /**
     * @desc this function is to get From Address
     */
    getFromAddress: {
        get: function () {
            return this.getElement("//input[@name='fromAddress']");
        }
    },

    /**
     * @desc this function is to set FromAddress Value
     * @param {string} inputValue - the FromAddress to set
     */
    setFromAddressValue: {
        value: function (inputValue) {
            this.getFromAddress.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to get From Name
     */
    getFromName: {
        get: function () {
            return this.getElement("//input[@name='fromName']");
        }

    },

    /**
     * @desc this function is to set From Name Value
     * @param {string} inputValue - the fromname to set
     */
    setFromNameValue: {
        value: function (inputValue) {
            this.getFromName.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to get replyAddress
     */
    getReplyAddress: {
        get: function () {
            return this.getElement("//input[@name='replyAddress']");
        }
    },

    /**
     * @desc this function is to set replyAddress Value
     * @param {string} inputValue - the replyaddress to set
     */
    setReplyAddressValue: {
        value: function (inputValue) {
            this.getReplyAddress.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get replyToName
     */
    getReplyToName: {
        get: function () {
            return this.getElement("//input[@name='replyToName']");
        }
    },

    /**
     * @desc this function is to set replyToName Value
     * @param {string} inputValue - the replytoname to set
     */
    setReplyToNameValue: {
        value: function (inputValue) {
            this.getReplyToName.setValue(inputValue);
        }
    },

    /**
     * @desc this function is to get subject
     */
    getSubject: {
        get: function () {
            return this.getElement("//input[@name='subject']");
        }
    },

    /**
     * @desc this function is to set subject Value
     * @param {string} inputValue - the subject to set
     */
    setSubjectValue: {
        value: function (inputValue) {
            this.getSubject.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to get emailbody
     */
    getEmailBody: {
        get: function () {
            return this.getElement("//textarea[@name='emailBody']");
        }
    },

    /**
     * @desc this function is to set email body Value
     * @param {string} inputValue - the emailbody to set
     */
    setEmailBodyValue: {
        value: function (inputValue) {
            this.getEmailBody.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to get senderID
     */
    getSenderID: {
        get: function () {
            return this.getElement("//input[@name='senderID']");
        }
    },

    /**
     * @desc this function is to set sender id Value
     * @param {string} inputValue - the senderID to set
     */
    setSenderIDValue: {
        value: function (inputValue) {
            this.getSenderID.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to get message
     */
    getMessage: {
        get: function () {
            return this.getElement("//input[@name='message']");
        }
    },

    /**
     * @desc this function is to set message Value
     * @param {string} inputValue - the message to set
     */
    setMessageValue: {
        value: function (inputValue) {
            this.getSenderID.setValue(inputValue);
            this.blurElement();
        }
    },

    /**
     * @desc this function is to select the a tags from the list nav
     */
    clickListNavLocation: {
        value: function () {
            this.click("//a[@data-id='list-nav_nav-link_one']");
        }
    },

    /**
     * @desc this function is to click add langauage buttont
     */
    clickDefaultLanguageButton: {
        value: function () {
            this.click("//div[@data-id='link-dropdown-list-label']");
        }
    },

    /**
     * @desc this function is to click add langauage buttont
     */
    clickLanguageButton: {
        value: function () {
            this.click("//span[@data-id='confirm-tooltip']");
        }
    },

    /**
     * @desc this function is to click cancel on tooltip
     */
    clickCancelLanguageButton: {
        value: function () {
            this.click("//a[@data-id='confirm-tooltip-cancel']");
        }
    },

    /**
     * @desc this function is to click on Discard button
     */
    clickButtonCancel: {
        value: function () {
            this.click("//input[@value='Discard Changes']");
        }
    },

    /**
     * @desc this function is to click on Save button
     */
    clickButtonSave: {
        value: function () {
            this.click("//input[@value='Save']");
        }
    },

    /**
     * @desc this function is to scroll down the page
     * @param {string} y - the offset to scroll
     */
    scrollDownPage: {
        value: function (y) {
            this.scrollElementToTop("//div[@id='content']", y);
        }
    },

    /**
     * @desc this function open the Notifications Template
     */
    openNotificationsDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "Notifications");
        }
    }
});



module.exports = NotificationsDemoPage;
