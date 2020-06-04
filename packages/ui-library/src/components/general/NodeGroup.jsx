import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import classnames from "classnames";
import FlexRow, { alignments, justifyOptions } from "../layout/FlexRow";
import * as NodeField from "./NodeField";

/**
 * @class NodeGroup
 * @desc A set of up to three NodeFields, layed out horizontally.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object[]} [nodeClusters]
 *   The groups of nodes that will be rendered as node fields.
 * @param {string} nodeClusters.label
 *   The label for the cluster, shown below the field.
 * @param {Object[]} [nodeClusters.nodes]
 *   The nodes to be displayed in the node field.
 * @param {string|number} nodeClusters.nodes.id
 *   The id of the node.
 * @param {string} [nodeClusters.nodes.label]
 *   The label for the node, shown in the tooltip.
 * @param {Object[]} [nodeClusters.nodes.values]
 *   Values shown within the tooltip. On mouse over, it will show the first three. When a node is selected,
 *   it will show the full list to the side of the clusters.
 * @param {string} [nodeClusters.nodes.values.label]
 *   The label corresponding to a particular node value.
 * @param {string} [nodeClusters.nodes.values.value]
 *   The actual value.
 * @param {boolean} [nodeClusters.nodes.values.isDivider]
 *   If true, this will display a divider in the tooltip instead of a node value.
 */

export default function NodeGroup({
    className,
    clusterWidth,
    "data-id": dataId,
    nodeClusters,
    onNodeClick
}) {
    const [selectedNode, setSelected] = useState();
    const containerRef = useRef();

    return (
        <div
            className={classnames("node-group", className)}
            ref={containerRef}
            onClick={() => setSelected(null)}
            onMouseLeave={() => setSelected(null)}
        >
            <FlexRow
                alignment={alignments.STRETCH}
                data-id={dataId}
                justify={justifyOptions.CENTER}
            >
                {nodeClusters.map(({ label, nodes }, index) => {
                    return (
                        <NodeField.Container
                            bottomContent={<NodeField.Label>{label}</NodeField.Label>}
                            key={label}
                            hasDivider={index < (nodeClusters.length - 1)}
                        >
                            <NodeField.default
                                // The tooltip shows every node in a cluster if that cluster has 3 or less
                                // nodes. Mark them so that, when selected, we can see if we need to search
                                // for that node's siblings.
                                nodes={
                                    nodes.length < 4
                                        ? nodes.map(node => ({ ...node, inSmallCluster: true }))
                                        : nodes}
                                onNodeClick={(id, e, node) => {
                                    e.stopPropagation();
                                    onNodeClick(id, e, node);
                                    setSelected({ ...node, index });
                                }}
                                selectedNodeId={selectedNode ? selectedNode.id : undefined}
                                width={clusterWidth}
                            />
                        </NodeField.Container>
                    );
                })}
                {selectedNode &&
                <NodeField.Tooltip
                    // Tooltip wasn't always re-rendering when a new node was selected.
                    key={selectedNode.id}
                    getReference={() => containerRef.current}
                    nodes={
                        selectedNode.inSmallCluster
                            ? nodeClusters.find(({ nodes }) => nodes.some(({ id }) => id === selectedNode.id)).nodes
                            : [selectedNode]
                    }
                    placement={selectedNode.index === (nodeClusters.length - 1) ? "left" : "right"}
                />
                }
            </FlexRow>
        </div>
    );
}

NodeGroup.propTypes = {
    nodeClusters: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            nodes: PropTypes.arrayOf(NodeField.nodePropType)
        })
    )
};

NodeGroup.defaultProps = {
    nodeClusters: [],
    onNodeClick: noop
};