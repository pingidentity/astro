import React, { useState } from 'react';
import { Desktop } from '@pingux/icons';
import '../css/main.css';

import {
    diagramGroupTemplate,
    nodeTemplateStart,
    stepTemplate,
    svgComponentToBase64,
} from '../utils/templates';
import { Diagram, DiagramWrapper } from '../components/Diagram';
import useDiagram from '../hooks/useDiagram';

export const Errors = () => {
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
            'errorMessage': 'This is a step error',
        },
        {
            'key': 'START',
            'category': 'START',
            'text': 'Start',
            'loc': '0 60',
            'id': 'START',
            'errorMessage': 'This is a start error'
        },
    ]);

    const [diagramLinks, setDiagramLinks] = useState([
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ]);

    const { diagramProps, diagramObject } = useDiagram({
        groupTemplates: [
            ['', diagramGroupTemplate],
        ],
        linkDataArray: diagramLinks,
        nodeDataArray: diagramNodes,
        nodeTemplates: [
            ['step', stepTemplate()],
            ['START', nodeTemplateStart()],
        ],
        onModelChange: () => {},
    });

    return (
        <DiagramWrapper style={{ width: 500, height: 300 }}>
            <Diagram {...diagramProps} />
        </DiagramWrapper>
    );
};

export default {
    title: 'Error State',
    component: Errors,
};
