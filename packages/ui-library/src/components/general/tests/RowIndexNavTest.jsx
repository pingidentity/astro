window.__DEV__ = true;

jest.dontMock("../RowIndexNav");

describe("Indent", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        RowIndexNav = require("../RowIndexNav"),
        _ = require("underscore");

    var activeIndexes = "ABCDEZ".split(""),
        component,
        componentId = "index-nav",
        indexes = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
        navItems,
        onClickFunction = jest.genMockFunction(),
        selectedClass = "selected",
        selectedIndex = 2;


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            indexes: indexes,
            onClick: onClickFunction,
            activeIndexes: activeIndexes,
            selectedIndex: activeIndexes[selectedIndex]
        });
        return ReactTestUtils.renderIntoDocument(<RowIndexNav {...opts} />);
    }


    beforeEach(function () {
        component = getComponent();
        navItems = TestUtils.scryRenderedDOMNodesWithTag(component, "li");
    });

    it("renders the component", function () {
        var container = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-index-nav");

        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
        expect(container).toBeTruthy();
        expect(navItems.length).toEqual(indexes.length);
    });

    it("renders the nav items with the proper content and css classes", function () {
        var disabledClass = "disabled",
            testIndexActive = 3,
            testIndexInactive = 5;

        expect(navItems[testIndexActive].textContent).toEqual(indexes[testIndexActive]);
        expect(navItems[testIndexInactive].textContent).toEqual(indexes[testIndexInactive]);

        expect(navItems[testIndexActive].getAttribute("class")).not.toContain(disabledClass);
        expect(navItems[testIndexInactive].getAttribute("class")).toContain(disabledClass);

        expect(navItems[testIndexActive].getAttribute("class")).not.toContain(selectedClass);
        expect(navItems[testIndexInactive].getAttribute("class")).not.toContain(selectedClass);
        expect(navItems[selectedIndex].getAttribute("class")).toContain(selectedClass);
    });

    it("calls onClick callback", function () {
        var testIndexActive = 3,
            testIndexInactive = 5;

        ReactTestUtils.Simulate.click(navItems[testIndexInactive]);
        expect(component.props.onClick).not.toBeCalled();

        ReactTestUtils.Simulate.click(navItems[testIndexActive]);
        expect(component.props.onClick).toBeCalled();
    });
});
