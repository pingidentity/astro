import React from 'react';
import * as go from 'gojs';
import Icon from '@mdi/react';
import { mdiFlag } from '@mdi/js';
import { Error } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import { COLORS } from '../../constants';
import { fromNode, bottomNode } from '../nodes';
import { svgComponentToBase64, dragEnter, dragLeave, encodeSvg, getIfLengthGreater } from '../templateUtils';
import { getAdornmentOnHover, getNodeHoverAdornment } from '../hoverAdornment';

const $ = go.GraphObject.make;

export const getBorderColor = (selectedColor, errorColor, defaultColor) => part => {
    if (part.isSelected) {
        return selectedColor;
    } if (part.data.errorMessage) {
        return errorColor;
    }
    return defaultColor;
};

export const nodeTemplateStart = ({ onClick = () => {} } = {}) => {
    return (
        $(go.Node, 'Auto', {
            groupable: false,
            movable: false,
            selectionAdorned: false,
            deletable: false,
            toSpot: go.Spot.Left,
            fromSpot: go.Spot.Right,
            isAnimated: false,
            fromMaxLinks: 1,
            click: onClick,
            mouseDragEnter: dragEnter,
            mouseDragLeave: dragLeave,
            isShadowed: true,
            shadowColor: 'rgb(211, 211, 211, .75)',
            shadowOffset: new go.Point(0, 1),
            shadowBlur: 10,
            name: 'start',
        }, $(go.Shape, 'RoundedRectangle', { fill: 'transparent', strokeWidth: 0, cursor: 'normal' }), new go.Binding('minSize', 'errorMessage', s => getIfLengthGreater(s.errorMessage, new go.Size(65, 130), new go.Size(65, 65), 0)), $(go.Panel, 'Vertical', { alignment: go.Spot.Top, cursor: 'default', padding: 15 }, new go.Binding('visible', '', s => getIfLengthGreater(s.errorMessage, true, false, 0)), $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20, margin: new go.Margin(0, 0, 75, 0) }), {
            mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
            mouseLeave: (e, node) => node.part.removeAdornment('mouseHover'),
        },
        ), new go.Binding('location', 'loc', go.Point.parse), $(go.Shape, 'Circle', { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(50, 75), cursor: 'normal', margin: new go.Margin(30, 0, 0, 0) },
        ), $(go.Shape, 'Circle', { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 0, 0, 0), cursor: 'normal', shadowVisible: true },
        ), $(go.Shape, 'Circle', { name: 'borderCircle', fill: 'transparent', strokeWidth: 2, desiredSize: new go.Size(38, 38), margin: new go.Margin(0, 0, 0, 0), cursor: 'normal' }, new go.Binding('stroke', '', getBorderColor(COLORS.BLUE, COLORS.ERROR, 'transparent')).ofObject(''),
        ), $(go.Picture, { source: svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />), width: 25, height: 25, margin: new go.Margin(0, 0, 0, 0), cursor: 'normal' }), fromNode({ color: COLORS.BLUE }, { margin: new go.Margin(0, 0, 0, 40) }), bottomNode({ margin: new go.Margin(38, 0, 0, 0) }),
        )
    );
};
