window.__DEV__ = true;

jest.dontMock("../Section");
jest.dontMock("../CollapsibleLink");
jest.dontMock("../If");

describe("Section", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Section = require("../Section"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    const defaults = {
        children: "content",
        "data-id": "my-section",
        title: "My Section"
    };

    const getComponent = (opts) => {
        opts = _.defaults(opts || {}, {
            children: defaults.children,
            "data-id": defaults["data-id"],
            title: defaults.title
        });

        return TestUtils.renderInWrapper(<Section {...opts} />);
    };

    it("Stateless: renders collapsed state", function () {
        const view = getComponent({
                children: <div data-id="iShouldBeHidden">My Content</div>
            }),
            container = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            content = TestUtils.scryRenderedDOMNodesWithDataId(view, "iShouldBeHidden"),
            body = TestUtils.scryRenderedDOMNodesWithDataId(view, defaults["data-id"] + "-content");

        expect(container.className).not.toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.length).toEqual(1);
        expect(content.length).toEqual(0);
    });

    it("Stateful: renders collapsed state", function () {
        const view = getComponent({
                children: <div data-id="iShouldBeHidden">My Content</div>,
                stateless: false
            }),
            container = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            content = TestUtils.scryRenderedDOMNodesWithDataId(view, "iShouldBeHidden"),
            body = TestUtils.scryRenderedDOMNodesWithDataId(view, defaults["data-id"] + "-content");

        expect(container.className).not.toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.length).toEqual(1);
        expect(content.length).toEqual(0);
    });

    it("Stateless: renders expanded state", function () {
        const view = getComponent({
                children: <div data-id="iShouldBeVisible">My Content</div>,
                expanded: true
            }),
            container = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            content = TestUtils.findRenderedDOMNodeWithDataId(view, "iShouldBeVisible"),
            body = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-content");

        expect(container.className).toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.textContent).toEqual("My Content");
        expect(content.textContent).toEqual("My Content");
    });

    it("Stateful: renders expanded state", function () {
        const view = getComponent({
                children: <div data-id="iShouldBeVisible">My Content</div>,
                expanded: true,
                stateless: false,
                titleValue: "some value"
            }),
            container = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            titleValue = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title-value"),
            content = TestUtils.findRenderedDOMNodeWithDataId(view, "iShouldBeVisible"),
            body = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-content");

        expect(container.className).toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(titleValue.textContent).toEqual("some value");
        expect(body.textContent).toEqual("My Content");
        expect(content.textContent).toEqual("My Content");
    });

    it("Stateless: renders custom classname and data-id", function () {
        const view = getComponent({
                children: <div data-id="iShouldBeVisible">My Content</div>,
                className: "extra",
                expanded: true,
                stateless: false
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("extra");
    });

    it("Stateless: renders unopenable", function () {
        const view = getComponent({
                disableExpand: true
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, "my-section-title");

        expect(root.className).toContain("disable-expand");

        ReactTestUtils.Simulate.click(title);

        expect(view.props.open).toBeFalsy();
        expect(title.className).not.toContain("open");
    });

    it("Stateful: renders custom classname and data-id", function () {
        const view = getComponent({
            className: "extra",
            expanded: true,
            stateless: false
        });
        const root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("extra");
    });

    it("Stateful: renders the right-side/row-accessories text content", function () {
        const accessoriesContent = "Some text",
            view = getComponent({
                stateless: false,
                accessories: accessoriesContent
            }),
            accessories = TestUtils.findRenderedDOMNodeWithDataId(
                view,
                defaults["data-id"] + "-collapsible-section-accessories"
            );

        expect(accessories).toBeTruthy();
        expect(accessories.textContent).toEqual(accessoriesContent);
    });

    it("Stateful: renders the right-side/row-accessories html content", function () {
        const accessoriesText = "Some Content",
            accessoriesContent = (<span>{accessoriesText}</span>),
            view = getComponent({
                stateless: false,
                accessories: accessoriesContent
            }),
            accessories = TestUtils.findRenderedDOMNodeWithDataId(
                view,
                defaults["data-id"] + "-collapsible-section-accessories"
            );

        expect(accessories).toBeTruthy();
        expect(accessories.textContent).toContain(accessoriesText);
    });

    it("does not render the title colon when the title-value is not defined", function () {
        const view = getComponent({
                stateless: false
            }),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            titleValue = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title-value");

        expect(title.textContent).toEqual("My Section");
        expect(titleValue).toBeFalsy();
    });

    it("renders as condensed", function () {
        const view = getComponent({
                condensed: true
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("condensed");
    });

    it("renders collapsed detail text when collapsed and detailsText is passed in", () => {
        const component = getComponent({
                detailsText: {
                    condensed: "Condensed"
                }
            }),
            detailsText = TestUtils.findRenderedDOMNodeWithClass(component, "collapsible-section__details-text");

        expect(detailsText).toBeTruthy();
    });

    it("renders expanded detail text when expanded and detailsText is passed in", () => {
        const component = getComponent({
                detailsText: {
                    collapsed: "Collapsed"
                }
            }),
            detailsText = TestUtils.findRenderedDOMNodeWithClass(component, "collapsible-section__details-text");

        expect(detailsText.textContent).toEqual("Collapsed");
    });

    it("renders expanded detail text when expanded and detailsText is passed in", () => {
        const component = getComponent({
                detailsText: {
                    expanded: "Expanded"
                },
                expanded: true
            }),
            detailsText = TestUtils.findRenderedDOMNodeWithClass(component, "collapsible-section__details-text");

        expect(detailsText.textContent).toEqual("Expanded");
    });

});
