import React from "react";
import { mount, shallow } from "enzyme";
import NodeGroup from "../NodeGroup";
import { justifyOptions } from "../../layout/FlexRow";

describe("NodeGroup", () => {
    const makeNodes = (count, idPrefix) => new Array(count).fill({
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
                isDivider: true
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
    }).map((node, index) => ({ ...node, id: `${idPrefix}-${index}` }));

    const defaultProps = {
        clusterWidth: 300,
        "data-id": "demo-node-group",
        nodeClusters: [
            {
                label: "Pantheon",
                nodes: makeNodes(17, "first-")
            },
            {
                label: "MilkyWay",
                nodes: makeNodes(32, "second-")
            },
            {
                label: "Mars",
                nodes: makeNodes(18, "third-")
            }
        ],
        onNodeClick: (id, e, node) => console.log("Node clicked!", id, e, node)
    };

    const getComponent = props => shallow(
        <NodeGroup {...defaultProps} {...props} />
    );

    it("renders the component", () => {
        const component = getComponent();

        expect(component.exists()).toEqual(true);
    });

    it("selects a node and shows a tooltip", () => {
        const component = getComponent();
        const field = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(false);
        expect(field.prop("selectedNodeId")).toBeUndefined();

        field.prop("onNodeClick")("first-one", { stopPropagation: () => {} }, makeNodes(1, "first")[0]);

        const clickedField = component.find("NodeField").first();

        // Really only doing the dives here to get coverage for getReference
        expect(component.find("Tooltip").dive().dive().exists()).toEqual(true);
        expect(clickedField.prop("selectedNodeId")).toEqual("first-0");
    });

    it("deselects on mouseLeave", () => {
        const component = getComponent();
        const field = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(false);
        expect(field.prop("selectedNodeId")).toBeUndefined();

        field.prop("onNodeClick")("first-one", { stopPropagation: () => {} }, makeNodes(1, "first")[0]);

        const clickedField = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(true);
        expect(clickedField.prop("selectedNodeId")).toEqual("first-0");

        component.find(".node-group").simulate("mouseLeave");

        const mouseLeaveField = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(false);
        expect(mouseLeaveField.prop("selectedNodeId")).toBeUndefined();
    });

    it("deselects on clicking anything other than the node outside container", () => {
        const component = getComponent();
        const field = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(false);
        expect(field.prop("selectedNodeId")).toBeUndefined();

        field.prop("onNodeClick")("first-one", { stopPropagation: () => {} }, makeNodes(1, "first")[0]);

        const clickedField = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(true);
        expect(clickedField.prop("selectedNodeId")).toEqual("first-0");

        component.find(".node-group").simulate("click");

        const mouseLeaveField = component.find("NodeField").first();

        expect(component.find("Tooltip").exists()).toEqual(false);
        expect(mouseLeaveField.prop("selectedNodeId")).toBeUndefined();
    });

    it("gives tooltip left placement for last group", () => {
        const component = getComponent();
        const field = component.find("NodeField").last();

        field.prop("onNodeClick")("first-one", { stopPropagation: () => {} }, makeNodes(1, "first")[0]);

        expect(component.find("Tooltip").prop("placement")).toEqual("left");
    });

    it("gives the tooltip right placement for other groups", () => {
        const component = getComponent();
        const field = component.find("NodeField").first();

        field.prop("onNodeClick")("first-one", { stopPropagation: () => {} }, makeNodes(1, "first")[0]);

        expect(component.find("Tooltip").prop("placement")).toEqual("right");
    });

    // Doing a mount on these ones because the NodeGroup passes some relevant information to the nodes
    // that it later uses to decide whether to toss all of them into the tooltip.
    it("passes only selected node to tooltip for clusters greater than three", () => {
        const component = mount(
            <NodeGroup
                {...defaultProps}
                nodeClusters={[
                    {
                        label: "Pantheon",
                        nodes: makeNodes(3, "first-")
                    },
                    {
                        label: "MilkyWay",
                        nodes: makeNodes(32, "second-")
                    },
                    {
                        label: "Mars",
                        nodes: makeNodes(18, "third-")
                    }
                ]}
            />
        );
        const field = component.find("NodeField").last();
        field.find(".node-field__node").first().simulate("click");

        expect(component.find("Tooltip").prop("nodes").length).toEqual(1);
    });

    it("passes all nodes to tooltip for three node cluster", () => {
        const component = mount(
            <NodeGroup
                {...defaultProps}
                nodeClusters={[
                    {
                        label: "Pantheon",
                        nodes: makeNodes(3, "first-")
                    },
                    {
                        label: "MilkyWay",
                        nodes: makeNodes(32, "second-")
                    },
                    {
                        label: "Mars",
                        nodes: makeNodes(18, "third-")
                    }
                ]}
            />
        );
        const field = component.find("NodeField").first();
        field.find(".node-field__node").first().simulate("click");

        expect(component.find("Tooltip").prop("nodes").length).toEqual(3);
    });

    it("doesn't render label if cluster doesn't have a label property", () => {
        const component = mount(
            <NodeGroup
                {...defaultProps}
                nodeClusters={[
                    {
                        nodes: makeNodes(3, "first-")
                    }
                ]}
            />
        );

        expect(component.find("Label").exists()).toEqual(false);
    });

    it("justifies the clusters to the center when there's only one", () => {
        const component = getComponent({
            nodeClusters: [
                {
                    nodes: makeNodes(1, "first-")
                }
            ]
        });

        expect(component.find("ForwardRef").prop("justify")).toEqual(justifyOptions.CENTER);
    });

    it("justifies the clusters as space between when there's more than one", () => {
        const component = getComponent({
            nodeClusters: [
                {
                    nodes: makeNodes(1, "first-")
                },
                {
                    nodes: makeNodes(1, "second-")
                },
            ]
        });

        expect(component.find("ForwardRef").prop("justify")).toEqual(justifyOptions.SPACEBETWEEN);
    });
});