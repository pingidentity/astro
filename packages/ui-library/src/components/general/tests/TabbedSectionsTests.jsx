window.__DEV__ = true;

jest.dontMock("../TabbedSections");

import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";

describe("If component", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Wrapper = TestUtils.UpdatePropsWrapper,
        TabbedSections = require("../TabbedSections"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts, {
            onValueChange: jest.fn(),
            selectedIndex: -1
        });

        return ReactTestUtils.renderIntoDocument(
            <TabbedSections {...opts}>
                <div data-id="section1" title="section 1">section 1</div>
                <div data-id="section2" title="section 2">section 2</div>
            </TabbedSections>);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <TabbedSections
                expanded
                detailsText="Quite detailed, really"
                titleValue="BORK BORK BORK"
                onValueChange={jest.fn()}
            >
                <div>Some very important stuff</div>
                <div>Extraneous nonsense</div>
            </TabbedSections>
        );
    });

    it("Renders one child", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <TabbedSections selectedIndex={0} onValueChange={_.noop}>
                <div data-id="section1" title="section 1">section 1</div>
            </TabbedSections>);

        var child = TestUtils.findRenderedDOMNodeWithDataId(component, "section1");

        expect(child.textContent).toBe("section 1");
    });

    it("ID and classname are written to DOM", function () {
        var component = getComponent({ selectedIndex: 0, "data-id": "myId", className: "myClassName" });
        var node = TestUtils.findRenderedDOMNodeWithDataId(component, "myId");

        expect(node.getAttribute("class")).toBe("myClassName");
        expect(node.getAttribute("data-id")).toBe("myId");
    });

    it("Highlights selectedIndex tab", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={TabbedSections}
                onValueChange={jest.fn()}
                data-id={"myId"}
                selectedIndex={-1}>
                <div data-id="section1" title="section 1">section 1</div>
                <div data-id="section2" title="section 2">section 2</div>
            </Wrapper>
        );

        var tabs = TestUtils.findRenderedDOMNodeWithDataId(component, "tabs");
        var content = ReactDOM.findDOMNode(component.refs.wrapper.refs.content);
        var before = tabs.childNodes[0].outerHTML;

        //expect that after setting tab 1 as selectedIndex, something should change
        component._setProps({ selectedIndex: 0 });

        expect(before).not.toBe(tabs.childNodes[0].outerHTML);
        expect(content.textContent).toBe("section 1");
    });

    it("Renders hidden", function () {
        var component = getComponent({ renderHidden: true, selectedIndex: 0 });
        var node = ReactDOM.findDOMNode(component);
        var content = ReactDOM.findDOMNode(component.refs.content);

        expect(node.textContent.match("section 1")).toBeTruthy();
        expect(node.textContent.match("section 2")).toBeTruthy();
        expect(content.childNodes[0].style.display).toBe("");
        expect(content.childNodes[1].style.display).toBe("none");
    });

    it("Verify onValueChange called", function () {
        var onValueChange = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <TabbedSections selectedIndex={-1} onValueChange={onValueChange}>
                <div data-id="section1" title="section 1">section 1</div>
                <div data-id="section2" title="section 2">section 2</div>
            </TabbedSections>);
        var tabs = TestUtils.findRenderedDOMNodeWithDataId(component, "tabs");
        ReactTestUtils.Simulate.click(tabs.childNodes[1]);

        expect(onValueChange).toBeCalled();
    });

});
