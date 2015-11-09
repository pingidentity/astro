window.__DEV__ = true;

jest.dontMock("../HelpHint.jsx");
jest.dontMock("../../../testutil/TestUtils");

describe("HelpHint", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
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
        div = TestUtils.findRenderedDOMComponentWithDataId(component, "helpTooltip");
        tooltipDiv = ReactTestUtils.findRenderedDOMComponentWithClass(component, "tooltip-text");
    });

    it("renders the component", function () {
        expect(ReactTestUtils.isDOMComponent(div)).toBeTruthy();
    });

    it("renders the enclosed label", function () {
        // verify that the label is rendered with a space between the label and the tooltip content
        expect(div.getDOMNode().textContent).toEqual(label + " " + text);
    });

    it("has hint text", function () {
        expect(tooltipDiv.getDOMNode().textContent).toEqual(text);
    });

    it("has the styling class", function () {
        expect(div.props.className).toContain(classValue);
    });
});
