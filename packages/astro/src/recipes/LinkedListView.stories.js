import React, { useState } from 'react';
import DotsVerticalIcon from 'mdi-react/DotsVerticalIcon';

import {
  Badge,
  Box,
  Icon,
  IconButton,
  Item,
  ListView,
  Menu,
  OverlayProvider,
  PopoverMenu,
  Separator,
  Text,
} from '../index';

export default {
  title: 'Recipes/LinkedListView',
  argTypes: {
    loadingState: {
      control: {
        type: 'select',
      },
    },
    disabledKeys: {
      defaultValue: [],
    },
    items: {
      control: {
        type: 'none',
      },
    },
    onSelectionChange: {
      control: 'none',
      // eslint-disable-next-line no-console
      defaultValue: console.log,
    },
  },
};

const testData = [
  {
    key: 'Default Risk Policy',
    name: 'Default Risk Policy',
    policyId: 'sdfasdfasdf-124123asdf',
    id: '1',
    hasSeparator: false,
    hasInsetSeparator: true,
    chipText: 'default',
    expirationText: 'Expiring On: 2022-12-08',
    childrenObjects: [
      {
        key: 'Staging Policy',
        name: 'Staging Policy',
        policyId: '23423sdfsdf-124123asdf',
        id: '4',
        expirationText: 'Expiring On: 2022-12-08',
        hasSeparator: true,
      },
    ],
  },
  {
    key: 'Policy4',
    name: 'Policy4',
    policyId: '9234890324k-124123asdf',
    chipText: 'default',
    id: '2',
    hasSeparator: true,
  },
  {
    key: 'Policy5',
    name: 'Policy5',
    policyId: 'asdf23zaa-124123asdf',
    id: '3',
  },
];

// IMPORTANT PLEASE READ
// in order for the list portion of this recipe to function correctly,
// the array of objects that will be used to create
// the production and staging rows, will need to be flat and sorted.
// I.e. the staging rows will need to immediately follow the prod row that they correspond to.
// This flat, sorted array will then be passed into the listview component as the items prop.
// You may not need these functions if you are able to change the data shape on the back end
// (which is recommended for performance reasons)

const flattenArray = array => {
  const newArray = array;
  newArray.forEach(item => {
    if (item.childrenObjects) {
      item.childrenObjects.forEach(obj => {
        const newObj = obj;
        newObj.parentId = item.id;
        newArray.push(newObj);
      });
    }
  });
  return newArray;
};

const testSort = array => {
  const newArray = array;
  newArray.forEach((item, i) => {
    if (item.parentId) {
      const thisindex = newArray.findIndex(object => {
        return object.id === item.parentId;
      });
      const element = newArray.splice(i, 1)[0];
      newArray.splice(thisindex + 1, 0, element);
    }
  });
  return newArray;
};
const unsorted = flattenArray(testData);
const sorted = testSort(unsorted);

export const Default = ({ ...args }) => {
  const [theseItems] = useState([...sorted]);

  // svg of the bottom portion of the bracket, the portion with the L shaped hook.
  const BottomBracket = () => {
    const color = '#CACED3';
    return (
      <Box sx={{ width: '20px', position: 'relative' }}>
        <Box flexBasis="50%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            viewBox="0 0 10 10"
            style={{ flexGrow: 1 }}
          >
            <title>bracket-fill</title>
            <g>
              <title>Layer 1</title>
              <line
                strokeLinecap="undefined"
                strokeLinejoin="undefined"
                y2="0"
                x2="0"
                y1="15"
                x1="0"
                stroke={color}
                fill="none"
              />
            </g>
          </svg>
          <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1900_8817)">
              <g mask="url(#mask0_1900_8817)">
                <rect x="0.5" y="-54.5" width="20" height="63" rx="4.5" stroke="#CACED3" />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1900_8817">
                <rect width="1600" height="917" fill="white" transform="translate(-280 -419)" />
              </clipPath>
            </defs>
          </svg>
        </Box>
      </Box>
    );
  };

  // the top portion of the bracket svg, this is basically just a straight vertical line.
  const TopBracket = () => {
    const color = '#CACED3';
    return (
      <Box width={15} sx={{ position: 'absolute', bottom: 0, left: 12, top: 55 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
          viewBox="0 0 10 10"
          style={{ flexGrow: 1 }}
          data-testid="isLastLayer"
        >
          <title>bracket-fill</title>
          <g>
            <title>Layer 3</title>
            <line
              strokeLinecap="undefined"
              strokeLinejoin="undefined"
              y2="0"
              x2="0"
              y1="10"
              x1="0"
              stroke={color}
              fill="none"
            />
          </g>
        </svg>
      </Box>
    );
  };

  // the vector shield and key icon.
  const ShieldVector = props => {
    return (
      <svg width="19" height="23" viewBox="0 0 19 23" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M9.5 7.33342C9.77627 7.33342 10.0412 7.44316 10.2366 7.63851C10.4319 7.83386 10.5417 8.09881 10.5417 8.37508C10.5417 8.65135 10.4319 8.9163 10.2366 9.11165C10.0412 9.307 9.77627 9.41675 9.5 9.41675C9.22373 9.41675 8.95878 9.307 8.76343 9.11165C8.56808 8.9163 8.45833 8.65135 8.45833 8.37508C8.45833 8.09881 8.56808 7.83386 8.76343 7.63851C8.95878 7.44316 9.22373 7.33342 9.5 7.33342ZM18.875 10.4584C18.875 16.2397 14.875 21.6459 9.5 22.9584C4.125 21.6459 0.125 16.2397 0.125 10.4584V4.20842L9.5 0.041748L18.875 4.20842V10.4584ZM9.5 5.25008C8.6712 5.25008 7.87634 5.57932 7.29029 6.16537C6.70424 6.75142 6.375 7.54628 6.375 8.37508C6.375 9.73967 7.23958 10.8959 8.45833 11.323V17.7501H10.5417V15.6667H12.625V13.5834H10.5417V11.323C11.7604 10.8959 12.625 9.73967 12.625 8.37508C12.625 7.54628 12.2958 6.75142 11.7097 6.16537C11.1237 5.57932 10.3288 5.25008 9.5 5.25008Z" />
      </svg>
    );
  };

  // reusable piece of code that handles the iconbutton and popover on the right side of the rows
  const IconWithPopover = () => {
    return (
      <PopoverMenu direction="left">
        <Box alignItems="center" alignSelf="center">
          <IconButton aria-label="Menu Button">
            <Icon icon={DotsVerticalIcon} size="xs" color="Neutral.40" m="0.61px" />
          </IconButton>
        </Box>
        <Menu
          direction="left"
          sx={{
            minWidth: '155px',
            minHeight: '144px',
          }}
        >
          <Item key="view">View</Item>
          <Item key="edit">Edit</Item>
          <Item key="rename">Rename</Item>
          <Item key="delete" textValue="delete">
            <Text color="critical.bright">Delete</Text>
          </Item>
        </Menu>
      </PopoverMenu>
    );
  };

  // made these separate components because staging and production both use them.
  const DefaultBadge = () => {
    return (
      <Badge
        label="Default"
        bg="active"
        sx={{
          marginLeft: '25px',
          alignSelf: 'center',
          alignItems: 'center',
          padding: '3px 5px 2px 5px',
        }}
      />
    );
  };

  const ExprirationBadge = props => {
    const {
      expirationText,
      chipText,
    } = props;

    return (
      <Box
        sx={!chipText && {
          paddingLeft: '72px',
        }}
        flexGrow={1}
        alignItems="center"
        alignSelf="center"
      >
        <Badge
          bg="white"
          sx={{
            border: 'solid 1px',
            borderColor: 'neutral.80',
            alignSelf: 'center',
            alignItems: 'center',
            padding: '3px 5px 2px 5px',
          }}
          textColor="text.primary"
          label={expirationText}
        />
      </Box>
    );
  };

  // jsx of the production row
  const Production = props => {
    const {
      chipText,
      hasStaging,
      policyId,
      name,
    } = props;

    return (
      <Box isRow height="75px">
        <Box alignItems="center" justifyContent="center" sx={{ position: 'relative' }}>
          <Icon
            icon={ShieldVector}
            color={hasStaging ? 'decorative.7' : 'accent.40'}
            size={24}
            isLinked={hasStaging}
          />
          {hasStaging && <TopBracket />}
        </Box>
        <Box isRow mr="auto" alignSelf="center" justifyContent="center" ml="18px" alignItems="center">
          <Box>
            <Text
              sx={{
                fontWeight: 1,
                color: 'text.primary',
                fontSize: 'md',
              }}
            >
              {name}
            </Text>
            <Text
              sx={{
                fontWeight: 0,
                color: 'text.secondary',
                fontSize: 'sm',
              }}
            >
              Policy Id:
              {' '}
              {policyId}
            </Text>
          </Box>
          {
            chipText
            && <DefaultBadge />
          }
        </Box>
        <IconWithPopover />
      </Box>
    );
  };

  // jsx of the staging row.
  const Staging = props => {
    const {
      chipText,
      expirationText,
      policyId,
      name,
    } = props;

    return (
      <Box
        isRow
        height="75px"
        marginLeft="12px"
      >
        <BottomBracket />
        <Box isRow alignItems="center" justifyContent="center">
          <Box pl="0px" height="30px" flexDirection="row" alignItems="center">
            <Separator
              orientation="vertical"
              sx={{
                width: '2px !important',
                backgroundColor: 'decorative.7',
                marginLeft: '2px !important',
              }}
            />
          </Box>
          <Box>
            <Text
              sx={{
                fontWeight: 1,
                color: 'text.primary',
                fontSize: 'md',
              }}
            >
              {name}
            </Text>
            <Text
              sx={{
                fontWeight: 0,
                color: 'text.secondary',
                fontSize: 'sm',
              }}
            >
              Policy Id:
              {' '}
              {policyId}
            </Text>
          </Box>
        </Box>
        {
          chipText
          && <DefaultBadge />
        }
        {
          expirationText
          && <ExprirationBadge expirationText={expirationText} />
        }
        <IconWithPopover />
      </Box>
    );
  };

  return (
    <OverlayProvider>
      <ListView {...args} items={theseItems}>
        {item => (
          <Item
            {...item}
            textValue={item.name}
            data-id={item.key}
            listItemProps={{
              minHeight: '75px',
              sx: {
                '&.has-inset-separator': {
                  '&:before': {
                    content: '""',
                    position: 'absolute',
                    width: 'calc(100% - 43px)',
                    right: 0,
                    bottom: 0,
                    borderBottom: '1px solid',
                    borderBottomColor: 'line.light',
                  },
                },
              },
            }}
          >
            {
              item.parentId
                ? <Staging {...item} hasInsetSeparator />
                : <Production hasStaging={item.childrenObjects} {...item} />
            }
          </Item>
        )}
      </ListView>
    </OverlayProvider>
  );
};
