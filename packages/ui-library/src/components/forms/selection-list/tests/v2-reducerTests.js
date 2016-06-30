window.__DEV__ = true;

jest.dontMock("../v2-actions.js");
jest.dontMock("../v2-reducer.js");

describe("SelectionList-v2-Reducer", function () {
    var Actions = require("../v2-actions"),
        Reducer = require("../v2-reducer");

    function getItems () {
        return [
            {
                id: "item-1",
                name: "1 item number 1"
            },
            {
                id: "item-2",
                name: "2 item number 2"
            }
        ];
    }

    it("verify initial state", function () {
        var newState = Reducer(null, {
            componentId: "comp1",
            type: "undefined"
        });
        expect(newState).toEqual({});
    });

    it("verify items update without providing list", function () {
        var state = {
            comp2: {
                queryString: ""
            }
        };

        var newState = Reducer(state, Actions.updateListItems("comp2"));
        expect(newState).toEqual({
            comp2: {
                queryString: "",
                matches: [],
                items: []
            }
        });
    });

    it("verify items update", function () {
        var state = {
            comp3: {
                queryString: "",
                matches: [],
                items: []
            }
        };

        var items = getItems();
        var newState = Reducer(state, Actions.updateListItems("comp3", items));
        expect(newState).toEqual({
            comp3: {
                queryString: "",
                matches: items,
                items: items
            }
        });
    });

    it("verify query string update and filtering", function () {
        var items = getItems();

        var state = {
            comp4: {
                queryString: "",
                items: items,
                matches: items
            }
        };

        var newState = Reducer(state, Actions.updateQueryString("comp4", "2 i"));
        expect(newState).toEqual({
            comp4: {
                queryString: "2 i",
                matches: [items[1]], // only the 2nd item matches the query string
                items: items // the item list is set as is
            }
        });
    });

    it("verify query string update without proving query string", function () {
        var items = getItems();
        var state = {
            comp7: {
                queryString: "query",
                matches: items,
                items: items
            }
        };
        var newState = Reducer(state, Actions.updateQueryString("comp7"));
        expect(newState).toEqual({
            comp7: {
                queryString: "",
                matches: items,
                items: items
            }
        });
    });

    it("verify filtering on updating item list", function () {
        var state = {
            comp8: {
                queryString: "2",
                items: [],
                matches: []
            }
        };

        var items = getItems();

        var newState = Reducer(state, Actions.updateListItems("comp8", items));
        expect(newState).toEqual({
            comp8: {
                queryString: "2",
                matches: [items[1]], // only the 2nd item matches the query string
                items: items // the item list is set as is
            }
        });
    });

    it("verify state changes for correct component in state", function () {
        var items = getItems();
        var state = {
            comp9: {
                queryString: "2",
                matches: [items[1]],
                items: items
            },
            comp10: {
                queryString: "comp 10 query",
                matches: [],
                items: []
            }
        };
        var newState = Reducer(state, Actions.updateQueryString("comp9", ""));
        expect(newState).toEqual({
            comp9: {
                queryString: "",
                matches: items,
                items: items
            },
            comp10: {
                queryString: "comp 10 query",
                matches: [],
                items: []
            }
        });
    });

    it("verify filterItems with empty query string", function () {
        var items = getItems();
        var queryString = "";

        var actual = Reducer.filterItemsFunction(items, queryString);
        expect(actual).toEqual(items);
    });

    it("verify filterItems with query string shorter than 4 char", function () {
        var items = getItems();
        var queryString = "2 i";

        var actual = Reducer.filterItemsFunction(items, queryString);
        expect(actual).toEqual([items[1]]);
    });

    it("verify filterItems with query string longer than 4 char", function () {
        var items = getItems();
        var queryString = "number 1";

        var actual = Reducer.filterItemsFunction(items, queryString);
        expect(actual).toEqual([items[0]]);
    });
});
