window.__DEV__ = true;

jest.dontMock("../Section.jsx");
jest.dontMock("../CollapsibleLink.jsx");
jest.dontMock("../If.jsx");

describe("Section", function () {
    var React = require("react");
    var ReactTestUtils = require("react-addons-test-utils");
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
            <Section title="My Section" controlled={false}>
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
            <Section title="My Section" expanded={true} controlled={false}>
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

    it("Stateless: renders custom classname and data-id", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" className="extra" id="my-section" expanded={true}>
                content
            </Section>
        );

        var root = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section");
        TestUtils.findRenderedDOMNodeWithDataId(view, "my-section-title");
        TestUtils.scryRenderedDOMNodesWithDataId(view, "my-section-content");

        expect(root.getAttribute("class")).toContain("extra");
    });

    it("Stateful: renders custom classname and data-id", function () {
        var view = ReactTestUtils.renderIntoDocument(
            <Section title="My Section" className="extra" id="my-section" expanded={true} controlled={false}>
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
            <Section title="My Section" controlled={false}>
                <div data-id="iShouldBeHidden">My Content</div>
            </Section>
        );
        var stateful = view.refs.SectionStateful;

        expect(stateful.state.expanded).toBeFalsy();

        stateful._handleToggle();

        expect(stateful.state.expanded).toBeTruthy();
    });


});