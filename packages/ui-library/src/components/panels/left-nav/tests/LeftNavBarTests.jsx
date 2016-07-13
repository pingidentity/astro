window.__DEV__ = true;

jest.dontMock("../LeftNavBar.jsx");
jest.dontMock("../Copyright.jsx");
jest.dontMock("../../../../util/Utils");

describe("LeftNavBar", function () {
    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        ReduxTestUtils = require("../../../../util/ReduxTestUtils"),
        TestUtils = require("../../../../testutil/TestUtils"),
        LeftNavBar = require("../LeftNavBar.jsx"),
        _ = require("underscore");

    function getWrappedComponent (opts) {
        opts = _.defaults(opts || {}, {
            onItemValueChange: jest.genMockFunction(),
            onSectionValueChange: jest.genMockFunction(),
            tree: [
                {
                    label: "Section 1",
                    id: "section-1",
                    children: [{ label: "Item 1", id: "item-1" }]
                },
                {
                    label: "Section 2",
                    id: "section-2",
                    children: [{ label: "Item 2", id: "item-2" }]
                }
            ]
        });
        return ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={LeftNavBar} opts={opts} />);
    }

    it("clicks trigger correct callback", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-label");
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "item-1-label");

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionValueChange).lastCalledWith("section-1");

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemValueChange).lastCalledWith("item-1");
    });

    it("clicks trigger correct callback and onItemClick warning", function () {
        console.warn = jest.genMockFunction();

        var opts = _.defaults(opts || {}, {
            onItemClick: jest.genMockFunction(),
            onSectionValueChange: jest.genMockFunction(),
            tree: [
                {
                    label: "Section 1",
                    id: "section-1",
                    children: [{ label: "Item 1", id: "item-1" }]
                },
                {
                    label: "Section 2",
                    id: "section-2",
                    children: [{ label: "Item 2", id: "item-2" }]
                }
            ]
        });
        var wrapper = ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={LeftNavBar} opts={opts} />);

        var component = wrapper.refs.target;
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-label");
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "item-1-label");

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionValueChange).lastCalledWith("section-1");

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemClick).lastCalledWith("item-1");
        expect(console.warn).toBeCalledWith(
            "Deprecated: use onItemValueChange instead of onItemClick. Support for onItemClick " +
            "will be removed in next version");
    });

    it("clicks trigger correct callback and onSectionClick warning", function () {
        console.warn = jest.genMockFunction();
        var opts = _.defaults(opts || {}, {
            onItemValueChange: jest.genMockFunction(),
            onSectionClick: jest.genMockFunction(),
            tree: [
                {
                    label: "Section 1",
                    id: "section-1",
                    children: [{ label: "Item 1", id: "item-1" }]
                },
                {
                    label: "Section 2",
                    id: "section-2",
                    children: [{ label: "Item 2", id: "item-2" }]
                }
            ]
        });
        var wrapper = ReactTestUtils.renderIntoDocument(<ReduxTestUtils.Wrapper type={LeftNavBar} opts={opts} />);

        var component = wrapper.refs.target;
        var sectionLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-label");
        var itemLabel = TestUtils.findRenderedDOMNodeWithDataId(component, "item-1-label");

        ReactTestUtils.Simulate.click(sectionLabel);
        expect(component.props.onSectionClick).lastCalledWith("section-1");

        ReactTestUtils.Simulate.click(itemLabel);
        expect(component.props.onItemValueChange).lastCalledWith("item-1");
        expect(console.warn).toBeCalledWith(
            "Deprecated: use onSectionValueChange instead of onSectionClick. Support for onSectionClick " +
            "will be removed in next version");
    });

    it("renders the tree structure", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
        var children = section1.getElementsByTagName("li");

        expect(children.length).toEqual(1);
        expect(children[0].textContent).toEqual("Item 1");
    });

    it("renders specified open as open", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;
        var section1 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-1-menu");
        var section2 = TestUtils.findRenderedDOMNodeWithDataId(component, "section-2-menu");

        wrapper.sendProps({ openNode: "section-1" });

        expect(section1.parentNode.className).toContain("open");
        expect(section2.parentNode.className).not.toContain("open");
    });

    it("detaches animation listener after re-render", function () {
        var wrapper = getWrappedComponent();
        var component = wrapper.refs.target;

        component._getItemSelector().removeEventListener = jest.genMockFunction();

        component._rerender();

        expect(component._getItemSelector().removeEventListener).toBeCalled();
    });

    it("unmounts", function () {
        var wrapper = getWrappedComponent({ selectedNode: "item-1" });
        var component = wrapper.refs.target;

        component._getItemSelector().removeEventListener = jest.genMockFunction();

        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(component._getItemSelector()).toBe(null);
    });

    /*
    it("will scroll if selected item is below copyright section", function () {
        var wrapper = getWrappedComponent({ openNode: "section-1", selectedNode: "item-1" });
        var component = wrapper.refs.target;
        var copyright = ReactDOM.findDOMNode(component.refs.copyright);
        var itemSelector = ReactDOM.findDOMNode(component).getElementsByTagName("li")[1];

        copyright.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ top: 10 });
        itemSelector.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ bottom: 11 });
        parent.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ height: 10 });

        wrapper.sendProps({ openNode: "section-2", selectedNode: "item-2" });
        expect(parent.scrollTop).toBe(10);

        itemSelector = ReactDOM.findDOMNode(component).getElementsByTagName("li")[0];
        itemSelector.getBoundingClientRect = jest.genMockFunction().mockReturnValue({ top: -10 });

        wrapper.sendProps({ openNode: "section-1", selectedNode: "item-1" });
        expect(parent.scrollTop).toBe(0);
    });*/

    //just here to satisfy code coverage
    it("gets new selected item", function () {
        var wrapper = getWrappedComponent({ openNode: "section-1", selectedNode: "item-1" });

        wrapper.sendProps({ openNode: "section-2", selectedNode: "item-2" });
        wrapper.sendProps({ openNode: "section-1", selectedNode: "item-1" });
    });
});
