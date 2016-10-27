window.__DEV__ = true;

jest.dontMock("../EllipsisLoader.jsx");

describe("Ellipsis loader", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
    var TestUtils = require("../../../testutil/TestUtils");
    var EllipsisLoader = require("../EllipsisLoader.jsx");

    it("renders the animated ellipsis when the loading flag is set to true", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader data-id="test-loader" loading={true} className="css-class"/>
        );

        var loader = TestUtils.findRenderedDOMNodeWithDataId(component, "test-loader");
        expect(ReactTestUtils.isDOMComponent(loader)).toBeTruthy();
        expect(loader.className).toEqual("icon-ellipsis css-class");
    });

    it("does not render anything when the loading flag is set to false", function () {
        console.warn = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader data-id="test-loader" loading={false}/>
        );

        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "test-loader");
        expect(test.length).toBe(0);
        expect(console.warn).not.toBeCalled();
    });

    it("does a console warning if id is passed in", function () {
        console.warn = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={false}/>
        );
        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "test-loader");
        expect(test.length).toBe(0);
        expect(console.warn).toBeCalled();
    });

    it("supports default data-id", function () {
        console.warn = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <EllipsisLoader loading={false}/>
        );
        var test = TestUtils.scryRenderedDOMNodesWithDataId(component, "ellipsis-loader");
        expect(test.length).toBe(0);
        expect(console.warn).not.toBeCalled();
    });

    //TODO: remove when deprecated props no longer supported
    it("does not log warning for id when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <EllipsisLoader id="test-loader" loading={false}/>
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });
});
