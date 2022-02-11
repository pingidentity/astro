import React from 'react';
import CreateIcon from 'mdi-react/CreateIcon';
import DragVerticalIcon from 'mdi-react/DragVerticalIcon';
import TrashIcon from 'mdi-react/TrashIcon';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Icon,
  Item,
  OverlayProvider,
  RockerButtonGroup,
  RockerButton,
  SelectField,
  Text,
  TextField,
} from '../index';

import OverlayPanel from '../components/OverlayPanel';

export default {
  title: 'Recipes/ConditionalFilter',
};

const BracketSVG = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" {...props}>
      <title>bracket-fill</title>
      <g>
        <title>Layer 1</title>
        <path fillRule="nonzero" fill="#CACED3" id="Path" d={`m6, ${props.height - 18}.89712l0,10c0,2.1422 1.68397,3.89108 3.80036,3.9951l0.19964,0.0049l5,0l0,1l-5,0c-2.76142,0 -5,-2.23858 -5,-5l0,-10l1,0z`} />
        <line strokeLinecap="undefined" strokeLinejoin="undefined" id="svg_1" y2="0" x2="5.50861" y1={`${props.height - 17}`} x1="5.50861" stroke="#caced3" fill="none" />
      </g>
    </svg>
  );
};

export const Default = () => {
  const customChipStyles = ({
    '& > span': { textTransform: 'none', fontWeight: '500' }, minWidth: '65px', 'z-index': '1',
  });

  const borderedBoxStyles = ({
    '&::after': { bg: 'decorative.7' },
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'neutral.80',
    borderRadius: '4px',
  });

  const allConditions = [
    { field1: 'Family Name', field3: 'John', key: 'FamilyNameField' },
    { field1: 'Full Name', field3: 'Alex Smith', key: 'FullNameField' },
  ];

  const anyConditions = [
    { field1: 'Group', field3: 'Marketing', key: 'Group1Field' },
    { field1: 'Group', field3: 'UX Team', key: 'Group2Field' },
  ];

  const trashButton = (
    <IconButton aria-label="deleteButton" sx={{ alignSelf: 'center' }}>
      <Icon icon={TrashIcon} sx={{ '& > path': { fill: 'neutral.40' } }} />
    </IconButton>
  );

  const [staticOverviewVisible, setStaticOverviewVisible] = React.useState(false);
  const [editOverviewVisible, setEditOverviewVisible] = React.useState(false);

  return (
    <>
      <OverlayProvider>
        <Button onPress={() => setStaticOverviewVisible(true)}>Open Panel</Button>
        {
          staticOverviewVisible &&
          <OverlayPanel isOpen={staticOverviewVisible}>
            <Box>
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
                    label="All"
                    bg="decorative.7"
                    mr="sm"
                    sx={customChipStyles}
                  />
                  <Text> of the conditions are true</Text>
                </Box>
                {allConditions.map(item => (
                  <Box isRow key={item.key}>
                    <Box mt="-10px" mr="-3px">
                      <BracketSVG width="15" height="40" />
                    </Box>
                    <Box ml="3px" width="100%">
                      <Box
                        variant="forms.input.container"
                        bg="white"
                        isRow
                        alignItems="center"
                        borderRadius="4px"
                        sx={{ '&::after': { bg: 'decorative.7' } }}
                        mt="15px"
                      >
                        <Text pl="md" pr="sm">{item.field1}</Text>
                        <Chip
                          label="Equals"
                          bg="accent.90"
                          textColor="neutral.10"
                          sx={customChipStyles}
                          mr="sm"
                          alignSelf="center"
                        />
                        <Text>{item.field3}</Text>
                      </Box>
                    </Box>
                  </Box>
                ))}
                <Box isRow >
                  <Box mt="-10px" mr="-3px">
                    <BracketSVG width="15" height="80" />
                  </Box>
                  <Box
                    variant="forms.input.container"
                    borderRadius="4px"
                    p="sm"
                    mt="md"
                    sx={borderedBoxStyles}
                    width="100%"
                  >
                    <Box isRow>
                      <Chip
                        label="Any"
                        bg="decorative.4"
                        mr="sm"
                        sx={customChipStyles}
                        alignSelf="center"
                      />
                      <Text> of the conditions are true</Text>
                    </Box>
                    <Box ml="sm" >
                      {anyConditions.map(item => (
                        <Box isRow mt="md" key={item.key}>
                          <Box mt="-25px" mr="-3px">
                            <BracketSVG width="15" height="40" />
                          </Box>
                          <Box
                            variant="forms.input.container"
                            bg="white"
                            isRow
                            alignItems="center"
                            borderRadius="4px"
                            width="100%"
                            sx={{ '&::after': { bg: 'decorative.4' } }}
                          >
                            <Text pl="md" pr="sm">{item.field1}</Text>
                            <Chip
                              label="Equals"
                              bg="accent.90"
                              textColor="neutral.10"
                              sx={customChipStyles}
                              mr="sm"
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
            </Box>
            <Button onPress={() => setStaticOverviewVisible(false)} width="fit-content" mt="lg">Close Panel</Button>
          </OverlayPanel>
        }
        {
          editOverviewVisible &&
          <OverlayPanel isOpen={editOverviewVisible}>
            <Box bg="accent.99" p="md" >
              <Text variant="itemTitle" pb="md">Branch Condition</Text>
              <Box isRow alignItems="center" mb="md">
                <RockerButtonGroup mr="sm" selectedKey="all" aria-label="temp-label" >
                  <RockerButton name="any" key="any" selectedStyles={{ bg: 'decorative.7' }} aria-label="temp-label" >
                    <Text sx={{ textTransform: 'none', color: 'inherit' }}>Any</Text>
                  </RockerButton>
                  <RockerButton name="all" key="all" selectedStyles={{ bg: 'decorative.7' }} aria-label="temp-label" >
                    <Text sx={{ textTransform: 'none', color: 'inherit' }}>All</Text>
                  </RockerButton>
                </RockerButtonGroup>
                <Text> of the conditions are true</Text>
                <Button
                  variant="inline"
                  width="fit-content"
                  role="button"
                  title="Add Field Button"
                  ml="auto"
                  mr="xl"
                  aria-label="add"
                >
                  + Add
                </Button>
              </Box>

              {allConditions.map(item => (
                <Box isRow alignItems="center" mb="md" key={item.key}>
                  <Icon icon={DragVerticalIcon} mr="sm" />
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
                <Icon icon={DragVerticalIcon} mr="sm" />
                <Box
                  variant="forms.input.container"
                  borderRadius="4px"
                  p="sm"
                  width="100%"
                  sx={borderedBoxStyles}
                  mr="xs"
                >
                  <Box isRow alignItems="center" mb="md">
                    <RockerButtonGroup mr="sm" aria-label="temp-label" >
                      <RockerButton name="any" key="any" selectedStyles={{ bg: 'decorative.4' }} aria-label="any">
                        <Text sx={{ textTransform: 'none', color: 'inherit' }}>Any</Text>
                      </RockerButton>
                      <RockerButton name="all" key="all" selectedStyles={{ bg: 'decorative.4' }} aria-label="all">
                        <Text sx={{ textTransform: 'none', color: 'inherit' }}>All</Text>
                      </RockerButton>
                    </RockerButtonGroup>
                    <Text> of the conditions are true</Text>
                    <Button
                      variant="inline"
                      width="fit-content"
                      role="button"
                      title="Add Field Button"
                      ml="auto"
                      mr="xl"
                      aria-label="add"
                    >
                      + Add
                    </Button>
                  </Box>

                  <Box ml="lg">
                    {anyConditions.map(item => (
                      <Box isRow alignItems="center" mb="md" key={item.key}>
                        <Icon icon={DragVerticalIcon} mr="sm" />
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
                <IconButton aria-label="my-label">
                  <Icon icon={TrashIcon} sx={{ '& > path': { fill: '#68747f !important' } }} />
                </IconButton>
              </Box>
              <Box isRow mt="lg">
                <Button onPress={() => setEditOverviewVisible(false)} variant="primary" mr="md" aria-label="save" >Save</Button>
                <Button onPress={() => setEditOverviewVisible(false)} variant="link" aria-label="cancel" >Cancel</Button>
              </Box>
            </Box>
          </OverlayPanel>
        }
      </OverlayProvider>
    </>
  );
};
