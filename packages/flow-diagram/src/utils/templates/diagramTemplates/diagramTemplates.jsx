import * as go from 'gojs';

const $ = go.GraphObject.make;

export const diagramGroupTemplate =
    $(go.Group, go.Panel.Auto,
        {
            isSubGraphExpanded: true,
            ungroupable: false,
            selectionAdorned: false,
            deletable: true,
            selectable: true,
            handlesDragDropForMembers: true,
            resizable: false,
            layout: $(go.LayeredDigraphLayout,
                {
                    setsPortSpots: true,
                    columnSpacing: 20,
                    layerSpacing: 20,
                    isInitial: true,
                    isOngoing: true,
                },
            ),
        },
        $(go.Shape, 'Rectangle',
            { fill: 'transparent', stroke: 'transparent', cursor: 'normal' },
            new go.Binding('strokeWidth', 'isSelected', (s) => s ? 1 : 0).ofObject(''),
        ),
        $(go.Placeholder,
            { padding: 5 },
        ),
    );
