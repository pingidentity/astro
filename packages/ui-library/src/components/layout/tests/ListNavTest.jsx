
describe("ListNav", function () {
    const React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        ListNav = require("../ListNav");


    const mockData = [
        {
            label: "English (en-US)",
            id: "one"
        },
        {
            label: "English (en-UK)",
            id: "two"
        },
        {
            label: "French (fr-FR)",
            id: "three"
        },
        {
            label: "French (fr-CA)",
            id: "four"
        },
        {
            label: "German (de-DE)",
            id: "five"
        },
        {
            label: "Chinese (zh-CN)",
            id: "six"
        }
    ];

    const componentId = "list-nav";

    function getListNav (opts) {
        const defaults = {
            "data-id": componentId,
            labels: mockData
        };

        return ReactTestUtils.renderIntoDocument(<ListNav {...defaults} {...opts} />);
    }

    it("renders component with data-id=list-nav", function () {
        const component = getListNav({});

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, componentId);

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });

    it("renders a label", function () {
        const myLabelText = "hello";
        const ericText = "eric";
        const component = getListNav({
            labels: [{ label: myLabelText }, { label: ericText }]
        });

        const element = TestUtils.scryRenderedDOMNodesWithClass(component, "list-nav-item__link");

        expect(element[0].textContent).toBe(myLabelText);
        expect(element[1].textContent).toBe(ericText);
    });

    it("renders a label and id", function () {
        const myLabelText = "hello";
        const myID = "seven";
        const component = getListNav({
            labels: [{ label: myLabelText, id: myID }]
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "list-nav-item__link");

        expect(element.textContent).toBe(myLabelText, myID);
    });

    it("calls the onSelect callback", function () {
        const callback = jest.fn();
        const component = getListNav({
            onSelect: callback
        });

        const tags = TestUtils.scryRenderedDOMNodesWithClass(component, "list-nav-item__link");

        expect(callback).not.toBeCalled();
        ReactTestUtils.Simulate.click(tags[1]);
        expect(callback).toBeCalled();

    });

    it("renders children", function () {
        const component = getListNav({
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "list-nav__content");

        expect(element).toBeTruthy();
    });

});