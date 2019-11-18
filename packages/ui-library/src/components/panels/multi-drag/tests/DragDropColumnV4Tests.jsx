window.__DEV__ = true;

jest.dontMock("../DragDropColumn");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");
jest.mock("popper.js");
jest.mock("react-portal");

import React from "react";
import ReactDOM from "react-dom";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import TestUtils from "../../../../testutil/TestUtils";
import ReactTestUtils from "react-dom/test-utils";
import ReduxTestUtils from "../../../../util/ReduxTestUtils";
import DragDropColumn from "../DragDropColumn";
import DragDrop from "../../../rows/DragDrop";
import _ from "underscore";
import TestBackend from "react-dnd-test-backend";
import { DragDropContext } from "react-dnd";

describe("DragDropColumn v4", function () {

    //this is set for each component in wrapInTestContext ref. Keeps from chaning all of the string refs
    let thisComponent;

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

        const WrappedComponent = wrapInTestContext(DragDropColumn);
        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...opts} >Content</WrappedComponent>);
    }

    function getWrappedComponent (opts) {
        opts = getOpts(opts);

        const WrappedComponent = wrapInTestContext(DragDropColumn);
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={WrappedComponent} opts={opts} />);
    }

    beforeEach(function () {
        thisComponent = null;
    });

    it("data-id's don't change", () => {
        const WithContext = DragDropContext(TestBackend)(() => (
            <DragDropColumn
                onDrag={jest.fn()}
                onDrop={jest.fn()}
                onCancel={jest.fn()}
                onSearch={jest.fn()}
                onScrolledToTop={jest.fn()}
                onScrolledToBottom={jest.fn()}

                contentType={<div />}
                helpText="PLEASE HELP I AM LOST"
                name={"Available Rows"}
                index={0}
                rows={[{ id: 1, n: 1 }, { id: 2, n: 2 }]}

            />
        ));
        mountSnapshotDataIds(
            <WithContext />
        );
    });

    it("renders with default data-id", function () {
        getWrappedComponent();
        const component = thisComponent;

        const dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "drag-drop-column");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given data-id", function () {
        getWrappedComponent({ "data-id": "myDragDropColumn" });
        const component = thisComponent;

        const dragDropColumn = TestUtils.findRenderedDOMNodeWithDataId(component, "myDragDropColumn");

        expect(dragDropColumn).toBeDefined();
    });

    it("renders with given className", function () {
        getWrappedComponent({ className: "myDragDropColumnClass" });
        const component = thisComponent;

        const dragDropColumn = TestUtils.findRenderedDOMNodeWithClass(component, "myDragDropColumnClass");

        expect(dragDropColumn).toBeDefined();
    });

    it("Renders drop target when no rows", function () {
        getWrappedComponent({ rows: [] });
        const component = thisComponent;

        expect(TestUtils.findRenderedDOMNodeWithDataId(component, "empty-placeholder")).toBeTruthy();
    });



    it("renders ghost row", function () {
        getWrappedComponent({ ghostRowAt: 1 });
        const component = thisComponent;

        //find all the rendered drag drop rows
        const rows = ReactDOM.findDOMNode(component).getElementsByClassName("drag-drop-item");

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

        const root = getComponent({ onDrag: callback });

        const backend = root.getManager().getBackend();
        const dropzone = ReactTestUtils.scryRenderedComponentsWithType(root, DragDrop)[0];
        const draggable = dropzone.decoratedComponentInstance;

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

        const root = getComponent({ onDrag: callback, disableSort: true });

        const backend = root.getManager().getBackend();
        const dropzone = ReactTestUtils.scryRenderedComponentsWithType(root, DragDrop)[0];
        const draggable = dropzone.decoratedComponentInstance;

        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateHover([dropzone.getHandlerId()], mockOffset);
        backend.simulateDrop();
        expect(callback).not.toBeCalled();
    });

    it("renders the column title helphint", () => {
        const dataId = "testdataid";
        const name = "Test column name";
        const helpText = "Test help text!";

        getWrappedComponent({
            "data-id": dataId,
            helpText: helpText,
            name: name,
        });

        const component = thisComponent;

        const helpHintElement = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-helphint`);
        expect(helpHintElement).toBeTruthy();

        const helpHintTarget = TestUtils.findRenderedDOMNodeWithDataId(component, `${dataId}-helphint-target`);
        expect(helpHintTarget.className).toContain("row-selector__column-helptext inline");

        const helpHintText = TestUtils.findRenderedDOMNodeWithDataId(helpHintElement, "tooltip");
        expect(helpHintText.textContent).toEqual(helpText);
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
        const component = thisComponent;
        const itemNode = ReactDOM.findDOMNode(component.refs.items);

        //have to extend this because jsdom doesn't allow to set scrollTop etc
        const items = _.extend({}, itemNode);

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
        // we're overshooting because it seems like in practice, that can happen
        items.scrollTop = 105;
        items.scrollHeight = 200;

        component._handleScroll();
        expect(component.props.onScrolledToTop).not.toBeCalled();
        expect(component.props.onScrolledToBottom).toBeCalled();
        //clear the mock
        component.props.onScrolledToBottom.mockClear();

        //set up the node to look like it's scrolling back up
        items.scrollTop = 100;
        items.scrollHeight = 200;

        component._handleScroll();
        expect(component.props.onScrolledToBottom).not.toBeCalled();

        jest.restoreAllMocks();
    });
    // *** Make sure the above test is always last because of the mock findDOMNode ***

});
