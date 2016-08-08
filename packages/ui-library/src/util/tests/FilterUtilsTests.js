window.__DEV__ = true;

jest.dontMock("../FilterUtils.js");

describe("FilterUtils", function () {
    var FilterUtils = require("../FilterUtils.js"),
        items = [
            { id: "1", name: "Monday", status: "work" },
            { id: "2", name: "Tuesday", status: "work" },
            { id: "3", name: "Wednesday", status: "work" },
            { id: "4", name: "Thursday", status: "work" },
            { id: "5", name: "Friday", status: "work" },
            { id: "6", name: "Saturday", status: "play" },
            { id: "7", name: "Sunday", status: "play" }
        ];

    describe("filterFieldStartsWith", function () {
        var filterFieldStartsWith = FilterUtils.filterFieldStartsWith;

        it("filters for beginning of string to match filter string for the given field in item", function () {
            expect(filterFieldStartsWith("name", "s", items[0])).toBe(false);
            expect(filterFieldStartsWith("name", "s", items[1])).toBe(false);
            expect(filterFieldStartsWith("name", "s", items[2])).toBe(false);
            expect(filterFieldStartsWith("name", "s", items[3])).toBe(false);
            expect(filterFieldStartsWith("name", "s", items[4])).toBe(false);
            expect(filterFieldStartsWith("name", "s", items[5])).toBe(true);
            expect(filterFieldStartsWith("name", "s", items[6])).toBe(true);
        });

        it("is not case sensitive", function () {
            expect(filterFieldStartsWith("status", "WORK", items[0])).toBe(true);
            expect(filterFieldStartsWith("status", "WORK", items[1])).toBe(true);
            expect(filterFieldStartsWith("status", "WORK", items[2])).toBe(true);
            expect(filterFieldStartsWith("status", "WORK", items[3])).toBe(true);
            expect(filterFieldStartsWith("status", "WORK", items[4])).toBe(true);
            expect(filterFieldStartsWith("status", "WORK", items[5])).toBe(false);
            expect(filterFieldStartsWith("status", "WORK", items[6])).toBe(false);
        });

        it("ignores leading/trailing whitespace", function () {
            expect(filterFieldStartsWith("name", "  s  ", items[0])).toBe(false);
            expect(filterFieldStartsWith("name", "  s  ", items[1])).toBe(false);
            expect(filterFieldStartsWith("name", "  s  ", items[2])).toBe(false);
            expect(filterFieldStartsWith("name", "  s  ", items[3])).toBe(false);
            expect(filterFieldStartsWith("name", "  s  ", items[4])).toBe(false);
            expect(filterFieldStartsWith("name", "  s  ", items[5])).toBe(true);
            expect(filterFieldStartsWith("name", "  s  ", items[6])).toBe(true);
        });
    });

    describe("filterFieldContains", function () {
        var filterFieldContains = FilterUtils.filterFieldContains;

        it("filters for string to contain match for filter string for the given field in item", function () {
            expect(filterFieldContains("name", "day", items[0])).toBe(true);
            expect(filterFieldContains("name", "day", items[1])).toBe(true);
            expect(filterFieldContains("name", "day", items[2])).toBe(true);
            expect(filterFieldContains("name", "day", items[3])).toBe(true);
            expect(filterFieldContains("name", "day", items[4])).toBe(true);
            expect(filterFieldContains("name", "day", items[5])).toBe(true);
            expect(filterFieldContains("name", "day", items[6])).toBe(true);
        });

        it("is not case sensitive", function () {
            expect(filterFieldContains("status", "PLAY", items[0])).toBe(false);
            expect(filterFieldContains("status", "PLAY", items[1])).toBe(false);
            expect(filterFieldContains("status", "PLAY", items[2])).toBe(false);
            expect(filterFieldContains("status", "PLAY", items[3])).toBe(false);
            expect(filterFieldContains("status", "PLAY", items[4])).toBe(false);
            expect(filterFieldContains("status", "PLAY", items[5])).toBe(true);
            expect(filterFieldContains("status", "PLAY", items[6])).toBe(true);
        });

        it("ignores leading/trailing whitespace", function () {
            expect(filterFieldContains("status", "  PLAY  ", items[0])).toBe(false);
            expect(filterFieldContains("status", "  PLAY  ", items[1])).toBe(false);
            expect(filterFieldContains("status", "  PLAY  ", items[2])).toBe(false);
            expect(filterFieldContains("status", "  PLAY  ", items[3])).toBe(false);
            expect(filterFieldContains("status", "  PLAY  ", items[4])).toBe(false);
            expect(filterFieldContains("status", "  PLAY  ", items[5])).toBe(true);
            expect(filterFieldContains("status", "  PLAY  ", items[6])).toBe(true);
        });
    });

    describe("filterStartsWith", function () {
        var filterStartsWith = FilterUtils.filterStartsWith;

        it("filters for beginning of string to match filter string for any string-able field in item", function () {
            expect(filterStartsWith("s", items[0])).toBe(false);
            expect(filterStartsWith("s", items[1])).toBe(false);
            expect(filterStartsWith("s", items[2])).toBe(false);
            expect(filterStartsWith("s", items[3])).toBe(false);
            expect(filterStartsWith("s", items[4])).toBe(false);
            expect(filterStartsWith("s", items[5])).toBe(true);
            expect(filterStartsWith("s", items[6])).toBe(true);
        });

        it("is not case sensitive", function () {
            expect(filterStartsWith("WORK", items[0])).toBe(true);
            expect(filterStartsWith("WORK", items[1])).toBe(true);
            expect(filterStartsWith("WORK", items[2])).toBe(true);
            expect(filterStartsWith("WORK", items[3])).toBe(true);
            expect(filterStartsWith("WORK", items[4])).toBe(true);
            expect(filterStartsWith("WORK", items[5])).toBe(false);
            expect(filterStartsWith("WORK", items[6])).toBe(false);
        });

        it("ignores leading/trailing whitespace", function () {
            expect(filterStartsWith("  s  ", items[0])).toBe(false);
            expect(filterStartsWith("  s  ", items[1])).toBe(false);
            expect(filterStartsWith("  s  ", items[2])).toBe(false);
            expect(filterStartsWith("  s  ", items[3])).toBe(false);
            expect(filterStartsWith("  s  ", items[4])).toBe(false);
            expect(filterStartsWith("  s  ", items[5])).toBe(true);
            expect(filterStartsWith("  s  ", items[6])).toBe(true);
        });
    });

    describe("filterContains", function () {
        var filterContains = FilterUtils.filterContains;

        it("filters for string to contain match for filter string for any string-able field in item", function () {
            expect(filterContains("r", items[0])).toBe(true);
            expect(filterContains("r", items[1])).toBe(true);
            expect(filterContains("r", items[2])).toBe(true);
            expect(filterContains("r", items[3])).toBe(true);
            expect(filterContains("r", items[4])).toBe(true);
            expect(filterContains("r", items[5])).toBe(true);
            expect(filterContains("r", items[6])).toBe(false);
        });

        it("is not case sensitive", function () {
            expect(filterContains("PLAY", items[0])).toBe(false);
            expect(filterContains("PLAY", items[1])).toBe(false);
            expect(filterContains("PLAY", items[2])).toBe(false);
            expect(filterContains("PLAY", items[3])).toBe(false);
            expect(filterContains("PLAY", items[4])).toBe(false);
            expect(filterContains("PLAY", items[5])).toBe(true);
            expect(filterContains("PLAY", items[6])).toBe(true);
        });

        it("ignores leading/trailing whitespace", function () {
            expect(filterContains("  PLAY  ", items[0])).toBe(false);
            expect(filterContains("  PLAY  ", items[1])).toBe(false);
            expect(filterContains("  PLAY  ", items[2])).toBe(false);
            expect(filterContains("  PLAY  ", items[3])).toBe(false);
            expect(filterContains("  PLAY  ", items[4])).toBe(false);
            expect(filterContains("  PLAY  ", items[5])).toBe(true);
            expect(filterContains("  PLAY  ", items[6])).toBe(true);
        });
    });

    describe("getFilterFunction", function () {
        var getFilterFunction = FilterUtils.getFilterFunction;

        it("gets filterFieldStarts for given fieldName and filter strings <= 3 characters in length", function () {
            var filterFn = getFilterFunction("s", "name");
            expect(items.filter(filterFn)).toEqual([
                { id: "6", name: "Saturday", status: "play" },
                { id: "7", name: "Sunday", status: "play" }
            ]);
        });

        it("gets filterFieldContains for given fieldName and filter strings > 3 characters in length", function () {
            var filterFn = getFilterFunction("sday", "name");
            expect(items.filter(filterFn)).toEqual([
                { id: "2", name: "Tuesday", status: "work" },
                { id: "3", name: "Wednesday", status: "work" },
                { id: "4", name: "Thursday", status: "work" }
            ]);
        });

        it("gets filterStartsWith for no fieldName and filter strings <= 3 characters in length", function () {
            var filterFn = getFilterFunction("wor");
            expect(items.filter(filterFn)).toEqual([
                { id: "1", name: "Monday", status: "work" },
                { id: "2", name: "Tuesday", status: "work" },
                { id: "3", name: "Wednesday", status: "work" },
                { id: "4", name: "Thursday", status: "work" },
                { id: "5", name: "Friday", status: "work" }
            ]);
        });

        it("gets filterContains for no fieldName and filter strings > 3 characters in length", function () {
            var filterFn = getFilterFunction("play");
            expect(items.filter(filterFn)).toEqual([
                { id: "6", name: "Saturday", status: "play" },
                { id: "7", name: "Sunday", status: "play" }
            ]);
        });

        it("ignores leading/trailing whitespace", function () {
            var filterFn = getFilterFunction("  S ");
            expect(items.filter(filterFn)).toEqual([
                { id: "6", name: "Saturday", status: "play" },
                { id: "7", name: "Sunday", status: "play" }
            ]);
        });
    });
});