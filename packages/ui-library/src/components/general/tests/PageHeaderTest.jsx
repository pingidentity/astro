jest.dontMock("../PageHeader");

describe("PageHeader", () => {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageHeader = require("../PageHeader"),
        _ = require("underscore");

    const pageHeaderTitle = "Page Header",
        componentId = "Page Header";

    const getComponent = (opts = {}) => {
        opts = _.defaults(opts, {
            "data-id": componentId,
            title: pageHeaderTitle
        });
        return ReactTestUtils.renderIntoDocument(<div><PageHeader {...opts} /></div>);
    };

    it("renders the component", () => {
        const component = getComponent();
        expect(ReactTestUtils.isDOMComponent(component)).toBeTruthy();
    });

    it("renders the component with an underline", () => {
        const opts = {
            underlined: true
        };
        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header--underlined");
        expect(element).toBeTruthy();
    });

    it("renders the component with a subtitle", () => {
        const opts = {
            subtitle: "test"
        };

        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__subtitle");
        expect(element).toBeTruthy();
    });

    it("renders the component with accessories", () => {
        const opts = {
            accessories: <div></div>
        };

        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__accessories");
        expect(element).toBeTruthy();
    });
});
