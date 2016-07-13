window.__DEV__ = true;

jest.dontMock("../HeaderBar.jsx");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("HeaderBar", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        HeaderBar = require("../HeaderBar.jsx"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
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

        var handler = window.addEventListener.mock.calls[0][1];
        handler(e);

        expect(component.props.onItemValueChange).toBeCalledWith("", e);
    });

    it("does nothing on global click if no open node", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        var handler = window.addEventListener.mock.calls[0][1];
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
});
