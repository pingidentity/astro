window.__DEV__ = true;

jest.dontMock("../../../testutil/TestUtils");
jest.dontMock("../DropDownButton.jsx");
jest.dontMock("underscore");

describe("DropDownButton", function () {

    var React = require("react/addons"),
        ReactTestUtils = React.addons.TestUtils,
        TestUtils = require("../../../testutil/TestUtils"),
        DropDownButton = require("../DropDownButton.jsx");

    it("renders closed in stateless mode", function () {
        var callback = jest.genMockFunction();

        var menu = {
            optionOne: "Option One",
            optionTwo: "Option Two",
        };

        var dropDownButtonComponent = ReactTestUtils.renderIntoDocument(
            <DropDownButton title="Test Drop Down"
                            controlled={true}
                            onSelect={callback}
                            options={menu} />
        );

        // expect a single button to be rendered.
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "input-menu-button");
        expect(button.getDOMNode().textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = ReactTestUtils.scryRenderedDOMComponentsWithClass(dropDownButtonComponent, "menu");
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
                            options={menu} />
        );

        //expect menu to be rendered
        var menu = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "menu");
        ReactTestUtils.findRenderedDOMComponentWithClass(menu, "menu");

        var as = ReactTestUtils.scryRenderedDOMComponentsWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(3);
        expect(as[1].getDOMNode().textContent).toEqual("Option One");
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
                            onToggle={callback}
                            options={menu} />
        );

        var button = TestUtils.findRenderedDOMComponentWithDataId(dropDownButtonComponent, "action");

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
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "input-menu-button");
        expect(button.getDOMNode().textContent).toBe("Add");

        // expect no modal to be rendered.
        var menu = ReactTestUtils.scryRenderedDOMComponentsWithClass(dropDownButtonComponent, "menu");
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
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "add button inline");

        // expect no menu to be rendered.
        var menus = ReactTestUtils.scryRenderedDOMComponentsWithClass(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "menu");
        ReactTestUtils.findRenderedDOMComponentWithClass(menu, "menu");

        var as = ReactTestUtils.scryRenderedDOMComponentsWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(6);
        expect(as[1].getDOMNode().textContent).toEqual("Option One");

        // click an option
        ReactTestUtils.Simulate.click(as[1]);

        // expect menu to have been hidden
        var noMenus = ReactTestUtils.scryRenderedDOMComponentsWithClass(dropDownButtonComponent, "menu");
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
        var button = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "add button inline");

        // expect no menu to be rendered.
        var menus = ReactTestUtils.scryRenderedDOMComponentsWithClass(dropDownButtonComponent, "menu");
        expect(menus.length).toEqual(0);

        ReactTestUtils.Simulate.click(button);

        // expect a menu to be rendered after click.
        var menu = ReactTestUtils.findRenderedDOMComponentWithClass(dropDownButtonComponent, "menu");
        ReactTestUtils.findRenderedDOMComponentWithClass(menu, "menu");

        var as = ReactTestUtils.scryRenderedDOMComponentsWithTag(dropDownButtonComponent, "a");

        // make sure <a>s in a list, +1 length for button
        expect(as.length).toBe(6);
        expect(as[1].getDOMNode().textContent).toEqual("Option One");

        // click an option
        ReactTestUtils.Simulate.click(as[1]);

        //make sure callback was triggered
        expect(callback).toBeCalled();
    });

});
