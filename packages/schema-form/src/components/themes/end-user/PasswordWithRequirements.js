import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { Global, css } from '@emotion/core';
import endUserStyles from '@pingux/end-user/end-user.css';
import tippyStyles from 'tippy.js/dist/tippy.css';
import tippyLightTheme from 'tippy.js/themes/light.css';

import FloatLabelPasswordInput from '@pingux/end-user/components/FloatLabelPasswordInput';
import Heading from '@pingux/end-user/components/Heading';
import Requirements from '@pingux/end-user/components/Requirements';

import { getThemedProps } from '../../../themes/utils';

const PasswordWithRequirements = (props) => {
  const { formContext: { theme } } = props;
  const [isVisible, setIsVisible] = useState(false);
  const focus = () => setIsVisible(true);
  const blur = () => setIsVisible(false);
  const ref = useRef();
  const inputProps = getThemedProps(theme, props);
  const { requirementsTitle, requirementsData, tippyProps } = inputProps;

  const insertedStyles = css`
    ${endUserStyles}

    .requirement {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  `;

  return (
    // Need to provide a separate element to anchor Tippy to since we can't forward a ref to the
    // input itself. But the input should control the visibility so we give it callbacks for the
    // state.
    <>
      <div ref={ref}>
        <FloatLabelPasswordInput {...inputProps} onFocus={focus} onBlur={blur} />
      </div>
      <Tippy
        theme="light"
        reference={ref}
        visible={isVisible}
        content={(
          <div css={insertedStyles} style={{ padding: '10px' }}>
            <Global styles={css`${tippyStyles} ${tippyLightTheme}`} />
            <Heading level={4}>{requirementsTitle}</Heading>
            <Requirements requirements={requirementsData} />
          </div>
        )}
        {...tippyProps}
      />
    </>
  );
};

PasswordWithRequirements.propTypes = {
  formContext: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
};

export default PasswordWithRequirements;
