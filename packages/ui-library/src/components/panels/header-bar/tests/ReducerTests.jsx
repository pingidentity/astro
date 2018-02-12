window.__DEV__ = true;

jest.dontMock("../Reducer.js");
jest.dontMock("../Actions.js");

const tree = [
    { id: "help", url: "http://www.yahoo.com" },
    {
        id: "cog",
        children: [{ id: "cog-menu-item", label: "Cog Menu Item" }]
    },
    {
        id: "account",
        children: [{ id: "globe", label: "Globe" }]
    }
];

describe("HeaderBar-Reducer", function() {
    var Reducer = require("../Reducer.js"),
        Actions = require("../Actions.js");

    it("inits", function() {
        var state = Reducer({}, Actions.init(tree));
        expect(state.tree.length).toBe(3);
    });

    it("toggles an item", function() {
        var state = Reducer(undefined, Actions.toggleItem("fakeId"));
        expect(state.openNode).toBe("fakeId");

        state = Reducer(state, Actions.toggleItem("fakeId"));
        expect(state.openNode).toBe("");
    });

    it("sets the environment", function() {
        var state = Reducer(
            undefined,
            Actions.setEnvironment("fakeEnvironment")
        );
        expect(state.environmentSelected).toBe("fakeEnvironment");
    });

    it("sets the market", function() {
        var state = Reducer(undefined, Actions.setMarket("fakeMarket"));
        expect(state.marketSelected).toBe("fakeMarket");
    });

    it("sets the nav", function() {
        var state = Reducer(undefined, Actions.setNav("fakeNav"));
        expect(state.navSelected).toBe("fakeNav");
    });

    it("does nothing", function() {
        var state = Reducer(undefined, { type: "nothing" });
        expect(state.openNode).toBe("");
    });
});
