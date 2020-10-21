import React from 'react';
import * as go from 'gojs';
import { Success, Close, Error } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import start from '../../img/start.svg';
import { COLORS } from '../../utils/constants';
import Diagram from '../Diagram';

function encodeSvg(svgString) {
    return svgString.replace('<svg', (svgString.indexOf('xmlns') > -1 ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
        .replace(/'/g, '\'')
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\s+/g, ' ');
}


const $ = go.GraphObject.make;

const toNode = ({ color }) => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill: color, stroke: COLORS.WHITE, strokeWidth: 3 }),
        )

    );
};

const fromNode = ({ color }) => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill: color, stroke: COLORS.WHITE, strokeWidth: 3 }),
        )
    );
};

const getNodeHoverAdornment = () => {
    return $(go.Adornment, 'Spot',
        {
            background: 'transparent',
            mouseLeave: (e, obj) => {
                const ad = obj.part;
                ad.adornedPart.removeAdornment('mouseHover');
            },
        },
        $(go.Placeholder,
            {
                margin: new go.Margin(10, 10, 10, 10),
                background: 'transparent',
                isActionable: true,
                click: (e, obj) => {
                    const node = obj.part.adornedPart;
                    node.diagram.select(node);
                },
            }),
        $(go.Panel, 'Auto', { alignment: go.Spot.Top },
            { name: 'BODY' },
            $(go.Shape, 'RoundedRectangle',
                { fill: COLORS.ERROR_LIGHT, stroke: 'transparent', strokeWidth: 0, margin: new go.Margin(0, 0, 10, 0) }),
            $(go.Panel, 'Horizontal', { padding: 10, alignment: go.Spot.Top },
                $(go.Panel, 'Vertical', { padding: new go.Margin(0, 0, 10, 0) },
                    $(go.TextBlock,
                        {
                            stroke: COLORS.ERROR, font: 'bold 11px sans-serif', alignment: go.Spot.Left, editable: false,

                        },
                        new go.Binding('text', 'errorMessage').makeTwoWay()),
                ),
            ),
        ),
    );
};

export const stepTemplate = ({ color, icon, onClick }) => {
    return (
        $(go.Node, 'Spot',
            { click: onClick, selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, minSize: new go.Size(200, 150) }),
                $(go.Panel, 'Vertical', { padding: 15, alignment: go.Spot.Top },
                    new go.Binding('visible', 'errorMessage', (s) => { return s.length > 0; }),
                    $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20 }),
                    {
                        mouseHover: (e, obj) => {
                            const node = obj.part;
                            const nodeHoverAdornment = getNodeHoverAdornment();
                            nodeHoverAdornment.adornedObject = node;
                            node.addAdornment('mouseHover', nodeHoverAdornment);
                        },
                    },
                ),
                $(go.Panel, 'Position', { position: new go.Point(0, 0) },
                    { name: 'BODY' },
                    $(go.Shape, 'RoundedRectangle',
                        { fill: COLORS.WHITE, desiredSize: new go.Size(200, 55) },
                        new go.Binding('stroke', 'errorMessage', (s) => { return s.length > 0 ? COLORS.ERROR : COLORS.GRAY; }),
                        new go.Binding('strokeWidth', 'errorMessage', (s) => { return s.length > 0 ? 2 : 0; }),
                    ),
                    $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                        $(go.Panel, 'Auto',
                            $(go.Shape, 'RoundedRectangle',
                                { fill: color, stroke: 'transparent' },
                                new go.Binding('strokeWidth', 'errorMessage', (s) => { return s.length > 0 ? 4 : 0; }),
                                new go.Binding('desiredSize', 'errorMessage', (s) => { return s.length > 0 ? new go.Size(60, 53) : new go.Size(60, 55); })),
                            $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(React.cloneElement(icon, { fill: COLORS.WHITE })))}`, width: 20, height: 20 }),
                        ),
                        $(go.Panel, 'Vertical', { padding: new go.Margin(0, 0, 0, 10) },
                            $(go.TextBlock,
                                {
                                    stroke: '#9DA2A8', font: '11px sans-serif', alignment: go.Spot.Left, editable: false,

                                },
                                new go.Binding('text', 'category').makeTwoWay()),
                            $(go.TextBlock,
                                {
                                    stroke: COLORS.BLACK, font: '500 12px sans-serif', alignment: go.Spot.Left, editable: false,

                                },
                                new go.Binding('text', 'stepId').makeTwoWay()),
                        ),
                    ),
                ),
                fromNode({ color }),
                toNode({ color }),
            ),
        )
    );
};

export const paletteItemTemplate = ({ width = 120, icon, color }) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Rectangle',
                    { fill: COLORS.WHITE, stroke: COLORS.GRAY, minSize: new go.Size(width, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : COLORS.GRAY; }).ofObject()),
                $(go.Panel, 'Horizontal',
                    // $(go.Panel, 'Auto',
                    //     $(go.Shape, 'RoundedRectangle',
                    //         { fill: color, desiredSize: new go.Size(60, 55), strokeWidth: 0 }),
                    //     $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(React.cloneElement(icon, { fill: COLORS.WHITE })))}`, width: 20, height: 20 }),
                    // ),
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

export const outletTemplate = ({ color }) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY', movable: false, deletable: false },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { stroke: COLORS.GRAY, width: '100%', fill: color }),

                $(go.Panel, 'Horizontal',
                    $(go.TextBlock,
                        {
                            stroke: COLORS.WHITE,
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: new go.Margin(5, 10, 5, 10),
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),
            ),
        )
    );
};

export const circleNode = ({ color, icon }) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Circle',
                    { fill: 'transparent', stroke: color, strokeWidth: 1, width: 20, alignment: go.Spot.Center }),
                $(go.Shape, 'Circle',
                    { fill: color, stroke: 'transparent', strokeWidth: 1, width: 12, margin: new go.Margin(0, 0, 0, 0), alignment: go.Spot.Center }),
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(icon))}`, width: 12, height: 12, margin: (0, 0, 0, 1) }),
            ),
        )
    );
};

export const successNode = () =>
    circleNode({ color: COLORS.GREEN, icon: <Success height={10} fill={COLORS.WHITE} /> });

export const failureNode = () =>
    circleNode({ color: COLORS.RED, icon: <Close height={10} width={10} fill={COLORS.WHITE} /> });

export const nodeTemplateStart = () =>
    $(go.Node, 'Auto',
        {
            groupable: false,
            movable: false,
            selectable: false,
            deletable: false,
            toSpot: go.Spot.Left,
            fromSpot: go.Spot.Right,
            isAnimated: false,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),

        $(go.Picture, start, { width: 30, height: 30 }),
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 5, height: 5, fill: '#27AF14', strokeWidth: 0 }),
        ));


export const groupTemplate =
    $(go.Group, go.Panel.Auto,
        {
            isSubGraphExpanded: false,
            ungroupable: true,
        },
        { name: 'BODY' },

        $(go.Shape, 'Rectangle',
            { fill: COLORS.WHITE, stroke: COLORS.GRAY, minSize: new go.Size(280, 0) },
            new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : COLORS.GRAY; }).ofObject()),
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
