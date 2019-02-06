const ActionsPage = require("../../pages/templates/ActionsPage");
const imgNameBase = "TemplatesActions";


describe("Actions template integration", () => {

    beforeEach(() => {
        ActionsPage.openActionsTemplatePage();
    });

    afterAll(done => {
        ActionsPage.end(done);
    });

    it("should add a row to the first list", () => {
        expect(ActionsPage.getListItems(1).value.length).toBe(2);
        ActionsPage.clickListAddRowButton(1);
        expect(ActionsPage.getListItems(1).value.length).toBe(3);

        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-list1-itemadded`);
    });

    it("should add a row to the second list", () => {
        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-base-page-top`);

        expect(ActionsPage.getListItems(2)).toBeFalsy();
        ActionsPage.clickListAddRowButton(2);
        expect(ActionsPage.getListItems(2).value.length).toBe(1);

        ActionsPage.scrollDownPage();
        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-list2-itemadded`);
    });

    it("should open and close the details tooltip", () => {
        expect(ActionsPage.getPopup()).toBeFalsy();

        ActionsPage.clickPopupButton();
        expect(ActionsPage.getPopup()).toBeTruthy();

        ActionsPage.scrollDownPage();
        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-popup-open`);

        ActionsPage.clickPopupCloseButton();
        expect(ActionsPage.getPopup()).toBeFalsy();

        ActionsPage.clickPopupButton();
        expect(ActionsPage.getPopup()).toBeTruthy();

        ActionsPage.clickPopupCancelButton();
        expect(ActionsPage.getPopup()).toBeFalsy();
    });

    it("should display page message when the details tooltip confirm button is pressed", () => {
        expect(ActionsPage.getPopup()).toBeFalsy();

        ActionsPage.clickPopupButton();
        expect(ActionsPage.getPopup()).toBeTruthy();

        ActionsPage.clickPopupConfirmButton();
        expect(ActionsPage.getPopup()).toBeFalsy();

        expect(ActionsPage.getPopup()).toBeFalsy();
        expect(ActionsPage.getPageMessage()).toBeTruthy();

        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-message-displayed`);
    });

    it("should open and close the modal", () => {
        expect(ActionsPage.getPopover()).toBeFalsy();

        ActionsPage.clickPopoverButton();
        expect(ActionsPage.getPopover()).toBeTruthy();

        ActionsPage.takeScreenshotAndCompare(`${imgNameBase}-popover-open`);

        ActionsPage.clickPopoverCloseButton();
        expect(ActionsPage.getPopover()).toBeFalsy();

        ActionsPage.clickPopoverButton();
        expect(ActionsPage.getPopover()).toBeTruthy();

        ActionsPage.clickPopoverCancelButton();
        expect(ActionsPage.getPopover()).toBeFalsy();
    });

    it("should display page message when the modal confirm button is pressed", () => {
        expect(ActionsPage.getPopover()).toBeFalsy();

        ActionsPage.clickPopoverButton();
        expect(ActionsPage.getPopover()).toBeTruthy();

        ActionsPage.clickPopoverConfirmButton();
        expect(ActionsPage.getPopover()).toBeFalsy();

        expect(ActionsPage.getPopover()).toBeFalsy();
        expect(ActionsPage.getPageMessage()).toBeTruthy();
    });
});