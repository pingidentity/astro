import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFocusOutline } from '@pingux/compass-core/lib/utils/FocusUtils';
import { noop, omit, pick } from 'underscore';
import { stylePropKeys } from '@pingux/compass-core/lib/utils/StyleUtils';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import { inputStyle, inputContainerStyle, defaultInputProps, defaultContainerProps } from './Input.styles';
import { textProps } from '../../styles/text';
import { FieldDataContext } from '../Field/Field';

// the props that should be passed along to the input
// and not the root element
const inputProps = [
    'aria-label',
    'autoFocus',
    'disabled',
    'name',
    'onKeyDown',
    'onKeyPress',
    'onValueChange',
    'placeholder',
    'value',
    'readOnly',
    'type',
];

export const pickInputProps = props => pick(props, inputProps);
export const omitInputProps = props => omit(props, inputProps);

/** Basic input component */
const Input = ({
    afterContent,
    id,
    onValueChange,
    ...props
}) => {
    const others = omitInputProps(props);
    const theme = useCompassTheme();
    const fieldData = useContext(FieldDataContext);
    useFocusOutline();

    const onChange = useCallback(e => onValueChange(e.target.value, e), [onValueChange]);

    return (
        <span
            css={inputContainerStyle({ ...defaultContainerProps, ...props, theme })}
            {...omit(others, stylePropKeys)}
        >
            <input
                id={id !== undefined ? id : fieldData.id}
                onChange={onChange}
                css={inputStyle({
                    ...defaultInputProps,
                    px: 'md',
                    theme,
                    ...textProps({ size: 'md', weight: 0, color: 'primary' }),
                    ...props,
                })}
                {...pickInputProps(props)}
            />
            {afterContent}
        </span>
    );
};

Input.propTypes = {
    afterContent: PropTypes.node,
    id: valuePropType,
    type: PropTypes.oneOf(['text', 'password']),
    onValueChange: PropTypes.func,
};

Input.defaultProps = {
    onValueChange: noop,
    type: 'text',
};

export default Input;
