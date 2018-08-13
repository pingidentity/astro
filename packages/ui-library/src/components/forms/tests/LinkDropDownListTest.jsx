
jest.dontMock("../LinkDropDownList");
jest.dontMock("../../general/CollapsibleLink");
jest.dontMock("../../tooltips/DetailsTooltip");


describe("LinkDropDownList", function () {

    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        LinkDropDownList = require("../LinkDropDownList"),
        _ = require("underscore");

    var componentId = "link-dropdown-list",
        labelText = "The Label",
        selectedIndex = 2,
        options = [
            { label: "One", value: "1" },
            { label: "Two", value: "2" },
            { label: "Three", value: "3" },
            { label: "Four", value: "4" },
            { label: "Five", value: "5" }
        ];

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            "data-id": componentId,
            closeOnSelection: false,
            label: labelText,
            onClick: jest.genMockFunction(),
            onToggle: jest.genMockFunction(),
            options: options,
            selectedOption: options[selectedIndex]
        });
        return ReactTestUtils.renderIntoDocument(<LinkDropDownList {...opts} />);
    }

    function getLabel (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-label");
    }

    function getMenu (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-menu");
    }


    // GENERAL TESTS ---------------------------------------------------------------------------------------------------

    it("Renders the component in closed state", function () {
        var component = getComponent(),
            label = getLabel(component),
            menu = getMenu(component);

        expect(component).toBeTruthy();

        expect(label.textContent).toBe(labelText);
        expect(label.getAttribute("class")).toContain("collapsible-link");
        expect(label.getAttribute("class")).not.toContain("open");

        expect(menu).toBeFalsy();
    });

    it("Renders the component in open state", function () {
        var component = getComponent({ open: true }),
            label = getLabel(component),
            menu = getMenu(component);

        expect(component).toBeTruthy();

        expect(label).toBeTruthy();
        expect(label.getAttribute("class")).toContain("open");

        expect(menu).toBeTruthy();
        expect(menu.getAttribute("class")).toContain("select-list");
    });

    it("Renders menu items correctly", function () {
        var component = getComponent({ open: true }),
            menuItems = getMenu(component).children;

        expect(menuItems.length).toEqual(options.length);
        expect(menuItems[selectedIndex].getAttribute("class")).toContain("selected");
    });

    it("Triggers onToggle callback when label clicked", function () {
        var component = getComponent();

        ReactTestUtils.Simulate.click(getLabel(component));
        expect(component.props.onToggle).toBeCalled();
    });

    it("Triggers onClick callback when menu item is clicked", function () {
        var clickIndex = 1,
            component = getComponent({ open: true }),
            menuItems = getMenu(component).children;

        ReactTestUtils.Simulate.click(menuItems[clickIndex]);
        expect(component.props.onClick).toBeCalledWith(options[clickIndex]);
        expect(component.props.onToggle).not.toBeCalled();
    });

    it("Does not trigger onClick callback if not passed in - stateful", function () {
        const onClick = jest.fn();
        const clickIndex = 1,
            component = getComponent({ open: true, onClick: undefined }),
            menuItems = getMenu(component).children;

        ReactTestUtils.Simulate.click(menuItems[clickIndex]);
        expect(onClick).not.toBeCalled();
    });

    it("Triggers onToggle callback when menu item is clicked and closeOnSelection is true", function () {
        var clickIndex = 1,
            component = getComponent({
                open: true,
                closeOnSelection: true
            }),
            menuItems = getMenu(component).children;

        ReactTestUtils.Simulate.click(menuItems[clickIndex]);
        expect(component.props.onToggle).toBeCalled();
    });


    // STATEFUL TESTS --------------------------------------------------------------------------------------------------

    it("Renders the stateful component", function () {
        var clickIndex = 1,
            component = getComponent({
                stateless: false,
                closeOnSelection: true
            }),
            label = getLabel(component),
            menu = getMenu(component),
            menuItems;

        expect(component).toBeTruthy();

        expect(label).toBeTruthy();
        expect(label.getAttribute("class")).toContain("collapsible-link");
        expect(label.getAttribute("class")).not.toContain("open");

        expect(menu).toBeFalsy();

        ReactTestUtils.Simulate.click(label);

        menu = getMenu(component);
        expect(menu).toBeTruthy();

        menuItems = getMenu(component).children;
        ReactTestUtils.Simulate.click(menuItems[clickIndex]);

        expect(component.props.onToggle).toBeCalled();
        expect(component.props.onClick).toBeCalled();

        menu = getMenu(component);
        expect(menu).toBeFalsy();
    });

    it("No onToggle callback exists when onToggle not provided", function () {
        var component = ReactTestUtils.renderIntoDocument(
                            <LinkDropDownList
                                data-id={componentId}
                                stateless={false}
                                closeOnSelection={false}
                                label={labelText}
                                onClick={jest.fn()}
                                options={options}
                                selectedOption={options[selectedIndex]}
                            />);

        expect(component.props.onToggle).toBeFalsy();
    });

    it("Triggers onToggle callback when label clicked and onToggle provided", function () {
        var component = ReactTestUtils.renderIntoDocument(
                            <LinkDropDownList
                                data-id={componentId}
                                stateless={false}
                                closeOnSelection={false}
                                label={labelText}
                                onClick={jest.fn()}
                                onToggle={jest.fn()}
                                options={options}
                                selectedOption={options[selectedIndex]}
                            />);

        expect(component.props.onToggle).toBeTruthy();

        var label = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-label");

        ReactTestUtils.Simulate.click(label);
        expect(component.props.onToggle).toBeCalled();
    });

    it("renders bottom links", () => {
        var component = ReactTestUtils.renderIntoDocument(
            <LinkDropDownList
                data-id={componentId}
                stateless
                open
                options={options}
                bottomPanel={<a href="#">Link</a>}
            />);

        var label = TestUtils.findRenderedDOMNodeWithDataId(component, componentId + "-bottom-links");
        expect(label).toBeTruthy();
    });
});