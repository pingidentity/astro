window.__DEV__ = true;

jest.dontMock("../FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../../general/If.jsx");

describe("FormLabel", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormLabel = require("../FormLabel.jsx");

    it("renders if it has children", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel><div>some text</div></FormLabel>);
        var node = ReactDOM.findDOMNode(label);

        expect(node).not.toBe(null);
        expect(node.innerHTML).toContain("some text");
    });

    it("doesnt render anything when nothing is passed", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel />);
        var node = ReactDOM.findDOMNode(label);

        expect(node).toBe(null);
    });

    it("renders just label", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" />);
        var node = ReactDOM.findDOMNode(label);
        var hint = ReactDOM.findDOMNode(label.refs.hint);

        expect(node.textContent).toBe("hello");
        expect(hint).toBe(null);
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("render label and hint", function () {
        // var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" hint="my hint" />);
        // var hint = ReactDOM.findDOMNode(label.refs.hint);

        // expect(hint.textContent.trim()).toBe("my hint");
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("renders label, hint and lock", function () {
        // var label = ReactTestUtils.renderIntoDocument(
        //     <FormLabel value="hello" hint="my hint" lockText="why locked" />),
        //     hint = ReactDOM.findDOMNode(label.refs.hint),
        //     lockText = ReactDOM.findDOMNode(label.refs.lock);

        // expect(hint.textContent).toEqual("my hint");
        // expect(lockText.textContent).toEqual("why locked");
    });

    it("renders classname and data-id", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel value="hello" hint="my hint" data-id="my-id" className="my-label" />
        );
        var node = ReactDOM.findDOMNode(label);

        expect(node.getAttribute("data-id")).toBe("my-id");
        expect(node.getAttribute("class")).toBe("my-label");
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <FormLabel value="foo" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "formLabel");
        expect(element).toBeDefined();
    });

    // TODO To be removed once "id" support is discontnued.
    it("render component with id and log warning", function () {
        console.warn = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <FormLabel value="foo" id="deprecated" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "deprecated");
        expect(element).toBeDefined();

        expect(console.warn).toBeCalledWith(
            "Deprecated: use id instead of data-id. Support for data-id will be removed in next version"
        );
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <FormLabel value="foo" />
        );

        expect(console.warn).not.toBeCalled();
    });

    //TODO: remove when deprecated props no longer supported
    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <FormLabel value="foo" id="deprecated" />
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});
