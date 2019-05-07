const HomePage = require ("../HomePage.js");
const CustomBrandingtDemoPage = Object.create(HomePage, {

    clickRestoreDefaults: {
        value: function () {
            this.click("//a[@data-id='action-btn']");
        }
    },

    clickDetailsClose: {
        value: function () {
            this.click("//span[@data-id='details-close']");
        }
    },

    hoverLogoHelpHint: {
        value: function () {
            this.hover("//div[@data-id='helphint-logo']");
        }
    },

    hoverLogo: {
        value: function () {
            this.hover("//div[@data-id='logo']");
        }
    },

    clickLogoRadioButton: {
        value: function () {
            this.click("//input[@name='logo-radio']/following::div");
        }
    },

    hoverBgHelpHint: {
        value: function () {
            this.hover("//div[@data-id='helphint-background']");
        }
    },

    hoverBg: {
        value: function () {
            this.hover("//div[@data-id='main-background']");
        }
    },

    clickBgRadioButton: {
        value: function () {
            this.click("//input[@name='bg-radio']/following::div");
        }
    },

    hoverFormBgColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-bg']//div[@data-id='help-tooltip-target']");
        }
    },

    clickBgColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-bg']");
        }
    },

    getBgColorPicker: {
        value: function () {
            return this.getElement("//input[@data-id='colorInput-input']");
        }
    },

    setBgColorPickerValue: {
        value: function (index, color) {
            this.getBgColorPicker(index).setValue(color);
        }
    },


    scrollToButtonSection: {
        value: function () {
            this.scrollToElement("div", "button-section");
        }
    },

    hoverButtonSection: {
        value: function () {
            this.hover("//div[@data-id='button-section']");
        }
    },

    hoverButtonColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-button']//div[@data-id='help-tooltip-target']");
        }
    },

    hoverButtonFontColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-button-font']//div[@data-id='help-tooltip-target']");
        }
    },


    clickButtonColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-button']");
        }
    },

    getButtonColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-button']//following::input");
        }
    },

    setButtonColorPickerValue: {
        value: function (index, color) {
            this.getButtonColorPicker(index).setValue(color);
        }
    },

    clickButtonFontColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-button-font']");
        }
    },

    getButtonFontColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-button-font']//following::input");
        }
    },

    setButtonFontColorPickerValue: {
        value: function (index, color) {
            this.getButtonFontColorPicker(index).setValue(color);
        }
    },

    scrollToTextSection: {
        value: function () {
            this.scrollToElement("div", "text-section");
        }
    },

    hoverTextSection: {
        value: function () {
            this.hover("//div[@data-id='button-section']");
        }
    },

    hoverTextFillColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-text-form-fill']//div[@data-id='help-tooltip-target']");
        }
    },

    hoverTextFontColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-text-font']//div[@data-id='help-tooltip-target']");
        }
    },

    hoverTextLinkColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-text-link']//div[@data-id='help-tooltip-target']");
        }
    },

    hoverTextHeaderColorPickerHelpHint: {
        value: function () {
            this.hover("//div[@data-id='color-picker-text-header']//div[@data-id='help-tooltip-target']");
        }
    },

    clickTextFormFillColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-text-form-fill']");
        }
    },

    getTextFormFillColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-text-form-fill']//following::input");
        }
    },

    setTextFormFillColorPickerValue: {
        value: function (index, color) {
            this.getTextFormFillColorPicker(index).setValue(color);
        }
    },

    clickTextFontColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-text-font']");
        }
    },

    getTextFontColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-text-font']//following::input");
        }
    },

    setTextFontColorPickerValue: {
        value: function (index, color) {
            this.getTextFontColorPicker(index).setValue(color);
        }
    },

    clickTextLinkColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-text-link']");
        }
    },

    getTextLinkColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-text-link']//following::input");
        }
    },

    setTextLinkColorPickerValue: {
        value: function (index, color) {
            this.getTextLinkColorPicker(index).setValue(color);
        }
    },

    clickTextHeaderColorPicker: {
        value: function () {
            this.click("//div[@data-id='color-picker-text-header']");
        }
    },

    getTextHeaderColorPicker: {
        value: function () {
            return this.getElement("//div[@data-id='color-picker-text-header']//following::input");
        }
    },

    setTextHeaderColorPickerValue: {
        value: function (index, color) {
            this.getTextHeaderColorPicker(index).setValue(color);
        }
    },

    scrollToContentSection: {
        value: function () {
            this.scrollToElement("div", "content-section");
        }
    },

    hoverContentSection: {
        value: function () {
            this.hover("//div[@data-id='content-section']");
        }
    },

    clickRegistrationPageHeaderInput: {
        value: function () {
            this.click("//input[@data-id='registration-page-header-input']");
        }
    },

    clickRegistrationPageTextInput: {
        value: function () {
            this.click("//input[@data-id='registration-page-text-input']");
        }
    },

    getRegistrationPageHeader: {
        get: function () {
            return this.getElement("//input[@data-id='registration-page-header-input']");
        }
    },

    setRegistrationPageHeader: {
        value: function (inputValue) {
            this.getRegistrationPageHeader.setValue(inputValue);
        }
    },

    getRegistrationPageText: {
        get: function () {
            return this.getElement("//input[@data-id='registration-page-text-input']");
        }
    },

    setRegistrationPageText: {
        value: function (inputValue) {
            this.getRegistrationPageText.setValue(inputValue);
        }
    },


    scrollToBottom: {
        value: function () {
            this.scrollToElement("input", "reset-password-header-input");
        }
    },

    /**
     * @desc this function is to open template Custom Branding
     */
    openCustomBrandingDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Templates", "PropertySpecific", "CustomBranding");
        }
    }
});

module.exports = CustomBrandingtDemoPage;

