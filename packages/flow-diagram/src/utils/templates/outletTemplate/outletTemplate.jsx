import * as go from 'gojs';
import { COLORS } from '../../constants';
import { dragEnter, dragLeave, getSize } from '../templateUtils';
import { fromNode } from '../nodes';

const $ = go.GraphObject.make;

export const outletTemplate = ({ color = COLORS.BLACK } = {}) => $(go.Node, 'Spot', {
    mouseDragEnter: dragEnter,
    mouseDragLeave: dragLeave,
    selectionAdorned: false,
    textEditable: true,
    locationObjectName: 'BODY',
    deletable: false,
    movable: false,
    selectable: false,
    name: 'outlet',
}, new go.Binding('location', 'loc', go.Point.parse), $(go.Panel, 'Auto', { name: 'BODY', cursor: 'normal' }, $(go.Shape, 'RoundedRectangle', { fill: color, height: 24, strokeWidth: 1, stroke: '#98A0A8', parameter1: 2 }, new go.Binding('fill', 'color'), new go.Binding('stroke', 'borderColor'), new go.Binding('minSize', '', s => getSize(s, 'outlet')),
), $(go.Panel, 'Horizontal', $(go.TextBlock,
    {
        stroke: '#253746',
        font: 'normal 12px Helvetica',
        margin: new go.Margin(2, 10, 0, 10),
        alignment: go.Spot.Left,
        overflow: go.TextBlock.OverflowClip,
        minSize: new go.Size(40, NaN),
        maxSize: new go.Size(240, NaN),
    },
    new go.Binding('text').makeTwoWay()),
),
), fromNode({ color: '#4262ed' }),
);
