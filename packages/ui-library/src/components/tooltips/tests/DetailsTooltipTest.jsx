window.__DEV__ = true;

jest.dontMock("../DetailsTooltip.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("DetailsTooltip", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Details = require("../DetailsTooltip.jsx"),
        Wrapper = TestUtils.UpdatePropsWrapper,
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
        var link = TestUtils.findRenderedDOMNodeWithDataId(component, "action-btn");
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

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var title = TestUtils.findRenderedDOMNodeWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content");
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        //DOM to contain actual content
        expect(content.children.length).toBe(3);
        expect(content.children[2].nodeName).toBe("P");
        expect(content.children[2].textContent).toBe("what ever callout content is");

        //action link
        expect(link.textContent).toBe("Action");

        //title
        expect(title.textContent).toBe("Title");
    });

    it("doesnt render title container if none exists", function () {
        var component = getComponent({ title: "" });
        var title = TestUtils.findRenderedDOMNodeWithDataId(component, "details-title");

        expect(title).toBe(null);
    });

    it("is rendering open state with custom styles and no close control", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true} titleClassNames="title"
                     contentClassNames="content" showClose={false} labelStyle="label" className="extra">
                <p>what ever callout content is</p>
            </Details>
        );

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var title = TestUtils.findRenderedDOMNodeWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content");
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");
        var closeLink = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-close");

        //make sure root div got extra CSS classes
        expect(ReactDOM.findDOMNode(component).getAttribute("class")).toContain("extra");

        //DOM to contain actual content
        expect(content.children.length).toBe(2);
        expect(content.children[1].nodeName).toBe("P");
        expect(content.children[1].textContent).toBe("what ever callout content is");

        //no close link
        expect(closeLink.length).toBe(0);

        //action link
        expect(link.textContent).toBe("Action");

        //title
        expect(title.textContent).toBe("Title");
    });

    it("is rendering closed state", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={false}>
                <p>what ever callout content is</p>
            </Details>
        );

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var content = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-content");

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

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

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

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content");

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

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "details-close");

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

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        //make disabled css styling was added
        expect(link.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).not.toBeCalled(); //make sure callback was not triggered
    });

    it("is closing stateful component programatically", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" controlled={false} open={true}>
                <p>what ever callout content is</p>
            </Details>
        );

        component.close();

        var details = TestUtils.findRenderedComponentWithType(component, Details);
        var content = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-content");

        //no DOM content
        expect(content.length).toBe(0);
    });

    it("registers global listener on mount if component is open", function () {
        window.addEventListener = jest.genMockFunction();

        //let's override defer or execute func immediately for tests
        _.defer = function (func) {
            func();
        };

        ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true}>
                <p>what ever callout content is</p>
            </Details>
        );

        expect(window.addEventListener.mock.calls.length).toBe(1);
        expect(window.addEventListener.mock.calls[0][0]).toEqual("click");
    });


    it("unregister global listeners on unmount", function () {
        window.removeEventListener = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action">
                <p>what ever callout content is</p>
            </Details>
        );

        //trigger unmount
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(window.removeEventListener.mock.calls.length).toBe(1);
        expect(window.removeEventListener.mock.calls[0][0]).toEqual("click");
    });

    it("triggers callback when clicked outside", function () {
        var callback = jest.genMockFunction();

        ReactTestUtils.renderIntoDocument(
            <Details title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </Details>
        );

        var handler = window.addEventListener.mock.calls[0][1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.genMockFunction(),
            preventDefault: jest.genMockFunction()
        };

        //click outside
        handler(e);

        expect(callback).toBeCalled();
    });

    it("unregister listener when transitioning from open to closed", function () {
        window.removeEventListener = jest.genMockFunction();

        var component = ReactTestUtils.renderIntoDocument(
                            <Wrapper type={Details} title="Title" label="Action" open={true} onToggle={jest.genMockFn}>
                                <p>what ever callout content is</p>
                            </Wrapper>);

        component._setProps({ open: false });

        expect(window.removeEventListener.mock.calls.length).toBe(1);
        expect(window.removeEventListener.mock.calls[0][0]).toEqual("click");
    });


});
