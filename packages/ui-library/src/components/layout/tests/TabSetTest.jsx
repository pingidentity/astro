jest.dontMock("../TabSet");
jest.dontMock("../../forms/RockerButton");

describe("TabSet", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        TabSet = require("../TabSet"),
        _ = require("underscore");


    const componentId = "tab-set";

    function getTabSet (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            labels: []
        });
        return ReactTestUtils.renderIntoDocument(<TabSet.TabSet {...opts}><div></div><div></div></TabSet.TabSet>);
    }

    it("renders component with data-id=tab-set", function () {
        const component = getTabSet({});

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("getLabels correctly gets labels and active tab content", function () {
        const component = getTabSet({
            selectedIndex: 0
        });

        const mock = [
            {
                props: {
                    label: "label one",
                    children: ["whatever"]
                }
            },
            {
                props: {
                    label: "label two",
                    children: ["hello world"]
                }
            }
        ];

        const {
            activeTabContent,
            labels
        } = component._getLabels(mock);

        expect(labels).toEqual(["label one", "label two"]);
        expect(activeTabContent).toEqual(["whatever"]);
    });

    it("getLabels correctly gets active tab content for non-default tab", function () {
        const component = getTabSet({
            selectedIndex: 1
        });

        const mock = [
            {
                props: {
                    label: "label one",
                    children: ["whatever"]
                }
            },
            {
                props: {
                    label: "label two",
                    children: ["hello world"]
                }
            }
        ];

        const {
            activeTabContent,
        } = component._getLabels(mock);

        expect(activeTabContent).toEqual(["hello world"]);
    });

    it("shows the correct rocker button as active", () => {
        const component = getTabSet({
            selectedIndex: 0
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "rocker-button sel-0");
        
        expect(element).toBeTruthy();

    });

    it("renders the children and labels correctly", function () {
        const component = getTabSet({
            selectedIndex: 0,
            children: ["whatever", "hello world"]
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "tab-set-children");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();

    });

});

describe("TabSet", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        TabSet = require("../TabSet"),
        _ = require("underscore");


    const componentId = "tab-set-content";

    function getTabContent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            labels: []
        });
        return ReactTestUtils.renderIntoDocument(<TabSet.TabContent {...opts} />);
    }

    it("renders a div tags", function () {
        const component = getTabContent({});

        const element = TestUtils.scryRenderedDOMNodesWithTag(component, "div");

        expect(element.length).toEqual(1);
    });
});