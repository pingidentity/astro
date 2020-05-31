window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

jest.dontMock("../DragDropColumn");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");
import { shallow } from "enzyme";

describe("DragDropColumn", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        TestUtils = require("../../../../testutil/TestUtils"),
        ReactTestUtils = require("react-dom/test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        DragDropColumn = require("../DragDropColumn"),
        DragDrop = require("../../../rows/DragDrop"),
        _ = require("underscore"),
        TestBackend = require("react-dnd-test-backend"),
        DragDropContext = require("react-dnd").DragDropContext;

    //this is set for each component in wrapInTestContext ref. Keeps from chaning all of the string refs
    var thisComponent;

    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)( class extends React.Component {
            render() {
                return <Component ref={(c) => thisComponent = c} {...this.props} />;
            }
        });
    }

    function getOpts (opts) {
        return _.defaults(opts || {}, {
            onDrag: jest.fn(),
            onDrop: jest.fn(),
            onCancel: jest.fn(),
            onSearch: jest.fn(),
            onScrolledToTop: jest.fn(),
            onScrolledToBottom: jest.fn(),

            contentType: <div />,
            name: "Available Rows",
            index: 0,
            rows: [{ id: 1, n: 1 }, { id: 2, n: 2 }],
        });
    }

    function getComponent (opts) {
        opts = getOpts(opts);

        var WrappedComponent = wrapInTestContext(DragDropColumn);
        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...opts} >Content</WrappedComponent>);
    }

    function getWrappedComponent (opts) {
        opts = getOpts(opts);

        var WrappedComponent = wrapInTestContext(DragDropColumn);
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={WrappedComponent} opts={opts} />);
    }

    beforeEach(function () {
        thisComponent = null;
    });

    it("renders with default data-id", function () {
        getWrappedComponent();
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-column");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given data-id", function () {
        getWrappedComponent({ "data-id": "myDragDropColumn" });
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "myDragDropColumn");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given className", function () {
        getWrappedComponent({ className: "myDragDropColumnClass" });
        var component = thisComponent;

        var dragDropColumn = TestUtils.findRenderedDOMNodeWithClass(component, "myDragDropColumnClass");

        expect(dragDropColumn).toBeDefined();
    });

    it("Renders drop target when no rows", function () {
        getWrappedComponent({ rows: [] });
        var component = thisComponent;

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "empty-placeholder")).toBeTruthy();
    });



    it("renders ghost row", function () {
        getWrappedComponent({ ghostRowAt: 1 });
        var component = thisComponent;

        //find all the rendered drag drop rows
        var rows = ReactDOM.findDOMNode(component).getElementsByClassName("drag-drop-item");

        expect(rows.length).toBe(3);

        //TODO: reactid is deprecated
        //expect(rows[1].getAttribute("data-reactid")).toContain("preview");
    });


    it("triggers correct category list events", function() {
        const toggleCallback = jest.fn();
        const clickCallback = jest.fn();

        const component = getWrappedComponent({
            categoryList: ["One", "Two"],
            showCategoryList: true,
            onCategoryToggle: toggleCallback,
            onCategoryClick: clickCallback,
        });

        const categoryToggle = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "link-dropdown-list-label"
        );
        const categoryOption = TestUtils.scryRenderedDOMNodesWithClass(component, "select-option")[0];

        expect(toggleCallback).not.toBeCalled();
        ReactTestUtils.Simulate.click(categoryToggle);
        expect(toggleCallback).toBeCalled();

        expect(clickCallback).not.toBeCalled();
        ReactTestUtils.Simulate.click(categoryOption);
        expect(clickCallback).toBeCalled();
    });

    it("triggers onDrag callback", function() {
        const callback = jest.fn();
        const mockOffset = {
            clientOffset: { x: 0, y: 0 },
            getSourceClientOffset: function () { return { x: 0, y: 0 }; }
        };

        var root = getComponent({ onDrag: callback });

        var backend = root.getManager().getBackend();
        var dropzone = ReactTestUtils.scryRenderedComponentsWithType(root, DragDrop)[0];
        var draggable = dropzone.decoratedComponentInstance;

        expect(callback).not.toBeCalled();
        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateHover([dropzone.getHandlerId()], mockOffset);
        backend.simulateDrop();
        expect(callback).toBeCalled();
    });

    it("doesn't trigger onDrag callback because sort is disabled", function() {
        const callback = jest.fn();
        const mockOffset = {
            clientOffset: { x: 0, y: 0 },
            getSourceClientOffset: function () { return { x: 0, y: 0 }; }
        };

        var root = getComponent({ onDrag: callback, disableSort: true });

        var backend = root.getManager().getBackend();
        var dropzone = ReactTestUtils.scryRenderedComponentsWithType(root, DragDrop)[0];
        var draggable = dropzone.decoratedComponentInstance;

        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateHover([dropzone.getHandlerId()], mockOffset);
        backend.simulateDrop();
        expect(callback).not.toBeCalled();
    });

    it("renders helpText when helpText prop is utilized", () => {
        const input = shallow (
            <DragDropColumn
                helpText="testing"
            />
        );
        expect(input.find("HelpHint").prop("hintText")).toEqual("testing");
        
    });

    it("accepts render prop as contentType with correct onAdd", () => {
        const onAdd = jest.fn();
        getWrappedComponent({
            contentType: props => props.onAdd(),
            onAdd
        });

        expect(onAdd).toHaveBeenCalled();
    });

    it("Executes scroll callbacks", function () {
        getWrappedComponent({ rows: [] });
        var component = thisComponent;
        var itemNode = ReactDOM.findDOMNode(component.refs.items);

        //have to extend this because jsdom doesn't allow to set scrollTop etc
        var items = _.extend({}, itemNode);

        //mocking find dom node in the function to return our new items instead
        ReactDOM.findDOMNode = jest.fn().mockReturnValue(items);
        items.getBoundingClientRect = jest.fn().mockReturnValue({
            height: 100
        });

        component._handleScroll();
        expect(component.props.onScrolledToTop).toBeCalled();
        expect(component.props.onScrolledToBottom).not.toBeCalled();
        //clear the mock
        component.props.onScrolledToTop.mockClear();

        //set up the node to look like it's scrolled to the bottom
        items.scrollTop = 100;
        items.scrollHeight = 200;

        component._handleScroll();
        expect(component.props.onScrolledToTop).not.toBeCalled();
        expect(component.props.onScrolledToBottom).toBeCalled();

        jest.restoreAllMocks();
    });
    // *** Make sure the above test is always last because of the mock findDOMNode ***

});
