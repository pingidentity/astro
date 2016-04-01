window.__DEV__ = true;

jest.dontMock("../ExpandableRow.jsx");

describe("ExpandableRow", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ExpandableRow = require("../ExpandableRow.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            controlled: true,
            title: <div>Test Title</div>,
            subtitle: <div>Test Subtitle</div>,
            content: <div data-id="content">Test Content</div>,
            onToggle: jest.genMockFunction()
        });

        return ReactTestUtils.renderIntoDocument(<ExpandableRow {...opts} />);
    }

    function getContainer (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
    }

    function getExpandButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");
    }

    function getEditButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");
    }

    function getDeleteButton (component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");
    }

    it("stateless: renders component as collapsed (by default)", function () {
        var component = getComponent();
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("stateless: renders the expand button", function () {
        var component = getComponent();
        var expandButton = getExpandButton(component);

        expect(ReactTestUtils.isDOMComponent(expandButton)).toBeTruthy();
    });

    it("stateless: renders the edit button by default", function () {
        var component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeTruthy();
    });

    it("stateless: renders custom edit button", function () {
        var component = getComponent({
            expanded: true,
            editButton: <div data-id="custom-edit-button">Click me</div>
        });

        var customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-edit-button");

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeFalsy();
        expect(customButton.textContent).toBe("Click me");
    });

    it("stateless: renders custom className", function () {
        var component = getComponent({
            expanded: true,
            className: "extra"
        });

        expect(getContainer(component).getAttribute("class")).toContain("extra");
    });

    it("stateless: renders the delete button by default", function () {
        var component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeTruthy();
    });

    it("stateless: renders row without delete button when showDelete prop is set to false", function () {
        var component = getComponent({ expanded: true, showDelete: false });

        // check css on row
        expect(getContainer(component).className).toContain("no-delete");

        // make sure delete button not rendered
        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
    });

    it("stateless: renders the specified delete button", function () {
        var component = getComponent({
            expanded: true,
            deleteButton: <div data-id="custom-delete-button">Delete Me</div>
        });

        var customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-delete-button");

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
        expect(customButton.textContent).toEqual("Delete Me");
    });

    it("stateless: calls onToggle when expanded", function () {
        var component = getComponent({ expanded: true });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.onToggle).lastCalledWith(true);
    });

    it("stateless: calls onToggle when collapsed", function () {
        var component = getComponent();
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.onToggle).lastCalledWith(false);
    });

    it("stateless: no exception is thrown when onToggle is null", function () {
        var component = getComponent({ controlled: false, onToggle: null });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
    });

    it("stateful: expands when clicking on the expand icon and collapses when clicked on again", function () {
        var component = getComponent({ controlled: false });
        var expandButton = getExpandButton(component);

        // expand
        ReactTestUtils.Simulate.click(expandButton);

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual("Test Content");
        expect(component.props.onToggle).lastCalledWith(true);

        // collapse
        ReactTestUtils.Simulate.click(expandButton);
        expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
        expect(component.props.onToggle).lastCalledWith(false);
    });

    it("stateful: renders the row as expanded if defaultToExpanded prop is set to true", function () {
        var component = getComponent({ controlled: false, defaultToExpanded: true });
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
    });


    it("stateless: renders the view icon when isEditEnabled prop is set to false", function () {
        var component = getComponent({ expanded: true, isEditEnabled: false });
        var viewButton = TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");

        expect(viewButton.className).toEqual("view-btn");
    });

    it("stateless: renders an empty disabled button when showEdit prop is set to false", function () {
        var component = getComponent({ expanded: true, showEdit: false });
        var expandableRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(expandableRow.className).toContain("no-edit");
    });

    it("stateless: renders the content when passed in as a children instead of a prop", function () {
        var component = getComponent({
            expanded: true,
            children: <div data-id="content-children">Content</div>
        });

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();

        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content-children");
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
        expect(content.textContent).toEqual("Content");
    });

    it("stateless: renders the right-side/row-accessories content", function () {
        var linkText = "Control Link",
            rowAccessoriesLink = (
                <a className="control-link">{linkText}</a>
            ),
            rowAccessories,
            rowAccessoriesContent;

        var component = getComponent({ rowAccessories: rowAccessoriesLink });

        rowAccessories = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-accessories");
        expect(rowAccessories).toBeTruthy();

        rowAccessoriesContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "control-link");
        expect(rowAccessoriesContent).toBeTruthy();

        expect(rowAccessoriesContent.textContent).toEqual(linkText);
    });
});
