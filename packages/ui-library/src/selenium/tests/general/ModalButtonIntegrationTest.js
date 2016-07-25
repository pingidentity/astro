var ModalButtonPage = require("../../pages/general/ModalButtonPage.js");

describe("ModalButtonPage Integration", function () {
    
    beforeEach(function () {
        ModalButtonPage.openModalButtonDemoPage();
    });

    afterAll(function (done) {
        ModalButtonPage.end(done);
    });

    /**
     * SCENARIO: Should open the Open Default Modal
     * GIVEN: Goes to component Modal button
     * WHEN: Clicks on Open Default Modal button
     * THEN: The modal dialog should display
     */
    it("should open the Open Default Modal", function () {
        expect(ModalButtonPage.verifyOpenDefaultModalButtonExisting()).toBeTruthy();
        //click on Open Default Modal button
        ModalButtonPage.clickOpenDefaultModalButton();
        //verify the dialog displays
        expect(ModalButtonPage.verifyModalDialogExisting()).toBeTruthy();
        //take screenshot and compare
        var defaultModalDialogFileName = "ComponentModalButton_DefaultModalDialog";
        expect(ModalButtonPage.takeScreenshotAndCompare(defaultModalDialogFileName)).toBeTruthy();
        //click on close icon to close the dialog
        ModalButtonPage.clickIconCloseDialog();
    });

    /**
     * SCENARIO: Should open the Open Maximized Modal
     * GIVEN: Goes to component Modal button
     * WHEN: Clicks on Open Maximized Modal button
     * THEN: The modal dialog should display
     */
    it("should open the Open Maximized Modal", function () {
        expect(ModalButtonPage.verifyOpenMaximizedModalButtonExisting()).toBeTruthy();
        //click on Open Default Modal button
        ModalButtonPage.clickOpenMaximizedModalButton();
        //verify the dialog displays
        expect(ModalButtonPage.verifyModalDialogExisting()).toBeTruthy();
        //take screenshot and compare
        var maximizedModalFileName = "ComponentModalButton_MaximizedModalDialog";
        expect(ModalButtonPage.takeScreenshotAndCompare(maximizedModalFileName)).toBeTruthy();
        //click on close icon to close the dialog
        ModalButtonPage.clickIconCloseDialog();
    });
    
    /**
     * SCENARIO: Should open the Open Dialog Modal
     * GIVEN: Goes to component Modal button
     * WHEN: Clicks on Open Dialog Modal button
     * THEN: The modal dialog should display
     * WHEN: Clicks on Nope button
     * THEN: The dialog should close
     * WHEN: Clicks on Open Dialog Modal button
     * AND: Clicks on Yup button
     * THEN: The dialog should close
     */
    it("should open the Open Dialog Modal", function () {
        expect(ModalButtonPage.verifyOpenDialogModalButtonExisting()).toBeTruthy();
        //click on Open Dialog Modal button
        ModalButtonPage.clickOpenDialogModalButton();
        //verify the dialog displays
        expect(ModalButtonPage.verifyModalDialogExisting()).toBeTruthy();
        //take screenshot and compare
        var modalDialogFileName = "ComponentModalButton_ModalDialog";
        expect(ModalButtonPage.takeScreenshotAndCompare(modalDialogFileName)).toBeTruthy();
        //click on Nope button
        ModalButtonPage.clickNopeButton();
        expect(ModalButtonPage.isModalDialogClosed).toBeTruthy();
        //open the dialog again
        ModalButtonPage.clickOpenDialogModalButton();
        //click on Nope button
        ModalButtonPage.clickYupButton();
        expect(ModalButtonPage.isModalDialogClosed).toBeTruthy();
    });

    /**
     * SCENARIO: Should open the Open Alert Modal
     * GIVEN: Goes to component Modal button
     * WHEN: Clicks on Open Alert Modal button
     * THEN: The modal dialog should display
     * WHEN: Clicks on DisgardChanges button
     * THEN: The dialog should close
     * WHEN: Clicks on OpenAlertModal button
     * AND: Clicks on Save button
     * THEN: The dialog should close
     * WHEN: Clicks on OpenAlertModal button
     * AND: Clicks on Cancel button
     * THEN: The dialog should close
     */
    it("should open the Open Alert Modal", function () {
        expect(ModalButtonPage.verifyOpenAlertModalButtonExisting()).toBeTruthy();
        //click on Open Alert Modal  button
        ModalButtonPage.clickOpenAlertModalButton();
        //verify the dialog displays
        expect(ModalButtonPage.verifyModalDialogExisting()).toBeTruthy();
        //take screenshot and compare
        var alertModalFileName = "ComponentModalButton_AlertModalDialog";
        expect(ModalButtonPage.takeScreenshotAndCompare(alertModalFileName)).toBeTruthy();
        //click on Disgard Changes button
        ModalButtonPage.clickDisgardChangesButton();
        expect(ModalButtonPage.isModalDialogClosed).toBeTruthy();
        //open the dialog again
        ModalButtonPage.clickOpenAlertModalButton();
        //click on Save button
        ModalButtonPage.clickSaveButton();
        expect(ModalButtonPage.isModalDialogClosed).toBeTruthy();
        //open the dialog again
        ModalButtonPage.clickOpenAlertModalButton();
        //click on Cancel button
        ModalButtonPage.clickCancelButton();
        expect(ModalButtonPage.isModalDialogClosed).toBeTruthy();
    });
});