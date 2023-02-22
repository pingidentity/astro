import * as go from 'gojs';
import { COLORS } from '../../constants';

const $ = go.GraphObject.make;

/* istanbul ignore next */
// Would have to mock a lot of gojs to test. May do this later.
export const iconButton = ({ onAction = () => {}, margin, source } = {}) => {
    return $('Button', 'Spot', {
        'ButtonBorder.figure': 'Circle',
        'ButtonBorder.fill': COLORS.BUTTON_NORMAL,
        'ButtonBorder.strokeWidth': 0,
        '_buttonFillOver': COLORS.BUTTON_HOVER,
        '_buttonFillPressed': COLORS.BLUE,
        click: (e, obj) => onAction(obj.part.data),
        name: 'DELETE_BUTTON',
        height: 25,
        width: 25,
        margin,
        alignment: go.Spot.MiddleRight,
    }, new go.Binding('visible', '', (data, button) => button.part.containingGroup.isSelected), $(go.Picture, {
        source,
        width: 20,
        height: 20,
    }),
    );
};
