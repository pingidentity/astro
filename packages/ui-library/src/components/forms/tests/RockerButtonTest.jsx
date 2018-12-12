window.__DEV__ = true;

jest.dontMock("../RockerButton");

describe("RockerButton", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Utils = require("../../../util/Utils.js"),
        RockerButton = require("../RockerButton"),
        _ = require("underscore");

    var labelsArray = ["A", "B", "C"];

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
        var component = getComponent({
            "data-id": "myRockerButton"
        });

        var rocker = TestUtils.findRenderedDOMNodeWithDataId(component, "myRockerButton");

        expect(rocker).toBeDefined();
    });

    it("stateful: will render component with default data-id", function () {
        var component = getComponent();

        var rocker = TestUtils.findRenderedDOMNodeWithDataId(component, "rocker-button");

        expect(rocker).toBeDefined();
    });

    it("stateful: onValueChange callback is not called when selection does not change", function () {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} selectedIndex={0} labels={labelsArray} onValueChange={callback} />
        );
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[0], {});
        expect(component.props.onValueChange).not.toBeCalled();
    });

    it("stateless: will trigger onValueChange callback when selection changes", function () {
        var component = getComponent();
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("stateful: will trigger onValueChange callback when selection changes", function () {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} onValueChange={callback} />
        );
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("steteless: will not trigger callbacks if not given", function () {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={true} labels={labelsArray} />);
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        var callback = jest.fn();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} />);
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateless: will accept index of selected item", function () {
        var component = getComponent({ selectedIndex: 1 });
        var rocker = component.refs.RockerButtonStateless;
        var container = rocker.refs.container;
        var node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-1")).toBeTruthy();
    });

    it("stateless: will select initial index", function () {
        var component = getComponent({ stateless: false, selectedIndex: 2 });
        var manager = component.refs.RockerButtonStateful;
        var rocker = manager.refs.RockerButtonStateless;
        var container = rocker.refs.container;
        var node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("stateless: will select initial item", function () {
        var component = getComponent({ stateless: false, selected: "C" });
        var manager = component.refs.RockerButtonStateful;
        var rocker = manager.refs.RockerButtonStateless;
        var container = rocker.refs.container;
        var node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("stateless: will render labels rocker button list", function () {
        var component = getComponent();

        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        //make sure 3 labels in a list
        expect(labels.length).toBe(3);

        expect(labels[0].innerHTML).toBe("A");
        expect(labels[1].innerHTML).toBe("B");
        expect(labels[2].innerHTML).toBe("C");
    });

    it("disabled will not do anything for button clicks", function () {
        var callback = jest.fn(),
            component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} disabled={true} labels={labelsArray} />),
            labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label"),
            container = ReactDOM.findDOMNode(component);

        expect(component).toBeTruthy();
        expect(container.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("is logging warning if more than 4 labels given", function () {

        console.warn = jest.fn();
        var callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services", "Users", "Security"]} onValueChange={callback} />
        );

        expect(console.warn).toBeCalledWith("RockerButton expecting two to four labels, but was given ", 5);
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            getComponent({ id: "foo" });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onChange' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onChange", "onValueChange"));

        expect(function () {
            getComponent({ onChange: jest.fn() });
        }).toThrow(expectedError);
    });

});
