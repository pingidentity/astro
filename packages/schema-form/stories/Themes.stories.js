import React from 'react';
import _ from 'lodash';
import Form from '../src/components/SchemaForm';
import endUserTheme from '../../../shared/themes/end-user/endUserTheme';

/**
 * Basic flexbox-based layout component for creating rows and columns,
 * while controlling sizes and spacing.
 * Accepts most of the styling props from [styled-system](https://styled-system.com/table).
 * Built on top of the [Box from Theme-UI](https://theme-ui.com/components/box/).
 */
const schema = {
  title: 'Example Title',
  type: 'object',
  properties: {
    password: {
      type: 'string',
    },
    additionalInformation: {
      type: 'string',
    },
    country: {
      type: 'string',
    },
    emailAddress: {
      type: 'string',
      format: 'email',
    },
    firstName: {
      type: 'string',
    },
    interacted: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
      },
      uniqueItems: true,
    },
    lastName: {
      type: 'string',
    },
    requestType: {
      type: 'string',
    },
    state: {
      type: 'string',
    },
    iAmAn: {
      type: 'string',
    },
    acceptTermsAndConditions: {
      type: 'boolean',
    },
  },
  required: [
    'country',
    'emailAddress',
    'firstName',
    'interacted',
    'lastName',
    'requestType',
    'iAmAn',
    'acceptTermsAndConditions',
  ],
  $schema: 'http://json-schema.org/draft-04/schema#',
};

const iAmAn = ['Custom', 'Prospect', 'Employee (Former, current, prospective)'];
const requestTypes = ['General Privacy Inquiry', 'Restrict Processing', 'Data Deletion', 'Data Portability', 'Data Rectification', 'Data Access'];
const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
const countries = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas (the)', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia (Plurinational State of)', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory (the)', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia', 'Cameroon', 'Canada', 'Cayman Islands (the)', 'Central African Republic (the)', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands (the)', 'Colombia', 'Comoros (the)', 'Congo (the Democratic Republic of the)', 'Congo (the)', 'Cook Islands (the)', 'Costa Rica', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czechia', "Côte d'Ivoire", 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic (the)', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Falkland Islands (the) [Malvinas]', 'Faroe Islands (the)', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories (the)', 'Gabon', 'Gambia (the)', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (the)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran (Islamic Republic of)', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', "Korea (the Democratic People's Republic of)", 'Korea (the Republic of)', 'Kuwait', 'Kyrgyzstan', "Lao People's Democratic Republic (the)", 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands (the)', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia (Federated States of)', 'Moldova (the Republic of)', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands (the)', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger (the)', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands (the)', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine, State of', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines (the)', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Republic of North Macedonia', 'Romania', 'Russian Federation (the)', 'Rwanda', 'Réunion', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan (the)', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan (Province of China)', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands (the)', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates (the)', 'United Kingdom of Great Britain and Northern Ireland (the)', 'United States Minor Outlying Islands (the)', 'United States of America (the)', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela (Bolivarian Republic of)', 'Viet Nam', 'Virgin Islands (British)', 'Virgin Islands (U.S.)', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe', 'Åland Islands'];
const interactions = ['Visiting and interacting with Ping Identity\'s website', 'Employment opportunities with Ping Identity', 'Receiving emails or outreach from Ping Identity', 'Use of Ping Identity\'s products (this most often arises if you work for a company that uses Ping Identity\'s products, or are a customer or consumer of one of Ping Identity\'s customers).', 'Other'];

schema.properties.iAmAn.enum = iAmAn;
schema.properties.requestType.enum = requestTypes;
schema.properties.state.enum = states;
schema.properties.country.enum = countries;
schema.properties.interacted.items.enum = interactions;

const uischema = {
  'ui:order': [
    'password',
    'div',
    'iAmAn',
    'requestType',
    'interacted',
    'additionalInformation',
    'firstName',
    'lastName',
    'emailAddress',
    'state',
    'country',
    'acceptTermsAndConditions',
  ],
  _form: {
    'ui:options': {
      hasMarkdownErrors: true,
    },
  },
  password: {
    'ui:widget': 'passwordWithRequirements',
    'ui:options': {
      label: 'Password',
      requirementsTitle: 'Minimum Password Requirements',
      requirementsData: [
        { name: 'requirement A', status: 'yes' },
        { name: 'requirement B', status: 'no' },
        { name: 'requirement C', status: 'error' },
      ],
    },
    'ui:help': 'Passwords must be of the type blah blah blah',
  },
  iAmAn: {
    'ui:options': {
      label: 'I am a(n)',
    },
  },
  additionalInformation: {
    'ui:options': {
      label: 'Additional Information',
      resize: false,
    },
    'ui:widget': 'textarea',
  },
  country: {
    'ui:options': {
      label: 'Country',
    },
  },
  emailAddress: {
    'ui:options': {
      label: 'Email Address',
    },
  },
  firstName: {
    'ui:options': {
      label: 'First Name',
    },
  },
  interacted: {
    'ui:widget': 'checkboxes',
    'ui:options': {
      label: 'How did you hear about Ping?',
    },
  },
  lastName: {
    'ui:options': {
      label: 'Last Name',
    },
    'ui:widget': 'password',
  },
  requestType: {
    'ui:options': {
      label: 'Request Type',
    },
  },
  state: {
    'ui:options': {
      label: 'Choose a State',
    },
  },
  acceptTermsAndConditions: {
    'ui:options': {
      hasMarkdownErrors: true,
      hasMarkdownLabel: true,
      label: 'I accept the Terms and Conditions as outlined in [blah](https://google.com)',
    },
  },
};

const formData = {
  interacted: ['Other'],
  acceptTermsAndConditions: false,
};
const rules = [
  {
    conditions: {
      country: {
        not: {
          is: 'United States of America (the)',
        },
      },
    },
    event: {
      type: 'remove',
      params: {
        field: 'state',
      },
    },
  },
  {
    conditions: {
      country: {
        is: 'United States of America (the)',
      },
    },
    event: {
      type: 'require',
      params: {
        field: 'state',
      },
    },
  },
  {
    conditions: {
      interacted: {
        not: {
          contains: 'Other',
        },
      },
    },
    event: {
      type: 'remove',
      params: {
        field: 'additionalInformation',
      },
    },
  },
  {
    conditions: {
      interacted: {
        contains: 'Other',
      },
    },
    event: {
      type: 'require',
      params: {
        field: 'additionalInformation',
      },
    },
  },
];

export default {
  title: 'Usage/Theming',
  component: Form,
  argTypes: {
    theme: {
      control: {
        type: 'text',
      },
    },
    children: {
      control: {
        type: 'none',
      },
    },
    endpoint: {
      control: {
        type: 'none',
      },
    },
    extraActions: {
      control: {
        type: 'none',
      },
    },
    extraErrors: {
      control: {
        type: 'none',
      },
    },
    fields: {
      control: {
        type: 'none',
      },
    },
    fieldTemplate: {
      control: {
        type: 'none',
      },
    },
    formData: {
      control: {
        type: 'none',
      },
    },
    formSuccessMessage: {
      control: {
        type: 'none',
      },
    },
    formSuccessTitle: {
      control: {
        type: 'none',
      },
    },
    liveValidate: {
      control: {
        type: 'none',
      },
    },
    mode: {
      control: {
        type: 'none',
      },
    },
    rules: {
      control: {
        type: 'none',
      },
    },
    schema: {
      control: {
        type: 'none',
      },
    },
    sitekey: {
      control: {
        type: 'none',
      },
    },
    submitText: {
      control: {
        type: 'none',
      },
    },
    uiSchema: {
      control: {
        type: 'none',
      },
    },
    widgets: {
      control: {
        type: 'none',
      },
    },
  },
};

export const Themes = ({ ...args }) => (
  <Form
    theme={args.theme}
    formData={formData}
    rules={rules}
    schema={('Schema', schema)}
    uiSchema={('uiSchema', uischema)}
  />
);

export const CustomTheme = () => {
  const customTheme = _.cloneDeep(endUserTheme);

  customTheme.name = 'Custom Theme';
  customTheme.fonts = { standard: '"Comic Sans MS", "helvetica"' };

  return (
    <Form
      theme={customTheme}
      formData={formData}
      rules={rules}
      schema={('Schema', schema)}
      uiSchema={('uiSchema', uischema)}
    />
  );
};
CustomTheme.parameters = {
  docs: {
    description: {
      story: 'Custom themes can be applied by passing a theme object. If no object is passed the theme will automatically default to "astro". Currently there are two pre-built themes, astro and end-user. Below is an example of a custom theme using end-user as a template, all fonts have been changed to the much loved comic sans.\n\nAstro template can be found under pingux/packages/astro/src/styles/theme and End User theme can be found at pingux/packages/shared/themes/end-user/endUserTheme.js.',
    },
  },
};
