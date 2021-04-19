import * as go from 'gojs';
import { useEffect, useState } from 'react';
import { differenceWith } from 'lodash';
import ZoomSlider from '../../components/ZoomSlider';
import NonRealtimeDraggingTool from '../../components/NonRealtimeDraggingTool';
import { COLORS } from '../../utils/constants';

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

export const handleHighlight = isHighlighted => (isHighlighted ? COLORS.PURPLE : COLORS.BLUE);

export const getBorderWidth = isSelected => (isSelected ? 2 : 1);

export default function useDiagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
    isDisabled = false,
}) {
    const [diagram, setDiagram] = useState();
    const [droppedOntoLinkKey, setDroppedOntoLinkKey] = useState(undefined);
    const [droppedOntoNodeKey, setDroppedOntoNodeKey] = useState(undefined);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (diagram?.model) {
            addNodes(diagram, nodeDataArray);
            removeNodes(diagram, nodeDataArray);
            addLinks(diagram, linkDataArray);
            removeLinks(diagram, linkDataArray);
            diagram.model.mergeNodeDataArray(nodeDataArray);
            diagram.model.mergeLinkDataArray(linkDataArray);
        }
    }, [nodeDataArray, linkDataArray]);

    useEffect(() => {
        if (diagram instanceof go.Diagram) {
            diagram.isEnabled = !isDisabled;
            diagram.allowDelete = !isDisabled;
        }
    }, [isDisabled]);

    useEffect(() => {
        onModelChange({
            ...(selected ? { selectedData: selected } : { selectedData: {} }),
        });
    }, [selected]);

    // Adds link or node that was dropped onto to onModelChange
    const modelChange = (args) => {
        addNodes(diagram, nodeDataArray);
        removeNodes(diagram, nodeDataArray);
        addLinks(diagram, linkDataArray);
        removeLinks(diagram, linkDataArray);
        // Since we're setting skipsDiagramUpdate to true, this is necessary
        // to have existing diagram nodes update.
        diagram.model.mergeNodeDataArray(nodeDataArray);
        onModelChange({ ...args,
            ...(droppedOntoLinkKey ? { droppedOntoLinkKey } : {}),
            ...(droppedOntoNodeKey ? { droppedOntoNodeKey } : {}),
        });
        setDroppedOntoLinkKey(undefined);
        setDroppedOntoNodeKey(undefined);
    };

    const initDiagram = () => {
        const diagramObject =
            $(go.Diagram,

                {
                    hoverDelay: 0,
                    'undoManager.isEnabled': true,
                    'draggingTool.computeEffectiveCollection': dragGroupTogether(go.DraggingTool.prototype
                        .computeEffectiveCollection),
                    draggingTool: $(NonRealtimeDraggingTool, { duration: 600 }),
                    layout:
                        $(go.LayeredDigraphLayout,
                            {
                                setsPortSpots: false,
                                columnSpacing: 20,
                                layerSpacing: 20,
                                isInitial: true,
                                isOngoing: true,
                            }),
                    'linkingTool.insertLink': (fromnode, fromport, tonode, toport) => {
                        const linkingTool = diagramObject.toolManager.linkingTool;
                        if (fromport.portId === 'bottom') {
                            diagramObject.model.setCategoryForLinkData(linkingTool.archetypeLinkData, 'io');
                        } else {
                            diagramObject.model.setCategoryForLinkData(linkingTool.archetypeLinkData, '');
                        }
                        return go
                            .LinkingTool
                            .prototype
                            .insertLink
                            .call(linkingTool, fromnode, fromport, tonode, toport);
                    },
                    'ExternalObjectsDropped': externalObjectsDropped,
                    'InitialAnimationStarting': renderPortCursors,
                    'LinkDrawn': renderPortCursors,
                    'SelectionDeleted': renderPortCursors,
                    'ChangedSelection': (e) => {
                        if (e.diagram.selection.count === 0) {
                            setSelected(null);
                        }
                    },
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key',
                            makeUniqueKeyFunction: null,
                            makeUniqueLinkKeyFunction: null,
                        }),
                });
        nodeTemplates.forEach(([name, template]) => {
            const updatedTemplate = template;
            const templateClick = template.click;
            updatedTemplate.mouseDrop = (e, node) => setDroppedOntoNodeKey(node.key);
            updatedTemplate.click = (e, node) => {
                templateClick();
                setSelected(node);
            };
            diagramObject.nodeTemplateMap.add(name, updatedTemplate);
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
                    mouseDragEnter: (e, link) => {
                        const selectedLink = link.part;
                        selectedLink.fromNode.findObject('fromNodeOuter').fill = COLORS.TRANSLUCENTPURPLE;
                        selectedLink.fromNode.findObject('fromNodeOuter').stroke = selectedLink.fromNode.findObject('fromNode').fill;
                        selectedLink.fromNode.findObject('fromNode').fill = COLORS.PURPLE;
                        selectedLink.fromNode.findObject('fromNode').stroke = COLORS.PURPLE;
                        selectedLink.toNode.findObject('toNodeOuter').fill = COLORS.TRANSLUCENTPURPLE;
                        selectedLink.toNode.findObject('toNodeOuter').stroke = selectedLink.toNode.findObject('toNode').fill;
                        selectedLink.toNode.findObject('toNode').fill = COLORS.PURPLE;
                        selectedLink.toNode.findObject('toNode').stroke = COLORS.PURPLE;
                        selectedLink.findObject('arrow').fill = COLORS.PURPLE;
                        selectedLink.findObject('arrow').stroke = COLORS.PURPLE;
                        // eslint-disable-next-line
                        link.isHighlighted = true;
                    },
                    mouseDragLeave: (e, link) => {
                        const selectedLink = link.part;
                        selectedLink.fromNode.findObject('fromNode').fill = selectedLink.fromNode.findObject('fromNodeOuter').stroke;
                        selectedLink.fromNode.findObject('fromNode').stroke = COLORS.WHITE;
                        selectedLink.fromNode.findObject('fromNodeOuter').fill = 'transparent';
                        selectedLink.toNode.findObject('toNode').fill = selectedLink.toNode.findObject('toNodeOuter').stroke;
                        selectedLink.toNode.findObject('toNode').stroke = COLORS.WHITE;
                        selectedLink.toNode.findObject('toNodeOuter').fill = 'transparent';
                        selectedLink.findObject('arrow').fill = COLORS.BLUE;
                        selectedLink.findObject('arrow').stroke = COLORS.BLUE;
                        // eslint-disable-next-line
                        link.isHighlighted = false;
                    },
                    mouseDrop: (e, link) => setDroppedOntoLinkKey(link.key),
                },
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { isPanelMain: true, stroke: 'transparent', strokeWidth: 15 }),
                $(go.Shape, { isPanelMain: true },
                    new go.Binding('stroke', 'isHighlighted', handleHighlight).ofObject(),
                    new go.Binding('strokeWidth', 'isHighlighted', getBorderWidth).ofObject(''),
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
                $(go.Shape, { name: 'arrow', toArrow: 'Standard', stroke: COLORS.BLUE, fill: COLORS.BLUE, segmentIndex: -Infinity },
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
                $(go.Shape, { stroke: COLORS.BLUE },
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
            ),
        );

        diagramObject.linkTemplateMap.add('io',
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
                    fromPortId: 'bottom',
                    toPortId: 'bottom',
                    layerName: 'Background',
                    click: (e, link) => setSelected(link),
                },
                new go.Binding('visible', 'visible'),
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { isPanelMain: true, stroke: 'transparent', strokeWidth: 15 }),
                $(go.Shape, { isPanelMain: true, stroke: COLORS.ORANGE },
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

        setDiagram(diagramObject);
        return diagramObject;
    };

    return {
        diagramObject: diagram,
        diagramProps: {
            divClassName: 'diagram-component',
            initDiagram,
            // This is a temporary band-aid; the step template has issues handling an
            // undefined errorMessage.
            nodeDataArray,
            linkDataArray,
            onModelChange: modelChange,
            skipsDiagramUpdate: true,
        },
    };
}
