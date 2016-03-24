window.__DEV__ = true;

jest.dontMock("../DropDownButton.jsx");
jest.dontMock("../../../util/EventUtils.js");

describe("DropDownButton", function () {

    var React = require("react"),
        ReactDOM = require("react-dom"),
        ReactTestUtils = require("react-addons-test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        DropDownButton = require("../DropDownButton.jsx");

    it("renders closed in stateless mode", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            onSelect={callback}
                            options={menu}
                            onToggle={jest.genMockFunction()} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "input-menu-button");
        expect(button.textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = TestUtils.scryRenderedDOMNodesWithClass(dropDownButtonComponent, "menu");
        expect(menu.length).toEqual(0);
    });

    it("renders open in stateless mode", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={true}
                            onSelect={callback}
                            options={menu}
                            onToggle={jest.genMockFunction()} />
        );

        //expect menu to be rendered
        var menu = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "menu");
        TestUtils.findRenderedDOMNodeWithClass(menu, "menu");

        var as = TestUtils.scryRenderedDOMNodesWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(3);
        expect(as[1].textContent).toEqual("Option One");
    });

    it("renders extra css classes", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            className="extra"
                            controlled={true}
                            open={true}
                            onSelect={callback}
                            options={menu}
                            onToggle={jest.genMockFunction()} />
        );

        //expect menu to be rendered
        var root = TestUtils.findRenderedDOMNodeWithDataId (dropDownButtonComponent, "drop-down-button");

        expect(root.getAttribute("class")).toContain("extra");
    });

    it("triggers callback on toggle in stateless mode", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={false}
                            onSelect={jest.genMockFunction()}
                            onToggle={callback}
                            options={menu} />
        );

        var button = TestUtils.findRenderedDOMNodeWithDataId(dropDownButtonComponent, "action");

        ReactTestUtils.Simulate.click(button);

        //make callback was triggered
        expect(callback).toBeCalledWith(false);
    });


    it("test default render", function () {

        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            onSelect={callback}
                            options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "input-menu-button");
        expect(button.textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = TestUtils.scryRenderedDOMNodesWithClass(dropDownButtonComponent, "menu");
        expect(menu.length).toEqual(0);

    });

    it("initially closed menu opened on click", function () {

        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            onSelect={callback}
                            options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "add button inline");

        // expect no menu to be rendered.
        var menus = TestUtils.scryRenderedDOMNodesWithClass(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "menu");
        TestUtils.findRenderedDOMNodeWithClass(menu, "menu");

        var as = TestUtils.scryRenderedDOMNodesWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(6);
        expect(as[1].textContent).toEqual("Option One");

        // click an option
        ReactTestUtils.Simulate.click(as[1]);

        // expect menu to have been hidden
        var noMenus = TestUtils.scryRenderedDOMNodesWithClass(dropDownButtonComponent, "menu");
        expect(noMenus.length).toEqual(0);
    });

    it("will trigger callback on menu item click", function () {

        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
            optionThree: "Option Three",
            optionFour: "Option Four",
            optionFive: "Option Five"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            onSelect={callback}
                            options={menu} />
        );

        // expect a single button to be rendered.
        var button = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "add button inline");

        // expect no menu to be rendered.
        var menus = TestUtils.scryRenderedDOMNodesWithClass(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = TestUtils.findRenderedDOMNodeWithClass(dropDownButtonComponent, "menu");
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

        window.addEventListener = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={true}
                            options={menu}
                            onToggle={jest.genMockFunction()} />
        );

        expect(window.addEventListener.mock.calls.length).toBe(2);
        expect(window.addEventListener.mock.calls[0][0]).toEqual("click");
        expect(window.addEventListener.mock.calls[1][0]).toEqual("keydown");
    });

    it("unregister global listeners on unmount", function () {

        window.removeEventListener = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={true}
                            options={menu}
                            onToggle={jest.genMockFunction()} />
        );

        //trigger unmount
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(dropDownButtonComponent).parentNode);

        expect(window.removeEventListener.mock.calls.length).toBe(2);
        expect(window.removeEventListener.mock.calls[0][0]).toEqual("click");
        expect(window.removeEventListener.mock.calls[1][0]).toEqual("keydown");
    });

    it("triggers callback when clicked outside", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={true}
                            onSelect={jest.genMockFunction()}
                            options={menu}
                            onToggle={callback} />
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

    it("triggers callback when ESC pressed", function () {

        var globalKeyListener = TestUtils.captureGlobalListener("keyDown");

        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two"
        };

        ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            open={true}
                            onSelect={jest.genMockFunction()}
                            options={menu}
                            onToggle={callback} />
        );

        //press ESC
        globalKeyListener({
            keyCode: 27
        });

        expect(callback).toBeCalled();
    });


});
