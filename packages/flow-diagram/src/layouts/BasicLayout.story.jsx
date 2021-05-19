import React, { useState } from 'react';
import { Close, Desktop, Error, Success, Walkthrough } from '@pingux/icons';
import { Box, Button, Image, Separator, Text, TextField } from '@pingux/astro';
import { mdiTools, mdiFormSelect, mdiSourceBranch, mdiFlag } from '@mdi/js';
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
import ConfigPanel from '../components/ConfigPanel';
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';
import TopPanel from '../components/TopPanel';
import OuterContainer from '../components/OuterContainer';

const Demo = () => {
    const [selectedNode, setSelectedNode] = useState();
    const disabled = false;

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    const [diagramNodes, setDiagramNodes] = useState([
        { isGroup: 'true', 'key': 'group' },
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            'group': 'group',
            canLinkFrom: false,
            hasIO: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
        { isGroup: 'true', 'key': 'execute_group' },
        {
            'key': 'step',
            'category': 'step',
            'stepId': 'registration',
            'text': 'Execute Flow',
            'group': 'execute_group',
            canLinkFrom: false,
            hasIO: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#228C22',
            errorMessage: 'Some data is invalid here',
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' },
        { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure', 'group': 'group' },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user', 'group': 'group' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished' },
        { 'key': 'START', 'category': 'START', 'text': 'Start', 'loc': '0 60', 'id': 'START' }]);

    const [diagramLinks, setDiagramLinks] = useState([
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success', 'category': 'outlet' },
        { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ]);

    const { diagramProps } = useDiagram({
        isDisabled: disabled,
        groupTemplates: [
            ['', diagramGroupTemplate],
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
            ['outlet', outletTemplate({ width: 100 })],
            ['finished', successNode],
            ['error', failureNode],
            ['branch', branchNode],
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
                if (Object.keys(selectedNodeData).length) {
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

                let groupKey;
                if (droppedOntoLinkKey || droppedOntoNodeKey) {
                    setDiagramNodes([
                        ...diagramNodes,
                        // Remove placeholder categories from nodes
                        ...addedNodes.flatMap(({ category, key, loc, ...node }) => {
                            const replacementKey = key;
                            const modifiedNode = {
                                ...node,
                                // Remove palette categories so that nodes display correctly in diagram.
                                category: category === 'palette-group' ? '' : category,
                                key: replacementKey,
                            };

                            if (node.isGroup) {
                                groupKey = replacementKey;
                                const returnNode = [
                                    modifiedNode,
                                    ...key.startsWith('login-group') ? [{
                                        'key': `${replacementKey}-success`,
                                        group: replacementKey,
                                        'category': 'outlet',
                                        color: '#D5DCF3',
                                        'text': 'On Success',
                                    }] : [],
                                ];
                                return returnNode;
                            } else if (node.group) {
                                const returnNode = {
                                    ...modifiedNode,
                                    key: `${groupKey}-step`,
                                    group: groupKey,
                                };
                                return returnNode;
                            }



                            return modifiedNode;
                        }),
                    ]);
                }

                const createLinkedNodes = (key) => {
                    return {
                        'from': `${key}-step`,
                        'to': `${key}-success`,
                        'key': `${key}-step-success-link`,
                        canRelink: false,
                    };
                };

                if (droppedOntoLinkKey) {
                    let linkTo;
                    // Changing existing link to go to dropped node
                    const newLinks = diagramLinks.map((link) => {
                        if (link.key === droppedOntoLinkKey) {
                            linkTo = link.to;
                            return { from: link.from, to: `${groupKey}-step` }
                        }
                        return link;
                    });
                    // Adding link from dropped node to previously linked node
                    if (!addedNodes[0].key.startsWith('login-group')) {
                        setDiagramLinks([
                            ...newLinks,
                            { from: `${groupKey}-step`, to: linkTo },
                        ]);
                    } else {
                        setDiagramLinks([
                            ...newLinks,
                            createLinkedNodes(groupKey),
                            { from: `${groupKey}-success`, to: linkTo },
                        ]);
                    }
                } else if (droppedOntoNodeKey) {
                    let linkTo;
                    let linkedFrom = false;
                    // Changing link after node dropped onto to go to dropped node
                    const newLinks = diagramLinks.map((link) => {
                        if (link.from === droppedOntoNodeKey) {
                            linkedFrom = true;
                            linkTo = link.to;
                            return { from: link.from, to: `${groupKey}-step` };
                        }
                        return link;
                    });
                    // Either adding link from dropped onto node to dropped node, or from dropped node to previously linked node
                    if (!addedNodes[0].key.startsWith('login-group')) {
                        setDiagramLinks([
                            ...newLinks,
                            linkedFrom ? { from: `${groupKey}-step`, to: linkTo } : { from: droppedOntoNodeKey, to: `${groupKey}-step` },
                        ]);
                    } else {
                        setDiagramLinks([
                            ...newLinks,
                            createLinkedNodes(groupKey),
                            { from: droppedOntoNodeKey, to: `${groupKey}-step` },
                            { from: `${groupKey}-success`, to: linkTo },
                        ]);
                    }
                } else if (addedNodes[0].key.startsWith('login-group')) {
                    setDiagramLinks([
                        ...diagramLinks,
                        createLinkedNodes(groupKey),
                    ]);
                }
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
            {
                isGroup: true,
                'key': 'login-group',
                'category': 'palette-group',
                'text': 'User Login',
                getIconSrc: (color = '#028CFF') => svgComponentToBase64(<Desktop fill={color} />),
            },
            {
                group: 'login-group',
                'key': 'login',
                'category': 'step',
                'text': 'User Login',
                getIconSrc: (color = '#028CFF') => svgComponentToBase64(<Desktop fill={color} />),
                color: '#028CFF',
                stepId: 'newLogin',
            },
            {
                'key': 'execute-flow-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
            },
            {
                'key': 'execute-flow',
                group: 'execute-flow-group',
                'category': 'step',
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
                color: '#228C22',
                stepId: 'newLogin',
            },
            {
                'key': 'finished-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Complete',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'finished',
                'category': 'finished',
                group: 'finished-group',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'error-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Failure',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
            {
                'key': 'error',
                'category': 'error',
                group: 'error-group',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
            {
                'key': 'branch-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Branch',
                getIconSrc: (color = COLORS.ORANGE) => svgComponentToBase64(<Icon path={mdiSourceBranch} color={color} width="20px" height="20px" />),
            },
            {
                'key': 'branch',
                'category': 'branch',
                group: 'branch-group',
                getIconSrc: (color = COLORS.ORANGE) => svgComponentToBase64(<Icon path={mdiSourceBranch} color={color} width="20px" height="20px" />),
            },
        ],
        linkDataArray: [],
    });

    const updateStepId = (selected, id, field) => {
        const currentNode = diagramNodes.find(node => node.key === selected.key);
        setSelectedNode({ ...currentNode, [field]: id });
        setDiagramNodes(diagramNodes.map(node => (node.key === selected.key ? { ...currentNode, [field]: id } : node)));
    };

    return (
        <OuterContainer>
            <TopPanel>
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
            </TopPanel>
            <Body>
                <LeftContainer styles={{ width: 360 }}>
                    {selectedNode && selectedNode.category === 'step' ? (
                        <ConfigPanel
                            onClose={onPanelClose}
                            topPanel={
                                <Box>
                                    <Box m="35px 0px 6px 5%" justifyContent="space-between" alignItems="center" isRow>
                                        <Box isRow>
                                            <Image src={selectedNode.key === 'START' ? svgComponentToBase64(<Icon path={mdiFlag} height="20px" width="20px" color={COLORS.GREEN} />) : selectedNode.getIconSrc(selectedNode.color)} />
                                            <Text ml="12px" variant="bodyStrong">{selectedNode.text}</Text>
                                        </Box>
                                    </Box>
                                    <Box alignItems="center">
                                        <Separator width="90%" mb={15} />
                                    </Box>
                                </Box>
                            }
                        >
                            <Box alignItems="center">
                                <TextField label="Step name" controlProps={{ value: selectedNode.stepId }} onChange={e => updateStepId(selectedNode, e.target.value, 'stepId')} width="90%" />
                                <TextField mt={20} label="Description" value={selectedNode.description || ''} onChange={e => updateStepId(selectedNode, e.target.value, 'description')} width="90%" />
                            </Box>
                        </ConfigPanel>
                    ) : (
                        <React.Fragment>
                            <Box
                                isRow
                                sx={{
                                    borderBottom: '1px solid #E1DDFD',
                                    justifyContent: 'center',
                                    margin: '30px 15px 20px 15px',
                                }}
                            >
                                <Box sx={{
                                    alignItems: 'center',
                                    borderBottom: '2px solid transparent',
                                    paddingBottom: 5,
                                }}
                                >
                                    <Icon
                                        path={mdiFormSelect}
                                        size={1}
                                        color="#68747F"
                                    />
                                    <Text color="#68747F" fontSize={13} fontFamily="Helvetica" mt="5px">PROPERTIES</Text>
                                </Box>
                                <Box width={25} />
                                <Box sx={{
                                    alignItems: 'center',
                                    borderBottom: '2px solid #4462ED',
                                    paddingBottom: 5,
                                }}
                                >
                                    <Icon
                                        path={mdiTools}
                                        size={1}
                                        color="#526BDB"
                                    />
                                    <Text color="#526BDB" fontSize={13} fontFamily="Helvetica" mt="5px">TOOLBOX</Text>
                                </Box>
                            </Box>
                            <PaletteWrapper>
                                <Palette {...paletteProps} />
                            </PaletteWrapper>
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

export const Composed = () => (
    <Demo />
);

export default {
    title: 'Basic Layout',
    component: Composed,
};
