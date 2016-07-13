window.__DEV__ = true;

jest.dontMock("../ExpandableRow.jsx");
jest.dontMock("../../../tooltips/DetailsTooltip.jsx");

describe("ExpandableRow", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
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

    it("renders with default data-id", function () {
        var component = getComponent();

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(row).toBeDefined();
    });

    it("renders with given data-id", function () {
        var component = getComponent({ "data-id": "myRow" });

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("renders with given id", function () {
        var component = getComponent({ id: "myRow" });

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("stateless: renders component as collapsed (by default)", function () {
        var component = getComponent();
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("stateless: no toggle callback", function () {
        var component = getComponent({ onToggle: undefined });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        //as long as no exception is thrown, the test will pass
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

    it("stateless: passes non-hash path", function () {
        var component = getComponent({
            expanded: true,
            editViewRoute: "/my/route"
        });

        var editButton = getEditButton(component);

        expect(editButton.getAttribute("href")).toEqual("/my/route");
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

    it("stateless: renders a row image when provided", function () {
        var imagePath = "http://p1.com/images/image1.jpg",
            component,
            imageContent;

        // test without image
        component = getComponent();
        imageContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-image");
        expect(imageContent.length).toEqual(0);

        // test with image
        component = getComponent({ image: imagePath });
        imageContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-image");
        expect(imageContent.length).toEqual(1);
        expect(imageContent[0].src).toEqual(imagePath);
    });

    it("stateless: should genereate delete button with confirmation when confirmDelete provided", function () {
        var component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true
        });

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(expandedRow, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(expandedRow)).toBeNull();
    });

    it("stateful: should genereate delete button with confirmation when confirmDelete provided", function () {
        var component = getComponent({
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: true,
            controlled: false
        });

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(expandedRow, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(expandedRow)).toBeNull();
    });

    it("stateless: should genereate delete button without confirmation when confirmDelete not provided", function () {
        var component = getComponent({
            expanded: true,
            showDelete: true
        });

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(expandedRow, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(expandedRow)).toBeTruthy();
    });

    it("stateful: should genereate delete button without confirmation when confirmDelete not provided", function () {
        var component = getComponent({
            defaultToExpanded: true,
            showDelete: true,
            controlled: false
        });

        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(expandedRow, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(expandedRow)).toBeTruthy();
    });

    it("stateful: should show delete confirm dialog", function () {
        var component = getComponent({
            controlled: false,
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: true
        });

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeFalsy();

        var deleteBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");

        ReactTestUtils.Simulate.click(deleteBtn);

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();
    });

    it("stateful: should hide delete confirm dialog", function () {
        var component = getComponent({
            controlled: false,
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: true,
            showDeleteConfirm: true
        });

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeTruthy();

        component.refs.StatefulExpandableRow._hideDeleteConfirm();

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        expect(deleteConfirmDialog).toBeFalsy();
    });

    it("stateful: should trigger onDelete callback on click confirm-delete", function () {
        var component = getComponent({
            controlled: false,
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: true,
            showDeleteConfirm: true,
            onDelete: jest.genMockFunction()
        });

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        var deleteConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(deleteConfirmDialog, "confirm-delete");

        ReactTestUtils.Simulate.click(deleteConfirmBtn);

        expect(component.props.onDelete).toBeCalled();
    });

    it("stateful: should trigger onDelete callback when confirmDelete is false", function () {
        var component = getComponent({
            controlled: false,
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: false,
            showDeleteConfirm: true,
            onDelete: jest.genMockFunction()
        });

        var deleteBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");

        ReactTestUtils.Simulate.click(deleteBtn);

        expect(component.props.onDelete).toBeCalled();
    });

    it("stateless: renders the status as good", function () {
        var component = getComponent( { status: ExpandableRow.Statuses.GOOD } );
        var status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        expect(status.getAttribute("class")).toContain(ExpandableRow.Statuses.GOOD);
    });

    it("stateless: renders the status as error", function () {
        var component = getComponent( { status: ExpandableRow.Statuses.ERROR } );
        var status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        expect(status.getAttribute("class")).toContain(ExpandableRow.Statuses.ERROR);
    });

    it("stateless: should trigger onEditButtonClick callback on edit-btn click", function () {
        var component = getComponent( { expanded: true, showEdit: true, onEditButtonClick: jest.genMockFunction() } );

        var editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.onEditButtonClick).toBeCalled();
    });

    it("stateful: should trigger onEditButtonClick callback on edit-btn click", function () {
        var component = getComponent({
            controlled: false,
            defaultToExpanded: true,
            showEdit: true,
            onEditButtonClick: jest.genMockFunction()
        });

        var editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.onEditButtonClick).toBeCalled();
    });

    //TODO: remove when v1 no longer supported
    it("logs warning when id prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ id: "myRow" });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs wanring when defaultToExpanded prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ defaultToExpanded: true });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use expanded instead of defaultToExpanded. " +
            "Support for defaultToExpanded will be removed in next version");
    });
});
