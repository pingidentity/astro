var TogglePage = require("../../pages/forms/TogglePage.js");

describe("FormToggle Integration", function () {

    beforeEach(function () {
        TogglePage.openToggleDemoPage();
    });

    afterAll(function (done) {
        TogglePage.end(done);
    });

    it("should change toggle status", function () {
        TogglePage.click(TogglePage.togglePath);
        // verify active status
        expect(TogglePage.status.getText()).toEqual("ACTIVE");

        TogglePage.click(TogglePage.togglePath);
        // verify disabled status
        expect(TogglePage.status.getText()).toEqual("DISABLED");
    });
});