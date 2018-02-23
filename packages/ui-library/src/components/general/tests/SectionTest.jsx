window.__DEV__ = true;

jest.dontMock("../Section");
jest.dontMock("../CollapsibleLink");
jest.dontMock("../If");

describe("Section", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        Section = require("../Section"),
        Utils = require("../../../util/Utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        _ = require("underscore");

    var defaults = {
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

        return ReactTestUtils.renderIntoDocument(<Section {...opts} />);
    };

    it("Stateless: renders collapsed state", function () {
        var view = getComponent({
                children: <div data-id="iShouldBeHidden">My Content</div>
            }),
            container = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            content = TestUtils.scryRenderedDOMNodesWithDataId(view, "iShouldBeHidden"),
            body = TestUtils.scryRenderedDOMNodesWithDataId(view, defaults["data-id"] + "-content");

        expect(container.className).not.toContain("open");
        expect(title.textContent).toEqual("My Section");
        expect(body.length).toEqual(1);
        expect(content.length).toEqual(1);
    });

    it("Stateful: renders collapsed state", function () {
        var view = getComponent({
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
        expect(content.length).toEqual(1);
    });

    it("Stateless: renders expanded state", function () {
        var view = getComponent({
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
        var view = getComponent({
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
        var view = getComponent({
                children: <div data-id="iShouldBeVisible">My Content</div>,
                className: "extra",
                expanded: true,
                stateless: false
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        TestUtils.findRenderedDOMNodeWithDataId(view, "my-section-title");
        TestUtils.scryRenderedDOMNodesWithDataId(view, "my-section-content");

        expect(root.className).toContain("extra");
    });

    it("Stateless: renders unopenable", function () {
        var view = getComponent({
                disableExpand: true
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("disable-expand");

        ReactTestUtils.Simulate.click(title);

        expect(view.props.open).toBeFalsy();
        expect(title.className).not.toContain("open");
    });

    it("Stateful: renders custom classname and data-id", function () {
        var view = getComponent({
            className: "extra",
            expanded: true,
            stateless: false
        });
        var root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("extra");
    });

    it("Stateless: triggers callback on click", function () {
        var callback = jest.genMockFunction(),
            view = getComponent({
                onToggle: callback
            }),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title");

        ReactTestUtils.Simulate.click(title);

        expect(callback).toBeCalledWith(false);
    });

    it("Stateful: callback toggles expanded", function () {
        var view = getComponent({
                stateless: false
            }),
            stateful = view.refs.SectionStateful;

        expect(stateful.state.expanded).toBeFalsy();

        stateful._handleToggle();

        expect(stateful.state.expanded).toBeTruthy();
    });

    it("Stateful: renders the right-side/row-accessories text content", function () {
        var accessoriesContent = "Some text",
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
        var accessoriesText = "Some Content",
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
        var view = getComponent({
                stateless: false
            }),
            title = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title"),
            titleValue = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"] + "-title-value");

        expect(title.textContent).toEqual("My Section");
        expect(titleValue).toBeFalsy();
    });

    it("renders as condensed", function () {
        var view = getComponent({
                condensed: true
            }),
            root = TestUtils.findRenderedDOMNodeWithDataId(view, defaults["data-id"]);

        expect(root.className).toContain("condensed");
    });

    it("throws error when deprecated prop 'id' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("id", "data-id"));

        expect(
            function () {
                getComponent({ id: "foo" });
            }
        ).toThrow(expectedError);
    });

    it("throws error when deprecated prop 'controlled' is passed in", function () {
        var expectedError = new Error(Utils.deprecatePropError("controlled", "stateless", "true", "false"));

        expect(
            function () {
                getComponent({ controlled: true });
            }
        ).toThrow(expectedError);
    });

});
