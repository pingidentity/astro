import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { Global } from '@emotion/core';
import { Input, Text } from '@pingux/compass';
import { Details } from '@pingux/icons';
import ConfigPanel from '../ConfigPanel';
import Diagram from '../Diagram';
import Palette from '../Palette';
import {
    nodeTemplate,
    groupTemplate,
    stepTemplate,
} from './templates';
import { bodyWrapper, globalStyles, topPanel, wrapper } from './FlowManager.styles';
import LeftContainer from '../LeftContainer/LeftContainer';

function DiagramWrapper({
    paletteDataArray,
    paletteLinkDataArray,
    typeDefinitions,
    onModelChange,
    links,
    nodes,
    renderTopPanel,
}) {
    const linkDictionary = useRef(new Map());
    const stepDictionary = useRef(new Map());

    const modelChange = (changes) => {
        const {
            insertedNodeKeys,
            insertedLinkKeys,
            modifiedLinkData,
            modifiedNodeData,
            removedLinkKeys,
            removedNodeKeys,
        } = changes;
        if (removedNodeKeys) {
            removedNodeKeys.forEach(key => stepDictionary.current.delete(key));
            onModelChange('node-deleted', {
                // TODO: Once we wire in deleting outlets when their anchor gets deleted,
                // we'll need to filter out the links that existed between the node and its
                // outlets.
                removedLinks: removedLinkKeys.map((key) => {
                    const link = linkDictionary.current.get(key);
                    linkDictionary.current.delete(key);
                    return link;
                }),
                removedNodes: removedNodeKeys.map((key) => {
                    const step = stepDictionary.current.get(key);
                    stepDictionary.current.delete(key);
                    return step;
                }),
            });
        } else if (removedLinkKeys) {
            onModelChange('link-deleted', {
                removedLinks: removedLinkKeys.map((key) => {
                    const link = linkDictionary.current.get(key);
                    linkDictionary.current.delete(key);
                    return link;
                }),
            });
        } else if (insertedNodeKeys) {
            const insertedNodes = modifiedNodeData.filter((node) => {
                const { key } = node;
                // TODO: Once we start adding outputs on drop, they will need to be ignored here.
                if (insertedNodeKeys.includes(key)) {
                    // Pull step data here from the step types- need some kind of start situation.
                    stepDictionary.current.set(key, node);
                    return true;
                }

                return false;
            });

            const insertedLinks = modifiedLinkData.filter((link) => {
                const { key } = link;

                if (insertedLinkKeys.includes(key)) {
                    // Pull step data here from the step types- need some kind of start situation.
                    linkDictionary.current.set(key, link);
                    return true;
                }

                return false;
            });

            onModelChange('node-added', {
                insertedNodes,
                insertedLinks,
            });
        } else if (insertedLinkKeys) {
            const insertedLinks = modifiedLinkData.filter((link) => {
                const { key } = link;

                if (insertedLinkKeys.includes(key)) {
                    // Pull step data here from the step types- need some kind of start situation.
                    linkDictionary.current.set(key, link);
                    return true;
                }

                return false;
            });

            onModelChange('link-added', {
                modifiedNodes: modifiedNodeData,
                insertedLinks,
            });
        }
        // Not worrying about modified links or nodes right now because those would just be
        // location changes, which users don't need to customize at this time.
    };

    const [selectedNode, setSelectedNode] = useState(null);

    const onNodeClick = (e, obj) => {
        setSelectedNode(obj.part.data.key);
    };

    const onPanelClose = () => {
        setSelectedNode(null);
    };

    return (
        <>
            <Global styles={globalStyles} />
            <div css={wrapper}>
                <div css={topPanel}>
                    {/* This is a placeholder. Something different will be passed in later */}
                    {renderTopPanel([nodes, links])}
                </div>
                <div css={bodyWrapper}>
                    <LeftContainer>
                        {selectedNode !== null ? (
                            <ConfigPanel
                                data={stepDictionary.current.get(selectedNode)}
                                onClose={onPanelClose}
                            />
                        ) : (
                            <React.Fragment>
                                <Text m="10px 0px 15px 15px" fontSize={24}>Toolbox</Text>
                                <Input m="0px 0px 20px 15px" width="90%" placeholder="Search Objects" />
                                <Palette
                                    groupTemplates={[
                                        ['', groupTemplate],
                                    ]}
                                    nodeTemplates={[
                                        ['', () => nodeTemplate(280)],
                                    ]}
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
                        linkDataArray={links}
                        nodeDataArray={nodes}
                        nodeTemplates={[
                            ['', stepTemplate('#028CFF', <Details />)],
                            ...typeDefinitions]}
                        onModelChange={modelChange}
                        onNodeClick={onNodeClick}
                    />
                </div>
            </div>
        </>
    );
}

DiagramWrapper.propTypes = {
    // TODO: Make this show the editor on the left.
    // selectedData: PropTypes.any,
    typeDefinitions: PropTypes.array,
    paletteDataArray: PropTypes.array,
    paletteLinkDataArray: PropTypes.array,
    onModelChange: PropTypes.func,
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

DiagramWrapper.defaultProps = {
    onModelChange: noop,
};

export default DiagramWrapper;
