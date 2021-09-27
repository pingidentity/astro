import * as go from 'gojs';
import React, { useEffect, useState, useRef } from 'react';
import { differenceWith } from 'lodash';
import Icon from '@mdi/react';
import { mdiDelete } from '@mdi/js';
import { svgComponentToBase64 } from '../../utils/templates/templateUtils';
import ZoomSlider from '../../components/ZoomSlider';
import NonRealtimeDraggingTool from '../../components/NonRealtimeDraggingTool';
import SelectiveDigraphLayout from '../../components/SelectiveDigraphLayout';
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

/* istanbul ignore next */
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

/* istanbul ignore next */
export const layoutConnected = (e) => {
    e.diagram.layout.isValidLayout = false;
    e.diagram.layout.invalidateLayout(true);
};

/* istanbul ignore next */
export const dontShowDropzones = (diagram) => {
    diagram.links.each((n) => {
        const selectedLink = n;
        if (selectedLink.data.category === undefined) {
            if (selectedLink.fromPort.findObject('fromNode')?.visible === true) {
                selectedLink.fromPort.findObject('fromNode').fill = selectedLink.fromPort.findObject('fromNodeOuter').stroke;
                selectedLink.fromPort.findObject('fromNode').stroke = COLORS.WHITE;
                selectedLink.fromPort.findObject('fromNodeOuter').fill = 'transparent';
            }
            selectedLink.findObject('arrow').fill = COLORS.BLUE;
            selectedLink.findObject('arrow').stroke = COLORS.BLUE;
            selectedLink.findObject('link').stroke = COLORS.BLUE;
            selectedLink.isHighlighted = false;
        }
    });
    diagram.nodes.each((n) => {
        const node = n;
        if (node.name === 'outlet' || node.name === 'start') {
            node.findObject('fromNode').fill = node.findObject('fromNodeOuter').stroke;
            node.findObject('fromNode').stroke = COLORS.WHITE;
            node.findObject('fromNodeOuter').fill = 'transparent';
        }
    });
};

export const getBorderWidth = isSelected => (isSelected ? 2 : 1);

export default function useDiagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
    onLinkDelete,
    isDisabled = false,
}) {
    const [diagram, setDiagram] = useState();
    const [droppedOntoLinkKey, setDroppedOntoLinkKey] = useState(undefined);
    const [droppedOntoNodeKey, setDroppedOntoNodeKey] = useState(undefined);
    const [draggedElementData, setDraggedElementData] = useState(undefined);
    const [selected, setSelected] = useState(null);
    const [isObjectDragging, setIsObjectDragging] = useState(false);
    const first = useRef(true);

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
        if (first.current) {
            first.current = false;
            return;
        }
        onModelChange({
            ...(selected ? { selectedNodeData: selected } : { selectedNodeData: {} }),
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
            ...(draggedElementData ? { draggedElementData } : {}),
        });
        setDroppedOntoLinkKey(undefined);
        setDroppedOntoNodeKey(undefined);
        setDraggedElementData(undefined);
    };

    const initDiagram = () => {
        const diagramObject =
            $(go.Diagram,

                {
                    hoverDelay: 0,
                    'undoManager.isEnabled': true,
                    'animationManager.isInitial': false,
                    'draggingTool.computeEffectiveCollection': dragGroupTogether(go.DraggingTool.prototype
                        .computeEffectiveCollection),
                    draggingTool: $(NonRealtimeDraggingTool, { duration: 600 }, {
                        setDraggedPart: (draggedParts) => {
                            const mappedDraggedParts = draggedParts.map(part => part.data);
                            setDraggedElementData(mappedDraggedParts);
                        },
                    }),
                    layout:
                        $(SelectiveDigraphLayout,
                            {
                                setsPortSpots: false,
                                columnSpacing: 20,
                                layerSpacing: 20,
                                isInitial: true,
                                isOngoing: true,
                                packOption: go.LayeredDigraphLayout.PackStraighten,
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
                    'SelectionMoved': layoutConnected,
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
            updatedTemplate.mouseDrop = (e, node) => {
                setDroppedOntoNodeKey(node.key);
                dontShowDropzones(diagramObject);
            };
            updatedTemplate.click = (e, node) => {
                if (typeof templateClick === 'function') {
                    templateClick();
                }
                setSelected(node.data);
            };
            diagramObject.nodeTemplateMap.add(name, updatedTemplate);
        });

        groupTemplates.forEach(([name, template]) => {
            diagramObject.groupTemplateMap.add(name, template);
        });

        diagramObject.mouseDragOver = () => {
            if (!isObjectDragging) {
                setIsObjectDragging(true);
            }
            diagramObject.links.each((n) => {
                const selectedLink = n;
                if (selectedLink.data.category === undefined &&
                    selectedLink.isHighlighted === false) {
                    if (selectedLink.fromPort.findObject('fromNode')?.visible === true) {
                        selectedLink.fromPort.findObject('fromNodeOuter').fill = COLORS.TRANSLUCENTPURPLE;
                        selectedLink.fromPort.findObject('fromNode').fill = COLORS.PURPLE;
                        selectedLink.fromPort.findObject('fromNode').stroke = COLORS.PURPLE;
                    }
                    selectedLink.findObject('arrow').fill = COLORS.PURPLE;
                    selectedLink.findObject('arrow').stroke = COLORS.PURPLE;
                    selectedLink.findObject('link').stroke = COLORS.PURPLE;
                    selectedLink.isHighlighted = true;
                }
            });
            diagramObject.nodes.each((n) => {
                const node = n;
                if (node.name === 'outlet' || node.name === 'start') {
                    node.findObject('fromNodeOuter').fill = COLORS.TRANSLUCENTPURPLE;
                    node.findObject('fromNode').fill = COLORS.PURPLE;
                    node.findObject('fromNode').stroke = COLORS.PURPLE;
                }
            });
        };

        diagramObject.mouseDrop = () => {
            dontShowDropzones(diagramObject);
        };


        diagramObject.mouseLeave = () => {
            dontShowDropzones(diagramObject);
        };

        diagramObject.linkTemplate =
            $(go.Link,
                {
                    adjusting: go.Link.Stretch,
                    curve: go.Link.Bezier,
                    curviness: 0,
                    fromShortLength: -20,
                    toShortLength: -20,
                    selectable: true,
                    layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                    selectionAdorned: false,
                    fromPortId: 'from',
                    toPortId: 'to',
                    layerName: 'Background',
                    mouseDrop: (e, link) => {
                        const selectedLink = link.part;
                        setDroppedOntoLinkKey(link.key);
                        dontShowDropzones(diagramObject);
                        selectedLink.findObject('arrow').stroke = COLORS.BLUE;
                    },
                    mouseDragEnter: (e, link) => {
                        const selectedLink = link;
                        // eslint-disable-next-line
                        selectedLink.findObject('link').strokeWidth = 3;
                    },
                    mouseDragLeave: (e, link) => {
                        const selectedLink = link;
                        selectedLink.findObject('link').strokeWidth = 1;
                    },
                },
                new go.Binding('click', 'onClick'),
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { isPanelMain: true, stroke: 'transparent', strokeWidth: 15 }),
                $(go.Shape, { isPanelMain: true, name: 'link', stroke: COLORS.BLUE },
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
                $(go.Shape, { name: 'arrow', toArrow: 'Standard', stroke: COLORS.BLUE, fill: COLORS.BLUE, segmentIndex: -Infinity },
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
                $('Button', 'Spot', {
                    'ButtonBorder.figure': 'Circle',
                    'ButtonBorder.fill': COLORS.BUTTON_NORMAL,
                    'ButtonBorder.strokeWidth': 0,
                    '_buttonFillOver': COLORS.BUTTON_HOVER,
                    '_buttonFillPressed': COLORS.BLUE,
                    click: (e, obj) => onLinkDelete(obj.part.data),
                    name: 'DELETE_BUTTON',
                    height: 25,
                    width: 25,
                    segmentOffset: new go.Point(-5, 23),
                },
                new go.Binding('visible', 'isSelected', (s) => { return s === true; }).ofObject(''),
                $(go.Picture, {
                    source: svgComponentToBase64(<Icon path={mdiDelete} height="20px" width="20px" color={COLORS.WHITE} />),
                    width: 20,
                    height: 20,
                }),
                ),
            );

        diagramObject.linkTemplateMap.add('outlet',
            $(go.Link,
                {
                    routing: go.Link.Orthogonal,
                    fromShortLength: -20,
                    toShortLength: 0,
                    selectable: false,
                    layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                    selectionAdorned: false,
                    fromPortId: 'from',
                    toPortId: 'to',
                    layerName: 'Background',
                },
                new go.Binding('click', 'onClick'),
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { stroke: COLORS.GRAY_MEDIUM },
                    new go.Binding('strokeWidth', 'isSelected', getBorderWidth).ofObject('')),
            ),
        );

        const curveSize = 60;
        diagramObject.linkTemplateMap.add('io',
            $(go.Link, go.Link.Bezier,
                {
                    deletable: false,
                    fromShortLength: -10,
                    toShortLength: -10,
                    selectable: true,
                    selectionAdorned: false,
                    fromPortId: 'bottom',
                    toPortId: 'bottom',
                    layerName: 'Background',
                    curviness: curveSize,
                    fromEndSegmentLength: curveSize,
                    toEndSegmentLength: curveSize,
                    isLayoutPositioned: false,
                },
                new go.Binding('click', 'onClick'),
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
