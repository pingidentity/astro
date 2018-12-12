window.__DEV__ = true;

jest.dontMock("../ExpandableRow");
jest.dontMock("../../../tooltips/DetailsTooltip");
jest.dontMock("../../../tooltips/HelpHint");

describe("ExpandableRow", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        KeyboardUtils = require("../../../../util/KeyboardUtils"),
        Utils = require("../../../../util/Utils"),
        ExpandableRow = require("../ExpandableRow"),
        DragDrop = require("../../DragDrop"),
        HelpHint = require("../../../tooltips/HelpHint"),
        DragDropContext = require("react-dnd").DragDropContext,
        _ = require("underscore"),
        TestBackend = require("react-dnd-test-backend");

    function wrapInTestContext(Component) {
        return DragDropContext(TestBackend)(
            class extends React.Component {
                render() {
                    return <Component {...this.props} />;
                }
            }
        );
    }

    function getComponent(opts) {
        opts = _.defaults(opts || {}, {
            stateless: true,
            title: <div>Test Title</div>,
            subtitle: <div>Test Subtitle</div>,
            content: <div data-id="content">Test Content</div>,
            onToggle: jest.fn()
        });

        const WrappedComponent = opts.ordering ? wrapInTestContext(ExpandableRow) : ExpandableRow;

        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...opts} />);
    }

    function getTwoComponents(opts, opts2) {
        const defaults = {
            stateless: true,
            title: <div>Test Title</div>,
            subtitle: <div>Test Subtitle</div>,
            content: <div data-id="content">Test Content</div>,
            onToggle: jest.fn()
        };
        opts = _.defaults(opts || {}, defaults);
        opts2 = _.defaults(opts2 || {}, defaults);

        const DoubleComponent = () => (
            <div>
                <ExpandableRow {...opts} />
                <ExpandableRow {...opts2} />
            </div>
        );
        const WrappedComponent = wrapInTestContext(DoubleComponent);

        return ReactTestUtils.renderIntoDocument(<WrappedComponent />);
    }

    function getContainer(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");
    }

    function getExpandButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "expand-btn");
    }

    function getEditButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");
    }

    function getDeleteButton(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");
    }

    function getOrderingInput(component) {
        return TestUtils.findRenderedDOMNodeWithDataId(component, "ordering-input");
    }

    it("renders with default data-id", function() {
        var component = getComponent();

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(row).toBeDefined();
    });

    it("renders with given data-id", function() {
        var component = getComponent({ "data-id": "myRow" });

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("renders with given id", function() {
        var component = getComponent({ id: "myRow" });

        var row = TestUtils.findRenderedDOMNodeWithDataId(component, "myRow");

        expect(row).toBeDefined();
    });

    it("renders the row message if provided", function() {
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

    it("renders the custom delete tooltip content when provided", function() {
        var deleteTtText = "My custom content";
        var deleteTtClass = "my-delete-tt";
        var deleteTtContent = <div className={deleteTtClass}>{deleteTtText}</div>;
        var component = getComponent({
            confirmDeleteContent: deleteTtContent,
            expanded: true,
            showDeleteConfirm: true
        });
        var ttContent = ReactTestUtils.findRenderedDOMComponentWithClass(component, deleteTtClass);

        expect(ttContent).toBeDefined();
        expect(ttContent.textContent).toEqual(deleteTtText);
    });

    it("renders the custom delete tooltip content with custom title when provided", function() {
        var deleteTitle = "Custom delete title";
        var deleteTitleClass = "details-title";
        var deleteTitleText = "My custom content";
        var deleteTitleContent = <div>{deleteTitleText}</div>;
        var component = getComponent({
            confirmDeleteContent: deleteTitleContent,
            expanded: true,
            showDeleteConfirm: true,
            confirmDeleteTitle: deleteTitle
        });

        var deleteTitleTooltip = ReactTestUtils.findRenderedDOMComponentWithClass(component, deleteTitleClass);

        expect(deleteTitleTooltip).toBeDefined();
        expect(deleteTitleTooltip.textContent).toEqual(deleteTitle);
    });

    it("stateless: renders component as collapsed (by default)", function() {
        var component = getComponent();
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeFalsy();
    });

    it("stateless: no toggle callback", function() {
        var component = getComponent({ onToggle: undefined });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        //as long as no exception is thrown, the test will pass
    });

    it("stateless: renders the expand button", function() {
        var component = getComponent();
        var expandButton = getExpandButton(component);

        expect(ReactTestUtils.isDOMComponent(expandButton)).toBeTruthy();
    });

    it("stateless: renders the edit button by default", function() {
        var component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeTruthy();
    });

    it("stateless: renders custom edit button", function() {
        var component = getComponent({
            expanded: true,
            editButton: <div data-id="custom-edit-button">Click me</div>
        });

        var customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-edit-button");

        expect(ReactTestUtils.isDOMComponent(getEditButton(component))).toBeFalsy();
        expect(customButton.textContent).toBe("Click me");
    });

    it("stateless: renders custom className", function() {
        var component = getComponent({
            expanded: true,
            className: "extra"
        });

        expect(getContainer(component).getAttribute("class")).toContain("extra");
    });

    it("stateless: renders the delete button by default", function() {
        var component = getComponent({ expanded: true });

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeTruthy();
    });

    it("stateless: renders row without delete button when showDelete prop is set to false", function() {
        var component = getComponent({ expanded: true, showDelete: false });

        // check css on row
        expect(getContainer(component).className).toContain("no-delete");

        // make sure delete button not rendered
        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
    });

    it("stateless: passes non-hash path", function() {
        var component = getComponent({
            expanded: true,
            editViewRoute: "/my/route"
        });

        var editButton = getEditButton(component);

        expect(editButton.getAttribute("href")).toEqual("/my/route");
    });

    it("stateless: renders the specified delete button", function() {
        var component = getComponent({
            expanded: true,
            deleteButton: <div data-id="custom-delete-button">Delete Me</div>
        });

        var customButton = TestUtils.findRenderedDOMNodeWithDataId(component, "custom-delete-button");

        expect(ReactTestUtils.isDOMComponent(getDeleteButton(component))).toBeFalsy();
        expect(customButton.textContent).toEqual("Delete Me");
    });

    it("stateless: calls onToggle when expanded", function() {
        var component = getComponent({ expanded: true });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.onToggle).lastCalledWith(true);
    });

    it("stateless: calls onToggle when collapsed", function() {
        var component = getComponent();
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
        expect(component.props.onToggle).lastCalledWith(false);
    });

    it("stateless: no exception is thrown when onToggle is null", function() {
        var component = getComponent({ stateless: false, onToggle: null });
        var expandButton = getExpandButton(component);

        ReactTestUtils.Simulate.click(expandButton);
    });

    it("stateful: expands when clicking on the expand icon and collapses when clicked on again", function() {
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

    it("stateful: renders the row as expanded if expanded prop is set to true", function() {
        var component = getComponent({ stateless: false, expanded: true });
        var expandedRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expanded-row");
        var content = TestUtils.findRenderedDOMNodeWithDataId(component, "content");

        expect(ReactTestUtils.isDOMComponent(expandedRow)).toBeTruthy();
        expect(ReactTestUtils.isDOMComponent(content)).toBeTruthy();
    });

    it("stateless: renders the view icon when isEditEnabled prop is set to false", function() {
        var component = getComponent({ expanded: true, isEditEnabled: false });
        var viewButton = TestUtils.findRenderedDOMNodeWithDataId(component, "edit-btn");

        expect(viewButton.className).toEqual("view-btn");
    });

    it("stateless: renders an empty disabled button when showEdit prop is set to false", function() {
        var component = getComponent({ expanded: true, showEdit: false });
        var expandableRow = TestUtils.findRenderedDOMNodeWithDataId(component, "expandable-row");

        expect(expandableRow.className).toContain("no-edit");
    });

    it("stateless: renders the content when passed in as a children instead of a prop", function() {
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

    it("stateless: renders the right-side/row-accessories content", function() {
        var linkText = "Control Link",
            rowAccessoriesLink = <a className="control-link">{linkText}</a>,
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
    it("stateless: renders the right-side/row-accessories help hint", function() {
        var // helpText = "I need help",
            labelText = "Help, I need somebody",
            rowAccessoriesHelp = (
                <HelpHint data-id="help-me" className="width-auto bottom" hintText="I need help">
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

    it("stateless: renders a row image when provided", function() {
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

    it("stateless: renders a row icon when provided", function() {
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

    it("stateless: should genereate delete button with confirmation when confirmDelete provided", function() {
        var component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });

    it("stateful: should genereate delete button with confirmation when confirmDelete provided", function() {
        var component = getComponent({
            expanded: true,
            showDelete: true,
            confirmDelete: true,
            stateless: false
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeTruthy();
        expect(getDeleteButton(component)).toBeNull();
    });

    it("stateless: should genereate delete button without confirmation when confirmDelete not provided", function() {
        var component = getComponent({
            expanded: true,
            showDelete: true
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should genereate delete button without confirmation when confirmDelete not provided", function() {
        var component = getComponent({
            expanded: true,
            showDelete: true,
            stateless: false
        });

        var deleteConfirm = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn-confirm");
        expect(deleteConfirm).toBeNull();
        expect(getDeleteButton(component)).toBeTruthy();
    });

    it("stateful: should show delete confirm dialog", function() {
        var component = getComponent({
            stateless: false,
            expanded: true,
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

    it("stateful: should hide delete confirm dialog", function() {
        var component = getComponent({
            stateless: false,
            expanded: true,
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

    it("stateful: should trigger onDelete callback on click confirm-delete", function() {
        let onDelete = jest.fn();

        var component = getComponent({
            stateless: false,
            expanded: true,
            showDelete: true,
            confirmDelete: true,
            showDeleteConfirm: true,
            onDelete: onDelete
        });

        var deleteConfirmDialog = TestUtils.findRenderedDOMNodeWithDataId(component, "details-content");
        var deleteConfirmBtn = TestUtils.findRenderedDOMNodeWithDataId(deleteConfirmDialog, "confirm-delete");

        ReactTestUtils.Simulate.click(deleteConfirmBtn);

        expect(component.props.onDelete).toBeCalled();
    });

    it("stateful: should trigger onDelete callback when confirmDelete is false", function() {
        var component = getComponent({
            stateless: false,
            expanded: true,
            showDelete: true,
            confirmDelete: false,
            showDeleteConfirm: true,
            onDelete: jest.fn()
        });

        var deleteBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "delete-btn");

        ReactTestUtils.Simulate.click(deleteBtn);

        expect(component.props.onDelete).toBeCalled();
    });

    it("stateless: renders the status as good", function() {
        var component = getComponent({ status: ExpandableRow.Statuses.GOOD });
        var status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        expect(status.getAttribute("class")).toContain(ExpandableRow.Statuses.GOOD);
    });

    it("stateless: renders the status as error", function() {
        var component = getComponent({ status: ExpandableRow.Statuses.ERROR });
        var status = TestUtils.findRenderedDOMNodeWithDataId(component, "status");
        expect(status.getAttribute("class")).toContain(ExpandableRow.Statuses.ERROR);
    });

    it("stateless: should trigger onEditButtonClick callback on edit-btn click", function() {
        var component = getComponent({ expanded: true, showEdit: true, onEditButtonClick: jest.fn() });

        var editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.onEditButtonClick).toBeCalled();
    });

    it("stateful: should trigger onEditButtonClick callback on edit-btn click", function() {
        var component = getComponent({
            stateless: false,
            expanded: true,
            showEdit: true,
            onEditButtonClick: jest.fn()
        });

        var editButton = getEditButton(component);

        ReactTestUtils.Simulate.click(editButton);

        expect(component.props.onEditButtonClick).toBeCalled();
    });

    it("throws error when deprecated prop 'controlled' is passed in", function() {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function() {
            getComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'defaultToExpanded' is passed in", function() {
        var expectedError = new Error(Utils.deprecatePropError("defaultToExpanded", "expanded"));

        expect(function() {
            getComponent({ defaultToExpanded: true });
        }).toThrow(expectedError);
    });

    it("fires reorder event from input when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({
            stateless: false,
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.click(orderingInput);
        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "5" } });
        // the displayed value is one more than the actual value so that the
        // first record can be shown as 1
        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        expect(callback).lastCalledWith(3, 4);

        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "-1" } });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ENTER });
        expect(callback).lastCalledWith(3, 0);

        ReactTestUtils.Simulate.change(orderingInput, { target: { value: "11" } });
        ReactTestUtils.Simulate.blur(orderingInput);
        expect(callback).lastCalledWith(3, 10);
    });

    it("fires reorder event from up/down keys when in ordering mode", function() {
        const callback = jest.fn();
        let component = getComponent({
            stateless: false,
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        let orderingInput = getOrderingInput(component);

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        expect(callback).lastCalledWith(3, 5);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        expect(callback).lastCalledWith(3, 2);

        // lower bound
        component = getComponent({
            stateless: false,
            ordering: {
                position: 0,
                total: 10,
                onReorder: callback
            }
        });
        orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_DOWN });
        expect(callback).lastCalledWith(0, 0);

        // upper bound
        component = getComponent({
            stateless: false,
            ordering: {
                position: 9,
                total: 10,
                onReorder: callback
            }
        });
        orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: KeyboardUtils.KeyCodes.ARROW_UP });
        expect(callback).lastCalledWith(9, 10);
    });

    it("fires no events from other keys when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({
            stateless: false,
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 6 });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 100 });
        ReactTestUtils.Simulate.keyDown(orderingInput, { keyCode: 150 });
        expect(callback).not.toBeCalled();
    });

    it("calls drag handler for input when in ordering mode", function() {
        const callback = jest.fn();
        const component = getComponent({
            stateless: false,
            ordering: {
                position: 3,
                total: 10,
                onReorder: callback
            }
        });
        const orderingInput = getOrderingInput(component);

        ReactTestUtils.Simulate.dragStart(orderingInput);
    });

    it("calls onReorder callback when dropping", function() {
        const callback = jest.fn();
        const root = getTwoComponents(
            {
                stateless: false,
                ordering: {
                    position: 3,
                    total: 10,
                    onReorder: callback
                }
            },
            {
                stateless: false,
                ordering: {
                    position: 6,
                    total: 10,
                    onReorder: callback
                }
            }
        );

        var mockOffset = {
            clientOffset: { x: 0, y: 0 },
            getSourceClientOffset: function() {
                return { x: 0, y: 0 };
            }
        };

        const backend = root.getManager().getBackend();

        const components = TestUtils.scryRenderedComponentsWithType(root, DragDrop);

        // first drop on itself
        backend.simulateBeginDrag([components[0].getDecoratedComponentInstance().getHandlerId()], mockOffset);
        backend.simulateHover([components[0].getHandlerId()], mockOffset);
        backend.simulateDrop();
        backend.simulateEndDrag();

        // now drop on the other one
        backend.simulateBeginDrag([components[0].getDecoratedComponentInstance().getHandlerId()], mockOffset);
        backend.simulateHover([components[1].getHandlerId()], mockOffset);

        expect(callback).not.toBeCalled();
        backend.simulateDrop();

        expect(callback).toBeCalled();
    });

});
