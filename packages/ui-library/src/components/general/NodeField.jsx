import React, { forwardRef, useRef, useState } from "react";
import PropTypes from "prop-types";
import isArray from "lodash/isArray";
import classnames from "classnames";
import FlexRow, { alignments, flexDirectionOptions, spacingOptions } from "../layout/FlexRow";
import PopperContainer from "../tooltips/PopperContainer";
import Text, { textTypes } from "./Text";

/**
 * @class Container
 * @memberof NodeField
 * @desc A container element for the node field.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object} [bottomContent]
 *   Content that displays below the node field and below its divider, if shown.
 * @param {string|number} hasDivider=false
 *   If true, adds a divider to the right hand side of the container.
 */

export const Container = ({
    bottomContent,
    children,
    className,
    "data-id": dataId,
    hasDivider
}) => {
    return (
        <FlexRow
            alignment={alignments.CENTER}
            className={className}
            data-id={dataId}
            flexDirection={flexDirectionOptions.COLUMN}
        >
            <div
                className={classnames({
                    "node-field__container--divider": hasDivider
                })}
            >
                {children}
            </div>
            {bottomContent}
        </FlexRow>
    );
};

Container.propTypes = {
    bottomContent: PropTypes.node,
    hasDivider: PropTypes.bool
};

Container.defaultProps = {
    hasDivider: false
};

export const Label = ({
    children,
    width
}) => {
    return (
        <div className="node-field__label-chip" style={{ maxWidth: width }}>
            {children}
        </div>
    );
};

const Root = ({
    x,
    y,
    radius,
}) => (
    <circle cx={x} cy={y} r={radius} className="node-field__root" />
);

Root.propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
};

export const nodePropType = PropTypes.shape({
    label: PropTypes.string.isRequired,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    values: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.oneOfType([
                PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired)
            ])
        })
    )
});

export const Tooltip = ({
    getReference,
    nodes,
    placement,
}) => {
    return (
        <PopperContainer
            className="node-field__tooltip"
            getReference={getReference}
            placement={placement}
            noGPUAcceleration
        >
            {nodes.map(({ label, values }, nodeIndex) => {
                return (
                    <React.Fragment key={`${label}${values.length}`}>
                        {label &&
                            <Text className="node-field__tooltip-title" type={textTypes.LABEL}>
                                {label}
                            </Text>
                        }
                        <FlexRow
                            alignment={alignments.TOP}
                            flexDirection={flexDirectionOptions.COLUMN}
                            spacing={spacingOptions.MD}
                        >
                            {values.map(({ label: valueLabel, value = [] }, index) => {
                                const valuesAsArray = isArray(value) ? value : [value];
                                return (
                                    <FlexRow
                                        alignment={alignments.TOP}
                                        className="node-field__property"
                                        flexDirection={flexDirectionOptions.COLUMN}
                                        key={`${valueLabel}-${value[0]}-${index}`}
                                        spacing={spacingOptions.SM}
                                    >
                                        <Text
                                            className="node-field__property-label"
                                            type={textTypes.SECTIONTITLE}
                                        >
                                            {valueLabel}
                                        </Text>
                                        {valuesAsArray.map(val => (
                                            <Text
                                                className="node-field__property-value"
                                                key={`${valueLabel}-${val}`}
                                                type={textTypes.BODY}
                                            >
                                                {val}
                                            </Text>
                                        ))}
                                    </FlexRow>
                                );
                            })}
                        </FlexRow>
                        {nodeIndex < nodes.length -1
                            ? <div className="node-field__tooltip-divider" />
                            : null}
                    </React.Fragment>
                );
            })}
        </PopperContainer>
    );
};

Tooltip.propTypes = {
    getReference: PropTypes.func.isRequired,
    label: PropTypes.string,
    placement: PropTypes.string,
    nodes: PropTypes.arrayOf(nodePropType),
    values: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            isDivider: PropTypes.bool
        })
    )
};

Tooltip.defaultProps = {
    values: []
};

const Node = forwardRef(({
    id,
    onClick,
    onMouseOver,
    onMouseOut,
    radius,
    selected,
    x,
    y,
}, ref) => (
    <g
        onMouseOver={(e) => onMouseOver(e.clientX, e.clientY)}
        onMouseOut={(e) => onMouseOut(e)}
    >
        <circle
            data-id={`node_${id}`}
            cx={x} cy={y} r={radius}
            className={classnames("node-field__node", {
                "node-field__node--selected": selected
            })}
            onClick={e => onClick(id, e)}
            ref={ref} />
    </g>
));

Node.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onMouseOver: PropTypes.func,
    onMouseOut: PropTypes.func,
    radius: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
};

/**
 * @class NodeField
 * @desc A visual display of nodes with tooltips showing information about them.
 *
 * @param {string} [className]
 *   A class name applied at the component's top level.
 * @param {string} [data-id]
 *   A data-id test hook applied at the root element.
 * @param {Object[]} [nodes]
 *   The nodes to be displayed in the node field. Besides the props listed below, the nodes
 *   will list any other properties by their key and value in the node's tooltip.
 * @param {string|number} nodes.id
 *   The id of the node.
 * @param {string} nodes.label
 *   The label for the node.
 * @param {number} threshold=20
 *   The number of nodes at which to start breaking them into separate levels. The levels
 *   will even themselves out so that each level has an even number of nodes, although the top
 *   level for odd numbers of nodes will have one less.
 * @param {number} width=300
 *   The width (and height) of the node field container. The nodes themselves will
 *   take up space based on the number of nodes.
 */

export default function NodeField({
    className,
    "data-id": dataId,
    nodes,
    onNodeClick,
    selectedNodeId,
    threshold: baseThreshold,
    width,
}) {
    // Also the center of canvas
    const radius = width / 2;
    const nodeRadius = 5;

    // Maximum # of levels based on # of nodes
    const maxLevel = Math.ceil(nodes.length / baseThreshold);

    // Spread the nodes evenly between levels for even number of nodes.
    const baseLevelNodeCount = Math.ceil(nodes.length / maxLevel);

    // Get the circumference of a circle made of nodes, along with a buffer to account
    // for space between them.
    const nodeCircumference = baseLevelNodeCount * ((nodeRadius * 2) + 8);
    // The radius of the node circle created in the last step, along with a buffer for the nodes themselves.
    const nodeCalculationRadius = (nodeCircumference / (Math.PI * 2)) + (nodeRadius * 2);
    // The number of pixels between the levels; use the radius calculated above
    // unless it would be too small.
    const spaceBetweenCircles = nodeCalculationRadius > 20 ? nodeCalculationRadius : 20;

    const [renderedNodes] = nodes.reduce(
        // currentCount is how many nodes are on the current level
        ([nodesAcc, currentCount, level], node) => {
            const {
                label: nodeLabel, id, values
            } = node;
            const nodeRef = useRef();
            const [nodeOpen, setOpen] = useState(false);
            // Level the node should reside at
            const newRadius = spaceBetweenCircles * level;

            // Radians
            const rads = (180 / Math.PI);

            // Calculate based on the number of nodes in the base level.
            // The top level will only ever be the same as the base or one less, but since
            // we leave an empty space for the latter case since it involves an odd number of nodes,
            // this only ever has to take into account the base level.
            const angleBetweenNodes = (360 / baseLevelNodeCount);

            // Angle for the current node
            const angle = (angleBetweenNodes * currentCount) + (maxLevel === 1
                ? 0
                : (angleBetweenNodes / maxLevel) * level
            );

            // Find the x/y coords on the circumference
            const x = radius + (newRadius * Math.cos(angle / rads));
            const y = radius + (newRadius * Math.sin(angle / rads));

            // Set up ct for next run
            const atNextLevel = currentCount === baseLevelNodeCount - 1;

            return [
                [
                    ...nodesAcc,
                    <g key={id}>
                        <line x1={x} y1={y} x2={radius} y2={radius} className="node-field__thread" />
                        {nodeOpen &&
                            <Tooltip
                                getReference={() => nodeRef.current}
                                nodes={[
                                    {
                                        ...node,
                                        values: values.slice(0, 3)
                                    }
                                ]}

                            />
                        }
                        <Node
                            id={id}
                            label={nodeLabel}
                            onClick={(clickedId, e) => {
                                onNodeClick(clickedId, e, node);
                                // Close the tooltip when the full node info pops up
                                setOpen(false);
                            }}
                            // Don't show abbreviated tooltip for selected node
                            onMouseOver={() => !nodeOpen && setOpen(true)}
                            onMouseOut={() => setOpen(false)}
                            radius={nodeRadius}
                            ref={nodeRef}
                            selected={id === selectedNodeId}
                            x={x}
                            y={y}
                        />
                    </g>
                ],
                atNextLevel ? 0 : (currentCount + 1),
                atNextLevel ? level + 1 : level
            ];
        }, [[], 0, 1]);

    return (
        <svg
            className={classnames("node-field", className)}
            data-id={dataId}
            height={width}
            width={width}
        >
            {renderedNodes}
            <Root
                x={radius}
                y={radius}
                radius={4}
            />
        </svg>
    );
}

NodeField.propTypes = {
    className: PropTypes.string,
    "data-id": PropTypes.string,
    nodes: PropTypes.arrayOf(nodePropType),
    onNodeClick: PropTypes.func,
    threshold: PropTypes.number,
    width: PropTypes.number,
};

NodeField.defaultProps = {
    nodes: [],
    threshold: 20,
    width: 300
};
