import React from 'react';
import * as go from 'gojs';
import { Success, Clear } from '@pingux/icons/';
import Icon from '@mdi/react';
import { mdiSourceBranch } from '@mdi/js';
import { COLORS } from '../../constants';
import { toNode } from '../nodes';
import { svgComponentToBase64 } from '../templateUtils';


const $ = go.GraphObject.make;

export const circleNode = ({ color = COLORS.BLACK, iconSrc, width, height } = {}) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse),
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
