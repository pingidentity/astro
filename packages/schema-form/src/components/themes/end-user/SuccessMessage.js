import React from 'react';
import PropTypes from 'prop-types';
import Card from '@pingux/end-user/components/Card';
import Heading from '@pingux/end-user/components/Heading';
import TextBlock from '@pingux/end-user/components/TextBlock';

const SuccessMessage = (props) => {
  const { formSuccessMessage, formSuccessTitle } = props;

  return (
    <Card>
      {formSuccessTitle && <Heading>{formSuccessTitle}</Heading>}
      {formSuccessMessage && <TextBlock spacing="xxlarge">{formSuccessMessage}</TextBlock>}
    </Card>
  );
};

SuccessMessage.propTypes = {
  formSuccessMessage: PropTypes.string,
  formSuccessTitle: PropTypes.string,
};

SuccessMessage.defaultProps = {
  formSuccessMessage: '',
  formSuccessTitle: '',
};

export default SuccessMessage;
