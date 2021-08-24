import React, { useState } from 'react';
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

export const Branch = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        { 'key': 'branch', 'category': 'branch', 'group': 'group', 'text': 'Branch' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['branch', branchNode()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Failure = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        { 'key': 'failure', 'category': 'failure', 'group': 'group', 'text': 'Failure' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['failure', failureNode()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Group = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            'group': 'group',
            canLinkFrom: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' },
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
            // The outletTemplate can also be defined with a color on its own.
            ['outlet', outletTemplate({ width: 100 })],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Outlet = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['outlet', outletTemplate({ width: 100 })],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Start = () => {
    const diagramNodes = [{ 'key': 'START', 'category': 'START', 'loc': '0 60', 'id': 'START', 'text': 'Start' }];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['START', nodeTemplateStart()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Step = () => {
    const onStepClick = (e, obj) => {
        console.log('clicked');
    };

    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        {
            'key': 'user-login',
            'category': 'step',
            'text': 'User login',
            'stepId': 'userLogin',
            'group': 'group',
            canLinkFrom: false,
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            // onClick can also be defined per node.
            ['step', stepTemplate({ onClick: onStepClick })],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export const Success = () => {
    const diagramNodes = [
        { isGroup: 'true', 'key': 'group' },
        { 'key': 'success', 'category': 'success', 'group': 'group', 'text': 'Complete' },
    ];

    const { diagramProps } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate()],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['success', successNode()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

Branch.defaultProps = {
    canLinkFrom: true,
    canLinkTo: true,
    hasIO: true,
    isGroup: false,
};

Branch.propTypes = {
    /** Border color of outlet node */
    borderColor: PropTypes.string,
    /** Step node has "from" port on its right side */
    canLinkFrom: PropTypes.bool,
    /** Step node has "to" port on its left side */
    canLinkTo: PropTypes.bool,
    /** Node category. Corresponds to name of desired template */
    category: PropTypes.string,
    /** Error message displayed on hover action on error icon above node */
    errorMessage: PropTypes.string,
    /** Group that contains node. Nodes can only move when they are part of a group.
     * Grouped nodes move together. */
    group: PropTypes.string,
    /** Step node has input/output port on its bottom */
    hasIO: PropTypes.bool,
    /** Determines whether element is node or group */
    isGroup: PropTypes.bool,
    /** Determines what is root node for auto layout (only nodes connected to this will auto layout) */
    isRoot: PropTypes.bool,
    /** Node/Group key */
    key: PropTypes.string,
    /** Subtitle of step node */
    stepId: PropTypes.string,
    /** Main text of node */
    text: PropTypes.string,
};

export default {
    title: 'Diagram Nodes',
    component: Branch,
};
