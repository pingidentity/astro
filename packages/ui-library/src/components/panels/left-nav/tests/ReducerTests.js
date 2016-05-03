window.__DEV__ = true;

jest.dontMock("../Reducer.js");
jest.dontMock("../Actions.js");
jest.dontMock("../../../../util/ReduxUtils.js");

describe("LeftNavBar-Reducer", function () {
    var Reducer = require("../Reducer.js"),
        Actions = require("../Actions.js");

    function getData () {
        return [
            {
                label: "Section 1",
                id: "section-1",
                children: [{ label: "Item 1.1", id: "item-1.1" }, { label: "Item 1.2", id: "item-1.2" }]
            },
            {
                label: "Section 2",
                id: "section-2",
                children: [{ label: "Item 2.1", id: "item-2.1" }, { label: "Item 2.2", id: "item-2.2" }]
            }
        ];
    }

    function getInitialState () {
        return Reducer(Reducer(null, {}), Actions.init(getData()));
    }

    it("toggles item", function () {
        var state = Reducer(getInitialState(), Actions.toggleSection("section-1"));
        expect(state.openNode).toBe("section-1");

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openNode).toBe("section-2");

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openNode).toBe(null);
    });

    it("selects item", function () {
        var state = Reducer(getInitialState(), Actions.selectItem("item-2.2"));
        expect(state.selectedNode).toBe("item-2.2");
    });

    it("next on last item does nothing", function () {
        var state = Reducer(getInitialState(), Actions.toggleSection("section-2"));
        state = Reducer(state, Actions.selectItem("item-2.2"));

        //it's the last item, nothing changes
        state = Reducer(state, Actions.selectNextItem());
        expect(state.selectedNode).toBe("item-2.2");
    });

    it("select previous", function () {
        var state = Reducer(getInitialState(), Actions.toggleSection("section-2"));
        state = Reducer(state, Actions.selectItem("item-2.2"));

        state = Reducer(state, Actions.selectPrevItem());
        expect(state.selectedNode).toBe("item-2.1");
    });

    it("select previous moves to previous section", function () {
        var state = Reducer(getInitialState(), Actions.toggleSection("section-2"));
        state = Reducer(state, Actions.selectItem("item-2.1"));

        state = Reducer(state, Actions.selectPrevItem());
        expect(state.selectedNode).toBe("item-1.2");
        expect(state.openNode).toBe("section-1");
    });

    it("select previous when first item is selected does nothing", function () {
        var state = Reducer(getInitialState(), Actions.toggleSection("section-1"));
        state = Reducer(state, Actions.selectItem("item-1.1"));

        state = Reducer(state, Actions.selectPrevItem());
        expect(state.selectedNode).toBe("item-1.1");
        expect(state.openNode).toBe("section-1");
    });
});

