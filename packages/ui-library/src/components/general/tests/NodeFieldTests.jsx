import React from "react";
import { mount, shallow } from "enzyme";
import NodeField, { Container, Label, Tooltip } from "../NodeField";

describe("NodeField", () => {
    const nodeProps = {
        label: "A Node",
        values: [
            {
                label: "Node Index",
                value: 121413
            },
            {
                label: "IP Address",
                value: "10.1.232.123"
            },
            {
                label: "Version",
                value: "1.0.3"
            },
            {
                label: "Node Index",
                value: 121413
            },
            {
                label: "Tags",
                value: [
                    "EastDataCenter",
                    "WestDataCenter",
                    "NorthDataCenter",
                    "SouthDataCenter",
                    "GalaxyDataCenter",
                    "UniverseDataCenter"
                ]
            },
            {
                label: "Tags",
                value: [
                    "EastDataCenter",
                    "WestDataCenter",
                    "NorthDataCenter",
                    "SouthDataCenter",
                    "GalaxyDataCenter",
                    "UniverseDataCenter"
                ]
            }
        ]
    };

    const makeNodes = (count, idPrefix) =>
        new Array(count)
            .fill(nodeProps)
            .map((node, index) => ({ ...node, id: `${idPrefix}-${index}` }));

    const defaultProps = {
        nodes: makeNodes(32, "node"),
        width: 300
    };

    const shallowMountComponent = props => shallow(
        <NodeField {...defaultProps} {...props} />
    );

    const mountComponent = props => mount(
        <NodeField {...defaultProps} {...props} />
    );

    it("renders the component", () => {
        const component = mountComponent();

        expect(component.exists()).toEqual(true);
    });

    it("displays a tooltip when node is moused over", () => {
        const component = shallowMountComponent();
        // This shows up as ForwardRef rather than Node in the tree.
        const node = component.find("ForwardRef").first().dive();

        expect(component.find("Tooltip").exists()).toEqual(false);

        node.prop("onMouseOver")({ clientX: 0, clientY: 0 });

        const container = component.find("Tooltip").dive();
        expect(container.exists()).toEqual(true);
    });

    it("hides tooltip on mouse out", () => {
        const component = shallowMountComponent();
        // This shows up as ForwardRef rather than Node in the tree.
        const node = component.find("ForwardRef").first().dive();

        expect(component.find("Tooltip").exists()).toEqual(false);

        node.prop("onMouseOver")({ clientX: 0, clientY: 0 });
        expect(component.find("Tooltip").exists()).toEqual(true);

        node.prop("onMouseOut")();
        expect(component.find("Tooltip").exists()).toEqual(false);
    });

    it("onNodeClick is called on click", () => {
        const onNodeClick = jest.fn();
        const component = mountComponent({
            onNodeClick
        });

        expect(onNodeClick).not.toHaveBeenCalled();
        const node = component.find("[data-id=\"node_node-1\"]");
        node.simulate("click");

        expect(onNodeClick).toHaveBeenCalled();
    });

    it("renders the Label", () => {
        const component = shallow(<Label>I CANNOT BE CONTAINED</Label>);

        expect(component.exists()).toEqual(true);
    });

    describe("Container", () => {
        it("renders the component", () => {
            const component = shallow(<Container>I HAVE BEEN CONTAINED</Container>);

            expect(component.exists()).toEqual(true);
        });

        it("renders with divider class if hasDivider is true", () => {
            const component = shallow(<Container hasDivider>I HAVE BEEN CONTAINED</Container>);

            expect(component.find(".node-field__container--divider").exists()).toEqual(true);
        });

        it("does not render with divider class if hasDivider is false", () => {
            const component = shallow(<Container hasDivider={false}>I HAVE BEEN CONTAINED</Container>);

            expect(component.find(".node-field__container--divider").exists()).toEqual(false);
        });
    });

    describe("Tooltip", () => {
        const defaultTooltipProps = {
            nodes: [nodeProps],
            getReference: jest.fn()
        };
        it("renders the Tooltip", () => {
            const component = shallow(<Tooltip {...defaultTooltipProps} />);

            expect(component.exists()).toEqual(true);
        });

        it("renders divider between nodes", () => {
            const component = shallow(<Tooltip {...defaultTooltipProps} nodes={[nodeProps, nodeProps]} />);

            const divider = component.find(".node-field__tooltip-divider");

            expect(divider.exists()).toEqual(true);
        });
    });
});