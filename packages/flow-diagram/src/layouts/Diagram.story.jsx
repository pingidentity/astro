import React from 'react';
import PropTypes from 'prop-types';
import { Desktop } from '@pingux/icons';
import '../css/main.css';

import {
    branchNode,
    diagramGroupTemplate,
    failureNode,
    nodeTemplateStart,
    outletTemplate,
    stepTemplate,
    successNode,
    svgComponentToBase64,
} from '../utils/templates';

import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';

export const DiagramComponent = () => {
    const disabled = false;
    const diagramNodes = [
        {
            isGroup: 'true',
            'key': 'group',
        },
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
        { isGroup: 'true', 'key': 'isFinished' },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' },
        { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure', 'group': 'group' },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user', 'group': 'group' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished', 'group': 'isFinished' },
        { 'key': 'START', 'category': 'START', 'text': 'Start', 'loc': '0 60', 'id': 'START' }];

    const diagramLinks = [
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success', 'category': 'outlet' },
        { 'from': 'user-login-success', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ];

    const { diagramProps, diagramObject } = useDiagram({
        isDisabled: disabled,
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
            ['outlet', outletTemplate({ width: 100 })],
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
        }) => {},
    });

    return (
        <DiagramWrapper style={{ width: 600, height: 300 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

DiagramComponent.defaultProps = {
    isDisabled: false,
};

DiagramComponent.propTypes = {
    /** Disables interaction with the diagram. */
    isDisabled: PropTypes.bool,
    /** Templates for groups of nodes. diagramGroupTemplate should be used. */
    groupTemplates: PropTypes.arrayOf(PropTypes.array),
    /** Defines links connecting nodes. */
    linkDataArray: PropTypes.arrayOf(PropTypes.object),
    /** Defines nodes that appear on the diagram. */
    nodeDataArray: PropTypes.arrayOf(PropTypes.object),
    /** Templates for nodes.
     * First element in the inner arrays is the category name, second is the template. */
    nodeTemplates: PropTypes.arrayOf(PropTypes.array),
    /** Callback that fires every time there is a change to the diagram. */
    onModelChange: PropTypes.func,
};

export default {
    title: 'Diagram',
    component: DiagramComponent,
};
