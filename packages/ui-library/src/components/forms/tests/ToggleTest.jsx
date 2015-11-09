
jest.dontMock("underscore");
jest.dontMock("../Toggle.jsx");
jest.dontMock("classnames");
jest.dontMock("../../../testutil/TestUtils");


describe("Toggle", function () {
    var React = require("react/addons");
    var ReactTestUtils = React.addons.TestUtils;
    var TestUtils = require("../../../testutil/TestUtils");
    var Toggle = require("../Toggle.jsx");

    /*
     * Test toggling intital state the toggle on and
     * ensuring the rendered toggle to be selected.
     */
    it("Render initial state toggled on", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle toggled={true} id="toggle" />
        );

        // Expect a single toggle to be rendered.
        var toggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggles.length).toEqual(1);

        // Expect the rendered toggle to be selected.
        var selectedToggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(selectedToggles.length).toEqual(1);
    });

    /*
     * Test toggling the extra css className attribute
     * is rendered.
     */
    it("render extra css classes", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle className="small" id="toggle" />
        );

        // Expect a single toggle to be rendered.
        var toggle = TestUtils.findRenderedDOMComponentWithDataId(toggleComponent, "toggle");

        // Expect the rendered toggle to be selected.
        var className = toggle.getDOMNode().getAttribute("class");
        expect(className).toContain("small");
    });

    /*
     * Test toggling intital state the toggle on and
     * ensuring the rendered toggle to be selected.
     */
    it("Render initial state toggled off", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle toggled={false} id="toggle" />
        );

        // Expect a single toggle to be rendered.
        var toggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggles.length).toEqual(1);

        // Expect the rendered toggle to be unselected.
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toEqual(0);
    });

    /*
     * Test toggling props.value over state.
     */
    it("prefers props.value over state", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle value={true} id="toggle" />
        );

        // Expect a single toggle to be rendered.
        var toggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggles.length).toEqual(1);

        // Expect the rendered toggle to be unselected.
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toEqual(1);
    });

    /*
     * Test toggling default state toggled off and
     * ensuring the rendered toggle to be unselected.
     */
    it("Render default state toggled off", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle id="toggle" />
        );

        // Expect a single toggle to be rendered.
        var toggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggles.length).toBe(1);

        // Expect the rendered toggle to be unselected.
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(0);
    });

    /*
     * Test toggling the toggle on, off, and on again,
     * ensuring the toggle state is changed and the
     * callback is called each time.
     */
    it("Test toggle on,off,on", function () {
        var callback = jest.genMockFunction();
        callback.mockReturnValue(true);
        var paramObj = {
            someObj: 5
        };

        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle onToggle={callback} paramObj={paramObj} id="toggle" />
        );

        var toggle = TestUtils.findRenderedDOMComponentWithDataId(toggleComponent, "toggle");
        expect(toggle).not.toBeNull();

        // Expect initially untoggled
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(0);

        // Callback should not have been called yet
        expect(callback.mock.calls.length).toBe(0);

        // Click the toggle to active it
        ReactTestUtils.Simulate.click(toggle);

        // Expect the toggle to now be toggled after the click
        selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(1);

        // Expect the callback to have been called exactly once,
        // and with our paramObj as a parameter
        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(true);
        expect(callback.mock.calls[0][1]).toBe(paramObj);

        // Click the toggle again to make sure it works both ways
        ReactTestUtils.Simulate.click(toggle);

        // Expect the toggle to now be toggled off again
        selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(0);

        // Expect the callback to have been called exactly twice,
        // and with our paramObj as the parameter the second time as well.
        expect(callback.mock.calls.length).toBe(2);
        expect(callback.mock.calls[1][0]).toBe(false);
        expect(callback.mock.calls[1][1]).toBe(paramObj);

        // -------------------------------------
        // And lets make sure we can toggle it back on again, just to be sure
        ReactTestUtils.Simulate.click(toggle);

        // Expect the toggle to now be toggled after the click
        selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(1);

        // Expect the callback to have been called exactly 3 times,
        // and with our paramObj as a parameter
        expect(callback.mock.calls.length).toBe(3);
        expect(callback.mock.calls[2][0]).toBe(true);
        expect(callback.mock.calls[2][1]).toBe(paramObj);

    });

    /*
     * Test that a callback returning false prevents
     * the toggle from toggling.
     */
    it("Test callback can prevent toggle", function () {
        var callback = jest.genMockFunction();
        callback.mockReturnValue(false);

        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle onToggle={callback} id="toggle" />
        );

        var toggle = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggle).not.toBeNull();

        // Expect initially untoggled
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(0);

        // Click the toggle to active it
        ReactTestUtils.Simulate.click(toggle);

        // Expect the toggle to not be toggled after the click
        // since the callback returned false.
        selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(0);

    });

    /*
     * Test that a callback using props.value over self state
     */
    it("callback using props.value over self state", function () {
        var callback = jest.genMockFunction();
        callback.mockReturnValue(true);

        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle onToggle={callback} value={true} id="toggle" />
        );

        var toggle = TestUtils.findRenderedDOMComponentWithDataId(toggleComponent, "toggle");
        expect(toggle).not.toBeNull();

        // Expect initially toggled
        var selectedToggles = ReactTestUtils.scryRenderedDOMComponentsWithClass(toggleComponent, "selected");
        expect(selectedToggles.length).toBe(1);

        // Click the toggle to deactivate it
        ReactTestUtils.Simulate.click(toggle);

        expect(callback.mock.calls.length).toBe(1);
        expect(callback.mock.calls[0][0]).toBe(false);
    });

    /*
     * Test toogle default data-id is set to 'toggle'
     */
    it("Test toggle default data-id generated", function () {
        var toggleComponent = ReactTestUtils.renderIntoDocument(
            <Toggle toggled={true} />
        );

        // Expect a single toggle to be rendered.
        var toggles = TestUtils.scryRenderedDOMComponentsWithDataId(toggleComponent, "toggle");
        expect(toggles.length).toEqual(1);
    });
});
