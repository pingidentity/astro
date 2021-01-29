import * as go from 'gojs';
import { useEffect, useState } from 'react';
import { differenceWith } from 'lodash';
import { generateKey } from '../../utils/diagramUtils';
import ZoomSlider from '../../components/ZoomSlider';

go.Diagram.licenseKey = '73f947e5b46031b700ca0d2b113f69ed1bb37f3b9ed41bf1595546f0ef0c6d463089ef2c01848ac581aa19f8187fc28ad5c06c799e480132e161d3dd44b084fbe26377b2400f458aa7512e91ccaa2fa2ee6877a792b377f08a799ee2e8a9c09d43e0ecd741';

const $ = go.GraphObject.make;
const isKeyEqual = (a, b) => {
    return a.key === b.key;
};

export const addNodes = (diagram, nodeDataArray) => {
    const addedNodes = differenceWith(nodeDataArray,
        diagram.model.nodeDataArray, isKeyEqual);
    if (addedNodes.length > 0) {
        diagram.model.addNodeDataCollection(addedNodes);
    }
};

export const removeNodes = (diagram, nodeDataArray) => {
    const removedNodes = differenceWith(diagram.model.nodeDataArray,
        nodeDataArray, isKeyEqual);

    if (removedNodes.length > 0) {
        diagram.model.removeNodeDataCollection(removedNodes);
    }
};

export const addLinks = (diagram, linkDataArray) => {
    const addedLinks = differenceWith(linkDataArray,
        diagram.model.linkDataArray, isKeyEqual);
    if (addedLinks.length > 0) {
        diagram.model.addLinkDataCollection(addedLinks);
    }
};

export const removeLinks = (diagram, linkDataArray) => {
    const removedLinks = differenceWith(diagram.model.linkDataArray,
        linkDataArray, isKeyEqual);
    if (removedLinks.length > 0) {
        diagram.model.removeLinkDataCollection(removedLinks);
    }
};

export const renderPortCursor = (node) => {
    const fromPort = node.findPort('from');
    const toPort = node.findPort('to');
    if (node.findNodesOutOf().count > 0) {
        fromPort.cursor = 'normal';
    } else {
        fromPort.cursor = 'pointer';
    }
    if (node.findNodesInto().count > 0) {
        toPort.cursor = 'normal';
    } else {
        toPort.cursor = 'pointer';
    }
};

export const renderPortCursors = e => e.diagram.nodes.each(renderPortCursor);

export const dragGroupTogether = compute =>
    // GoJS references the context of its computeEffectiveCollection function,
    // so this has be a named function that calls the GoJS compute with its own
    // this context.
    function computeEffectiveCollection(parts, options) {
        const all = new go.List();
        parts.each((part) => {
            all.add(part);
            if (part.containingGroup !== null && !(part instanceof go.Link)) {
                all.add(part.containingGroup);
            }
        });
        return compute.call(this, all, options);
    };

export const externalObjectsDropped = (e) => {
    e.subject.each((node) => {
        if (node instanceof go.Link) return;
        const grid = e.diagram.grid;
        // eslint-disable-next-line
        node.location =
            node
                .location.copy()
                .snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
    });
};

export const getBorderWidth = isSelected => (isSelected ? 2 : 1);

export default function useDiagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
    isEnabled = true,
}) {
    const [diagram, setDiagram] = useState();

    useEffect(() => {
        if (diagram?.model) {
            addNodes(diagram, nodeDataArray);
            removeNodes(diagram, nodeDataArray);
            addLinks(diagram, linkDataArray);
            removeLinks(diagram, linkDataArray);
            // Since we're setting skipsDiagramUpdate to true, this is necessary
            // to have existing diagram nodes update.
            diagram.model.mergeNodeDataArray(nodeDataArray);
        }
    }, [nodeDataArray, linkDataArray]);

    const initDiagram = () => {
        const diagramObject =
            $(go.Diagram,

                {
                    hoverDelay: 0,
                    'undoManager.isEnabled': true,
                    'draggingTool.computeEffectiveCollection': dragGroupTogether(go.DraggingTool.prototype
                        .computeEffectiveCollection),
                    layout:
                        $(go.LayeredDigraphLayout,
                            {
                                setsPortSpots: true,
                                columnSpacing: 20,
                                layerSpacing: 20,
                                isInitial: true,
                                isOngoing: true,
                            }),
                    'ExternalObjectsDropped': externalObjectsDropped,
                    'InitialAnimationStarting': renderPortCursors,
                    'LinkDrawn': renderPortCursors,
                    'SelectionDeleted': renderPortCursors,
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key',
                            makeUniqueKeyFunction: generateKey,
                            makeUniqueLinkKeyFunction: generateKey,
                        }),
                });
        setDiagram(diagramObject);
        nodeTemplates.forEach(([name, template]) => {
            diagramObject.nodeTemplateMap.add(name, template);
        });

        groupTemplates.forEach(([name, template]) => {
            diagramObject.groupTemplateMap.add(name, template);
        });

        diagramObject.linkTemplate =
                $(go.Link,
                    {
                        routing: go.Link.AvoidsNodes,
                        curve: go.Link.JumpOver,
                        corner: 5,
                        fromShortLength: -10,
                        toShortLength: -10,
                        selectable: true,
                        layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                        selectionAdorned: false,
                        fromPortId: 'from',
                        toPortId: 'to',
                        layerName: 'Background',
                    },
                    new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                    new go.Binding('relinkableTo', 'canRelink').ofModel(),
                    $(go.Shape, { stroke: '#4462ED' },
                        new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
                    $(go.Shape, { toArrow: 'Standard', stroke: '#4462ED', fill: '#4462ED', segmentIndex: -Infinity },
                        new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
                );

        diagramObject.linkTemplateMap.add('outlet',
            $(go.Link,
                {
                    curve: go.Link.Bezier,
                    fromShortLength: -10,
                    toShortLength: 0,
                    selectable: false,
                    layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                    selectionAdorned: false,
                    fromPortId: 'from',
                    toPortId: 'to',
                    layerName: 'Background',
                },
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { stroke: '#4462ED' },
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
            ),
        );

        diagramObject.div = document.getElementsByClassName('diagram-component')[0];

        /* eslint-disable */
        // assignment necessary for zoom slider to work correctly
        const zoomSlider = new ZoomSlider(diagramObject,
            {
                alignment: go.Spot.TopRight,
                alignmentFocus: go.Spot.TopRight,
                size: 150,
                buttonSize: 30,
                orientation: 'horizontal',
            });

        return diagramObject;
    };

    if (diagram instanceof go.Diagram) {
        diagram.addDiagramListener('LayoutCompleted', (e) => {
        e.diagram.isEnabled = isEnabled;
        e.diagram.allowDelete = isEnabled;
        },
    )};

    return {
        diagramObject: diagram,
        diagramProps: {
            divClassName: 'diagram-component',
            initDiagram,
            // This is a temporary band-aid; the step template has issues handling an
            // undefined errorMessage.
            nodeDataArray,
            linkDataArray,
            onModelChange,
            skipsDiagramUpdate: true,
        },
    };
}
