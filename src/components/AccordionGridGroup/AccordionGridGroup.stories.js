import React, { useState } from 'react';
import { Item } from '@react-stately/collections';


import CreateIcon from 'mdi-react/CreateIcon';
import MoreVertIcon from 'mdi-react/MoreVertIcon';
import {
  Box,
  IconButton,
  Text,
  Separator,
  Link,
  TextField,
} from '../../index';
import AccordionGridGroup from './AccordionGridGroup';

const data = [
  {
    name: 'Client Application Developer',
    key: 'Client',
    organizations: [
      {
        name: 'Montana (Environment)',
        populations: [
          'Administrators (Population)',
          'Other Population (Population)',
        ],
      },
      {
        name: 'Boston (Environment)',
        populations: [
        ],
      },
    ],
  },
  {
    name: 'Environment Admin',
    key: 'Environment',
    organizations: [
      {
        name: 'Montana (Environment)',
        populations: [
          'Administrators (Population)',
          'Other Population (Population)',
        ],
      },
      {
        name: 'Boston (Environment)',
        populations: [
        ],
      },
    ],
  },
  {
    name: 'Organization Admin',
    key: 'Organization',
    organizations: [
      {
        name: 'Montana (Environment)',
        populations: [
          'Administrators (Population)',
          'Other Population (Population)',
        ],
      },
      {
        name: 'Boston (Environment)',
        populations: [
        ],
      },
    ],
  },
];

export default {
  title: 'Accordion Grid',
  component: AccordionGridGroup,
  parameters: {
    actions: {
      argTypesRegex: '^on.*',
    },
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  argTypes: {
    id: {
      control: {
        type: 'text',
      },
    },
    disabledKeys: {
      description: 'The item keys that are disabled. These items cannot be selected, focused, or otherwise interacted with. Array of keys.',
    },
    selectedKeys: {
      control: {
        type: 'none',
      },
    },
    items: {
      control: {
        type: 'none',
      },
    },
  },
};

const Header = (props) => {
  const { item } = props;

  return (
    <Box isRow sx={{ flexGrow: 1 }} >
      <Box isRow alignSelf="center" sx={{ flexGrow: 1, width: '50%' }}>
        <Text sx={{ fontWeight: 3, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} variant="itemTitle" alignSelf="center">{item.name}</Text>
      </Box>
      <Box isRow alignSelf="center" sx={{ flexGrow: 1, width: '50%' }} >
        <Text sx={{ fontWeight: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} alignSelf="center">{item.organizations.length} Organizations</Text>
        <Box isRow alignSelf="center" sx={{ ml: 'auto' }}>
          <IconButton aria-label="create-icon" sx={{ mr: '4px', height: '26px', width: '26px' }} >
            <CreateIcon />
          </IconButton>
          <IconButton aria-label="vertical-lines-icon" sx={{ mr: '4px', height: '26px', width: '26px' }} >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

const Body = (props) => {
  const { item } = props;
  return (
    <Box isRow>
      <Box sx={{ flexGrow: 1, width: 'calc(50% - 20px)' }}>
        <Link
          aria-label="permissions"
          variant="link"
          sx={{ marginTop: '15px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textDecoration: 'none' }}
          href="https://www.pingidentity.com"
          target="_blank"
        >
          View permissions
        </Link>
      </Box>
      <Box sx={{ flexGrow: 1, width: '50%' }} >
        {item.organizations.map(org => (
          <Box key={`box${org.name}`} sx={{ marginTop: '15px', mb: '15px' }} >
            <Text sx={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} key={`text${org.name}`} >{org.name}</Text>
            {org.populations.map(pop => (
              <Text key={pop} sx={{ marginLeft: 'md', mt: '10px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} >{pop})</Text>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export const Default = () => (
  // See story source for info about the data used
  <>
    <Text sx={{ fontWeight: 3, fontSize: '13px' }} >
      Role
    </Text>
    <Separator sx={{ mb: 0 }} />
    <AccordionGridGroup
      items={data}
      defaultSelectedKeys={['Environment']}
    >
      {item => (
        <Item
          key={item.key}
          textValue={item.name}
        >
          <Header item={item} />
          <Body item={item} />
          {/* Code that removes the seperator
            from the last item */}
          {
              item.key !== 'Organization' ?
                <Separator sx={{ m: 0, bg: 'neutral.90' }} /> :
                null
            }
        </Item>
        )}
    </AccordionGridGroup>
  </>
);

export const Controlled = () => {
  const [selectedKeys, setSelectedKeys] = useState(['Client']);

  return (
  // See story source for info about the data used
    <>
      <Text sx={{ fontWeight: 3, fontSize: '13px' }} >
        Role
      </Text>
      <Separator sx={{ mb: 0 }} />
      <AccordionGridGroup
        items={data}
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        {item => (
          <Item
            key={item.key}
            textValue={item.name}
          >
            <Header item={item} />
            <Body item={item} />
            {/* Code that removes the seperator
            from the last item */}
            {
              item.key !== 'Organization' ?
                <Separator sx={{ m: 0, bg: 'neutral.90' }} /> :
                null
            }
          </Item>
        )}
      </AccordionGridGroup>
    </>
  );
};


// const items = [
//   { id: 1, name: "Aardvark", key: "Aardvark" },
//   { id: 2, name: "Kangaroo", key: "Kangaroo" },
//   { id: 3, name: "Snake", key: "Snake" },
//   { id: 4, name: "Frog", key: "Frog" },
//   { id: 5, name: "Seal", key: "Seal" },
//   { id: 6, name: "Orangutan", key: "Orangutan" },
//   { id: 7, name: "Shark", key: "Shark" }
// ];

// const data = [
//   {
//     name: "Client Application Developer",
//     key: "Client"
//   },
//   {
//     name: "Environment Admin",
//     key: "Environment"
//   },
//   {
//     name: "Organization Admin",
//     key: "Organization"
//   }
// ];

export const AccordionWithInputs = () => {
  return (
    <AccordionGridGroup items={data}>
      {item => (
        <Item key={item.key} textValue={item.name}>
          <Text
            sx={{
              fontWeight: 3,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
            }}
            variant="itemTitle"
            alignSelf="center"
          >
            {item.name}
          </Text>
          <Box gap="md">
            <TextField label="label 1" />
            <TextField label="label 2" />
            <TextField label="label 3" />
          </Box>
        </Item>
      )}
    </AccordionGridGroup>
  );
};
