window.__DEV__ = true;

jest.dontMock("../HeaderBar.jsx");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("HeaderBar", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        HeaderBar = require("../HeaderBar.jsx"),
        _ = require("underscore");

    var dataId = "test-header";

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": dataId,
            onItemValueChange: jest.genMockFunction(),
            onMenuValueChange: jest.genMockFunction(),
            tree: [
                { id: "help", url: "http://www.yahoo.com" },
                { id: "cog", children: [{ id: "cog-menu-item", label: "Cog Menu Item" }] },
                { id: "account", children: [{ id: "globe", label: "Globe" }] }
            ]
        });
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={HeaderBar} opts={opts} />);
    }

    beforeEach(function () {
        window.addEventListener = jest.genMockFunction();
        window.removeEventListener = jest.genMockFunction();
    });

    it("clicks trigger correct callback", function () {
        var wrapper = getWrappedComponent({ openNode: "cog" });
        var component = wrapper.refs.target;
        var navItem = TestUtils.findRenderedDOMNodeWithDataId(component, "cog");
        var menuItem = TestUtils.findRenderedDOMNodeWithDataId(component, "cog-menu-item");

        ReactTestUtils.Simulate.click(navItem);
        expect(component.props.onItemValueChange).toBeCalledWith("cog");
        expect(component.props.onMenuValueChange).not.toBeCalled();

        ReactTestUtils.Simulate.click(menuItem);
        expect(component.props.onMenuValueChange).lastCalledWith("cog-menu-item", "cog");
    });

    it("detaches event listener on umount", function () {
        expect(ReduxTestUtils.unmountDetachesWindowListener(getWrappedComponent, "click")).toBe(true);
    });

    it("hides menu on global click", function () {
        var wrapper = getWrappedComponent({ openNode: "cog" });
        var component = wrapper.refs.target;
        var e = { target: document.body };

        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        handler(e);

        expect(component.props.onItemValueChange).toBeCalledWith("", e);
    });

    it("does nothing on global click if no open node", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        handler({ target: document.body });

        expect(component.props.onItemValueChange).not.toBeCalled();
    });

    it("provides logo url", function () {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var logo = TestUtils.findRenderedDOMNodeWithDataId(component, "header-site-logo");
        expect(logo).toBeTruthy();

        wrapper.sendProps({ siteLogo: null });
        logo = TestUtils.findRenderedDOMNodeWithDataId(component, "header-site-logo");
        expect(logo).toBeFalsy();
    });

    it("renders icon with iconClassName", function () {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeFalsy();

        wrapper.sendProps({ tree: [
                                { id: "help", iconClassName: "icon-help", url: "http://www.yahoo.com" }
        ] });
        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeTruthy();
    });

    it("renders icon with iconSrc", function () {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeFalsy();

        wrapper.sendProps({ tree: [
                                { id: "help", iconSrc: "http://somesite.com/logo.png", url: "http://www.yahoo.com" }
        ] });
        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeTruthy();
    });

    it("renders the siteTitle when provided", function () {
        var siteTitleText = "Site Title";
        var wrapper = getWrappedComponent({ siteTitle: siteTitleText });
        var component = wrapper.refs.target;

        var siteTitle = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-site-title");
        expect(siteTitle).toBeTruthy();
        expect(siteTitle.textContent).toEqual(siteTitleText);

        wrapper.sendProps({ siteTitle: null });
        siteTitle = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-site-title");
        expect(siteTitle).toBeFalsy();
    });

    //TODO: remove when label no longer supported
    it("logs warning for deprecated label prop", function () {
        console.warn = jest.genMockFunction();

        var wrapper = getWrappedComponent({ label: "something" });
        var component = wrapper.refs.target; // eslint-disable-line no-unused-vars

        expect(console.warn).toBeCalledWith(
            "Deprecated: use siteTitle instead of label. Support for label will be removed in next version"
        );
    });
});
