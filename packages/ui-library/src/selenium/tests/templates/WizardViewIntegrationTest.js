var WizardViewPage = require("../../pages/templates/WizardViewPage.js");

describe("Wizard View Integration", function () {

    beforeEach(function () {
        WizardViewPage.openWizardViewDemoPage();
    });

    afterAll(function (done) {
        WizardViewPage.end(done);
    });

    /**
     * SCENARIO: Should go through all steps of wizard Two Column Step
     * GIVEN: Goes to template Wizard View
     * WHEN: Clicks on button Show wizard
     * THEN: The wizard box should display
     * WHEN: Selects wizard "Two Column Step"
     * AND: Goes through all steps of wizard Two Column Step
     * THEN: All steps should be processed normally
     */
    it("should go through all steps of wizard Two Column Step", function () {
        var contentDemoXpath = "//div[@data-id='modal-content']";

        //clicks on button Show wizard
        WizardViewPage.clickButtonShowWizard();
        WizardViewPage.waitForChooseWizardBoxExist();
        expect(WizardViewPage.verifyChooseWizardBoxExisting()).toBeTruthy();
        //take screenshot and compare
        var generalPageFileName = "TemplatesWizardView_GeneralPage";
        WizardViewPage.clickChooseWizardBox();
        expect(WizardViewPage.takeElementScreenshotAndCompare(generalPageFileName, contentDemoXpath)).toBeTruthy();

        //select wizard "Two Column Step"
        WizardViewPage.clickOptionTwoColumnStep();
        //verify the step 2 appears
        expect(WizardViewPage.verifyIconStep2Existing()).toBeTruthy();
        WizardViewPage.waitForNextButtonExist();
        var wizard1Step1FileName = "TemplatesWizardView_Wizard1Step1";
        expect(WizardViewPage.takeElementScreenshotAndCompare(wizard1Step1FileName, contentDemoXpath)).toBeTruthy();

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForDoneButtonExist();
        //edit page
        WizardViewPage.scrollDownDialog(300);
        WizardViewPage.clickLeftCheckboxWithoutValue();
        WizardViewPage.clickRightCheckboxWithoutValue();
        WizardViewPage.clickOptionChoice(2);
        var wizard1Step2FileName = "TemplatesWizardView_Wizard1Step2";
        expect(WizardViewPage.takeElementScreenshotAndCompare(wizard1Step2FileName, contentDemoXpath)).toBeTruthy();
    });

    /**
     * SCENARIO: Should go through all steps of wizard Form Template
     * GIVEN: Goes to template Wizard View
     * WHEN: Clicks on button Show wizard
     * THEN:  the wizard box should display
     * WHEN: Selects wizard "Form Template"
     * AND: Goes through all steps of wizard Two Column Step
     * THEN: All steps should be processed normally
     */
    it("should go through all steps of wizard Form Template", function () {
        var contentDemoXpath = "//div[@data-id='modal-content']";

        //clicks on button Show wizard
        WizardViewPage.clickButtonShowWizard();
        WizardViewPage.waitForChooseWizardBoxExist();
        expect(WizardViewPage.verifyChooseWizardBoxExisting()).toBeTruthy();
        //select wizard "Two Column Step"
        WizardViewPage.clickOptionFormTemplate();
        //verify the step 2 appears
        expect(WizardViewPage.verifyIconStep2Existing()).toBeTruthy();
        WizardViewPage.waitForNextButtonExist();
        var wizard2Step1FileName = "TemplatesWizardView_Wizard2Step1";
        expect(WizardViewPage.takeElementScreenshotAndCompare(wizard2Step1FileName, contentDemoXpath)).toBeTruthy();

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForNextButtonExist();
        //edit page
        WizardViewPage.scrollDownDialog(300);
        WizardViewPage.clickCheckboxWithoutValueWizard2();
        var wizard2Step2FileName = "TemplatesWizardView_Wizard2Step2";
        expect(WizardViewPage.takeElementScreenshotAndCompare(wizard2Step2FileName, contentDemoXpath)).toBeTruthy();

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForDoneButtonExist();
        var wizard2Step3FileName = "TemplatesWizardView_Wizard2Step3";
        expect(WizardViewPage.takeElementScreenshotAndCompare(wizard2Step3FileName, contentDemoXpath)).toBeTruthy();
    });
});

