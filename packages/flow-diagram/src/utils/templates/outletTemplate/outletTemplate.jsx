import * as go from 'gojs';
import { COLORS } from '../../constants';
import { fromNode } from '../nodes';

const $ = go.GraphObject.make;

export const dragEnter = (e, obj) => {
    const node = obj.part;
    node.findObject('fromNode').stroke = COLORS.PURPLE;
    node.findObject('fromNode').fill = COLORS.PURPLE;
    node.findObject('fromNodeOuter').fill = 'rgba(208, 51, 255, 0.5)';
};

export const dragLeave = (e, obj) => {
    const node = obj.part;
    node.findObject('fromNode').stroke = COLORS.WHITE;
    node.findObject('fromNode').fill = '#4262ed';
    node.findObject('fromNodeOuter').fill = 'transparent';
};

export const outletTemplate = ({ color = COLORS.BLACK, width = 100 } = {}) => $(go.Node, 'Spot',
    {
        mouseDragEnter: dragEnter,
        mouseDragLeave: dragLeave,
        selectionAdorned: false,
        textEditable: true,
        locationObjectName: 'BODY',
        deletable: false,
        movable: false,
        selectable: false,
    },
    new go.Binding('location', 'loc', go.Point.parse),
    $(go.Panel, 'Auto',
        { name: 'BODY', cursor: 'normal' },
        $(go.Shape, 'RoundedRectangle',
            { fill: color, width, height: 24, strokeWidth: 1, stroke: '#98A0A8', parameter1: 2 },
            new go.Binding('fill', 'color'),
            new go.Binding('width', 'width'),
        ),
        $(go.Panel, 'Horizontal',
            $(go.TextBlock,
                {
                    stroke: '#253746',
                    font: 'normal 12px Helvetica',
                    margin: new go.Margin(2, 10, 0, 10),
                    alignment: go.Spot.Left,
                },
                new go.Binding('text').makeTwoWay()),
        ),
    ),
    fromNode({ color: '#4262ed' }),
);
