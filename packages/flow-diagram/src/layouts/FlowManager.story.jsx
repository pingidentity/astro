import React, { useState } from 'react';
import { Close, Desktop, Error, Success, Walkthrough } from '@pingux/icons';
import { Box, Button, Text } from '@pingux/compass';
import { css } from '@emotion/core';
import { mdiTools, mdiFormSelect } from '@mdi/js';
import Icon from '@mdi/react';
import partition from 'lodash/partition';
import { v4 as uuidV4 } from 'uuid';

import {
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

export default {
    title: 'Flow Manager Layout',
};

export const Composed = () => {
    const [selectedNode, setSelectedNode] = useState();

    const onStepClick = (e, obj) => {
        setSelectedNode(obj.part.data);
    };

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    const [diagramNodes, setDiagramNodes] = useState([
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            canLinkFrom: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
        {
            'key': 'step',
            'category': 'step',
            'stepId': 'registration',
            'text': 'Execute Flow',
            canLinkFrom: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#228C22',
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100 },
        { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure' },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished' },
        { 'key': 'START', 'category': 'START', 'loc': '0 60', 'id': 'START' }]);

    const [diagramLinks, setDiagramLinks] = useState([
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success' },
        { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure' },
        { 'from': 'user-login-failure', 'to': 'error', 'key': 'user-login-failure_error' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found' },
        { 'from': 'user-login-not_found', 'to': 'registration', 'key': 'user-login-not_found_registration' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
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
            ['step', stepTemplate({ onClick: onStepClick })],
            // The outletTemplate can also be defined with a color on its own.
            ['outlet', outletTemplate({ width: 100 })],
            ['finished', successNode],
            ['error', failureNode],
            ['START', nodeTemplateStart()],
            // Add a palette item template so that the above node types
            // look correct while dragging into diagram.
            ['palette-item', paletteItemTemplate()],
        ],
        onModelChange: ({
            insertedNodeKeys,
            modifiedNodeData,
            removedNodeKeys,
            insertedLinkKeys,
            modifiedLinkData,
            removedLinkKeys,
        }) => {
            // onModelChange gets called once at the beginning with every node,
            // so ignore key adds that involve too many new keys to have come from
            // the palette.
            if (insertedNodeKeys?.length > 2) {
                return;
            }
            if (insertedNodeKeys) {
                // Don't worry about other modified nodes, since these will just be
                // location changes that GoJS is already tracking.
                const addedNodes =
                    modifiedNodeData.filter(node => insertedNodeKeys.includes(node.key));

                let groupKey;
                setDiagramNodes([
                    ...diagramNodes,
                    // Remove placeholder categories from nodes
                    ...addedNodes.flatMap(({ category, key, loc, ...node }) => {
                        const replacementKey = uuidV4();
                        const modifiedNode = {
                            ...node,
                            // Remove palette categories so that nodes display correctly in diagram.
                            category: category === 'palette-group' ? '' : 'step',
                            key: replacementKey,
                        };
                        if (node.isGroup) {
                            groupKey = replacementKey;
                            return [
                                modifiedNode,
                                ...key === 'login-group' ? [{
                                    'key': `${replacementKey}-success`,
                                    group: replacementKey,
                                    'category': 'outlet',
                                    color: '#D5DCF3',
                                    'text': 'On Success',
                                }] : [],
                            ];
                        } else if (node.group) {
                            return {
                                ...modifiedNode,
                                key: `${groupKey}-step`,
                                group: groupKey,
                            };
                        }

                        return modifiedNode;
                    }),
                ]);

                // Add a link between
                if (groupKey) {
                    setDiagramLinks([
                        ...diagramLinks,
                        {
                            'from': `${groupKey}-step`,
                            'to': `${groupKey}-success`,
                            'key': `${groupKey}-step-success-link`,
                            canRelink: false,
                        },
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
                color: '#028CFF',
                stepId: 'newLogin',
                name: 'User Login',
            },
            {
                group: 'login-group',
                'key': 'login',
                'category': 'step',
                'text': 'User Login',
                getIconSrc: (color = '#028CFF') => svgComponentToBase64(<Desktop fill={color} />),
                color: '#028CFF',
                stepId: 'newLogin',
                name: 'User Login',
            },
            {
                'key': 'execute-flow-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
                color: '#228C22',
                stepId: 'newLogin',
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
                'key': 'finished',
                'category': 'palette-item',
                'text': 'Complete',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'error',
                'category': 'palette-item',
                'text': 'Failure',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
        ],
        linkDataArray: [],
    });

    // The diagram object is populated after the initial render, so check to see if it's defined
    // before adding listeners.
    if (diagramObject) {
        diagramObject.addDiagramListener('ChangedSelection', (e) => {
            // If a node is deselected in diagram, clear selected node.
            if (e.diagram.selection.count === 0) {
                setSelectedNode(null);
            }
        });
    }

    return (
        <OuterContainer>
            <TopPanel>
                <div style={{ alignItems: 'center', backgroundColor: '#F7F8FD', borderTop: '1px solid #CACED3', display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                    <div>
                        <Text color="#68747F" fontSize={14} fontFamily="Helvetica">Flow Manager</Text>
                        <Text color="#253746" fontSize={18} fontFamily="Helvetica">Generic Registration</Text>
                    </div>
                    <div style={{ alignItems: 'center', display: 'flex' }}>
                        <Error fill="#a30303" />
                        <Text color="#A31300" fontSize={14} fontFamily="Helvetica" ml="10px">2 errors. To save this flow, fix all errors.</Text>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Button style={{ background: 'transparent', border: 'none' }}>Cancel</Button>
                        <Button style={{ marginLeft: 10, marginRight: 15 }}>Save</Button>
                        <Button style={{ background: '#4462ED', color: 'white' }}>Save & Close</Button>
                    </div>
                </div>
            </TopPanel>
            <Body>
                <LeftContainer>
                    {selectedNode ? (
                        <ConfigPanel
                            icon={<Desktop fill="#028CFF" height={22} width={22} />}
                            color="#028CFF"
                            category={selectedNode.category}
                            onClose={onPanelClose}
                        >
                            {/* Add configuration component here */}
                        </ConfigPanel>
                    ) : (
                        <React.Fragment>
                            <div css={css`
                                border-bottom: 1px solid #E1DDFD;
                                display: flex;
                                flex-direction: row;
                                justify-content: center;
                                margin: 30px 15px 20px 15px;
                                `}
                            >
                                <div css={css`
                                    align-items: center;
                                    border-bottom: 2px solid transparent;
                                    display: flex;
                                    flex-direction: column;
                                    padding-bottom: 5px;
                                    `}
                                >
                                    <Icon
                                        path={mdiFormSelect}
                                        size={1}
                                        color="#68747F"
                                    />
                                    <Text color="#68747F" fontSize={13} fontFamily="Helvetica" mt="5px">PROPERTIES</Text>
                                </div>
                                <Box width={25} />
                                <div css={css`
                                        align-items: center;
                                        border-bottom: 2px solid #4462ED;
                                        display: flex;
                                        flex-direction: column;
                                        padding-bottom: 5px;
                                        `}
                                >
                                    <Icon
                                        path={mdiTools}
                                        size={1}
                                        color="#526BDB"
                                    />
                                    <Text color="#526BDB" fontSize={13} fontFamily="Helvetica" mt="5px">TOOLBOX</Text>
                                </div>
                            </div>
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
