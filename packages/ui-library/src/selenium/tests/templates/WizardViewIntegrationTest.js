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
    xit("should go through all steps of wizard Two Column Step", WizardViewPage.retriable(function () {
        WizardViewPage.openWizardViewDemoPage();

        //clicks on button Show wizard
        WizardViewPage.clickButtonShowWizard();
        WizardViewPage.waitForChooseWizardBoxExist();
        expect(WizardViewPage.verifyChooseWizardBoxExisting()).toBeTruthy();
        //take screenshot and compare
        var generalPageFileName = "TemplatesWizardView_GeneralPage";
        WizardViewPage.clickChooseWizardBox();
        WizardViewPage.takeElementScreenshotAndCompare(
            generalPageFileName,
            WizardViewPage.xpathInnerContent
        );

        //select wizard "Two Column Step"
        WizardViewPage.clickOptionTwoColumnStep();
        //verify the step 2 appears
        expect(WizardViewPage.verifyIconStep2Existing()).toBeTruthy();
        WizardViewPage.waitForNextButtonExist();
        var wizard1Step1FileName = "TemplatesWizardView_Wizard1Step1";
        WizardViewPage.takeElementScreenshotAndCompare(
            wizard1Step1FileName,
            WizardViewPage.xpathInnerContent
        );

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForDoneButtonExist();
        //edit page
        WizardViewPage.scrollDownDialog(300);
        WizardViewPage.clickLeftCheckboxWithoutValue();
        WizardViewPage.clickRightCheckboxWithoutValue();
        WizardViewPage.clickOptionChoice(2);
        var wizard1Step2FileName = "TemplatesWizardView_Wizard1Step2";
        WizardViewPage.takeElementScreenshotAndCompare(
            wizard1Step2FileName,
            WizardViewPage.xpathInnerContent
        );
    }));

    /**
     * SCENARIO: Should go through all steps of wizard Form Template
     * GIVEN: Goes to template Wizard View
     * WHEN: Clicks on button Show wizard
     * THEN:  the wizard box should display
     * WHEN: Selects wizard "Form Template"
     * AND: Goes through all steps of wizard Two Column Step
     * THEN: All steps should be processed normally
     */
    xit("should go through all steps of wizard Form Template", WizardViewPage.retriable(function () {
        WizardViewPage.openWizardViewDemoPage();

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
        WizardViewPage.takeElementScreenshotAndCompare(
            wizard2Step1FileName,
            WizardViewPage.xpathInnerContent
        );

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForNextButtonExist();
        //edit page
        WizardViewPage.scrollDownDialog(300);
        WizardViewPage.clickCheckboxWithoutValueWizard2();
        var wizard2Step2FileName = "TemplatesWizardView_Wizard2Step2";
        WizardViewPage.takeElementScreenshotAndCompare(
            wizard2Step2FileName,
            WizardViewPage.xpathInnerContent
        );

        //click on Next button
        WizardViewPage.clickButtonNext();
        WizardViewPage.waitForDoneButtonExist();
        var wizard2Step3FileName = "TemplatesWizardView_Wizard2Step3";
        WizardViewPage.takeElementScreenshotAndCompare(
            wizard2Step3FileName,
            WizardViewPage.xpathInnerContent
        );
    }));
});

