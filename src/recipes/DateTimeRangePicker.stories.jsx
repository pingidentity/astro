import React, { useState } from 'react';
import { Time } from '@internationalized/date';
import CalendarIcon from '@pingux/mdi-react/CalendarIcon';
import { withDesign } from 'storybook-addon-designs';

import { useModalState } from '../hooks';
import { Box,
  Button,
  ButtonBar,
  Icon,
  Item,
  Modal,
  OverlayProvider,
  RangeCalendar,
  SelectField,
  Separator,
  Text,
  TimeField } from '../index';
import { FIGMA_LINKS } from '../utils/designUtils/figmaLinks';


export default {
  title: 'Recipes/DateTimeRangePicker',
  decorators: [withDesign],
};

const dropdownItems = [
  { key: 'Today', name: 'Today' },
  { key: 'From Yesterday', name: 'From Yesterday' },
  { key: 'Last 7 Days', name: 'Last 7 Days' },
  { key: 'Last 30 Days', name: 'Last 30 Days' },
  { key: 'This Month', name: 'This Month' },
  { key: 'Last Month', name: 'Last Month' },
  { key: 'Custom Range', name: 'Custom Range' },
];

function convertDateTimeValueToString(timeValue, DateValue) {
  // eslint-disable-next-line prefer-const
  let { hour, minute } = timeValue;
  const ampm = hour >= 12 ? 'PM' : 'AM';
  hour %= 12;
  hour = hour || 12;
  const hourString = String(hour);
  const minuteString = String(minute).padStart(2, '0');
  return `${DateValue.toString()} ${hourString}:${minuteString} ${ampm}`;
}

export const Default = () => {
  const modalState = useModalState();
  const [range, setRange] = useState(
    {
      start: '2030-01-12',
      end: '2030-01-15',
    });
  const [startTime, setStartTime] = useState(new Time(1));
  const [endTime, setEndTime] = useState(new Time(12, 59));
  const [selectedKey, setSelectedKey] = useState('Today');
  const handleSelectionChange = key => {
    if (key === 'Custom Range') {
      modalState.open();
    }
    setSelectedKey(key);
  };

  return (
    <Box gap="lg">
      <Text>Click on the ‘Custom Range’ option to view the modal</Text>
      <OverlayProvider>
        <SelectField
          width="200px"
          items={dropdownItems}
          selectedKey={selectedKey}
          onSelectionChange={handleSelectionChange}
          label="Date Range"
          slots={{
            leftOfData: <Icon icon={CalendarIcon} color="accent.40" mr="xs" title={{ name: 'Calendar Icon' }} />,
          }}
        >
          {item => (
            <Item key={item.key}>
              {item.name}
            </Item>
          )}
        </SelectField>
        {modalState.isOpen && (
          <Modal
            isOpen={modalState.isOpen}
            onClose={modalState.close}
            hasCloseButton
            title="Custom Date and Time Range"
            contentProps={{
              maxWidth: '636px',
              width: '100%',
            }}
          >
            <Box gap="lg" mt="lg">
              <Box minHeight="358px">
                <Text as="h2" variant="H2" mb="xs">
                  Date Range
                </Text>
                <RangeCalendar value={range} onChange={setRange} />
              </Box>
              <Separator margin={0} />
              <Box>
                <Text as="h2" variant="H2">
                  Time Range
                </Text>
                <Box isRow gap="lg" alignItems="center" mt="xs">
                  <TimeField
                    label="Start Time"
                    value={startTime}
                    onChange={setStartTime}
                  />
                  <Box height="59.95px">
                    <Box height="19.95px" />
                    <Box height="40px" justifyContent="center">
                      <Text as="h2" variant="H2">
                        -
                      </Text>
                    </Box>
                  </Box>
                  <TimeField
                    label="End Time"
                    value={endTime}
                    onChange={setEndTime}
                  />
                </Box>
              </Box>
              <Separator margin={0} />
              <Text>
                {convertDateTimeValueToString(startTime, range.start)}
                {' '}
                -
                {' '}
                {convertDateTimeValueToString(endTime, range.end)}
              </Text>
              <ButtonBar sx={{ padding: 0 }}>
                <Button variant="primary" data-id="apply-button">
                  Apply
                </Button>
                <Button variant="link" data-id="cancel-button">
                  Cancel
                </Button>
              </ButtonBar>
            </Box>
          </Modal>
        )}
      </OverlayProvider>
    </Box>
  );
};

Default.parameters = {
  design: {
    type: 'figma',
    url: FIGMA_LINKS.dateTimeRangePicker.default,
  },
};
