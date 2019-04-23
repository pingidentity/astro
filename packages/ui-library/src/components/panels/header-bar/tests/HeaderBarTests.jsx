window.__DEV__ = true;

jest.dontMock("../HeaderBar");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

jest.mock("popper.js");
jest.mock("react-portal");

describe("HeaderBar", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        HeaderBar = require("../HeaderBar"),
        _ = require("underscore");

    var dataId = "test-header";

    function getWrappedComponent(opts, omit = {}) {
        opts = _.omit(
            _.defaults(opts || {}, {
                "data-id": dataId,
                onItemValueChange: jest.fn(),
                onMenuValueChange: jest.fn(),
                tree: [
                    { id: "help", url: "http://www.yahoo.com" },
                    {
                        id: "cog",
                        children: [
                            { id: "cog-menu-item", label: "Cog Menu Item" }
                        ]
                    },
                    {
                        id: "account",
                        children: [{ id: "globe", label: "Globe" }]
                    }
                ]
            }),
            omit
        );
        return ReactTestUtils.renderIntoDocument(
            <ReduxTestUtils.Wrapper type={HeaderBar} opts={opts} />
        );
    }

    beforeEach(function() {
        window.addEventListener = jest.fn();
        window.removeEventListener = jest.fn();
    });

    it("clicks trigger correct callback", function() {
        var wrapper = getWrappedComponent({ openNode: "cog" });
        var component = wrapper.refs.target;
        var navItem = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "cog-trigger"
        );
        var menuItem = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "cog-menu-item"
        );

        ReactTestUtils.Simulate.click(navItem);
        expect(component.props.onItemValueChange).toBeCalledWith("cog");
        expect(component.props.onMenuValueChange).not.toBeCalled();

        ReactTestUtils.Simulate.click(menuItem);
        expect(component.props.onMenuValueChange).lastCalledWith(
            "cog-menu-item",
            "cog"
        );
    });

    it("uses preloaded logo", function() {
        var wrapper = getWrappedComponent({
            siteLogo: "pingone",
            inline: true
        });
        var component = wrapper.refs.target;

        var logo = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "test-header-site-logo"
        );
        expect(logo).toBeTruthy();

        wrapper.sendProps({ siteLogo: null });
        logo = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "test-header-site-logo"
        );
        expect(logo).toBeFalsy();
    });

    it("uses userMenu instead of tree", function() {
        var wrapper = getWrappedComponent(
            { userMenu: [{ label: "junk", id: "junk" }] },
            ["tree"]
        );
        var component = wrapper.refs.target;

        var account = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "account"
        );
        expect(account).toBeTruthy();
    });

    it("provides logo url", function() {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var logo = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "test-header-site-logo"
        );
        expect(logo).toBeTruthy();

        wrapper.sendProps({ siteLogo: null });
        logo = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "test-header-site-logo"
        );
        expect(logo).toBeFalsy();
    });

    it("renders icon with iconClassName", function() {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-globe");
        expect(icon).toBeFalsy();

        wrapper.sendProps({
            tree: [
                {
                    id: "help",
                    iconClassName: "icon-globe",
                    url: "http://www.yahoo.com"
                }
            ]
        });
        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-globe");
        expect(icon).toBeTruthy();
    });

    it("renders icon with icon", function() {
        var wrapper = getWrappedComponent({ siteLogo: "blah" });
        var component = wrapper.refs.target;

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-globe");
        expect(icon).toBeFalsy();

        wrapper.sendProps({
            tree: [
                {
                    id: "help",
                    icon: "globe",
                    url: "http://www.yahoo.com"
                }
            ]
        });
        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon-globe");
        expect(icon).toBeTruthy();
    });

    it("renders icon with iconSrc", function() {
        var wrapper = getWrappedComponent({ siteLogo: "blah", tree: {} });
        var component = wrapper.refs.target;

        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeFalsy();

        wrapper.sendProps({
            tree: [
                {
                    id: "help",
                    iconSrc: "http://somesite.com/logo.png",
                    url: "http://www.yahoo.com"
                }
            ]
        });
        var icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        expect(icon).toBeTruthy();
    });

    it("renders the siteTitle when provided", function() {
        var siteTitleText = "Site Title";
        var wrapper = getWrappedComponent({ siteTitle: siteTitleText });
        var component = wrapper.refs.target;

        var siteTitle = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            dataId + "-site-title"
        );
        expect(siteTitle).toBeTruthy();
        expect(siteTitle.textContent).toEqual(siteTitleText);

        wrapper.sendProps({ siteTitle: null });
        siteTitle = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            dataId + "-site-title"
        );
        expect(siteTitle).toBeFalsy();
    });

    it("renders the environment selector when provided", function() {
        var wrapper = getWrappedComponent({
            environmentOptions: [
                { label: "Thing", id: "thing" },
                { label: "Thing 2", id: "thing2", icon: "cog" }
            ],
            environmentSelected: "thing"
        });
        var component = wrapper.refs.target;

        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        expect(selector).toBeTruthy();

        wrapper.sendProps({ environmentSelected: "thing2" });
        selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        expect(selector).toBeTruthy();

        wrapper.sendProps({ environmentOptions: null });
        selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        expect(selector).toBeFalsy();
    });

    it("renders the market selector when provided", function() {
        var wrapper = getWrappedComponent({
            marketOptions: [{ label: "Thing", id: "thing" }],
            marketSelected: "thing"
        });
        var component = wrapper.refs.target;

        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "market-selector"
        );
        expect(selector).toBeTruthy();

        wrapper.sendProps({ marketOptions: null });
        selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "market-selector"
        );
        expect(selector).toBeFalsy();
    });

    it("renders the nav when provided", function() {
        var wrapper = getWrappedComponent({
            navOptions: [{ label: "Thing", id: "thing" }]
        });
        var component = wrapper.refs.target;

        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "header-nav"
        );
        expect(selector).toBeTruthy();

        wrapper.sendProps({ navOptions: null });
        selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "nav-selector"
        );
        expect(selector).toBeFalsy();
    });

    it("renders the additional content when provided", function() {
        var wrapper = getWrappedComponent({
            additionalContent: "More stuff"
        });
        var component = wrapper.refs.target;

        var content = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            dataId + "-additional-content"
        );
        expect(content).toBeTruthy();

        wrapper.sendProps({ additionalContent: null });
        content = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            dataId + "-additional-content"
        );
        expect(content).toBeFalsy();
    });

    it("opens and closes the environment selector", function() {
        var wrapper = getWrappedComponent({
            environmentOptions: [{ label: "Thing", id: "thing" }]
        });
        var component = wrapper.refs.target;
        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        var trigger = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "action-btn"
        );

        var body = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "details-body"
        );
        expect(body).toBeFalsy();

        ReactTestUtils.Simulate.click(trigger);
        body = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "details-body"
        );
        expect(body).toBeTruthy();

        ReactTestUtils.Simulate.click(trigger);
        body = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "details-body"
        );
        expect(body).toBeFalsy();
    });

    it("opens and clicks on the environment selector", function() {
        var callback = jest.fn();

        var wrapper = getWrappedComponent({
            environmentOptions: [{ label: "Thing", id: "thing" }],
            onEnvironmentChange: callback
        });
        var component = wrapper.refs.target;
        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        var trigger = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "action-btn"
        );
        ReactTestUtils.Simulate.click(trigger);
        var option = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "select-option"
        );

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(option);
        expect(callback).toBeCalledWith("thing");
    });

    it("opens and closes the market selector", function() {
        var wrapper = getWrappedComponent({
            marketOptions: [{ label: "Thing", id: "thing" }]
        });
        var component = wrapper.refs.target;
        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "market-selector"
        );
        var trigger = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "selected-input-input"
        );

        var openSelector = TestUtils.findRenderedDOMNodeWithClass(
            selector,
            "market-selector open"
        );
        expect(openSelector).toBeFalsy();

        ReactTestUtils.Simulate.click(trigger);

        openSelector = TestUtils.findRenderedDOMNodeWithClass(
            selector,
            "market-selector open"
        );
        expect(openSelector).toBeTruthy();

        ReactTestUtils.Simulate.click(trigger);
        openSelector = TestUtils.findRenderedDOMNodeWithClass(
            selector,
            "market-selector open"
        );
        expect(openSelector).toBeFalsy();
    });

    it("opens and clicks on the market selector", function() {
        var callback = jest.fn();

        var wrapper = getWrappedComponent({
            marketOptions: [{ label: "Thing", id: "thing" }],
            onMarketChange: callback
        });
        var component = wrapper.refs.target;
        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "market-selector"
        );
        var trigger = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "selected-input-input"
        );
        ReactTestUtils.Simulate.click(trigger);
        var option = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "select-option"
        );

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(option);
        expect(callback).toBeCalledWith("thing");
    });

    it("clicks on the nav", function() {
        var callback = jest.fn();

        var wrapper = getWrappedComponent({
            navOptions: [{ label: "Thing", id: "thing" }],
            onNavChange: callback
        });
        var component = wrapper.refs.target;
        var nav = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "Thing-label"
        );

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(nav);
        expect(callback).toBeCalledWith("thing");
    });

    it("calls the new environment callback", function() {
        var callback = jest.fn();

        var wrapper = getWrappedComponent({
            environmentOptions: [{ label: "Thing", id: "thing" }],
            onNewEnvironment: callback
        });
        var component = wrapper.refs.target;
        var selector = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "environment-selector"
        );
        var trigger = TestUtils.findRenderedDOMNodeWithDataId(
            selector,
            "action-btn"
        );
        ReactTestUtils.Simulate.click(trigger);
        var newLink = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "new-environment"
        );

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(newLink);
        expect(callback).toBeCalled();
    });

    it("renders mode styling with string", function() {

        const modeTitle = "Sandbox";
        const wrapper = getWrappedComponent({
            mode: modeTitle,
        });
        const component = wrapper.refs.target;
        const bar = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-bar"
        );

        const title = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-title"
        );


        expect(bar).toBeTruthy();
        expect(title.textContent).toEqual(modeTitle);

    });

    it("renders mode styling with object", function() {

        const mode = {
            title: "My Sandbox",
            color: "black",
        };

        const wrapper = getWrappedComponent({
            mode,
        });
        const component = wrapper.refs.target;
        const bar = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-bar"
        );

        const title = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-title"
        );

        expect(bar.style["background-color"]).toEqual(mode.color);
        expect(title.style["border-color"]).toEqual(mode.color);
        expect(title.textContent).toEqual(mode.title);
    });

    it("does not render mode with no prop", function() {

        const wrapper = getWrappedComponent();
        const component = wrapper.refs.target;
        const bar = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-bar"
        );

        const title = TestUtils.findRenderedDOMNodeWithClass(
            component,
            "header-bar__mode-title"
        );


        expect(bar).toBeFalsy();
        expect(title).toBeFalsy();

    });



    it ("throws the Cannonball warning when either legacy or updated is not provided", function() {
        console.warn = jest.fn();

        getWrappedComponent();
        expect(console.warn).toBeCalled();
    });

    it("fires Cannonball warning when use-portal isn't set", function() {
        console.warn = jest.fn();
        getWrappedComponent();
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warning when use-portal is set", function() {
        console.warn = jest.fn();
        getWrappedComponent({ updated: true, flags: [ "use-portal" ] });
        expect(console.warn).not.toBeCalled();
    });

});
