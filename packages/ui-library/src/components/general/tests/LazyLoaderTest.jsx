window.__DEV__ = true;

jest.dontMock("../LazyLoader.jsx");

describe("LazyLoader", function () {

    var React = require("react"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        LazyLoader = require("../LazyLoader.jsx"),
        components = [],
        cmpLen = 256,
        index = cmpLen,
        View;

    while (index) {
        components.push(React.createElement("div", {
            key: index
        }));
        index -= 1;
    }

    it("renders the amount of items specified by limit", function () {
        var limit = 64;
        var container;

        View = ReactTestUtils.renderIntoDocument(
            <LazyLoader items={components} limit={limit} />
        );

        container = TestUtils.findRenderedDOMNodeWithDataId(View, "lazyLoaderContainer");

        expect(components.length).toEqual(cmpLen);
        expect(container.children.length).toEqual(limit);
    });
});
