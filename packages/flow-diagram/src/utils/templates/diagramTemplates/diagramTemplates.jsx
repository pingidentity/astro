import * as go from 'gojs';

const $ = go.GraphObject.make;

export const diagramGroupTemplate = ({ comparer } = {}) => $(go.Group, go.Panel.Auto, {
    isSubGraphExpanded: true,
    ungroupable: false,
    selectionAdorned: false,
    deletable: true,
    selectable: true,
    handlesDragDropForMembers: true,
    resizable: false,
    layout: $(go.TreeLayout,
        {
            layerSpacing: 20,
            isInitial: true,
            isOngoing: true,
            comparer,
            sorting: comparer
                ? go.TreeLayout.SortingAscending
                : go.TreeLayout.SortingForwards,
        },
    ),
}, new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify), $(go.Shape, 'Rectangle', { fill: 'transparent', stroke: 'transparent', cursor: 'normal' }, new go.Binding('strokeWidth', 'isSelected', s => (s ? 1 : 0)).ofObject(''),
), $(go.Placeholder,
    { padding: 5 },
),
);
