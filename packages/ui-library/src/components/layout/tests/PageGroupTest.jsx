jest.dontMock("../PageGroup");

describe("PageGroup", function () {
    let React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageGroup = require("../PageGroup"),
        _ = require("underscore");

    let componentId = "page-group";

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId
        });

        return ReactTestUtils.renderIntoDocument(<div><PageGroup {...opts} /></div>);
    }

    it("renders component with data-id=page-group", function () {
        let component = getComponent({});

        let element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a div tags", function () {
        let component = getComponent({});

        let element = TestUtils.scryRenderedDOMNodesWithTag(component, "div");

        expect(element.length).toEqual(1);
    });

    it("renders a label tag", function () {
        let component = getComponent({});

        let element = TestUtils.scryRenderedDOMNodesWithTag(component, "label");

        expect(element.length).toEqual(1);
    });

});