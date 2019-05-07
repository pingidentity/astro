const CustomBrandingTemplatePage = require("../../pages/templates/CustomBrandingTemplatePage.js");

describe("Custom Branding", function () {


    beforeAll(function () {
        CustomBrandingTemplatePage.openCustomBrandingDemoPage();
    });


    afterAll(function (done) {
        CustomBrandingTemplatePage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to CustomBranding template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("general page screenshot", CustomBrandingTemplatePage.retriable(function () {


        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_GeneralPage");

    }));

    it("clicks the restore defaults button", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.clickRestoreDefaults();

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_RestoreDefaults");

        CustomBrandingTemplatePage.clickDetailsClose();

    }));

    it("hovers the logo helphint", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.hoverLogoHelpHint();

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_LogoHelpHint");

        CustomBrandingTemplatePage.hoverLogo();


    }));

    it("clicks the background radio button", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.clickBgRadioButton();

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_BackgroundRadio");

    }));

    it("clicks the background color picker  and sets the color", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.clickBgColorPicker();

        CustomBrandingTemplatePage.setBgColorPickerValue(1,"#566");

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_BgColorPicker");

        CustomBrandingTemplatePage.clickBgColorPicker();

    }));


    it("scroll to button section", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.scrollToButtonSection();


        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_ButtonSection");

    }));

    it("scroll to text section", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.scrollToTextSection();


        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_TextSection");

    }));

    it("scroll to content section", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.scrollToContentSection();

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_ContentSection");


    }));

    it("enters text in registration page header", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.setRegistrationPageHeader("Ping");

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_ContentRegistrationPageHeader");


    }));

    it("enters text into registration page text", CustomBrandingTemplatePage.retriable(function () {

        CustomBrandingTemplatePage.setRegistrationPageText("this is some text");

        CustomBrandingTemplatePage.takeScreenshotAndCompare("CustomBranding_ContentRegistrationText");


    }));

});