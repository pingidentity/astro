window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../RockerButton.jsx");
jest.dontMock("underscore");

describe("RockerButton", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        RockerButton = require("../RockerButton.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts || {}, {
            onChange: jest.genMockFunction(),
            controlled: true,
            labels: ["A", "B", "C"],
            className: "myRocker"
        });

        return ReactTestUtils.renderIntoDocument(<RockerButton {...opts} />);
    }

    it("will call onChange even if managed", function () {
        var component = getComponent();
        var labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(component, "label");

        ReactTestUtils.Simulate.click(labels[2], {});
        expect(component.props.onChange).toBeCalledWith("C", 2);
    });

    it("will accept index of selected item", function () {
        var component = getComponent({ selectedIndex: 1 });
        var rocker = component.refs.rocker;
        var container = rocker.refs.container;
        var node = React.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-1")).toBeTruthy();
    });

    it("managed component will select initial index", function () {
        var component = getComponent({ controlled: false, selectedIndex: 2 });
        var manager = component.refs.manager;
        var rocker = manager.refs.rocker;
        var container = rocker.refs.container;
        var node = React.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("managed component will select initial item", function () {
        var component = getComponent({ controlled: false, selected: "C" });
        var manager = component.refs.manager;
        var rocker = manager.refs.rocker;
        var container = rocker.refs.container;
        var node = React.findDOMNode(container);

        expect(node.getAttribute("class").match("sel-2")).toBeTruthy();
    });

    it("will trigger callback on selection change.", function () {

        var callback = jest.genMockFunction();

        var rockerButtonComponent = ReactTestUtils.renderIntoDocument(
            <RockerButton labels={["Profile", "Groups", "Services"]} onChange={callback}/>
        );

        var labels = ReactTestUtils.scryRenderedDOMComponentsWithTag(rockerButtonComponent, "label");

        //make sure 3 labels in a list
        expect(labels.length).toBe(3);

        ReactTestUtils.Simulate.click(labels[1], {});

        // verify label, make sure callback was triggered for Groups
        expect(callback).toBeCalledWith("Groups", 1);

        ReactTestUtils.Simulate.click(labels[0], {});

        // verify label, make sure callback was triggered for Profile
        expect(callback).toBeCalledWith("Profile", 0);

        ReactTestUtils.Simulate.click(labels[2], {});

        // verify label, make sure callback was triggered for Services
        expect(callback).toBeCalledWith("Services", 2);
    });
});
