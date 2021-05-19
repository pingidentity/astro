import React from 'react';
import PropTypes from 'prop-types';
import { Desktop } from '@pingux/icons';
import '../css/main.css';

import {
    paletteGroupTemplate,
    paletteItemTemplate,
    svgComponentToBase64,
} from '../utils/templates';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';

/**
 * Group object (isGroup: true) defines the item as it appears in the palette.
 * Node object defines how the node will appear when dropped onto the canvas.
 */

export const PaletteNode = () => {
    const { paletteProps } = usePalette({
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
            },
            {
                group: 'login-group',
                'key': 'login',
                'category': 'step',
                'text': 'User Login',
                getIconSrc: (color = '#028CFF') => svgComponentToBase64(<Desktop fill={color} />),
                color: '#028CFF',
                stepId: 'newLogin',
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

PaletteNode.defaultProps = {
    isGroup: false,
};


PaletteNode.propTypes = {
    /** Color of node being dropped onto palette (only applies to category: 'step'). */
    color: PropTypes.string,
    /** Node category. Group object must have category 'palette-group'.
     * Node object must have category corresponding to desired diagram node template. */
    category: PropTypes.string,
    /** Group that contains node. */
    group: PropTypes.string,
    /** Defines icon and color */
    getIconSrc: PropTypes.func,
    /** Determines whether element is node or group */
    isGroup: PropTypes.bool,
    /** Node/Group key */
    key: PropTypes.string,
    /** Subtitle of step node */
    stepId: PropTypes.string,
    /** Main text of node */
    text: PropTypes.string,
};

export default {
    title: 'Palette Nodes',
    component: PaletteNode,
};
