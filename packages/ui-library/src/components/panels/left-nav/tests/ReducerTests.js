window.__DEV__ = true;

jest.dontMock("../Reducer.js");
jest.dontMock("../Actions.js");

describe("LeftNavBar-Reducer", function () {
    var Reducer = require("../Reducer.js"),
        Actions = require("../Actions.js"),
        _ = require("underscore");

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

    function getInitialState (opts) {
        return Reducer(Reducer(_.defaults({
            tree: [],
            openSections: {}
        }, opts), {}), Actions.init(getData()));
    }

    it("sets collapsible", function () {
        var state = Reducer(getInitialState(), Actions.setCollapsible(true));
        expect(state.collapsible).toBe(true);

        state = Reducer(state, Actions.setCollapsible(false));
        expect(state.collapsible).toBe(false);
    });

    it("sets autocollapse", function () {
        var state = Reducer(getInitialState(), Actions.setAutocollapse(true));
        expect(state.autocollapse).toBe(true);

        state = Reducer(state, Actions.setAutocollapse(false));
        expect(state.autocollapse).toBe(false);
    });

    it("init adds all sections to openSections if not collapsible", function () {
        var state = Reducer(getInitialState({ collapsible: false }), {});
        expect(state.collapsible).toBe(false);

        //All sections should be open by default
        expect(state.openSections).toEqual({ "section-1": true, "section-2": true });
    });

    it("does not toggle sections when sections are not collapsible", function () {
        var state = Reducer(getInitialState({ collapsible: false }), {});
        expect(state.collapsible).toBe(false);
        expect(state.openSections).toEqual({ "section-1": true, "section-2": true });

        //Toggle should not collapse any section
        state = Reducer(state, Actions.toggleSection("section-1"));
        expect(state.openSections["section-1"]).toBe(true);

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openSections["section-2"]).toBe(true);
    });

    it("keeps track of openSections", function () {
        //Autocollapse disabled
        var state = Reducer(getInitialState({ autocollapse: false, collapsible: true }), {});
        expect(state.openSections).toEqual({});

        state = Reducer(state, Actions.toggleSection("section-1"));
        expect(state.openSections).toEqual({ "section-1": true });

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openSections).toEqual({ "section-1": true, "section-2": true });

        state = Reducer(state, Actions.toggleSection("section-1"));
        expect(state.openSections).toEqual({ "section-1": false, "section-2": true });

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openSections).toEqual({ "section-1": false, "section-2": false });

        //Autocollapse enabled
        var state = Reducer(getInitialState({ autocollapse: true, collapsible: true }), {});
        expect(state.openSections).toEqual({});

        state = Reducer(state, Actions.toggleSection("section-1"));
        expect(state.openSections).toEqual({ "section-1": true });

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openSections).toEqual({ "section-1": false, "section-2": true });

        state = Reducer(state, Actions.toggleSection("section-1"));
        expect(state.openSections).toEqual({ "section-1": true, "section-2": false });

        state = Reducer(state, Actions.toggleSection("section-2"));
        expect(state.openSections).toEqual({ "section-1": false, "section-2": true });
    });

    [true, false].forEach(function (autocollapse) {
        it("selects item", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }),
                Actions.selectItem("item-2.2", "section-2"));
            expect(state.selectedNode).toBe("item-2.2");
        });

        it("toggles section", function () {
            var state = Reducer(getInitialState({
                autocollapse: autocollapse,
                collapsible: true
            }), Actions.toggleSection("section-1"));
            expect(state.selectedSection).toBe("section-1");

            state = Reducer(state, Actions.toggleSection("section-2"));
            expect(state.selectedSection).toBe("section-2");

            state = Reducer(state, Actions.toggleSection("section-2"));
            expect(state.selectedSection).toBe("section-2");
        });

        it("autoselects first item of newly opened section", function () {
            var state = Reducer(getInitialState({
                autocollapse: autocollapse,
                collapsible: true
            }), Actions.toggleSection("section-1"));
            expect(state.selectedSection).toBe("section-1");
            expect(state.selectedNode).toBe("item-1.1");

            state = Reducer(state, Actions.toggleSection("section-2"));
            expect(state.selectedSection).toBe("section-2");
            expect(state.selectedNode).toBe("item-2.1");
        });

        it("remains on selected section and node when collapsing section", function () {
            var state = Reducer(getInitialState({
                autocollapse: autocollapse,
                collapsible: true
            }), Actions.toggleSection("section-1"));
            expect(state.selectedSection).toBe("section-1");

            state = Reducer(state, Actions.toggleSection("section-2"));
            expect(state.selectedSection).toBe("section-2");

            state = Reducer(state, Actions.selectItem("item-2.2", "section-2"));
            expect(state.selectedNode).toBe("item-2.2");

            state = Reducer(state, Actions.toggleSection("section-2"));
            expect(state.selectedSection).toBe("section-2");
            expect(state.selectedNode).toBe("item-2.2");
        });

        it("select next", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-1"));
            state = Reducer(state, Actions.selectItem("item-1.1", "section-1"));
            expect(state.selectedNode).toBe("item-1.1");

            state = Reducer(state, Actions.selectNextItem());
            expect(state.selectedNode).toBe("item-1.2");
        });

        it("select next moves to next section", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-1"));
            state = Reducer(state, Actions.selectItem("item-1.2", "section-1"));
            expect(state.selectedNode).toBe("item-1.2");
            expect(state.selectedSection).toBe("section-1");

            state = Reducer(state, Actions.selectNextItem());
            expect(state.selectedNode).toBe("item-2.1");
            expect(state.selectedSection).toBe("section-2");
        });

        it("select next on last item does nothing", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-2"));
            state = Reducer(state, Actions.selectItem("item-2.2", "section-2"));
            expect(state.selectedNode).toBe("item-2.2");
            expect(state.selectedSection).toBe("section-2");

            //it's the last item, nothing changes
            state = Reducer(state, Actions.selectNextItem());
            expect(state.selectedNode).toBe("item-2.2");
            expect(state.selectedSection).toBe("section-2");
        });

        it("select previous", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-2"));
            state = Reducer(state, Actions.selectItem("item-2.2", "section-2"));
            expect(state.selectedNode).toBe("item-2.2");

            state = Reducer(state, Actions.selectPrevItem());
            expect(state.selectedNode).toBe("item-2.1");
        });

        it("select previous moves to previous section", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-2"));
            state = Reducer(state, Actions.selectItem("item-2.1", "section-2"));
            expect(state.selectedNode).toBe("item-2.1");
            expect(state.selectedSection).toBe("section-2");

            state = Reducer(state, Actions.selectPrevItem());
            expect(state.selectedNode).toBe("item-1.2");
            expect(state.selectedSection).toBe("section-1");
        });

        it("select previous when first item is selected does nothing", function () {
            var state = Reducer(getInitialState({ autocollapse: autocollapse }), Actions.toggleSection("section-1"));
            state = Reducer(state, Actions.selectItem("item-1.1", "section-1"));
            expect(state.selectedNode).toBe("item-1.1");
            expect(state.selectedSection).toBe("section-1");

            //it's the first item, nothing changes
            state = Reducer(state, Actions.selectPrevItem());
            expect(state.selectedNode).toBe("item-1.1");
            expect(state.selectedSection).toBe("section-1");
        });
    });
});

