import * as go from 'gojs';
import { COLORS } from '../../constants';

const $ = go.GraphObject.make;

export const adornmentMouseLeave = (e, obj) => {
    const ad = obj.part;
    ad.adornedPart.removeAdornment('mouseHover');
};

export const selectFromAdornment = (e, obj) => {
    const node = obj.part.adornedPart;
    node.diagram.select(node);
};

export const getAdornmentOnHover = adornment => (e, obj) => {
    const node = obj.part;
    const nodeHoverAdornment = adornment;
    nodeHoverAdornment.adornedObject = node;
    node.addAdornment('mouseHover', nodeHoverAdornment);
};

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const getNodeHoverAdornment = () => {
    return $(go.Adornment, 'Spot',
        {
            background: 'transparent',
            mouseLeave: adornmentMouseLeave,
        },
        $(go.Placeholder,
            {
                margin: new go.Margin(10, 10, 10, 10),
                background: 'transparent',
                isActionable: true,
                click: selectFromAdornment,
            }),
        $(go.Panel, 'Auto', { alignment: go.Spot.Top },
            { name: 'BODY' },
            $(go.Shape, 'RoundedRectangle',
                { fill: COLORS.ERROR_LIGHT, stroke: 'transparent', strokeWidth: 0, margin: new go.Margin(0, 0, 10, 0) }),
            $(go.Panel, 'Horizontal', { padding: 10, alignment: go.Spot.Top },
                $(go.Panel, 'Vertical', { padding: new go.Margin(0, 0, 10, 0) },
                    $(go.TextBlock,
                        {
                            stroke: COLORS.ERROR, font: 'bold 11px sans-serif', alignment: go.Spot.Left, editable: false,
                        },
                        new go.Binding('text', 'errorMessage').makeTwoWay()),
                ),
            ),
        ),
    );
};