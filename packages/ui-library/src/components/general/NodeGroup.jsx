import React, { useMemo, useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import noop from "lodash/noop";
import classnames from "classnames";
import uuid from "uuid";
import FlexRow, { alignments, justifyOptions } from "../layout/FlexRow";
import * as NodeField from "./NodeField";
import { callIfOutsideOfContainer } from "../../util/EventUtils";

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

    useEffect(() => {
        const deselectNode = (e) => {
            callIfOutsideOfContainer(
                containerRef.current,
                () => setSelected(null),
                e
            );
        };

        document.addEventListener("click", deselectNode);

        return () => document.removeEventListener("click", deselectNode);
    }, []);

    return (
        <div
            className={classnames("node-group", className)}
            ref={containerRef}
            onClick={() => setSelected(null)}
        >
            <FlexRow
                alignment={alignments.STRETCH}
                data-id={dataId}
                // Space between left-aligns a single option.
                justify={nodeClusters.length === 1 ? justifyOptions.CENTER : justifyOptions.SPACEEVENLY}
            >
                {nodeClusters.flatMap(({ label, nodes }, index) => {
                    // Generate a new key when nodes change.
                    const key = useMemo(uuid, [nodes]);
                    return [
                        <NodeField.Container
                            bottomContent={
                                // Specific ask from the Ping Fed team not to have 0 count as false here.
                                label !== undefined && label !== null && label !== ""
                                    ? <NodeField.Label width={clusterWidth}>{label}</NodeField.Label>
                                    : <div className="node-field__label-placeholder" />
                            }
                            key={key}
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
                        </NodeField.Container>,
                        ...index < (nodeClusters.length - 1)
                            ? [<div className="node-group__divider" key={`divider-${index}`} />]
                            : []
                    ];
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