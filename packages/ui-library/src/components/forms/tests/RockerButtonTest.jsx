window.__DEV__ = true;

jest.dontMock("../RockerButton.jsx");

describe("RockerButton", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        RockerButton = require("../RockerButton.jsx"),
        _ = require("underscore");

    var labelsArray = ["A", "B", "C"];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction(),
            onValueChange: jest.genMockFunction(),
            stateless: true,
            labels: labelsArray,
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
            <RockerButton stateless={true} labels={labelsArray} onChange={callback} />);

        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onChange).toBeCalledWith(labelsArray[testIndex], testIndex);
    });

    it("stateful: will trigger onChange callback when selection changes", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} onChange={callback} />
        );
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onChange).toBeCalledWith(labelsArray[testIndex], testIndex);
    });

    it("stateful: onChange callback is not called when selection does not change", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} selectedIndex={0} labels={labelsArray} onChange={callback} />
        );
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[0], {});
        expect(component.props.onChange).not.toBeCalled();
    });

    it("stateless: will trigger onValueChange callback when selection changes", function () {
        var component = getComponent();
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("stateful: will trigger onValueChange callback when selection changes", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={false} labels={labelsArray} onValueChange={callback} />
        );
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");
        var testIndex = 2;

        ReactTestUtils.Simulate.click(labels[testIndex], {});
        expect(component.props.onValueChange).toBeCalledWith({ label: labelsArray[testIndex], index: testIndex });
    });

    it("steteless: will not trigger callbacks if not given", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <RockerButton stateless={true} labels={labelsArray} />);
        var labels = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(callback).not.toBeCalled();
    });

    it("stateful: will not trigger callbacks if not given", function () {
        var callback = jest.genMockFunction();
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
        var callback = jest.genMockFunction(),
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

        console.warn = jest.genMockFunction();
        var callback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services", "Users", "Security"]} onChange={callback} />
        );

        expect(console.warn).toBeCalledWith("RockerButton expecting two to four labels, but was given ", 5);
    });

    it("does not log warning for id or onChange when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        var callback = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <RockerButton id="test"
                labels={["Profile", "Groups", "Services", "Users", "Security"]} onChange={callback} />
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = ReactTestUtils.renderIntoDocument(<RockerButton controlled={false} labels={["1", "2"]} />);
        var stateful = component.refs.RockerButtonStateful;
        var stateless = component.refs.RockerButtonStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = ReactTestUtils.renderIntoDocument(<RockerButton controlled={true} labels={["1", "2"]} />);
        stateful = component.refs.RockerButtonStateful;
        stateless = component.refs.RockerButtonStateless;

        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(<RockerButton labels={["1", "2"]} />);

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "Support for controlled will be removed in next version");
    });
});
