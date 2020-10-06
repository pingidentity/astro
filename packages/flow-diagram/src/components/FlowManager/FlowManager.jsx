import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Input } from '@pingux/compass';
import { Details } from '@pingux/icons';
import ConfigPanel from '../ConfigPanel';
import Diagram from '../Diagram';
import Palette from '../Palette';
import {
    nodeTemplate,
    groupTemplate,
    stepTemplate,
} from './templates';

import './FlowManager.css';
import LeftContainer from '../LeftContainer/LeftContainer';

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
            configuration,
            outputMapping,
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
                    configuration,
                    outputMapping,
                    errorMessage: configuration.error ? configuration.error.message : '',
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
    typeDefinitions,
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
    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeClick = (e, obj) => {
        setSelectedNode(obj.part.data.key);
    };

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    return (
        <div className="wrapper">
            <LeftContainer
                title={<h2 style={{ marginLeft: 15 }}>Toolbox</h2>}
            >
                {selectedNode !== null ? (
                    <ConfigPanel
                        data={stepDictionary.current.get(selectedNode)}
                        onClose={onPanelClose}
                    />
                ) : (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </LeftContainer>
            <Diagram
                groupTemplates={[
                    ['', groupTemplate],
                ]}
                linkDataArray={[...links, ...triggerLinks]}
                nodeDataArray={[...steps, ...triggerNodes]}
                nodeTemplates={[
                    ['', stepTemplate('#028CFF', <Details />)],
                    ...typeDefinitions]}
                onModelChange={onModelChange}
                onNodeClick={onNodeClick}
            />
        </div>
    );
}

DiagramWrapper.propTypes = {
    // TODO: Make this show the editor on the left.
    // selectedData: PropTypes.any,
    typeDefinitions: PropTypes.array,
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
