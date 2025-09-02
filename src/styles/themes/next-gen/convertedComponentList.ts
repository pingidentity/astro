const nextGenConvertedComponents = [
  'GridList',
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
  'RockerButtonGroup',
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
  'TooltipTrigger',
  'ListViewItem',
  'Pagination',
  'StatusIcon',
  'Callout',
  'Table',
  'TableBase',
  'ArrayField',
  'ColorField',
  'LinkSelectField',
  'NumberField',
  'SwitchField',
  'Base Components',
  'SliderField',
];

export const componentSpecificNextGenBlacklist = {
  AstroProvider: [
    'Default',
    'With Custom Theme Override',
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
  DataTable: [
    'Default',
  ],
};

export const astroBlacklistStory = {
  DataTable: [
    'Onyx Default',
  ],
  NavBar: [
    'Onyx Default',
  ],
  SearchField: [
    'Onyx With Filter',
  ],
  Callout: [
    'Customizations',
  ],
  StatusIcon: [
    'Default',
    'In Rocker Button',
  ],
};

export const nextGenOnlyComponents = [
  'NavigationHeader',
  'Prompt',
  'AI Panel',
  'Response',
  'Suggestions',
  'Prompt Input',
  'Footer',
];

export default nextGenConvertedComponents;
