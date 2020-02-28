import { mount } from "enzyme";
import StateContainer from "../../utils/StateContainer";

describe("RockerButton", function () {

    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        RockerButton = require("../RockerButton"),
        _ = require("underscore");

    const labelsArray = ["A", "B", "C"];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onValueChange: jest.fn(),
            labels: labelsArray,
            className: "myRocker"
        });

        return ReactTestUtils.renderIntoDocument(<RockerButton {...opts} />);
    }

    it("stateless: will render component with data-id", function () {
        const component = getComponent({
            "data-id": "myRockerButton"
        });

        const rocker = TestUtils.findRenderedDOMNodeWithDataId(component, "myRockerButton");

        expect(rocker).toBeDefined();
    });

    it("stateful: will render component with default data-id", function () {
        const component = getComponent();

        const rocker = TestUtils.findRenderedDOMNodeWithDataId(component, "rocker-button");

        expect(rocker).toBeDefined();
    });

    it("stateless: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} />);
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} />);
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateless: will render buttons rocker button list", function () {
        const component = getComponent();

        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        //make sure 3 buttons in a list
        expect(buttons.length).toBe(3);

        expect(buttons[0].innerHTML).toBe("A");
        expect(buttons[1].innerHTML).toBe("B");
        expect(buttons[2].innerHTML).toBe("C");
    });

    it("disabled will not do anything for button clicks", function () {
        const callback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <RockerButton disabled={true} labels={labelsArray} />),
            buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        expect(component).toBeTruthy();
        const node = TestUtils.findRenderedDOMNodeWithDataId(component, "rocker-button");
        expect(node.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("renders component", () => {
        const modal = mount(
            <RockerButton
                labels={labelsArray}
            />
        );
        expect(modal.find(StateContainer).exists()).toBeTruthy();

    });

    it(" will trigger onValueChange callback when selection changes", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} onValueChange={callback} />
        );
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(buttons[testIndex], {});
        expect(component.props.onValueChange.mock.calls[0][0])
            .toEqual({ label: labelsArray[testIndex], index: testIndex });
    });

});
