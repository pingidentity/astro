window.__DEV__ = true;

jest.dontMock("../InfiniteScroll.jsx");

describe("Batch", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        Wrapper = require("../../../testutil/TestUtils").UpdatePropsWrapper,
        InfiniteScroll = require("../InfiniteScroll.jsx"),
        assign = require("object-assign");
    var batches;

    var MyRow = React.createClass({
        render: function () {
            return <div ref="container" className="row">My row: {this.props.num}</div>;
        }
    });

    window.addEventListener = jest.genMockFunction();

    function getRenderedComponent (opts) {
        var defaults = {
            headingGenerator: jest.genMockFunction(),
            contentType: React.createElement(MyRow),
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

    it("Hides content when invisible", function () {
        var component = getRenderedComponent();
        var node = ReactDOM.findDOMNode(component.refs.wrapper.refs.container);

        expect(node.style.height).toBe("");
        expect(node.childNodes.length).toBe(50);

        node.scrollHeight = 100;

        component._setProps({ isVisible: false });

        expect(node.style.height).toBe("100px");
        expect(node.childNodes.length).toBe(0);
    });

    it("Only passes last item of previous batch to heading generator", function () {
        var component = getRenderedComponent({
            prev: batches[0].data,
            headingGenerator: jest.genMockFunction()
                .mockReturnValueOnce("A")
        });

        //computing the heading for the previous batch
        expect(component.props.headingGenerator.mock.calls[0]).toEqual([{ num: 49 }]);
        expect(component.props.headingGenerator.mock.calls[1]).toEqual([{ num: 50 }, "A"]);
    });
});

