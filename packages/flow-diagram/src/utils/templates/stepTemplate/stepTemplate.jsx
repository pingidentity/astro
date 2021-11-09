import React from 'react';
import * as go from 'gojs';
import Icon from '@mdi/react';
import { Error } from '@pingux/icons/';
import { mdiDelete } from '@mdi/js';
import ReactDOMServer from 'react-dom/server';
import { iconButton } from '../iconButton';
import { svgComponentToBase64, encodeSvg, getSize, dragEnter, dragLeave, sendToForeground } from '../templateUtils';
import { COLORS } from '../../constants';
import { toNode, fromNode, bottomNode } from '../nodes';
import { getAdornmentOnHover, getNodeHoverAdornment } from '../hoverAdornment';

const $ = go.GraphObject.make;

export const getBorderColor = (selectedColor, errorColor, defaultColor) => (part) => {
    if (part.containingGroup.isSelected) {
        return selectedColor;
    } else if (part.data.errorMessage) {
        return errorColor;
    }
    return defaultColor;
};

export const getIcon = iconColor => (iconSrc) => {
    return iconSrc(iconColor);
};

export const getIfLengthGreater = (s, ifTrue, ifFalse, target) => {
    if (s === undefined) {
        return false;
    }
    return s.length > target ? ifTrue : ifFalse;
};

/* istanbul ignore next */
// Will write tests for this later
go.Shape.defineFigureGenerator('StepIconBG', (shape, w, h) => {
    let p1 = 5;
    if (shape !== null) {
        const param1 = shape.parameter1;
        if (!Number.isNaN(param1) && param1 >= 0) p1 = param1;
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
        .add(new go.PathSegment(
            go.PathSegment.Arc,
            arcStart,
            arcSweep,
            45 + 50,
            h / 2,
            arcRadius,
            arcRadius,
        ))
        .add(new go.PathSegment(go.PathSegment.Line, p1, h))
        .add(new go.PathSegment(go.PathSegment.Arc, 90, 90, p1, h - p1, p1, p1).close()));
    return geo;
});

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const stepTemplate = ({ color, onClick = () => {}, onDelete = () => {} } = {}) => $(go.Node, 'Spot',
    {
        click: onClick,
        selectionAdorned: false,
        textEditable: true,
        locationObjectName: 'BODY',
        isShadowed: true,
        shadowColor: 'rgb(211, 211, 211, .75)',
        shadowOffset: new go.Point(0, 1),
        shadowBlur: 10,
        movable: false,
        selectable: false,
        deletable: false,
        resizable: true,
        mouseDragEnter: dragEnter,
        mouseDragLeave: dragLeave,
        layerName: 'Foreground',
        linkDisconnected: sendToForeground,
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('click', 'onClick'),
    $(go.Panel, 'Auto',
        { name: 'BODY' },
        $(go.Shape, 'RoundedRectangle',
            { fill: 'transparent', strokeWidth: 0 }),
        new go.Binding('minSize', '', s => getIfLengthGreater(s.errorMessage, getSize(s, 'errorContainer'), getSize(s, ''), 0)),
        $(go.Panel, 'Vertical', { padding: 15, alignment: go.Spot.Top },
            new go.Binding('visible', '', s => getIfLengthGreater(s.errorMessage, true, false, 0)),
            $(go.Picture, {
                source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`,
                width: 20,
                height: 20,
                mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
                mouseLeave: (e, node) => node.part.removeAdornment('mouseHover'),
            }),
        ),
        $(go.Panel, 'Position', { position: new go.Point(0, 0) },
            { name: 'BODY' },
            $(go.Shape, 'RoundedRectangle',
                { fill: 'transparent', stroke: 'transparent', parameter1: 3, margin: new go.Margin(30, 0, 0, 0) },
                new go.Binding('desiredSize', '', s => getSize(s, 'transparentContainer')),
            ),
            $(go.Shape, 'RoundedRectangle',
                {
                    fill: COLORS.WHITE,
                    margin: new go.Margin(30, 0, 0, 10),
                    parameter1: 3,
                    strokeWidth: 0,
                    shadowVisible: true,
                },
                new go.Binding('desiredSize', '', s => getSize(s, 'outer')),
            ),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                $(go.Panel, 'Auto',
                    $(go.Shape, 'StepIconBG',
                        { stroke: 'transparent', strokeWidth: 0, margin: new go.Margin(30, 0, 0, 10), parameter1: 2 },
                        new go.Binding('desiredSize', '', s => getSize(s, 'shape')),
                        new go.Binding('fill', 'color')),
                    $(go.Picture,
                        { width: 20, height: 20, margin: new go.Margin(0, 0, 0, -9) },
                        new go.Binding('source', 'getIconSrc', getIcon(color || COLORS.WHITE)),
                    ),
                ),
                $(go.Panel, 'Vertical', { margin: new go.Margin(30, 0, 0, -5) },
                    $(go.TextBlock,
                        {
                            stroke: '#253746', font: 'normal normal 600 13px Helvetica', alignment: go.Spot.Left, editable: false, overflow: go.TextBlock.OverflowClip, maxSize: new go.Size(180, NaN),

                        },
                        new go.Binding('text').makeTwoWay()),
                    $(go.TextBlock,
                        {
                            stroke: '#68747F', font: 'normal normal normal 12px Helvetica', alignment: go.Spot.Left, editable: false, overflow: go.TextBlock.OverflowClip, maxSize: new go.Size(180, NaN),

                        },
                        new go.Binding('text', 'stepId').makeTwoWay()),
                ),
            ),
            $(go.Shape, 'RoundedRectangle',
                {
                    name: 'borderRectangle',
                    fill: 'transparent',
                    margin: new go.Margin(30, 0, 0, 10),
                    parameter1: 1,
                    strokeWidth: 2,
                },
                new go.Binding('desiredSize', '', s => getSize(s, 'innerBorder')),
                // Have to bind this to the empty string so that it runs this check on every update,
                // not just when isSelected changes or just when errorMessage changes.
                new go.Binding('stroke', '', getBorderColor(COLORS.BLUE, COLORS.ERROR, 'transparent')).ofObject(''),
            ),
        ),
        iconButton({ onAction: onDelete, margin: new go.Margin(90, 20, 0, 0), source: svgComponentToBase64(<Icon path={mdiDelete} height="20px" width="20px" color={COLORS.WHITE} />) }),
        fromNode(),
        toNode(),
        bottomNode(),
    ),
);
