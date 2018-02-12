window.__DEV__ = true;

jest.dontMock("../AppFrame");
jest.dontMock("../header-bar/HeaderBar");
jest.dontMock("../left-nav/LeftNavBar");

describe("AppFrame", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../util/ReduxTestUtils"),
        TestUtils = require("../../../testutil/TestUtils"),
        AppFrame = require("../AppFrame"),
        _ = require("underscore");

    var navData = [
        {
            label: "ColumnA",
            children: [
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
            ]
        },
        {
            label: "ColumnB",
            children: [
                {
                    label: "Section 4",
                    id: "section-4",
                    children: [{ label: "Item 3", id: "item-3" }],
                    icon: "account"
                },
                {
                    label: "Section 5",
                    id: "section-5",
                    children: [{ label: "Item 4", id: "item-5", icon: "help" }]
                }
            ]
        },
        {
            label: "ColumnC",
            children: [
                {
                    label: "Section 6",
                    id: "section-6",
                    icon: "account"
                }
            ]
        }
    ];

    function getWrappedComponent(opts) {
        opts = _.defaults(opts || {}, {
            onItemChange: jest.genMockFunction(),
            onSectionChange: jest.genMockFunction(),
            onRootChange: jest.genMockFunction(),
            navTree: navData,
            root: "ColumnA",
            autoSelectItemFromRoot: true,
            autoSelectItemfromSection: true,
            autoSelectSectionFromItem: true,
            oneSectionOnly: true,
            leftNavBarProps: {
                openSections: { "section-3": true }
            }
        });
        return ReactTestUtils.renderIntoDocument(
            <ReduxTestUtils.Wrapper type={AppFrame} opts={opts} />
        );
    }

    it("clicks trigger correct callback for items", function() {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "item-1-label"
        );

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemChange).lastCalledWith(
            "item-1",
            "section-1"
        );
    });

    it("clicks trigger correct callback for sections", function() {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-1-label"
        );
        var sectionIcon = TestUtils.findRenderedDOMNodeWithTag(
            sectionLabel,
            "span"
        );
        var sectionLabelNoChildren = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-3-label"
        );
        var sectionLabelClosed = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-2-label"
        );

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-1"
        );

        ReactTestUtils.Simulate.click(sectionLabelClosed);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-2"
        );

        ReactTestUtils.Simulate.click(sectionIcon);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-1"
        );

        ReactTestUtils.Simulate.click(sectionLabelNoChildren);
        expect(component.props.onItemChange).lastCalledWith(
            "section-3",
            "section-3"
        );
    });

    it("clicks trigger correct callback for sections -- an open section", function() {
        var wrapper = getWrappedComponent({
            leftNavBarProps: {
                openSections: { "section-2": true }
            }
        });
        var component = wrapper.refs.target;
        var sectionLabelOpened = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-2-label"
        );

        ReactTestUtils.Simulate.click(sectionLabelOpened);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-2"
        );
    });

    it("closes other sections when one section is opened (with oneSectionOnly prop)", function() {
        var wrapper = getWrappedComponent({
            leftNavBarProps: {
                openSections: { "section-2": true }
            }
        });
        var component = wrapper.refs.target;
        var sectionLabelOpened = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-1-label"
        );

        ReactTestUtils.Simulate.click(sectionLabelOpened);
        const calls = component.props.onSectionChange.mock.calls;
        expect(_.filter(calls, call => call[0] === "section-1").length).toBe(1);
        expect(_.filter(calls, call => call[0] === "section-2").length).toBe(1);
    });

    it("clicks trigger correct callback for root items", function() {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var rootNavItem = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "ColumnB-label"
        );
        var rootNavItemNotSection = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "ColumnC-label"
        );

        ReactTestUtils.Simulate.click(rootNavItem);
        expect(component.props.onRootChange).lastCalledWith("ColumnB");

        ReactTestUtils.Simulate.click(rootNavItemNotSection);
        expect(component.props.onRootChange).lastCalledWith("ColumnC");
    });

    it("renders with a blank root property and has 3 sections", function() {
        var wrapper = getWrappedComponent({ root: "" });
        var component = wrapper.refs.target;

        var sections = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "nav-section"
        );
        expect(sections.length).toBe(3);
    });

    it("opens a section with a selected item in it and it doesn't select a new item", function() {
        var wrapper = getWrappedComponent({ selectedNode: "item-2" });
        var component = wrapper.refs.target;

        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-2-label"
        );

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onItemChange).not.toBeCalled();
    });

    it("clicks trigger correct callbacks with no autoselecting behavior", function() {
        var wrapper = getWrappedComponent({
            autoSelectItemFromRoot: false,
            autoSelectItemfromSection: false,
            autoSelectSectionFromItem: false,
            oneSectionOnly: false
        });
        var component = wrapper.refs.target;
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "item-1-label"
        );
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-1-label"
        );
        var sectionIcon = TestUtils.findRenderedDOMNodeWithTag(
            sectionLabel,
            "span"
        );
        var sectionLabelNoChildren = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-3-label"
        );
        var sectionLabelClosed = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "section-2-label"
        );
        var rootNavItem = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "ColumnB-label"
        );
        var rootNavItemNotSection = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "ColumnC-label"
        );

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemChange).lastCalledWith(
            "item-1",
            "section-1"
        );

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-1"
        );

        ReactTestUtils.Simulate.click(sectionLabelClosed);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-2"
        );

        ReactTestUtils.Simulate.click(sectionIcon);
        expect(component.props.onSectionChange).lastCalledWith(
            "section-1"
        );

        ReactTestUtils.Simulate.click(sectionLabelNoChildren);
        expect(component.props.onItemChange).lastCalledWith(
            "section-3",
            "section-3"
        );

        ReactTestUtils.Simulate.click(rootNavItem);
        expect(component.props.onRootChange).lastCalledWith("ColumnB");

        ReactTestUtils.Simulate.click(rootNavItemNotSection);
        expect(component.props.onRootChange).lastCalledWith("ColumnC");
    });
});
