import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { useFocusOutline } from '@pingux/compass-core/lib/utils/FocusUtils';
import themeGet from '@styled-system/theme-get';
import { noop, omit, pick } from 'underscore';
import { stylePropKeys } from '@pingux/compass-core/lib/utils/StyleUtils';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import {
    inputStyle,
    inputContainerStyle,
    defaultInputProps,
    defaultContainerProps,
} from '../Input/Input.styles';
import { textProps } from '../../styles/text';
import { FieldDataContext } from '../Field/Field';

/**
 * The props that should be passed along to the TextArea
 * and not to the root element
 */
const textAreaProps = [
    'aria-label',
    'name',
    'placeholder',
    'value',
    'readOnly',
    'rows',
];

/** Basic textarea component */
const TextArea = ({
    afterContent,
    id,
    onValueChange,
    ...props
}) => {
    const textAreaOthers = pick(props, textAreaProps);
    const others = omit(props, textAreaProps);
    const theme = useCompassTheme();
    const fieldData = useContext(FieldDataContext);
    useFocusOutline();

    const pUnit = themeGet('space.md', 15)({ theme });

    const onChange = useCallback(e => onValueChange(e.target.value, e), [onValueChange]);

    return (
        <span
            css={inputContainerStyle({ ...defaultContainerProps, ...props, theme })}
            {...omit(others, stylePropKeys)}
        >
            <textarea
                id={id !== undefined ? id : fieldData.id}
                onChange={onChange}
                css={inputStyle({
                    ...defaultInputProps,
                    pl: (pUnit - 2),
                    pr: 'md',
                    theme,
                    ...textProps({ size: 'md', weight: 0, color: 'primary' }),
                    ...props,
                })}
                {...textAreaOthers}
            />
            {afterContent}
        </span>
    );
};

TextArea.propTypes = {
    afterContent: PropTypes.node,
    id: valuePropType,
    onValueChange: PropTypes.func,
};

TextArea.defaultProps = {
    onValueChange: noop,
};

export default TextArea;
