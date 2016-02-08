window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../DetailsTooltip.jsx");
jest.dontMock("underscore");
jest.dontMock("underscore.string");
jest.dontMock("classnames");

describe("DetailsTooltip", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        Details = require("../DetailsTooltip.jsx"),
        _ = require("underscore");

    function getComponent (opts) {
        opts = _.defaults(opts, {
            title: "Title",
            label: "Label",
            open: true
        });

        return ReactTestUtils.renderIntoDocument(
            <Details {...opts}><p>what ever callout content is</p></Details>);
    }

    it("managed component that starts open", function () {
        var component = getComponent({ controlled: false });
        expect(component.refs.manager.state.open).toBe(true);
    });

    it("managed component", function () {
        var component = getComponent({ controlled: false, open: false });
        var link = TestUtils.findRenderedDOMComponentWithDataId(component, "action-btn");
        expect(component.refs.manager.state.open).toBe(false);

        ReactTestUtils.Simulate.click(link, {});
        expect(component.refs.manager.state.open).toBe(true);
    });

    it("is rendering open state", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var title = TestUtils.findRenderedDOMComponentWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMComponentWithDataId(details, "details-content");
        var link = TestUtils.findRenderedDOMComponentWithDataId(details, "action-btn");

        //DOM to contain actual content
        expect(content.getDOMNode().children.length).toBe(3);
        expect(content.getDOMNode().children[2].nodeName).toBe("P");
        expect(content.getDOMNode().children[2].textContent).toBe("what ever callout content is");

        //action link
        expect(link.getDOMNode().textContent).toBe("Action");

        //title
        expect(title.getDOMNode().textContent).toBe("Title");
    });

    it("doesnt render title container if none exists", function () {
        var component = getComponent({ title: "" });
        var title = TestUtils.findRenderedDOMComponentWithDataId(component, "details-title");

        expect(title).toBe(null);
    });

    it("is rendering open state with custom styles and no close control", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true} titleClassNames="title"
                     contentClassNames="content" showClose={false}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var title = TestUtils.findRenderedDOMComponentWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMComponentWithDataId(details, "details-content");
        var link = TestUtils.findRenderedDOMComponentWithDataId(details, "action-btn");
        var closeLink = TestUtils.scryRenderedDOMComponentsWithDataId(details, "details-close");

        //DOM to contain actual content
        expect(content.getDOMNode().children.length).toBe(2);
        expect(content.getDOMNode().children[1].nodeName).toBe("P");
        expect(content.getDOMNode().children[1].textContent).toBe("what ever callout content is");

        //no close link
        expect(closeLink.length).toBe(0);

        //action link
        expect(link.getDOMNode().textContent).toBe("Action");

        //title
        expect(title.getDOMNode().textContent).toBe("Title");
    });

    it("is rendering closed state", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={false}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var content = TestUtils.scryRenderedDOMComponentsWithDataId(details, "details-content");

        //no DOM content
        expect(content.length).toBe(0);
    });

    it("is notifying on toggle", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={false} onToggle={callback}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMComponentWithDataId(details, "action-btn");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("is notifying on toggle via content click", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true} onToggle={callback} showClose={false} hideOnClick={true}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var content = TestUtils.findRenderedDOMComponentWithDataId(details, "details-content");

        ReactTestUtils.Simulate.click(content, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("is notifying on toggle via close control", function () {

        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMComponentWithDataId(details, "details-close");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("is supports disabling", function () {
        var callback = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={false} onToggle={callback} disabled={true}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = ReactTestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMComponentWithDataId(details, "action-btn");

        //make disabled css styling was added
        expect(link.getDOMNode().getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).not.toBeCalled(); //make sure callback was not triggered
    });
});
