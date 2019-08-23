window.__DEV__ = true;

jest.dontMock("../HelpHint");

describe("HelpHint", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var Utils = require("../../../util/Utils");
    var HelpHint = require("../HelpHint");
    var text = "test help text!";
    var classValue = "short-tooltip";
    var label = "this other text";
    var link = "#";
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

    it("data-id's don't change", () => {
        TestUtils.mountSnapshotDataIds(
            <HelpHint
                hintText="top secret"
            />
        );
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

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("prevent click event default", function () {
        var container = TestUtils.findRenderedDOMNodeWithDataId(component, "helpTooltip");

        var event = {
            preventDefault: jest.fn()
        };
        ReactTestUtils.Simulate.click(container, event);

        // expect(event.preventDefault.mock.calls.length).toEqual(1);
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(function () {
            ReactTestUtils.renderIntoDocument(
                <HelpHint id="foo" hintText="bar" />
            );
        }).toThrow(expectedError);
    });

    it("renders a link when prop 'link' is pass in", function () {
        component = ReactTestUtils.renderIntoDocument(
            <HelpHint hintText={text} className={classValue} link={link} />
        );

        var element = TestUtils.findRenderedDOMNodeWithClass(component, "content-link");

        expect(element).toBeDefined();
    });
});
