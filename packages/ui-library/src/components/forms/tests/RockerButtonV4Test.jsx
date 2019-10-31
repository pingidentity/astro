import { mount } from "enzyme";
import StateContainer from "../../utils/StateContainer";

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

describe("RockerButton v4", function () {

    const React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        RockerButton = require("../RockerButton"),
        _ = require("underscore");

    const labelsArray = ["A", "B", "C"];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onValueChange: jest.fn(),
            labels: labelsArray,
            className: "myRocker",
        });

        return ReactTestUtils.renderIntoDocument(<RockerButton {...opts} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <RockerButton
                onValueChange={jest.fn()}
                labels={labelsArray}
            />
        );
    });

    it("data-id's don't change with helpText", () => {
        mountSnapshotDataIds(
            <RockerButton
                onValueChange={jest.fn()}
                labels={labelsArray}
                helpText="PLEASE HELP"
            />
        );
    });

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

    it("stateless: will trigger onValueChange callback when selection changes", function () {
        const component = getComponent();
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0]).toEqual(
            { label: labelsArray[testIndex], index: testIndex }
        );
    });

    it("stateful: will trigger onValueChange callback when selection changes", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} onValueChange={callback} />
        );
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onValueChange).toBeCalled();
        expect(component.props.onValueChange.mock.calls[0][0]).toEqual(
            { label: labelsArray[testIndex], index: testIndex }
        );
    });

    it("steteless: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} />);
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} />);
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateless: will accept index of selected item", function () {
        const component = getComponent({ selectedIndex: 1 });
        const node = TestUtils.findRenderedDOMNodeWithDataId(component, "rocker-button");

        expect(node.getAttribute("class").match("sel-1")).toBeTruthy();
    });

    it("will select initial index", function () {
        const component = getComponent({ selectedIndex: 2 });
        const node = TestUtils.findRenderedDOMNodeWithDataId(component, "rocker-button");

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("will render labels rocker button list", function () {
        const component = getComponent();

        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        //make sure 3 labels in a list
        expect(labels.length).toBe(3);

        expect(labels[0].innerHTML).toBe("A");
        expect(labels[1].innerHTML).toBe("B");
        expect(labels[2].innerHTML).toBe("C");
    });

    it("disabled will not do anything for button clicks", function () {
        const callback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
                <RockerButton disabled={true} labels={labelsArray} />),
            labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button"),
            container = ReactDOM.findDOMNode(component);

        expect(component).toBeTruthy();
        expect(container.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("component", () => {
        const modal = mount(
            <RockerButton
                labels={labelsArray}
            />
        );
        expect(modal.find(StateContainer).exists()).toBeTruthy();

    });

    it("will trigger onValueChange callback when selection changes", function () {
        const callback = jest.fn();
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={labelsArray} onValueChange={callback} />
        );
        const labels = TestUtils.scryRenderedDOMNodesWithTag(component, "button");
        const testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onValueChange).toBeCalledWith(
            { label: labelsArray[testIndex], index: testIndex },
            undefined);
    });

    it("renders the selected class when the label is an object", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={[
                {
                    id: 7
                },
                {
                    id: 8
                }
            ]} selectedIndex={7} />
        );

        expect(TestUtils.findRenderedDOMNodeWithClass(component, "sel-0"));
    });

    it("renders the selected class when the label is an object and nothing selected", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={[
                {
                    id: 7
                },
                {
                    id: 8
                }
            ]} />
        );

        expect(TestUtils.findRenderedDOMNodeWithClass(component, "sel-0"));
    });

});