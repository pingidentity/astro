import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Tippy from '@tippyjs/react';
import { noop } from 'lodash';
import { Global, css } from '@emotion/core';
import { TextField, Text, PageWrapper } from '@pingux/astro';
import tippyStyles from 'tippy.js/dist/tippy.css';

import Requirements from '@pingux/end-user/components/Requirements';

// eslint-disable-next-line
import { getThemedProps } from '../../../themes/utils';

const PasswordWithRequirements = (props) => {
  const { onChange: onChangeCb, controlProps } = props;
  const [isVisible, setIsVisible] = useState(false);
  const focus = () => setIsVisible(true);
  const blur = () => setIsVisible(false);
  const ref = useRef();
  const {
    requirementsTitle,
    requirementsData,
    /* istanbul ignore next */
    validateRequirements = (e, data) => data,
    tippyProps,
  } = controlProps;
  const [reqs, setReqs] = useState(requirementsData);

  const onChange = (e) => {
    const res = validateRequirements(e, requirementsData);
    setReqs(res);
    onChangeCb(e);
  };

  const insertedStyles = css`
    .requirement {
      -webkit-font-smoothing: antialiased;
      word-wrap: break-word;
      word-break: break-word;
      color: #575f67;
      font-weight: 200;
      font-size: 13px;
      font-family: "proxima-nova", sans-serif;
      margin-bottom: 10px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .requirement__icon {
      margin-right: 10px;
    }

    .requirement__icon--success {
      color: #4aba78;
    }

    .requirement__name {
      -webkit-font-smoothing: antialiased;
      word-wrap: break-word;
      word-break: break-word;
      color: #575f67;
      font-weight: 200;
      font-size: 13px;
      font-family: "proxima-nova", sans-serif;
      display: flex;
      flex-direction: column;
      margin-top: 0.15em;
      width: 100%;
      flex-shrink: 1;
    }
  `;

  return (
    // Need to provide a separate element to anchor Tippy to since we can't forward a ref to the
    // input itself. But the input should control the visibility so we give it callbacks for the
    // state.
    <>
      <div ref={ref}>
        <TextField
          {...props}
          type="password"
          controlProps={{
            controlProps,
            onChange,
            onFocus: focus,
            onBlur: blur,
          }}
        />
      </div>
      <Tippy
        theme="light"
        reference={ref}
        visible={isVisible}
        content={(
          <PageWrapper>
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
              <Text variant="label" mb="sm">{requirementsTitle}</Text>
              <Requirements requirements={reqs} />
            </div>
          </PageWrapper>
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
  controlProps: PropTypes.shape({
    requirementsTitle: PropTypes.string.isRequired,
    requirementsData: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    validateRequirements: PropTypes.func,
    tippyProps: PropTypes.shape({}),
  }),
  onChange: PropTypes.func,
};

PasswordWithRequirements.defaultProps = {
  controlProps: {},
  onChange: noop,
};

export default PasswordWithRequirements;
