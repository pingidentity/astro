import React, { useRef, useState } from 'react';
import DotsVerticalIcon from '@pingux/mdi-react/DotsVerticalIcon';

import useOverlappingMenuHoverState from '../hooks/useOverlappingMenuHoverState';
import {
  Badge,
  Box,
  Icon,
  IconButton,
  Item,
  ListItem,
  ListView,
  Menu,
  PopoverMenu,
  Separator,
  Text,
} from '../index';

export default {
  title: 'Recipes/Linked List View',
  argTypes: {
    loadingState: {
      control: {
        type: 'select',
      },
    },
    disabledKeys: {},
    items: {
      control: {
        type: 'none',
      },
    },
    onSelectionChange: {
      control: 'none',
    },
  },
  args: {
    disabledKeys: [],
    // eslint-disable-next-line no-console
    onSelectionChange: console.log,
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
    badgeText: 'default',
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
    badgeText: 'default',
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

const sx = {
  badge: {
    alignItems: 'center',
    alignSelf: 'center',
    ml: 'lg',
    p: '3px 5px 2px 5px',
  },
  bottomBracket: {
    container: {
      ml: 12,
      top: -2,
      position: 'relative',
      maxWidth: 15,
    },
    separator: {
      backgroundColor: 'decorative.7',
      marginLeft: '2px !important',
      maxHeight: '30px',
      width: '2px !important',
    },
    separatorBox: {
      alignItems: 'center',
      flexDirection: 'row',
      minWidth: 9,
    },
  },
  expirationBadge: {
    alignItems: 'center',
    alignSelf: 'center',
    border: 'solid 1px',
    borderColor: 'neutral.80',
    p: '3px 5px 2px 5px',
  },
  listElement: {
    container: {
      height: 73,
      pl: 24,
      pr: 14,
    },
    subText: {
      color: 'text.secondary',
      fontSize: 'sm',
      fontWeight: 0,
    },
    text: {
      color: 'text.primary',
      fontSize: 'md',
      fontWeight: 1,
    },
    textBox: {
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 'auto',
    },
  },
  topBracket: {
    top: 50,
    left: 12,
    bottom: -1,
    position: 'absolute',
  },
};
export const Default = ({ ...args }) => {
  const [theseItems] = useState([...sorted]);

  // svg of the bottom portion of the bracket, the portion with the L shaped hook.
  const BottomBracket = () => {
    const color = '#CACED3';
    return (
      <Box sx={sx.bottomBracket.container}>
        <Box flexBasis="53%">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            preserveAspectRatio="none"
            viewBox="0 0 10 10"
            style={{ flexGrow: 1 }}
            aria-labelledby="vertical-bracket-icon-title"
          >
            <title id="vertical-bracket-icon-title">bracket-fill</title>
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
          <svg width="17" height="9" viewBox="0 0 17 9" fill="none" xmlns="http://www.w3.org/2000/svg" aria-labelledby="bracket-icon-title">
            <title id="bracket-icon-title">Bracket Icon</title>
            <g clipPath="url(#clip0_1900_8817)">
              <g mask="url(#mask0_1900_8817)">
                <rect x="0.5" y="-54.5" width="20" height="63" rx="4.5" stroke={color} />
              </g>
            </g>
          </svg>
        </Box>
      </Box>
    );
  };

  // the vector shield and key icon.
  const ShieldIcon = props => (
    <svg width="19" height="23" viewBox="0 0 19 23" xmlns="http://www.w3.org/2000/svg" aria-labelledby="shield-icon-title" {...props}>
      <title id="shield-icon-title">Shield Icon</title>
      <path d="M9.5 7.33342C9.77627 7.33342 10.0412 7.44316 10.2366 7.63851C10.4319 7.83386 10.5417 8.09881 10.5417 8.37508C10.5417 8.65135 10.4319 8.9163 10.2366 9.11165C10.0412 9.307 9.77627 9.41675 9.5 9.41675C9.22373 9.41675 8.95878 9.307 8.76343 9.11165C8.56808 8.9163 8.45833 8.65135 8.45833 8.37508C8.45833 8.09881 8.56808 7.83386 8.76343 7.63851C8.95878 7.44316 9.22373 7.33342 9.5 7.33342ZM18.875 10.4584C18.875 16.2397 14.875 21.6459 9.5 22.9584C4.125 21.6459 0.125 16.2397 0.125 10.4584V4.20842L9.5 0.041748L18.875 4.20842V10.4584ZM9.5 5.25008C8.6712 5.25008 7.87634 5.57932 7.29029 6.16537C6.70424 6.75142 6.375 7.54628 6.375 8.37508C6.375 9.73967 7.23958 10.8959 8.45833 11.323V17.7501H10.5417V15.6667H12.625V13.5834H10.5417V11.323C11.7604 10.8959 12.625 9.73967 12.625 8.37508C12.625 7.54628 12.2958 6.75142 11.7097 6.16537C11.1237 5.57932 10.3288 5.25008 9.5 5.25008Z" />
    </svg>
  );

  const Shield = ({ isParent }) => (
    <Box
      alignItems="center"
      justifyContent="center"
      minWidth={24}
      sx={{ position: 'relative' }}
    >
      <Icon
        icon={ShieldIcon}
        color={isParent ? 'decorative.7' : 'accent.40'}
        size={24}
        isLinked={isParent}
      />
      {isParent && <TopBracket />}
    </Box>
  );

  // the top portion of the bracket svg, this is basically just a straight vertical line.
  const TopBracket = () => {
    const color = '#CACED3';
    return (
      <Box width={15} sx={sx.topBracket}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
          viewBox="0 0 10 10"
          style={{ flexGrow: 1 }}
          data-testid="isLastLayer"
          aria-labelledby="top-bracket-icon-title"
        >
          <title id="top-bracket-icon-title">Top Bracket Icon</title>
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

  // reusable piece of code that handles the iconbutton and popover on the right side of the rows
  const IconWithPopover = ({
    handleHoverEnd,
    handleHoverStart,
    handleMenuHoverEnd,
  }) => (
    <PopoverMenu direction="left">
      <Box alignItems="center" alignSelf="center">
        <IconButton aria-label="Menu Button">
          <Icon icon={DotsVerticalIcon} size="xs" color="Neutral.40" m="0.61px" title={{ name: 'Dots Vertical Icon' }} />
        </IconButton>
      </Box>
      <Menu
        direction="left"
        onAction={handleHoverEnd}
        onHoverEnd={handleMenuHoverEnd}
        onHoverStart={handleHoverStart}
        sx={{ minWidth: '155px', minHeight: '144px' }}
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

  // made these separate components because staging and production both use them.
  const DefaultBadge = () => (
    <Badge
      label="Default"
      bg="active"
      sx={sx.badge}
    />
  );

  const ExpirationBadge = ({
    expirationText,
    badgeText,
  }) => (
    <Box
      sx={!badgeText && { paddingLeft: '72px' }}
      flexGrow={1}
      alignItems="center"
      alignSelf="center"
    >
      <Badge
        bg="white"
        sx={sx.expirationBadge}
        textColor="text.primary"
        label={expirationText}
      />
    </Box>
  );


  const ListElementContent = ({
    badgeText,
    isChild,
    name,
    policyId,
  }) => (
    <Box
      isRow
      ml={isChild ? 0 : 18}
      sx={sx.listElement.textBox}
    >
      {isChild && (
        <Separator
          orientation="vertical"
          sx={sx.bottomBracket.separator}
        />
      )}
      <Box>
        <Text
          sx={sx.listElement.text}
        >
          {name}
        </Text>
        <Text
          sx={sx.listElement.subText}
        >
          Policy Id:
          {' '}
          {policyId}
        </Text>
      </Box>
      {badgeText && <DefaultBadge />}
    </Box>
  );

  const ListElement = ({
    badgeText,
    expirationText,
    isChild,
    isParent,
    name,
    policyId,
  }) => {
    const listItemRef = useRef();

    const {
      handleHoverEnd,
      handleHoverStart,
      handleMenuHoverEnd,
      handleMouseMove,
      isHovered,
    } = useOverlappingMenuHoverState({ listItemRef });

    return (
      <ListItem
        isHovered={isHovered}
        isRow
        onHoverEnd={handleHoverEnd}
        onHoverStart={handleHoverStart}
        onMouseMove={handleMouseMove}
        ref={listItemRef}
        variant="listItem.hover"
        sx={sx.listElement.container}
      >
        {isChild ? <BottomBracket /> : <Shield isParent={isParent} />}
        <ListElementContent
          badgeText={badgeText}
          expirationText={expirationText}
          isChild={isChild}
          name={name}
          policyId={policyId}
        />
        {expirationText && <ExpirationBadge expirationText={expirationText} />}
        <IconWithPopover
          handleHoverEnd={handleHoverEnd}
          handleMenuHoverEnd={handleMenuHoverEnd}
          handleHoverStart={handleHoverStart}
        />
      </ListItem>
    );
  };

  return (
    <ListView {...args} items={theseItems}>
      {item => (
        <Item
          {...item}
          textValue={item.name}
          data-id={item.key}
          listItemProps={{ variant: 'listViewItem.linkedViewContainer', sx: { padding: 1 } }}
        >
          <ListElement
            isParent={item.childrenObjects}
            isChild={item.parentId}
            {...item}
          />
        </Item>
      )}
    </ListView>
  );
};
