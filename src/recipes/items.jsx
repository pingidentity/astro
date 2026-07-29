import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import { Box, CheckboxField, NoticeIcon, Pair, PairLabel, PairValue, Text, ValueTypes } from '../index';
import UserImage from '../utils/devUtils/assets/UserImage.png';
import statuses from '../utils/devUtils/constants/statuses';

const VerifiedValue = ({ value }) => (
  <Box isRow gap="md">
    <Text>{value}</Text>
    <Box isRow gap="xs">
      <NoticeIcon
        color="success.dark"
        status={statuses.SUCCESS}
        aria-label={`${statuses.SUCCESS}-icon`}
        size="xs"
      />
      <Text variant="listSubtitle" color="success.dark">Verified</Text>
    </Box>
  </Box>
);

export const items = [
  {
    email: 'dburkitt5@columbia.edu',
    firstName: 'Nicola',
    lastName: 'Burkitt',
    icon: AccountIcon,
  },
  {
    email: 'idixie2@elegantthemes.com',
    firstName: 'Cacilia',
    lastName: 'Dixie',
    icon: FormSelectIcon,
  },
  {
    email: 'dfowler0@rambler.ru',
    firstName: 'Stavro',
    lastName: 'Fowler',
    icon: AccountIcon,
  },
  {
    email: 'jgolde8@jimdo.com',
    firstName: 'Celisse',
    lastName: 'Golde',
    icon: FormSelectIcon,
  },
  {
    email: 'shearst9@answers.com',
    firstName: 'Jeth',
    lastName: 'Hearst',
    icon: AccountIcon,
  },
  {
    email: 'ajinaa@mapquest.com',
    firstName: 'Kaycee',
    lastName: 'Jina',
    icon: AccountIcon,
  },
  {
    email: 'vmalster4@biblegateway.com',
    firstName: 'Lorry',
    lastName: 'Malster',
    icon: AccountIcon,
  },
  {
    email: 'yphipp6@yellowpages.com',
    firstName: 'Stanley',
    lastName: 'Phipp',
    icon: AccountIcon,
  },
  {
    email: 'mskilbeck3@bbc.co.uk',
    firstName: 'Gradey',
    lastName: 'Skilbeck',
    icon: AccountIcon,
  },
  {
    email: 'dstebbing1@msu.edu',
    firstName: 'Marnia',
    lastName: 'Stebbing',
    icon: AccountIcon,
  },
  {
    email: 'lsterley7@lulu.com',
    firstName: 'Joshua',
    lastName: 'Sterley',
    icon: AccountIcon,
  },
  {
    email: 'luttleyb@hugedomains.com',
    firstName: 'Jarrod',
    lastName: 'Uttley',
    icon: AccountIcon,
  },
  {
    email: 'lidelc@yelp.com',
    firstName: 'Andromache',
    lastName: 'Idel',
    icon: AccountIcon,
  },
];

const H4Label = ({ children }) => (<PairLabel textProps={{ as: 'h3' }}>{children}</PairLabel>);
export const personalData = {
  contactInfo: {
    label: 'Contact Info',
    key: 'contactInfoKey',
    rows: (
      <>
        <Pair>
          <H4Label>Email</H4Label>
          <PairValue valueType={ValueTypes.ELEMENT}>
            <VerifiedValue value="ednepomuceno@pingidentity.com" />
          </PairValue>
        </Pair>
        <Pair>
          <H4Label>Primary</H4Label>
          <PairValue>+1 767-777-3333</PairValue>
        </Pair>
        <Pair>
          <H4Label>Address</H4Label>
          <PairValue>1234 W California St, Denver CO 80101</PairValue>
        </Pair>
      </>
    ),
  },
  personalInfo: {
    label: 'Personal Info',
    key: 'personalInfoKey',
    image: UserImage,
    givenName: 'Ed',
    familyName: 'Nepomuceno',
    rows: (
      <>
        <Pair>
          <H4Label>Given Name</H4Label>
          <PairValue>Ed</PairValue>
        </Pair>
        <Pair>
          <H4Label>Famile Name</H4Label>
          <PairValue>Nepomuceno</PairValue>
        </Pair>
      </>
    ),
  },
  companyInfo: {
    label: 'Company Info',
    key: 'companyInfoKey',
    rows: (
      <Pair>
        <H4Label>Tile</H4Label>
        <PairValue>Interaction Designer</PairValue>
      </Pair>
    ),
  },
  customAttributes: {
    label: 'Custom Attributes',
    key: 'customAttributesKey',
    rows: (
      <>
        <Pair>
          <H4Label>T-Shirt Size</H4Label>
          <PairValue>Large</PairValue>
        </Pair>
        <Pair>
          <H4Label>Example Multi-Value Attribute</H4Label>
          <PairValue>
            value,value,value,value,value,value,value,value,value,value,
            value,value,value,value,value,value,value,value,value,
          </PairValue>
        </Pair>
      </>
    ),
  },
  jsonAttributes: {
    label: 'JSON Attributes',
    key: 'jsonAttributesKey',
    badges: ['Address', 'Contact', 'Another Json'],
    rows: null,
  },
};

export const colorBlockButtons = [
  { text: 'Groups', subtext: '21', isConfigured: true },
  { text: 'Population', subtext: 'Denver', isConfigured: true },
  { text: 'MFA', subtext: 'Enabled', isConfigured: true },
  { text: 'Roles', subtext: '0' },
];

export const editData = {
  personalInfo: {
    label: 'Personal Info',
    key: 'personalInfoKey',
    image: UserImage,
    fields: [
      { label: 'Prefix', value: '' },
      { label: 'Given Name', value: 'Ed' },
      { label: 'Middle Name', value: '' },
      { label: 'Family Name', value: 'Nepomuceno' },
      { label: 'Suffix', value: '' },
      { label: 'Formatted', value: '' },
      { label: 'Nickname', value: '' },
    ],
  },
  contactInfo: {
    label: 'Contact Info',
    key: 'contactInfoKey',
    fields: [
      { label: 'Email', value: 'ednepomuceno@pingidentity.com', slot: <CheckboxField mt="xs" label="Require Email to be Verified" /> },
      { label: 'Phone Number', value: '123-456-7890' },
      { label: 'Street Address', value: '123 Example St' },
      { label: 'Country Code', value: '' },
      { label: 'Loality', value: '' },
      { label: 'Region', value: '' },
      { label: 'Zip Code', value: '12345' },
    ],
  },
  companyInfo: {
    label: 'Company Info',
    key: 'companyInfoKey',
    fields: [
      { label: 'Account ID', value: '' },
      { label: 'Type', value: '' },
      { label: 'Title', value: '' },
    ],
  },
};
