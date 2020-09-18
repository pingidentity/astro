import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import start from '../../img/start.svg';
import { COLORS } from '../../utils/constants';
import { RealtimeDragSelectingTool } from '../../RealtimeDragSelectingTool';

export default function Diagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
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

    const initDiagram = () => {
        const $ = go.GraphObject.make;
        const diagram =
            $(go.Diagram,

                {
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
                                let k = data.key || 1;
                                // eslint-disable-next-line
                                while (m.findNodeDataForKey(k)) k++;
                                // eslint-disable-next-line
                                data.key = k;
                                return k;
                            },
                            makeUniqueLinkKeyFunction: (m, data) => {
                                let k = data.key || -1;
                                // eslint-disable-next-line
                                while (m.findLinkDataForKey(k)) k--;
                                // eslint-disable-next-line
                                data.key = k;
                                return k;
                            },
                        }),
                });

        nodeTemplates.forEach(([name, template]) => {
            diagram.nodeTemplateMap.add(name, template());
        });

        groupTemplates.forEach(([name, template]) => {
            diagram.groupTemplateMap.add(name, template());
        });

        diagram.nodeTemplateMap.add('Start',
            $(go.Node, 'Auto',
                {
                    groupable: false,
                    movable: false,
                    selectable: false,
                    deletable: false,
                    toSpot: go.Spot.Left,
                    fromSpot: go.Spot.Right,
                },
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),

                $(go.Picture, start, { width: 30, height: 30 }),
                $(go.Panel, 'Auto',
                    { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
                    $(go.Shape, 'Circle',
                        { width: 5, height: 5, fill: '#27AF14', strokeWidth: 0 }),
                ),
            ));

        diagram.groupTemplate =
            $(go.Group, 'Auto',
                {
                    layout: $(go.LayeredDigraphLayout,
                        {
                            setsPortSpots: true,
                            columnSpacing: 20,
                            layerSpacing: 20,
                            isInitial: true,
                            isOngoing: true,
                        }),
                    isSubGraphExpanded: true,
                    ungroupable: true,
                },
                $(go.Shape, 'Rectangle',
                    { fill: null, stroke: null }),
                $(go.Panel, 'Vertical',
                    { defaultAlignment: go.Spot.Left, margin: 4 },
                    $(go.Panel, 'Horizontal',
                        { defaultAlignment: go.Spot.Top },
                    ),
                    $(go.Placeholder,
                        { padding: new go.Margin(0, 10) }),
                ),
            );

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
            skipsDiagramUpdate={false}
        />
    );
}

Diagram.propTypes = {
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

