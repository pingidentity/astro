window.__DEV__ = true;

jest.dontMock('../../../testutil/TestUtils');
jest.dontMock('../DragDropRow.jsx');
jest.dontMock('underscore');

describe('DragDropRow', function () {
    //var React = require('react/addons');
    //var ReactTestUtils = React.addons.TestUtils;
    var DragDropRow = require('../DragDropRow.jsx');

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
            index: typeof(index) === 'undefined' ? id : index,
            onDrag: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            onDrop: jest.genMockFunction()
        };
    };

    it('Determines which half of the component the mouse is on', function () {
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

    it('Processes dropped to same index', function () {
        var props = genMockProps(1);
        var monitor = genMockMonitor(0, 0, props);

        //simulate a drap event to same index
        DragDropRow.target.hover(props, monitor);

        expect(props.onDrag.mock.calls[0]).toEqual([1, 1]);
    });
});
