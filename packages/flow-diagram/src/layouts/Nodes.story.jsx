import React, { useState } from 'react';
import { Desktop } from '@pingux/icons';
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
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';

export const Branch = () => {
    const [diagramNodes, setDiagramNodes] = useState([
        {
            isGroup: 'true',
            'key': 'group',
        },
        { 'key': 'branch', 'category': 'branch', 'group': 'group' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['branch', branchNode],
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
    const [diagramNodes, setDiagramNodes] = useState([
        {
            isGroup: 'true',
            'key': 'group',
        },
        { 'key': 'failure', 'category': 'failure', 'group': 'group' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['failure', failureNode],
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
    const [selectedNode, setSelectedNode] = useState();

    const onStepClick = (e, obj) => {
        setSelectedNode(obj.part.data);
    };
    const [diagramNodes, setDiagramNodes] = useState([
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
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' },
        { 'key': 'user-login-failure', 'category': 'outlet', color: '#E4E7E9', 'text': 'On Failure', 'group': 'group' },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user', 'group': 'group' },
    ]);

    const [diagramLinks, setDiagramLinks] = useState([
        { 'from': 'user-login', 'to': 'user-login-success', 'key': 'user-login_user-login-success', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-failure', 'key': 'user-login_user-login-failure', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate({ onClick: onStepClick })],
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
    const [diagramNodes, setDiagramNodes] = useState([
        {
            isGroup: 'true',
            'key': 'group',
        },
        { 'key': 'user-login-success', 'category': 'outlet', color: '#D5DCF3', 'text': 'On Success', width: 100, 'group': 'group' }
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
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

export const PaletteNodes = () => {
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
        ],
        linkDataArray: [],
    });

    return (
        <LeftContainer styles={{ height: 50, width: 360 }}>
            <PaletteWrapper>
                <Palette {...paletteProps} />
            </PaletteWrapper>
        </LeftContainer>
    );
};

export const Start = () => {
    const [diagramNodes, setDiagramNodes] = useState([
        { 'key': 'START', 'category': 'START', 'loc': '0 60', 'id': 'START' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
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
    const [selectedNode, setSelectedNode] = useState();

    const onStepClick = (e, obj) => {
        setSelectedNode(obj.part.data);
    };

    const [diagramNodes, setDiagramNodes] = useState([
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
            getIconSrc: color => svgComponentToBase64(<Desktop fill={color} />),
            color: '#028CFF',
        },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
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
    const [diagramNodes, setDiagramNodes] = useState([
        {
            isGroup: 'true',
            'key': 'group',
        },
        { 'key': 'success', 'category': 'success', 'group': 'group' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: [],
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['success', successNode],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ height: 200, width: 700 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export default {
    title: 'Nodes',
    component: Branch,
    argTypes: {
        category: {
            description: 'Node category. Corresponds to name of desired template',
            control: {
                type: null,
            },
            type: { summary: 'string' },
        },
        group: {
            description: 'Group that contains node. Nodes can only move when they are part of a group. Grouped nodes move together.',
            control: {
                type: null,
            },
            type: { summary: 'string' },
        },
        isGroup: {
            description: 'Determines whether element is node or group',
            control: {
                type: null,
            },
            type: { summary: 'bool' },
        },
        key: {
            description: 'Node/Group key',
            control: {
                type: null,
            },
            type: { summary: 'string' },
        },
        stepId: {
            description: 'Subtitle of step node',
            control: {
                type: null,
            },
            type: { summary: 'string' },
        },
    },
};
