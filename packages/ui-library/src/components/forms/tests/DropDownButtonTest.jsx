window.__DEV__ = true;

jest.dontMock("../DropDownButton");
jest.dontMock("../../../util/EventUtils.js");

describe("DropDownButton", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        DropDownButton = require("../DropDownButton");

    it("renders closed in stateless mode", function () {
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                stateless={true}
                onValueChange={callback}
                options={menu}
                onToggle={jest.fn()}
                label="Add" />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "drop-down-button");
        expect(button.textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = TestUtils.scryRenderedDOMNodesWithDataId(dropDownButtonComponent, "menu");
        expect(menu.length).toEqual(0);
    });

    it("renders open in stateless mode", function () {
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={true}
                onValueChange={callback}
                options={menu}
                onToggle={jest.fn()} />
        );

        //expect menu to be rendered
        var menu = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "menu");

        var as = TestUtils.scryRenderedDOMNodesWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(3);
        expect(as[1].textContent).toEqual("Option One");
    });

    it("renders extra css classes", function () {
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                className="extra"
                stateless={true}
                open={true}
                onValueChange={callback}
                options={menu}
                onToggle={jest.fn()} />
        );

        //expect menu to be rendered
        var root = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "drop-down-button");

        expect(root.getAttribute("class")).toContain("extra");
    });

    it("triggers callback on toggle in stateless mode", function () {
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={false}
                onValueChange={jest.fn()}
                onToggle={callback}
                options={menu} />
        );

        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "action");

        ReactTestUtils.Simulate.click(button);

        //make callback was triggered
        expect(callback).toBeCalledWith(false);
    });


    it("test default render", function () {

        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Add" title="Test Drop Down"
                onValueChange={callback}
                options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "drop-down-button");
        expect(button.textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = TestUtils.scryRenderedDOMNodesWithDataId(dropDownButtonComponent, "menu");
        expect(menu.length).toEqual(0);

    });

    it("initially closed menu opened on click", function () {

        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                onValueChange={callback}
                options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "action");

        // expect no menu to be rendered.
        var menus = TestUtils.scryRenderedDOMNodesWithDataId(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "menu");
        TestUtils.findRenderedDOMNodeWithClass(menu, "menu");

        var as = TestUtils.scryRenderedDOMNodesWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(6);
        expect(as[1].textContent).toEqual("Option One");

        // click an option
        ReactTestUtils.Simulate.click(as[1]);

        // expect menu to have been hidden
        var noMenus = TestUtils.scryRenderedDOMNodesWithDataId(dropDownButtonComponent, "menu");
        expect(noMenus.length).toEqual(0);
    });

    it("will trigger callback on menu item click", function () {

        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                onValueChange={callback}
                options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "action");

        // expect no menu to be rendered.
        var menus = TestUtils.scryRenderedDOMNodesWithDataId(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "menu");
        TestUtils.findRenderedDOMNodeWithClass(menu, "menu");

        var as = TestUtils.scryRenderedDOMNodesWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(6);
        expect(as[1].textContent).toEqual("Option One");

        // click an option
        ReactTestUtils.Simulate.click(as[1]);

        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

    it("register global listeners on mount", function () {


        window.addEventListener = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={true}
                options={menu}
                onToggle={jest.fn()} />
        );

        expect(TestUtils.mockCallsContains(window.addEventListener, "click")).toEqual(true);
        expect(TestUtils.mockCallsContains(window.addEventListener, "keydown")).toEqual(true);
    });

    it("unregister global listeners on unmount", function () {

        window.removeEventListener = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={true}
                options={menu}
                onToggle={jest.fn()} />
        );

        //trigger unmount
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dropDownButtonComponent).parentNode);

        expect(TestUtils.mockCallsContains(window.removeEventListener, "click")).toEqual(true);
        expect(TestUtils.mockCallsContains(window.removeEventListener, "keydown")).toEqual(true);
    });

    it("triggers callback when clicked outside", function () {
        window.addEventListener = jest.fn();
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={true}
                onValueChange={jest.fn()}
                options={menu}
                onToggle={callback} />
        );

        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];


        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        //click outside
        handler(e);
        expect(callback).toHaveBeenCalled();
    });

    it("doesn't trigger callback when clicked outside and drop down is not open", function () {
        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={false}
                onValueChange={jest.fn()}
                options={menu}
                onToggle={callback} />
        );

        var handler = TestUtils.findMockCall(window.addEventListener, "click")[1];
        var e = {
            target: { parentNode: document.body },
            stopPropagation: jest.fn(),
            preventDefault: jest.fn()
        };

        //click outside
        handler(e);

        expect(callback).not.toBeCalled();
    });

    it("triggers callback when drop down is open and ESC pressed", function () {

        var globalKeyListener = TestUtils.captureGlobalListener("keyDown");

        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={true}
                onValueChange={jest.fn()}
                options={menu}
                onToggle={callback} />
        );

        //press ESC
        globalKeyListener({
            keyCode: 27
        });

        expect(callback).toBeCalled();
    });

    it("doesn't trigger callback when drop down is not open and ESC pressed", function () {

        var globalKeyListener = TestUtils.captureGlobalListener("keyDown");

        var callback = jest.fn();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton label="Test Drop Down"
                stateless={true}
                open={false}
                onValueChange={jest.fn()}
                options={menu}
                onToggle={callback} />
        );

        //press ESC
        globalKeyListener({
            keyCode: 27
        });

        expect(callback).not.toBeCalled();
    });

    it("renders title if provided", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down" options={{}} label="Add" />
        );

        // no title in collapsed mode
        var titles = TestUtils.scryRenderedDOMNodesWithDataId(component, "options-title");
        expect(titles.length).toBe(0);

        // toggle the drop down
        var toggle = TestUtils.findRenderedDOMNodeWithDataId(component, "action");
        ReactTestUtils.Simulate.click(toggle);

        var title = TestUtils.findRenderedDOMNodeWithDataId(component, "options-title");
        expect(title.textContent).toBe("Test Drop Down");
    });

    it("renders classname and data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DropDownButton options={{}} label="Add" data-id="my-id" className="my-class" />
        );

        var node = ReactDOM.findDOMNode(component);

        expect(node.getAttribute("data-id")).toBe("my-id");
        expect(node.getAttribute("class")).toContain("my-class");
    });

    it("render component with default data-id", function () {
        var component = ReactTestUtils.renderIntoDocument(
            <DropDownButton options={{}} label="Add" />
        );

        var element = TestUtils.findRenderedDOMNodeWithDataId(component, "drop-down-button");
        expect(element).toBeDefined();
    });

    it("renderButton renders correct content and passes toggle function", () => {
        const renderButton = ({
            onClick
        }) => <button data-id="render-button" onClick={onClick} />;

        const component = ReactTestUtils.renderIntoDocument(
            <DropDownButton
                label="Add"
                options={{
                    one: "one"
                }}
                renderButton={renderButton}
            />
        );

        const button = TestUtils.findRenderedDOMNodeWithDataId(component, "render-button");
        expect(button).toBeTruthy();

        ReactTestUtils.Simulate.click(button);

        const option = TestUtils.findRenderedDOMNodeWithDataId(component, "one");
        expect(option).toBeTruthy();
    });
});
