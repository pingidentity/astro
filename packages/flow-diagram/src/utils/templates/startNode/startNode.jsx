import React from 'react';
import * as go from 'gojs';
import Icon from '@mdi/react';
import { mdiFlag } from '@mdi/js';
import { Error } from '@pingux/icons/';
import ReactDOMServer from 'react-dom/server';
import { COLORS } from '../../constants';
import { fromNode } from '../nodes';
import { svgComponentToBase64, encodeSvg } from '../templateUtils';
import { getAdornmentOnHover, getNodeHoverAdornment } from '../hoverAdornment';


const $ = go.GraphObject.make;

export const getIfLengthGreater = (ifTrue, ifFalse, target) => (s) => {
    return s.length > target ? ifTrue : ifFalse;
};

export const nodeTemplateStart = ({ onClick = () => {} } = {}) => {
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
                click: onClick,
            },
            $(go.Shape, 'RoundedRectangle',
                { fill: 'transparent', strokeWidth: 0, cursor: 'normal' }),
            new go.Binding('minSize', 'errorMessage', getIfLengthGreater(new go.Size(65, 130), new go.Size(65, 65), 0)),
            $(go.Panel, 'Vertical', { alignment: go.Spot.Top, padding: 15 },
                new go.Binding('visible', 'errorMessage', getIfLengthGreater(true, false, 0)),
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20 }),
                {
                    mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
                },
            ),
            new go.Binding('location', 'loc', go.Point.parse),
            $(go.Shape, 'Circle',
                { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(65, 65), cursor: 'normal' },
            ),
            $(go.Shape, 'Circle',
                { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 0, 0, 0), cursor: 'normal' },
            ),
            $(go.Picture, { source: svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />), width: 25, height: 25, margin: new go.Margin(0, -1, 0, 0), cursor: 'normal' }),
            fromNode({ color: COLORS.BLUE }),
        )
    );
};
