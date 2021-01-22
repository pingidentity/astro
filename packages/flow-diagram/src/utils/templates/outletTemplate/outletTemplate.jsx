import * as go from 'gojs';
import { COLORS } from '../../constants';
import { fromNode } from '../nodes';

const $ = go.GraphObject.make;

export const outletTemplate = ({ color = COLORS.BLACK, width = 100 } = {}) => $(go.Node, 'Spot',
    { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY', deletable: false, movable: false, selectable: false },
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
