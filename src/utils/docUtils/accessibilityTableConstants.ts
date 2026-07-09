export const KeyboardRows = {
  shiftTabFocusPrevious: {
    key: 'Shift + Tab',
    description: 'Moves focus to the previous focusable component.',
  },
  tabField: {
    key: 'Tab',
    description: 'The field is focusable using the Tab key and follows the page tab sequence.',
  },
  tabFocusesField: {
    key: 'Tab',
    description: 'Focuses the field and follows the page tab sequence.',
  },
  spaceEnterSelectsButton: {
    key: 'Space or Enter',
    description: 'Selects the button.',
  },
  tabFocusesButton: {
    key: 'Tab',
    description: 'Focuses the button and follows the page tab sequence.',
  },
  homeFirstListboxItem: {
    key: 'Home(Fn + Right Arrow Key) Or Control/Command + Home',
    description: 'Shifts the focus to the first item in the listbox.',
  },
  endLastListboxItem: {
    key: 'End(Fn + Left Arrow Key) Or Control/Command + End',
    description: 'Shifts the focus to the last item in the listbox.',
  },
  tabNextFocusableComponent: {
    key: 'Tab',
    description: 'Moves focus to the next focusable component and follows the page tab sequence.',
  },
  tabFocusesItem: {
    key: 'Tab',
    description: 'Focuses item and follows the page tab sequence.',
  },
  tabAccordionFocusable: {
    key: 'Tab',
    description: 'Moves focus to the next focusable component. All focusable components in the accordion are included in the page tab sequence.',
  },
  shiftTabAccordionFocusPrevious: {
    key: 'Shift + Tab',
    description: 'Moves focus to the previous focusable component. All focusable components in the accordion are included in the page tab sequence.',
  },
  spaceEnterToggleAccordion: {
    key: 'Space or Enter',
    description: 'Toggles the component when the accordion is focused.',
  },
  escCollapseAccordion: {
    key: 'Esc',
    description: 'Pressing the escape key when the accordion is open and focused collapses the component.',
  },
  tabCalendar: {
    key: 'Tab',
    description: 'Components in the calendar are focusable and follow the page tab sequence.',
  },
  homeFirstCalendarDate: {
    key: 'Pressing Home:(Fn + Right Arrow Key) Or Control or Command + Home',
    description: 'Shifts the focus to the first calendar date.',
  },
  pageUpPreviousMonth: {
    key: 'Page up',
    description: 'Changes the grid of dates to the previous month.',
  },
  pageDownNextMonth: {
    key: 'Page down',
    description: 'Changes the grid of dates to the next month.',
  },
  shiftPageUpPreviousYear: {
    key: 'Shift + page up',
    description: 'Changes the grid of dates to the same month in the previous year.',
  },
  shiftPageDownNextYear: {
    key: 'Shift + page down',
    description: 'Changes the grid of dates to the same month in the next year.',
  },
  spaceEnterSelectsComponent: {
    key: 'Space or Enter',
    description: 'Selects the component when it is focused.',
  },
  typingOpenPopover: {
    key: 'Typing in input field',
    description: 'Adds focus to it and opens the popover.',
  },
  spaceEnterSelectsItem: {
    key: 'Space or Enter',
    description: 'Selects the item.',
  },
  spaceEnterSelectsComponentSimple: {
    key: 'Space or Enter',
    description: 'Selects the component.',
  },
  tabFocusesComponent: {
    key: 'Tab',
    description: 'Focuses the component and follows the page tab sequence.',
  },
  tabInput: {
    key: 'Tab',
    description: 'The input is focusable using the Tab key and follows the page tab sequence.',
  },
  homeFirstRow: {
    key: 'Home(Fn + Right Arrow Key) Or Control/Command + Home',
    description: 'Shifts the focus to the first row.',
  },
  endLastVisibleRow: {
    key: 'End(Fn + Left Arrow Key) Or Control/Command + End',
    description: 'Shifts the focus to the last visible row.',
  },
  arrowKeysMovePopoverSelection: {
    key: 'Arrow keys',
    description: 'Moves the selection through the popover.',
  },
  escClosePopoverFocusPrevious: {
    key: 'Esc',
    description: 'Pressing the escape key closes the popover and focuses on the previous focusable component.',
  },
} as const;

export const ScreenReaderRows = {
  ariaLabelAccessibleName: 'The **`aria-label`** attribute is used to provide an accessible name.',
  eachLinkAriaLabel: 'Each Link component uses the **`aria-label`** attribute to provide an accessible name.',
  ariaLiveAnnounce: 'The **`aria-live`** attribute is used to announce content changes in a live region.',
  ariaOrientationWithTrailingSpace: 'The **`aria-orientation`** attribute indicates whether the orientation is horizontal, vertical, unknown, or ambiguous. ',
  accordionAriaExpanded: 'The accordion header button uses the **`aria-expanded`** attribute to indicate when the content expands and collapses.',
  iconAriaHidden: 'The Icon uses the **`aria-hidden`** attribute to hide its content from assistive technology.',
  triggerAriaExpandedExpandCollapse: 'The trigger button uses the **`aria-expanded`** attribute to indicate when the content expands and collapses.',
  ariaLabelledByInvalidFalse: 'This component uses the **`aria-labelledby`** attribute pointing to the label, and the **`aria-invalid`** attribute to detect incorrect values or status errors, which is set to "False" by default.',
  ariaOrientationNoTrailingSpace: 'The **`aria-orientation`** attribute indicates whether the orientation is horizontal, vertical, unknown, or ambiguous.',
  componentAriaLabel: 'This component uses the **`aria-label`** attribute to provide an accessible name.',
} as const;
