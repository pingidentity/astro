import React from 'react';
import ChevronLeftIcon from '@pingux/mdi-react/ChevronLeftIcon';
import ChevronRightIcon from '@pingux/mdi-react/ChevronRightIcon';
import { useDateFormatter } from '@react-aria/i18n';
import { VisuallyHidden } from '@react-aria/visually-hidden';

import { useGetTheme } from '../../hooks';
import { Box, Icon, IconButton, Text } from '../../index';
import { RangeCalendarHeaderProps } from '../../types';

const RangeCalendarHeader: React.FC<RangeCalendarHeaderProps> = props => {
  const {
    state,
    calendarProps,
    prevButtonProps,
    nextButtonProps,
  } = props;
  const monthDateFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    timeZone: state.timeZone,
  });

  // to remove warning for unknown event handler property `onFocusChange`.
  delete prevButtonProps.onFocusChange;
  // Removes warning without Safari losing Spectrum’s focus management
  const { onFocusChange, ...otherNextButtonProps } = nextButtonProps;

  /* istanbul ignore next */
  const nextButtonFocusProps = {
    onFocus: () => onFocusChange?.(true),
    onBlur: () => onFocusChange?.(false),
  };

  const { calendarIconSize } = useGetTheme();

  return (
    <Box variant="rangeCalendar.calendarHeaderContainer" isRow>
      <VisuallyHidden aria-live="assertive">
        <Text>{calendarProps['aria-label']}</Text>
      </VisuallyHidden>
      <Box isRow variant="rangeCalendar.calendarHeader" color="magenta">
        <Box
          style={{ position: 'absolute', left: '10px' }}
        >
          <IconButton
            {...prevButtonProps}
            aria-label="Previous month navigation"
            color="pink"
          >
            <Icon icon={ChevronLeftIcon} size={calendarIconSize} title={{ name: 'Chevron Left Icon' }} />
          </IconButton>
        </Box>
        <Text
          aria-hidden
          variant="itemTitle"
          role="heading"
          aria-level={3}
          fontWeight={3}
        >
          {monthDateFormatter.format(
            state.visibleRange.start.toDate(state.timeZone),
          )}
        </Text>
      </Box>
      <Box isRow variant="rangeCalendar.calendarHeader">
        <Text
          aria-hidden
          variant="itemTitle"
          role="heading"
          aria-level={3}
          fontWeight={3}
        >
          {monthDateFormatter.format(
            state.visibleRange.start.add({ months: 1 }).toDate(state.timeZone),
          )}
        </Text>
        <Box
          style={{ position: 'absolute', right: '10px' }}
        >
          <IconButton
            {...otherNextButtonProps}
            {...nextButtonFocusProps}
            aria-label="Next month navigation"
          >
            <Icon icon={ChevronRightIcon} size={calendarIconSize} title={{ name: 'Chevron Right Icon' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default RangeCalendarHeader;
