window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../BackgroundLoader.jsx");

describe("BackgroundLoader", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var BackgroundLoader = require("../BackgroundLoader.jsx");

    var loadingContentFunc;
    var loaded;
    var loadContentFunc;

    beforeEach(function () {
        loadingContentFunc = function () {
            return (
                <span data-id="loading-content">loading content</span>
            );
        };

        loadContentFunc = jest.genMockFunction();
    });


    it("render loading state", function () {
        loaded = false;

        var component = ReactTestUtils.renderIntoDocument(
            <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
        );
        
        // the loading content should be visible; the loaded content should not be
        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, "loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.getDOMNode().className).toEqual("css-class");
        var loadingContent = TestUtils.findRenderedDOMComponentWithDataId(component, "loading-content");
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeTruthy();
        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, "loaded-content");
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeFalsy();
    });

    it("render loaded state", function () {
        loaded = true;

        var component = ReactTestUtils.renderIntoDocument(
            <BackgroundLoader
                    interval={2000}
                    load={loadContentFunc}
                    loaded={loaded}
                    loading={loadingContentFunc}
                    className="css-class">
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
        );

        // the loading content should not be visible; the loaded content should be
        var loader = TestUtils.findRenderedDOMComponentWithDataId(component, "loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        var loadingContent = TestUtils.findRenderedDOMComponentWithDataId(component, "loading-content");
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeFalsy();
        var loadedContent = TestUtils.findRenderedDOMComponentWithDataId(component, "loaded-content");
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
    });
});
