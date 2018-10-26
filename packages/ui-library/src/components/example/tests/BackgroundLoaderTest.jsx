window.__DEV__ = true;

jest.dontMock("../BackgroundLoader");

describe("BackgroundLoader", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var BackgroundLoader = require("../BackgroundLoader");

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
        var loader = TestUtils.findRenderedDOMNodeWithDataId(component, "loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.className).toEqual("css-class");
        var loadingContent = TestUtils.findRenderedDOMNodeWithDataId(component, "loading-content");
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeTruthy();
        var loadedContent = TestUtils.findRenderedDOMNodeWithDataId(component, "loaded-content");
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
        var loader = TestUtils.findRenderedDOMNodeWithDataId(component, "loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        var loadingContent = TestUtils.findRenderedDOMNodeWithDataId(component, "loading-content");
        expect(ReactTestUtils.isDOMComponent(loadingContent)).toBeFalsy();
        var loadedContent = TestUtils.findRenderedDOMNodeWithDataId(component, "loaded-content");
        expect(ReactTestUtils.isDOMComponent(loadedContent)).toBeTruthy();
    });

    xit("logs deprecated component warning message", function () {
        console.error = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <BackgroundLoader interval={2000} load={loadContentFunc} loaded={loaded} loading={loadingContentFunc}>
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
        );

        expect(console.error).toBeCalledWith(
            "** This component is deprecated and will be removed in the next release. " +
            "There is no direct replacement. Timer based polling or other timer related activities is better to be " +
            "implemented on middleware/actions/reducers layer.");
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.error = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <BackgroundLoader interval={2000} load={loadContentFunc} loaded={loaded} loading={loadingContentFunc}>
                <div data-id="loaded-content">content loaded</div>
            </BackgroundLoader>
        );

        expect(console.error).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
