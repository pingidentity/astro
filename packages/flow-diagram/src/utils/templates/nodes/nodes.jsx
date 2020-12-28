import * as go from 'gojs';
import { COLORS } from '../../constants';

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
    { alignment: go.Spot.Left, portId: 'to', toLinkable: true, toMaxLinks: 1 },
    new go.Binding('visible', 'canLinkTo'),
    $(go.Shape, 'Circle',
        {
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
        { width: 9, height: 9, stroke: COLORS.WHITE, strokeWidth: 2, ...color ? { fill: color } : {} },
        ...bindIfColor(color),
    ),
);
