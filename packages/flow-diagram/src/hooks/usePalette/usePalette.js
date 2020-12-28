import * as go from 'gojs';
import { useState } from 'react';
import { generateKey } from '../../utils/diagramUtils';

export const setDragState = (paletteObject, dragValue) => () => {
    const draggable = paletteObject.toolManager.draggingTool.findDraggablePart();
    const nodeData = paletteObject.model.findNodeDataForKey(draggable.data.key);
    paletteObject.model.setDataProperty(nodeData, 'isBeingDragged', dragValue);
};

export default function usePalette({
    groupTemplates,
    nodeTemplates,
    nodeDataArray,
    linkDataArray,
}) {
    const [palette, setPalette] = useState();
    const initPalette = () => {
        const $ = go.GraphObject.make;

        const paletteObject =
            $(go.Palette,
                {
                    layout: $(go.GridLayout,
                    ),
                    maxSelectionCount: 1,
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key',
                            makeUniqueKeyFunction: generateKey,
                            makeUniqueLinkKeyFunction: generateKey,
                        }),
                },
            );
        setPalette(paletteObject);

        nodeTemplates.forEach(([name, template]) => {
            paletteObject.nodeTemplateMap.add(name, template);
        });

        groupTemplates.forEach(([name, template]) => {
            paletteObject.groupTemplateMap.add(name, template);
        });

        // Set a data property on palette items so that we can know when they're being dragged.
        paletteObject.toolManager.draggingTool.doStart = setDragState(paletteObject, true);

        paletteObject.toolManager.draggingTool.doStop = setDragState(paletteObject, false);

        return paletteObject;
    };

    return ({
        paletteObject: palette,
        paletteProps: {
            divClassName: 'palette-component',
            initPalette,
            // This is a temporary band-aid; the step template has issues handling an
            // undefined errorMessage.
            nodeDataArray,
            linkDataArray,
        },
    });
}
