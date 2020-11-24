import * as go from 'gojs';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';

export default function usePalette({
    groupTemplates,
    nodeTemplates,
    nodeDataArray,
    linkDataArray,
}) {
    const [palette, setPalette] = useState();
    const initPalette = () => {
        const $ = go.GraphObject.make;

        const paletteObject =
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
        setPalette(paletteObject);

        nodeTemplates.forEach(([name, template]) => {
            paletteObject.nodeTemplateMap.add(name, template);
        });

        groupTemplates.forEach(([name, template]) => {
            paletteObject.groupTemplateMap.add(name, template);
        });

        return paletteObject;
    };

    return ({
        paletteObject: palette,
        paletteProps: {
            divClassName: 'palette-component',
            initPalette,
            // This is a temporary band-aid; the step template has issues handling an
            // undefined errorMessage.
            nodeDataArray: nodeDataArray.map(({ errorMessage = '', ...rest }) => ({ errorMessage, ...rest })),
            linkDataArray,
        },
    });
}
