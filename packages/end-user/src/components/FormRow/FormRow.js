import PropTypes from 'prop-types';
import React from 'react';

/**
 * @class FormRow
 * @desc Display mutiple buttons
 *
 * @param {node} [children]
 *      Buttons to display in the set
 * @param {string} [data-id]
 *      To define the base "data-id" value for the FormRow
 *
 */
const FormRow = ({ children, 'data-id': dataId }) => {
    return (
        <div className="form__row" data-id={dataId}>{children}</div>
    );
};

FormRow.propTypes = {
    'data-id': PropTypes.string,
};


export default FormRow;
