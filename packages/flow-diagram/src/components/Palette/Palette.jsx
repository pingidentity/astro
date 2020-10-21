import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';
import React from 'react';
import PropTypes from 'prop-types';
import { paletteWrapper } from './Palette.styles';


export default function Palette({
    groupTemplates,
    nodeTemplates,
    nodeDataArray,
    linkDataArray,
    ...others
}) {
    const initPalette = () => {
        const $ = go.GraphObject.make;

        const myPalette =
            $(go.Palette,
                {
                    layout: $(go.GridLayout,
                    ),
                    maxSelectionCount: 1,
                },
            );

        nodeTemplates.forEach(([name, template]) => {
            myPalette.nodeTemplateMap.add(name, template);
        });

        groupTemplates.forEach(([name, template]) => {
            myPalette.groupTemplateMap.add(name, template);
        });


        return myPalette;
    };

    return (
        <div css={paletteWrapper} {...others}>
            <ReactPalette
                initPalette={initPalette}
                divClassName="palette-component"
                nodeDataArray={nodeDataArray}
                linkDataArray={linkDataArray}
            />
        </div>
    );
}

Palette.propTypes = {
    groupTemplates: PropTypes.arrayOf(PropTypes.array),
    linkDataArray: PropTypes.arrayOf(
        PropTypes.shape({
            from: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            to: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        }),
    ),
    nodeDataArray: PropTypes.array,
    nodeTemplates: PropTypes.arrayOf(PropTypes.array),
};

