window.__DEV__ = true;

import { shallow } from "enzyme";
import { mountSnapshotDataIds } from "../../../devUtil/EnzymeUtils";
import { iconSizes, iconTypes } from "../Icon";

describe("Icon", function () {
    var React = require("react"),
        ReactTestUtils = require("react-dom/test-utils"),
        TestUtils = require("../../../testutil/TestUtils"),
        Icon = require("../Icon");

    const getComponent = (props) => {
        /*
        NOTE: Pure components must be wrapped in an element (div or whatever) so that Jest can properly render the
        component. Jest will return the component as null if this is not done.
        */
        return ReactTestUtils.renderIntoDocument(<div><Icon {...props} /></div>);
    };

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <Icon
                iconName="globe"
                title="I AM A VERY COMPELLING TITLE"
            />
        );
    });

    it("renders the component", function () {
        var dataId = "myicon",
            childContent = "Some child content",
            iconName = "cog",
            component = getComponent({
                "data-id": dataId,
                iconName: iconName,
                children: childContent
            }),
            iconContainer = TestUtils.findRenderedDOMNodeWithDataId(component, dataId),
            iconGraphic = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-graphic"),
            iconContent = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-content");

        expect(iconContainer).toBeDefined();
        expect(iconGraphic).toBeDefined();
        expect(iconContent).toBeDefined();

        expect(iconGraphic.className).toContain("icon-" + iconName);
        expect(iconContent.textContent).toBe(childContent);
    });

    it("renders the inline version of the component", function () {
        const dataId = "myicon";
        const component = getComponent({ "data-id": dataId, iconName: "cog", type: iconTypes.INLINE });
        const element = TestUtils.findRenderedDOMNodeWithDataId(component, dataId);
        const noElement = TestUtils.findRenderedDOMNodeWithDataId(component, dataId + "-graphic");

        expect(element).toBeTruthy();
        expect(noElement).toBeFalsy();
    });

    it("renders component with correct and expects iconSize to be rendered", function () {
        const dataId = "icon";
        const childContent = <div />;
        const component = getComponent({
            iconSize: iconSizes.XL,
            dataId,
            children: childContent,
        });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "icon");
        const icon = TestUtils.findRenderedDOMNodeWithClass(component, "icon__graphic");

        expect(element).toBeTruthy();
        expect(icon.className).toContain("xl");
    });

    it("renders inline icon with correct size", () => {
        const component = shallow(
            <Icon
                iconName="globe"
                iconSize={iconSizes.SM}
                type={iconTypes.INLINE}
            />
        ).dive();

        expect(component.find(".icon--size-sm").exists()).toEqual(true);
    });

    it("fires cannonball warning if type isn't set and there are no children", function() {
        console.warn = jest.fn();
        expect(console.warn).not.toBeCalled();
        getComponent();
        expect(console.warn).toBeCalled();
    });

    it("renders title if that prop is passed in", () => {
        const component = shallow(
            <Icon iconName="globe" title="Test" />
        ).dive();

        const label = component.find("label");

        expect(label.exists()).toEqual(true);
        expect(label.text()).toEqual("Test");
    });

    it("renders with a tabIndex of 0 if onClick is passed in", () => {
        const click = () => console.log("QUACK QUACK QUACK");
        const component = shallow(
            <Icon iconName="globe" onClick={click} />
        ).dive();

        expect(component.props().tabIndex).toEqual(0);
    });
});
