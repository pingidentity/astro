import React from 'react';
import AccountIcon from '@pingux/mdi-react/AccountIcon';
import FormSelectIcon from '@pingux/mdi-react/FormSelectIcon';

import { CheckboxField } from '../index';
import UserImage from '../utils/devUtils/assets/UserImage.png';

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

export const personalData = {
  contactInfo: {
    label: 'Contact Info',
    key: 'contactInfoKey',
    fields: [
      { label: 'Email', value: 'ednepomuceno@pingidentity.com', isVerified: true },
      { label: 'Primary', value: '+1 767-777-3333' },
      { label: 'Address', value: '1234 W California St, Denver CO 80101' },
    ],
  },
  personalInfo: {
    label: 'Personal Info',
    key: 'personalInfoKey',
    image: UserImage,
    fields: [
      { label: 'Given Name', value: 'Ed' },
      { label: 'Famile Name', value: 'Nepomuceno' },
    ],
  },
  companyInfo: {
    label: 'Company Info',
    key: 'companyInfoKey',
    fields: [
      { label: 'Tile', value: 'Interaction Designer' },
    ],
  },
  customAttributes: {
    label: 'Custom Attributes',
    key: 'customAttributesKey',
    fields: [
      { label: 'T-Shirt Size', value: 'Large' },
      { label: 'Example Multi-Value Attribute', value: 'value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,value,' },
    ],
  },
  jsonAttributes: {
    label: 'JSON Attributes',
    key: 'jsonAttributesKey',
    badges: ['Address', 'Contact', 'Another Json'],
    fields: [],
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
