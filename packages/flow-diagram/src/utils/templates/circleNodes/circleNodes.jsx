import React from 'react';
import * as go from 'gojs';
import { Success, Clear, Error } from '@pingux/icons/';
import Icon from '@mdi/react';
import { mdiSourceBranch } from '@mdi/js';
import ReactDOMServer from 'react-dom/server';
import { COLORS } from '../../constants';
import { toNode } from '../nodes';
import { svgComponentToBase64, encodeSvg, getIfLengthGreater } from '../templateUtils';
import { getAdornmentOnHover, getNodeHoverAdornment } from '../hoverAdornment';

export const getBorderColor = (selectedColor, errorColor, defaultColor) => (part) => {
    if (part.isSelected) {
        return selectedColor;
    } else if (part.data.errorMessage) {
        return errorColor;
    }
    return defaultColor;
};


const $ = go.GraphObject.make;

export const circleNode = ({ color = COLORS.BLACK, iconSrc, width, height } = {}) => {
    return (
        $(go.Node, 'Auto', { selectionAdorned: false },
            new go.Binding('click', 'onClick'),
            $(go.Shape, 'RoundedRectangle',
                { fill: 'transparent', strokeWidth: 0, cursor: 'normal' }),
            new go.Binding('desiredSize', 'errorMessage', getIfLengthGreater(new go.Size(65, 130), new go.Size(65, 65), 0)),
            $(go.Panel, 'Vertical', { alignment: go.Spot.Top, padding: 15 },
                new go.Binding('visible', 'errorMessage', getIfLengthGreater(true, false, 0)),
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(<Error fill={COLORS.ERROR} />))}`, width: 20, height: 20, margin: new go.Margin(0, 0, 0, 6) }),
                {
                    mouseHover: getAdornmentOnHover(getNodeHoverAdornment()),
                },
            ),
            new go.Binding('location', 'loc', go.Point.parse),
            $(go.Shape, 'Circle',
                { fill: 'transparent', stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(65, 65), cursor: 'normal' },
            ),
            $(go.Shape, 'Circle',
                { fill: COLORS.WHITE, stroke: 'transparent', strokeWidth: 0, desiredSize: new go.Size(40, 40), margin: new go.Margin(0, 0, 0, 6), cursor: 'normal' },
            ),
            $(go.Shape, 'Circle',
                { fill: 'transparent', strokeWidth: 1, desiredSize: new go.Size(39, 39), margin: new go.Margin(0, 0, 0, 6), cursor: 'normal' },
                new go.Binding('stroke', '', getBorderColor(COLORS.BLUE, COLORS.ERROR, 'transparent')).ofObject(''),
            ),
            $(
                go.Picture,
                { source: iconSrc, width, height, margin: new go.Margin(0, 0, 0, 8) },
                new go.Binding('source', 'iconSrc'),
            ),
            toNode({ color }, { margin: new go.Margin(0, 0, 0, 6) }),
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
