window.__DEV__ = true;

jest.dontMock("../MultiDrag");
jest.dontMock("../DragDropColumn");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("MultiDrag", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        Utils = require("../../../../util/Utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        MultiDrag = require("../MultiDrag"),
        _ = require("underscore"),
        TestBackend = require("react-dnd-test-backend"),
        DragDropContext = require("react-dnd").DragDropContext;

    var thisComponent;

    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)( class extends React.Component {
            render() {
                return <Component {...this.props} ref={c => thisComponent = c}/>;
            }
        });
    }

    var availableRows = [{ id: 1, n: 1 }, { id: 2, n: 2 }],
        addedRows = [{ id: 3, n: 3 }, { id: 4, n: 4 }];

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            stateless: true,
            onSearch: jest.genMockFunction(),
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            categoryList: ["One", "Two"],
            columns: [
                { name: "Available Rows", id: 1, rows: availableRows, filteredRows: availableRows,
                    showCategoryList: true },
                { name: "Added Rows", id: 2, rows: addedRows, filteredRows: addedRows }
            ]
        });

        var WrappedComponent = wrapInTestContext(MultiDrag);
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={WrappedComponent} opts={opts} />);
    }

    beforeEach(function () {
        thisComponent = null;
    });

    function getDesc (fromC, fromI, toC, toI) {
        return {
            from: { column: fromC, index: fromI },
            to: { column: toC, index: toI }
        };
    }

    it("renders with default data-id", function () {
        getWrappedComponent();
        var component = thisComponent;

        var multiDrag = TestUtils.findRenderedDOMNodeWithDataId(component, "multi-drag");

        expect(multiDrag).toBeTruthy();
    });

    it("renders with given data-id", function () {
        getWrappedComponent({
            "data-id": "myMultiDrag",
            strings: {
                defaultCategoryOption: "Everything",
                filteredByLabel: "but only this"
            }
        });
        var component = thisComponent;

        var multiDrag = TestUtils.findRenderedDOMNodeWithDataId(component, "myMultiDrag");

        expect(multiDrag).toBeTruthy();
    });

    it("renders with given className", function () {
        getWrappedComponent({ className: "myMultiDragClass" });
        var component = thisComponent;

        var multiDrag = TestUtils.findRenderedDOMNodeWithClass(component, "myMultiDragClass");

        expect(multiDrag).toBeTruthy();
    });

    it("cancels drag while invalid", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        componentRef._onDrag(1, 1, 0, 0);
        expect(component.props.onDrag).not.toBeCalled();

        componentRef._onCancel();
        expect(component.props.onDrop).not.toBeCalled();
        expect(component.props.onCancel).toBeCalled();
    });

    it("_onDrop is a noop", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        componentRef._onDrop();
        expect(component.props.onDrop).not.toBeCalled();
    });

    it("blocks moving item to same location", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        componentRef._onDrag(1, 1, 0, 0);
        expect(component.props.onDrag).not.toBeCalled();
        var componentRef = component.refs.MultiDragStateless;

        componentRef._onDrag(1, 1, 1, 1);
        expect(component.props.onDrag).not.toBeCalled();
    });

    it("drags item 1 from first column to second", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        componentRef._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).lastCalledWith(getDesc(0, 0, 1, 0));
    });

    it("avoids redundant calls to onDrag", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        //the first call execs the callback
        componentRef._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
        component.props.onDrag.mockClear();

        //calling with the same arguments does nothing
        componentRef._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).not.toBeCalled();

        //calling with new args will exec callback
        componentRef._onDrag(1, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
    });

    it("clears cached move on drag end", function () {
        getWrappedComponent();
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateless;

        //the first call execs the callback
        componentRef._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
        expect(componentRef._lastDrag).toEqual(getDesc(0, 0, 1, 0));

        componentRef._onCancel();
        expect(componentRef._lastDrag).toBe(null);
    });

    it("stateful: renders", function () {
        getWrappedComponent({ stateless: false });
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateful;

        expect(componentRef).toBeTruthy();
    });

    it("stateful: _handleSearch callback triggers onSearch callback", function () {
        getWrappedComponent({ stateless: false });
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateful;

        componentRef._handleSearch(0, "filter");

        expect(component.props.onSearch).toBeCalledWith(0, "filter");
    });

    it("stateful: _handleCancel callback triggers onCancel callback and clears placeholder", function () {
        getWrappedComponent({ stateless: false });
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateful;

        componentRef._handleCancel();

        expect(component.props.onCancel).toBeCalled();
        expect(componentRef.state.placeholder).toBeNull();
    });

    it("stateful: _handleDrop callback triggers onDrop callback", function () {
        getWrappedComponent({ stateless: false });
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateful;

        var desc = { from: { column: 0, index: 0 }, to: { column: 0, index: 0 } };
        componentRef._handleDrop(desc);

        expect(component.props.onDrop).toBeCalledWith(desc);
    });

    it("stateful: _handleDrag callback triggers onDrag callback and sets placeholder at destination", function () {
        getWrappedComponent({ stateless: false, showSearch: true });
        var component = thisComponent;
        var componentRef = component.refs.MultiDragStateful;

        var desc = { from: { column: 0, index: 0 }, to: { column: 0, index: 0 } };
        componentRef._handleDrag(desc);

        expect(component.props.onDrag).toBeCalledWith(desc);
        expect(componentRef.state.placeholder).toBe(desc.to);
    });

    describe("convertFilteredIndexes", function () {
        var rows1 = [{ id: 1, n: 1 }, { id: 2, n: 2 }];
        var rows2 = [{ id: 3, n: 3 }, { id: 4, n: 4 }];

        it("converts when dragging from filtered column", function () {
            var columns = [
                { name: "Row 1", id: 1, rows: rows1, filter: "2", filteredRows: [rows1[1]] },
                { name: "Row 2", id: 2, rows: rows2, filter: "", filteredRows: rows2 }
            ];

            //convert drag from column 0 first filtered item to column 0 2nd unfiltered item
            var convertedIndexes = MultiDrag.convertFilteredIndexes(columns, {
                from: { column: 0, index: 0 },
                to: { column: 1, index: 1 }
            });
            expect(convertedIndexes).toEqual({ from: 1, to: 1 });
        });

        it("converts when dragging to filtered column", function () {
            var columns = [
                { name: "Row 1", id: 1, rows: rows1, filter: "", filteredRows: rows1 },
                { name: "Row 2", id: 2, rows: rows2, filter: "4", filteredRows: [rows2[1]] }
            ];

            //convert column 1 filtered first item to column 1 second unfiltered item
            var convertedIndexes = MultiDrag.convertFilteredIndexes(columns, {
                from: { column: 0, index: 0 },
                to: { column: 1, index: 0 }
            });
            expect(convertedIndexes).toEqual({ from: 0, to: 1 });
        });

        it("converts when dragging between filtered columns", function () {
            var columns = [
                { name: "Row 1", id: 1, rows: rows1, filter: "2", filteredRows: [rows1[1]] },
                { name: "Row 2", id: 2, rows: rows2, filter: "4", filteredRows: [rows2[1]] }
            ];

            //convert column 0 filtered first item to column 0 second unfiltered item
            //convert column 1 filtered first item to column 1 second unfiltered item
            var convertedIndexes = MultiDrag.convertFilteredIndexes(columns, {
                from: { column: 0, index: 0 },
                to: { column: 1, index: 0 }
            });
            expect(convertedIndexes).toEqual({ from: 1, to: 1 });
        });

        it("appends row to end of unfilterd list when dragged to end of filtered list", function () {
            var columns = [
                { name: "Row 1", id: 1, rows: rows1, filter: "", filteredRows: rows1 },
                { name: "Row 2", id: 2, rows: rows2, filter: "4", filteredRows: [rows2[1]] }
            ];

            //convert column 0 filtered first item to column 0 second unfiltered item
            var convertedIndexes = MultiDrag.convertFilteredIndexes(columns, {
                from: { column: 0, index: 1 },
                to: { column: 1, index: 1 }
            });
            expect(convertedIndexes).toEqual({ from: 1, to: 2 });
        });
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless"));

        expect(function () {
            getWrappedComponent({ controlled: true });
        }).toThrow(expectedError);
    });

    it("doesn't trigger category toggle event for stateful component", function () {
        const callback = jest.genMockFunction();

        const component = getWrappedComponent({
            stateless: false,
            categoryList: ["One", "Two"],
            onCategoryToggle: callback,
        });

        const categoryToggle = TestUtils.findRenderedDOMNodeWithDataId(
            component,
            "link-dropdown-list-label"
        );
        const categoryOption = TestUtils.scryRenderedDOMNodesWithClass(component, "select-option")[0];

        ReactTestUtils.Simulate.click(categoryToggle);
        expect(callback).not.toBeCalled();

        ReactTestUtils.Simulate.click(categoryOption);
    });

    it("triggers category click event", function () {
        const callback = jest.genMockFunction();

        const component = getWrappedComponent({
            stateless: false,
            categoryList: ["One", "Two"],
            onCategoryClick: callback,
        });

        const categoryOption = TestUtils.scryRenderedDOMNodesWithClass(component, "select-option")[0];

        ReactTestUtils.Simulate.click(categoryOption);
        expect(callback).toBeCalled();
    });
});
