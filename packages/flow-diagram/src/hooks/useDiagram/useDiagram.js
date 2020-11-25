import * as go from 'gojs';
import { useEffect, useState } from 'react';
import { differenceWith } from 'lodash';
import { v4 as uuidV4 } from 'uuid';

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

export default function useDiagram({
    groupTemplates,
    linkDataArray,
    nodeDataArray,
    nodeTemplates,
    onModelChange,
}) {
    const [diagram, setDiagram] = useState();

    useEffect(() => {
        if (diagram instanceof go.Diagram) {
            addNodes(diagram, nodeDataArray);
            removeNodes(diagram, nodeDataArray);
            addLinks(diagram, linkDataArray);
            removeLinks(diagram, linkDataArray);
        }
    }, [nodeDataArray, linkDataArray]);

    const renderPortCursor = (node) => {
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

    const initDiagram = () => {
        const diagramObject =
        $(go.Diagram,

            {
                hoverDelay: 0,
                'undoManager.isEnabled': true,
                layout:
                    $(go.LayeredDigraphLayout,
                        {
                            setsPortSpots: true,
                            columnSpacing: 20,
                            layerSpacing: 20,
                            isInitial: true,
                            isOngoing: true,
                        }),
                'ExternalObjectsDropped': (e) => {
                    e.subject.each((node) => {
                        if (node instanceof go.Link) return;
                        const grid = e.diagram.grid;
                        // eslint-disable-next-line
                        node.location =
                            node
                                .location.copy()
                                .snapToGridPoint(grid.gridOrigin, grid.gridCellSize);
                    });
                },
                'InitialAnimationStarting': (e) => {
                    e.diagram.nodes.each((node) => {
                        renderPortCursor(node);
                    });
                },
                'LinkDrawn': (e) => {
                    e.diagram.nodes.each((node) => {
                        renderPortCursor(node);
                    });
                },
                model: $(go.GraphLinksModel,
                    {
                        linkKeyProperty: 'key',
                        makeUniqueKeyFunction: (m, data) => {
                            const key = `${data.key}_${uuidV4()}`;

                            // eslint-disable-next-line
                            data.key = key;
                            return key;
                        },
                        makeUniqueLinkKeyFunction: (m, data) => {
                            const key = `${data.key}_${uuidV4()}`;

                            // eslint-disable-next-line
                            data.key = key;
                            return key;
                        },
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
                    fromShortLength: 0,
                    toShortLength: 0,
                    selectable: false,
                    layoutConditions: go.Part.LayoutAdded || go.Part.LayoutRemoved,
                },
                new go.Binding('relinkableFrom', 'canRelink').ofModel(),
                new go.Binding('relinkableTo', 'canRelink').ofModel(),
                $(go.Shape, { stroke: '#4462ED' }),
                $(go.Shape, { toArrow: 'Standard', stroke: '#4462ED', fill: '#4462ED', segmentIndex: -Infinity }),
            );

        return diagramObject;
    };

    return {
        diagramObject: diagram,
        diagramProps: {
            divClassName: 'diagram-component',
            initDiagram,
            // This is a temporary band-aid; the step template has issues handling an
            // undefined errorMessage.
            nodeDataArray: nodeDataArray.map(({ errorMessage = '', ...rest }) => ({ errorMessage, ...rest })),
            linkDataArray,
            onModelChange,
            skipsDiagramUpdate: true,
        },
    };
}
