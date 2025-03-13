const nextGenConvertedComponents = [
  'DataTable',
  'Message',
  'Button',
  'Badge',
  'IconButton',
  'CheckboxField',
  'Messages',
  'PopoverMenu',
  'TextField',
  'PasswordField',
  'SearchField',
  'SelectField',
  'Modal',
  'RadioField',
  'MultiValuesField',
  'TextAreaField',
  'RadioGroupField',
  'Tabs',
  'ProgressBar',
  'NavBar',
  'OverlayPanel',
  'AstroProvider',
  'ListView',
  'NavigationHeader',
  'Avatar',
  'MultivaluesField',
  'Text',
  'Link',
  'Card',
  'IconWrapper',
  'ComboBoxField',
  'CodeView',
  'Sticker Sheet',
  'NextGen ListViewItem',
  'Skeleton',
];

export const componentSpecificNextGenBlacklist = {
  AstroProvider: [
    'Default',
    'With Custom Theme Override',
  ],
  Badge: [
    'Status Badge Variants',
    'Badge With Left Slot And Icon',
    'Callout Badges',
    'Removable',
  ],
  Button: [
    'Color Block Button',
    'Text Icon Button',
  ],
  Messages: [
    'Customization',
  ],
  MultivaluesField: [
    'Condensed',
    'Condensed With Section',
  ],
  PasswordField: [
    'Success',
  ],
  TextField: [
    'Success',
  ],
  OverlayPanel: [
    'Expandable',
  ],
};

export const nextGenOnlyComponents = ['NavigationHeader', 'Prompt', 'AI Panel', 'Response', 'Suggestions', 'Prompt Input'];

export default nextGenConvertedComponents;
