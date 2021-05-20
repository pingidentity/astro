import React from 'react';
import * as go from 'gojs';
import { Grip } from '@pingux/icons/';
import { COLORS } from '../../constants';

import { svgComponentToBase64, getSize } from '../templateUtils';

const $ = go.GraphObject.make;

const isDraggingItem = node => node.part.layerName === 'Tool';

export const getDraggedColor = (isActive, activeColor, staticColor) => (isBeingDragged, node) => {
    if (isActive(node) || !isBeingDragged) {
        return activeColor;
    }
    return staticColor;
};

export const getIcon = (getSrc) => {
    return getSrc();
};

export const checkIfDragged = (isBeingDragged, node) => {
    return !isBeingDragged || isDraggingItem(node);
};

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const paletteItemTemplate = ({ iconSrc } = {}) => $(go.Node, 'Spot',
    { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Panel, 'Auto',
        { name: 'BODY' },
        $(
            go.Shape, 'RoundedRectangle',
            { fill: COLORS.WHITE, stroke: '#98A0A8', desiredSize: new go.Size(250, 35), parameter1: 1 },
            new go.Binding('fill', 'isBeingDragged', getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')),
            new go.Binding('stroke', 'isBeingDragged', getDraggedColor(isDraggingItem, '#98A0A8', '#E5E9F8')),
        ),
        $(go.Panel, 'Horizontal', { alignment: go.Spot.Left, visible: true },
            new go.Binding('visible', 'isBeingDragged', checkIfDragged),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                $(go.Picture, { source: svgComponentToBase64(React.cloneElement(<Grip />, { fill: '#98A0A8' })), width: 15, height: 15, margin: new go.Margin(0, 7, 0, 5) }),
                $(
                    go.Picture,
                    { source: iconSrc, width: 18, height: 18 },
                    new go.Binding('source', 'getIconSrc', getIcon),
                ),
            ),
            $(go.TextBlock,
                {
                    stroke: '#253746',
                    font: 'normal normal normal 14px Helvetica',
                    margin: new go.Margin(0, 0, 0, 13),
                    alignment: go.Spot.Left,
                },
                new go.Binding('text').makeTwoWay()),
        ),
    ),
);

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const paletteGroupTemplate = ({ iconSrc } = {}) =>
    $(go.Group,
        {
            isSubGraphExpanded: false,
            ungroupable: true,
            selectionAdorned: false,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Panel, 'Auto',
            { name: 'BODY' },
            $(
                go.Shape, 'RoundedRectangle',
                { fill: COLORS.WHITE, stroke: '#98A0A8', parameter1: 1 },
                new go.Binding('desiredSize', '', s => getSize(s, 'paletteContainer')),
                new go.Binding('fill', 'isBeingDragged', getDraggedColor(isDraggingItem, COLORS.WHITE, '#E5E9F8')),
                new go.Binding('stroke', 'isBeingDragged', getDraggedColor(isDraggingItem, '#98A0A8', '#E5E9F8')),
            ),
            $(go.Panel, 'Horizontal', { alignment: go.Spot.Left, visible: true },
                new go.Binding('visible', 'isBeingDragged', checkIfDragged),
                $(go.Panel, 'Horizontal', { alignment: go.Spot.Left },
                    $(go.Picture, { source: svgComponentToBase64(React.cloneElement(<Grip />, { fill: '#98A0A8' })), width: 15, height: 15, margin: new go.Margin(0, 5, 0, 5) }),
                    $(
                        go.Picture,
                        { source: iconSrc, width: 18, height: 18 },
                        new go.Binding('source', 'getIconSrc', getIcon),
                    ),
                ),
                $(go.TextBlock,
                    {
                        stroke: '#253746',
                        font: 'normal normal normal 14px Helvetica',
                        margin: new go.Margin(0, 0, 0, 10),
                        maxSize: new go.Size(180, NaN),
                        overflow: go.TextBlock.OverflowClip,
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
        ),
    );
