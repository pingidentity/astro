import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Desktop } from '@pingux/icons';
import '../css/main.css';

import {
    diagramGroupTemplate,
    outletTemplate,
    stepTemplate,
    svgComponentToBase64,
} from '../utils/templates';
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';

export const Default = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            'group': 'group',
            hasIO: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
            isRoot: true,
        },
        {
            isGroup: 'true',
            'key': 'execute_group',
        },
        {
            'key': 'execute-flow',
            'category': 'step',
            'stepId': 'registration',
            'text': 'Execute Flow',
            'group': 'execute_group',
            canLinkFrom: false,
            hasIO: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#228C22',
        },
    ];

    const diagramLinks = [{ 'from': 'user-login', 'to': 'execute-flow', 'key': 'user-login_execute-flow', onClick: () => console.log('clicked') }];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ width: 500, height: 300 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const IO = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            'group': 'group',
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
            isRoot: true,
        },
        {
            isGroup: 'true',
            'key': 'execute_group',
        },
        {
            'key': 'execute-flow',
            'category': 'step',
            'stepId': 'registration',
            'text': 'Execute Flow',
            'group': 'execute_group',
            canLinkFrom: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#228C22',
        },
    ];

    const diagramLinks = [
        { 'from': 'user-login', 'to': 'execute-flow', 'key': 'user-login_execute-flow' },
        { 'from': 'user-login', 'to': 'execute-flow', 'key': 'user-login_execute-flow-io', 'category': 'io' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ width: 500, height: 300 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Outlet = () => {
    const diagramNodes = [
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
            isRoot: true,
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', 'group': 'group' },
        { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure', 'group': 'group' },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user', 'group': 'group' },
    ];

    const diagramLinks = [
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
            ['outlet', outletTemplate({ width: 100 })],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ width: 500, height: 300 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

Default.propTypes = {
    /** Link category. Corresponds to name of desired link */
    category: PropTypes.string,
    /** Origin node for link */
    from: PropTypes.string,
    /** Link key */
    key: PropTypes.string,
    /** onClick function for link */
    onClick: PropTypes.func,
    /** Destination node for link */
    to: PropTypes.string,
};

export default {
    title: 'Diagram Links',
    component: Default,
};
