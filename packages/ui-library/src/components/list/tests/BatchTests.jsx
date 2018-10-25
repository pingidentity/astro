window.__DEV__ = true;

jest.dontMock("../InfiniteScroll");

describe("Batch", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Wrapper = require("../../../testutil/TestUtils").UpdatePropsWrapper,
        InfiniteScroll = require("../InfiniteScroll"),
        assign = require("object-assign");
    var batches;

    class MyRow extends React.Component {
        render() {
            return <div ref="container" className="row">My row: {this.props.num}</div>;
        }
    }

    window.addEventListener = jest.fn();

    function getRenderedComponent (opts) {
        var defaults = {
            onGenerateHeading: jest.fn(),
            contentType: <MyRow />,
            data: batches[1].data
        };

        return ReactTestUtils.renderIntoDocument(
            <Wrapper type={InfiniteScroll.Batch} {...assign(defaults, opts)} />
        );
    }

    function generateBatch (start, count) {
        var data = [];

        for (var i = start; i < start + count; i += 1) {
            data.push({ num: i });
        }

        return data;
    }

    beforeEach(function () {
        batches = [
            { id: 0 , data: generateBatch(0, 50) },
            { id: 50, data: generateBatch(50, 50) }
        ];
    });

    it("renders with default data-id", function () {
        var component = getRenderedComponent();

        var batch = TestUtils.findRenderedDOMNodeWithDataId(component, "batch");

        expect(batch).toBeDefined();
    });

    it("renders with given data-id", function () {
        var component = getRenderedComponent({ "data-id": "myBatch" });

        var batch = TestUtils.findRenderedDOMNodeWithDataId(component, "batch");

        expect(batch).toBeDefined();
    });

    it("hides content when invisible", function () {
        var component = getRenderedComponent();
        var node = ReactDOM.findDOMNode(component.refs.wrapper.refs.container);

        expect(node.style.height).toBe("");
        expect(node.childNodes.length).toBe(50);

        component._setProps({ isVisible: false });

        expect(node.childNodes.length).toBe(0);
    });

    it("only passes last item of previous batch to heading generator", function () {
        var component = getRenderedComponent({
            prev: batches[0].data,
            onGenerateHeading: jest.fn()
                .mockReturnValueOnce("A")
        });

        //computing the heading for the previous batch
        expect(component.props.onGenerateHeading.mock.calls[0]).toEqual([{ num: 49 }]);
        expect(component.props.onGenerateHeading.mock.calls[1]).toEqual([{ num: 50 }, "A"]);
    });
});
