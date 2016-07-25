var WizardPage = require("../../pages/wizard/WizardPage.js");

describe("Wizard Integration", function () {

    beforeEach(function () {
        WizardPage.openWizardDemoPage();
    });

    afterAll(function (done) {
        WizardPage.end(done);
    });

    /**
     * SCENARIO: Should have the pulsing when clicking on the Next buttons and Done button
     * GIVEN: Goes to Wizard component
     * WHEN: Clicks on the check-box Pulsing
     * AND: Selects a Wizard
     * AND: Goes through all steps
     * THEN: The pulsing button should be displayed instead of normal button
     * WHEN: Edits each step
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should have the pulsing when clicking on the Next buttons and Done button", function () {
        expect(WizardPage.verifyPulsingCheckboxExisting()).toBeTruthy();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_GeneralPage")).toBeTruthy();
        //check use Pulsing checkbox
        WizardPage.clickPulsingCheckbox();
        //Select wizard 1
        WizardPage.selectWizardCheckbox(0);
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard1Step1")).toBeTruthy();
        //click button next
        WizardPage.clickNextButton();
        //Verify the pulsing loading
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeTruthy();
        //verify the step 2 appears
        expect(WizardPage.verifyIconStep2Existing()).toBeTruthy();
        WizardPage.waitForNextButtonPulsingInvisible();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard1Step2")).toBeTruthy();
        //click button next
        WizardPage.clickNextButton();
        //Verify the pulsing loading
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeTruthy();
        WizardPage.waitForNextButtonPulsingInvisible();
        //verify the step 3 appears
        expect(WizardPage.verifyIconStep3Existing()).toBeTruthy();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard1Step3")).toBeTruthy();
        //Verify edit link at step 1  and step 2
        expect(WizardPage.verifyLinkEditStep1Existing()).toBeTruthy();
        expect(WizardPage.verifyLinkEditStep2Existing()).toBeTruthy();
        //click on edit link at step 2
        WizardPage.clickLinkEditStep2();
        //click button next
        WizardPage.clickNextButton();
        //Verify the pulsing loading
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeTruthy();
        //click button Done
        WizardPage.waitForNextButtonPulsingInvisible();
        WizardPage.clickDoneButton();
        //Verify the pulsing loading
        expect(WizardPage.verifyDoneButtonPulsingExisting()).toBeTruthy();
        WizardPage.waitForDoneButtonPulsingInvisible();
    });

    /**
     * SCENARIO: Should have not the pulsing when clicking on the Next buttons and Done button
     * GIVEN: Goes to Wizard component
     * WHEN: Uncheckes the check box Pulsing
     * THEN: There should be no pulsing button after clicking on Next button
     * WHEN: Goes through all steps
     * THEN: There should be Done button at final step
     * WHEN: Goes to each step
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should not have the pulsing when clicking on the Next buttons and Done button", function () {
        expect(WizardPage.verifyPulsingCheckboxExisting()).toBeTruthy();
        //Select wizard 2
        WizardPage.selectWizardCheckbox(2);
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard2Step1")).toBeTruthy();
        //click button next
        WizardPage.clickNextButton();
        //Verify there is no the pulsing
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeFalsy();
        //verify the step 2 appears
        expect(WizardPage.verifyIconStep2Existing()).toBeTruthy();
        WizardPage.waitForNextButtonExist();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard2Step2")).toBeTruthy();
        //click button next
        WizardPage.clickNextButton();
        //Verify there is no the pulsing
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeFalsy();
        WizardPage.waitForNextButtonExist();
        //verify the step 3 appears
        expect(WizardPage.verifyIconStep3Existing()).toBeTruthy();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard2Step3")).toBeTruthy();
        //click button next step 3
        WizardPage.clickNextButton();
        expect(WizardPage.verifyIconStep4Existing()).toBeTruthy();
        WizardPage.waitForDoneButtonExist();
        //Verify edit link at step 1  and step 2
        expect(WizardPage.verifyLinkEditStep1Existing()).toBeTruthy();
        expect(WizardPage.verifyLinkEditStep2Existing()).toBeTruthy();
        expect(WizardPage.verifyLinkEditStep3Existing()).toBeTruthy();
        //click on edit link at step 3
        WizardPage.clickLinkEditStep3();
        //click button next
        WizardPage.clickNextButton();
        //Verify there is no the pulsing
        expect(WizardPage.verifyNextButtonPulsingExisting()).toBeFalsy();
        //click button Done
        WizardPage.waitForDoneButtonExist();
        //take screenshot and compare
        expect(WizardPage.takeScreenshotAndCompare("ComponentWizard_Wizard2Step4")).toBeTruthy();
        WizardPage.clickDoneButton();
        //Verify there is no the pulsing
        expect(WizardPage.verifyDoneButtonPulsingExisting()).toBeFalsy();
    });
});

