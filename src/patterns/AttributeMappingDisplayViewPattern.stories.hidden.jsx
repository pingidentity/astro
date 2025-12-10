import React from 'react';

import {
  Badge,
  Box,
  Separator,
  Text,
  TextField,
} from '../index';

export default {
  title: 'Design Patterns/Attribute Mapping Display View',
};

const fieldValues = [
  {
    field1: 'username',
    field2: 'UserID',
    hasBadge: true,
    badgeLabel: 'Required',
    key: 1,
  },
  { field1: 'firstName', field2: 'Given Name', hasBadge: false, key: 2 },
  { field1: 'lastName', field2: 'Family Name', hasBadge: false, key: 3 },
  { field1: 'population', field2: 'Population', hasBadge: false, key: 4 },
];

const sx = {
  mainContentBox: {
    bg: 'accent.99',
    alignItems: 'center',
    maxWidth: '450px',
    height: '220px',
  },
  innerContentBox: {
    p: 'md',
  },
  applicationText: {
    pl: 'sm',
    fontWeight: '3',
    lineHeight: '18.31px',
    width: 'calc(50% - 22px)',
  },
  pingOneText: {
    fontWeight: '3',
    fontSize: 'md',
    lineHeight: '18.31px',
  },
  separatorBox: {
    px: 'sm',
  },
  separatorStyle: {
    mt: 'sm',
    mb: 'sm',
    width: '100%',
  },
  mainFieldValueBox: {
    pl: 'sm',
  },
  textFieldStyleProps: {
    width: '165px',
    py: '5px',
  },
  textFieldSeparator: {
    mt: 'auto',
    mb: 'auto',
    width: '21px',
  },
  badgeStyle: {
    width: '65px',
    height: '22px',
    minWidth: 'fit-content',
    alignSelf: 'center',
    py: '3px',
    ml: 'sm',
    mr: 'xs',
    border: '1px solid',
    borderColor: 'neutral.80',
    bg: 'white',
    '& span': {
      fontSize: 'sm',
      width: '55px',
      height: '16px',
    },
  },
};

export const Default = () => {
  return (
    <Box sx={sx.mainContentBox}>
      <Box items={fieldValues} sx={sx.innerContentBox}>
        <Box isRow>
          <Text sx={sx.applicationText}>
            Application
          </Text>
          <Text sx={sx.pingOneText}>
            PingOne
          </Text>
        </Box>
        <Box sx={sx.separatorBox}>
          <Separator sx={sx.separatorStyle} />
        </Box>
        {fieldValues.map(({ field1, field2, hasBadge, key }) => (
          <Box
            isRow
            key={key}
            sx={sx.mainFieldValueBox}
          >
            <TextField
              aria-label={field1}
              isReadOnly
              value={field1}
              controlProps={{
                variant: 'input.small',
                sx: sx.textFieldStyleProps,
              }}
            />
            <Separator sx={sx.textFieldSeparator} />
            <TextField
              aria-label={field2}
              isReadOnly
              value={field2}
              controlProps={{
                variant: 'input.small',
                sx: sx.textFieldStyleProps,
              }}
            />
            {hasBadge && (
            <Badge
              label="Required"
              textColor="#253746"
              sx={sx.badgeStyle}
            />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
