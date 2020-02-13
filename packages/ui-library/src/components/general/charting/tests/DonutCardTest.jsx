import React from "react";
import _ from "underscore";
import { shallow } from "enzyme";
import { mountSnapshotDataIds } from "../../../../devUtil/EnzymeUtils";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "../../../../testutil/TestUtils";
import DonutCard from "../DonutCard";


describe("DonutCard", function () {

    const defaultProps = {
        "data-id": "donut-card",
        data: [
            { id: "Enabled Users", value: 120543 , color: "#E12F51" },
            { id: "Inactive Users", value: 51233 },
            { id: "Disabled Users", value: 3000 },
        ],
        options: [
            { label: "Current", value: "1" },
            { label: "30 DAYS", value: "2" },
            { label: "60 DAYS", value: "3" },
            { label: "90 DAYS", value: "4" },
        ]
    };

    const getPieChart = props => {
        // Node props in Enzyme don't shallow mount on their own, so you have to
        // do this malarkey.
        const Wrapper = () => shallow(<DonutCard {...defaultProps} {...props}/>).prop("front");
        const Chart = () => shallow(<Wrapper />).prop("chart");

        return shallow(<Chart />);
    };

    function getComponent (opts) {
        const withDefaults = _.defaults(opts || {}, defaultProps);

        return ReactTestUtils.renderIntoDocument(<DonutCard {...withDefaults} />);
    }

    it("data-id's don't change", () => {
        mountSnapshotDataIds(
            <DonutCard
                data={[
                    { id: "Enabled Users", value: 120543 , color: "#E12F51" },
                    { id: "Inactive Users", value: 51233 },
                    { id: "Disabled Users", value: 3000 },
                ]}
                options={[
                    { label: "Current", value: "1" },
                    { label: "30 DAYS", value: "2" },
                    { label: "60 DAYS", value: "3" },
                    { label: "90 DAYS", value: "4" },
                ]}
            />
        );
    });

    it("rendered component with data-id=donut-card", function () {
        const component = getComponent({
        });

        const element = TestUtils.findRenderedDOMNodeWithDataId(component, "donut-card");

        expect(ReactTestUtils.isDOMComponent(element)).toBeTruthy();
    });


    it("renders a label and number", function () {
        const chart = getPieChart({ label: "Title", value: "3" });

        const Center = () => chart.prop("centerValue");

        expect(shallow(<Center />).prop("children")).toEqual("3");
    });

    it("renders value correctly when greater than 1,000", function () {
        const component = getPieChart({
            label: "Title",
            value: "1234"
        });

        const Center = () => component.prop("centerValue");

        expect(shallow(<Center />).prop("children")).toEqual("1.23k");
    });

    it("renders value correctly when greater than 10,000", function () {
        const component = getPieChart({
            label: "Title",
            value: "12345"
        });

        const Center = () => component.prop("centerValue");

        expect(shallow(<Center />).prop("children")).toEqual("12.3k");
    });

    it("renders value correctly when greater than 100,000", function () {
        const component = getPieChart({
            label: "Title",
            value: "123456"
        });

        const Center = () => component.prop("centerValue");

        expect(shallow(<Center />).prop("children")).toEqual("123k");
    });

    it("renders value correctly when than 1,000,000", function () {
        const component = getPieChart({
            label: "Title",
            value: "1234567"
        });

        const Center = () => component.prop("centerValue");

        expect(shallow(<Center />).prop("children")).toEqual("1.23m");
    });

    it("renders a path", function() {
        const component = getComponent({});
        component.setState({ hoveredSection: "Enabled Users" });

        const element = TestUtils.findRenderedDOMNodeWithClass(component, "donut-card__hovered");

        expect(element).toBeDefined();
    });

    it("calls onMouseOver function with correct arguments when mouse over happens", () => {
        const onMouseOver = jest.fn();
        const dataWithColors = [
            { id: "Enabled Users", value: 120543, color: "#E12F51" },
            { id: "Inactive Users", value: 51233, color: "#E12F52" },
            { id: "Disabled Users", value: 3000, color: "#E12F513" },
        ];
        const chart = getPieChart({
            data: dataWithColors,
            onMouseOver
        });


        const fakeEvent = { preventDefault: () => {} };

        chart.prop("onMouseOver")(dataWithColors[1], 1, fakeEvent);

        expect(onMouseOver).toHaveBeenCalledWith(fakeEvent, dataWithColors[1]);
    });

    it("calls onMouseOut function with correct arguments when mouse out happens", () => {
        const onMouseOut = jest.fn();
        const dataWithColors = [
            { id: "Enabled Users", value: 120543, color: "#E12F51" },
            { id: "Inactive Users", value: 51233, color: "#E12F52" },
            { id: "Disabled Users", value: 3000, color: "#E12F513" },
        ];
        const chart = getPieChart({
            data: dataWithColors,
            onMouseOut
        });

        const fakeEvent = { preventDefault: () => {} };

        chart.prop("onMouseOut")(dataWithColors[1], 1, fakeEvent);

        expect(onMouseOut).toHaveBeenCalledWith(fakeEvent, dataWithColors[1]);
    });

    it("renders selected cell with the proper styling", () => {
        const component = getPieChart();

        const renderCell = component.prop("renderCell");

        const FakeComponent = () => renderCell({ selected: true, fill: "gross" }, props => <svg {...props} />);
        const mountedFake = shallow(<FakeComponent />);

        expect(mountedFake.prop("strokeWidth")).toEqual(2);
        expect(mountedFake.prop("stroke")).toEqual("gross");
    });

    it("renders non-selected cells with proper styling", () => {
        const component = getPieChart();

        const renderCell = component.prop("renderCell");

        const FakeComponent = () => renderCell({ selected: false, fill: "gross" }, props => <svg {...props} />);
        const mountedFake = shallow(<FakeComponent />);

        expect(mountedFake.prop("strokeWidth")).not.toEqual(2);
        expect(mountedFake.prop("stroke")).not.toEqual("gross");
    });
});