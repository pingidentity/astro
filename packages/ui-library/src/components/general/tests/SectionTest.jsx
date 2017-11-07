window.__DEV__ = true;

jest.dontMock("../Section.jsx");
jest.dontMock("../CollapsibleLink.jsx");
jest.dontMock("../If.jsx");

describe("Section", function () {
    var React = require("react");
    var ReactTestUtils = require("react-dom/test-utils");
    var Section = require("../Section.jsx");
    var TestUtils = require("../../../testutil/TestUtils");

    it("Stateless: renders collapsed state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section">
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "section");
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title");
        var content = TestUtils.scryRenderedDOMNodesWithDataId(view, "iShouldBeHidden");
        var body = TestUtils.scryRenderedDOMNodesWithDataId(view, "section-content");

        expect(container.getAttribute("class")).not.toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.length).toEqual(1);
        expect(content.length).toEqual(1);
    });

    it("Stateful: renders collapsed state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "section");
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title");
        var content = TestUtils.scryRenderedDOMNodesWithDataId(view, "iShouldBeHidden");
        var body = TestUtils.scryRenderedDOMNodesWithDataId(view, "section-content");

        expect(container.getAttribute("class")).not.toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.length).toEqual(1);
        expect(content.length).toEqual(1);
    });

    it("Stateless: renders expanded state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" expanded={true}>
                <div data-id="iShouldBeVisible">My Content</div>
            </Section>
        );

        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "section");
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title");
        var content = TestUtils.findRenderedDOMNodeWithDataId(view, "iShouldBeVisible");
        var body = TestUtils.findRenderedDOMNodeWithDataId(view, "section-content");

        expect(container.getAttribute("class")).toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.textContent).toEqual("My Content");
        expect(content.textContent).toEqual("My Content");
    });

    it("Stateful: renders expanded state", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" titleValue="some value" expanded={true} stateless={false}>
                <div data-id="iShouldBeVisible">My Content</div>
            </Section>
        );

        var container = TestUtils.findRenderedDOMNodeWithDataId(view, "section");
        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title");
        var titleValue = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title-value");
        var content = TestUtils.findRenderedDOMNodeWithDataId(view, "iShouldBeVisible");
        var body = TestUtils.findRenderedDOMNodeWithDataId(view, "section-content");

        expect(container.getAttribute("class")).toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(titleValue.textContent).toEqual("some value");
        expect(body.textContent).toEqual("My Content");
        expect(content.textContent).toEqual("My Content");
    });

    it("Stateless: renders custom classname and data-id", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" className="extra" data-id="my-section" expanded={true}>
                content
            </Section>
        );

        var root = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section");
        TestUtils.findRenderedDOMNodeWithDataId(view, "my-section-title");
        TestUtils.scryRenderedDOMNodesWithDataId(view, "my-section-content");

        expect(root.getAttribute("class")).toContain("extra");
    });

    it("Stateless: renders unopenable", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" className="extra" data-id="my-section" disableExpand={true}>
                content
            </Section>
        );
        var root = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section");

        expect(root.getAttribute("class")).toContain("disable-expand");

        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section");

        ReactTestUtils.Simulate.click(title);

        expect(view.props.open).toBeFalsy();

        expect(title.getAttribute("class")).not.toContain("open");
    });

    it("Stateful: renders custom classname and data-id", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" className="extra" data-id="my-section" expanded={true} stateless={false}>
                content
            </Section>
        );

        var root = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section");
        TestUtils.findRenderedDOMNodeWithDataId(view, "my-section-title");
        TestUtils.scryRenderedDOMNodesWithDataId(view, "my-section-content");

        expect(root.getAttribute("class")).toContain("extra");
    });

    it("Stateless: triggers callback on click", function () {

        var callback = jest.genMockFunction();

        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" onToggle={callback}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        var title = TestUtils.findRenderedDOMNodeWithDataId(view, "section-title");

        ReactTestUtils.Simulate.click(title);

        expect(callback).toBeCalledWith(false);
    });

    it("Stateful: callback toggles expanded", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );
        var stateful = view.refs.SectionStateful;

        expect(stateful.state.expanded).toBeFalsy();

        stateful._handleToggle();

        expect(stateful.state.expanded).toBeTruthy();
    });

    it("Stateful: renders the right-side/row-accessories text content", function () {
        var accessoriesContent = "Some text";

        var view = ReactTestUtils.renderIntoDocument(
            <Section
                title="My Section"
                stateless={false}
                accessories={accessoriesContent}
            />
        );

        var accessories = ReactTestUtils.findRenderedDOMComponentWithClass(
            view,
            "collapsible-section-accessories"
        );
        expect(accessories).toBeTruthy();
        expect(accessories.textContent).toEqual(accessoriesContent);
    });

    it("Stateful: renders the right-side/row-accessories html content", function () {
        var accessoriesText = "Some Content",
            accessoriesContent = (<span>{accessoriesText}</span>);

        var view = ReactTestUtils.renderIntoDocument(
            <Section
                title="My Section"
                stateless={false}
                accessories={accessoriesContent}
            />
        );

        var accessories = ReactTestUtils.findRenderedDOMComponentWithClass(
            view,
            "collapsible-section-accessories"
        );
        expect(accessories).toBeTruthy();
        expect(accessories.textContent).toContain(accessoriesText);
    });


    // TODO To be removed once "id" support is discontnued.
    it("render component with id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Section id="sectionWithId" title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "sectionWithId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "section");

        expect(element).toBeDefined();
    });

    it("does not render the title colon when the title-value is not defined", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" stateless={false}>
                content
            </Section>
        );

        var title = TestUtils.findRenderedDOMNodeWithDataId(component, "section-title");
        var titleValue = TestUtils.findRenderedDOMNodeWithDataId(component, "section-title-value");

        expect(title.textContent).toEqual("My Section");
        expect(titleValue).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("produces stateful/stateless components correctly given controlled prop", function () {
        var component = ReactTestUtils.renderIntoDocument(<Section controlled={false} />);
        var stateful = component.refs.SectionStateful;
        var stateless = component.refs.SectionStateless;

        expect(stateful).toBeTruthy();
        expect(stateless).toBeFalsy();

        component = ReactTestUtils.renderIntoDocument(<Section controlled={true} />);
        stateful = component.refs.SectionStateful;
        stateless = component.refs.SectionStateless;

        expect(stateless).toBeTruthy();
        expect(stateful).toBeFalsy();
    });

    //TODO: remove when controlled no longer supported
    it("logs warning for deprecated controlled prop", function () {
        console.warn = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(<Section />);

        expect(console.warn).toBeCalledWith(
            "Deprecated: use stateless instead of controlled. " +
            "The default for stateless will be false instead of true. " +
            "Support for controlled will be removed in next version");
    });

    // TODO To be removed once "id" support is discontinued.
    it("log warning in console for id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Section id="sectionWithId" title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        expect(console.warn).toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    // TODO To be removed once "id" support is discontinued.
    it("does not log warning in console without id", function () {
        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Section data-id="sectionWithDataId" title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        expect(console.warn).not.toBeCalledWith(
            "Deprecated: use data-id instead of id. Support for id will be removed in next version");
    });

    //TODO: remove when id no longer supported
    it("does not log warning for id  when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Section id="sectionWithId" title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

    it("does not log deprecation message when in production", function () {
        //Mock process.env.NODE_ENV
        process.env.NODE_ENV = "production";

        console.warn = jest.genMockFunction();
        ReactTestUtils.renderIntoDocument(
            <Section title="My Section" stateless={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );

        expect(console.warn).not.toBeCalled();
        delete process.env.NODE_ENV;
    });

});
