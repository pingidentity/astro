import * as go from 'gojs';
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Input } from '@pingux/compass';
import Success from '@pingux/icons/ui-library/components/Success';
import Close from '@pingux/icons/ui-library/components/Close';
import ReactDOMServer from 'react-dom/server';
import play from '../../img/play.svg';
import page from '../../img/page.svg';
import start from '../../img/start.svg';
import { COLORS } from '../../utils/constants';
import Diagram from '../Diagram';
import Palette from '../Palette';

import './FlowManager.css';
import LeftContainer from '../LeftContainer/LeftContainer';

function encodeSvg(svgString) {
    return svgString.replace('<svg', (~svgString.indexOf('xmlns') ? '<svg' : '<svg xmlns="http://www.w3.org/2000/svg"'))
        .replace(/"/g, '\'')
        .replace(/%/g, '%25')
        .replace(/#/g, '%23')
        .replace(/{/g, '%7B')
        .replace(/}/g, '%7D')
        .replace(/</g, '%3C')
        .replace(/>/g, '%3E')
        .replace(/\s+/g, ' ');
}
const $ = go.GraphObject.make;

const toNode = (fill, type = 'circle') => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Left, portId: 'to', toLinkable: true },
            type === 'circle' ?
                $(go.Shape, 'Circle',
                    { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 })
                :
                $(go.Panel, 'Spot',
                    $(go.Shape, 'Diamond',
                        { width: 25, height: 25, fill: 'white', stroke: fill, strokeWidth: 1 }),
                    $(go.Shape, 'Diamond',
                        { width: 15, height: 15, fill, stroke: 'white' }),
                ),
        )

    );
};

const fromNode = (fill) => {
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 }),
        )
    );
};

const nodeTemplateForm = () => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(200, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
                $(go.Panel, 'Horizontal', { padding: 15, alignment: go.Spot.Left },
                    $(go.Picture, page, { width: 20, height: 20 }),
                    $(go.Panel, 'Vertical', { padding: new go.Margin(0, 0, 0, 10) },
                        $(go.TextBlock,
                            {
                                stroke: '#9DA2A8', font: '11px sans-serif', alignment: go.Spot.Left, editable: false,

                            },
                            new go.Binding('text', 'category').makeTwoWay()),
                        $(go.TextBlock,
                            {
                                stroke: 'black', font: '500 12px sans-serif', alignment: go.Spot.Left, editable: false,

                            },
                            new go.Binding('text').makeTwoWay()),
                    ),
                ),
            ),
            fromNode(COLORS.BLUE),
            toNode(COLORS.BLUE),
        )
    );
};

const nodeTemplate = (width = 120) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },

                $(go.Shape, 'Rectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(width, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
                $(go.Panel, 'Horizontal',
                    $(go.TextBlock,
                        {
                            stroke: '#9DA2A8',
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: 20,
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),

            ),
        )
    );
};

const nodeTemplateAction = () => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(120, 0) },
                    new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),

                $(go.Panel, 'Horizontal',
                    $(go.Picture, play, { width: 20, height: 20 }),
                    $(go.TextBlock,
                        {
                            stroke: '#9DA2A8',
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: 20,
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),
            ),
            fromNode(COLORS.PINK),
            toNode(COLORS.PINK),
        )
    );
};

const outletTemplate = fill => () => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'RoundedRectangle',
                    { stroke: '#EBECEC', width: '100%', fill }),

                $(go.Panel, 'Horizontal',
                    $(go.TextBlock,
                        {
                            stroke: 'white',
                            font: 'bold 12px sans-serif',
                            editable: true,
                            margin: new go.Margin(5, 10, 5, 10),
                            alignment: go.Spot.Left,
                        },
                        new go.Binding('text').makeTwoWay()),
                ),
            ),
        )
    );
};

const circleNode = (color, svg) => {
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Circle',
                    { fill: 'transparent', stroke: color, strokeWidth: 1, width: 20, alignment: go.Spot.Center }),
                $(go.Shape, 'Circle',
                    { fill: color, stroke: 'transparent', strokeWidth: 1, width: 12, margin: new go.Margin(0, 0, 0, 0), alignment: go.Spot.Center }),
                $(go.Picture, { source: `data:image/svg+xml;utf8,${encodeSvg(ReactDOMServer.renderToStaticMarkup(svg))}`, width: 12, height: 12, margin: (0, 0, 0, 1) }),
            ),
        )
    );
};

const successNode = () => circleNode('#0bbf01', React.createElement(Success, { height: 10, fill: '#fff' }));

const failureNode = () => circleNode('#ce0808', React.createElement(Close, { height: 10, width: 10, fill: '#fff' }));

const nodeTemplateStart = () =>
    $(go.Node, 'Auto',
        {
            groupable: false,
            movable: false,
            selectable: false,
            deletable: false,
            toSpot: go.Spot.Left,
            fromSpot: go.Spot.Right,
        },
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),

        $(go.Picture, start, { width: 30, height: 30 }),
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 5, height: 5, fill: '#27AF14', strokeWidth: 0 }),
        ));


const groupTemplate = () => {
    return (
        $(go.Group, go.Panel.Auto,
            {
                isSubGraphExpanded: false,
                ungroupable: true,
            },
            { name: 'BODY' },

            $(go.Shape, 'Rectangle',
                { fill: 'white', stroke: '#EBECEC', minSize: new go.Size(280, 0) },
                new go.Binding('stroke', 'isSelected', (s) => { return s ? 'dodgerblue' : '#EBECEC'; }).ofObject()),
            $(go.Panel, 'Horizontal',


                $(go.TextBlock,
                    {
                        stroke: '#9DA2A8',
                        font: 'bold 12px sans-serif',
                        editable: true,
                        margin: 20,
                        alignment: go.Spot.Left,
                    },
                    new go.Binding('text').makeTwoWay()),
            ),
        )
    );
};

const triggersToArrays = (triggers) => {
    return triggers.reduce(([nodes, links], { next, type = 'START' }) => {
        return [
            [
                ...nodes,
                {
                    // TODO: When we have multiple triggers, it might be possible to have
                    // several with the same type. We'll need to figure out a better ID solution
                    // at that point.
                    key: type,
                    category: type,
                    // We'll need to change this for multiple starts, but that may not matter yet.
                    loc: '0 0',
                },
            ],
            next ? [
                ...links,
                {
                    from: type,
                    to: next,
                },
            ] : links,
        ];
    }, [[], []]);
};

const getOutletData = (id, outlets) => outlets.reduce(
    ([nodes, links], { name, type, next }) => {
        const key = `${id}-${type}`;
        return [
            [
                ...nodes,
                {
                    key,
                    category: type,
                    text: name,
                    // We probably just need this in whatever dictionary we construct to
                    // look up configuration, etc.
                    isOutlet: true,
                },
            ],
            [
                ...links,
                {
                    from: id,
                    to: key,
                },
                ...next ? [{
                    from: key,
                    to: next,
                }] : [],
            ],
        ];
    }, [[], []]);

const stepsToArrays = (stepDefinitions, stepDictionary) => {
    return stepDefinitions.reduce(([nodes, links], step) => {
        const {
            stepId,
            id = stepId,
            outlets = [],
            type,
            name,
        } = step;

        stepDictionary.set(id, step);

        const [outletNodes, outletLinks] = getOutletData(id, outlets);

        return [
            [
                ...nodes,
                {
                    key: id,
                    category: type,
                    name,
                    stepId,
                },
                ...outletNodes,
            ],
            [
                ...links,
                ...outletLinks,
            ],
        ];
    }, [[], []]);
};

function DiagramWrapper({
    paletteDataArray,
    paletteLinkDataArray,
    onModelChange,
    stepDefinitions,
    triggers,
}) {
    const stepDictionary = useRef(new Map());
    const [steps, links] = stepsToArrays(stepDefinitions, stepDictionary.current);
    const [
        triggerNodes,
        triggerLinks,
    ] = triggersToArrays(triggers);
    return (
        <div className="wrapper">
            <LeftContainer
                title={<h2 style={{ marginLeft: 15 }}>Toolbox</h2>}
            >
                <Input m="0px 0px 20px 15px" width="90%" placeholder="Search Objects" />
                <Palette
                    groupTemplates={[
                        ['', groupTemplate],
                    ]}
                    nodeTemplates={[
                        ['', () => nodeTemplate(280)],
                    ]}
                    divClassName="palette-component"
                    nodeDataArray={paletteDataArray}
                    linkDataArray={paletteLinkDataArray}
                />
            </LeftContainer>
            <Diagram
                groupTemplates={[
                    ['', groupTemplate],
                ]}
                linkDataArray={[...links, ...triggerLinks]}
                nodeDataArray={[...steps, ...triggerNodes]}
                nodeTemplates={[
                    ['', nodeTemplateForm],
                    ['action', nodeTemplateAction],
                    ['outlet', outletTemplate('#000')],
                    ['success', successNode],
                    ['failure', failureNode],
                    ['START', nodeTemplateStart],
                ]}
                onModelChange={onModelChange}
            />
        </div>
    );
}

DiagramWrapper.propTypes = {
    // TODO: Make this show the editor on the left.
    // selectedData: PropTypes.any,
    paletteDataArray: PropTypes.array,
    paletteLinkDataArray: PropTypes.array,
    onModelChange: PropTypes.func,
    stepDefinitions: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        stepId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        configuration: PropTypes.shape({}),
        outlets: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            next: PropTypes.string,
        })),
    })),
    // eslint-disable-next-line
    skipsDiagramUpdate: PropTypes.bool,
    triggers: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        next: PropTypes.string,
    })),
};

DiagramWrapper.defaultProps = {
    onModelChange: noop,
};

export default DiagramWrapper;
