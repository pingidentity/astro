import * as go from 'gojs';
import { ReactDiagram, ReactPalette } from 'gojs-react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import start from '../../img/start.svg';
import play from '../../img/play.svg';
import page from '../../img/page.svg';
import { RealtimeDragSelectingTool } from '../../RealtimeDragSelectingTool';

import './FlowManager.css';


const colors = {
    'yellow': '#E58E05',
    'blue': '#028CFF',
    'pink': '#FF00FF',
};

const toNode = (fill, type = 'circle') => {
    const $ = go.GraphObject.make;
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
            type === 'circle' ?
                $(go.Shape, 'Circle',
                    { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 })
                :
                $(go.Panel, 'Spot',
                    $(go.Shape, 'Diamond',
                        { width: 25, height: 25, fill: 'white', stroke: fill, strokeWidth: 1 }),
                    $(go.Shape, 'Diamond',
                        { width: 15, height: 15, fill, stroke: 'white' }),
                ),
        )

    );
};

const fromNode = (fill) => {
    const $ = go.GraphObject.make;
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 }),
        )
    );
};

const nodeTemplate = (width = 120) => {
    const $ = go.GraphObject.make;
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },

                $(go.Shape, 'Rectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(width, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
                $(go.Panel, 'Horizontal',
                    $(go.TextBlock,
                        {
                            stroke: '#9DA2A8',
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: 20,
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),

            ),
        )
    );
};

const nodeTemplateForm = () => {
    const $ = go.GraphObject.make;
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Rectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(200, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
                $(go.Panel, 'Horizontal', { padding: 15, alignment: go.Spot.Left },
                    $(go.Picture, page, { width: 20, height: 20 }),
                    $(go.Panel, 'Vertical', { padding: new go.Margin(0, 0, 0, 10) },
                        $(go.TextBlock,
                            {
                                stroke: '#9DA2A8', font: '11px sans-serif', alignment: go.Spot.Left, editable: false,

                            },
                            new go.Binding('text', 'category').makeTwoWay()),
                        $(go.TextBlock,
                            {
                                stroke: 'black', font: '500 12px sans-serif', alignment: go.Spot.Left, editable: false,

                            },
                            new go.Binding('text').makeTwoWay()),
                    ),
                ),
            ),
            fromNode(colors.blue),
            toNode(colors.blue),
        )
    );
};

const nodeTemplateAction = () => {
    const $ = go.GraphObject.make;
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Rectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(120, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),

                $(go.Panel, 'Horizontal',


                    $(go.Picture, play, { width: 20, height: 20 }),

                    $(go.TextBlock,
                        {
                            stroke: '#9DA2A8',
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: 20,
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),
            ),
            fromNode(colors.pink),
            toNode(colors.pink),
        )
    );
};


function DiagramWrapper({
    paletteDataArray,
    paletteLinkDataArray,
    nodeDataArray,
    linkDataArray,
    modelData,
    onModelChange,
    selectedData,
    skipsDiagramUpdate,
}) {
    const diagramRef = React.createRef();

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
                                            stroke: colors.blue,
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

        diagram.nodeTemplate = nodeTemplateForm();
        diagram.nodeTemplateMap.add('action', nodeTemplateAction());

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

    const initPalette = () => {
        const $ = go.GraphObject.make;

        const groupTemplate = $(go.Group, go.Panel.Auto,
            {
                isSubGraphExpanded: false,
                ungroupable: true,
            },
            { name: 'BODY' },

            $(go.Shape, 'Rectangle',
                { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(280, 0) },
                new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
            $(go.Panel, 'Horizontal',


                $(go.TextBlock,
                    {
                        stroke: '#9DA2A8',
                        font: 'bold 12px sans-serif',
                        editable: true,
                        margin: 20,
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
        );

        const myPalette =
            $(go.Palette,
                {
                    layout: $(go.GridLayout,
                    ),
                    maxSelectionCount: 1,
                },
            );
        myPalette.nodeTemplate = nodeTemplate(280);
        myPalette.groupTemplate = groupTemplate;


        return myPalette;
    };


    return (
        <>

            <div className="wrapper">

                <div className="palette-wrapper">
                    <ReactPalette
                        initPalette={initPalette}
                        divClassName="palette-component"
                        nodeDataArray={paletteDataArray}
                        linkDataArray={paletteLinkDataArray}

                    />
                </div>
                <ReactDiagram
                    ref={diagramRef}
                    diagramId="myDiagramDiv"
                    divClassName="diagram-component"
                    initDiagram={initDiagram}
                    nodeDataArray={nodeDataArray}
                    linkDataArray={linkDataArray}
                    modelData={modelData}
                    onModelChange={onModelChange}
                    selectedData={selectedData}
                    skipsDiagramUpdate={skipsDiagramUpdate}
                />

            </div>
        </>
    );
}

DiagramWrapper.propTypes = {
    selectedData: PropTypes.any,
    paletteDataArray: PropTypes.array,
    paletteLinkDataArray: PropTypes.array,
    nodeDataArray: PropTypes.array,
    linkDataArray: PropTypes.array,
    modelData: PropTypes.object,
    onModelChange: PropTypes.func,
    // eslint-disable-next-line
    skipsDiagramUpdate: PropTypes.bool,
};

export default DiagramWrapper;
