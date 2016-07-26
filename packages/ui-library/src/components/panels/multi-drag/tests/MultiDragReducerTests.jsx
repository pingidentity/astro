window.__DEV__ = true;

jest.dontMock("../MultiDragReducer.js");
jest.dontMock("../MultiDragActions.js");

describe("MultiDrag-Reducer", function () {
    var Reducer = require("../MultiDragReducer.js"),
        Actions = require("../MultiDragActions.js"),
        _ = require("underscore");

    function getInitialState () {
        return Reducer(Reducer(null, {}), Actions.init([
            { name: "Available Rows", id: 1, rows: [
                { id: 0, name: "Jessie James", power: "outlaw" },
                { id: 1, name: "James Bond", power: "super spy" },
                { id: 2, name: "Bruce Wayne", power: "batman" },
                { id: 3, name: "Blade", power: "super hero" }]
            },
            { name: "Added Rows", id: 2, rows: [
                { id: 10, name: "Clark Kent", power: "superman" },
                { id: 11, name: "Peter Parker", power: "spiderman" }]
            }
        ]));
    }

    it("moves filtered item", function () {
        //filter the target column so it's empty
        var next = Reducer(getInitialState(), Actions.filterField("name", 1, "jam"));
        //move a matching item to column 1
        next = Reducer(next, Actions.move({ column: 0, index: 0 }, { column: 1, index: 0 }));

        //expect that the item gets removed from the source column
        expect(_.pluck(next.columns[0].filteredRows, "id")).toEqual([1, 2, 3]);
        //expect that the item gets added to the source column but it's empty because of the filter on the 2nd column
        expect(_.pluck(next.columns[1].filteredRows, "id")).toEqual([]);
        //now take away the filter
        next = Reducer(next, Actions.filterField("name", 1, ""));
        expect(_.pluck(next.columns[1].filteredRows, "id")).toEqual([0, 10, 11]);
    });

    it("filters with regex chars", function () {
        var next = Reducer(getInitialState(), Actions.filterField("name", 0, ".*"));
        expect(_.pluck(next.columns[0].filteredRows, "id")).toEqual([]);
    });

    it("moves an item", function () {
        var next = Reducer(getInitialState(), Actions.move({ column: 0, index: 1 }, { column: 1, index: 2 }));

        expect(_.pluck(next.columns[0].rows, "id")).toEqual([0, 2, 3,]);
        expect(_.pluck(next.columns[1].rows, "id")).toEqual([10, 11, 1]);
    });

    it("filters column with less than 3 chars", function () {
        var next = Reducer(getInitialState(), Actions.filterField("name", 0, "jam"));
        expect(next.columns[0].filteredRows).toEqual([
            { id: 1, name: "James Bond", power: "super spy" }
        ]);
    });

    it("filters column with more than 3 chars", function () {
        var next = Reducer(getInitialState(), Actions.filterField("name", 0, "james"));
        expect(next.columns[0].filteredRows).toEqual([
            { id: 0, name: "Jessie James", power: "outlaw" },
            { id: 1, name: "James Bond", power: "super spy" }
        ]);

        next = Reducer(next, Actions.filterField("name", 0, ""));
        expect(next.columns[0].filteredRows.length).toEqual(4);
    });

    it("filters all string-able row props when no fieldName given", function () {
        var next = Reducer(getInitialState(), Actions.filter(1, "kent"));
        expect(next.columns[1].filteredRows).toEqual([{ id: 10, name: "Clark Kent", power: "superman" }]);

        var next = Reducer(getInitialState(), Actions.filter(0, "super"));
        expect(next.columns[0].filteredRows).toEqual([
            { id: 1, name: "James Bond", power: "super spy" },
            { id: 3, name: "Blade", power: "super hero" }
        ]);
    });

    it("sets placeholder", function () {
        var next = Reducer(getInitialState(), Actions.placeholder({ column: 1, row: 1 }));

        expect(next.placeholder).toEqual({ column: 1, row: 1 });

        next = Reducer(next, Actions.clearPlaceholder());
        expect(next.placeholder).toBe(null);
    });

    it("prepends data", function () {
        var newRows = [
            { id: 4, name: "Thor" },
            { id: 5, name: "Wonder Woman" },
            { id: 10, name: "Twoface" }
        ];
        var next = Reducer(getInitialState(), Actions.prepend(0, newRows));

        expect(next.columns[0].rows).toEqual(newRows.concat(getInitialState().columns[0].rows));
    });

    it("appends data", function () {
        var newRows = [
            { id: 4, name: "Thor" },
            { id: 5, name: "Wonder Woman" },
            { id: 10, name: "Twoface" }
        ];
        var next = Reducer(getInitialState(), Actions.append(0, newRows));

        expect(next.columns[0].rows).toEqual(getInitialState().columns[0].rows.concat(newRows));
    });
});

