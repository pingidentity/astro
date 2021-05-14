import React from 'react';
import PropTypes from 'prop-types';

import _ from 'lodash';
import { utils } from '@rjsf/core';
import {
  Button,
  Box,
  Text,
  Icon,
} from '@pingux/astro';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Delete } from '@pingux/icons';
import { css } from '@emotion/react';

const { ADDITIONAL_PROPERTY_FLAG } = utils;

const WrapIfAdditional = ({
  children,
  classNames,
  disabled,
  label,
  onDropPropertyClick,
  readonly,
  schema,
}) => {
  // eslint-disable-next-line no-prototype-builtins
  const additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);

  if (!label) return children;

  return (
    <Box
      className={classNames}
      css={css`
        & .remove-row {
          display: none;
        }
        &:focus-within .remove-row {
          display: block;
        }
      `}
    >
      <Box isRow alignItems="center" gap="10px" mb="10px" width="400px">
        <Box className="form-additional" flex="1" flexBasis="80px" flexGrow={0} alignItems="flex-start">
          <Box className="form-group">
            <Text variant="tabLabel">
              { `${label}:` }
            </Text>
          </Box>
        </Box>
        <Box className="form-additional" flex="1" alignItems="flex-start" flexGrow={1} css={css`label {display: none;} & * { width: 100%; }`}>
          {children}
        </Box>
        {additional && (
          <Box flex="1" flexBasis="30px" flexGrow={0} alignItems="flex-start" className="remove-row">
            <Button
              className="array-item-remove"
              disabled={disabled || readonly}
              onClick={onDropPropertyClick}
              variant="icon"
            >
              <Icon
                icon={Delete}
                size={20}
              />
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

WrapIfAdditional.propTypes = {
  children: PropTypes.node.isRequired,
  classNames: PropTypes.string,
  disabled: PropTypes.bool,
  formContext: PropTypes.shape({}),
  label: PropTypes.string,
  onDropPropertyClick: PropTypes.func,
  readonly: PropTypes.bool,
  schema: PropTypes.shape({}).isRequired,
};

WrapIfAdditional.defaultProps = {
  classNames: '',
  disabled: false,
  formContext: {},
  label: null,
  onDropPropertyClick: _.noop,
  readonly: false,
};

export default WrapIfAdditional;
