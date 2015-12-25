window.__DEV__ = true;

jest.dontMock("../TabbedSections.jsx");
jest.dontMock("../../../testutil/TestUtils");

describe("If component", function () {
    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        TabbedSections = require("../TabbedSections.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts, {
            onSectionChange: jest.genMockFunction(),
            selectedIndex: -1
        });

        return ReactTestUtils.renderIntoDocument(
            <TabbedSections {...opts}>
                <div data-id="section1" title="section 1">section 1</div>
                <div data-id="section2" title="section 2">section 2</div>
            </TabbedSections>);
    }

    it("Renders one child", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <TabbedSections selectedIndex={0} onSectionChange={_.noop}>
                <div data-id="section1" title="section 1">section 1</div>
            </TabbedSections>);

        var child = TestUtils.findRenderedDOMComponentWithDataId(component, "section1");

        expect(React.findDOMNode(child).textContent).toBe("section 1");
    });

    it("ID and classname are written to DOM", function () {
        var component = getComponent({ selectedIndex: 0, id: "myId", className: "myClassName" });
        var node = React.findDOMNode(component);

        expect(node.getAttribute("class").match("myClassName")).toBeTruthy();
        expect(node.getAttribute("data-id")).toBe("myId");
    });

    it("Highlights selectedIndex tab", function () {
        var component = getComponent({ selectedIndex: -1 });
        var tabs = React.findDOMNode(component.refs.tabs);
        var content = React.findDOMNode(component.refs.content);
        var before = tabs.childNodes[0].outerHTML;

        //expect that after setting tab 1 as selectedIndex, something should change
        component.setProps({ selectedIndex: 0 });

        expect(before).not.toBe(tabs.childNodes[0].outerHTML);
        expect(content.textContent).toBe("section 1");
    });

    it("Renders hidden", function () {
        var component = getComponent({ renderHidden: true, selectedIndex: 0 });
        var node = React.findDOMNode(component);
        var content = React.findDOMNode(component.refs.content);

        expect(node.innerHTML.match("section 1")).toBeTruthy();
        expect(node.innerHTML.match("section 2")).toBeTruthy();
        expect(content.childNodes[0].style.display).toBe("");
        expect(content.childNodes[1].style.display).toBe("none");
    });
});
