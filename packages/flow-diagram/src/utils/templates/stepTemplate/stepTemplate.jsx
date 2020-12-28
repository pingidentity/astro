import React from 'react';
import * as go from 'gojs';
import { Error } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import { encodeSvg } from '../templateUtils';
import { COLORS } from '../../constants';
import { toNode, fromNode } from '../nodes';

const $ = go.GraphObject.make;

export const getIfLengthGreater = (ifTrue, ifFalse, target) => (s) => {
    return s.length > target ? ifTrue : ifFalse;
};

export const getBorderColor = (selectedColor, errorColor, defaultColor) => (part) => {
    if (part.isSelected || part.data.isSelected) {
        return selectedColor;
    } else if (part.lb.errorMessage || part.data.errorMessage) {
        return errorColor;
    }
    return defaultColor;
};

export const getIcon = iconColor => (iconSrc) => {
    return iconSrc(iconColor);
};

export const adornmentMouseLeave = (e, obj) => {
    const ad = obj.part;
    ad.adornedPart.removeAdornment('mouseHover');
};

export const selectFromAdornment = (e, obj) => {
    const node = obj.part.adornedPart;
    node.diagram.select(node);
};

export const getAdornmentOnHover = adornment => (e, obj) => {
    const node = obj.part;
    const nodeHoverAdornment = adornment;
    nodeHoverAdornment.adornedObject = node;
    node.addAdornment('mouseHover', nodeHoverAdornment);
};

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const getNodeHoverAdornment = () => {
    return $(go.Adornment, 'Spot',
        {
            background: 'transparent',
            mouseLeave: adornmentMouseLeave,
        },
        $(go.Placeholder,
            {
                margin: new go.Margin(10, 10, 10, 10),
                background: 'transparent',
                isActionable: true,
                click: selectFromAdornment,
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

/* istanbul ignore next */
// Will write tests for this later
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

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const stepTemplate = ({ color, iconSrc, onClick = () => {} } = {}) => $(go.Node, 'Spot',
    { click: onClick, selectionAdorned: false, textEditable: true, locationObjectName: 'BODY', isShadowed: true, shadowColor: 'rgb(211, 211, 211, .75)', shadowOffset: new go.Point(0, 1), shadowBlur: 10, },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('click', 'onClick'),
    $(go.Panel, 'Auto',
        { name: 'BODY' },
        $(go.Shape, 'RoundedRectangle',
            { fill: 'transparent', stroke: 'transparent', strokeWidth: 0 }),
        new go.Binding('minSize', 'errorMessage', getIfLengthGreater(new go.Size(200, 150), new go.Size(200, 55), 0)),
        $(go.Panel, 'Vertical', { padding: 15, alignment: go.Spot.Top },
            new go.Binding('visible', 'errorMessage', getIfLengthGreater(true, false, 0)),
            $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20 }),
            {
                mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
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
                        new go.Binding('source', 'getIconSrc', getIcon(color || COLORS.WHITE)),
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
                // Have to bind this to the empty string so that it runs this check on every update,
                // not just when isSelected changes or just when errorMessage changes.
                new go.Binding('stroke', '', getBorderColor(COLORS.BLUE, COLORS.ERROR, 'transparent')).ofObject(''),
            ),
        ),
        fromNode(),
        toNode(),
    ),
);
