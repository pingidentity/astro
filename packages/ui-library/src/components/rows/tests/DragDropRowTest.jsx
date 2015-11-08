window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../DragDropRow.jsx");
jest.setMock("react-dnd", {
    DragSource: function () {
        return function (c) { return c; };
    },
    DropTarget: function () {
        return function (c) { return c; };
    },
});

describe("DragDropRow", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        DragDropRow = require("../DragDropRow.jsx");

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

    it("Determines which half of the component the mouse is on", function () {
        //mouse is in the top half
        expect(DragDropRow.isInTopHalf(
            genMockMonitor(0, 150),
            genMockNode(0, 100, 100, 100))).toBe(true);

        //mouse is in the exact boundary of top and bottom half
        expect(DragDropRow.isInTopHalf(
            genMockMonitor(0, 50),
            genMockNode(0, 0, 100, 100))).toBe(true);

        //mouse is in the bottom half
        expect(DragDropRow.isInTopHalf(
            genMockMonitor(0, 151),
            genMockNode(0, 100, 100, 100))).toBe(false);
    });

    it("Processes dropped to same index", function () {
        var props = genMockProps(1);
        var monitor = genMockMonitor(0, 0, props);

        //simulate a drap event to same index
        DragDropRow.dropSpec.hover(props, monitor);

        expect(props.onDrag.mock.calls[0]).toEqual([1, 1]);
    });

    /** had to really bend over backwards to get this test to work since jest mocks the internals
     * of react-dnd.  It doesnt prove a lot but it exercises the render function of the component */
    it("Renders children", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DragDropRow
                connectDragSource={function (c) { return c; }}
                connectDropTarget={function (c) { return c; }}
                isDragging={false}
                id={1}
                index={1}
                onDrag={jest.genMockFunction()}
                onDrop={jest.genMockFunction()}
                onCancel={jest.genMockFunction()} >
                <div>Blah</div>
            </DragDropRow>);

        var childNodes = React.findDOMNode(component).childNodes;

        expect(childNodes.length).toBe(1);
        expect(childNodes[0].innerHTML).toBe("Blah");
    });

    it("Processes drag to bottom half of row", function () {
        var monitor = genMockMonitor(0, 60, genMockProps(1));   //pretend we're dragging row index 1
        var props = genMockProps(2);                            //onto row index 2

        var targetComponent = ReactTestUtils.renderIntoDocument(<div>Blah</div>);
        var targetNode = React.findDOMNode(targetComponent);

        //mock the getBoundingClientRect function
        targetNode.getBoundingClientRect = genMockNode(0,0,100,100).getBoundingClientRect;

        DragDropRow.dropSpec.hover(props, monitor, targetComponent);

        expect(props.onDrag.mock.calls[0]).toEqual([3, 1]);
    });

    it("Processes drag to top half of row", function () {
        var monitor = genMockMonitor(0, 10, genMockProps(1));   //pretend we're dragging row index 1
        var props = genMockProps(2);                            //onto row index 2

        var targetComponent = ReactTestUtils.renderIntoDocument(<div>Blah</div>);
        var targetNode = React.findDOMNode(targetComponent);

        //mock the getBoundingClientRect function
        targetNode.getBoundingClientRect = genMockNode(0,0,100,100).getBoundingClientRect;

        DragDropRow.dropSpec.hover(props, monitor, targetComponent);

        expect(props.onDrag.mock.calls[0]).toEqual([2, 1]);
    });
});

