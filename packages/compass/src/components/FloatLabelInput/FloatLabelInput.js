import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';
import FloatLabel from '../FloatLabel';
import Input from '../Input';

const FloatLabelInput = ({
    afterContent,
    input: Component,
    label,
    value,
    ...props
}) => {
    const { id = useMemo(uuid) } = props;

    const floatLabel = (
        <FloatLabel isHidden={!value} htmlFor={id}>{label}</FloatLabel>
    );
    return (
        <Component
            afterContent={
                <>
                    {afterContent}
                    {floatLabel}
                </>
            }
            id={id}
            placeholder={label}
            value={value}
            {...(value !== '' ? {
                fontSize: 'sm',
                pt: 18,
                pb: 5,
            } : {
                'aria-label': label,
            })}
            {...props}
        />
    );
};

FloatLabelInput.propTypes = {
    /** The content that is rendered after the component.
     * FloatLabelInput passes this on and adds its own as well. */
    afterContent: PropTypes.node,
    /** id for the input element */
    id: valuePropType,
    /** Text of the label */
    label: PropTypes.node,
    /** Value of the input */
    value: valuePropType,
    /** The input component to use */
    input: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

FloatLabelInput.defaultProps = {
    input: Input,
    value: '',
};

export default FloatLabelInput;
