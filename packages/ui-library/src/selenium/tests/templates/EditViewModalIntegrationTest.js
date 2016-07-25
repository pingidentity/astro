var EditViewModalPage = require("../../pages/templates/EditViewModalPage.js");

describe("Edit View Modal Integration", function () {
    
    beforeEach(function () {
        EditViewModalPage.openEditViewModalDemoPage();
    });

    afterAll(function (done) {
        EditViewModalPage.end(done);
    });

    /**
     * SCENARIO: Should be clickable for button Open Default Modal and icon to close dialog"
     * GIVEN: Goes to Edit View Modal template
     * WHEN: Clicks on button Open Default Modal
     * THEN: The dialog Default Modal should display
     * WHEN: Clicks on icon close
     * THEN: The dialog should be closed
     */
    it("should be clickable for button Open Default Modal and icon to close dialog", function () {
        expect(EditViewModalPage.verifyButtonOpenDefaultModalExisting).toBeTruthy();
        //click on button Open Default Modal
        EditViewModalPage.clickButtonOpenDefaultModal();
        EditViewModalPage.waitForDialogDefaultModalExist();
        expect(EditViewModalPage.verifyDialogDefaultModalExisting).toBeTruthy();
        //take screenshot and compare
        var dialogDefaultModalFilename = "TemplatesEditViewModal_DialogDefaultModal";
        expect(EditViewModalPage.takeScreenshotAndCompare(dialogDefaultModalFilename)).toBeTruthy();
        //click on icon close to close dialog
        EditViewModalPage.clickIconCloseDialog();
    });

    /**
     * SCENARIO: Should input value for all field and click on cancel button
     * GIVEN: Goes to Edit View Modal template
     * WHEN: Clicks on button Open Default Modal
     * AND: Inputs value for all fields
     * AND: Clicks on cancel button
     * THEN: The dialog should be closed
     */
    it("should input value for all field and click on cancel button", function () {
        expect(EditViewModalPage.verifyButtonOpenDefaultModalExisting).toBeTruthy();
        //click on button Open Default Modal
        EditViewModalPage.clickButtonOpenDefaultModal();
        EditViewModalPage.waitForDialogDefaultModalExist();
        //input value for all fields
        EditViewModalPage.setFirstNameValue("First Name");
        EditViewModalPage.setLastNameValue("Last Name");
        EditViewModalPage.setUserNameValue("UserName");
        EditViewModalPage.setAddressValue(1, "Address1");
        EditViewModalPage.setAddressValue(2, "Address2");
        EditViewModalPage.scrollDownDialog(100);
        EditViewModalPage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewModalPage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewModalPage.selectAddressLocation("work");
        EditViewModalPage.selectAlternateAddressLocation("other");
        EditViewModalPage.scrollDownDialog(800);
        EditViewModalPage.clickUserGroup(2);
        EditViewModalPage.clickCheckboxActiveUser();
        //click on Cancel button
        EditViewModalPage.clickButtonCancel();
    });

    /**
     * SCENARIO: Should input value for all field and click on Save button
     * GIVEN: Goes to Edit View Modal template
     * WHEN: Clicks on button Open Default Modal
     * AND: Inputs value for all fields
     * AND: Clicks on Save button
     * THEN: The dialog should be closed
     */
    it("should input value for all field and click on Save button", function () {
        expect(EditViewModalPage.verifyButtonOpenDefaultModalExisting).toBeTruthy();
        //click on button Open Default Modal
        EditViewModalPage.clickButtonOpenDefaultModal();
        EditViewModalPage.waitForDialogDefaultModalExist();
        //input value for all fields
        EditViewModalPage.setFirstNameValue("First Name");
        EditViewModalPage.setLastNameValue("Last Name");
        EditViewModalPage.setUserNameValue("UserName");
        EditViewModalPage.setAddressValue(1, "Address1");
        EditViewModalPage.setAddressValue(2, "Address2");
        EditViewModalPage.scrollDownDialog(100);
        EditViewModalPage.setAlternateAddressValue(1, "AlternateAddress1");
        EditViewModalPage.setAlternateAddressValue(2, "AlternateAddress2");
        EditViewModalPage.selectAddressLocation("work");
        EditViewModalPage.selectAlternateAddressLocation("other");
        EditViewModalPage.scrollDownDialog(800);
        EditViewModalPage.clickUserGroup(2);
        EditViewModalPage.clickCheckboxActiveUser();
        //click on Save button
        EditViewModalPage.clickButtonSave();
    });
});

