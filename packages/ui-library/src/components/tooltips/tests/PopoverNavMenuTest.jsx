window.__DEV__ = true;

jest.mock("popper.js");
jest.mock("react-portal");

jest.dontMock("../PopoverNavMenu");
jest.dontMock("../../../util/EventUtils.js");
jest.dontMock("../../../util/Utils.js");

describe("PopoverNavMenu", function() {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        PopoverNavMenu = require("../PopoverNavMenu");

    var itemData = [
        {
            label: "First",
            icon: "account"
        },
        {
            label: "Second",
            iconSrc: "junk"
        },
        {
            label: "Third",
        },
        {
            label: "Fourth",
        }
    ];

    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
    beforeEach(function() {
        window.addEventListener.mockClear();
        window.removeEventListener.mockClear();
    });

    it("renders open state with icons", function() {
        var component = ReactTestUtils.renderIntoDocument(
            <div>
                <PopoverNavMenu label="hello" open={true} items={itemData} />
            </div>
        );
        var icon = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "icon-account"
        );
        var icons = TestUtils.scryRenderedDOMNodesWithClass(
            component,
            "nav-menu__icon"
        );

        expect(icon.length).toBe(1);
        expect(icons.length).toBe(2);
    });

});
