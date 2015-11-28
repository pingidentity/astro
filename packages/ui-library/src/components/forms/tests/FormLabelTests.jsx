window.__DEV__ = true;

jest.dontMock("../FormLabel.jsx");
jest.dontMock("../../tooltips/HelpHint.jsx");

describe("FormLabel", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        FormLabel = require("../FormLabel.jsx");

    beforeEach(function () {
    });

    it("doesnt render anything when nothing is passed", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel />);
        var node = React.findDOMNode(label);

        expect(node).toBe(null);
    });

    it("renders just label", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" />);
        var node = React.findDOMNode(label);
        var hint = React.findDOMNode(label.refs.hint);

        expect(node.textContent).toBe("hello");
        expect(hint).toBe(null);
    });

    it("render label and hint", function () {
        var label = ReactTestUtils.renderIntoDocument(<FormLabel value="hello" hint="my hint"/>);
        var hint = React.findDOMNode(label.refs.hint);

        expect(hint.textContent.trim()).toBe("my hint");
    });


    it("renders classname and id", function () {
        var label = ReactTestUtils.renderIntoDocument(
            <FormLabel value="hello" hint="my hint" id="my-id" className="my-label" />);
        var node = React.findDOMNode(label);

        expect(node.getAttribute("data-id")).toBe("my-id");
        expect(node.getAttribute("class")).toBe("my-label");
    });
});
