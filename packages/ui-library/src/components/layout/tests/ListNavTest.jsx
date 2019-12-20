
import { shallow } from "enzyme";
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
            labels: mockData,
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
            listButton: "heyyyy",
            labels: [{ label: myLabelText }, { label: ericText }]
        });

        const element = TestUtils.scryRenderedDOMNodesWithClass(component, "list-nav-item__link");

        expect(element[0].textContent).toBe(myLabelText);
        expect(element[1].textContent).toBe(ericText);
    });

    it("renders a label and id", function () {
        const myLabelText = "hello";
        const myID = "seven";
        const secondLabel = "hey";
        const secondId = "second";
        const component = getListNav({
            listButton: "heyyyy",
            labels: [{ label: myLabelText, id: myID }, { label: secondLabel, id: secondId }]
        });

        const element = TestUtils.scryRenderedDOMNodesWithClass(component, "list-nav-item__link");

        expect(element[0].textContent).toBe(myLabelText, myID);
        expect(element[1].textContent).toBe(secondLabel, secondId);
    });

    it("does not render listnav if there is 1 label", function () {
        const myLabelText = "hello";
        const myID = "seven";
        const component = getListNav({
            labels: [{ label: myLabelText, id: myID }]
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "list-nav-item__link");

        expect(element).toBe(null);

    });

    it("updates selected item", function () {
        let clickedOn;

        const wrapper = shallow(
            <ListNav
                onSelect={(id) => {clickedOn = id;}}
                labels={mockData}
                selectedLabel={mockData[0].id}
            />
        );

        const labels = wrapper.find(".list-nav-item__link");
        const selected = wrapper.find(".list-nav-item--selected .list-nav-item__link");

        expect(selected.text()).toEqual(mockData[0].label);

        labels.at(3).simulate("click");
        expect(clickedOn).toEqual(mockData[3].id);

        wrapper.setProps({ selectedLabel: clickedOn });

        const newSelected = wrapper.find(".list-nav-item--selected .list-nav-item__link");

        expect(newSelected.text()).toEqual(mockData[3].label);


    });

    it("calls the onSelect callback", function () {
        const callback = jest.fn();
        const component = getListNav({
            onSelect: callback,
            listButton: "heyyyy"
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
