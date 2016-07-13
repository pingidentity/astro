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
            <HelpHint hintText={text} data-id="helpTooltip" className={classValue}>{label}</HelpHint>
        );
        div = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");
        tooltipDiv = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text-content");
    });

    it("renders the component", function () {
        expect(ReactTestUtils.isDOMComponent(div)).toBeTruthy();
    });

    it("renders the icon when no label is passed in", function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} data-id="helpTooltip" className={classValue} />
        );

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-help");

        expect(icon).toBeTruthy();
    });

    it("has hint text", function () {
        expect(tooltipDiv.textContent).toEqual(text);
    });

    it("has the styling class", function () {
        expect(div.className).toContain(classValue);
    });

    // TODO To be removed once "id" support is discontnued.
    it("render component with id", function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} id="helpHintOld" className={classValue} />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "helpHintOld");

        expect(element).toBeDefined();
    });

    it("render component with data-id", function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} data-id="helpHintNew" className={classValue} />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "helpHintNew");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} className={classValue} />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "helpHint");

        expect(element).toBeDefined();
    });

    // TODO To be removed once "id" support is discontnued.
    it("log warning in console for id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} id="helpTooltipOld" className={classValue} />
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use id instead of data-id. Support for data-id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} className={classValue} />
        );

        expect(console.warn).not.toBeCalled();
    });

    it("prevent click event default", function () {
        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");

        var event = {
            preventDefault: jest.genMockFunction()
        };
        ReactTestUtils.Simulate.click(container, event);
        
        expect(event.preventDefault.mock.calls.length).toEqual(1);
    });
});
