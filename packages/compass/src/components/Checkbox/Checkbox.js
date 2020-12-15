import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import CheckboxBlankOutline from '@mdi/svg/svg/checkbox-blank-outline.svg';
import CheckboxMarked from '@mdi/svg/svg/checkbox-marked.svg';
import CoreCheckbox from '@pingux/compass-core/lib/components/Checkbox';
import { useProgStateful } from '@pingux/compass-core/lib/utils/StateUtils';

import useCompassTheme from '../../styles/useCompassTheme';
import * as styles from './Checkbox.styles';
import Box from '../Box';
import Icon from '../Icon';
import Text from '../Text';

const Checkbox = forwardRef((props, ref) => {
    const theme = useCompassTheme();
    const {
        inputProps,
        isChecked: isCheckedProp,
        isDefaultChecked,
        isDisabled,
        label,
        onChange,
        ...rest
    } = props;
    const [isChecked, setIsChecked] = useProgStateful(isCheckedProp, isDefaultChecked);
    const handleChange = (isRefChecked, ...args) => {
        setIsChecked(isRefChecked);
        onChange(isRefChecked, ...args);
    };
    const checkboxProps = { isChecked, isDisabled, onChange: handleChange, ...inputProps };

    return (
        <label css={styles.getCheckboxLabelStyle({ theme, ...props })} {...rest}>
            <Box isRow hGap="sm" marginLeft="0" css={styles.checkboxContainerCSS}>
                <CoreCheckbox
                    ref={ref}
                    css={styles.checkboxCSS}
                    {...checkboxProps}
                />
                <Box marginLeft="0">
                    <Icon
                        data-testid="checkbox-blank"
                        size={24}
                        component={CheckboxBlankOutline}
                        fill="active"
                        css={styles.getBlankIconStyle({ isChecked, ...props })}
                    />
                    <Icon
                        data-testid="checkbox-marked"
                        size={24}
                        component={CheckboxMarked}
                        fill="active"
                        css={styles.getMarkedIconStyle({ isChecked, ...props })}
                    />
                </Box>
            </Box>
            <Text variant="label" marginLeft="sm">{label}</Text>
        </label>
    );
});

Checkbox.propTypes = {
    /**
     * Container object for props which are spread to the underlying input HTML element
     *
     * e.g. `{ id: 'subscribeNews', name: 'subscribe', value: 'newsletter' }`
     */
    inputProps: PropTypes.shape({}),
    /**
     * Whether the checkbox is checked
     *
     * _Note: Providing this prop will relinquish control of the checkbox state. This should only_
     * _be used in conjunction with the `onChange` prop to externally manage state._
     */
    isChecked: PropTypes.bool,
    /**
     * Whether the checkbox is checked by default
     *
     * _Note: Using `isChecked` to externally manage state will ignore this prop._
     */
    isDefaultChecked: PropTypes.bool,
    /** Whether the checkbox is disabled */
    isDisabled: PropTypes.bool,
    /** A displayable label for the checkbox */
    label: PropTypes.node,
    /**
     * Callback which provides information about change events on the DOM ref
     *
     * e.g. `(isRefChecked, event) => { ... }`
     */
    onChange: PropTypes.func,
};

Checkbox.defaultProps = {
    isDefaultChecked: false,
    isDisabled: false,
    onChange: noop,
};

export default Checkbox;
