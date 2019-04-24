const SandboxWhitelistPage = require("../../pages/templates/SandboxWhitelistTemplatePage.js");

describe("Sandbox White list", function () {


    beforeAll(function () {
        SandboxWhitelistPage.openSandboxWhitelistDemoPage();
    });


    afterAll(function (done) {
        SandboxWhitelistPage.end(done);
    });

    /**
     * SCENARIO: Should input data into all fields and take screenshot
     * GIVEN: Goes to SandboxWhiteList template
     * WHEN: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     * WHEN: Inputs data into all fields
     * AND: Takes screenshot
     * AND: Compares it with the base image
     * THEN: The base image and the current image should be identical
     */

    it("general page screenshot", SandboxWhitelistPage.retriable(function () {

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_GeneralPage");

    }));

    it("it clicks on the add user button", SandboxWhitelistPage.retriable(function () {


        SandboxWhitelistPage.clickAddUser();

        SandboxWhitelistPage.blurElement();

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_AddUser");
    }));

    it("click on a user from the list", SandboxWhitelistPage.retriable(function () {

        SandboxWhitelistPage.clickUser();

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_User");
    }));

    it("clicks on the add button from the list", SandboxWhitelistPage.retriable(function () {


        SandboxWhitelistPage.clickAddButton();

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_AddButton");
    }));

    it("clicks the searchbox", SandboxWhitelistPage.retriable(function () {


        SandboxWhitelistPage.clickSearchBox();

        SandboxWhitelistPage.blurElement();

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_SearchBox");
    }));

    it("enters a name in the searchbox", SandboxWhitelistPage.retriable(function () {


        SandboxWhitelistPage.setSearchBoxValue("Sophia");


        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_SearchBoxValue");
    }));

    it("removes a name from the list", SandboxWhitelistPage.retriable(function () {


        SandboxWhitelistPage.clickRemoveButton();

        SandboxWhitelistPage.takeScreenshotAndCompare("SandboxWhiteList_RemoveButton");
    }));


});
