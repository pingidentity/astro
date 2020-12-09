import React from 'react';
import * as go from 'gojs';
import { Success, Clear, Error, Grip, Desktop } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import Icon from '@mdi/react';
import { mdiSourceBranch, mdiFlag } from '@mdi/js';
import { COLORS } from './constants';

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

export const svgComponentToBase64 = component => `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(component))}`;

const $ = go.GraphObject.make;

const toNode = ({ color } = {}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Left, portId: 'to', toLinkable: true, toMaxLinks: 1 },
    new go.Binding('visible', 'canLinkTo'),
    $(go.Shape, 'Circle',
        {
            width: 9,
            height: 9,
            stroke: COLORS.WHITE,
            strokeWidth: 2,
            ...color ? { fill: color } : {},
        },
        ...color ? [] : [new go.Binding('fill', 'color')],
    ),
);

const fromNode = ({ color } = {}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, visible: true, fromMaxLinks: 1 },
    new go.Binding('visible', 'canLinkFrom'),
    $(go.Shape, 'Circle',
        { width: 9, height: 9, stroke: COLORS.WHITE, strokeWidth: 2, ...color ? { fill: color } : {} },
        ...color ? [] : [new go.Binding('fill', 'color')],
    ),
);

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

go.Shape.defineFigureGenerator('StepIconBG', (shape, w, h) => {
    let p1 = 5;
    if (shape !== null) {
        const param1 = shape.parameter1;
        if (!isNaN(param1) && param1 >= 0) p1 = param1;
    }
    p1 = Math.min(p1, 45 / 2);
    p1 = Math.min(p1, h / 2);
    const geo = new go.Geometry();
    const arcRadius = 50;
    const arcStart = (Math.PI + Math.asin(h / 2 / arcRadius)) * (180 / Math.PI);
    const arcSweep = Math.asin(h / 2 / arcRadius) * -2 * (180 / Math.PI);
    geo.add(new go.PathFigure(0, p1)
        .add(new go.PathSegment(go.PathSegment.Arc, 180, 90, p1, p1, p1, p1))
        .add(new go.PathSegment(go.PathSegment.Line, 45, 0))
        .add(new go.PathSegment(go.PathSegment.Arc, arcStart, arcSweep, 45 + 50, h / 2, arcRadius, arcRadius))
        .add(new go.PathSegment(go.PathSegment.Line, p1, h))
        .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()));
    return geo;
});

export const stepTemplate = ({ color = COLORS.BLACK, iconSrc, onClick = () => {} } = {}) => $(go.Node, 'Spot',
    { click: onClick, selectionAdorned: false, textEditable: true, locationObjectName: 'BODY', isShadowed: true, shadowColor: 'rgb(211, 211, 211, .75)', shadowOffset: new go.Point(0, 1), shadowBlur: 10, },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('click', 'onClick'),
    $(go.Panel, 'Auto',
        { name: 'BODY' },
        $(go.Shape, 'RoundedRectangle',
            { fill: 'transparent', stroke: 'transparent', strokeWidth: 0 }),
        new go.Binding('minSize', 'errorMessage', (s) => { return s.length > 0 ? new go.Size(200, 150) : new go.Size(200, 55); }),
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
                { fill: 'transparent', desiredSize: new go.Size(210, 55), stroke: 'transparent', parameter1: 3 },
            ),
            $(go.Shape, 'RoundedRectangle',
                {
                    fill: COLORS.WHITE,
                    desiredSize: new go.Size(200, 55),
                    margin: new go.Margin(0, 0, 0, 5),
                    parameter1: 3,
                    strokeWidth: 0,
                    shadowVisible: true,
                },
            ),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                $(go.Panel, 'Auto',
                    $(go.Shape, 'StepIconBG',
                        { stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(60, 55), margin: new go.Margin(0, 0, 0, 5), parameter1: 2 },
                        new go.Binding('fill', 'color')),
                    $(go.Picture,
                        { source: iconSrc, width: 20, height: 20, margin: new go.Margin(0, 0, 0, -9) },
                        new go.Binding('source', 'getIconSrc', getSrc => getSrc(COLORS.WHITE)),
                    ),
                ),
                $(go.Panel, 'Vertical', { margin: new go.Margin(0, 0, 0, -5) },
                    $(go.TextBlock,
                        {
                            stroke: '#253746', font: 'normal normal 600 13px Helvetica', alignment: go.Spot.Left, editable: false,

                        },
                        new go.Binding('text').makeTwoWay()),
                    $(go.TextBlock,
                        {
                            stroke: '#68747F', font: 'normal normal normal 12px Helvetica', alignment: go.Spot.Left, editable: false,

                        },
                        new go.Binding('text', 'stepId').makeTwoWay()),
                ),
            ),
            $(go.Shape, 'RoundedRectangle',
                {
                    fill: 'transparent',
                    desiredSize: new go.Size(199, 54),
                    margin: new go.Margin(0, 0, 0, 5),
                    parameter1: 2,
                    strokeWidth: 1,
                },
                new go.Binding('stroke', 'isSelected', (condition, node) => {
                    if (condition) {
                        return COLORS.BLUE;
                    } else if (node.part.data.errorMessage) {
                        return COLORS.ERROR;
                    }
                    return 'transparent';
                }).ofObject(''),
            ),
        ),
        fromNode(),
        toNode(),
    ),
);

const isDraggingItem = node => node.part.layerName === 'Tool';

export const paletteItemTemplate = ({ iconSrc } = {}) => $(go.Node, 'Spot',
    { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Auto',
        { name: 'BODY' },
        $(
            go.Shape, 'RoundedRectangle',
            { fill: COLORS.WHITE, stroke: '#98A0A8', desiredSize: new go.Size(250, 35), parameter1: 1 },
            new go.Binding('fill', 'isBeingDragged', (isBeingDragged, node) => {
                if (isDraggingItem(node) || !isBeingDragged) {
                    return COLORS.WHITE;
                }
                return '#E5E9F8';
            }),
            new go.Binding('stroke', 'isBeingDragged', (isBeingDragged, node) => {
                if (isDraggingItem(node) || !isBeingDragged) {
                    return '#98A0A8';
                }
                return '#E5E9F8';
            }),
        ),
        $(go.Panel, 'Horizontal', { alignment: go.Spot.Left, visible: true },
            new go.Binding('visible', 'isBeingDragged', (isBeingDragged, node) => !isBeingDragged || isDraggingItem(node)),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                $(go.Picture, { source: svgComponentToBase64(React.cloneElement(<Grip />, { fill: '#98A0A8' })), width: 15, height: 15, margin: new go.Margin(0, 7, 0, 5) }),
                $(
                    go.Picture,
                    { source: iconSrc, width: 18, height: 18 },
                    // Don't pass a color to getSrc so that the user uses their own.
                    new go.Binding('source', 'getIconSrc', getSrc => getSrc()),
                ),
            ),
            $(go.TextBlock,
                {
                    stroke: '#253746',
                    font: 'normal normal normal 14px Helvetica',
                    margin: new go.Margin(0, 0, 0, 13),
                    alignment: go.Spot.Left,
                },
                new go.Binding('text').makeTwoWay()),
        ),
    ),
);

export const paletteGroupTemplate = ({ iconSrc } = {}) =>
    $(go.Group,
        {
            isSubGraphExpanded: false,
            ungroupable: true,
            selectionAdorned: false,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
            { name: 'BODY' },
            $(
                go.Shape, 'RoundedRectangle',
                { fill: COLORS.WHITE, stroke: '#98A0A8', desiredSize: new go.Size(250, 35), parameter1: 1 },
                new go.Binding('fill', 'isBeingDragged', (isBeingDragged, node) => {
                    if (isDraggingItem(node) || !isBeingDragged) {
                        return COLORS.WHITE;
                    }
                    return '#E5E9F8';
                }),
                new go.Binding('stroke', 'isBeingDragged', (isBeingDragged, node) => {
                    if (isDraggingItem(node) || !isBeingDragged) {
                        return '#98A0A8';
                    }
                    return '#E5E9F8';
                }),
            ),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left, visible: true },
                new go.Binding('visible', 'isBeingDragged', (isBeingDragged, node) => !isBeingDragged || isDraggingItem(node)),
                $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                    $(go.Picture, { source: svgComponentToBase64(React.cloneElement(<Grip />, { fill: '#98A0A8' })), width: 15, height: 15, margin: new go.Margin(0, 7, 0, 5) }),
                    $(
                        go.Picture,
                        { source: iconSrc, width: 18, height: 18 },
                        // Don't pass a color to getSrc so that the user uses their own.
                        new go.Binding('source', 'getIconSrc', getSrc => getSrc()),
                    ),
                ),
                $(go.TextBlock,
                    {
                        stroke: '#253746',
                        font: 'normal normal normal 14px Helvetica',
                        margin: new go.Margin(0, 0, 0, 13),
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
        ),
    );

export const outletTemplate = ({ color = COLORS.BLACK, width = 100 } = {}) => $(go.Node, 'Spot',
    { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY', deletable: false, movable: false, selectable: false },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Auto',
        { name: 'BODY', cursor: 'normal' },
        $(go.Shape, 'RoundedRectangle',
            { fill: color, width, height: 24, strokeWidth: 1, stroke: '#98A0A8', parameter1: 2 },
            new go.Binding('fill', 'color'),
            new go.Binding('width', 'width'),
        ),
        $(go.Panel, 'Horizontal',
            $(go.TextBlock,
                {
                    stroke: '#253746',
                    font: 'normal 12px Helvetica',
                    margin: new go.Margin(2, 10, 0, 10),
                    alignment: go.Spot.Left,
                },
                new go.Binding('text').makeTwoWay()),
        ),
    ),
    fromNode({ color: '#4262ed' }),
);

export const circleNode = ({ color = COLORS.BLACK, iconSrc, width, height } = {}) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY', cursor: 'normal' },
                $(go.Shape, 'Circle',
                    { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 0, 0, 0) },
                ),
                $(
                    go.Picture,
                    { source: iconSrc, width, height, margin: (0, 0, 0, 1) },
                    new go.Binding('source', 'iconSrc'),
                ),
            ),
            toNode({ color }),
        )
    );
};

export const successNode = circleNode({
    color: COLORS.GREEN,
    iconSrc: svgComponentToBase64(<Success height={10} fill={COLORS.GREEN} />),
    height: 20,
    width: 30,
});

export const failureNode = circleNode({
    color: COLORS.RED,
    iconSrc: svgComponentToBase64(<Clear height={1} width={1} fill={COLORS.RED} />),
    height: 20,
    width: 20,
});

export const branchNode = circleNode({
    color: COLORS.ORANGE,
    iconSrc: (svgComponentToBase64(<Icon
        path={mdiSourceBranch}
        height="20px"
        width="20px"
        color={COLORS.ORANGE}
    />)),
    height: 25,
    width: 25,
});

export const nodeTemplateStart = () => {
    return (
        $(go.Node, 'Auto',
            {
                groupable: false,
                movable: false,
                selectable: false,
                deletable: false,
                toSpot: go.Spot.Left,
                fromSpot: go.Spot.Right,
                isAnimated: false,
                fromMaxLinks: 1,
            },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Shape, 'Circle',
                { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(65, 65), cursor: 'normal' },
            ),
            $(go.Shape, 'Circle',
                { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 4, 0, 0), cursor: 'normal' },
            ),
            $(go.Picture, { source: svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />), width: 25, height: 25, margin: new go.Margin(0, 3, 0, 0), cursor: 'normal' }),
            fromNode({ color: COLORS.BLUE }),
        )
    );
};

export const diagramGroupTemplate =
    $(go.Group, go.Panel.Auto,
        {
            isSubGraphExpanded: true,
            ungroupable: false,
            selectionAdorned: false,
            deletable: false,
            handlesDragDropForMembers: true,
            resizable: false,
            layout: $(go.LayeredDigraphLayout,
                {
                    setsPortSpots: true,
                    columnSpacing: 20,
                    layerSpacing: 20,
                    isInitial: true,
                    isOngoing: true,
                },
            ),
        },
        $(go.Shape, 'Rectangle',
            { fill: 'transparent', strokeWidth: 0, cursor: 'normal' },
        ),
        $(go.Placeholder,
            { padding: 5 },
        ),
    );
