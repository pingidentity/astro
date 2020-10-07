import React from 'react';
import PropTypes from 'prop-types';
import { omit } from '@styled-system/props';
import { noop } from 'underscore';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';

import { getTabStyle } from './Tab.styles';
import { textProps } from '../../styles/text';
import useCompassTheme from '../../styles/useCompassTheme';

const Tab = React.forwardRef((props, ref) => {
    const {
        isSelected,
        label,
        onChange,
        onClick,
        onKeyPress,
        value,
        ...rest
    } = props;
    const theme = useCompassTheme();
    const nonStyleProps = omit(rest);

    const handleTabSelect = (e) => {
        if (e.type === 'click') {
            onClick(e);
        } else if (e.type === 'keypress') {
            onKeyPress(e);
        }

        if (!isSelected) onChange({ value });
    };

    return (
        <li
            ref={ref}
            role="tab"
            tabIndex="0"
            aria-controls={value}
            css={getTabStyle({
                ...textProps({ size: 'sm', weight: 1, allCaps: true }),
                ...props,
                theme,
            })}
            onClick={handleTabSelect}
            onKeyPress={handleTabSelect}
            {...nonStyleProps}
        >
            {label}
        </li>
    );
});

Tab.propTypes = {
    /** Indicates whether this Tab is currently selected */
    isSelected: PropTypes.bool,
    /** The label to display for the Tab */
    label: PropTypes.node.isRequired,
    /** Callback to fire when the Tab is selected */
    onChange: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onClick: PropTypes.func,
    /** Passthrough for React's equivalent SyntheticEvent */
    onKeyPress: PropTypes.func,
    /** The unique identifier for this Tab */
    value: valuePropType,
};

Tab.defaultProps = {
    isSelected: false,
    onChange: noop,
    onClick: noop,
    onKeyPress: noop,
};

export default Tab;
