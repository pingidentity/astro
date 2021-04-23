import * as go from 'gojs';
import { COLORS } from '../../constants';
import { getSize } from '../templateUtils';

const $ = go.GraphObject.make;

export const fillIfColor = (color) => {
    return color ? { fill: color } : {};
};

export const bindIfColor = (color) => {
    return color ? [] : [new go.Binding('fill', 'color')];
};

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const toNode = ({ color } = {}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
    new go.Binding('visible', 'canLinkTo'),
    $(go.Shape, 'Circle',
        { name: 'toNodeOuter', width: 20, height: 20, stroke: COLORS.WHITE, strokeWidth: 0, fill: 'transparent' },
    ),
    $(go.Shape, 'Circle',
        {
            name: 'toNode',
            width: 9,
            height: 9,
            stroke: COLORS.WHITE,
            strokeWidth: 2,
            ...fillIfColor(color),
        },
        ...bindIfColor(color),
    ),
);

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const fromNode = ({ color } = {}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, visible: true, fromMaxLinks: 1 },
    new go.Binding('visible', 'canLinkFrom'),
    // Same thing as above
    $(go.Shape, 'Circle',
        { name: 'fromNodeOuter', width: 20, height: 20, stroke: COLORS.WHITE, strokeWidth: 0, fill: 'transparent' },
    ),
    $(go.Shape, 'Circle',
        { name: 'fromNode', width: 9, height: 9, stroke: COLORS.WHITE, strokeWidth: 2, ...color ? { fill: color } : {} },
        ...bindIfColor(color),
    ),
);

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const bottomNode = ({ color } = {}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Center, portId: 'bottom', fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom, fromLinkable: true, toLinkable: true, visible: true, fromMaxLinks: 1 },
    new go.Binding('margin', '', s => getSize(s, 'bottomNode')),
    // Same thing as above
    $(go.Shape, 'Circle',
        { name: 'fromNodeOuter', width: 20, height: 20, stroke: COLORS.WHITE, strokeWidth: 0, fill: 'transparent' },
    ),
    $(go.Shape, 'Circle',
        { name: 'fromNode', width: 9, height: 9, stroke: COLORS.WHITE, fill: COLORS.ORANGE, strokeWidth: 2 },
    ),
);
