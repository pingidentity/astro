var HomePage = require("../HomePage.js");
var ColorPickerDemoPage = Object.create(HomePage, {

    /**
     * @desc this section is to get xpath of elements
     */
    xpathColorPicker: {
        value: function (index) {
            var xPath = "//div/div[{index}]/div[@data-id='color-picker{index}']//input[@data-id='colorInput-input']";
            return this.formatXpath(xPath, { index: index });
        }
    },

    xpathColorWrapper: {
        value: function (index) {
            return this.formatXpath(
                "//*[@data-parent='color-picker{index}' and @data-id='colorpicker-container']",
                { index: index }
            );
        }
    },

    /**
     * @desc this function is to get color picker
     * @private
     * @ignore
     */
    getColorPicker: {
        value: function (index) {
            return this.getElement(this.xpathColorPicker(index));
        }
    },

    /**
     * @desc this function is to check if color picker existing
     */
    verifyColorPickerExisting: {
        value: function (index) {
            return this.isExisting(this.xpathColorPicker(index));
        }
    },

    /**
     * @desc this function is to check if color wrapper existing
     */
    verifyColorWrapperExisting: {
        value: function (index) {
            return this.isExisting(this.xpathColorWrapper(index));
        }
    },

    /**
     * @desc this function is to click on color picker
     */
    clickColorPicker: {
        value: function (index) {
            this.click(this.xpathColorPicker(index));
            this.blurElement();
        }
    },

    /**
     * @desc this function is to set color value into field
     * @param {number} index - order of color picker
     * @param {string} color - value to set
     */
    setColorPickerValue: {
        value: function (index, color) {
            this.getColorPicker(index).setValue(color);
        }
    },

    /**
     * @desc this function is verify displayed color is the same as given color
     * @param {string} color - value to check
     */
    verifyDisplayedColor: {
        value: function (index, color) {
            var xPath="//span[@data-id='color-picker{index}-colors-swatch']/span[@style='background-color: {color};']";
            return this.isExisting(this.formatXpath(xPath, { index: index, color: color }));
        }
    },

    /**
     * @desc this function is to wait for color wrapper displays
     */
    waitForColorWrapperEnabled: {
        value: function (index) {
            this.waitForExist(this.xpathColorWrapper(index), this.waitInterval);
        }
    },

    /**
     * @desc this function is to wait for Color Wrapper invisible
     */
    waitForColorWrapperInvisible: {
        value: function (index) {
            this.waitForVisible(this.xpathColorWrapper(index), this.waitInterval, true);
        }
    },

    /**
     * @desc this function open the Color picker page
     */
    openColorPickerDemoPage: {
        value: function () {
            this.openHomePage();
            this.navigateToPath("Components", "ComplexInputs", "Color");
        }
    }
});

module.exports = ColorPickerDemoPage;
