import React from 'react';
import PropTypes from 'prop-types';
import Box from '../Box';

const ArrayFieldItem = React.memo(({
  id,
  onComponentRender,
  fieldValue,
  isDisabled,
  onFieldDelete,
  onFieldValueChange,
  renderField,
  ...otherFieldProps
}) => (
  <Box as="li" mb="xs">
    {onComponentRender ?
      onComponentRender(id, fieldValue, onFieldValueChange,
        onFieldDelete, isDisabled, otherFieldProps)
      : renderField(id, fieldValue, onFieldValueChange,
        onFieldDelete, isDisabled, otherFieldProps)}
  </Box>
));

ArrayFieldItem.propTypes = {
  id: PropTypes.string,
  onComponentRender: PropTypes.func,
  fieldValue: PropTypes.string,
  isDisabled: PropTypes.bool,
  onFieldDelete: PropTypes.func,
  onFieldValueChange: PropTypes.func,
  renderField: PropTypes.func,
};

export default ArrayFieldItem;
