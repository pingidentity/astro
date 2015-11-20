window.__DEV__ = true;

jest.dontMock("../TabbedSections.jsx");

describe("If component", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TabbedSections = require("../TabbedSections.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts, {
            onSectionChange: jest.genMockFunction(),
            active: -1
        });

        return ReactTestUtils.renderIntoDocument(
            <TabbedSections {...opts}>
                <div data-id="section1" title="section 1">section 1</div>
                <div data-id="section2" title="section 2">section 2</div>
            </TabbedSections>);
    }

    it("ID and classname are written to DOM", function () {
        var component = getComponent({ active: 1, id: "myId", className: "myClassName" });
        var node = React.findDOMNode(component);

        expect(node.getAttribute("class").match("myClassName")).toBeTruthy();
        expect(node.getAttribute("data-id")).toBe("myId");
    });

    it("Highlights active tab", function () {
        var component = getComponent({ active: 0 });
        var tabs = React.findDOMNode(component.refs.tabs);
        var content = React.findDOMNode(component.refs.content);
        var before = tabs.childNodes[0].outerHTML;

        //expect that after setting tab 1 as active, something should change
        component.setProps({ active: 1 });

        expect(before).not.toBe(tabs.childNodes[0].outerHTML);
        expect(content.textContent).toBe("section 1");
    });
});
