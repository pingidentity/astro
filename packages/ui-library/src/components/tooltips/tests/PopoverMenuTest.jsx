window.__DEV__ = true;

jest.dontMock("../PopoverMenu");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Utils.js");

describe("PopoverMenu", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PopoverMenu = require("../PopoverMenu");

    var buttonCallback = jest.fn();
    var buttonData = [
        {
            label: "First",
            onClick: buttonCallback
        },
        {
            label: "Second",
            onClick: buttonCallback
        },
        {
            label: "Third",
            onClick: buttonCallback
        },
        {
            label: "Fourth",
            onClick: buttonCallback
        }
    ];

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    beforeEach(function() {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders open state", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <PopoverMenu label="hello" open={true} buttons={buttonData} />
            </div>
        );
        var buttons = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "button-menu__button"
        );

        expect(buttons.length).toBe(4);
    });

    it("notifies button callback and toggle when clicking menu button", function() {
        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <PopoverMenu
                    onToggle={callback}
                    label="hello"
                    open={true}
                    buttons={buttonData}
                />
            </div>
        );

        var button = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "button-menu__button"
        )[0];

        ReactTestUtils.Simulate.click(button, {});

        expect(buttonCallback).toBeCalled(); //make sure callback was triggered
        expect(callback).toBeCalled(); //make sure callback was triggered
    });

    it("doesn't error out if there's no event defined for a button", function() {
        var callback = jest.fn();

        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <PopoverMenu
                    onToggle={callback}
                    label="hello"
                    open={true}
                    buttons={[{ label: "label" }]}
                />
            </div>
        );

        var button = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "button-menu__button"
        )[0];

        ReactTestUtils.Simulate.click(button, {});

        expect(callback).toBeCalled(); //make sure callback was triggered
    });
});
