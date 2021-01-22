import React from 'react';
import * as go from 'gojs';
import Icon from '@mdi/react';
import { mdiFlag } from '@mdi/js';
import { COLORS } from '../../constants';
import { fromNode } from '../nodes';
import { svgComponentToBase64 } from '../templateUtils';


const $ = go.GraphObject.make;

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
            new go.Binding('location', 'loc', go.Point.parse),
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
