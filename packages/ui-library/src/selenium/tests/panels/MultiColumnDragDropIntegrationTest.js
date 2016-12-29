var MultiColumnDragDropPage = require("../../pages/panels/MultiColumnDragDropPage.js");

describe("Multi Column Drag Drop Integration", function () {

    beforeEach(function () {
        MultiColumnDragDropPage.openMultiColumnDragDropDemoPage();
    });

    afterAll(function (done) {
        MultiColumnDragDropPage.end(done);
    });

    /**
     * SCENARIO: Should select Search options
     * GIVEN: Goes to Multi Column Drag Drop from panels section
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Selects each search option
     * THEN: The search field should display the same as the selected option
     */
    it("should select Search options", MultiColumnDragDropPage.retriable(function () {
        MultiColumnDragDropPage.openMultiColumnDragDropDemoPage();

        var leftSearch = "//div[@data-id='DragDropColumn-0']//input[@data-id='form-text-field-input']";
        var rightSearch = "//div[@data-id='DragDropColumn-1']//input[@data-id='form-text-field-input']";

        expect(MultiColumnDragDropPage.verifyMultiColumnDragDropDemoPageExisting()).toBeTruthy();
        //take screenshot and compare
        var generalPageFileName = "MultiColumnDragDrop_GeneralPage";
        MultiColumnDragDropPage.takeScreenshotAndCompare(generalPageFileName);
        //select Search option "None"
        MultiColumnDragDropPage.selectSearchOptionNone();
        //verify all search field are disappeared
        MultiColumnDragDropPage.waitForRightSearchFieldInvisible();
        expect(MultiColumnDragDropPage.isExisting(leftSearch)).toBeFalsy();
        expect(MultiColumnDragDropPage.isExisting(rightSearch)).toBeFalsy();
        //take screenshot and compare
        var NoneSearchFileName = "MultiColumnDragDrop_NoneSearchField";
        MultiColumnDragDropPage.takeScreenshotAndCompare(NoneSearchFileName);
        //select search option first column only
        MultiColumnDragDropPage.selectSearchOptionFirstColumnOnly();
        MultiColumnDragDropPage.waitForLeftSearchFieldExist();
        //verify there is only left search field exist
        expect(MultiColumnDragDropPage.verifyLeftSearchFieldExisting()).toBeTruthy();
        expect(MultiColumnDragDropPage.isExisting(rightSearch)).toBeFalsy();
        //select search option all
        MultiColumnDragDropPage.selectSearchOptionAll();
        MultiColumnDragDropPage.waitForRightSearchFieldExist();
        //verify there is only left search field exist
        expect(MultiColumnDragDropPage.verifyLeftSearchFieldExisting()).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyRightSearchFieldExisting()).toBeTruthy();
    }));

    /**
     * SCENARIO: Should select Row options
     * GIVEN: Goes to Multi Column Drag Drop from panels section
     * WHEN: Selects each row options
     * THEN: The item list should display
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */
    it("should select Row options", MultiColumnDragDropPage.retriable(function () {
        MultiColumnDragDropPage.openMultiColumnDragDropDemoPage();

        expect(MultiColumnDragDropPage.verifyMultiColumnDragDropDemoPageExisting()).toBeTruthy();
        //select row option icon only
        MultiColumnDragDropPage.selectRowOptionIconOnly();
        //verify there is only icon of the item
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(1)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(2)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(3)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(10)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(12)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(0)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(1)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(2)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(11)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(12)).toBeFalsy();
        //take screenshot and compare
        var rowOnlyIconFileName = "MultiColumnDragDrop_RowOnlyIcon";
        MultiColumnDragDropPage.takeScreenshotAndCompare(rowOnlyIconFileName);
        //select row option text only
        MultiColumnDragDropPage.selectRowOptionTextOnly();
        //verify there is only text of the item
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(0)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(1)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(2)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(11)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(12)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(0)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(1)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(2)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(11)).toBeFalsy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(12)).toBeFalsy();
        //take screenshot and compare
        var rowOnlyTextFileName = "MultiColumnDragDrop_RowOnlyText";
        MultiColumnDragDropPage.takeScreenshotAndCompare(rowOnlyTextFileName);
        //select row option text and icon
        MultiColumnDragDropPage.selectRowOptionIconAndText();
        //verify the items display with both icon and text
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(0)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(1)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(2)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(11)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyNameOfItemExisting(12)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(0)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(1)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(2)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(11)).toBeTruthy();
        expect(MultiColumnDragDropPage.verifyIconOfItemExisting(12)).toBeTruthy();
        //take screenshot and compare
        var rowIconAndTextFileName = "MultiColumnDragDrop_RowWithIconAndText";
        MultiColumnDragDropPage.takeScreenshotAndCompare(rowIconAndTextFileName);
    }));
    
    /**
     * SCENARIO: Should add and remove item
     * GIVEN: Goes to Multi Column Drag Drop from panels section
     * WHEN: Adds some items to the right column
     * THEN: The items should be added to the right column
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Removes some items to the left column
     * THEN: The items should be removed
     */
    it("should add and remove item", MultiColumnDragDropPage.retriable(function () {
        MultiColumnDragDropPage.openMultiColumnDragDropDemoPage();

        expect(MultiColumnDragDropPage.verifyMultiColumnDragDropDemoPageExisting()).toBeTruthy();
        //add some items to the right column
        MultiColumnDragDropPage.addItemToRightColumn(0);
        //verify the added items display at the right column
        expect(MultiColumnDragDropPage.verifyAddedItemToRightColumnExisting(0)).toBeTruthy();
        //take screenshot and compare
        MultiColumnDragDropPage.scrollLeftItemsColumn();
        var addedItemsFileName = "MultiColumnDragDrop_addedItemsToRightColumn";
        MultiColumnDragDropPage.takeScreenshotAndCompare(addedItemsFileName);

        //remove some items to the left column
        MultiColumnDragDropPage.removeItemToLeftColumn(12);
        //verify removed items display at the left column
        expect(MultiColumnDragDropPage.verifyRemovedItemToLeftColumnExisting(12)).toBeTruthy();
        //take screenshot and compare
        MultiColumnDragDropPage.scrollLeftItemsColumn();
        var removedItemsFileName = "MultiColumnDragDrop_removedItemsToLeftColumn";
        MultiColumnDragDropPage.takeScreenshotAndCompare(removedItemsFileName);
    }));
});
