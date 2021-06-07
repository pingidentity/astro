import React from 'react';
import * as go from 'gojs';
import Icon from '@mdi/react';
import { mdiFlag } from '@mdi/js';
import { Error } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import { COLORS } from '../../constants';
import { fromNode, bottomNode } from '../nodes';
import { svgComponentToBase64, encodeSvg, getIfLengthGreater } from '../templateUtils';
import { getAdornmentOnHover, getNodeHoverAdornment } from '../hoverAdornment';


const $ = go.GraphObject.make;

export const getBorderColor = (selectedColor, errorColor, defaultColor) => (part) => {
    if (part.isSelected) {
        return selectedColor;
    } else if (part.data.errorMessage) {
        return errorColor;
    }
    return defaultColor;
};


/* istanbul ignore next */
export const dragEnter = (e, obj) => {
    const node = obj.part;
    node.findObject('borderCircle').stroke = COLORS.PURPLE;
    node.findObject('fromNode').stroke = '#D033FF';
    node.findObject('fromNode').fill = COLORS.PURPLE;
    node.findObject('fromNodeOuter').fill = 'rgba(208, 51, 255, 0.5)';
};

// Would require mocking node
/* istanbul ignore next */
export const dragLeave = (selectedColor, errorColor, defaultColor) => (e, obj) => {
    const node = obj.part;
    if (node.isSelected) {
        node.findObject('borderCircle').stroke = selectedColor;
    } else if (node.data.errorMessage) {
        node.findObject('borderCircle').stroke = errorColor;
    } else {
        node.findObject('borderCircle').stroke = defaultColor;
    }

    node.findObject('fromNode').stroke = COLORS.WHITE;
    node.findObject('fromNode').fill = COLORS.BLUE;
    node.findObject('fromNodeOuter').fill = 'transparent';
};

export const nodeTemplateStart = ({ onClick = () => {} } = {}) => {
    return (
        $(go.Node, 'Auto',
            {
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
                mouseDragLeave: dragLeave(COLORS.BLUE, COLORS.ERROR, 'transparent'),
                isShadowed: true,
                shadowColor: 'rgb(211, 211, 211, .75)',
                shadowOffset: new go.Point(0, 1),
                shadowBlur: 10,
            },
            $(go.Shape, 'RoundedRectangle',
                { fill: 'transparent', strokeWidth: 0, cursor: 'normal' }),
            new go.Binding('minSize', 'errorMessage', getIfLengthGreater(new go.Size(65, 130), new go.Size(65, 65), 0)),
            $(go.Panel, 'Vertical', { alignment: go.Spot.Top, padding: 15 },
                new go.Binding('visible', 'errorMessage', getIfLengthGreater(true, false, 0)),
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20, margin: new go.Margin(0, 0, 0, 0) }),
                {
                    mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
                },
            ),
            new go.Binding('location', 'loc', go.Point.parse),
            $(go.Shape, 'Circle',
                { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(65, 65), cursor: 'normal' },
            ),
            $(go.Shape, 'Circle',
                { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 0, 0, 0), cursor: 'normal', shadowVisible: true },
            ),
            $(go.Shape, 'Circle',
                { name: 'borderCircle', fill: 'transparent', strokeWidth: 1, desiredSize: new go.Size(39, 39), margin: new go.Margin(0, 0, 0, 0), cursor: 'normal' },
                new go.Binding('stroke', '', getBorderColor(COLORS.BLUE, COLORS.ERROR, 'transparent')).ofObject(''),
            ),
            $(go.Picture, { source: svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />), width: 25, height: 25, margin: new go.Margin(0, 0, 0, 0), cursor: 'normal' }),
            fromNode({ color: COLORS.BLUE }, { margin: new go.Margin(0, 4, 0, 0) }),
            bottomNode({ margin: new go.Margin(38, 0, 0, 0) }),
        )
    );
};
