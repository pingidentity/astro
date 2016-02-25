window.__DEV__ = true;

jest.dontMock("../HelpHint.jsx");

describe("HelpHint", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var HelpHint = require("../HelpHint.jsx");
    var text = "test help text!";
    var classValue = "short-tooltip";
    var label = "this other text";
    var component;
    var div;
    var tooltipDiv;

    beforeEach(function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} id="helpTooltip" className={classValue}>{label}</HelpHint>
        );
        div = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");
        tooltipDiv = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text");
    });

    it("renders the component", function () {
        expect(ReactTestUtils.isDOMComponent(div)).toBeTruthy();
    });

    it("renders the enclosed label", function () {
        // verify that the label is rendered with a space between the label and the tooltip content
        expect(div.textContent).toEqual(label + " " + text);
    });

    it("has hint text", function () {
        expect(tooltipDiv.textContent).toEqual(text);
    });

    it("has the styling class", function () {
        expect(div.className).toContain(classValue);
    });
});
