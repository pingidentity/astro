window.__DEV__ = true;

jest.dontMock("../GridReducer.js");
jest.dontMock("../GridActions.js");

describe("Grid-Reducer", function () {
    var Reducer = require("../GridReducer.js"),
        Actions = require("../GridActions.js"),
        _ = require("underscore");

    function getInitialState () {
        return Reducer(Reducer(null, {}), Actions.init(
            "myid",
            {
                name: "My Table Name",
                id: 1,
                rows: [
                    { id: 0, expanded: false, name: "Jessie James" },
                    { id: 1, expanded: false, name: "James Bond" },
                    { id: 2, expanded: true, name: "Bruce Wayne" },
                    { id: 3, expanded: false, name: "Blade" },
                ]
            }));
    }

    it("toggles row", function () {
        var state = getInitialState();
        var next = Reducer(state, Actions.toggleRow("myid", 1));

        expect(next.myid.rows[1].expanded).toBe(true);
    });

    it("sets pagination", function () {
        var state = getInitialState();
        var next = Reducer(state, Actions.setPagination("myid", 1, 3, 3));

        expect(next.myid.firstColumn).toBe(1);
        expect(next.myid.lastColumn).toBe(3);
        expect(next.myid.currentPage).toBe(3);
    });

    it("sets field", function () {
        var state = getInitialState();
        var next = Reducer(state, Actions.setField("name", "myid", 0, "Okhtay"));

        expect(next.myid.rows[0].name).toEqual("Okhtay");
    });

    it("sets field in all rows", function () {
        var state = getInitialState();
        var next = Reducer(state, Actions.setFieldInAllRows("myid", "expanded", true));

        expect(_.pluck(next.myid.rows, "expanded")).toEqual([true, true, true, true]);
    });
});

