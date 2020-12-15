import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';
import { valuePropType } from '@pingux/compass-core/lib/utils/PropUtils';
import FloatLabel from '../FloatLabel';
import TextArea from '../TextArea';

const FloatLabelTextArea = ({
    afterContent,
    textarea: Component,
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
                pt: 30,
                pb: 5,
            } : {
                'aria-label': label,
            })}
            {...props}
        />
    );
};

FloatLabelTextArea.propTypes = {
    /** The content that is rendered after the component.
     * FloatLabelTextArea passes this on and adds its own as well. */
    afterContent: PropTypes.node,
    /** id for the TextArea element */
    id: valuePropType,
    /** Text of the label */
    label: PropTypes.node,
    /** Value of the TextArea */
    value: valuePropType,
    /** The TextArea component to use */
    textarea: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

FloatLabelTextArea.defaultProps = {
    textarea: TextArea,
    value: '',
};

export default FloatLabelTextArea;
