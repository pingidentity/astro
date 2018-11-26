window.__DEV__ = true;

jest.dontMock("../LeftNavBar");
jest.dontMock("../Copyright");
jest.dontMock("../../../../util/Utils");

describe("LeftNavBar", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Utils = require("../../../../util/Utils"),
        LeftNavBar = require("../LeftNavBar"),
        _ = require("underscore");

    var navData = [
        {
            label: "Section 1",
            id: "section-1",
            children: [{ label: "Item 1", id: "item-1" }],
            icon: "account"
        },
        {
            label: "Section 2",
            id: "section-2",
            children: [{ label: "Item 2", id: "item-2", icon: "help" }]
        },
        {
            label: "Section 3",
            id: "section-3"
        }
    ];

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            onItemValueChange: jest.genMockFunction(),
            onSectionValueChange: jest.genMockFunction(),
            tree: navData
        });
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={LeftNavBar} opts={opts} />);
    }

    it("clicks trigger correct callback", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-label");
        var sectionIcon = TestUtils.findRenderedDOMNodeWithTag(sectionLabel, "span");
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "item-1-label");
        var sectionLabelNoChildren = TestUtils.findRenderedDOMNodeWithDataId(component, "section-3-label");

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionValueChange).lastCalledWith("section-1");

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemValueChange).lastCalledWith("item-1", "section-1");

        ReactTestUtils.Simulate.click(sectionIcon);
        expect(component.props.onSectionValueChange).lastCalledWith("section-1");

        ReactTestUtils.Simulate.click(sectionLabelNoChildren);
        expect(component.props.onItemValueChange).lastCalledWith("section-3", "section-3");
    });

    it("renders the tree structure", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
        var children = section1.getElementsByTagName("li");

        expect(children.length).toEqual(1);
        expect(children[0].textContent).toEqual("Item 1");
    });

    it("detaches animation listener after re-render", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        component._getItemSelector().removeEventListener = jest.genMockFunction();

        component._rerender();

        expect(component._getItemSelector().removeEventListener).toBeCalled();
    });

    it("unmounts", function () {
        var wrapper = getWrappedComponent({ selectedNode: "item-1" });
        var component = wrapper.refs.target;

        component._getItemSelector().removeEventListener = jest.genMockFunction();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(component._getItemSelector()).toBe(null);
    });

    /*
    it("will scroll if selected item is below copyright section", function () {
        var wrapper = getWrappedComponent({ openNode: "section-1", selectedNode: "item-1" });
        var component = wrapper.refs.target;
        var copyright = ReactDOM.findDOMNode(component.refs.copyright);
        var itemSelector = ReactDOM.findDOMNode(component).getElementsByTagName("li")[1];

        copyright.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ top: 10 });
        itemSelector.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ bottom: 11 });
        parent.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ height: 10 });

        wrapper.sendProps({ openNode: "section-2", selectedNode: "item-2" });
        expect(parent.scrollTop).toBe(10);

        itemSelector = ReactDOM.findDOMNode(component).getElementsByTagName("li")[0];
        itemSelector.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ top: -10 });

        wrapper.sendProps({ openNode: "section-1", selectedNode: "item-1" });
        expect(parent.scrollTop).toBe(0);
    });*/

    //just here to satisfy code coverage
    it("gets new selected item", function () {
        var wrapper = getWrappedComponent({ selectedSection: "section-1", selectedNode: "item-1" });

        wrapper.sendProps({ selectedSection: "section-2", selectedNode: "item-2" });
        wrapper.sendProps({ selectedSection: "section-1", selectedNode: "item-1" });
    });

    it("closes previously opened section when new section opened and autocollapse enabled", function () {
        var wrapper = getWrappedComponent({ autocollapse: true });
        var component = wrapper.refs.target;
        var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
        var section2 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-2-menu");

        wrapper.sendProps({ openSections: { "section-1": true } });

        expect(section1.parentNode.className).toContain("open");
        expect(section2.parentNode.className).not.toContain("open");

        wrapper.sendProps({ openSections: { "section-1": false, "section-2": true } });

        expect(section1.parentNode.className).not.toContain("open");
        expect(section2.parentNode.className).toContain("open");
    });

    it("keeps previously opened sections open when new section opened and autocollapse disabled", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
        var section2 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-2-menu");

        wrapper.sendProps({ openSections: { "section-1": true } });

        expect(section1.parentNode.className).toContain("open");
        expect(section2.parentNode.className).not.toContain("open");

        wrapper.sendProps({ openSections: { "section-1": true, "section-2": true } });

        expect(section1.parentNode.className).toContain("open");
        expect(section2.parentNode.className).toContain("open");
    });

    [true, false].forEach(function (autocollapse) {
        it("renders specified open as open", function () {
            var wrapper = getWrappedComponent({ autocollapse: autocollapse });
            var component = wrapper.refs.target;
            var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
            var section2 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-2-menu");

            wrapper.sendProps({ openSections: { "section-1": true } });

            expect(section1.parentNode.className).toContain("open");
            expect(section2.parentNode.className).not.toContain("open");
        });

        it("selectedSection is not set when all sections are closed", function () {
            var wrapper = getWrappedComponent({ autocollapse: autocollapse });
            var component = wrapper.refs.target;
            var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
            var section2 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-2-menu");

            expect(section1.parentNode.className).not.toContain("open");
            expect(section2.parentNode.className).not.toContain("open");
            expect(component.props.selectedSection).toBeFalsy();
        });
    });

    it("renders an application logo when logo source is present", function () {
        var logoSource = "https://www.pingidentity.com/etc/designs/pic/clientlibs-all/logos/PingIdentity_logo.png";
        var wrapper = getWrappedComponent({ logoSrc: logoSource });
        var component = wrapper.refs.target;

        var copyright = TestUtils.findRenderedDOMNodeWithDataId(component, "copyright");
        expect(copyright).toBeTruthy();

        var logo = TestUtils.findRenderedDOMNodeWithDataId(component, "logo-container");
        expect(logo).toBeTruthy();

        var application = TestUtils.findRenderedDOMNodeWithClass(component, "ping-application");
        expect(application).toBeTruthy();
        expect(application.getAttribute("src")).toBe(logoSource);
    });

    it("renders the logo when logoSrc object is provided", function () {
        const logoSrc = {
            url: "http://foobar.com/my-logo.jpg",
            width: "200px",
            height: "100px",
        };
        const wrapper = getWrappedComponent({
            logoSrc: logoSrc
        });

        const copyright = TestUtils.findRenderedDOMNodeWithDataId(wrapper, "copyright");
        const imageTag = TestUtils.findRenderedDOMNodeWithTag(copyright, "img");

        expect(imageTag.getAttribute("src")).toBe(logoSrc.url);
        expect(imageTag.style.height).toBe(logoSrc.height);
        expect(imageTag.style.width).toBe(logoSrc.width);
    });

    it("renders a pingone logo when pingoneLogo variable is set to true", function () {
        var wrapper = getWrappedComponent({ pingoneLogo: true });
        var component = wrapper.refs.target;

        var copyright = TestUtils.findRenderedDOMNodeWithDataId(component, "copyright");
        expect(copyright).toBeTruthy();

        var logo = TestUtils.findRenderedDOMNodeWithDataId(component, "logo-container");
        expect(logo).toBeTruthy();
    });

    it("renders no logo when logoSrc is not provided and pingoneLogo is not declared ", function () {
        var wrapper = getWrappedComponent({ });
        var component = wrapper.refs.target;

        var copyright = TestUtils.findRenderedDOMNodeWithDataId(component, "copyright");
        expect(copyright).toBeTruthy();

        var logo = TestUtils.findRenderedDOMNodeWithDataId(component, "logo-container");
        expect(logo).toBeFalsy();
    });

    it("renders a custom footer if the renderFooterContent render-prop is defined", function () {
        const customContent = "foobar footer content";
        const logoSrc = "http://foobar.com/mylogo.jpg";
        const renderFooterContent = (defaultContent) => {
            return (
                <div>
                    {defaultContent}
                    <div>{customContent}</div>
                </div>
            );
        };

        var wrapper = getWrappedComponent({
            renderFooterContent: renderFooterContent,
            logoSrc: logoSrc,
        });
        var component = wrapper.refs.target;

        var copyright = TestUtils.findRenderedDOMNodeWithDataId(component, "copyright");
        expect(copyright.textContent).toContain(customContent);

        var logo = TestUtils.findRenderedDOMNodeWithTag(copyright, "img");
        expect(logo.getAttribute("src")).toBe(logoSrc);
    });

    it("renders a topContent when specified", function () {
        var text = "Something";
        var content = <span>{text}</span>;
        var wrapper = getWrappedComponent({ topContent: content });
        var component = wrapper.refs.target;

        var topContent = TestUtils.findRenderedDOMNodeWithDataId(component, "nav-top-content");
        expect(topContent).toBeTruthy();
        expect(topContent.textContent).toBe(text);
    });

    it("renders a tree item as a context selector when specified", function () {
        var id = "my-context-selector";
        var addLinkCb = jest.genMockFunction();
        var menuItemData = [
            {
                label: "Item 1",
                id: "context-item-1"
            },
            {
                label: "Item 2",
                id: "context-item-2"
            },
            {
                label: "Item 22",
                id: "context-item-3"
            }
        ];
        var contextSelectorData = [{
            id: id,
            type: "context",
            label: "Environement",
            icon: "globe",
            addLink: {
                text: "Environment",
                callback: addLinkCb
            },
            children: menuItemData
        }];
        var wrapper = getWrappedComponent({
            tree: contextSelectorData.concat(navData),
            selectedContexts: {
                "my-context-selector": "context-item-3"
            }
        });
        var component = wrapper.refs.target;

        var selector = TestUtils.findRenderedDOMNodeWithDataId(component, id);
        expect(selector).toBeTruthy();
        expect(selector.className).not.toContain("context-selector-open");

        var label = TestUtils.findRenderedDOMNodeWithDataId(component, id + "-label");
        expect(label).toBeTruthy();
        expect(label.className).not.toContain("open");
        expect(label.textContent).toBe(menuItemData[2].label);

        ReactTestUtils.Simulate.click(label);
        expect(component.props.onSectionValueChange).lastCalledWith(id);

        ReactTestUtils.Simulate.click(label.childNodes[0]);
        expect(component.props.onSectionValueChange).lastCalledWith(id);

        var menu = TestUtils.findRenderedDOMNodeWithDataId(component, id + "-menu");
        var menuItems = menu.childNodes;
        var menuItem2 = menuItems[1].getElementsByTagName("a")[0];
        var addLink = menuItems[3].getElementsByTagName("a")[0];

        expect(menuItems.length).toBe(menuItemData.length + 1); // +1 for the addLink
        expect(menuItem2.textContent).toBe(menuItemData[1].label);
        expect(addLink.textContent).toBe(contextSelectorData[0].addLink.text);
        expect(addLink.className).toContain("context-selector-add");

        ReactTestUtils.Simulate.click(addLink);
        expect(addLinkCb).toBeCalled();

        var openSections = {};
        openSections[id] = true;
        wrapper.sendProps({ openSections: openSections });
        expect(selector.className).toContain("context-selector-open");
        expect(label.className).toContain("open");

        ReactTestUtils.Simulate.click(menuItem2);
        expect(component.props.onItemValueChange).lastCalledWith(menuItemData[1].id, id);
    });

    it("renders without error when the selected item doesn't exist", function () {
        var id = "my-context-selector";
        var menuItemData = [
            {
                label: "Item 1",
                id: "context-item-1"
            },
            {
                label: "Item 2",
                id: "context-item-2"
            },
            {
                label: "Item 22",
                id: "context-item-3"
            }
        ];
        var contextSelectorData = [{
            id: id,
            type: "context",
            label: "Environement",
            icon: "globe",
            addLink: {
                text: "Environment",
            },
            children: menuItemData
        }];
        getWrappedComponent({
            tree: contextSelectorData.concat(navData),
            selectedContexts: {
                "my-context-selector": "context-item-4"
            }
        });
    });

    it("throws error when deprecated prop 'onItemClick' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onItemClick", "onItemValueChange"));

        expect(function () {
            getWrappedComponent({ onItemClick: jest.genMockFunction() });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'onSectionClick' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("onSectionClick", "onSectionValueChange"));

        expect(function () {
            getWrappedComponent({ onSectionClick: jest.genMockFunction() });
        }).toThrow(expectedError);
    });

});
