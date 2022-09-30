import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
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

export const Default = () => {
  const Row = (props) => {
    const {
      withChip,
      withTooltip,
      leftValue,
      rightValue,
    } = props;

    return (
      <Box
        isRow
        alignItems="center"
        mt="10px"
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
        />
        <Separator
          sx={{
            width: '21px',
            ml: '2px',
            mr: '2px',
          }}
        />
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
            sx={{
              width: '65px',
              height: '22px',
              alignSelf: 'center',
              minWidth: 'fit-content',
              border: '1px solid',
              borderColor: 'neutral.80',
              backgroundColor: 'white !important',
              ml: 8,
              '& span': {
                fontSize: 'sm',
                lineHeight: 1,
                color: '#253746',
              },
            }}
          />
        }
        {withTooltip &&
          <Box ml="5px" height="15px" width="15px" >
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

  return (
    <Box>
      <Box
        isRow
        alignItems="center"
        mb="15px"
      >
        <Text
          sx={{
            fontSize: 'lg',
            lineHeight: '21px',
            fontWeight: 3,
            color: 'text.primary',
          }}
        >
          Attribute Mapping
        </Text>
        <Box>
          <IconButton ml="5px" variant="inverted" aria-label="edit header button" >
            <Icon icon={CreateIcon} size={18} />
          </IconButton>
        </Box>
      </Box>
      <Box
        backgroundColor="accent.99"
        width="450px"
        padding="10px 10px 25px 10px"
      >
        <Box
          isRow
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: 'calc(50% - 22px)',
            }}
          >
            <Text
              sx={{
                fontWeight: 3,
                fontSize: 'md',
                lineHeight: '18px',
                mb: '5px',
              }}
            >
              PingOne
            </Text>
          </Box>
          <Box
            sx={{
              width: 'calc(50% - 22px)',
            }}
          >
            <Text
              sx={{
                fontWeight: 3,
                fontSize: 'md',
                lineHeight: '18px',
                mb: '5px',
              }}
            >
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
