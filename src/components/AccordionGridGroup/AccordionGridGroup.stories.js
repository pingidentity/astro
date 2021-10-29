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

export const Default = () => {
  const [selectedKeys, setselectedKeys] = useState([]);

  const Header = (props) => {
    const { item } = props;

    return (
      <Box isRow sx={{ pt: '12px', pb: '12px', flexGrow: 1 }} >
        <Box isRow alignSelf="center" sx={{ flexGrow: 1, width: '50%' }}>
          <Text sx={{ fontWeight: 3, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} variant="itemTitle" alignSelf="center">{item.name}</Text>
        </Box>
        <Box isRow alignSelf="center" sx={{ flexGrow: 1, width: '50%' }} >
          <Text sx={{ fontWeight: 0, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }} alignSelf="center">{item.organizations.length} Organizations</Text>
          <Box isRow alignSelf="center" sx={{ ml: 'auto' }}>
            <IconButton aria-label="create-icon" sx={{ mr: '4px', height: '26px', width: '26px', 'path': { fill: 'active' } }} >
              <CreateIcon />
            </IconButton>
            <IconButton aria-label="vertical-lines-icon" sx={{ mr: '4px', height: '26px', width: '26px', 'path': { fill: 'active' } }} >
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
      <Box isRow >
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

  return (
  // const data = [
  //   {
  //     name: 'Client Application Developer',
  //     key: '1',
  //     organizations: [
  //       {
  //         name: 'Montana (Environment)',
  //         populations: [
  //           'Administrators (Population)',
  //           'Other Population (Population)',
  //         ],
  //       },
  //       {
  //         name: 'Boston (Environment)',
  //         populations: [
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Environment Admin',
  //     key: '2',
  //     organizations: [
  //       {
  //         name: 'Montana (Environment)',
  //         populations: [
  //           'Administrators (Population)',
  //           'Other Population (Population)',
  //         ],
  //       },
  //       {
  //         name: 'Boston (Environment)',
  //         populations: [
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     name: 'Organization Admin',
  //     key: '3',
  //     organizations: [
  //       {
  //         name: 'Montana (Environment)',
  //         populations: [
  //           'Administrators (Population)',
  //           'Other Population (Population)',
  //         ],
  //       },
  //       {
  //         name: 'Boston (Environment)',
  //         populations: [
  //         ],
  //       },
  //     ],
  //   },
  // ];
    <>
      <Text sx={{ fontWeight: 3, fontSize: '13px' }} >
        Role
      </Text>
      <Separator sx={{ mb: 0 }} />
      <AccordionGridGroup
        items={data}
        selectedKeys={selectedKeys}
        onSelectionChange={setselectedKeys}
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
                <Separator sx={{ m: 0 }} /> :
                null
            }
          </Item>
        )}
      </AccordionGridGroup>
    </>
  );
};
