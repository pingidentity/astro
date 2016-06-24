window.__DEV__ = true;

jest.dontMock("../RockerButton.jsx");

describe("RockerButton", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        RockerButton = require("../RockerButton.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            controlled: true,
            labels: ["A", "B", "C"],
            className: "myRocker"
        });

        return ReactTestUtils.renderIntoDocument(<RockerButton {...opts} />);
    }

    it("stateless: will render component with id", function () {
        var component = getComponent({
            id: "myRockerButton",
            "data-id": null
        });

        var rocker = TestUtils.findRenderedDOMNodeWithDataId(component, "myRockerButton");

        expect(rocker).toBeDefined();
    });

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

    it("stateless: will trigger onChange callback when selection changes", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton controlled={true} labels={["A", "B", "C"]} onChange={callback} />);

        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onChange).toBeCalledWith("C", 2);
    });

    it("stateful: will trigger onChange callback when selection changes", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton controlled={true} labels={["A", "B", "C"]} onChange={callback} />);

        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onChange).toBeCalledWith("C", 2);
    });

    it("stateless: will trigger onValueChange callback when selection changes", function () {
        var component = getComponent();
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: "C", index: 2 });
    });

    it("stateful: will trigger onValueChange callback when selection changes", function () {
        var component = getComponent({ controlled: false });
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: "C", index: 2 });
    });

    it("steteless: will not trigger callbacks if not given", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton controlled={true} labels={["A", "B", "C"]} />);
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton controlled={false} labels={["A", "B", "C"]} />);
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
        var component = getComponent({ controlled: false, selectedIndex: 2 });
        var manager = component.refs.RockerButtonStateful;
        var rocker = manager.refs.RockerButtonStateless;
        var container = rocker.refs.container;
        var node = ReactDOM.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("stateless: will select initial item", function () {
        var component = getComponent({ controlled: false, selected: "C" });
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

    it("is logging warning if more than 4 labels given", function () {

        console.warn = jest.genMockFunction();
        var callback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services", "Users", "Security"]} onChange={callback} />
        );

        expect(console.warn).toBeCalledWith("RockerButton expecting two to four labels, but was given ", 5);
    });

});
