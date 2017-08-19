window.__DEV__ = true;
jest.dontMock("../DragDrop.jsx");

describe("DragDrop", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        DragDrop = require("../DragDrop.jsx"),
        DragDropContext = require("react-dnd").DragDropContext,
        _ = require("underscore"),
        TestUtils = require("../../../testutil/TestUtils"),
        TestBackend = require("react-dnd-test-backend");


    function wrapInTestContext (Component) {
        return DragDropContext(TestBackend)(
            React.createClass({
                render: function () {
                    return <Component {...this.props} />;
                }
            })
          );
    }

    function getComponent (props) {
        props = _.defaults(props || {}, {
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            isDragging: false,
            id: 1,
            index: 1
        });

        var WrappedComponent = wrapInTestContext(DragDrop);
        return ReactTestUtils.renderIntoDocument(<WrappedComponent {...props} >Content</WrappedComponent>);
    }

    var genMockNode = function (x, y, width, height) {
        return {
            getBoundingClientRect: function () {
                return { top: y, left: x, right: x + width, bottom: y + height, height: height, width: width };
            }
        };
    };

    var genMockMonitor = function (offsetX, offsetY, item) {
        return {
            getClientOffset: function () {
                return { x: offsetX, y: offsetY };
            },
            getItem: function () {
                return item;
            }
        };
    };

    var genMockProps = function (id, index) {
        return {
            id: id,
            index: typeof(index) === "undefined" ? id : index,
            onDrag: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            onDrop: jest.genMockFunction()
        };
    };

    var mockOffset = {
        clientOffset: { x: 0, y: 0 },
        getSourceClientOffset: function () { return { x: 0, y: 0 }; }
    };

    it("rendered and calls onDrag callback", function () {
        var callback = jest.genMockFunction();
        var root = getComponent({ onDrag: callback });
        var backend = root.getManager().getBackend();
        var dropzone = ReactTestUtils.findRenderedComponentWithType(root, DragDrop);
        var draggable = dropzone.decoratedComponentInstance;

        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateHover([dropzone.getHandlerId()], mockOffset);
        backend.simulateDrop();

        expect(callback).toBeCalled();
    });

    it("calls onDrop callback", function () {
        var callback = jest.genMockFunction();
        var root = getComponent({ onDrop: callback, type: "column" });
        var backend = root.getManager().getBackend();
        var dropzone = ReactTestUtils.findRenderedComponentWithType(root, DragDrop);
        var draggable = dropzone.decoratedComponentInstance;

        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateHover([dropzone.getHandlerId()], mockOffset);
        backend.simulateDrop();

        expect(callback).toBeCalled();
    });

    it("calls onCancel callback", function () {
        var callback = jest.genMockFunction();
        var root = getComponent({ onCancel: callback });
        var backend = root.getManager().getBackend();
        var dropzone = ReactTestUtils.findRenderedComponentWithType(root, DragDrop);
        var draggable = dropzone.decoratedComponentInstance;

        backend.simulateBeginDrag([draggable.getHandlerId()], mockOffset);
        backend.simulateEndDrag();

        expect(callback).toBeCalled();
    });

    it("renders tagName as div by default", function () {
        var root = getComponent();
        var dropzone = ReactTestUtils.findRenderedComponentWithType(root, DragDrop);
        var draggable = dropzone.decoratedComponentInstance;
        var renderedChild = TestUtils.findRenderedDOMNodeWithDataId(draggable, "drag-drop-item");

        expect(renderedChild.tagName).toBe("DIV");

    });

    it("renders as specific tagName", function () {
        var root = getComponent({ tagName: "span" });
        var dropzone = ReactTestUtils.findRenderedComponentWithType(root, DragDrop);
        var draggable = dropzone.decoratedComponentInstance;
        var renderedChild = TestUtils.findRenderedDOMNodeWithDataId(draggable, "drag-drop-item");

        expect(renderedChild.tagName).toBe("SPAN");

    });



    //original tests

    it("Determines which half of the component the mouse is on", function () {
        //mouse is in the top half
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 150),
            genMockNode(0, 100, 100, 100))).toBe(true);

        //mouse is in the exact boundary of top and bottom half
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 50),
            genMockNode(0, 0, 100, 100))).toBe(true);

        //mouse is in the bottom half
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 151),
            genMockNode(0, 100, 100, 100))).toBe(false);

        //mouse is in the left half
        expect(DragDrop.isInLeftHalf(
            genMockMonitor(49, 0),
            genMockNode(0, 0, 100, 100))).toBe(true);

        //mouse is in the right half
        expect(DragDrop.isInLeftHalf(
            genMockMonitor(51, 0),
            genMockNode(0, 0, 100, 100))).toBe(false);
    });

    it("Determines whether the mouse is over the bottom/right edge of the component", function () {
        //mouse is not at the bottom edge yet
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 151),
            genMockNode(0, 100, 100, 100),
            true)).toBe(true);

        //mouse is at exactly the bottom edge
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 200),
            genMockNode(0, 100, 100, 100),
            true)).toBe(true);

        //mouse is over the bottom edge
        expect(DragDrop.isInTopHalf(
            genMockMonitor(0, 201),
            genMockNode(0, 100, 100, 100),
            true)).toBe(false);

        //mouse is not at the right edge yet
        expect(DragDrop.isInLeftHalf(
            genMockMonitor(51, 0),
            genMockNode(0, 0, 100, 100),
            true)).toBe(true);

        //mouse is at exatcly the right edge
        expect(DragDrop.isInLeftHalf(
            genMockMonitor(100, 0),
            genMockNode(0, 0, 100, 100),
            true)).toBe(true);

        //mouse is over the right edge
        expect(DragDrop.isInLeftHalf(
            genMockMonitor(101, 0),
            genMockNode(0, 0, 100, 100),
            true)).toBe(false);
    });

    it("Processes dropped to same index", function () {
        var props = genMockProps(1);
        var monitor = genMockMonitor(0, 0, props);

        var targetComponent = ReactTestUtils.renderIntoDocument(<div>Blah</div>);
        var targetNode = ReactDOM.findDOMNode(targetComponent);

        //mock the getBoundingClientRect function
        targetNode.getBoundingClientRect = genMockNode(0,0,100,100).getBoundingClientRect;

        //simulate a drap event to same index
        DragDrop.dropSpec.hover(props, monitor, targetComponent);

        expect(props.onDrag).toBeCalledWith(1, 1, undefined, undefined);

        DragDrop.dropSpec.drop(props, monitor, targetComponent);

        expect(props.onDrop).toBeCalledWith(1, 1, undefined, undefined);

    });

    it("Processes drag to bottom half of row", function () {
        var monitor = genMockMonitor(0, 60, genMockProps(1));   //pretend we"re dragging row index 1
        var props = genMockProps(2);                            //onto row index 2

        var targetComponent = ReactTestUtils.renderIntoDocument(<div>Blah</div>);
        var targetNode = ReactDOM.findDOMNode(targetComponent);

        //mock the getBoundingClientRect function
        targetNode.getBoundingClientRect = genMockNode(0,0,100,100).getBoundingClientRect;

        DragDrop.dropSpec.hover(props, monitor, targetComponent);

        expect(props.onDrag).toBeCalledWith(3, 1, undefined, undefined);
    });

    it("Processes drag to top half of row", function () {
        var monitor = genMockMonitor(0, 10, genMockProps(1));   //pretend we"re dragging row index 1
        var props = genMockProps(2);                            //onto row index 2

        var targetComponent = ReactTestUtils.renderIntoDocument(<div>Blah</div>);
        var targetNode = ReactDOM.findDOMNode(targetComponent);

        //mock the getBoundingClientRect function
        targetNode.getBoundingClientRect = genMockNode(0,0,100,100).getBoundingClientRect;

        DragDrop.dropSpec.hover(props, monitor, targetComponent);

        expect(props.onDrag).toBeCalledWith(2, 1, undefined, undefined);
    });

    it("disables drag based on prop", function () {
        expect(DragDrop.dragSpec.canDrag({ disabled: false })).toEqual(true);
        expect(DragDrop.dragSpec.canDrag({ disabled: true })).toEqual(false);
    });




});
