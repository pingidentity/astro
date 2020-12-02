import React, { useState } from 'react';
import { Close, Desktop, Error, Success, Walkthrough } from '@pingux/icons';
import { Box, Button, Text } from '@pingux/compass';
import { css } from '@emotion/core';
import { mdiTools, mdiFormSelect } from '@mdi/js';
import Icon from '@mdi/react';

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


    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [['', diagramGroupTemplate]],
        linkDataArray: [
            { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success' },
            { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
            { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure' },
            { 'from': 'user-login-failure', 'to': 'error', 'key': 'user-login-failure_error' },
            { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found' },
            { 'from': 'user-login-not_found', 'to': 'registration', 'key': 'user-login-not_found_registration' },
            { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
        ],
        nodeDataArray: [
            {
                'key': 'user-login',
                'category': 'step',
                'name': 'User login',
                'stepId': 'userLogin',
                canLinkFrom: false,
                getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
                iconSrc: svgComponentToBase64(<Desktop fill={COLORS.WHITE} />),
                color: '#028CFF',
            },
            {
                'key': 'step',
                'category': 'step',
                'stepId': 'registration',
                'name': 'Execute Flow',
                canLinkFrom: false,
                getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
                iconSrc: svgComponentToBase64(<Walkthrough fill={COLORS.WHITE} />),
                color: '#228C22',
            },
            { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', width: 100, 'text': 'On Success' },
            { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure' },
            { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user' },
            { 'key': 'finished', 'category': 'finished', 'stepId': 'finished' },
            { 'key': 'START', 'category': 'START', 'loc': '0 60', 'id': 'START' }],
        nodeTemplates: [
            // onClick can also be defined per node.
            ['step', stepTemplate({ onClick: onStepClick })],
            // The outletTemplate can also be defined with a color on its own.
            ['outlet', outletTemplate({ width: 100 })],
            ['finished', successNode],
            ['error', failureNode],
            ['START', nodeTemplateStart()],
        ],
        onModelChange: ({
            insertedNodeKeys,
            insertedLinkKeys,
            modifiedLinkData,
            modifiedNodeData,
            removedLinkKeys,
            removedNodeKeys,
        }) => {
            console.log('insertedNodeKeys');
        },
    });

    const { paletteProps, paletteObject } = usePalette({
        groupTemplates: [
            ['', paletteGroupTemplate],
        ],
        nodeTemplates: [
            ['', paletteItemTemplate()],
        ],
        nodeDataArray: [
            {
                'key': 'LOGIN',
                'category': 'step',
                'text': 'Login',
                getIconSrc: (color = '#028CFF') => svgComponentToBase64(<Desktop fill={color} />),
                color: '#028CFF',
                stepId: 'newLogin',
                name: 'User Login',
            },
            {
                'key': 'EXECUTE_FLOW',
                'category': 'step',
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
                color: '#228C22',
                stepId: 'newLogin',
                name: 'Execute Flow',
            },
            {
                'key': 'finished',
                'category': 'finished',
                'text': 'Complete',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'error',
                'category': 'error',
                'text': 'Failure',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
        ],
        linkDataArray: [],
    });

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
