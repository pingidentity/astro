window.__DEV__ = true;

jest.dontMock("../Banner");

const defaultProps = {
    showClose: true,
    icon: "shield",
    title: "Add MFA access for your Users!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    actionText: "Unlock",
    actionIcon: "open-lock",
    visible: true,
};

const noButtonProps = {
    showClose: true,
    icon: "shield",
    title: "Add MFA access for your Users!",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
    onClose: jest.fn(),
    visible: true,
};

describe("Banner", function () {
    const React = require("react");
    const ReactTestUtils = require("react-dom/test-utils");
    const Banner = require("../Banner");
    const TestUtils = require("../../../testutil/TestUtils");
    const _ = require("underscore");

    function getComponent (props) {
        const _props = _.defaults(props || { }, { });
        return ReactTestUtils.renderIntoDocument(<div><Banner { ..._props } /></div>);
    }

    it("Modal render default data-ids if not provided", function () {
        const component = getComponent();
        const banner = TestUtils.findRenderedDOMNodeWithClass(component, "banner");
        expect(banner.getAttribute("data-id")).toEqual("banner");
    });

    it("Modal render data-ids if provided", function () {
        const dataid = "myid";
        const component = getComponent({ "data-id": dataid, ...defaultProps });
        expect(ReactTestUtils.isDOMComponent(component)).toBeTruthy();

        const banner = TestUtils.findRenderedDOMNodeWithDataId(component, dataid);
        expect(ReactTestUtils.isDOMComponent(banner)).toBeTruthy();
    });

    it("display simple banner with button close and check actions", function () {
        const callback = jest.fn();
        const closeCallback = jest.fn();
        const view = getComponent({ "data-id": "banner-with-button",
            onClick: callback, onClose: closeCallback, ...defaultProps });
        const container = TestUtils.findRenderedDOMNodeWithDataId(view, "banner-with-button");
        const title = TestUtils.findRenderedDOMNodeWithClass(container, "banner__title");
        const text = TestUtils.findRenderedDOMNodeWithClass(container, "banner__text");
        const icon = TestUtils.findRenderedDOMNodeWithClass(container, "banner__icon");
        const button = TestUtils.findRenderedDOMNodeWithDataId(container, "banner-button");
        const close = TestUtils.findRenderedDOMNodeWithDataId(container, "banner-close");

        expect(title).toBeTruthy();
        expect(title.textContent).toBe(defaultProps.title);
        expect(text).toBeTruthy();
        expect(text.textContent).toBe(defaultProps.text);
        expect(icon).toBeTruthy();
        expect(button).toBeTruthy();
        expect(button.textContent).toBe(defaultProps.actionText);
        expect(close).toBeTruthy();

        ReactTestUtils.Simulate.click(button);
        expect(callback).toBeCalled();

        ReactTestUtils.Simulate.click(close);
        expect(closeCallback).toBeCalled();

    });

    it("display simple banner with no button", function () {
        const view = getComponent({ "data-id": "banner-with-button", ...noButtonProps });
        const container = TestUtils.findRenderedDOMNodeWithDataId(view, "banner-with-button");
        const button = TestUtils.findRenderedDOMNodeWithDataId(container, "banner-button");

        expect(button).not.toBeTruthy();
    });

    it("display simple banner with no close", function () {
        const view = getComponent({ "data-id": "banner-no-close-test",
            ...noButtonProps, showClose: false });
        const container = TestUtils.findRenderedDOMNodeWithDataId(view, "banner-no-close-test");
        const close = TestUtils.findRenderedDOMNodeWithDataId(container, "banner-close");

        expect(close).not.toBeTruthy();
    });

    it("displays a full width message", function () {
        const view = getComponent({ "data-id": "banner-fullwidth", fullWidth: true });
        const component = TestUtils.findRenderedDOMNodeWithClass(view, "banner--fullwidth");

        expect(component).toBeTruthy();
    });

    it("dont display banner when visible is false", function () {
        const view = getComponent({ "data-id": "banner-false", visible: false });
        const container = TestUtils.findRenderedDOMNodeWithDataId(view, "banner-false");

        expect(container).not.toBeTruthy();
    });
});
