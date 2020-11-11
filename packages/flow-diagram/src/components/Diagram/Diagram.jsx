import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { differenceWith } from 'lodash';
import { v4 as uuidV4 } from 'uuid';
import { COLORS } from '../../utils/constants';
import { RealtimeDragSelectingTool } from '../../RealtimeDragSelectingTool';
import { diagramComponent } from './Diagram.styles';

go.Diagram.licenseKey = '73f947e5b46031b700ca0d2b113f69ed1bb37f3b9ed41bf1595546f0ef0c6d463089ef2c01848ac581aa19f8187fc28ad5c06c799e480132e161d3dd44b084fbe26377b2400f458aa7512e91ccaa2fa2ee6877a792b377f08a799ee2e8a9c09d43e0ecd741';

export default function Diagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
    ...others
}) {
    const diagramRef = useRef();

    useEffect(() => {
        const diagram = diagramRef.current ? diagramRef.current.getDiagram() : null;
        if (diagram instanceof go.Diagram) {
            window.addEventListener('mousemove', () => { });

            return () => {
                window.removeEventListener('mousemove', () => { });
            };
        }

        return () => { };
    }, [diagramRef.current]);

    const isKeyEqual = (a, b) => {
        return a.key === b.key;
    };

    useEffect(() => {
        const diagram = diagramRef.current ? diagramRef.current.getDiagram() : null;
        if (diagram instanceof go.Diagram) {
            const addedNode = differenceWith(nodeDataArray,
                diagram.model.nodeDataArray, isKeyEqual);
            const removedNode = differenceWith(diagram.model.nodeDataArray,
                nodeDataArray, isKeyEqual);
            const addedLink = differenceWith(linkDataArray,
                diagram.model.linkDataArray, isKeyEqual);
            const removedLink = differenceWith(diagram.model.linkDataArray,
                linkDataArray, isKeyEqual);
            if (addedNode.length > 0) {
                diagram.model.addNodeDataCollection(addedNode);
            }
            if (removedNode.length > 0) {
                diagram.model.removeNodeDataCollection(removedNode);
            }
            if (addedLink.length > 0) {
                diagram.model.addLinkDataCollection(addedLink);
            }
            if (removedLink.length > 0) {
                diagram.model.removeLinkDataCollection(removedLink);
            }
        }
    }, [nodeDataArray, linkDataArray]);

    const initDiagram = () => {
        const $ = go.GraphObject.make;
        const diagram =
            $(go.Diagram,

                {
                    hoverDelay: 0,
                    'undoManager.isEnabled': true,
                    dragSelectingTool:
                        $(RealtimeDragSelectingTool,
                            { isPartialInclusion: true, delay: 0 },
                            {
                                box: $(go.Part,
                                    { layerName: 'Tool', selectable: false },
                                    $(go.Shape,
                                        {
                                            name: 'SHAPE',
                                            fill: 'rgba(2, 140, 255, 0.01)',
                                            stroke: COLORS.BLUE,
                                            strokeWidth: 1,
                                        })),
                            },
                        ),
                    layout:
                        $(go.LayeredDigraphLayout,
                            {
                                setsPortSpots: true,
                                columnSpacing: 20,
                                layerSpacing: 20,
                                isInitial: true,
                                isOngoing: true,
                            }),
                    'ExternalObjectsDropped': (e) => {
                        e.subject.each((node) => {
                            if (node instanceof go.Link) return;
                            const grid = e.diagram.grid;
                            // eslint-disable-next-line
                            node.location =
                                node
                                    .location.copy()
                                    .snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
                        });
                    },
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key',
                            makeUniqueKeyFunction: (m, data) => {
                                const key = `${data.key}_${uuidV4()}`;

                                // eslint-disable-next-line
                                data.key = key;
                                return key;
                            },
                            makeUniqueLinkKeyFunction: (m, data) => {
                                const key = `${data.key}_${uuidV4()}`;

                                // eslint-disable-next-line
                                data.key = key;
                                return key;
                            },
                        }),
                });

        nodeTemplates.forEach(([name, template]) => {
            diagram.nodeTemplateMap.add(name, template);
        });

        groupTemplates.forEach(([name, template]) => {
            diagram.groupTemplateMap.add(name, template);
        });

        diagram.linkTemplate =
            $(go.Link,
                {
                    routing: go.Link.AvoidsNodes,
                    curve: go.Link.JumpOver,
                    corner: 5,
                    toShortLength: 4,
                    selectable: false,
                    layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                },
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { stroke: '#8C9199' }),
                $(go.Shape, { toArrow: 'Standard', stroke: '#8C9199', fill: '#8C9199', segmentIndex: -Infinity }),
            );

        return diagram;
    };

    return (
        <div css={diagramComponent} {...others}>
            <ReactDiagram
                ref={diagramRef}
                diagramId="myDiagramDiv"
                divClassName="diagram-component"
                initDiagram={initDiagram}
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
                modelData={{ canRelink: false }}
                onModelChange={onModelChange}
                // TODO: Wire this in. Certain state updates require that this be set to true.
                skipsDiagramUpdate
            />
        </div>
    );
}

Diagram.propTypes = {
    groupTemplates: PropTypes.arrayOf(PropTypes.array),
    linkDataArray: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    ),
    nodeDataArray: PropTypes.array,
    nodeTemplates: PropTypes.arrayOf(PropTypes.array),
    onModelChange: PropTypes.func,
};

