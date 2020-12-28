import * as go from 'gojs';

const $ = go.GraphObject.make;

export const diagramGroupTemplate =
    $(go.Group, go.Panel.Auto,
        {
            isSubGraphExpanded: true,
            ungroupable: false,
            selectionAdorned: false,
            deletable: false,
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
            { fill: 'transparent', strokeWidth: 0, cursor: 'normal' },
        ),
        $(go.Placeholder,
            { padding: 5 },
        ),
    );
