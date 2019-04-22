import { mount } from "enzyme";
import StateContainer from "../../utils/StateContainer";

describe("RockerButton", function () {

    const React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils.js"),
        RockerButton = require("../RockerButton"),
        _ = require("underscore");

    const labelsArray = ["A", "B", "C"];

    const flags = ["p-stateful"];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onValueChange: jest.fn(),
            stateless: true,
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

    it("stateful: onValueChange callback is not called when selection does not change", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} selectedIndex={0} labels={labelsArray} onValueChange={callback} />
        );
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(buttons[0], {});
        expect(component.props.onValueChange).not.toBeCalled();
    });

    it("stateless: will trigger onValueChange callback when selection changes", function () {
        const component = getComponent();
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("stateful: will trigger onValueChange callback when selection changes", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} onValueChange={callback} />
        );
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(buttons[testIndex], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("stateless: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={true} labels={labelsArray} />);
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} />);
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateless: will accept index of selected item", function () {
        const component = getComponent({ selectedIndex: 1 });
        const rocker = component.refs.RockerButtonStateless;
        const container = rocker.refs.container;
        const node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-1")).toBeTruthy();
    });

    it("stateless: will select initial index", function () {
        const component = getComponent({ stateless: false, selectedIndex: 2 });
        const manager = component.refs.RockerButtonStateful;
        const rocker = manager.refs.RockerButtonStateless;
        const container = rocker.refs.container;
        const node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("stateless: will select initial item", function () {
        const component = getComponent({ stateless: false, selected: "C" });
        const manager = component.refs.RockerButtonStateful;
        const rocker = manager.refs.RockerButtonStateless;
        const container = rocker.refs.container;
        const node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
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
                <RockerButton stateless={false} disabled={true} labels={labelsArray} />),
            buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button"),
            container = ReactDOM.findDOMNode(component);

        expect(component).toBeTruthy();
        expect(container.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(buttons[2], {});
        expect(callback).not.toBeCalled();
    });

    it("is logging warning if more than 4 buttons given", function () {

        console.warn = jest.fn();
        const callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services", "Users", "Security"]} onValueChange={callback} />
        );

        expect(console.warn).toBeCalledWith("RockerButton expecting two to four labels, but was given ", 5);
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onChange' is passed in", function () {
        const expectedError = new Error(Utils.deprecatePropError("onChange", "onValueChange"));

        expect(function () {
            getComponent({ onChange: jest.fn() });
        }).toThrow(expectedError);
    });

    it ("throws the Cannonball warning when value is provided to a stateful rocker button", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({ stateless: false, value: "something" });
        expect(console.warn).toBeCalled();
    });

    it ("throws the Cannonball warning when value is not provided to a stateless rocker button", function() {
        console.warn = jest.fn();

        expect(console.warn).not.toBeCalled();
        getComponent({ stateless: true });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warnings if required flags are provided", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });

    it(" renders p-stateful version of component", () => {
        const modal = mount(
            <RockerButton
                labels={labelsArray}
                flags={flags}
            />
        );
        expect(modal.find(StateContainer).exists()).toBeTruthy();

    });

    it("p-stateful will trigger onValueChange callback when selection changes", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} onValueChange={callback} flags={flags} />
        );
        const buttons = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(buttons[testIndex], {});
        expect(component.props.onValueChange).toBeCalledWith(
            { label: labelsArray[testIndex], index: testIndex },
            undefined);
    });
});