jest.dontMock("../Link.jsx");

describe("Link", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Link = require("../Link.jsx");

    it("renders the component", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" count="2" />
        );
        expect(ReactTestUtils.isDOMComponent(component)).toBeDefined();
    });

    it("renders title when title is passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" icon="cog" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "title");
        expect(element).toBeDefined();
    });
    
    it("render component with classname passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" icon="cog" className="test-link" />
        );

        var element = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "test-link");
        expect(element).toBeDefined();
    });

    it("render component with data-id passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" count="2" data-id="test-link" />
        );
        
        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "test-link");
        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" count="2" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "content-link");
        expect(element).toBeDefined();
    });
        
    it("disabled will not do anything for clicks", function () {
        var callback = jest.genMockFunction(),
            component = ReactTestUtils.renderIntoDocument(
            <div><Link title="Link Name" disabled={true} onClick={callback} /></div>);

        expect(component).toBeDefined();
        var element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(element);
        expect(callback).not.toBeCalled();
    });
    
    it("render component with icon name passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" icon="cog" className="test-link" />
        );

        var element = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "icon-cog");
        expect(element).toBeDefined();
    });
    
    it("render component with count passed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Link title="Link Name" url="#" count="2" />
        );

        var element = ReactTestUtils.scryRenderedDOMComponentsWithClass(component, "count");
        expect(element).toBeDefined();
    });
    
    it("render component for click event", function () {
        var callback = jest.genMockFunction();
        var component = ReactTestUtils.renderIntoDocument(
            <div><Link title="Link Name" onClick={callback} icon="cog" className="test-link" /></div>
        );

        expect(component).toBeDefined();
        var element = TestUtils.findRenderedDOMNodeWithTag(component, "a");

        ReactTestUtils.Simulate.click(element);
        expect(callback).toBeCalled();
    });
});
