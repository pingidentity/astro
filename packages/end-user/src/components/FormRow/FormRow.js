import PropTypes from 'prop-types';
import React from 'react';

/**
 * A row for the Form
 */
const FormRow = ({
    children,
    'data-id': dataId
}) => {
    return (
        <div className="form__row" data-id={dataId}>{children}</div>
    );
};

FormRow.propTypes = {
    /**
     * Sets a data-id property on the FormRow element to be used as a test hook
     */
    'data-id': PropTypes.string,
};

export default FormRow;
