import React, { useState } from 'react';
import { Clear, Error, Success } from '@pingux/icons';
import { Box, Button, Image, Separator, Tabs, Tab, Text, TextField } from '@pingux/astro';
import {
    mdiSourceBranch, mdiFlag, mdiCheck, mdiClose, mdiScaleBalance,
    mdiAccountPlus, mdiFormSelect, mdiCellphoneLink, mdiEmail, mdiAccountDetails,
} from '@mdi/js';
import Icon from '@mdi/react';
import '../../css/main.css';

import {
    branchNode,
    diagramGroupTemplate,
    failureNode,
    nodeTemplateStart,
    outletTemplate,
    paletteGroupTemplate,
    paletteItemTemplate,
    stepTemplate,
    successNode,
    svgComponentToBase64,
} from '../../utils/templates';
import { COLORS } from '../../utils/constants';

import Body from '../../components/Body';
import { Diagram, DiagramWrapper } from '../../components/Diagram';
import useDiagram from '../../hooks/useDiagram';
import LeftContainer from '../../components/LeftContainer';
import { Palette, PaletteWrapper } from '../../components/Palette';
import usePalette from '../../hooks/usePalette';
import OuterContainer from '../../components/OuterContainer';

export const makePaletteItem = ({ key, text, icon, color, category = 'step', outlets }) => [
    {
        key: `${key}-group`,
        text,
        outlets,
        'category': 'palette-group',
        isGroup: true,
        getIconSrc: (iconColor = color) => svgComponentToBase64(<Icon path={icon} color={iconColor} width="20px" height="20px" />),
    },
    {
        key,
        text,
        category,
        group: `${key}-group`,
        color,
        getIconSrc: (iconColor = color) => svgComponentToBase64(<Icon path={icon} color={iconColor} width="20px" height="20px" />),
        hasIO: false,
    },
];

export const makeCanvasStep = ({ key, text, icon, color, category = 'step', outlets }) => [
    {
        key: `${key}-group`,
        text,
        category: '',
        isGroup: true,
        getIconSrc: (iconColor = color) => svgComponentToBase64(<Icon path={icon} color={iconColor} width="20px" height="20px" />),
    },
    {
        key: `${key}-group-step`,
        text,
        category,
        group: `${key}-group`,
        color,
        getIconSrc: (iconColor = color) => svgComponentToBase64(<Icon path={icon} color={iconColor} width="20px" height="20px" />),
        hasIO: false,
    },
    ...outlets.map(outlet => ({
        category: 'outlet',
        group: `${key}-group`,
        key: `${key}-group-${outlet}`,
        text: outlet,
        color: '#D5DCF3',
    })),
];

export const makeCanvasLinksForStep = ({ key, outlets }) => outlets.map(outlet => ({
    from: `${key}-group-step`,
    to: `${key}-group-${outlet}`,
    key: `${key}-group-${outlet}-link`,
    category: 'outlet',
}));

export const makeCanvasLink = (from, to) => ({ from, to, key: `${from}-${to}-link` });

export const makeEditFlowDemo = ({
    diagramNodes: initialNodes, diagramLinks: initialLinks,
}) => () => {
    const [selectedNode, setSelectedNode] = useState();
    const disabled = false;

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    const [diagramNodes, setDiagramNodes] = useState(initialNodes);
    const [diagramLinks, setDiagramLinks] = useState(initialLinks);

    const { diagramProps } = useDiagram({
        isDisabled: disabled,
        groupTemplates: [
            ['', diagramGroupTemplate()],
            // Add a template for groups dragged from palette so that they look correct
            // when dragging.
            ['palette-group', paletteGroupTemplate()],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            // onClick can also be defined per node.
            ['step', stepTemplate()],
            // The outletTemplate can also be defined with a color on its own.
            ['outlet', outletTemplate()],
            ['finished', successNode()],
            ['error', failureNode()],
            ['branch', branchNode()],
            ['START', nodeTemplateStart()],
        ],
        onModelChange: ({
            insertedNodeKeys,
            modifiedNodeData,
            removedNodeKeys,
            insertedLinkKeys,
            modifiedLinkData,
            removedLinkKeys,
            droppedOntoNodeKey,
            droppedOntoLinkKey,
            selectedNodeData,
        }) => {
            // onModelChange gets called once at the beginning with every node,
            // so ignore key adds that involve too many new keys to have come from
            // the palette.

            if (selectedNodeData) {
                if (Object.keys(selectedNodeData).length && selectedNodeData.category !== 'outlet') {
                    setSelectedNode(selectedNodeData);
                } else {
                    setSelectedNode(null);
                }
            }

            if (insertedNodeKeys?.length > 2) {
                return;
            }
            if (insertedNodeKeys) {
                // Don't worry about other modified nodes, since these will just be
                // location changes that GoJS is already tracking.
                const addedNodes =
                    modifiedNodeData.filter(node => insertedNodeKeys.includes(node.key));
                const newNodes = addedNodes.flatMap(({ category, key, ...node }) => {
                    const replacementKey = key;
                    const modifiedNode = {
                        ...node,
                        // Remove palette categories so that nodes display correctly in diagram.
                        category: category === 'palette-group' ? '' : category,
                        key: replacementKey,
                    };

                    let groupKey;
                    if (node.outlets) {
                        groupKey = replacementKey;
                        return [
                            modifiedNode,
                            ...(node.outlets.map(outlet => ({
                                'key': `${replacementKey}-${outlet}`,
                                group: replacementKey,
                                'category': 'outlet',
                                color: '#D5DCF3',
                                'text': outlet,
                            }))),
                        ];
                    } else if (node.isGroup) {
                        groupKey = replacementKey;
                        return modifiedNode;
                    } else if (node.group) {
                        return {
                            ...modifiedNode,
                            key: `${groupKey}-step`,
                            group: groupKey,
                        };
                    }
                    return modifiedNode;
                });

                let groupKey;
                setDiagramNodes([
                    ...diagramNodes,
                    // Remove placeholder categories from nodes
                    ...newNodes,
                ]);

                const linkOutlet = outlet => ({
                    'from': `${outlet.group}-step`,
                    'to': outlet.key,
                    'key': `${outlet.group}-${outlet.key}`,
                    canRelink: false,
                });

                let newLinks = [];
                if (droppedOntoLinkKey) {
                    // Changing existing link to go to dropped node
                    newLinks = diagramLinks.map((link) => {
                        if (link.key === droppedOntoLinkKey) {
                            return { from: link.from, to: `${groupKey}-step` };
                        }
                        return link;
                    });
                } else if (droppedOntoNodeKey) {
                    newLinks = [
                        {
                            from: droppedOntoNodeKey,
                            to: `${groupKey}-step`,
                        },
                    ];
                }
                setDiagramLinks([
                    ...diagramLinks,
                    ...newLinks,
                    ...newNodes.map(newNode => (newNode.category === 'outlet' ? linkOutlet(newNode) : null)).filter(newLink => newLink !== null),
                ]);
            }

            if (modifiedNodeData && !insertedNodeKeys) {
                const sortedNodeData = modifiedNodeData.sort((a, b) => ((Number(a.loc.split(' ')) < Number(b.loc.split(' '))) ? 1 : -1));
                if (droppedOntoLinkKey) {
                    let linkTo;
                    const newLinks = diagramLinks.map((link) => {
                        if (link.key === droppedOntoLinkKey) {
                            linkTo = link.to;
                            return { from: link.from, to: sortedNodeData[0].key };
                        }
                        return link;
                    });
                    setDiagramLinks([
                        ...newLinks,
                        { from: sortedNodeData[sortedNodeData.length - 1].key, to: linkTo },
                    ]);
                } else if (droppedOntoNodeKey) {
                    let linkTo;
                    let linkedFrom = false;
                    const newLinks = diagramLinks.map((link) => {
                        if (link.from === droppedOntoNodeKey) {
                            linkedFrom = true;
                            linkTo = link.to;
                            return { from: link.from, to: sortedNodeData[0].key };
                        }
                        return link;
                    });
                    setDiagramLinks([
                        ...newLinks,
                        linkedFrom ?
                            { from: sortedNodeData[sortedNodeData.length - 1].key, to: linkTo } :
                            { from: droppedOntoNodeKey, to: sortedNodeData[0].key },
                    ]);
                }
            }

            if (insertedLinkKeys) {
                setDiagramLinks([
                    ...diagramLinks,
                    ...modifiedLinkData.filter(link => insertedLinkKeys.includes(link.key)),
                ]);
            }
            if (removedNodeKeys) {
                setDiagramNodes(diagramNodes.filter(node => !removedNodeKeys.includes(node.key)));
            }
            if (removedLinkKeys) {
                setDiagramLinks(diagramLinks.filter(link => !removedLinkKeys.includes(link.key)));
            }
        },
    });

    const { paletteProps } = usePalette({
        groupTemplates: [
            ['', paletteGroupTemplate()],
        ],
        nodeTemplates: [
            ['', paletteItemTemplate()],
        ],
        nodeDataArray: [
            ...makePaletteItem({
                text: 'Branch',
                key: 'branch',
                category: 'branch',
                color: COLORS.ORANGE,
                icon: mdiSourceBranch,
            }),
            ...makePaletteItem({
                text: 'Complete Flow',
                key: 'success',
                category: 'finished',
                color: COLORS.GREEN,
                icon: mdiCheck,
            }),
            ...makePaletteItem({
                text: 'Create Risk Evaluation',
                key: 'risk',
                color: COLORS.PURPLE,
                icon: mdiScaleBalance,
                outlets: ['High', 'Medium', 'Low'],
            }),
            ...makePaletteItem({
                text: 'Create User',
                key: 'create-user',
                color: COLORS.PURPLE,
                icon: mdiAccountPlus,
                outlets: ['Succeeded'],
            }),
            ...makePaletteItem({
                text: 'Form',
                key: 'form',
                color: COLORS.BLUE,
                icon: mdiFormSelect,
                outlets: ['Submitted'],
            }),
            ...makePaletteItem({
                text: 'MFA Enrollment',
                key: 'mfa-enrollment',
                color: COLORS.BLUE,
                icon: mdiCellphoneLink,
                outlets: ['Enrolled', 'Skipped'],
            }),
            ...makePaletteItem({
                text: 'Terminate Flow',
                key: 'terminate',
                category: 'error',
                color: COLORS.RED,
                icon: mdiClose,
            }),
            ...makePaletteItem({
                text: 'Verify Email',
                key: 'verify-email',
                color: COLORS.BLUE,
                icon: mdiEmail,
                outlets: ['Verified'],
            }),
            ...makePaletteItem({
                text: 'Read User',
                key: 'read-user',
                color: COLORS.PURPLE,
                icon: mdiAccountDetails,
                outlets: ['Succeeded'],
            }),
        ],
        linkDataArray: [],
    });

    const updateStepId = (selected, id, field) => {
        const currentNode = diagramNodes.find(node => node.key === selected.key);
        setSelectedNode({ ...currentNode, [field]: id });
        setDiagramNodes(diagramNodes.map(node => (node.key === selected.key ?
            { ...currentNode, [field]: id } : node)));
    };

    const getPanelIcon = (category) => {
        switch (category) {
            case 'finished':
                return <Success height={20} fill={COLORS.GREEN} />;
            case 'branch':
                return <Icon path={mdiSourceBranch} height="20px" width="20px" color={COLORS.ORANGE} />;
            case 'START':
                return <Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />;
            case 'error':
                return <Clear height={20} fill={COLORS.RED} />;
            default:
                return <Icon path={mdiSourceBranch} height="20px" width="20px" color={COLORS.ORANGE} />;
        }
    };

    return (
        <OuterContainer>
            <Box sx={{ borderBottom: '1px solid gray' }}>
                <Box isRow sx={{ alignItems: 'center', backgroundColor: '#F7F8FD', borderTop: '1px solid #CACED3', justifyContent: 'space-between', padding: 10 }}>
                    <Box>
                        <Text color="#68747F" fontSize={14} fontFamily="Helvetica">Flow Manager</Text>
                        <Text color="#253746" fontSize={18} fontFamily="Helvetica">Generic Registration</Text>
                    </Box>
                    <Box isRow sx={{ alignItems: 'center' }}>
                        <Error fill="#a30303" />
                        <Text color="#A31300" fontSize={14} fontFamily="Helvetica" ml="10px">2 errors. To save this flow, fix all errors.</Text>
                    </Box>
                    <Box isRow>
                        <Button sx={{ background: 'transparent', border: 'none' }}>Cancel</Button>
                        <Button sx={{ marginLeft: 10, marginRight: 15 }}>Save</Button>
                        <Button sx={{ background: '#4462ED', color: 'white' }}>Save & Close</Button>
                    </Box>
                </Box>
            </Box>
            <Body>
                <LeftContainer styles={{ width: 360 }}>
                    {selectedNode ? (
                        <Box sx={{ position: 'relative' }}>
                            <Box sx={{ cursor: 'pointer', position: 'absolute', top: 7, right: 7 }}>
                                <Clear onClick={onPanelClose} />
                            </Box>
                            <Box>
                                <Box m="35px 0px 6px 5%" justifyContent="space-between" alignItems="center" isRow>
                                    <Box isRow>
                                        <Image src={selectedNode.key !== 'step' ? svgComponentToBase64(getPanelIcon(selectedNode.category)) : selectedNode.getIconSrc(selectedNode.color)} />
                                        <Text ml="12px" variant="bodyStrong">{selectedNode.text}</Text>
                                    </Box>
                                </Box>
                                <Box alignItems="center">
                                    <Separator width="90%" mb={15} />
                                </Box>
                            </Box>
                            <Box alignItems="center">
                                <TextField label="Step name" controlProps={{ value: selectedNode.stepId || '' }} onChange={e => updateStepId(selectedNode, e.target.value, 'stepId')} width="90%" />
                                <TextField mt={20} label="Description" controlProps={{ value: selectedNode.description || '' }} onChange={e => updateStepId(selectedNode, e.target.value, 'description')} width="90%" />
                            </Box>
                        </Box>
                    ) : (
                        <React.Fragment>
                            <Box
                                isRow
                                sx={{
                                    justifyContent: 'center',
                                    margin: '15px 0px 20px 0px',
                                }}
                            >
                                <Tabs sx={{ width: 260 }} defaultSelectedKey="toolbox">
                                    <Tab key="properties" title="Properties" />
                                    <Tab key="toolbox" title="Toolbox">
                                        <Box sx={{ height: 400 }}>
                                            <PaletteWrapper>
                                                <Palette {...paletteProps} />
                                            </PaletteWrapper>
                                        </Box>
                                    </Tab>
                                </Tabs>
                            </Box>
                        </React.Fragment>
                    )}
                </LeftContainer>
                <DiagramWrapper>
                    <Diagram {...diagramProps} />
                </DiagramWrapper>
            </Body>
        </OuterContainer>
    );
};
