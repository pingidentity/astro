window.__DEV__ = true;

jest.dontMock("../MultiDragRow");

describe("MultiDragRow", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        MultiDragRow = require("../MultiDragRow"),
        _ = require("underscore");

    function getComponent(props) {
        props = _.defaults(props || {}, {});

        return ReactTestUtils.renderIntoDocument(<MultiDragRow {...props} />);
    }

    it("triggers add event", function() {
        const callback = jest.genMockFunction();
        const component = getComponent({ onAdd: callback, column: 0 });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, "row-button-add");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(callback).toBeCalled();
    });

    it("triggers remove event", function() {
        const callback = jest.genMockFunction();
        const component = getComponent({ onRemove: callback, column: 1 });
        const button = TestUtils.findRenderedDOMNodeWithDataId(component, "row-button-remove");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(button);
        expect(callback).toBeCalled();
    });

    it("renders with all the extras", function() {
        const component = getComponent({ iconSrc: "nothing", icon: "nothing", count: 4 });
        expect(component).toBeDefined();
    });
});
