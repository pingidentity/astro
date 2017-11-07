window.__DEV__ = true;

jest.dontMock("../HelpHint.jsx");

describe("HelpHint", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var HelpHint = require("../HelpHint.jsx");
    var text = "test help text!";
    var classValue = "short-tooltip";
    var label = "this other text";
    var component;
    var div;
    // var tooltipDiv;

    beforeEach(function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} data-id="helpTooltip" className={classValue}>{label}</HelpHint>
        );
        div = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");
        // tooltipDiv = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text-content");
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



    /*
    TODO: fix this test
    NOTE: Currently weve not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("has hint text", function () {

        // var div = document.createElement('div');
        // document.body.appendChild(div);
        // var component = React.render(<HelpHint hintText={hintText} data-id={dataId} show={true} className="show" />, div);
        // var node = React.findDOMNode(component);


        // var componentE = Enzyme.mount(
        //     <HelpHint hintText={hintText} data-id={dataId} show={true} className="show" />
        // );
        // var helpHintTextE = componentE.find('[data-id="tooltip"]');



        // var componentJ = getComponent({ show: true });
        // var helpHintTextJ = TestUtils.findRenderedDOMNodeWithDataId(componentJ, "tooltip");


        // var helpHintTextN = TestUtils.findRenderedDOMNodeWithDataId(node, "tooltip");
        //
        // console.log("\n\n\n");
        // console.log("node", helpHintTextN);
        // console.log("\n\n\n");

        // expect(helpHintText.textContent).toEqual(hintText);

        // expect(tooltipDiv.textContent).toEqual(text);
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("has the styling class", function () {
        // expect(div.className).toContain(classValue);
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
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontnued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} className={classValue} />
        );

        expect(console.warn).not.toBeCalled();
    });

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("prevent click event default", function () {
        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");

        var event = {
            preventDefault: jest.genMockFunction()
        };
        ReactTestUtils.Simulate.click(container, event);

        // expect(event.preventDefault.mock.calls.length).toEqual(1);
    });

    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <HelpHint id="myHint" hintText={text} className={classValue} />
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
