import React from "react";
import { mount } from "enzyme";
import Slider from "../Slider";

window.__DEV__ = true;

describe("Slider", () => {
    function getComponent({
        "dataid": dataId = "slider",
        ...props
    } = {}) {
        return mount(
            <Slider
                data-id={dataId}
                {...props}
            />
        );
    }

    it("renders the component", () => {
        const component = getComponent();
        expect(component.exists()).toEqual(true);
    });

    it("calls onDrag", () => {
        const testCallback = jest.fn();
        const component = getComponent({ onValueChange: testCallback });
        const draggable = component.find("Draggable");
        draggable.prop("onDrag")(undefined, { x: 100, y: 0 });

        expect(testCallback).toHaveBeenCalled();
    });

    it("gets correct value from onDrag", () => {
        const testCallback = jest.fn();
        const component = getComponent({ onValueChange: testCallback });
        const draggable = component.find("Draggable");
        draggable.prop("onDrag")(undefined, { x: 200, y: 0 });


        expect(testCallback).toHaveBeenCalledWith(20);
    });

    it("gets correct value from onDrag with custom max/min", () => {
        const testCallback = jest.fn();
        const component = getComponent({ max: 12, min: 2, onValueChange: testCallback });
        const draggable = component.find("Draggable");
        draggable.prop("onDrag")(undefined, { x: 200, y: 0 });


        expect(testCallback).toHaveBeenCalledWith(4);
    });

    it("gets correct position with defaultValue", () => {
        const testCallback = jest.fn();
        const component = getComponent({ defaultValue: 50, onValueChange: testCallback });
        const draggable = component.find("Draggable");


        expect(draggable.props().position).toEqual({ "x": 500, "y": 0 });
    });

    it("gets correct value for bounds", () => {
        const testCallback = jest.fn();
        const component = getComponent({ onValueChange: testCallback });
        const draggable = component.find("Draggable");
        draggable.prop("onDrag")(undefined, { x: 100, y: 0 });


        expect(draggable.props().bounds).toEqual({ left: 0, right: 1000 });
    });

    it("gets correct value for range bounds", () => {
        const testCallback = jest.fn();
        const component = getComponent({ defaultValue: [10, 50, 90], onValueChange: testCallback });
        const draggable = component.find("Draggable").at(1);
        // expect(draggable.debug()).toEqual(21)
        draggable.prop("onDrag")(undefined, { x: 100, y: 0 });


        expect(draggable.props().bounds).toEqual({ left: 110, right: 890 });
    });

    it("gets correct value for step grid", () => {
        const testCallback = jest.fn();
        const component = getComponent({ steps: 5, onValueChange: testCallback });
        const draggable = component.find("Draggable");


        expect(draggable.props().grid).toEqual([50, 0]);
    });

    it("gets correct value for step grid with custom max/min", () => {
        const testCallback = jest.fn();
        const component = getComponent({ max: 10, min: 0, steps: 5, onValueChange: testCallback });
        const draggable = component.find("Draggable");
        draggable.prop("onDrag")(undefined, { x: 1, y: 0 });


        expect(draggable.props().grid).toEqual([500, 0]);
    });

    it("gets default background", () => {
        const testCallback = jest.fn();
        const component = getComponent({ onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", "#f2f2f2");
    });

    it("gets correct value for background with single value", () => {
        const testCallback = jest.fn();
        const component = getComponent({ background: "green", onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", ("green"));
    });

    it("gets correct value for solid background with array values", () => {
        const testCallback = jest.fn();
        const component = getComponent({
            background: ["#a9d732", "#e2d714", "#e78726", "#eb2c38"],
            backgroundVariant: "solid",
            onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", (
            `linear-gradient(to right, #a9d732 0%, #a9d732 0%, #e2d714 0%, #e2d714 33.33333333333333%,\
 #e78726 33.33333333333333%, #e78726 66.66666666666666%, #eb2c38 66.66666666666666%, #eb2c38 100%`
        ));
    });

    it("gets correct value for solid background with custom point values", () => {
        const testCallback = jest.fn();
        const component = getComponent({
            background: [{ color: "#a9d732", point: 50 }, { color: "#eb2c38", point: 100 }],
            backgroundVariant: "solid",
            onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", (
            `linear-gradient(to right, #a9d732 0%, #a9d732 50%, #eb2c38 50%, #eb2c38 100%`
        ));
    });

    it("gets correct value for gradient background with array values", () => {
        const testCallback = jest.fn();
        const component = getComponent({
            background: ["#a9d732", "#e2d714", "#eb2c38"],
            backgroundVariant: "gradient",
            onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", (
            `linear-gradient(to right, #a9d732 0%, #e2d714 50%, #eb2c38 100%`
        ));
    });

    it("gets correct value for gradient background with custom point values", () => {
        const testCallback = jest.fn();
        const component = getComponent({ background: [{ color: "#a9d732", point: 10 },
            { color: "#e2d714", point: 30 },
            { color: "#e78726", point: 50 },
            { color: "#eb2c38", point: 70 }
        ],
        backgroundVariant: "gradient",
        onValueChange: testCallback });
        const innerDiv = component.find("div.slider");
        const componentStyle = innerDiv.get(0).props.style;


        expect(componentStyle).toHaveProperty("background", (
            `linear-gradient(to right, #a9d732 10%, #e2d714 30%, #e78726 50%, #eb2c38 70%`
        ));
    });
});
