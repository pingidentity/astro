window.__DEV__ = true;

jest.dontMock("../Indent.jsx");
jest.dontMock("../Link.jsx");

describe("Indent", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Indent = require("../Indent.jsx"),
        Link = require("../Link.jsx");

    it("renders the component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent title="all" className="primary">
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );
        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("renders title when title is passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent title="all" className="primary">
                <Link title="HR Apps Base Policy" url="#" icon="cog" />
            </Indent>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "title");
        expect(element).toBeDefined();
    });
    
    it("renders no title when no title is passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent>
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "title");
        expect(element).toBeFalsy();
    });

    it("render component with data-id passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent data-id="test-indent">
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );
        
        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "test-indent");
        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Indent>
                <Link title="HR Apps Base Policy" url="#" count="2" />
            </Indent>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "indent");
        expect(element).toBeDefined();
    });
});
