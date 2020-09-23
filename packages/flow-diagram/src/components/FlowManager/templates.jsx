import React from 'react';
import * as go from 'gojs';
import Success from '@pingux/icons/ui-library/components/Success';
import Close from '@pingux/icons/ui-library/components/Close';
import ReactDOMServer from 'react-dom/server';
import start from '../../img/start.svg';

function encodeSvg(svgString) {
    return svgString.replace('<svg', (~svgString.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
        .replace(/"/g, '\'')
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\s+/g, ' ');
}
const $ = go.GraphObject.make;

const toNode = (fill) => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 })
        )

    );
};

const fromNode = (fill) => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 }),
        )
    );
};

export const stepTemplate = (color, svg) => () => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(200, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
                $(go.Panel, 'Horizontal', { padding: 15, alignment: go.Spot.Left },
                    $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(React.cloneElement(svg, { fill: color })))}`, width: 20, height: 20 }),
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
                            new go.Binding('text', 'stepId').makeTwoWay()),
                    ),
                ),
            ),
            fromNode(color),
            toNode(color),
        )
    );
};

export const nodeTemplate = (width = 120) => {
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

export const outletTemplate = fill => () => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { stroke: '#EBECEC', width: '100%', fill }),

                $(go.Panel, 'Horizontal',
                    $(go.TextBlock,
                        {
                            stroke: 'white',
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

export const circleNode = (color, svg) => {
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
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(svg))}`, width: 12, height: 12, margin: (0, 0, 0, 1) }),
            ),
        )
    );
};

export const successNode = () => circleNode('#0bbf01', <Success height={10} fill="#fff" />);

export const failureNode = () => circleNode('#ce0808', <Close height={10} width={10} fill="#fff" />);

export const nodeTemplateStart = () =>
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
        ));


export const groupTemplate = () => {
    return (
        $(go.Group, go.Panel.Auto,
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
        )
    );
};
