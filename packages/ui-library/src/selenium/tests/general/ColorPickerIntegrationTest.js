var ColorPickerPage = require("../../pages/general/ColorPickerPage.js");
describe("ColorPicker Integration", function () {

    beforeEach(function () {
        ColorPickerPage.openColorPickerDemoPage();
    });

    afterAll(function (done) {
        ColorPickerPage.end(done);
    });

    /**
     * SCENARIO: Should have color wrappers when clicking on Color Pickers
     * GIVEN: Goes to component ColorPicker
     * WHEN: Clicks on each color picker
     * THEN: The color wrapper should display
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have color wrappers when clicking on Color Pickers", ColorPickerPage.retriable(function () {
       // ColorPickerPage.openColorPickerDemoPage();

        expect(ColorPickerPage.verifyColorPickerExisting(1)).toBeTruthy();
        //click on the first color picker
        ColorPickerPage.clickColorPicker(1);
        //verify the color wrapper display
        ColorPickerPage.waitForColorWrapperEnabled(1);
        expect(ColorPickerPage.verifyColorWrapperExisting(1)).toBeTruthy();
        //take screenshot and compare
        ColorPickerPage.takeScreenshotAndCompare("ComponentColorPicker_Wrapper1");
        //click on the first color picker
        ColorPickerPage.clickColorPicker(1);
        ColorPickerPage.waitForColorWrapperInvisible(1);
        //click on the second color picker
        ColorPickerPage.clickColorPicker(2);
        //verify the color wrapper display
        ColorPickerPage.waitForColorWrapperEnabled(2);
        expect(ColorPickerPage.verifyColorWrapperExisting(2)).toBeTruthy();
        //take screenshot and compare
        ColorPickerPage.takeScreenshotAndCompare("ComponentColorPicker_Wrapper2");
    }));

    /**
     * SCENARIO: Should change the color value
     * GIVEN: Goes to component ColorPicker
     * WHEN: Inputs correct color into the field
     * THEN: The input color should be selected
     */

    it("should change the color value", ColorPickerPage.retriable(function () {
        ColorPickerPage.openColorPickerDemoPage();

        var correctColor1 = "#586fad";
        var selectedColor1 = "rgb(88, 111, 173)";
        var correctColor2 = "#c01b1b";
        var selectedColor2 = "rgb(192, 27, 27)";
        expect(ColorPickerPage.verifyColorPickerExisting(1)).toBeTruthy();
        //input correct color into the color picker 1
        ColorPickerPage.setColorPickerValue(1, correctColor1);
        //verify selected color display
        expect(ColorPickerPage.verifyDisplayedColor(1, selectedColor1)).toBeTruthy();
        //input correct color into the color picker 2
        ColorPickerPage.setColorPickerValue(2, correctColor2);
        //verify selected color display
        expect(ColorPickerPage.verifyDisplayedColor(2, selectedColor2)).toBeTruthy();
        //take screenshot and compare
        var inputColorValueFileName = "ComponentColorPicker_InputColorValue";
        ColorPickerPage.takeScreenshotAndCompare(inputColorValueFileName);
    }));
});
