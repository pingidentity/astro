import * as go from 'gojs';
import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@pingux/compass';
import play from '../../img/play.svg';
import page from '../../img/page.svg';
import { COLORS } from '../../utils/constants';
import Diagram from '../Diagram';
import Palette from '../Palette';

import './FlowManager.css';
import LeftContainer from '../LeftContainer/LeftContainer';

const toNode = (fill, type = 'circle') => {
    const $ = go.GraphObject.make;
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
    const $ = go.GraphObject.make;
    return (
        $(go.Panel, 'Auto',
            { alignment: go.Spot.Right, portId: 'from', fromLinkable: true, cursor: 'pointer' },
            $(go.Shape, 'Circle',
                { width: 10, height: 10, fill, stroke: 'white', strokeWidth: 3 }),
        )
    );
};

const nodeTemplateForm = () => {
    const $ = go.GraphObject.make;
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Rectangle',
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
    const $ = go.GraphObject.make;
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
    const $ = go.GraphObject.make;
    return (
        $(go.Node, 'Spot',
            { selectionAdorned: false, textEditable: true, locationObjectName: 'BODY' },
            new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
            $(go.Panel, 'Auto',
                { name: 'BODY' },
                $(go.Shape, 'Rectangle',
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

const groupTemplate = () => {
    const $ = go.GraphObject.make;

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


function DiagramWrapper({
    paletteDataArray,
    paletteLinkDataArray,
    nodeDataArray,
    linkDataArray,
    onModelChange,
}) {
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
                linkDataArray={linkDataArray}
                nodeDataArray={nodeDataArray}
                nodeTemplates={[
                    ['', nodeTemplateForm],
                    ['action', nodeTemplateAction],
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
    nodeDataArray: PropTypes.array,
    linkDataArray: PropTypes.array,
    onModelChange: PropTypes.func,
    // eslint-disable-next-line
    skipsDiagramUpdate: PropTypes.bool,
};

export default DiagramWrapper;
