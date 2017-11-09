window.__DEV__ = true;

jest.dontMock("../FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");
jest.dontMock("../../general/If.jsx");

describe("FormLabel", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        FormLabel = require("../FormLabel.jsx"),
        Utils = require("../../../util/Utils");

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

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <FormLabel id="foo" />
            );
        }).toThrow(expectedError);
    });

});
