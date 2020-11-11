import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import isEqual from 'lodash/isEqual';
import { Global } from '@emotion/core';
import { Input, Text } from '@pingux/compass';
import { Details } from '@pingux/icons';
import ConfigPanel from '../ConfigPanel';
import Diagram from '../Diagram';
import Palette from '../Palette';
import {
    paletteItemTemplate,
    diagramGroupTemplate,
    stepTemplate,
    paletteGroupTemplate,
} from './templates';
import { bodyWrapper, globalStyles, topPanel, wrapper } from './FlowManager.styles';
import LeftContainer from '../LeftContainer/LeftContainer';

const getPaletteItems = typeDefinitions => typeDefinitions.map(({
    id,
    displayName = '',
    configuration,
}) => ({
    key: id,
    category: id,
    text: displayName,
    id,
    configuration,
    errorMessage: '',
    type: 'object',
    isPaletteItem: true,
}));

const getPaletteTemplates = typeDefinitions => typeDefinitions.map(({
    id,
    icon,
    color,
}) => [
        id,
        paletteItemTemplate({ width: 280, icon, color }),
    ]);

function FlowDiagram({
    links,
    nodes,
    onModelChange,
    renderTopPanel,
    typeDefinitions,
    onNodeClick,
    ...others
}) {
    const linkDictionary = useRef(new Map());
    const stepDictionary = useRef(new Map());

    useEffect(() => {
        stepDictionary.current.clear();
        nodes.forEach((node) => {
            const {
                stepId,
                id = stepId,
            } = node;

            stepDictionary.current.set(id, node);
        });
    }, [JSON.stringify(nodes)]);

    const modelChange = (changes) => {
        const {
            insertedNodeKeys = [],
            insertedLinkKeys = [],
            modifiedLinkData = [],
            modifiedNodeData = [],
            removedLinkKeys = [],
            removedNodeKeys = [],
        } = changes;

        const insertedNodes = (modifiedNodeData ?? []).filter((node) => {
            const { key } = node;
            // TODO: Once we start adding outputs on drop, they will need to be ignored here.
            if (insertedNodeKeys.includes(key)) {
                // Pull step data here from the step types- need some kind of start situation.
                stepDictionary.current.set(key, node);
                return true;
            }

            return false;
        });

        const insertedLinks = (modifiedLinkData ?? []).filter((link) => {
            const { key } = link;

            if (insertedLinkKeys.includes(key)) {
                // Pull step data here from the step types- need some kind of start situation.
                linkDictionary.current.set(key, link);
                return true;
            }

            return false;
        });

        const removedLinks = removedLinkKeys.map((key) => {
            const link = linkDictionary.current.get(key);
            linkDictionary.current.delete(key);
            return link;
        });

        const removedNodes = removedNodeKeys.map((key) => {
            const step = stepDictionary.current.get(key);
            stepDictionary.current.delete(key);
            return step;
        });

        const modifiedNodes = modifiedNodeData.map((node) => {
            const { key } = node;

            const { configuration } = stepDictionary.current.get(key) || {};

            return {
                ...node,
                configuration,
            };
        });

        const allNodes = Array.from(stepDictionary.current.values());
        const allLinks = Array.from(linkDictionary.current.values());
        onModelChange({
            // TODO: Once we wire in deleting outlets when their anchor gets deleted,
            // we'll need to filter out the links that existed between the node and its
            // outlets.
            removedLinks,
            removedNodes,
            insertedLinks,
            insertedNodes,
            modifiedLink: modifiedLinkData,
            modifiedNodes,
            allNodes,
            allLinks,
        });
        // Not worrying about modified links or nodes right now because those would just be
        // location changes, which users don't need to customize at this time.
    };

    const [selectedNodeId, setSelectedNodeId] = useState(null);

    const nodeClick = (e, obj) => {
        setSelectedNodeId(obj.part.data.key);
        // temp code to demonstrate adding error state. Will be removed.
        onNodeClick(obj.part.data.id);
    };

    const onPanelClose = () => {
        setSelectedNodeId(null);
    };

    const selectedNode = stepDictionary.current.get(selectedNodeId) ?? {};

    const selectedTypeDefinition = typeDefinitions.find(def =>
        def.id === stepDictionary.current.get(selectedNodeId)?.category);


    const itemsInPalette = typeDefinitions.filter(({ showInPalette = true }) => showInPalette);

    return (
        <>
            <Global styles={globalStyles} />
            <div css={wrapper} {...others}>
                <div css={topPanel}>
                    {/* This is a placeholder. Something different will be passed in later */}
                    {renderTopPanel([nodes, links])}
                </div>
                <div css={bodyWrapper}>
                    <LeftContainer>
                        <>
                            {selectedNodeId !== null ? (
                                <ConfigPanel
                                    icon={selectedTypeDefinition.icon}
                                    color={selectedTypeDefinition.color}
                                    category={selectedNode.category}
                                    onClose={onPanelClose}
                                >
                                    {selectedTypeDefinition.renderConfig?.(selectedNode)}
                                </ConfigPanel>
                            ) : (
                                <React.Fragment>
                                    <Text m="10px 0px 15px 15px" fontSize={24}>Toolbox</Text>
                                    <Input m="0px 0px 20px 15px" width="90%" placeholder="Search Objects" />
                                    <Palette
                                        groupTemplates={[
                                            ['', paletteGroupTemplate],
                                        ]}
                                        nodeTemplates={[
                                            ...getPaletteTemplates(itemsInPalette),
                                        ]}
                                        nodeDataArray={[...getPaletteItems(itemsInPalette),
                                            // { type: 'object', key: 'G', id: 'G', text: 'Login Group', isGroup: true },
                                            // { key: 'Ga', category: 'LOGIN', id: 'Ga', text: 'A block', group: 'G', errorMessage: '', loc: '0 0' },
                                            // { key: 'Gb', category: 'outlet', id: 'Gb', text: 'Outlet 1', group: 'G' },
                                            // { key: 'Gc', category: 'outlet', id: 'Gc', text: 'Outlet 2', group: 'G' }
                                        ]}
                                        linkDataArray={[
                                            // { from: 'Ga', to: 'Gc' }, { from: 'Ga', to: 'Gb' }
                                        ]}
                                    />
                                </React.Fragment>
                            )}
                        </>
                    </LeftContainer>
                    <Diagram
                        groupTemplates={[
                            ['', diagramGroupTemplate],
                        ]}
                        linkDataArray={links.map(({ id, ...link }) => ({ ...link, key: id }))}
                        nodeDataArray={nodes.map(({ id, ...node }) => ({ ...node, id, key: id }))}
                        nodeTemplates={[
                            ['', stepTemplate({ color: '#028CFF', icon: <Details />, onClick: nodeClick })],
                            ...typeDefinitions.map(({ id, template, icon, color }) =>
                                [id, template({ icon, color, onClick: nodeClick })],
                            ),
                        ]}
                        onModelChange={modelChange}
                    />
                </div>
            </div>
        </>
    );
}

FlowDiagram.propTypes = {
    // TODO: Make this show the editor on the left.
    // selectedData: PropTypes.any,
    typeDefinitions: PropTypes.arrayOf(PropTypes.shape({
        // TODO: Add this in, but only once we've got generated steps.
        // configuration: PropTypes.shape({}),
        description: PropTypes.string,
        displayName: PropTypes.string,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        showInPalette: PropTypes.bool,
        // The template that shows on the Diagram/canvas
        template: PropTypes.func,
        color: PropTypes.string,
        icon: PropTypes.node,
    })),
    onModelChange: PropTypes.func,
    onNodeClick: PropTypes.func,
    links: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    nodes: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        stepId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        configuration: PropTypes.shape({}),
        // Maybe we should take this out? Discuss
        outlets: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            type: PropTypes.string,
            next: PropTypes.string,
        })),
    })),
    renderTopPanel: PropTypes.func,
    // eslint-disable-next-line
    skipsDiagramUpdate: PropTypes.bool
};

FlowDiagram.defaultProps = {
    onModelChange: noop,
};

export default FlowDiagram;
