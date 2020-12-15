import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';
import { noop } from 'underscore';
import { omit } from '@styled-system/props';
import { MenuDownSVG } from '../Icons';
import { makeIcon } from '../Icon';

import useCompassTheme from '../../styles/useCompassTheme';
import { defaultInputProps, inputStyle, inputContainerStyle } from '../Input/Input.styles';
import { caretStyle } from './DropDownList.styles';
import { FieldDataContext } from '../Field/Field';

const Caret = makeIcon(MenuDownSVG, 'Caret');

/** Basic dropdown component */
const DropDownList = ({
    children,
    hasNoneOption,
    id,
    noneLabel,
    onValueChange,
    options,
    value,
    ...props
}) => {
    const theme = useCompassTheme();
    const fieldData = useContext(FieldDataContext);

    const onChange = useCallback(e => onValueChange(e.target.value, e), [onValueChange]);

    return (
        <span css={inputContainerStyle({ ...props, theme })} {...omit(props)}>
            <select
                id={id !== undefined ? id : fieldData.id}
                css={inputStyle({
                    ...defaultInputProps,
                    width: 'auto',
                    pr: 'lg',
                    fontStyle: (value === '' && hasNoneOption) ? 'italic' : 'none',
                    ...props,
                    theme,
                })}
                onChange={onChange}
                value={value}
            >
                {hasNoneOption && (
                    <>
                        <option value="">{noneLabel}</option>
                        <option disabled>--------</option>
                    </>
                )}
                {options.map(({ value: optionValue, label = optionValue }) => (
                    <option
                        value={optionValue}
                        key={optionValue}
                    >
                        {label}
                    </option>
                ))}
                {children}
            </select>
            <div
                css={caretStyle({ theme })}
            >
                <Caret color="text.primary" size={15} />
            </div>
        </span>
    );
};

DropDownList.propTypes = {
    /** Provide a none option */
    hasNoneOption: PropTypes.bool,
    /** id of the select element */
    id: valuePropType,
    /** The label for the none option */
    noneLabel: PropTypes.string,
    /** Handler for value changes
     * @param {text|number} value
     * @param {object} event
     */
    onValueChange: PropTypes.func,
    /** Array of label/value pairs to render in the dropdown as choices */
    options: PropTypes.arrayOf(PropTypes.shape({
        value: valuePropType.isRequired,
        label: PropTypes.node,
    })),
    /** Value of the input */
    value: valuePropType,
};

DropDownList.defaultProps = {
    hasNoneOption: false,
    noneLabel: 'None',
    onValueChange: noop,
    options: [],
    value: '',
};

export default DropDownList;
