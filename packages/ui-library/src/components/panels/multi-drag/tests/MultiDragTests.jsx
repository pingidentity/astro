window.__DEV__ = true;

jest.dontMock("../MultiDrag.jsx");
jest.dontMock("../../../../util/EventUtils");
jest.dontMock("../../../../util/Utils");

describe("MultiDrag", function () {
    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        MultiDrag = require("../MultiDrag.jsx"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            onDrag: jest.genMockFunction(),
            onDrop: jest.genMockFunction(),
            onCancel: jest.genMockFunction(),
            contentType: <div />,
            columns: [
                { name: "Available Rows", id: 1, rows: [{ id: 1, n: 1 }, { id: 2, n: 2 }] },
                { name: "Added Rows", id: 2, rows: [{ id: 3, n: 3 }, { id: 4, n: 4 }] }
            ]
        });

        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={MultiDrag} opts={opts} />);
    }

    beforeEach(function () {
    });

    function getUnderlyingComp (wrapper) {
        //because the MultiDrag is wrapped in a DragDropContext we have to go through one extra step
        //to get to the component.
        return wrapper.refs.target.refs.child;
    }

    function getDesc (fromC, fromI, toC, toI) {
        return {
            from: { column: fromC, index: fromI },
            to: { column: toC, index: toI }
        };
    }

    it("cancels drag while invalid", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        component._onDrag(1, 1, 0, 0);
        expect(component.props.onDrag).not.toBeCalled();

        component._onCancel();
        expect(component.props.onDrop).not.toBeCalled();
        expect(component.props.onCancel).toBeCalled();
    });

    it("_onDrop is a noop", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        component._onDrop();
        expect(component.props.onDrop).not.toBeCalled();
    });

    it("blocks moving item to same location", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        component._onDrag(1, 1, 0, 0);
        expect(component.props.onDrag).not.toBeCalled();

        component._onDrag(1, 0, 0, 0);
        expect(component.props.onDrag).not.toBeCalled();
    });

    it("drags item 1 from first column to second", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        component._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).lastCalledWith(getDesc(0, 0, 1, 0));
    });

    it("avoids redundant calls to onDrag", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        //the first call execs the callback
        component._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
        component.props.onDrag.mockClear();

        //calling with the same arguments does nothing
        component._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).not.toBeCalled();

        //calling with new args will exec callback
        component._onDrag(1, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
    });

    it("clears cached move on drag end", function () {
        var wrapper = getWrappedComponent();
        var component = getUnderlyingComp(wrapper);

        //the first call execs the callback
        component._onDrag(0, 0, 1, 0);
        expect(component.props.onDrag).toBeCalled();
        expect(component._lastDrag).toEqual(getDesc(0, 0, 1, 0));

        component._onCancel();
        expect(component._lastDrag).toBe(null);
    });
});
