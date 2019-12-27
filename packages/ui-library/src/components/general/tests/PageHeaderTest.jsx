jest.dontMock("../PageHeader");

describe("PageHeader", () => {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PageHeader = require("../PageHeader"),
        SocialIcon = require("@pingux/end-user/components/SocialIcon/SocialIcon"),
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

    it("renders the component with a subtitle", () => {
        const opts = {
            iconName: "globe"
        };

        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__icon");
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

    it("renders the component with an image", () => {
        const imagePath = "http://www.foo.com/bar.jpg";
        const opts = {
            image: imagePath
        };

        const component = getComponent(opts);

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__image");
        expect(element).toBeTruthy();
        expect(element.children[0].src).toBe(imagePath);
    });

    it("renders the component with an iconName as an icon", () => {
        const opts ={
            iconName: "cog"
        };

        const component = getComponent(opts);
        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__icon");
        expect(element).toBeTruthy();
    });

    it("renders the component with an iconName as a JSX element", () => {
        const opts ={
            iconName: <SocialIcon.MARKETO/>
        };

        const component = getComponent(opts);
        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__node");
        expect(element).toBeTruthy();
    });

    it("does not render iconName prop if nothing is declared", () => {
        const opts ={
            iconName: ""
        };

        const component = getComponent(opts);
        const element = TestUtils.findRenderedDOMNodeWithClass(component, "page-header__node");
        expect(element).toBeFalsy();
    });
});
