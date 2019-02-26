describe("ReportFilters", () => {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ReportFilters = require("../ReportFilters"),
        _ = require("underscore");

    const componentId = "reporting-filters";

    const getComponent = (opts = {}) => {
        opts = _.defaults(opts, {
            "data-id": componentId,
            filters: []
        });
        return ReactTestUtils.renderIntoDocument(<div><ReportFilters {...opts} /></div>);
    };

    it("renders the component", () => {
        const component = getComponent();
        expect(ReactTestUtils.isDOMComponent(component)).toBeTruthy();
    });

    it("renders the component with a container for the inputs", () => {
        const component = getComponent();

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "reporting-filters__container");
        expect(element).toBeTruthy();
    });

    it("renders an array of nodes", () => {
        const opts = {
            filters: [
                [
                    <div>
                        <div />
                        <div />
                    </div>
                ]
            ]
        };

        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "reporting-filters__container");
        expect(element).toBeTruthy();
    });

    it("renders dividers between sections but not on the last section", () => {
        const opts = {
            filters: [
                [
                    <div />
                ],
                [
                    <div />
                ],
                [
                    <div />
                ]
            ]
        };

        const component = getComponent(opts);

        const elements = TestUtils.scryRenderedDOMNodesWithClass(component, "reporting-filters--divider");
        expect(elements.length).toEqual(2);
    });

});
