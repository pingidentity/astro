import * as go from 'gojs';
import { ReactPalette } from 'gojs-react';
import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidV4 } from 'uuid';
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
                    model: $(go.GraphLinksModel,
                        {
                            linkKeyProperty: 'key',
                            makeUniqueKeyFunction: (m, data) => {
                                const key = `${data.key}_${uuidV4()}`;

                                // eslint-disable-next-line
                                data.key = key;
                                return key;
                            },
                            makeUniqueLinkKeyFunction: (m, data) => {
                                const key = `${data.key}_${uuidV4()}`;

                                // eslint-disable-next-line
                                data.key = key;
                                return key;
                            },
                        }),
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

