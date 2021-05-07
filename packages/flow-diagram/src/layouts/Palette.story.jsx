import React from 'react';
import PropTypes from 'prop-types';
import { Close, Desktop, Success, Walkthrough } from '@pingux/icons';
import { mdiSourceBranch } from '@mdi/js';
import Icon from '@mdi/react';
import '../css/main.css';

import {
    paletteGroupTemplate,
    paletteItemTemplate,
    svgComponentToBase64,
} from '../utils/templates';
import { COLORS } from '../utils/constants';
import LeftContainer from '../components/LeftContainer';
import { Palette, PaletteWrapper } from '../components/Palette';
import usePalette from '../hooks/usePalette';

export const PaletteComponent = () => {
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
            {
                'key': 'execute-flow-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
            },
            {
                'key': 'execute-flow',
                group: 'execute-flow-group',
                'category': 'step',
                'text': 'Execute Flow',
                getIconSrc: (color = '#228C22') => svgComponentToBase64(<Walkthrough fill={color} />),
                color: '#228C22',
                stepId: 'newLogin',
            },
            {
                'key': 'finished-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Complete',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'finished',
                'category': 'finished',
                group: 'finished-group',
                getIconSrc: (color = COLORS.GREEN) => svgComponentToBase64(<Success fill={color} />),
            },
            {
                'key': 'error-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Failure',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
            {
                'key': 'error',
                'category': 'error',
                group: 'error-group',
                getIconSrc: (color = COLORS.RED) => svgComponentToBase64(<Close fill={color} />),
            },
            {
                'key': 'branch-group',
                'category': 'palette-group',
                isGroup: true,
                'text': 'Branch',
                getIconSrc: (color = COLORS.ORANGE) => svgComponentToBase64(<Icon path={mdiSourceBranch} color={color} width="20px" height="20px" />),
            },
            {
                'key': 'branch',
                'category': 'branch',
                group: 'branch-group',
                getIconSrc: (color = COLORS.ORANGE) => svgComponentToBase64(<Icon path={mdiSourceBranch} color={color} width="20px" height="20px" />),
            },
        ],
        linkDataArray: [],
    });

    return (
        <LeftContainer styles={{ width: 360, height: 250 }}>
            <PaletteWrapper>
                <Palette {...paletteProps} />
            </PaletteWrapper>
        </LeftContainer>
    );
};

PaletteComponent.propTypes = {
    /** Templates for groups of nodes. paletteGroupTemplate should be used. */
    groupTemplates: PropTypes.arrayOf(PropTypes.array),
    /** Defines links connecting nodes. */
    linkDataArray: PropTypes.arrayOf(PropTypes.object),
    /** Defines nodes that appear on the diagram. */
    nodeDataArray: PropTypes.arrayOf(PropTypes.object),
    /** Templates for nodes. paletteItemTemplate should be used. */
    nodeTemplates: PropTypes.arrayOf(PropTypes.array),
};

export default {
    title: 'Palette',
    component: PaletteComponent,
};
