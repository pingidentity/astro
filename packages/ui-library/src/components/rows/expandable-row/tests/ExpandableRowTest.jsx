window.__DEV__ = true;

jest.dontMock("../ExpandableRow.jsx");
jest.dontMock("../../../tooltips/DetailsTooltip.jsx");
jest.dontMock("../../../tooltips/HelpHint.jsx");

describe("ExpandableRow", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        ExpandableRow = require("../ExpandableRow.jsx"),
        HelpHint = require("../../../tooltips/HelpHint.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            stateless: true,
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

    it("renders the row message if provided", function () {
        var rowMessageObj = {
                text: "The row message appears at the top of the expanded row only when the row is expanded.",
                type: ExpandableRow.RowMessageTypes.WARNING
            },
            component = getComponent({ rowMessage: rowMessageObj, expanded: true });

        var rowMessage = TestUtils.findRenderedDOMNodeWithDataId(component, "item-message");

        expect(rowMessage).toBeDefined();
        expect(rowMessage.getAttribute("class")).toContain(rowMessageObj.type);
        expect(rowMessage.textContent).toContain(rowMessageObj.text);
    });

    it("renders the custom delete tooltip content when provided", function () {
        var deleteTtText = "My custom content";
        var deleteTtClass = "my-delete-tt";
        var deleteTtContent = (
            <div className={deleteTtClass}>
                {deleteTtText}
            </div>
        );
        var component = getComponent({
            confirmDeleteContent: deleteTtContent,
            expanded: true,
            showDeleteConfirm: true
        });
        var ttContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, deleteTtClass);

        expect(ttContent).toBeDefined();
        expect(ttContent.textContent).toEqual(deleteTtText);
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
        var component = getComponent({ stateless: false, onToggle: null });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
    });

    it("stateful: expands when clicking on the expand icon and collapses when clicked on again", function () {
        var component = getComponent({ stateless: false });
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
        var component = getComponent({ stateless: false, defaultToExpanded: true });
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

    /*
    TODO: fix this test
    NOTE: Currently we've not been able to test the react-tooltip helpHint in it's shown state. Since the React Tooltip
    does not populate its content until it is displayed, the content of the tooltip cannot yet be tested.
    */
    it("stateless: renders the right-side/row-accessories help hint", function () {
        var
            // helpText = "I need help",
            labelText = "Help, I need somebody",
            rowAccessoriesHelp = (
                <HelpHint
                    data-id="help-me"
                    className="width-auto bottom"
                    hintText="I need help">
                    <label className="row-help">Help, I need somebody</label>
                </HelpHint>
            ),
            rowAccessories,
            rowAccessoriesHelpElement,
            // rowAccessoriesHelpContent,
            rowAccessoriesLabelContent;

        var component = getComponent({ rowAccessories: rowAccessoriesHelp });

        rowAccessories = TestUtils.findRenderedDOMNodeWithDataId(component, "row-accessories");
        expect(rowAccessories).toBeTruthy();

        rowAccessoriesHelpElement = TestUtils.findRenderedDOMNodeWithDataId(component, "help-me");
        expect(rowAccessoriesHelpElement).toBeDefined();

        // rowAccessoriesHelpContent = TestUtils.findRenderedDOMNodeWithClass(component, "tooltip-text-content");
        // expect(rowAccessoriesHelpContent).toBeTruthy();

        // expect(rowAccessoriesHelpContent.textContent).toEqual(helpText);

        rowAccessoriesLabelContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, "row-help");
        expect(rowAccessoriesLabelContent).toBeTruthy();

        expect(rowAccessoriesLabelContent.textContent).toEqual(labelText);
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

    it("stateless: renders a row icon when provided", function () {
        var iconType = "icon-cog",
            component,
            iconContent;

        // test without icon
        component = getComponent();
        iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-icon");
        expect(iconContent.length).toEqual(0);

        // test with icon
        component = getComponent({ icon: iconType });
        iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "item-icon");
        expect(iconContent.length).toEqual(1);

        iconContent = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon-cog");
        expect(iconContent.length).toEqual(1);
    });



    it("stateless: should genereate delete button with confirmation when confirmDelete provided", function () {
        var component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });



    it("stateful: should genereate delete button with confirmation when confirmDelete provided", function () {
        var component = getComponent({
            defaultToExpanded: true,
            showDelete: true,
            confirmDelete: true,
            stateless: false
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });

    it("stateless: should genereate delete button without confirmation when confirmDelete not provided", function () {
        var component = getComponent({
            expanded: true,
            showDelete: true
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should genereate delete button without confirmation when confirmDelete not provided", function () {
        var component = getComponent({
            defaultToExpanded: true,
            showDelete: true,
            stateless: false
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should show delete confirm dialog", function () {
        var component = getComponent({
            stateless: false,
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
            stateless: false,
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
            stateless: false,
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
            stateless: false,
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
            stateless: false,
            defaultToExpanded: true,
            showEdit: true,
            onEditButtonClick: jest.genMockFunction()
        });

        var editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.onEditButtonClick).toBeCalled();
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = ReactTestUtils.renderIntoDocument(<ExpandableRow controlled={false} />);
        var stateful = component.refs.StatefulExpandableRow;
        var stateless = component.refs.StatelessExpandableRow;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = ReactTestUtils.renderIntoDocument(<ExpandableRow controlled={true} />);
        stateful = component.refs.StatefulExpandableRow;
        stateless = component.refs.StatelessExpandableRow;

        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        getComponent();

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "Support for controlled will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("logs wanring when defaultToExpanded prop given", function () {
        console.warn = jest.genMockFunction();

        getComponent({ defaultToExpanded: true });

        expect(console.warn).toBeCalledWith(
            "Deprecated: use expanded instead of defaultToExpanded. " +
            "Support for defaultToExpanded will be removed in next version");
    });

    //TODO: remove when v1 no longer supported
    it("does not log warning for id, onChange or isRequired when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        getComponent({
            stateless: false,
            defaultToExpanded: true,
            showEdit: true,
            onEditButtonClick: jest.genMockFunction()
        });

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
