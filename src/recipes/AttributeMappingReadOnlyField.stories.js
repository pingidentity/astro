import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import AlertCircleIcon from 'mdi-react/AlertCircleIcon';
import { v4 as uuid } from 'uuid';
import {
  Box,
  Chip,
  IconButton,
  Text,
  Icon,
  Separator,
  TextField,
  HelpHint,
} from '../index';

export default {
  title: 'Recipes/Attribute Mapping Read Only Field',
};

const sx = {
  alertCircleIcon: {
    position: 'absolute',
    right: '4px',
    top: '4px',
    fill: '#A31300',
  },
  attributeMappingTitle: {
    fontSize: 'lg',
    lineHeight: '21px',
    fontWeight: 3,
    color: 'text.primary',
  },
  attributeMappingTitleWrapper: {
    marginBottom: 'md',
    alignItems: 'center',
  },
  chip: {
    width: 'xx',
    height: '22px',
    alignSelf: 'center',
    minWidth: 'fit-content',
    border: '1px solid',
    borderColor: 'neutral.80',
    backgroundColor: 'white !important',
    marginLeft: 8,
    '& span': {
      fontSize: 'sm',
      lineHeight: 1,
      color: '#253746',
    },
  },
  createIconButton: {
    marginLeft: 'xs',
  },
  defaultFieldsWrapperBox: {
    padding: '10px 10px 24px 10px',
    width: '450px',
    backgroundColor: 'accent.99',
  },
  fieldColumnTitle: {
    fontWeight: 3,
    fontSize: 'md',
    lineHeight: '18px',
    marginBottom: 'xs',
  },
  fieldColumnTitleWrapper: {
    width: 'calc(50% - 22px)',
  },
  fieldRowWrapper: {
    alignItems: 'center',
    marginTop: 'sm',
  },
  separator: {
    width: '21px',
    margin: '0 2px',
  },
  tooltipBox: {
    marginLeft: 'xs',
    height: 'md',
    width: 'md',
  },
};
const helperTextId = uuid();

const Row = (props) => {
  const {
    withChip,
    withTooltip,
    withError,
    leftValue,
    rightValue,
  } = props;

  return (
    <Box
      isRow
      sx={sx.fieldRowWrapper}
    >
      <TextField
        isReadOnly
        value={leftValue}
        labelProps={{
          mb: 0,
        }}
        controlProps={{
          variant: 'input.small',
          'aria-label': `input ${leftValue}`,
          sx: {
            width: '165px',
          },
        }}
        aria-labelledby={withError && helperTextId}
        slots={withError && {
          inContainer: (
            <Icon icon={AlertCircleIcon} sx={sx.alertCircleIcon} />
          ),
        }}
      />
      <Separator sx={sx.separator} />
      <TextField
        isReadOnly
        value={rightValue}
        labelProps={{
          mb: 0,
        }}
        controlProps={{
          variant: 'input.small',
          'aria-label': `input ${rightValue}`,
          sx: {
            width: '165px',
          },
        }}
      />
      {withChip &&
        <Chip
          label="Required"
          sx={sx.chip}
        />
      }
      {withTooltip &&
        <Box sx={sx.tooltipBox}>
          <HelpHint
            tooltipProps={{ direction: 'bottom' }}
          >
            Population set to default
          </HelpHint>
        </Box>
      }
    </Box>
  );
};

const Title = () => {
  return (
    <Box
      isRow
      sx={sx.attributeMappingTitleWrapper}
    >
      <Text sx={sx.attributeMappingTitle}>
        Attribute Mapping
      </Text>
      <Box>
        <IconButton sx={sx.createIconButton} variant="inverted" aria-label="edit header button" >
          <Icon icon={CreateIcon} size="sm" />
        </IconButton>
      </Box>
    </Box>
  );
};

export const Default = () => {
  return (
    <Box>
      <Title />
      <Box sx={sx.defaultFieldsWrapperBox}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Google Suites
            </Text>
          </Box>
        </Box>
        <Separator />
        <Row withChip leftValue="UserId" rightValue="mdorey" />
        <Row leftValue="givenName" rightValue="firstName" />
        <Row leftValue="familyName" rightValue="lastName" />
        <Row withTooltip leftValue="population" rightValue="population" />
        <Row leftValue="password" rightValue="password" />
      </Box>
    </Box>
  );
};

export const WithError = () => {
  const withError = true;
  const withErrorSx = {
    errorBox: {
      flexDirection: 'row !important',
      alignItems: 'center',
      padding: '13px 12px 13px 15px',
      gap: 'md',
      border: '1px solid #A31300',
      width: '450px',
      marginBottom: 'xs',
    },
    text: {
      fontSize: 'sm',
      lineHeight: '15px',
    },
  };

  return (
    <Box>
      <Title />

      {withError && (
        <Box sx={withErrorSx.errorBox}>
          <Icon size={24} icon={AlertCircleIcon} color="#A31300" />
          <Text sx={withErrorSx.text} id={helperTextId} role="alert">
            This attribute is unavailable.
            Please map the attribute again or re-map to a different attribute.
          </Text>
        </Box>
      )}

      <Box sx={sx.defaultFieldsWrapperBox}>
        <Box
          isRow
          sx={{ width: '100%' }}
        >
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              PingOne
            </Text>
          </Box>
          <Box sx={sx.fieldColumnTitleWrapper}>
            <Text sx={sx.fieldColumnTitle}>
              Google Suites
            </Text>
          </Box>
        </Box>
        <Separator />
        <Row withChip leftValue="UserId" rightValue="mdorey" />
        <Row withError={withError} leftValue="givenName" rightValue="firstName" />
        <Row withError={withError} leftValue="familyName" rightValue="lastName" />
      </Box>
    </Box>
  );
};
