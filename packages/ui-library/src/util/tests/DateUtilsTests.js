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

    describe("formatDateTime", function () {
        it("formats date to YYYY-MM-DD hh:MM:SSa", function () {
            expect(DateUtils.formatDateTime(1444860746000)).toBe("2015-10-14 10:10:00pm");
            expect(DateUtils.formatDateTime(0)).toBe("1970-01-01 12:01:00am");
            expect(DateUtils.formatDateTime(2525465544000)).toBe("2050-01-10 10:01:00pm");
        });
    });

    describe("formatTime", function () {
        it("formats date to hh:MM:SSa", function () {
            expect(DateUtils.formatTime(1444860746000)).toBe("10:10:00pm");
            expect(DateUtils.formatTime(0)).toBe("12:01:00am");
            expect(DateUtils.formatTime(2525465544000)).toBe("10:01:00pm");
        });
    });
});