window.__DEV__ = true;

jest.dontMock("../DateUtils.js");

describe("DateUtils", function () {
    var DateUtils = require("../DateUtils.js");

    describe("formatDate", function () {
        it("formats date to YYYY-MM-DD", function () {
            expect(DateUtils.formatDate(1444860746000)).toBe("2015-10-14");
            expect(DateUtils.formatDate(0)).toBe("1970-01-01");
            expect(DateUtils.formatDate(2525465544000)).toBe("2050-01-10");
        });
    });
});