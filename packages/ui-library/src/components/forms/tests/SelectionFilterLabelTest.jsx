
jest.dontMock("../SelectionFilterLabel.jsx");
jest.dontMock("../FormLabel.jsx");


describe("SelectionFilterLabel", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        SelectionFilterLabel = require("../SelectionFilterLabel.jsx"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    var componentId = "sfl";


    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });
        return ReactTestUtils.renderIntoDocument(<SelectionFilterLabel {...opts} />);
    }

    it("Renders the component without count", function () {
        var component = getComponent(),
            componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId),
            countDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-count"),
            labelDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-label");

        expect(componentDom).toBeTruthy();
        expect(componentDom.getAttribute("data-id")).toEqual(componentId);
        expect(countDom).toBeFalsy();
        expect(labelDom).toBeFalsy();
    });

    it("Renders the className when specified", function () {
        var className = "all-the-things",
            component = getComponent({ className: className }),
            componentDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(componentDom.getAttribute("class")).toContain(className);
    });

    it("Renders the count when specified", function () {
        var countNum = 5,
            component = getComponent({ count: countNum }),
            countDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-count");

        expect(countDom).toBeTruthy();
        expect(parseInt(countDom.textContent)).toEqual(countNum);
    });

    it("Renders the label when specified", function () {
        var labelText = "My Label",
            component = getComponent({ labelText: labelText }),
            labelDom = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-label"),
            labelTextDom = ReactTestUtils.findRenderedDOMComponentWithClass(component, "label-text");

        expect(labelDom).toBeTruthy();
        expect(labelTextDom).toBeTruthy();
        expect(labelTextDom.textContent).toEqual(labelText);
    });
});
