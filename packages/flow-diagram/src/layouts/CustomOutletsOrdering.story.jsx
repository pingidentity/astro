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

const customComparer = (a, b) => {
    // "no such user" will be the latest, others will maintain insertion order
    if (a.node.data.text === 'no such user') return 1;
    if (b.node.data.text === 'no such user') return -1;
    /* for newly created nodes we may not provide explicit `.data.index`
    but they still will go in insertion order when `undefined` is returned from comparer function
     */
    return a.node.data.index - b.node.data.index;
};

export const DiagramComponent = () => {
    const disabled = false;
    const [diagramNodes, setDiagramNodes] = React.useState([
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
        { 'key': 'user-login-d', 'category': 'outlet', color: '#E4E7E9', 'text': 'd', 'group': 'group', index: 0 },
        { 'key': 'user-login-b', 'category': 'outlet', color: '#E4E7E9', 'text': 'b', 'group': 'group', index: 1 },
        { 'key': 'user-login-a', 'category': 'outlet', color: '#D5DCF3', 'text': 'a', width: 100, 'group': 'group', index: 2 },
        { 'key': 'user-login-c', 'category': 'outlet', color: '#E4E7E9', 'text': 'c', 'group': 'group', index: 3 },
        { 'key': 'user-login-not_found', 'category': 'outlet', color: '#E4E7E9', 'text': 'no such user', 'group': 'group' },
        { 'key': 'finished', 'category': 'finished', 'stepId': 'finished', 'group': 'isFinished', hasIO: false },
        { 'key': 'START', 'category': 'START', 'text': 'Start', 'loc': '0 60', 'id': 'START', hasIO: false }]);

    const [diagramLinks, setDiagramLinks] = React.useState([
        { 'from': 'user-login', 'to': 'user-login-a', 'key': 'user-login_user-login-a', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-b', 'key': 'user-login_user-login-b', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-c', 'key': 'user-login_user-login-c', 'category': 'outlet' },
        { 'from': 'user-login', 'to': 'user-login-d', 'key': 'user-login_user-login-d', 'category': 'outlet' },
        { 'from': 'user-login-a', 'to': 'finished', 'key': 'user-login-success_finished' },
        { 'from': 'user-login', 'to': 'user-login-not_found', 'key': 'user-login_user-login-not_found', 'category': 'outlet' },
        { 'from': 'START', 'to': 'user-login', 'key': 'START_user-login' },
    ]);

    const counter = React.useRef(1);
    React.useEffect(() => {
        if (counter.current > 4) return;
        const timerId = setTimeout(() => {
            counter.current += 1;
            const key = String(Math.random());
            setDiagramNodes(oldNodes => [
                ...oldNodes,
                { key, category: 'outlet', group: 'group', text: key, color: '#E4E7E9' },
            ]);
            setDiagramLinks(oldLinks => [
                ...oldLinks,
                { from: 'user-login', to: key, category: 'outlet' },
            ]);
        }, 2000);
        return () => clearTimeout(timerId);
    });


    const { diagramProps, diagramObject } = useDiagram({
        isDisabled: disabled,
        groupTemplates: [
            ['', diagramGroupTemplate({ comparer: customComparer })],
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
        <DiagramWrapper style={{ width: 600, height: 600 }}>
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
    title: 'Custom ordering for outlets',
    component: DiagramComponent,
};
