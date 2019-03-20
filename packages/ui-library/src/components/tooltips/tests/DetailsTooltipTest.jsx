window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

import { shallow } from "enzyme";

describe("DetailsTooltip", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        DetailsTooltip = require("../DetailsTooltip"),
        Wrapper = TestUtils.UpdatePropsWrapper,
        _ = require("underscore");

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    function getComponent (opts) {
        opts = _.defaults(opts, {
            title: "Title",
            label: "Label",
            open: true,
            onValueChange: jest.fn(),
            onToggle: jest.fn(),
        });

        return ReactTestUtils.renderIntoDocument(
            <DetailsTooltip {...opts}><p>what ever callout content is</p></DetailsTooltip>);
    }
    beforeEach(function () {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });
    afterEach(function () {
        delete process.env.NODE_ENV;
    });

    it("managed component that starts open", function () {
        var component = getComponent({ stateless: false });
        expect(component.refs.manager.state.open).toBe(true);
    });

    it("managed component that starts open using a portal", function () {
        var component = getComponent({ stateless: false, flags: ["use-portal"] });
        expect(component.refs.manager.state.open).toBe(true);
    });

    it("managed component", function () {
        var component = getComponent({ stateless: false, open: false });
        var link = TestUtils.findRenderedDOMNodeWithDataId(component, "action-btn");
        expect(component.refs.manager.state.open).toBe(false);

        ReactTestUtils.Simulate.click(link, {});
        expect(component.refs.manager.state.open).toBe(true);
    });

    it("is rendering open state", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var title = TestUtils.findRenderedDOMNodeWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content").children[0];
        var body = TestUtils.findRenderedDOMNodeWithDataId(details, "details-body");
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        //DOM to contain actual content
        expect(content.children.length).toBe(3);
        expect(body.children[0].nodeName).toBe("P");
        expect(body.children[0].textContent).toBe("what ever callout content is");

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
            <DetailsTooltip title="Title" label="Action" open={true} titleClassName="title"
                contentClassName="content" showClose={false} labelClassName="label" className="extra">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var title = TestUtils.findRenderedDOMNodeWithDataId(details, "details-title");
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content").children[0];
        var body = TestUtils.findRenderedDOMNodeWithDataId(details, "details-body");
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");
        var closeLink = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-close");

        //make sure root div got extra CSS classes
        expect(ReactDOM.findDOMNode(component).getAttribute("class")).toContain("extra");

        //DOM to contain actual content
        expect(content.children.length).toBe(2);
        expect(body.children[0].nodeName).toBe("P");
        expect(body.children[0].textContent).toBe("what ever callout content is");

        //no close link
        expect(closeLink.length).toBe(0);

        //action link
        expect(link.textContent).toBe("Action");

        //title
        expect(title.textContent).toBe("Title");
    });

    it("is rendering closed state", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={false}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var content = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-content");

        //no DOM content
        expect(content.length).toBe(0);
    });

    it("is notifying on toggle", function () {

        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={false} onToggle={callback}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("is notifying on toggle via content click", function () {

        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true}
                onToggle={callback} showClose={false} hideOnClick={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content");

        ReactTestUtils.Simulate.click(content, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("is notifying on toggle via close control", function () {

        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "details-close");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    // Remove this once V4 is released. Calling component methods is a bad look.
    it("when stateless, close method doesn't fire an error", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        component.close();
    });

    it("is supports disabling", function () {
        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true}
                title="Title" label="Action" open={false} onToggle={callback} disabled={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        //make disabled css styling was added
        expect(link.getAttribute("class")).toContain("disabled");

        ReactTestUtils.Simulate.click(link, {});

        expect(callback).not.toBeCalled(); //make sure callback was not triggered
    });

    // Remove this once V4 is released. Calling component methods is a bad look.
    it("is closing stateful component programatically", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" stateless={false} open={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        component.close();

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var content = TestUtils.scryRenderedDOMNodesWithDataId(details, "details-content");

        //no DOM content
        expect(content.length).toBe(0);
    });

    it("registers global listener on mount if component is open", function () {
        //let's override defer or execute func immediately for tests
        _.defer = function (func) {
            func();
        };

        ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        expect(TestUtils.mockCallsContains(window.addEventListener, "click")).toBe(true);
        expect(TestUtils.mockCallsContains(window.addEventListener, "keydown")).toBe(true);
    });

    it("unregister global listeners on unmount", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        //trigger unmount
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);

        expect(TestUtils.mockCallsContains(window.removeEventListener, "click")).toBe(true);
        expect(TestUtils.mockCallsContains(window.removeEventListener, "keydown")).toBe(true);
    });

    //TODO no idea why this isn't working. can console log the full stack, it just isn't being called
    it("triggers callback when clicked outside", function () {
        var callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        //click outside
        handler(e);

        expect(callback).toBeCalled();
    });

    it("triggers callback when escape is pressed", function () {
        var callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            keyCode: 27,
        };

        //press escape
        handler(e);

        expect(callback).toBeCalled();
    });

    it("doesn't trigger callback when a key other than escape is pressed", function () {
        var callback = jest.fn();

        ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={true} onToggle={callback}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var handler = TestUtils.findMockCall(window.addEventListener, "keydown")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn(),
            keyCode: 10,
        };

        //press escape
        handler(e);

        expect(callback).not.toBeCalled();
    });

    it("doesn't error when handling outside click but not open", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={false}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        component.refs.tooltip._handleGlobalClick();
    });

    it("doesn't error when handling escape click but not open", function () {
        const component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip stateless={true} title="Title" label="Action" open={false}>
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        component.refs.tooltip._handleGlobalKeyDown({ keyCode: 27 });
    });

    it("unregister listener when transitioning from open to closed", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <Wrapper type={DetailsTooltip}
                stateless={true} title="Title" label="Action" open={true} onToggle={jest.genMockFn}>
                <p>what ever callout content is</p>
            </Wrapper>);

        component._setProps({ open: false });

        expect(TestUtils.mockCallsContains(window.removeEventListener, "click")).toBe(true);
        expect(TestUtils.mockCallsContains(window.removeEventListener, "keydown")).toBe(true);
    });

    it("render component with data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip data-id="detailsTooltipWithDataId" title="Title" label="Action">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "detailsTooltipWithDataId");

        expect(element).toBeDefined();
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "details-tooltip");

        expect(element).toBeDefined();
    });


    it("is rendering position styling with positionClassName", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true} positionClassName="position">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        //make sure root div got position CSS classes
        expect(ReactDOM.findDOMNode(component).getAttribute("class")).toContain("position");
    });

    it("is rendering label styling with labelClassName", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true} labelClassName="customLabel">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var link = TestUtils.findRenderedDOMNodeWithDataId(details, "action-btn");

        //make sure anchor tag got customLabel CSS classes
        expect(ReactDOM.findDOMNode(link).getAttribute("class")).toContain("customLabel");
    });

    it("is rendering content styling with contentClassName", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true} contentClassName="customContent">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var content = TestUtils.findRenderedDOMNodeWithDataId(details, "details-content");

        //make sure context div got customContent CSS classes
        expect(ReactDOM.findDOMNode(content).getAttribute("class")).toContain("customContent");
    });

    it("is rendering title styling with titleClassName", function () {

        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true} titleClassName="customTitle">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        var details = TestUtils.findRenderedComponentWithType(component, DetailsTooltip);
        var title = TestUtils.findRenderedDOMNodeWithDataId(details, "details-title");

        //make sure context div got customContent CSS classes
        expect(ReactDOM.findDOMNode(title).getAttribute("class")).toContain("customTitle");
    });

    it("Renders buttons when optional buttons are provided", function () {
        var secondaryArr = [
                { value: jest.fn(), label: "One" },
                { value: jest.fn(), label: "Two" }
            ],
            primaryArr = [
                { value: jest.fn(), label: "Save" },
                { value: jest.fn(), label: "Save More" },
            ];
        var component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip
                title="Buttons provided"
                label="Action"
                open={true}
                secondaryLabels={secondaryArr}
                primaryLabels={primaryArr}
                cancelLabel="Cancel">
                <p>What ever callout content is</p>
            </DetailsTooltip>
        );
        var saveBtn = TestUtils.scryRenderedDOMNodesWithClass(component, "primary"),
            cancelBtn = TestUtils.findRenderedDOMNodeWithDataId(component, "cancel-action"),
            secondaryBtns = TestUtils.scryRenderedDOMNodesWithTag(component, "button");

        expect(secondaryBtns).toBeTruthy();
        expect(saveBtn).toBeTruthy();
        expect(cancelBtn).toBeTruthy();

        // check length of buttons
        expect(saveBtn.length).toBe(2);
        expect(TestUtils.scryRenderedDOMNodesWithClass(component, "cancel").length).toBe(3);
        expect(secondaryBtns.length).toBe(4);

        // check button text
        expect(secondaryBtns[0].textContent).toBe("One");
        expect(secondaryBtns[1].textContent).toBe("Two");
        expect(cancelBtn.textContent).toBe("Cancel");
        expect(secondaryBtns[2].textContent).toBe("Save");
        expect(secondaryBtns[3].textContent).toBe("Save More");
    });

    it("is rendering with the right x-placement attribute based on the positionClass", function() {
        const positionedComponent = position => ReactTestUtils.renderIntoDocument(
            <DetailsTooltip
                stateless={true}
                title="Title"
                label="Action"
                open={true}
                positionClassName={position}
                flags={[ "use-portal" ]}
            >
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        const positioningProp = position => positionedComponent(position).refs.tooltip.popperContainer.props.placement;

        expect(positioningProp("top")).toBe("top-start");
        expect(positioningProp("bottom")).toBe("bottom-start");
        expect(positioningProp("top left")).toBe("top-end");
        expect(positioningProp("bottom left")).toBe("bottom-end");
        expect(positioningProp("top center")).toBe("top");
        expect(positioningProp("bottom center")).toBe("bottom");
    });

    it("is rendering with the right x-placement attribute based on the placement prop", function() {
        const positionedComponent = placement => ReactTestUtils.renderIntoDocument(
            <DetailsTooltip
                stateless={true}
                title="Title"
                label="Action"
                open={true}
                placement={placement}
                flags={[ "use-portal" ]}
            >
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        const positioningProp = position => positionedComponent(position).refs.tooltip.popperContainer.props.placement;

        expect(positioningProp("top right")).toBe("top-start");
        expect(positioningProp("bottom right")).toBe("bottom-start");
        expect(positioningProp("top left")).toBe("top-end");
        expect(positioningProp("bottom left")).toBe("bottom-end");
        expect(positioningProp("top")).toBe("top");
        expect(positioningProp("bottom")).toBe("bottom");
    });

    it("fires progressively stateful warning when p-stateful flag is not passed in", () => {
        console.warn = jest.fn();
        shallow(
            <DetailsTooltip flags={["use-portal"]} />
        );

        expect(console.warn).toHaveBeenCalledTimes(1);
    });

    it("fires Cannonball warning when use-portal isn't set", function() {
        console.warn = jest.fn();
        getComponent({ flags: ["p-stateful"] });
        expect(console.warn).toBeCalled();
    });

    it("doesn't fire Cannonball warning when use-portal and p-stateful are set", function() {
        console.warn = jest.fn();
        getComponent({ flags: [ "use-portal", "p-stateful" ] });
        expect(console.warn).not.toBeCalled();
    });

    it("fires cannonball warning when using positionClassName prop", function() {
        console.warn = jest.fn();
        shallow(
            <DetailsTooltip positionClassName="anything" />
        );

        expect(console.warn).toHaveBeenCalled();
    });

    it("shows alert style when type is 'alert'", function() {
        const component = ReactTestUtils.renderIntoDocument(
            <DetailsTooltip title="Title" label="Action" open={true} type="alert">
                <p>what ever callout content is</p>
            </DetailsTooltip>
        );

        //make sure root div got position CSS classes
        expect(TestUtils.findRenderedDOMNodeWithClass(component, "alert")).toBeTruthy();
    });

    it("fires cannonball warning when positionClassName is set to alert", () => {
        console.warn = jest.fn();
        shallow(
            <DetailsTooltip positionClassName="alert" />
        );

        expect(console.warn).toHaveBeenCalled();
    });

});
