import React, { useState } from 'react';
import { Clear, Close, Desktop, Error, Success, Walkthrough } from '@pingux/icons';
import { Box, Button, Image, Separator, Tabs, Tab, Text, TextField } from '@pingux/astro';
import {
    mdiSourceBranch, mdiFlag, mdiCheck, mdiClose, mdiScaleBalance, mdiAccountPlus, mdiFormSelect, mdiCellphoneLink, mdiEmail,
    mdiAccountDetails, mdiCodeNotEqualVariant, mdiAccountConvert,
} from '@mdi/js';
import Icon from '@mdi/react';
import '../css/main.css';

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
} from '../utils/templates';
import { COLORS } from '../utils/constants';

import Body from '../components/Body';
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';
import OuterContainer from '../components/OuterContainer';
import { makePaletteItem, makeCanvasStep, makeCanvasLink, makeCanvasLinksForStep } from './utils/demoUtils';

const Demo = () => {
    const [selectedNode, setSelectedNode] = useState();
    const disabled = false;

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    const initialSteps = [
        {
            text: 'Read User',
            key: 'read-user',
            color: COLORS.PURPLE,
            icon: mdiAccountDetails,
            outlets: ['Succeeded', 'Error'],
        },
        {
            text: 'Branch',
            key: 'branch-1',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Aha! Khoros or LearnDot Application Request',
                'No Match',
            ],
        },
        {
            text: 'Branch 2',
            key: 'branch-2',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Is Sailpoint Employee',
                'No Match',
            ],
        },
        {
            text: 'Branch 3',
            key: 'branch-3',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Error',
                'No Match',
            ],
        },
        {
            text: 'Branch 4',
            key: 'branch-4',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Suspended',
                'No Match',
            ],
        },
        {
            text: 'Branch 5',
            key: 'branch-5',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Aha!',
                'Khoros',
                'LearnDot',
                'No Match',
            ],
        },
        {
            text: 'Branch 6',
            key: 'branch-6',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Access Granted',
                'No Match',
            ],
        },
        {
            text: 'Branch 7',
            key: 'branch-7',
            color: COLORS.ORANGE,
            category: 'branch',
            icon: mdiSourceBranch,
            outlets: [
                'Access Granted',
                'No Match',
            ],
        },
        {
            text: 'Invoke External Service',
            key: 'invoke-external-service',
            color: COLORS.PURPLE,
            icon: mdiCodeNotEqualVariant,
            outlets: ['Succeeded', 'Error'],
        },
        {
            text: 'Update User',
            key: 'update-user',
            color: COLORS.PURPLE,
            icon: mdiAccountConvert,
            outlets: ['Succeeded'],
        },
    ];

    const [diagramNodes, setDiagramNodes] = useState([
        { 'key': 'START', 'category': 'START', 'text': 'Start', 'loc': '0 60', 'id': 'START', hasIO: false, isRoot: true },
        { isGroup: 'true', 'key': 'isFinished' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished', 'text': 'Complete', 'group': 'isFinished', hasIO: false },
        { isGroup: 'true', 'key': 'terminate-group' },
        { 'key': 'terminate', 'category': 'error', 'text': 'Terminate', 'group': 'terminate-group', hasIO: false },
        ...initialSteps.flatMap(step => makeCanvasStep(step)),
    ]);

    const [diagramLinks, setDiagramLinks] = useState([
        makeCanvasLink('START', 'read-user-group-step'),
        makeCanvasLink('read-user-group-Succeeded', 'branch-1-group-step'),
        makeCanvasLink('read-user-group-Error', 'terminate'),
        makeCanvasLink('branch-1-group-Aha! Khoros or LearnDot Application Request', 'branch-2-group-step'),
        makeCanvasLink('branch-2-group-No Match', 'invoke-external-service-group-step'),
        makeCanvasLink('invoke-external-service-group-Error', 'terminate'),
        makeCanvasLink('branch-3-group-Error', 'terminate'),
        makeCanvasLink('branch-4-group-Suspended', 'terminate'),
        makeCanvasLink('invoke-external-service-group-Succeeded', 'branch-3-group-step'),
        makeCanvasLink('branch-1-group-No Match', 'finished'),
        makeCanvasLink('branch-2-group-Is Sailpoint Employee', 'finished'),
        makeCanvasLink('branch-3-group-No Match', 'update-user-group-step'),
        makeCanvasLink('update-user-group-Succeeded', 'branch-4-group-step'),
        makeCanvasLink('branch-4-group-No Match', 'branch-5-group-step'),
        makeCanvasLink('branch-5-group-Aha!', 'finished'),
        makeCanvasLink('branch-5-group-Khoros', 'branch-6-group-step'),
        makeCanvasLink('branch-5-group-LearnDot', 'branch-7-group-step'),
        makeCanvasLink('branch-5-group-No Match', 'terminate'),
        makeCanvasLink('branch-6-group-No Match', 'terminate'),
        makeCanvasLink('branch-7-group-No Match', 'terminate'),
        makeCanvasLink('branch-6-group-Access Granted', 'finished'),
        makeCanvasLink('branch-7-group-Access Granted', 'finished'),
        ...initialSteps.flatMap(step => makeCanvasLinksForStep(step)),
    ]);

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
                            })))
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

                console.log(newNodes);

                let groupKey;
                setDiagramNodes([
                    ...diagramNodes,
                    // Remove placeholder categories from nodes
                    ...newNodes,
                ]);

                const linkOutlet = (outlet) => ({
                    'from': `${outlet.group}-step`,
                    'to': outlet.key,
                    'key': `${outlet.group}-${outlet.key}`,
                    canRelink: false,
                });

                let newLinks = [];
                if (droppedOntoLinkKey) {
                    let linkTo;
                    // Changing existing link to go to dropped node
                    newLinks = diagramLinks.map((link) => {
                        if (link.key === droppedOntoLinkKey) {
                            linkTo = link.to;
                            return { from: link.from, to: `${groupKey}-step` }
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
                console.log(newLinks);
            }

            if (modifiedNodeData && !insertedNodeKeys) {
                const sortedNodeData = modifiedNodeData.sort((a, b) => (Number(a.loc.split(' ')) < Number(b.loc.split(' '))) ? 1 : -1 )
                if (droppedOntoLinkKey) {
                    let linkTo;
                    const newLinks = diagramLinks.map((link) => {
                        if (link.key === droppedOntoLinkKey) {
                            linkTo = link.to;
                            return { from: link.from, to: sortedNodeData[0].key }
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
                            return { from: link.from, to: sortedNodeData[0].key }
                        }
                        return link;
                    });
                    setDiagramLinks([
                        ...newLinks,
                        linkedFrom ? { from: sortedNodeData[sortedNodeData.length - 1].key, to: linkTo } : { from: droppedOntoNodeKey, to: sortedNodeData[0].key },
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

    const { paletteProps, paletteObject } = usePalette({
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
        setDiagramNodes(diagramNodes.map(node => (node.key === selected.key ? { ...currentNode, [field]: id } : node)));
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
    }

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

export const SailPointFlow = () => (
    <Demo />
);

export default {
    title: 'Example Flows',
    component: SailPointFlow,
};
