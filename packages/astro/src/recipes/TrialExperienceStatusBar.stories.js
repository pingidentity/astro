import React, { useEffect, useRef, useState } from 'react';
import CheckCircleIcon from 'mdi-react/CheckCircleIcon';

import {
  Box,
  Icon,
  IconButton,
  Link,
  Separator,
  Text,
} from '../index';

export default {
  title: 'Recipes/Trial Experience Nav',
};

const ArtIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 24C10.4241 24 8.86371 23.6896 7.4078 23.0866C5.95189 22.4835 4.62902 21.5996 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C18.6 0 24 4.8 24 10.8C24 12.7096 23.2414 14.5409 21.8912 15.8912C20.5409 17.2414 18.7096 18 16.8 18H14.64C14.28 18 14.04 18.24 14.04 18.6C14.04 18.72 14.16 18.84 14.16 18.96C14.64 19.56 14.88 20.28 14.88 21C15 22.68 13.68 24 12 24ZM12 2.4C9.45392 2.4 7.01212 3.41143 5.21178 5.21178C3.41143 7.01212 2.4 9.45392 2.4 12C2.4 14.5461 3.41143 16.9879 5.21178 18.7882C7.01212 20.5886 9.45392 21.6 12 21.6C12.36 21.6 12.6 21.36 12.6 21C12.6 20.76 12.48 20.64 12.48 20.52C12 19.92 11.76 19.32 11.76 18.6C11.76 16.92 13.08 15.6 14.76 15.6H16.8C18.073 15.6 19.2939 15.0943 20.1941 14.1941C21.0943 13.2939 21.6 12.073 21.6 10.8C21.6 6.12 17.28 2.4 12 2.4ZM5.4 9.6C6.36 9.6 7.2 10.44 7.2 11.4C7.2 12.36 6.36 13.2 5.4 13.2C4.44 13.2 3.6 12.36 3.6 11.4C3.6 10.44 4.44 9.6 5.4 9.6ZM9 4.8C9.96 4.8 10.8 5.64 10.8 6.6C10.8 7.56 9.96 8.4 9 8.4C8.04 8.4 7.2 7.56 7.2 6.6C7.2 5.64 8.04 4.8 9 4.8ZM15 4.8C15.96 4.8 16.8 5.64 16.8 6.6C16.8 7.56 15.96 8.4 15 8.4C14.04 8.4 13.2 7.56 13.2 6.6C13.2 5.64 14.04 4.8 15 4.8ZM18.6 9.6C19.56 9.6 20.4 10.44 20.4 11.4C20.4 12.36 19.56 13.2 18.6 13.2C17.64 13.2 16.8 12.36 16.8 11.4C16.8 10.44 17.64 9.6 18.6 9.6Z" fill="#4660A2" />
  </svg>
);

const EarthMagnifyGlassIcon = () => (
  <svg width="25" height="26" viewBox="0 0 25 26" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.0163 18.992C21.483 18.1461 21.833 17.1795 21.833 16.092C21.833 13.0711 19.4997 10.6545 16.583 10.6545C13.6663 10.6545 11.333 13.0711 11.333 16.092C11.333 19.1128 13.6663 21.5295 16.583 21.5295C17.633 21.5295 18.5663 21.167 19.383 20.6836L23.1163 24.5503L24.7497 22.8586L21.0163 18.992ZM16.583 19.1128C14.9497 19.1128 13.6663 17.7836 13.6663 16.092C13.6663 14.4003 14.9497 13.0711 16.583 13.0711C18.2163 13.0711 19.4997 14.4003 19.4997 16.092C19.4997 17.7836 18.2163 19.1128 16.583 19.1128ZM12.4997 22.7378V25.1545C6.05967 25.1545 0.833008 19.7411 0.833008 13.0711C0.833008 6.40113 6.05967 0.987793 12.4997 0.987793C18.1463 0.987793 22.848 5.14446 23.933 10.6545H21.518C20.7713 7.68196 18.718 5.25321 15.9997 4.11738V4.61279C15.9997 5.94196 14.9497 7.02946 13.6663 7.02946H11.333V9.44613C11.333 10.1107 10.808 10.6545 10.1663 10.6545H7.83301V13.0711H10.1663V16.6961H8.99967L3.41134 10.9082C3.25967 11.609 3.16634 12.322 3.16634 13.0711C3.16634 18.3999 7.35467 22.7378 12.4997 22.7378Z" fill="#4660A2" />
  </svg>
);

const EarthCircleIcon = () => {
  return (
    <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.1198 12.8144C21.0965 12.8144 21.0848 12.8144 21.0615 12.8261C20.7698 10.8544 19.0898 9.33773 17.0365 9.33773C15.4031 9.33773 14.0031 10.3061 13.3498 11.6944C11.5065 11.7877 10.0365 13.3044 10.0365 15.1711C10.0365 17.1077 11.5998 18.6711 13.5365 18.6711L21.1198 18.6477C22.7298 18.6477 24.0365 17.3411 24.0365 15.7311C24.0365 14.1211 22.7298 12.8144 21.1198 12.8144ZM7.70312 0.307728V2.74606C4.98479 3.71439 3.03646 6.29273 3.03646 9.33773C3.03646 11.4027 3.94646 13.2344 5.36979 14.5177V11.6711H7.70312V18.6711H0.703125V16.3377H3.88812C1.93979 14.6344 0.703125 12.1377 0.703125 9.33773C0.703125 4.98606 3.67812 1.34606 7.70312 0.307728ZM19.3698 2.33773H16.1848C17.8531 3.80773 18.9965 5.84939 19.2881 8.17106H16.9315C16.6631 6.58439 15.8465 5.19606 14.7031 4.15773V7.00439H12.3698V0.00439453H19.3698V2.33773Z" fill="#4660A2" />
    </svg>
  );
};

const RadioButtonIcon = props => {
  return (
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17.5 17.5" {...props}>
      <path className="cls-1" fill="#B3BEE8" d="M9,18.25A8.75,8.75,0,1,1,17.75,9.5,8.76,8.76,0,0,1,9,18.25ZM9,1.75A7.75,7.75,0,1,0,16.75,9.5,7.76,7.76,0,0,0,9,1.75Z" transform="translate(-0.25 -0.75)" />
      <circle className="cls-2" cx="8.75" cy="8.75" r="8.05" fill="white" />
    </svg>
  );
};

const data = [
  {
    title: 'Design a Solution',
    icon: ArtIcon,
    key: 0,
    links: [
      {
        title: 'Registration',
      },
      {
        title: 'Authentication',
      },
      {
        title: 'Profile management',
      },
      {
        title: 'Experience your solution',
      },
    ],
  },
  {
    title: 'Explore & Customize',
    icon: EarthMagnifyGlassIcon,
    key: 1,
    links: [
      {
        title: 'Edit a user',
      },
      {
        title: 'Update password policies',
      },
      {
        title: 'Edit agreements',
      },
      {
        title: 'Edit notifications',
      },
    ],
  },
  {
    title: 'Orchestrate & Integrate',
    icon: EarthCircleIcon,
    key: 2,
    links: [
      {
        title: 'Learn about DaVinci',
      },
      {
        title: 'View a workflow',
      },
    ],
  },
];

const sx = {
  iconContainer: {
    backgroundColor: 'accent.80',
    alignItems: 'center',
    justifyContent: 'center',
    mr: 'sm',
    borderRadius: '50%',
    zIndex: 3,
  },
  headingSeparator: {
    flexGrow: 1,
    backgroundColor: 'accent.80',
    maxHeight: '100%',
    width: '6px !important',
    zIndex: 2,
    m: '0px 5px 0px 17px !important',
  },
  title: {
    fontSize: 'md',
    color: 'accent.30',
    lineHeight: '18px',
    fontWeight: '3',
    m: '12px 0px 28px 5px',
    maxWidth: '195px',
  },
  linkRowIconButton: {
    height: '23.5px',
    width: '23.5px',
    '&.is-pressed': {
      backgroundColor: 'transparent',
    },
    '&.is-pressed > svg > path': {
      fill: 'accent.30',
    },
    '&.is-hovered': {
      backgroundColor: 'transparent',
    },
  },
  linkRowIconSelected: {
    zIndex: 3,
    'path': {
      fill: 'accent.30',
    },
  },
  linkRowIconNotSelected: {
    zIndex: 3,
    'path': {
      fill: 'accent.80',
    },
  },
  linkRowSeparator: {
    flexGrow: 1,
    backgroundColor: 'accent.30',
    width: '1px !important',
    zIndex: 2,
    m: '-4px 5px -5px 11.5px !important',
  },
  linkRowText: {
    fontSize: 'md',
    color: '#163CE3',
    lineHeight: '18px',
    fontWeight: '0',
    m: '3px 0px 20px 10px',
    maxWidth: '140px',
  },
  container: {
    p: '15px 15px 0px 15px',
    width: '280px',
    backgroundColor: 'accent.95',
    borderRadius: '8px',
    zIndex: 1,
    boxShadow: '3px 8px 4px rgba(202, 206, 211, 0.36)',
  },
};

const Stage = ({
  title,
  icon,
  links,
  isLastStage,
}) => {
  const [selectedLinks, updateSelectedLinks] = useState([]);

  const onSelectionChange = thisIndex => {
    let newArray = [];
    if (selectedLinks.includes(thisIndex)) {
      newArray = selectedLinks.filter(link => {
        return link !== thisIndex;
      });
    } else {
      newArray = [...selectedLinks, thisIndex];
    }
    updateSelectedLinks([...newArray]);
  };

  return (
    <Box
      isRow
    >
      <Box>
        <Box
          minWidth="39.5px"
          minHeight="39.5px"
          sx={sx.iconContainer}
        >
          <Icon
            icon={icon}
            color="accent.40"
            size="24px"
            sx={{
              zIndex: 3,
            }}
          />
        </Box>
        {
          !isLastStage
          && (
          <Separator
            sx={sx.headingSeparator}
            orientation="vertical"
          />
          )
        }
      </Box>
      <Box>
        <Text
          sx={sx.title}
        >
          {title}
        </Text>
        <Box
          pl="0px"
          mb="25px"
        >
          {
            links.map((link, index) => {
              return (
                <LinkRow
                  {...link}
                  onSelectionChange={onSelectionChange}
                  index={index}
                  isLinkSelected={selectedLinks.length !== 0}
                  isLastLink={index === links.length - 1}
                  key={link.title}
                />
              );
            })
          }
        </Box>
      </Box>
    </Box>
  );
};

const LinkRow = ({
  index,
  isLastLink,
  isLinkSelected,
  onSelectionChange,
  title,
}) => {
  const [isSelected, handleSelectionChange] = useState(false);
  const [verticalSeparatorHeight, setVerticalSeparatorHeight] = useState(0);

  const iconRef = useRef();
  const rowRef = useRef();

  useEffect(() => {
    const { height } = rowRef.current.getBoundingClientRect();
    const { height: iconRefHeight } = iconRef.current.getBoundingClientRect();

    const marginAccommodation = 4;
    const halfIconHeight = iconRefHeight / 2;

    setVerticalSeparatorHeight(height - halfIconHeight - marginAccommodation);
  }, [iconRef, rowRef]);

  const onIconPress = () => {
    handleSelectionChange(!isSelected);
    onSelectionChange(index);
  };

  return (
    <Box
      isRow
      ref={rowRef}
    >
      <Box>
        <IconButton
          aria-label="completed step icon indicator"
          onPress={onIconPress}
          ref={iconRef}
          sx={sx.linkRowIconButton}
        >
          <Icon
            icon={isSelected ? CheckCircleIcon : RadioButtonIcon}
            size="sm"
            sx={isSelected ? sx.linkRowIconButton : sx.linkRowIconNotSelected}
          />
        </IconButton>
        {
          !isLastLink && isLinkSelected
          && (
          <Separator
            orientation="vertical"
            sx={{ ...sx.linkRowSeparator, maxHeight: verticalSeparatorHeight }}
          />
          )
        }
      </Box>
      <Link
        href="https://www.pingidentity.com"
        sx={sx.linkRowText}
        target="_blank"
      >
        {title}
      </Link>
    </Box>
  );
};

export const Default = () => {
  // Open the `Story` addons tab to view the source code for full context.
  return (
    <Box
      as="nav"
      sx={sx.container}
    >
      <Box
        paddingLeft="0px"
      >
        {data.map((stage, index) => {
          return (
            <Stage
              title={stage.title}
              icon={stage.icon}
              links={stage.links}
              isLastStage={index === data.length - 1}
              key={stage.title}
            />
          );
        })}
      </Box>
    </Box>
  );
};
