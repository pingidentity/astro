import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';

import useCompassTheme from '../../styles/useCompassTheme';
import {
    radioButtonGroupStyle,
} from './RadioButtonGroup.styles';

const RadioButtonGroup = ({
    children,
    defaultChecked,
    name,
    onValueChange,
}) => {
    const theme = useCompassTheme();

    const _handleOnChange = (e) => {
        const val = e.target.value;
        onValueChange(val, e);
    };

    return (
        <div css={radioButtonGroupStyle({ theme })}>
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                    return React.cloneElement(child, {
                        name,
                        onChange: _handleOnChange,
                        isDefaultChecked: defaultChecked === child.props.value,
                    });
                }
                return child;
            })}
        </div>
    );
};

RadioButtonGroup.propTypes = {
    /** The value of the default radio */
    defaultChecked: PropTypes.string,
    /** Name of the radio group */
    name: PropTypes.string,
    /** Callback when a radio's state is changed */
    onValueChange: PropTypes.func,
};

RadioButtonGroup.defaultProps = {
    onValueChange: noop,
};

export default RadioButtonGroup;
