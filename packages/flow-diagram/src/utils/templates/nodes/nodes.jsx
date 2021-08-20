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
export const toNode = ({ color } = {}, { margin } = { margin: new go.Margin(0, 0, 0, 0)}) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Left, portId: 'to', toLinkable: true, margin, visible: true },
    new go.Binding('toLinkable', 'canLinkTo'),
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
        new go.Binding('visible', 'canLinkTo'),
    ),
);

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const fromNode = ({ color } = COLORS.BLUE, { margin } = { margin: new go.Margin(0, 0, 0, 0) }) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, visible: true, fromMaxLinks: 1, margin },
    new go.Binding('fromLinkable', 'canLinkFrom'),
    // Same thing as above
    $(go.Shape, 'Circle',
        { name: 'fromNodeOuter', width: 20, height: 20, stroke: COLORS.WHITE, strokeWidth: 0, fill: 'transparent' },
    ),
    $(go.Shape, 'Circle',
        { name: 'fromNode', width: 9, height: 9, stroke: COLORS.WHITE, strokeWidth: 2, ...color ? { fill: color } : {} },
        ...bindIfColor(color),
        new go.Binding('visible', 'canLinkFrom'),
    ),
);

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const bottomNode = ({ margin } = { margin: new go.Margin(0, 0, 0, 0) }) => $(go.Panel, 'Auto',
    { alignment: go.Spot.Center, portId: 'bottom', fromSpot: go.Spot.Bottom, toSpot: go.Spot.Bottom, fromLinkable: false, toLinkable: false, visible: true, fromMaxLinks: 1 },
    new go.Binding('margin', '', s => (s.category === 'step' ? getSize(s, 'bottomNode') : margin)),
    // Same thing as above
    $(go.Shape, 'Circle',
        { width: 0, height: 0, strokeWidth: 0, fill: 'transparent' },
    ),
);
