import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import {
  Box,
  Bracket,
  Button,
  Chip,
  IconButton,
  Icon,
  Item,
  RockerButtonGroup,
  RockerButton,
  SelectField,
  Text,
  TextField,
} from '../index';

export default {
  title: 'Recipes/Conditional Filter',
};

const sx = {
  customChipStyles: {
    marginRight: 'sm',
    '& > span': {
      textTransform: 'none',
      fontWeight: '500',
    },
    minWidth: '65px',
    'z-index': '1',
  },
  borderedBoxStyles: {
    '&::after': { bg: 'decorative.7' },
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'neutral.80',
    borderRadius: '4px',
    padding: 'sm',
    width: '100%',
  },
  allConditionsBox: {
    '&::after': { bg: 'decorative.7' },
    alignItems: 'center',
    borderRadius: '4px',
    marginTop: 'md',
  },
  defaultText: {
    textTransform: 'none',
    color: 'inherit',
  },
};

export const Default = () => {
  const allConditions = [
    { field1: 'Family Name', field3: 'John', key: 'FamilyNameField' },
    { field1: 'Full Name', field3: 'Alex Smith', key: 'FullNameField' },
  ];

  const anyConditions = [
    { field1: 'Group', field3: 'Marketing', key: 'Group1Field' },
    { field1: 'Group', field3: 'UX Team', key: 'Group2Field' },
  ];

  const noneConditions = [
    { field1: 'Miscellaneous', field3: 'Apple', key: 'Miscellaneous1Field' },
    { field1: 'Miscellaneous', field3: 'Banana', key: 'Miscellaneous2Field' },
  ];

  const trashButton = (
    <IconButton aria-label="deleteButton" sx={{ alignSelf: 'center' }}>
      <Icon icon={TrashIcon} sx={{ '& > path': { fill: 'neutral.40' } }} />
    </IconButton>
  );

  const [editOverviewVisible, setEditOverviewVisible] = React.useState(false);

  return (
    <Box maxWidth="800px">
      {!editOverviewVisible ? (
        <Box bg="accent.99" p="md">
          <Box isRow>
            <Text variant="itemTitle" pb="md">Branch Condition</Text>
            <IconButton
              aria-label="edit"
              variant="inverted"
              ml="xs"
              onPress={() => setEditOverviewVisible(true)}
            >
              <Icon icon={CreateIcon} size={14} />
            </IconButton>
          </Box>
          <Box isRow>
            <Chip
              label="ALL"
              bg="decorative.7"
              sx={sx.customChipStyles}
            />
            <Text> of the conditions are true</Text>
          </Box>
          {allConditions.map(item => (
            <Box isRow key={item.key}>
              <Bracket />
              <Box ml="3px" width="100%" >
                <Box
                  variant="forms.input.container"
                  bg="white"
                  isRow
                  sx={sx.allConditionsBox}
                >
                  <Text pl="md" pr="sm">{item.field1}</Text>
                  <Chip
                    label="Equals"
                    bg="accent.90"
                    textColor="neutral.10"
                    sx={sx.customChipStyles}
                    alignSelf="center"
                  />
                  <Text>{item.field3}</Text>
                </Box>
              </Box>
            </Box>
                ))}
          <Box isRow >
            <Bracket />
            <Box
              variant="forms.input.container"
              mt="md"
              sx={sx.borderedBoxStyles}
            >
              <Box isRow>
                <Chip
                  label="ANY"
                  bg="decorative.4"
                  sx={sx.customChipStyles}
                  alignSelf="center"
                />
                <Text> of the conditions are true</Text>
              </Box>
              <Box ml="sm" >
                {anyConditions.map((item, index) => (
                  <Box isRow key={item.key}>
                    <Bracket isLast={index === anyConditions.length - 1} />
                    <Box
                      mt="md"
                      variant="forms.input.container"
                      bg="white"
                      isRow
                      width="100%"
                      sx={sx.allConditionsBox}
                    >
                      <Text pl="md" pr="sm">{item.field1}</Text>
                      <Chip
                        label="Equals"
                        bg="accent.90"
                        textColor="neutral.10"
                        sx={sx.customChipStyles}
                        alignSelf="center"
                      />
                      <Text>{item.field3}</Text>
                    </Box>
                  </Box>
                      ))}
              </Box>
            </Box>
          </Box>
          <Box isRow >
            <Bracket isLast />
            <Box
              variant="forms.input.container"
              mt="md"
              sx={sx.borderedBoxStyles}
            >
              <Box isRow>
                <Chip
                  label="NONE"
                  bg="accent.20"
                  sx={sx.customChipStyles}
                  alignSelf="center"
                />
                <Text> of the conditions are true</Text>
              </Box>
              <Box ml="sm" >
                {noneConditions.map((item, index) => (
                  <Box isRow key={item.key}>
                    <Bracket isLast={index === noneConditions.length - 1} />
                    <Box
                      mt="md"
                      variant="forms.input.container"
                      bg="white"
                      isRow
                      width="100%"
                      sx={sx.allConditionsBox}
                    >
                      <Text pl="md" pr="sm">{item.field1}</Text>
                      <Chip
                        label="Equals"
                        bg="accent.90"
                        textColor="neutral.10"
                        sx={sx.customChipStyles}
                        alignSelf="center"
                      />
                      <Text>{item.field3}</Text>
                    </Box>
                  </Box>
                      ))}
              </Box>
            </Box>
          </Box>
        </Box>
      ) :
        (
          <Box bg="accent.99" p="md" >
            <Text variant="itemTitle" pb="md">Branch Condition</Text>
            <Box isRow alignItems="center" mb="md">
              <RockerButtonGroup mr="sm" defaultSelectedKey="all">
                <RockerButton name="all" key="all" selectedStyles={{ bg: 'decorative.7' }} >
                  <Text sx={sx.defaultText}>ALL</Text>
                </RockerButton>
                <RockerButton name="any" key="any" selectedStyles={{ bg: 'decorative.4' }} >
                  <Text sx={sx.defaultText}>ANY</Text>
                </RockerButton>
                <RockerButton name="none" key="none" selectedStyles={{ bg: 'accent.20' }} >
                  <Text sx={sx.defaultText}>NONE</Text>
                </RockerButton>
              </RockerButtonGroup>
              <Text> of the conditions are true</Text>
              <Button
                variant="inline"
                width="fit-content"
                role="button"
                title="Add Field Button"
                ml="auto"
                mr="sm"
                aria-label="add"
              >
                + Add
              </Button>
            </Box>

            {allConditions.map(item => (
              <Box isRow alignItems="center" mb="md" key={item.key}>

                <Box isRow width="100%">
                  <TextField
                    width="40%"
                    value={item.field1}
                    mr="md"
                    containerProps={{ sx: { '& > div::after': { bg: 'decorative.7' } } }}
                    aria-label="temp-label"
                  />
                  <SelectField hasNoStatusIndicator selectedKey="Equals" mr="md" aria-label="temp-label">
                    <Item key="Equals" textValue="Equals" aria-label="equals" >Equals</Item>
                    <Item key="NotEquals" textValue="NotEquals" aria-label="notequal" >Not Equal</Item>
                  </SelectField>
                  <TextField hasNoStatusIndicator width="40%" value={item.field3} mr="xs" aria-label="temp-label" />
                </Box>
                {trashButton}
              </Box>
              ))}
            <Box isRow>
              <Box
                variant="forms.input.container"
                sx={sx.borderedBoxStyles}
              >
                <Box isRow alignItems="center" mb="md">
                  <RockerButtonGroup mr="sm" defaultSelectedKey="any">
                    <RockerButton name="all" key="all" selectedStyles={{ bg: 'decorative.7' }} >
                      <Text sx={sx.defaultText}>ALL</Text>
                    </RockerButton>
                    <RockerButton name="any" key="any" selectedStyles={{ bg: 'decorative.4' }} >
                      <Text sx={sx.defaultText}>ANY</Text>
                    </RockerButton>
                    <RockerButton name="none" key="none" selectedStyles={{ bg: 'accent.20' }} >
                      <Text sx={sx.defaultText}>NONE</Text>
                    </RockerButton>
                  </RockerButtonGroup>
                  <Text> of the conditions are true</Text>
                  <Button
                    variant="inline"
                    width="fit-content"
                    role="button"
                    title="Add Field Button"
                    ml="auto"
                    mr="sm"
                    aria-label="add"
                  >
                    + Add
                  </Button>
                </Box>

                <Box ml="lg">
                  {anyConditions.map(item => (
                    <Box isRow alignItems="center" mb="md" key={item.key}>

                      <Box isRow width="100%">
                        <TextField aria-label="temp-label" value={item.field1} width="40%" mr="md" containerProps={{ sx: { '& > div::after': { bg: 'decorative.4' } } }} />
                        <SelectField aria-label="temp-label" hasNoStatusIndicator selectedKey="Equals" mr="md">
                          <Item key="Equals" textValue="Equals" aria-label="Equals" >Equals</Item>
                          <Item key="NotEquals" textValue="NotEqual" aria-label="NotEqual" >Not Equal</Item>
                        </SelectField>
                        <TextField aria-label="temp-label" hasNoStatusIndicator value={item.field3} width="40%" mr="xs" />
                      </Box>
                      {trashButton}
                    </Box>
                    ))}
                </Box>
              </Box>
              <Box alignSelf="start">
                {trashButton}
              </Box>
            </Box>
            <Box isRow mt="md">
              <Box
                variant="forms.input.container"
                sx={sx.borderedBoxStyles}
              >
                <Box isRow alignItems="center" mb="md">
                  <RockerButtonGroup mr="sm" defaultSelectedKey="none">
                    <RockerButton name="all" key="all" selectedStyles={{ bg: 'decorative.7' }} >
                      <Text sx={sx.defaultText}>ALL</Text>
                    </RockerButton>
                    <RockerButton name="any" key="any" selectedStyles={{ bg: 'decorative.4' }} >
                      <Text sx={sx.defaultText}>ANY</Text>
                    </RockerButton>
                    <RockerButton name="none" key="none" selectedStyles={{ bg: 'accent.20' }} >
                      <Text sx={sx.defaultText}>NONE</Text>
                    </RockerButton>
                  </RockerButtonGroup>
                  <Text> of the conditions are true</Text>
                  <Button
                    variant="inline"
                    width="fit-content"
                    role="button"
                    title="Add Field Button"
                    ml="auto"
                    mr="sm"
                    aria-label="add"
                  >
                    + Add
                  </Button>
                </Box>

                <Box ml="lg">
                  {noneConditions.map(item => (
                    <Box isRow alignItems="center" mb="md" key={item.key}>
                      <Box isRow width="100%">
                        <TextField aria-label="temp-label" value={item.field1} width="40%" mr="md" containerProps={{ sx: { '& > div::after': { bg: 'accent.20' } } }} />
                        <SelectField aria-label="temp-label" hasNoStatusIndicator selectedKey="Equals" mr="md">
                          <Item key="Equals" textValue="Equals" aria-label="Equals" >Equals</Item>
                          <Item key="NotEquals" textValue="NotEqual" aria-label="NotEqual" >Not Equal</Item>
                        </SelectField>
                        <TextField aria-label="temp-label" hasNoStatusIndicator value={item.field3} width="40%" mr="xs" />
                      </Box>
                      {trashButton}
                    </Box>
                    ))}
                </Box>
              </Box>
              <Box alignSelf="start">
                {trashButton}
              </Box>

            </Box>

            <Box isRow mt="lg">
              <Button onPress={() => setEditOverviewVisible(false)} variant="primary" mr="md" aria-label="save" >Save</Button>
              <Button onPress={() => setEditOverviewVisible(false)} variant="link" aria-label="cancel" >Cancel</Button>
            </Box>
          </Box>
      ) }
    </Box>
  );
};
