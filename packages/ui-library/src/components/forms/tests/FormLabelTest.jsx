window.__DEV__ = true;

jest.dontMock("../FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");

describe("FormLabel", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
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

    it("render label and hint", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" hint="my hint"/>);
        var hint = ReactDOM.findDOMNode(label.refs.hint);

        expect(hint.textContent.trim()).toBe("my hint");
    });


    it("renders classname and id", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel value="hello" hint="my hint" data-id="my-id" className="my-label" />);
        var node = ReactDOM.findDOMNode(label);

        expect(node.getAttribute("data-id")).toBe("my-id");
        expect(node.getAttribute("class")).toBe("my-label");
    });
});
