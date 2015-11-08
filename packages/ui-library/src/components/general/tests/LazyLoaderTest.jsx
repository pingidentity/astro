window.__DEV__ = true;

jest.dontMock("../LazyLoader.jsx");
jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("classnames");
jest.dontMock("underscore");

describe("LazyLoader", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
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
            /* jshint ignore:start */
            <LazyLoader items={components} limit={limit} />
            /* jshint ignore:end */
        );

        container = TestUtils.findRenderedDOMComponentWithDataId(View, "lazyLoaderContainer");

        expect(components.length).toEqual(cmpLen);
        expect(React.Children.count(container.props.children)).toEqual(limit);
    });
});
