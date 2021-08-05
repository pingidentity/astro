import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { noop } from 'lodash';
import { Global, css } from '@emotion/react';
import endUserStyles from '@pingux/end-user/lib/end-user.css';
import tippyStyles from 'tippy.js/dist/tippy.css';

import FloatLabelPasswordInput from '@pingux/end-user/lib/components/FloatLabelPasswordInput';
import Heading from '@pingux/end-user/lib/components/Heading';
import Requirements from '@pingux/end-user/lib/components/Requirements';

const PasswordWithRequirements = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const focus = () => setIsVisible(true);
  const blur = () => setIsVisible(false);
  const ref = useRef();
  const {
    requirementsTitle,
    requirementsData,
    validateRequirements,
    tippyProps,
    onChange: onChangeCb,
    ...others
  } = props;
  const [reqs, setReqs] = useState(requirementsData);

  const onChange = (e) => {
    const res = validateRequirements(e, requirementsData);
    setReqs(res);
    onChangeCb(e);
  };

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
        <FloatLabelPasswordInput
          {...others}
          onChange={onChange}
          onFocus={focus}
          onBlur={blur}
        />
      </div>
      <Tippy
        theme="light"
        reference={ref}
        visible={isVisible}
        content={(
          <div css={insertedStyles} style={{ padding: '10px' }}>
            <Global styles={css`
                ${tippyStyles}
                .tippy-content {
                  background-color: #FFF;
                }
                .tippy-box {
                  box-shadow: rgb(0 0 0 / 18%) 0px 0px 12px 2px;
                }
                .tippy-arrow {
                  color: white;
                  fill: white;
                  border-bottom-width: 1px;
                  border-color: white;
                }
              `}
            />
            <Heading level={4}>{requirementsTitle}</Heading>
            <Requirements requirements={reqs} />
          </div>
        )}
        {...tippyProps}
      />
    </>
  );
};

PasswordWithRequirements.propTypes = {
  label: PropTypes.node,
  id: PropTypes.string.isRequired,
  inputProps: PropTypes.shape({}),
  formContext: PropTypes.shape({
    theme: PropTypes.string.isRequired,
  }).isRequired,
  requirementsTitle: PropTypes.string.isRequired,
  requirementsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  validateRequirements: PropTypes.func,
  tippyProps: PropTypes.shape({}),
  onChange: PropTypes.func,
};

PasswordWithRequirements.defaultProps = {
  /* istanbul ignore next */
  validateRequirements: (e, data) => data,
  tippyProps: {},
  onChange: noop,
  label: undefined,
  inputProps: {},
};

export default PasswordWithRequirements;
